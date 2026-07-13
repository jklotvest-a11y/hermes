const state = {
  currentView: "dashboard",
  activeFilter: "all",
  leads: [
    {
      id: 1,
      name: "陈一诺",
      phone: "138 1024 6677",
      source: "抖音表单",
      intent: "高",
      status: "待跟进",
      advisor: "张三",
      nextFollow: "2026-07-06",
      note: "家长关注暑期数学提升班，预算明确。",
    },
    {
      id: 2,
      name: "刘子航",
      phone: "136 7788 0912",
      source: "转介绍",
      intent: "高",
      status: "已预约",
      advisor: "李娜",
      nextFollow: "2026-07-07",
      note: "周三晚试听英语口语课。",
    },
    {
      id: 3,
      name: "周雨桐",
      phone: "139 5601 2234",
      source: "地推活动",
      intent: "中",
      status: "已报名",
      advisor: "王敏",
      nextFollow: "2026-07-10",
      note: "报名 40 课时，新生入班待排课。",
    },
    {
      id: 4,
      name: "赵明轩",
      phone: "137 9000 4521",
      source: "公众号",
      intent: "中",
      status: "待跟进",
      advisor: "张三",
      nextFollow: "2026-07-06",
      note: "对编程启蒙课感兴趣，需要发送课程大纲。",
    },
    {
      id: 5,
      name: "孙若溪",
      phone: "135 2211 7890",
      source: "抖音表单",
      intent: "低",
      status: "已流失",
      advisor: "李娜",
      nextFollow: "2026-07-12",
      note: "时间不匹配，寒假前再联系。",
    },
  ],
  students: [
    {
      name: "周雨桐",
      course: "数学思维强化班",
      advisor: "王敏",
      boughtHours: 40,
      usedHours: 8,
      amount: 12800,
    },
    {
      name: "何嘉树",
      course: "英语口语小班",
      advisor: "李娜",
      boughtHours: 60,
      usedHours: 21,
      amount: 16800,
    },
    {
      name: "林知夏",
      course: "Python 编程启蒙",
      advisor: "张三",
      boughtHours: 32,
      usedHours: 14,
      amount: 9600,
    },
  ],
  trials: [
    {
      name: "刘子航",
      course: "英语口语小班",
      time: "2026-07-08 19:00",
      teacher: "Mia",
      result: "待到课",
    },
    {
      name: "陈一诺",
      course: "数学思维强化班",
      time: "2026-07-09 18:30",
      teacher: "刘老师",
      result: "待确认",
    },
    {
      name: "周雨桐",
      course: "数学思维强化班",
      time: "2026-07-02 18:30",
      teacher: "刘老师",
      result: "已转化",
    },
  ],
  orders: [
    {
      id: "SO-202607-001",
      student: "周雨桐",
      course: "数学思维强化班",
      amount: 12800,
      status: "已收款",
      advisor: "王敏",
      createdAt: "2026-07-03",
    },
    {
      id: "SO-202607-002",
      student: "何嘉树",
      course: "英语口语小班",
      amount: 16800,
      status: "已收款",
      advisor: "李娜",
      createdAt: "2026-07-04",
    },
    {
      id: "SO-202607-003",
      student: "林知夏",
      course: "Python 编程启蒙",
      amount: 9600,
      status: "待收款",
      advisor: "张三",
      createdAt: "2026-07-05",
    },
  ],
  workflow: [
    {
      step: "线索录入",
      owner: "课程顾问",
      input: "渠道、手机号、意向课程",
      output: "客户档案",
    },
    {
      step: "跟进预约",
      owner: "课程顾问",
      input: "沟通记录、意向等级",
      output: "试听预约",
    },
    {
      step: "试听转化",
      owner: "教务 / 老师",
      input: "试听结果、家长反馈",
      output: "报名意向",
    },
    {
      step: "订单收款",
      owner: "财务",
      input: "课程包、优惠、付款方式",
      output: "销售订单",
    },
    {
      step: "课时交付",
      owner: "教务",
      input: "排课、消课、请假",
      output: "剩余课时与续费提醒",
    },
  ],
  entities: [
    ["Lead", "线索表", "来源、意向、负责人、跟进状态"],
    ["Student", "学员表", "学员信息、家长联系方式、课程偏好"],
    ["Trial", "试听表", "预约时间、老师、到课状态、转化结果"],
    ["Order", "订单表", "课程包、金额、收款状态、顾问归属"],
    ["ClassHour", "课时表", "购买课时、已消耗、剩余课时"],
  ],
  risks: [
    {
      title: "待跟进超期",
      detail: "下次跟进日期早于今日且未报名，进入顾问待办。",
      action: "提醒负责人补充沟通记录",
    },
    {
      title: "收款未闭环",
      detail: "试听已转化但订单仍待收款，影响收入确认。",
      action: "同步财务核对付款状态",
    },
    {
      title: "课时交付压力",
      detail: "剩余课时高于阈值，说明排课和消课需要持续跟踪。",
      action: "教务排课并维护消课记录",
    },
  ],
};

const views = {
  dashboard: "经营概览",
  leads: "线索管理",
  students: "学员档案",
  trials: "试听管理",
  orders: "收款管理",
  workflow: "ERP业务流程",
  ai: "AI转化助手",
};

const formatter = new Intl.NumberFormat("zh-CN");
const moneyFormatter = new Intl.NumberFormat("zh-CN", {
  style: "currency",
  currency: "CNY",
  maximumFractionDigits: 0,
});

const pageTitle = document.querySelector("#page-title");
const searchInput = document.querySelector("#global-search");
const leadDialog = document.querySelector("#lead-dialog");
const leadForm = document.querySelector("#lead-form");
const aiLeadSelect = document.querySelector("#ai-lead-select");

function getSearchTerm() {
  return searchInput.value.trim().toLowerCase();
}

function matchesSearch(lead) {
  const term = getSearchTerm();
  if (!term) return true;
  return [lead.name, lead.phone, lead.source, lead.advisor, lead.status, lead.note]
    .join(" ")
    .toLowerCase()
    .includes(term);
}

function getVisibleLeads() {
  return state.leads.filter((lead) => {
    const statusMatch = state.activeFilter === "all" || lead.status === state.activeFilter;
    return statusMatch && matchesSearch(lead);
  });
}

function setView(view) {
  state.currentView = view;
  document.querySelectorAll(".nav-item").forEach((item) => {
    item.classList.toggle("active", item.dataset.view === view);
  });
  document.querySelectorAll(".view").forEach((panel) => {
    panel.classList.toggle("active-view", panel.id === `${view}-view`);
  });
  pageTitle.textContent = views[view];
}

function statusClass(value) {
  if (["高", "已收款", "已转化", "已报名"].includes(value)) return "high paid done";
  if (["中", "待收款", "待到课", "待跟进", "已预约"].includes(value)) return "medium pending";
  return "low unpaid";
}

function buildAiInsight(lead) {
  const note = lead.note || "";
  const signals = [];
  if (note.includes("预算")) signals.push("已出现预算信号，可进入价格与优惠方案沟通。");
  if (note.includes("时间") || note.includes("晚") || note.includes("寒假")) {
    signals.push("存在时间安排因素，需要优先确认可上课时段。");
  }
  if (note.includes("数学") || note.includes("英语") || note.includes("编程")) {
    signals.push("课程兴趣明确，可补充对应课程案例和试听安排。");
  }

  let risk = "中";
  let opportunity = "中";
  let summary = "客户仍处于需求确认阶段，需要通过下一次沟通补齐预算、时间和课程目标。";
  let nextAction = "补充跟进记录，确认家长决策人、预算范围和试听时间。";
  let script = `您好，我是${lead.advisor}。想和您确认一下孩子目前的学习目标和合适的试听时间，我这边可以根据情况帮您匹配课程方案。`;

  if (lead.intent === "高" && lead.status === "待跟进") {
    risk = "高";
    opportunity = "高";
    summary = "客户意向强但尚未预约，存在被其他机构截流的风险，建议当天优先电话触达。";
    nextAction = "15分钟内电话沟通，目标是确认试听时间并锁定到课。";
    script = `您好，我是${lead.advisor}。看到您关注的课程方向比较明确，我先帮您预留一个合适的试听名额。孩子目前最想提升的是哪一块？我可以按目标给您匹配老师和时间。`;
  } else if (lead.status === "已预约") {
    risk = "中";
    opportunity = "高";
    summary = "客户已进入试听前节点，转化关键在于降低爽约和试听后犹豫。";
    nextAction = "试听前一天确认到课，补充老师介绍、课程收益和路线提醒。";
    script = `您好，我和您确认一下试听安排。老师会先了解孩子基础，再给出学习建议。您到时可以重点观察孩子的参与度和老师反馈。`;
  } else if (lead.intent === "低" || lead.status === "已流失") {
    risk = "低";
    opportunity = "低";
    summary = "客户短期转化概率低，适合进入长期培育池，避免高频打扰。";
    nextAction = "每两周维护一次，发送课程资料、公开课或阶段性活动。";
    script = `您好，之前了解您暂时不方便安排课程。我后续可以把适合孩子阶段的学习资料发您参考，有合适时间我们再约体验。`;
  } else if (lead.status === "已报名") {
    risk = "低";
    opportunity = "中";
    summary = "客户已完成报名，重点从转化推进切换为交付体验和续费基础维护。";
    nextAction = "同步教务排课，跟进首次上课反馈，沉淀续费触点。";
    script = `您好，报名后我会和教务一起跟进排课。首次课后我们会同步孩子表现和后续学习建议，您有问题也可以随时联系我。`;
  }

  if (signals.length === 0) {
    signals.push("备注信息较少，建议下一次沟通补充预算、时间、课程目标和决策人。");
  }

  return {
    leadId: lead.id,
    risk,
    opportunity,
    summary,
    signals,
    nextAction,
    script,
    disclaimer: "基于当前线索信息生成的建议，属于模拟 AI 产品原型输出。",
  };
}

function getAiInsights() {
  return state.leads.map(buildAiInsight);
}

function renderMetrics() {
  const enrolled = state.leads.filter((lead) => lead.status === "已报名").length;
  const booked = state.leads.filter((lead) => ["已预约", "已报名"].includes(lead.status)).length;
  const conversion = booked ? Math.round((enrolled / booked) * 100) : 0;
  const paid = state.orders
    .filter((order) => order.status === "已收款")
    .reduce((sum, order) => sum + order.amount, 0);
  const unpaid = state.orders
    .filter((order) => order.status !== "已收款")
    .reduce((sum, order) => sum + order.amount, 0);
  const hours = state.students.reduce(
    (sum, student) => sum + student.boughtHours - student.usedHours,
    0,
  );

  document.querySelector("#metric-leads").textContent = formatter.format(state.leads.length);
  document.querySelector("#metric-leads-change").textContent =
    `${state.leads.filter((lead) => lead.status === "待跟进").length} 条待跟进`;
  document.querySelector("#metric-conversion").textContent = `${conversion}%`;
  document.querySelector("#metric-paid").textContent = moneyFormatter.format(paid);
  document.querySelector("#metric-unpaid").textContent = `待收 ${moneyFormatter.format(unpaid)}`;
  document.querySelector("#metric-hours").textContent = formatter.format(hours);
  const insights = getAiInsights();
  document.querySelector("#metric-ai-risk").textContent = formatter.format(
    insights.filter((item) => item.risk === "高").length,
  );
  document.querySelector("#metric-ai-opportunity").textContent = formatter.format(
    insights.filter((item) => item.opportunity === "高").length,
  );
}

function renderFunnel() {
  const funnel = [
    ["线索", state.leads.length],
    ["已预约", state.leads.filter((lead) => ["已预约", "已报名"].includes(lead.status)).length],
    ["已报名", state.leads.filter((lead) => lead.status === "已报名").length],
  ];
  const max = Math.max(...funnel.map((item) => item[1]), 1);

  document.querySelector("#funnel").innerHTML = funnel
    .map(([label, value]) => {
      const width = Math.max((value / max) * 100, 8);
      return `
        <div class="funnel-row">
          <span>${label}</span>
          <div class="track"><div class="fill" style="width:${width}%"></div></div>
          <strong>${value}</strong>
        </div>
      `;
    })
    .join("");
}

function renderAdvisorBars() {
  const totals = state.orders.reduce((result, order) => {
    result[order.advisor] = (result[order.advisor] || 0) + order.amount;
    return result;
  }, {});
  const max = Math.max(...Object.values(totals), 1);

  document.querySelector("#advisor-bars").innerHTML = Object.entries(totals)
    .map(([advisor, amount]) => {
      const width = (amount / max) * 100;
      return `
        <div class="bar-item">
          <div class="bar-head">
            <strong>${advisor}</strong>
            <span>${moneyFormatter.format(amount)}</span>
          </div>
          <div class="track"><div class="fill" style="width:${width}%"></div></div>
        </div>
      `;
    })
    .join("");
}

function renderFollowList() {
  const today = "2026-07-06";
  const follows = state.leads.filter((lead) => lead.nextFollow <= today && lead.status !== "已报名");
  document.querySelector("#follow-count").textContent = `${follows.length} 项`;
  document.querySelector("#follow-list").innerHTML = follows
    .map(
      (lead) => `
        <article class="work-item">
          <div>
            <strong>${lead.name}</strong>
            <div class="meta">${lead.note}</div>
          </div>
          <span class="badge ${statusClass(lead.intent)}">${lead.intent}</span>
        </article>
      `,
    )
    .join("");
}

function renderLeadTable() {
  const leads = getVisibleLeads();
  document.querySelector("#lead-table").innerHTML = leads
    .map(
      (lead) => `
        <tr>
          <td>
            <div class="person">
              <strong>${lead.name}</strong>
              <small>${lead.phone}</small>
            </div>
          </td>
          <td>${lead.source}</td>
          <td><span class="badge ${statusClass(lead.intent)}">${lead.intent}</span></td>
          <td><span class="badge ${statusClass(lead.status)}">${lead.status}</span></td>
          <td>${lead.advisor}</td>
          <td>${lead.nextFollow}</td>
          <td><button class="row-action" data-id="${lead.id}" type="button">推进</button></td>
          <td><button class="row-action ai-action" data-ai-id="${lead.id}" type="button">AI分析</button></td>
        </tr>
      `,
    )
    .join("");
}

function renderStudents() {
  document.querySelector("#student-grid").innerHTML = state.students
    .map((student) => {
      const remaining = student.boughtHours - student.usedHours;
      const usedRate = Math.round((student.usedHours / student.boughtHours) * 100);
      return `
        <article class="data-card">
          <h3>${student.name}</h3>
          <div class="meta">${student.course}</div>
          <div class="card-line"><span>负责顾问</span><strong>${student.advisor}</strong></div>
          <div class="card-line"><span>剩余课时</span><strong>${remaining} / ${student.boughtHours}</strong></div>
          <div class="progress" aria-label="课时消耗"><span style="width:${usedRate}%"></span></div>
          <div class="card-line"><span>订单金额</span><strong>${moneyFormatter.format(student.amount)}</strong></div>
        </article>
      `;
    })
    .join("");
}

function renderTrials() {
  document.querySelector("#trial-grid").innerHTML = state.trials
    .map(
      (trial) => `
        <article class="data-card">
          <h3>${trial.name}</h3>
          <div class="meta">${trial.course}</div>
          <div class="card-line"><span>时间</span><strong>${trial.time}</strong></div>
          <div class="card-line"><span>老师</span><strong>${trial.teacher}</strong></div>
          <div class="card-line"><span>结果</span><span class="badge ${statusClass(trial.result)}">${trial.result}</span></div>
        </article>
      `,
    )
    .join("");
}

function renderOrders() {
  document.querySelector("#order-table").innerHTML = state.orders
    .map(
      (order) => `
        <tr>
          <td>
            <div class="person">
              <strong>${order.id}</strong>
              <small>${order.student}</small>
            </div>
          </td>
          <td>${order.course}</td>
          <td>${moneyFormatter.format(order.amount)}</td>
          <td><span class="badge ${statusClass(order.status)}">${order.status}</span></td>
          <td>${order.advisor}</td>
          <td>${order.createdAt}</td>
        </tr>
      `,
    )
    .join("");
}

function renderWorkflow() {
  document.querySelector("#workflow-steps").innerHTML = state.workflow
    .map(
      (item, index) => `
        <article class="step-item">
          <div class="step-index">${index + 1}</div>
          <div>
            <h3>${item.step}</h3>
            <div class="meta">负责人：${item.owner}</div>
            <div class="step-flow">
              <span>${item.input}</span>
              <strong>→</strong>
              <span>${item.output}</span>
            </div>
          </div>
        </article>
      `,
    )
    .join("");

  document.querySelector("#entity-list").innerHTML = state.entities
    .map(
      ([code, name, fields]) => `
        <article class="entity-item">
          <strong>${code}</strong>
          <div>
            <span>${name}</span>
            <small>${fields}</small>
          </div>
        </article>
      `,
    )
    .join("");

  document.querySelector("#risk-list").innerHTML = state.risks
    .map(
      (risk) => `
        <article class="risk-item">
          <h3>${risk.title}</h3>
          <p>${risk.detail}</p>
          <div class="meta">${risk.action}</div>
        </article>
      `,
    )
    .join("");
}

function renderAiAssistant(selectedId) {
  const selectedLeadId = selectedId || Number(aiLeadSelect.value) || state.leads[0]?.id;
  aiLeadSelect.innerHTML = state.leads
    .map(
      (lead) => `
        <option value="${lead.id}" ${lead.id === selectedLeadId ? "selected" : ""}>
          ${lead.name}｜${lead.intent}｜${lead.status}
        </option>
      `,
    )
    .join("");

  const lead = state.leads.find((item) => item.id === selectedLeadId) || state.leads[0];
  if (!lead) return;
  const insight = buildAiInsight(lead);
  document.querySelector("#ai-insight").innerHTML = `
    <article class="insight-card">
      <div class="insight-head">
        <div>
          <h3>${lead.name}</h3>
          <div class="meta">${lead.source} / ${lead.advisor} / 下次跟进 ${lead.nextFollow}</div>
        </div>
        <div class="insight-badges">
          <span class="badge ${statusClass(insight.risk)}">风险 ${insight.risk}</span>
          <span class="badge ${statusClass(insight.opportunity)}">机会 ${insight.opportunity}</span>
        </div>
      </div>
      <div class="insight-section">
        <strong>意向判断</strong>
        <p>${insight.summary}</p>
      </div>
      <div class="insight-section">
        <strong>识别信号</strong>
        <ul>${insight.signals.map((signal) => `<li>${signal}</li>`).join("")}</ul>
      </div>
      <div class="insight-section">
        <strong>下一步动作</strong>
        <p>${insight.nextAction}</p>
      </div>
      <div class="script-box">
        <strong>推荐话术</strong>
        <p>${insight.script}</p>
      </div>
      <div class="ai-disclaimer">${insight.disclaimer}</div>
    </article>
  `;

  const score = { 高: 3, 中: 2, 低: 1 };
  const queue = getAiInsights()
    .map((item) => ({
      ...item,
      lead: state.leads.find((leadItem) => leadItem.id === item.leadId),
    }))
    .sort((a, b) => score[b.risk] + score[b.opportunity] - (score[a.risk] + score[a.opportunity]));

  document.querySelector("#ai-queue").innerHTML = queue
    .map(
      (item) => `
        <article class="queue-item">
          <div>
            <strong>${item.lead.name}</strong>
            <div class="meta">${item.summary}</div>
          </div>
          <button class="row-action ai-action" data-ai-id="${item.lead.id}" type="button">查看</button>
        </article>
      `,
    )
    .join("");
}

function renderAll() {
  renderMetrics();
  renderFunnel();
  renderAdvisorBars();
  renderFollowList();
  renderLeadTable();
  renderStudents();
  renderTrials();
  renderOrders();
  renderWorkflow();
  renderAiAssistant();
}

function advanceLead(id) {
  const lead = state.leads.find((item) => item.id === id);
  if (!lead) return;
  const nextStatus = {
    待跟进: "已预约",
    已预约: "已报名",
    已报名: "已报名",
    已流失: "待跟进",
  };
  lead.status = nextStatus[lead.status] || "待跟进";
  renderAll();
}

function exportCsv() {
  const header = ["姓名", "电话", "来源", "意向", "状态", "负责人", "下次跟进", "备注"];
  const rows = getVisibleLeads().map((lead) => [
    lead.name,
    lead.phone,
    lead.source,
    lead.intent,
    lead.status,
    lead.advisor,
    lead.nextFollow,
    lead.note,
  ]);
  const csv = [header, ...rows]
    .map((row) => row.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(","))
    .join("\n");
  const blob = new Blob([`\ufeff${csv}`], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "eduflow-leads.csv";
  link.click();
  URL.revokeObjectURL(url);
}

document.querySelectorAll(".nav-item").forEach((item) => {
  item.addEventListener("click", () => setView(item.dataset.view));
});

document.querySelectorAll(".segment").forEach((segment) => {
  segment.addEventListener("click", () => {
    state.activeFilter = segment.dataset.filter;
    document.querySelectorAll(".segment").forEach((item) => {
      item.classList.toggle("active", item === segment);
    });
    renderLeadTable();
  });
});

document.querySelector("#lead-table").addEventListener("click", (event) => {
  const aiButton = event.target.closest("[data-ai-id]");
  if (aiButton) {
    setView("ai");
    renderAiAssistant(Number(aiButton.dataset.aiId));
    return;
  }
  const button = event.target.closest("[data-id]");
  if (button) advanceLead(Number(button.dataset.id));
});

document.querySelector("#ai-queue").addEventListener("click", (event) => {
  const button = event.target.closest("[data-ai-id]");
  if (button) renderAiAssistant(Number(button.dataset.aiId));
});

aiLeadSelect.addEventListener("change", () => {
  renderAiAssistant(Number(aiLeadSelect.value));
});

searchInput.addEventListener("input", renderLeadTable);

document.querySelector("#new-lead-button").addEventListener("click", () => {
  const dateInput = leadForm.elements.nextFollow;
  dateInput.valueAsDate = new Date();
  leadDialog.showModal();
});

document.querySelectorAll("[value='cancel']").forEach((button) => {
  button.addEventListener("click", () => leadDialog.close());
});

leadForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(leadForm);
  state.leads.unshift({
    id: Date.now(),
    name: formData.get("name"),
    phone: formData.get("phone"),
    source: formData.get("source"),
    intent: formData.get("intent"),
    status: "待跟进",
    advisor: formData.get("advisor"),
    nextFollow: formData.get("nextFollow"),
    note: formData.get("note") || "新线索待首次沟通。",
  });
  leadForm.reset();
  leadDialog.close();
  setView("leads");
  renderAll();
});

document.querySelector("#export-button").addEventListener("click", exportCsv);

renderAll();
