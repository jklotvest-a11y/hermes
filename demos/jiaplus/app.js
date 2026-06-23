const beforeImage = "../../assets/demo-images/living-room-before.png";
const afterImage = "../../assets/demo-images/living-room-after.png";

const products = [
  {
    id: "sofa-cream-001",
    name: "浅米色三人位布艺沙发",
    category: "沙发",
    priceRange: "3500-5500",
    color: "浅米色",
    material: "布艺",
    priority: "high",
    phase: "第一步",
    placement: "靠主墙布置，作为客厅视觉中心",
    reason: "作为客厅主视觉，能弱化精装房冷感，并与奶油风色调统一。",
    tip: "优先确认沙发尺寸，再倒推茶几和地毯大小。"
  },
  {
    id: "coffee-table-wood-001",
    name: "圆形浅木茶几",
    category: "茶几",
    priceRange: "800-1500",
    color: "浅木色",
    material: "橡木",
    priority: "medium",
    phase: "第二步",
    placement: "放在沙发前 35-45cm，保留顺畅动线",
    reason: "圆角更适合有孩子或宠物的家庭，也能让客厅动线更顺畅。",
    tip: "避免过深色大体量茶几，会压低空间的轻盈感。"
  },
  {
    id: "curtain-cream-001",
    name: "暖白遮光纱帘组合",
    category: "窗帘",
    priceRange: "1200-2600",
    color: "暖白色",
    material: "涤纶混纺",
    priority: "high",
    phase: "第一步",
    placement: "整墙安装，拉高视觉层高",
    reason: "柔化采光，让精装房常见的浅色硬装更温暖。",
    tip: "建议选择离地 1-2cm 的长度，避免拖地积灰。"
  },
  {
    id: "rug-cream-001",
    name: "低饱和几何纹地毯",
    category: "地毯",
    priceRange: "600-1300",
    color: "米白色",
    material: "混纺",
    priority: "medium",
    phase: "第二步",
    placement: "覆盖沙发前区，前脚压在地毯上",
    reason: "快速划分客厅区域，并提升空间的柔和层次。",
    tip: "有孩子或宠物时，优先选短绒、易清洁材质。"
  }
];

const state = {
  page: "splash",
  scenario: "精装房软装",
  roomType: "客厅",
  style: "奶油风",
  budget: "中等改造",
  needs: ["重视收纳"],
  compare: "after",
  activeProduct: products[0],
  loadingStep: 0,
  uploadStatus: "ready",
  generationStatus: "idle",
  saved: true
};

const app = document.querySelector("#app");
let loadingTimer = null;

const pages = {
  splash: renderSplash,
  home: renderHome,
  scenario: renderScenario,
  upload: renderUpload,
  prefs: renderPrefs,
  loading: renderLoading,
  result: renderResult,
  product: renderProduct,
  saved: renderSaved,
  plans: renderPlans,
  profile: renderProfile
};

function setPage(page) {
  if (loadingTimer) {
    clearInterval(loadingTimer);
    loadingTimer = null;
  }
  state.page = page;
  state.loadingStep = 0;
  if (page === "loading" && state.generationStatus !== "failed") {
    state.generationStatus = "running";
  }
  render();
}

function render() {
  document.querySelector(".phone").classList.toggle("is-splash", state.page === "splash");
  app.innerHTML = pages[state.page]();
  bindEvents();
  updateTabs();

  if (state.page === "loading" && state.generationStatus === "running") {
    runLoading();
  }
}

function topbar(title, backTo = "home") {
  return `
    <div class="topbar">
      <button class="back" type="button" data-page="${backTo}" aria-label="返回">‹</button>
      <strong>${title}</strong>
      <span style="width:36px"></span>
    </div>
  `;
}

function renderHome() {
  return `
    <section class="view">
      <div class="kicker">家plus</div>
      <h1>拍一张精装房照片，生成你的软装改造方案</h1>
      <p class="sub">预览改造效果、推荐家具清单，并按预算规划购买顺序。</p>
      <div class="image-stack">
        <img class="hero-image" src="${afterImage}" alt="奶油风客厅软装效果图" />
      </div>
      <div class="badge-row">
        <span class="badge">保留原结构</span>
        <span class="badge">家具推荐</span>
        <span class="badge">预算优先级</span>
      </div>
      <div class="actions">
        <button class="primary" type="button" data-page="scenario">开始改造</button>
        <button class="secondary" type="button" data-page="result">查看示例方案</button>
      </div>
    </section>
  `;
}

function renderSplash() {
  return `
    <section class="view splash-view">
      <div class="splash-panel">
        <div class="splash-house" aria-hidden="true">
          <div class="house-roof"></div>
          <div class="house-body">
            <span class="house-window left"></span>
            <span class="house-window right"></span>
            <span class="house-door"></span>
          </div>
        </div>
        <div class="splash-brand">家plus</div>
        <p class="splash-sub">拍照生成你的软装改造方案</p>
        <div class="badge-row splash-badges">
          <span class="badge">AI 效果图</span>
          <span class="badge">家具推荐</span>
          <span class="badge">分步落地</span>
        </div>
      </div>
      <p class="splash-foot">AI Home Styling Assistant</p>
      <button class="splash-hit" type="button" data-page="home" aria-label="进入家plus"></button>
    </section>
  `;
}

function renderScenario() {
  const options = [
    ["精装房软装", "刚交付或准备入住，通过家具与软装提升风格"],
    ["二手房轻改", "不大拆大改，先做局部焕新"],
    ["租房改造", "低预算、可恢复的软装调整"]
  ];

  return `
    <section class="view">
      ${topbar("改造场景")}
      <h2>你想改造哪类空间？</h2>
      <p class="sub">MVP 优先围绕精装房软装生成方案，其他场景复用轻量软装流程。</p>
      <div class="option-grid">
        ${options
          .map(
            ([name, desc]) => `
              <button class="option ${state.scenario === name ? "active" : ""}" type="button" data-select="scenario" data-value="${name}">
                <strong>${name}${name === "精装房软装" ? " · 推荐" : ""}</strong>
                <span>${desc}</span>
              </button>
            `
          )
          .join("")}
      </div>
      <div class="hint-card">
        <strong>输出会保持轻改边界</strong>
        <span>不涉及拆墙、硬装报价或施工图，聚焦可购买、可落地的家具和软装。</span>
      </div>
      <div class="actions">
        <button class="primary" type="button" data-page="upload">下一步</button>
      </div>
    </section>
  `;
}

function renderUpload() {
  const failed = state.uploadStatus === "failed";

  return `
    <section class="view">
      ${topbar("上传照片", "scenario")}
      <h2>上传一张你家的房间照片</h2>
      <p class="sub">完整拍到墙面、地面、窗户和主要家具区域，AI 会更容易保留原空间结构。</p>
      <div class="upload-card ${failed ? "is-error" : ""}">
        ${
          failed
            ? `
              <div class="error-state">
                <div class="error-mark">!</div>
                <h3>照片上传失败</h3>
                <p>当前图片过暗或网络不稳定。请重新选择一张光线更充足的房间照片。</p>
              </div>
            `
            : `
              <img class="room-image" src="${beforeImage}" alt="待改造的精装房客厅原图" />
              <div class="upload-status">
                <strong>已识别：客厅空间</strong>
                <span>墙面、地面、窗户和主家具区域完整，可继续生成。</span>
              </div>
            `
        }
        <div class="photo-actions">
          <button class="ghost" type="button" data-upload="success">拍照</button>
          <button class="ghost" type="button" data-upload="success">从相册选择</button>
        </div>
      </div>
      <div class="badge-row">
        <span class="badge">光线充足</span>
        <span class="badge">画面完整</span>
        <span class="badge">仅用于本次方案</span>
      </div>
      <div class="actions">
        <button class="primary" type="button" data-page="prefs" ${failed ? "disabled" : ""}>继续</button>
        <button class="secondary" type="button" data-upload="failed">模拟上传失败</button>
      </div>
    </section>
  `;
}

function renderPrefs() {
  const ready = Boolean(state.roomType && state.style && state.budget);

  return `
    <section class="view">
      ${topbar("偏好选择", "upload")}
      <h2>告诉 AI 你的改造偏好</h2>
      ${choiceGroup("空间类型", "roomType", ["客厅", "卧室", "餐厅", "书房"])}
      ${choiceGroup("风格偏好", "style", ["现代简约", "原木风", "奶油风", "轻法式", "复古风"])}
      ${choiceGroup("预算档位", "budget", ["轻改造", "中等改造", "品质改造"])}
      <div class="section">
        <h3>家庭需求</h3>
        <div class="pill-grid">
          ${["重视收纳", "有孩子", "养宠物", "喜欢大沙发", "需要办公区"]
            .map(
              (need) => `
                <button class="pill ${state.needs.includes(need) ? "active" : ""}" type="button" data-need="${need}">
                  ${need}
                </button>
              `
            )
            .join("")}
        </div>
      </div>
      <div class="preflight">
        <strong>${ready ? "信息已完整" : "还有必选项未完成"}</strong>
        <span>${state.roomType || "空间"} · ${state.style || "风格"} · ${state.budget || "预算"} · ${state.needs.join("、") || "基础居住需求"}</span>
      </div>
      <div class="actions">
        <button class="primary" type="button" data-generate="success" ${ready ? "" : "disabled"}>生成方案</button>
      </div>
    </section>
  `;
}

function choiceGroup(title, key, values) {
  return `
    <div class="section">
      <h3>${title}</h3>
      <div class="pill-grid">
        ${values
          .map(
            (value) => `
              <button class="pill ${state[key] === value ? "active" : ""}" type="button" data-select="${key}" data-value="${value}">
                ${value}
              </button>
            `
          )
          .join("")}
      </div>
    </div>
  `;
}

function renderLoading() {
  if (state.generationStatus === "failed") {
    return `
      <section class="view">
        ${topbar("生成失败", "prefs")}
        <div class="error-state standalone">
          <div class="error-mark">!</div>
          <h2>AI 生成失败</h2>
          <p>当前照片里客厅边界不够清晰，建议返回调整偏好或重新生成一版示例方案。</p>
        </div>
        <div class="actions">
          <button class="primary" type="button" data-generate="success">重新生成</button>
          <button class="ghost" type="button" data-page="prefs">返回修改偏好</button>
          <button class="secondary" type="button" data-page="result">查看示例方案</button>
        </div>
      </section>
    `;
  }

  const steps = ["理解空间结构", "匹配软装风格", "生成改造效果图", "推荐家具清单", "整理改造步骤"];

  return `
    <section class="view">
      ${topbar("AI 生成中", "prefs")}
      <h2>正在生成你的${state.style}方案</h2>
      <p class="sub">${state.roomType} · ${state.budget} · ${state.needs.join("、") || "基础居住需求"}</p>
      <div class="loader-card">
        <img class="loader-thumb" src="${beforeImage}" alt="正在分析的房间照片" />
        <div class="spinner"></div>
        <div class="steps">
          ${steps
            .map(
              (step, index) => `
                <div class="step ${index <= state.loadingStep ? "done" : ""}">
                  <span class="step-dot"></span>
                  <span>正在${step}</span>
                </div>
              `
            )
            .join("")}
        </div>
      </div>
      <div class="actions">
        <button class="secondary" type="button" data-generate="failed">模拟生成失败</button>
      </div>
    </section>
  `;
}

function renderResult() {
  const image = state.compare === "after" ? afterImage : beforeImage;

  return `
    <section class="view result-view">
      ${topbar("改造方案", "home")}
      <h2>${state.style}${state.roomType}软装方案</h2>
      <div class="badge-row">
        <span class="badge">${state.scenario}</span>
        <span class="badge">${state.roomType}</span>
        <span class="badge">${state.style}</span>
        <span class="badge">${state.budget}</span>
      </div>
      <div class="compare-toggle">
        <button class="${state.compare === "before" ? "active" : ""}" type="button" data-compare="before">原图</button>
        <button class="${state.compare === "after" ? "active" : ""}" type="button" data-compare="after">改造图</button>
      </div>
      <img class="room-image result-image" src="${image}" alt="${state.compare === "after" ? "改造后效果图" : "改造前原图"}" />

      <div class="section summary-card">
        <h3>空间诊断</h3>
        <div class="list">
          <div class="list-item">硬装颜色偏浅，适合用低饱和软装建立温暖感。</div>
          <div class="list-item">当前视觉中心不够明确，需要先确定沙发、窗帘和地毯主色。</div>
          <div class="list-item">可通过圆角茶几和短绒地毯兼顾孩子、宠物和日常清洁。</div>
        </div>
      </div>

      <div class="section summary-card">
        <h3>风格方案</h3>
        <div class="palette">
          <span style="background:#f7f1e8"></span>
          <span style="background:#efe2d2"></span>
          <span style="background:#d5b990"></span>
          <span style="background:#657b6d"></span>
        </div>
        <p class="body-copy">以浅米色、暖白色和浅木色为主，优先用布艺沙发、整墙窗帘、低饱和地毯和暖色灯光弱化精装房的冷感。</p>
      </div>

      <div class="section">
        <h3>推荐家具</h3>
        <div class="product-list">
          ${products.map(productCard).join("")}
        </div>
      </div>

      <div class="section summary-card">
        <h3>预算优先级</h3>
        <div class="priority-grid">
          <div>
            <strong>优先购买</strong>
            <span>沙发、窗帘</span>
          </div>
          <div>
            <strong>可以延后</strong>
            <span>茶几、地毯、装饰画</span>
          </div>
        </div>
      </div>

      <div class="section summary-card">
        <h3>3 步落地计划</h3>
        <div class="timeline">
          <div><strong>01</strong><span>先确定沙发和窗帘，锁定空间主色。</span></div>
          <div><strong>02</strong><span>补充茶几、地毯和灯具，完善客厅区域感。</span></div>
          <div><strong>03</strong><span>最后加入装饰画、绿植和收纳小件，控制预算不超支。</span></div>
        </div>
      </div>

      <div class="section warning-card">
        <strong>避坑提醒</strong>
        <span>不要一次性购买所有单品。先确认大件尺寸和主色，再按预算逐步补齐小件。</span>
      </div>

      <div class="actions sticky-cta">
        <button class="primary" type="button" data-save="true">保存方案</button>
        <button class="ghost" type="button" data-page="prefs">重新生成</button>
      </div>
    </section>
  `;
}

function productCard(product) {
  return `
    <button class="product-card" type="button" data-product="${product.id}">
      <span class="swatch"></span>
      <span>
        <span class="product-name">${product.name}</span>
        <span class="product-meta">${product.category} · ¥${product.priceRange} · ${product.phase}<br />${product.reason}</span>
      </span>
      <span class="chevron">›</span>
    </button>
  `;
}

function renderProduct() {
  const product = state.activeProduct;
  return `
    <section class="view detail-view">
      ${topbar("家具详情", "result")}
      <div class="detail-hero">
        <span class="detail-swatch"></span>
      </div>
      <h2>${product.name}</h2>
      <p class="sub">${product.reason}</p>
      <div class="section panel">
        ${detailRow("品类", product.category)}
        ${detailRow("价格", `¥${product.priceRange}`)}
        ${detailRow("颜色", product.color)}
        ${detailRow("材质", product.material)}
        ${detailRow("优先级", product.priority === "high" ? "优先购买" : "中等优先")}
      </div>
      <div class="section summary-card">
        <h3>放置建议</h3>
        <p class="body-copy">${product.placement}</p>
      </div>
      <div class="section summary-card">
        <h3>搭配提醒</h3>
        <p class="body-copy">${product.tip}</p>
      </div>
      <div class="actions sticky-cta">
        <button class="primary" type="button" data-page="result">加入方案</button>
      </div>
    </section>
  `;
}

function detailRow(label, value) {
  return `<div class="kv"><span>${label}</span><strong>${value}</strong></div>`;
}

function renderSaved() {
  return `
    <section class="view">
      <div class="success-mark">✓</div>
      <h2 style="text-align:center">方案已保存</h2>
      <p class="sub" style="text-align:center">${state.style}${state.roomType}软装方案 · 4 件家具推荐 · 3 步改造计划</p>
      <div class="summary-card saved-card">
        <img class="room-image" src="${afterImage}" alt="已保存的改造方案" />
        <div class="list">
          <div class="list-item">已保存改造效果图和家具清单。</div>
          <div class="list-item">可在“我的方案”继续查看方案详情。</div>
        </div>
      </div>
      <div class="actions">
        <button class="primary" type="button" data-page="plans">查看我的方案</button>
        <button class="ghost" type="button" data-page="home">返回首页</button>
      </div>
    </section>
  `;
}

function renderPlans() {
  if (!state.saved) {
    return `
      <section class="view empty-view">
        <h2>我的方案</h2>
        <div class="empty-card">
          <h3>还没有保存的方案</h3>
          <p class="sub">上传一张房间照片，生成第一套可落地的软装方案。</p>
          <button class="primary" type="button" data-page="scenario">开始改造</button>
        </div>
      </section>
    `;
  }

  return `
    <section class="view">
      <h2>我的方案</h2>
      <div class="summary-card plan-card">
        <img class="room-image" src="${afterImage}" alt="已保存的奶油风客厅方案" />
        <div class="badge-row">
          <span class="badge">${state.roomType}</span>
          <span class="badge">${state.style}</span>
          <span class="badge">${state.budget}</span>
        </div>
        <h3>${state.style}${state.roomType}软装方案</h3>
        <p class="sub">4 件家具推荐 · 3 步落地 · 已保存</p>
        <div class="actions">
          <button class="primary" type="button" data-page="result">查看方案</button>
          <button class="ghost" type="button" data-clear-save="true">移除方案</button>
        </div>
      </div>
    </section>
  `;
}

function renderProfile() {
  return `
    <section class="view profile-view">
      <h2>我的</h2>
      <div class="profile-card">
        <div class="avatar">家</div>
        <div>
          <h3>新家软装中</h3>
          <p>已生成 1 套方案 · 偏好 ${state.style}</p>
        </div>
      </div>
      <div class="summary-card">
        <div class="profile-section-title">
          <h3>我的方案</h3>
          <button type="button" data-page="plans">查看全部</button>
        </div>
        <button class="saved-plan-row" type="button" data-page="result">
          <img src="${afterImage}" alt="已保存的软装方案" />
          <span>
            <strong>${state.style}${state.roomType}软装方案</strong>
            <small>${state.budget} · 4 件家具 · 3 步落地</small>
          </span>
          <span class="chevron">›</span>
        </button>
      </div>
      <div class="summary-card">
        <h3>偏好档案</h3>
        <div class="profile-prefs">
          <span>${state.scenario}</span>
          <span>${state.roomType}</span>
          <span>${state.style}</span>
          <span>${state.budget}</span>
          ${state.needs.map((need) => `<span>${need}</span>`).join("")}
        </div>
      </div>
      <div class="summary-card">
        <h3>最近生成</h3>
        <div class="history-list">
          <button type="button" data-page="result">
            <span>
              <strong>奶油风客厅软装方案</strong>
              <small>今天 09:41 · 已保存</small>
            </span>
            <span class="chevron">›</span>
          </button>
          <button type="button" data-page="scenario">
            <span>
              <strong>再生成一个空间</strong>
              <small>上传卧室、餐厅或书房照片</small>
            </span>
            <span class="chevron">›</span>
          </button>
        </div>
      </div>
      <div class="summary-card">
        <h3>设置</h3>
        <div class="settings-list">
          <button type="button"><span>照片与隐私</span><span class="chevron">›</span></button>
          <button type="button"><span>预算偏好</span><span class="chevron">›</span></button>
          <button type="button"><span>帮助与反馈</span><span class="chevron">›</span></button>
        </div>
      </div>
    </section>
  `;
}

function bindEvents() {
  document.querySelectorAll("[data-page]").forEach((button) => {
    button.addEventListener("click", () => setPage(button.dataset.page));
  });

  document.querySelectorAll("[data-select]").forEach((button) => {
    button.addEventListener("click", () => {
      state[button.dataset.select] = button.dataset.value;
      render();
    });
  });

  document.querySelectorAll("[data-need]").forEach((button) => {
    button.addEventListener("click", () => {
      const need = button.dataset.need;
      state.needs = state.needs.includes(need)
        ? state.needs.filter((item) => item !== need)
        : [...state.needs, need];
      render();
    });
  });

  document.querySelectorAll("[data-upload]").forEach((button) => {
    button.addEventListener("click", () => {
      state.uploadStatus = button.dataset.upload;
      render();
    });
  });

  document.querySelectorAll("[data-generate]").forEach((button) => {
    button.addEventListener("click", () => {
      state.generationStatus = button.dataset.generate === "failed" ? "failed" : "running";
      setPage("loading");
    });
  });

  document.querySelectorAll("[data-save]").forEach((button) => {
    button.addEventListener("click", () => {
      state.saved = true;
      setPage("saved");
    });
  });

  document.querySelectorAll("[data-clear-save]").forEach((button) => {
    button.addEventListener("click", () => {
      state.saved = false;
      render();
    });
  });

  document.querySelectorAll("[data-compare]").forEach((button) => {
    button.addEventListener("click", () => {
      state.compare = button.dataset.compare;
      render();
    });
  });

  document.querySelectorAll("[data-product]").forEach((button) => {
    button.addEventListener("click", () => {
      state.activeProduct = products.find((item) => item.id === button.dataset.product);
      setPage("product");
    });
  });

  document.querySelectorAll("[data-tab]").forEach((button) => {
    button.addEventListener("click", () => setPage(button.dataset.tab));
  });
}

function updateTabs() {
  document.querySelectorAll("[data-tab]").forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.tab === activeTab());
  });
}

function activeTab() {
  if (state.page === "splash") return "";
  if (state.page === "plans") return "plans";
  if (state.page === "profile") return "profile";
  return "home";
}

function runLoading() {
  if (loadingTimer) return;

  loadingTimer = setInterval(() => {
    state.loadingStep += 1;
    if (state.loadingStep > 4) {
      clearInterval(loadingTimer);
      loadingTimer = null;
      state.generationStatus = "success";
      setPage("result");
      return;
    }
    if (state.page === "loading" && state.generationStatus === "running") render();
  }, 650);
}

setTimeout(() => {
  if (state.page === "splash") setPage("home");
}, 1400);

render();
