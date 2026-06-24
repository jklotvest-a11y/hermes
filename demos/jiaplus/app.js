const beforeImage = "../../assets/demo-images/living-room-before.png";
const afterImage = "../../assets/demo-images/living-room-after.png";
const storageKey = "jiaplus.savedPlans.v1";

const products = [
  {
    id: "sofa-cream-001",
    name: "浅米色三人位布艺沙发",
    category: "沙发",
    roomTypes: ["客厅"],
    styles: ["奶油风", "现代简约"],
    budgetLevel: "中等改造",
    priceRange: "3500-5500",
    color: "浅米色",
    material: "布艺",
    priority: "high",
    phase: "第一步",
    familyNeeds: ["养宠物", "喜欢大沙发"],
    placement: "靠主墙布置，作为客厅视觉中心",
    reason: "浅米色能弱化精装房冷感，并与奶油风色调统一。",
    tip: "优先确认沙发尺寸，再倒推茶几和地毯大小。"
  },
  {
    id: "coffee-table-wood-001",
    name: "圆形浅木茶几",
    category: "茶几",
    roomTypes: ["客厅"],
    styles: ["奶油风", "原木风"],
    budgetLevel: "轻改造",
    priceRange: "800-1500",
    color: "浅木色",
    material: "橡木",
    priority: "medium",
    phase: "第二步",
    familyNeeds: ["养宠物", "有孩子"],
    placement: "放在沙发前 35-45cm，保留顺畅动线",
    reason: "圆角更适合有孩子或宠物的家庭，也能让客厅动线更顺畅。",
    tip: "避免过深色大体量茶几，会压低空间的轻盈感。"
  },
  {
    id: "curtain-cream-001",
    name: "暖白遮光纱帘组合",
    category: "窗帘",
    roomTypes: ["客厅", "卧室"],
    styles: ["奶油风", "现代简约", "轻法式"],
    budgetLevel: "轻改造",
    priceRange: "1200-2600",
    color: "暖白色",
    material: "涤纶混纺",
    priority: "high",
    phase: "第一步",
    familyNeeds: ["重视收纳"],
    placement: "整墙安装，拉高视觉层高",
    reason: "暖白窗帘能柔化采光，让精装房空间更温暖。",
    tip: "建议选择离地 1-2cm 的长度，避免拖地积灰。"
  },
  {
    id: "rug-cream-001",
    name: "低饱和几何纹地毯",
    category: "地毯",
    roomTypes: ["客厅", "卧室"],
    styles: ["奶油风", "现代简约"],
    budgetLevel: "轻改造",
    priceRange: "600-1300",
    color: "米白色",
    material: "混纺",
    priority: "medium",
    phase: "第二步",
    familyNeeds: ["有孩子", "养宠物"],
    placement: "覆盖沙发前区，前脚压在地毯上",
    reason: "快速划分区域，并提升空间的柔和层次。",
    tip: "有孩子或宠物时，优先选短绒、易清洁材质。"
  },
  {
    id: "floor-lamp-001",
    name: "暖光弧形落地灯",
    category: "落地灯",
    roomTypes: ["客厅", "卧室", "书房"],
    styles: ["奶油风", "现代简约", "复古风"],
    budgetLevel: "轻改造",
    priceRange: "500-1200",
    color: "暖白色",
    material: "金属",
    priority: "medium",
    phase: "第三步",
    familyNeeds: ["需要办公区"],
    placement: "放在沙发侧边或阅读角，补充局部照明",
    reason: "落地灯能补充局部照明，让夜间空间更有层次。",
    tip: "建议选择暖光光源，避免冷白光破坏软装氛围。"
  },
  {
    id: "tv-cabinet-wood-001",
    name: "浅木色悬浮电视柜",
    category: "电视柜",
    roomTypes: ["客厅"],
    styles: ["原木风", "现代简约", "奶油风"],
    budgetLevel: "中等改造",
    priceRange: "1800-3600",
    color: "浅木色",
    material: "实木贴皮",
    priority: "medium",
    phase: "第二步",
    familyNeeds: ["重视收纳"],
    placement: "布置在电视墙下方，弱化线材和杂物",
    reason: "浅木电视柜能补充收纳，同时让电视墙区域更完整。",
    tip: "优先选择悬浮或细腿款，避免厚重柜体压缩空间。"
  },
  {
    id: "bed-wood-001",
    name: "浅木色软靠双人床",
    category: "床",
    roomTypes: ["卧室"],
    styles: ["原木风", "奶油风", "现代简约"],
    budgetLevel: "中等改造",
    priceRange: "3000-6000",
    color: "浅木色",
    material: "木质与布艺",
    priority: "high",
    phase: "第一步",
    familyNeeds: [],
    placement: "靠主墙居中布置，作为卧室主视觉",
    reason: "浅木床能建立卧室温暖基调，适合精装房常见浅色硬装。",
    tip: "先确认床和衣柜之间的通道宽度，再购买床头柜。"
  },
  {
    id: "desk-compact-001",
    name: "小户型浅色办公桌",
    category: "办公桌",
    roomTypes: ["卧室", "书房"],
    styles: ["现代简约", "原木风"],
    budgetLevel: "轻改造",
    priceRange: "900-1800",
    color: "白色与浅木色",
    material: "板木结合",
    priority: "medium",
    phase: "第二步",
    familyNeeds: ["需要办公区"],
    placement: "靠窗或靠墙布置，减少对主要动线的占用",
    reason: "小体量办公桌能补充居家办公功能，同时不压缩动线。",
    tip: "搭配可移动收纳柜，方便根据居家办公频率调整。"
  },
  {
    id: "armchair-vintage-001",
    name: "焦糖色复古单椅",
    category: "单椅",
    roomTypes: ["客厅", "卧室", "书房"],
    styles: ["复古风", "轻法式"],
    budgetLevel: "中等改造",
    priceRange: "1800-3200",
    color: "焦糖色",
    material: "皮革",
    priority: "medium",
    phase: "第二步",
    familyNeeds: [],
    placement: "放在窗边或边角，打造阅读角",
    reason: "焦糖色单椅能为空间增加复古视觉焦点。",
    tip: "复古单椅建议与低饱和地毯或落地灯一起搭配。"
  },
  {
    id: "art-print-001",
    name: "低饱和抽象装饰画",
    category: "装饰画",
    roomTypes: ["客厅", "卧室", "餐厅", "书房"],
    styles: ["现代简约", "奶油风", "轻法式"],
    budgetLevel: "轻改造",
    priceRange: "200-800",
    color: "米色与浅棕",
    material: "画布",
    priority: "low",
    phase: "第三步",
    familyNeeds: [],
    placement: "挂在沙发背景墙或床头墙，补充视觉层次",
    reason: "装饰画能补充墙面层次，是低预算提升完成度的单品。",
    tip: "等大件家具和窗帘色调确定后，再选择装饰画。"
  }
];

const defaultState = {
  page: "splash",
  scenario: "精装房软装",
  roomType: "客厅",
  style: "奶油风",
  budget: "中等改造",
  needs: ["重视收纳"],
  compare: "after",
  activeProduct: null,
  loadingStep: 0,
  uploadStatus: "ready",
  uploadedImage: "",
  uploadedImageName: "",
  generationStatus: "idle",
  currentPlan: null,
  savedPlans: loadSavedPlans()
};

const state = { ...defaultState };
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

function planImage(plan = state.currentPlan) {
  return plan?.input?.image || state.uploadedImage || beforeImage;
}

function resultImage(plan = state.currentPlan) {
  return state.compare === "after" ? afterImage : planImage(plan);
}

function renderHome() {
  return `
    <section class="view">
      <div class="kicker">家plus</div>
      <h1>拍一张精装房照片，生成你的软装改造方案</h1>
      <p class="sub">预览改造方向、推荐家具清单，并按预算规划购买顺序。</p>
      <div class="image-stack">
        <img class="hero-image" src="${afterImage}" alt="奶油风客厅软装效果图" />
      </div>
      <div class="badge-row">
        <span class="badge">真实照片输入</span>
        <span class="badge">家具推荐</span>
        <span class="badge">预算优先级</span>
      </div>
      <div class="actions">
        <button class="primary" type="button" data-page="scenario">开始改造</button>
        <button class="secondary" type="button" data-demo-plan="true">查看示例方案</button>
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
          <span class="badge">空间诊断</span>
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
        ${options.map(([name, desc]) => `
          <button class="option ${state.scenario === name ? "active" : ""}" type="button" data-select="scenario" data-value="${name}">
            <strong>${name}${name === "精装房软装" ? " · 推荐" : ""}</strong>
            <span>${desc}</span>
          </button>
        `).join("")}
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
  const hasImage = Boolean(state.uploadedImage);
  const preview = hasImage ? state.uploadedImage : beforeImage;

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
                <h3>照片无法使用</h3>
                <p>图片需要是 JPG / PNG / WebP，大小不超过 6MB，并尽量包含完整房间角度。</p>
              </div>
            `
            : `
              <img class="room-image" src="${preview}" alt="待改造的房间照片" />
              <div class="upload-status">
                <strong>${hasImage ? "已上传：" + state.uploadedImageName : "当前使用示例客厅图"}</strong>
                <span>${hasImage ? "照片已进入本地方案生成流程。" : "你也可以上传自己的房间照片，生成更贴近真实空间的方案。"}</span>
              </div>
            `
        }
        <input class="file-input" id="room-photo" type="file" accept="image/png,image/jpeg,image/webp" />
        <div class="photo-actions">
          <label class="ghost file-label" for="room-photo">上传照片</label>
          <button class="ghost" type="button" data-use-example="true">使用示例图</button>
        </div>
      </div>
      <div class="badge-row">
        <span class="badge">JPG / PNG / WebP</span>
        <span class="badge">小于 6MB</span>
        <span class="badge">仅本地预览</span>
      </div>
      <div class="actions">
        <button class="primary" type="button" data-page="prefs" ${failed ? "disabled" : ""}>继续</button>
        <button class="secondary" type="button" data-upload="failed">模拟不可用照片</button>
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
            .map((need) => `
              <button class="pill ${state.needs.includes(need) ? "active" : ""}" type="button" data-need="${need}">
                ${need}
              </button>
            `).join("")}
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
        ${values.map((value) => `
          <button class="pill ${state[key] === value ? "active" : ""}" type="button" data-select="${key}" data-value="${value}">
            ${value}
          </button>
        `).join("")}
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
          <p>当前照片里空间边界不够清晰，建议返回调整偏好或重新生成一版示例方案。</p>
        </div>
        <div class="actions">
          <button class="primary" type="button" data-generate="success">重新生成</button>
          <button class="ghost" type="button" data-page="prefs">返回修改偏好</button>
          <button class="secondary" type="button" data-demo-plan="true">查看示例方案</button>
        </div>
      </section>
    `;
  }

  const steps = ["理解空间结构", "匹配软装风格", "筛选家具清单", "整理预算优先级", "生成落地步骤"];

  return `
    <section class="view">
      ${topbar("AI 生成中", "prefs")}
      <h2>正在生成你的${state.style}方案</h2>
      <p class="sub">${state.roomType} · ${state.budget} · ${state.needs.join("、") || "基础居住需求"}</p>
      <div class="loader-card">
        <img class="loader-thumb" src="${planImage()}" alt="正在分析的房间照片" />
        <div class="spinner"></div>
        <div class="steps">
          ${steps.map((step, index) => `
            <div class="step ${index <= state.loadingStep ? "done" : ""}">
              <span class="step-dot"></span>
              <span>正在${step}</span>
            </div>
          `).join("")}
        </div>
      </div>
      <div class="actions">
        <button class="secondary" type="button" data-generate="failed">模拟生成失败</button>
      </div>
    </section>
  `;
}

function renderResult() {
  const plan = ensurePlan();
  const image = resultImage(plan);

  return `
    <section class="view result-view">
      ${topbar("改造方案", "home")}
      <h2>${plan.title}</h2>
      <div class="badge-row">
        <span class="badge">${plan.input.scenario}</span>
        <span class="badge">${plan.input.roomType}</span>
        <span class="badge">${plan.input.style}</span>
        <span class="badge">${plan.input.budget}</span>
      </div>
      <div class="compare-toggle">
        <button class="${state.compare === "before" ? "active" : ""}" type="button" data-compare="before">原图</button>
        <button class="${state.compare === "after" ? "active" : ""}" type="button" data-compare="after">改造方向</button>
      </div>
      <img class="room-image result-image" src="${image}" alt="${state.compare === "after" ? "改造方向示意图" : "用户上传原图"}" />

      <div class="section summary-card">
        <h3>空间诊断</h3>
        <div class="list">${plan.diagnosis.map((item) => `<div class="list-item">${item}</div>`).join("")}</div>
      </div>

      <div class="section summary-card">
        <h3>风格方案</h3>
        <div class="palette">${plan.palette.map((color) => `<span style="background:${color}"></span>`).join("")}</div>
        <p class="body-copy">${plan.styleDirection}</p>
      </div>

      <div class="section">
        <h3>推荐家具</h3>
        <div class="product-list">${plan.products.map(productCard).join("")}</div>
      </div>

      <div class="section summary-card">
        <h3>预算优先级</h3>
        <div class="priority-grid">
          <div><strong>优先购买</strong><span>${plan.priorityList.join("、")}</span></div>
          <div><strong>可以延后</strong><span>${plan.laterList.join("、")}</span></div>
        </div>
      </div>

      <div class="section summary-card">
        <h3>3 步落地计划</h3>
        <div class="timeline">
          ${plan.executionSteps.map((step, index) => `
            <div><strong>${String(index + 1).padStart(2, "0")}</strong><span>${step}</span></div>
          `).join("")}
        </div>
      </div>

      <div class="section warning-card">
        <strong>避坑提醒</strong>
        <span>${plan.riskTip}</span>
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
  const product = state.activeProduct || ensurePlan().products[0];
  return `
    <section class="view detail-view">
      ${topbar("家具详情", "result")}
      <div class="detail-hero"><span class="detail-swatch"></span></div>
      <h2>${product.name}</h2>
      <p class="sub">${product.reason}</p>
      <div class="section panel">
        ${detailRow("品类", product.category)}
        ${detailRow("价格", `¥${product.priceRange}`)}
        ${detailRow("颜色", product.color)}
        ${detailRow("材质", product.material)}
        ${detailRow("优先级", product.priority === "high" ? "优先购买" : product.priority === "medium" ? "中等优先" : "可延后")}
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
  const plan = ensurePlan();
  return `
    <section class="view">
      <div class="success-mark">✓</div>
      <h2 style="text-align:center">方案已保存</h2>
      <p class="sub" style="text-align:center">${plan.title} · ${plan.products.length} 件家具推荐 · 3 步改造计划</p>
      <div class="summary-card saved-card">
        <img class="room-image" src="${afterImage}" alt="已保存的改造方案" />
        <div class="list">
          <div class="list-item">已保存结构化方案、家具清单和落地步骤。</div>
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
  if (!state.savedPlans.length) {
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
      <div class="plan-list">
        ${state.savedPlans.map((plan) => `
          <div class="summary-card plan-card">
            <img class="room-image" src="${afterImage}" alt="${plan.title}" />
            <div class="badge-row">
              <span class="badge">${plan.input.roomType}</span>
              <span class="badge">${plan.input.style}</span>
              <span class="badge">${plan.input.budget}</span>
            </div>
            <h3>${plan.title}</h3>
            <p class="sub">${plan.products.length} 件家具推荐 · 3 步落地 · ${plan.createdAt}</p>
            <div class="actions">
              <button class="primary" type="button" data-open-plan="${plan.id}">查看方案</button>
              <button class="ghost" type="button" data-delete-plan="${plan.id}">移除方案</button>
            </div>
          </div>
        `).join("")}
      </div>
    </section>
  `;
}

function renderProfile() {
  const latest = state.savedPlans[0];
  return `
    <section class="view profile-view">
      <h2>我的</h2>
      <div class="profile-card">
        <div class="avatar">家</div>
        <div>
          <h3>新家软装中</h3>
          <p>已保存 ${state.savedPlans.length} 套方案 · 偏好 ${state.style}</p>
        </div>
      </div>
      <div class="summary-card">
        <div class="profile-section-title">
          <h3>我的方案</h3>
          <button type="button" data-page="plans">查看全部</button>
        </div>
        ${
          latest
            ? `
              <button class="saved-plan-row" type="button" data-open-plan="${latest.id}">
                <img src="${afterImage}" alt="${latest.title}" />
                <span>
                  <strong>${latest.title}</strong>
                  <small>${latest.input.budget} · ${latest.products.length} 件家具 · 3 步落地</small>
                </span>
                <span class="chevron">›</span>
              </button>
            `
            : `<p class="sub">还没有保存方案，先生成一套软装方案吧。</p>`
        }
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
          ${state.savedPlans.slice(0, 2).map((plan) => `
            <button type="button" data-open-plan="${plan.id}">
              <span>
                <strong>${plan.title}</strong>
                <small>${plan.createdAt} · 已保存</small>
              </span>
              <span class="chevron">›</span>
            </button>
          `).join("")}
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

  document.querySelector("[type='file']")?.addEventListener("change", handleUpload);

  document.querySelectorAll("[data-use-example]").forEach((button) => {
    button.addEventListener("click", () => {
      state.uploadedImage = "";
      state.uploadedImageName = "";
      state.uploadStatus = "ready";
      render();
    });
  });

  document.querySelectorAll("[data-demo-plan]").forEach((button) => {
    button.addEventListener("click", () => {
      state.currentPlan = createPlan({ useExample: true });
      state.compare = "after";
      setPage("result");
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
      const plan = ensurePlan();
      state.savedPlans = [plan, ...state.savedPlans.filter((item) => item.id !== plan.id)].slice(0, 8);
      savePlans();
      setPage("saved");
    });
  });

  document.querySelectorAll("[data-delete-plan]").forEach((button) => {
    button.addEventListener("click", () => {
      state.savedPlans = state.savedPlans.filter((plan) => plan.id !== button.dataset.deletePlan);
      savePlans();
      render();
    });
  });

  document.querySelectorAll("[data-open-plan]").forEach((button) => {
    button.addEventListener("click", () => {
      const plan = state.savedPlans.find((item) => item.id === button.dataset.openPlan);
      if (plan) {
        state.currentPlan = plan;
        state.compare = "after";
        setPage("result");
      }
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
      const plan = ensurePlan();
      state.activeProduct = plan.products.find((item) => item.id === button.dataset.product) || products[0];
      setPage("product");
    });
  });

  document.querySelectorAll("[data-tab]").forEach((button) => {
    button.addEventListener("click", () => setPage(button.dataset.tab));
  });
}

function handleUpload(event) {
  const file = event.target.files?.[0];
  if (!file) return;

  const validType = ["image/jpeg", "image/png", "image/webp"].includes(file.type);
  const validSize = file.size <= 6 * 1024 * 1024;
  if (!validType || !validSize) {
    state.uploadStatus = "failed";
    render();
    return;
  }

  const reader = new FileReader();
  reader.onload = () => {
    state.uploadedImage = String(reader.result);
    state.uploadedImageName = file.name;
    state.uploadStatus = "ready";
    state.currentPlan = null;
    render();
  };
  reader.readAsDataURL(file);
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
      state.currentPlan = createPlan();
      state.compare = "after";
      setPage("result");
      return;
    }
    if (state.page === "loading" && state.generationStatus === "running") render();
  }, 650);
}

function ensurePlan() {
  if (!state.currentPlan) state.currentPlan = createPlan({ useExample: true });
  return state.currentPlan;
}

function createPlan({ useExample = false } = {}) {
  const matchedProducts = matchProducts();
  const high = matchedProducts.filter((item) => item.priority === "high").map((item) => item.category);
  const later = matchedProducts.filter((item) => item.priority !== "high").map((item) => item.category);
  const input = {
    scenario: state.scenario,
    roomType: state.roomType,
    style: state.style,
    budget: state.budget,
    needs: [...state.needs],
    image: useExample ? "" : state.uploadedImage,
    imageName: useExample ? "示例客厅图" : state.uploadedImageName || "示例客厅图"
  };

  return {
    id: `plan-${Date.now()}`,
    title: `${state.style}${state.roomType}软装方案`,
    createdAt: formatDate(),
    input,
    diagnosis: buildDiagnosis(),
    styleDirection: buildStyleDirection(),
    palette: paletteForStyle(state.style),
    products: matchedProducts,
    priorityList: unique(high.length ? high : matchedProducts.slice(0, 2).map((item) => item.category)),
    laterList: unique(later.length ? later : matchedProducts.slice(2).map((item) => item.category)),
    executionSteps: buildExecutionSteps(matchedProducts),
    riskTip: buildRiskTip()
  };
}

function matchProducts() {
  const scored = products.map((product) => {
    let score = 0;
    if (product.roomTypes.includes(state.roomType)) score += 4;
    if (product.styles.includes(state.style)) score += 3;
    if (product.budgetLevel === state.budget) score += 2;
    score += product.familyNeeds.filter((need) => state.needs.includes(need)).length * 2;
    if (product.priority === "high") score += 1;
    return { product, score };
  });

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, 4)
    .map(({ product }) => product);
}

function buildDiagnosis() {
  const roomText = {
    客厅: "客厅需要先建立清晰视觉中心，避免沙发、茶几和电视墙各自为政。",
    卧室: "卧室优先关注睡眠氛围和床边收纳，避免色彩过杂影响放松感。",
    餐厅: "餐厅需要用灯光和餐边收纳建立区域感，减少杂物外露。",
    书房: "书房需要兼顾照明、桌面收纳和背景整洁，方便长期办公。"
  };
  const needText = state.needs.includes("重视收纳")
    ? "你选择了重视收纳，方案会优先补充柜体、抽屉或隐藏收纳。"
    : "当前方案优先用大件家具和软装建立风格，再逐步补充小件。";
  const budgetText = state.budget === "轻改造"
    ? "预算偏轻，建议优先购买对观感影响最大的 2-3 件单品。"
    : state.budget === "品质改造"
      ? "预算较充足，可以同步升级大件家具和灯光氛围。"
      : "中等预算适合先确定主色和大件，再补充地毯、灯具与装饰。";
  return [roomText[state.roomType], needText, budgetText];
}

function buildStyleDirection() {
  const map = {
    奶油风: "以浅米色、暖白色和浅木色为主，优先用布艺、窗帘、地毯和暖色灯光弱化精装房的冷感。",
    原木风: "以浅木色、棉麻和低饱和白色为主，减少厚重装饰，让空间更自然耐看。",
    现代简约: "保留干净线条和低饱和中性色，用少量重点家具建立秩序感。",
    轻法式: "用柔和曲线、暖白窗帘和精致装饰增加细节，但避免过度复杂。",
    复古风: "用焦糖色、皮革、暖光和局部装饰制造记忆点，同时控制色彩数量。"
  };
  return map[state.style] || map["奶油风"];
}

function paletteForStyle(style) {
  const map = {
    奶油风: ["#f7f1e8", "#efe2d2", "#d5b990", "#657b6d"],
    原木风: ["#f7f4ef", "#d8c1a3", "#a98662", "#6f7d68"],
    现代简约: ["#f5f6f4", "#d9dedb", "#9aa0a3", "#26384a"],
    轻法式: ["#faf5ef", "#e8d7c8", "#b88942", "#6d7f87"],
    复古风: ["#f5efe5", "#c68a5e", "#8a4f35", "#26384a"]
  };
  return map[style] || map["奶油风"];
}

function buildExecutionSteps(selectedProducts) {
  const first = selectedProducts.filter((item) => item.phase === "第一步").map((item) => item.category);
  const second = selectedProducts.filter((item) => item.phase === "第二步").map((item) => item.category);
  const third = selectedProducts.filter((item) => item.phase === "第三步").map((item) => item.category);
  return [
    `先确定${unique(first).join("、") || "主家具"}，锁定空间主色和基础比例。`,
    `再补充${unique(second).join("、") || "功能家具"}，完善动线、收纳和区域感。`,
    `最后加入${unique(third).join("、") || "灯具与装饰"}，提升氛围并控制预算不超支。`
  ];
}

function buildRiskTip() {
  if (state.budget === "轻改造") return "轻预算不要一次性购买所有单品，先买最影响观感的大件或软装。";
  if (state.needs.includes("有孩子") || state.needs.includes("养宠物")) return "有孩子或宠物时，优先选择圆角、短绒、耐磨和易清洁材质。";
  return "先确认大件尺寸和主色，再按预算逐步补齐小件，避免风格跑偏。";
}

function unique(items) {
  return [...new Set(items)].filter(Boolean);
}

function formatDate() {
  const now = new Date();
  return `${now.getMonth() + 1}月${now.getDate()}日 ${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
}

function loadSavedPlans() {
  try {
    return JSON.parse(localStorage.getItem(storageKey)) || [];
  } catch {
    return [];
  }
}

function savePlans() {
  localStorage.setItem(storageKey, JSON.stringify(state.savedPlans));
}

setTimeout(() => {
  if (state.page === "splash") setPage("home");
}, 1400);

render();
