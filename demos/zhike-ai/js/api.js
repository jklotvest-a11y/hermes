/**
 * 智客 AI - API 客户端
 * 所有页面通过此模块调用后端接口
 */
const API_BASE = 'http://localhost:8000';
const USE_MOCK_API = true;
const USE_QDRANT_PROXY = ['8788'].includes(window.location.port);

const MOCK_NOW = new Date('2026-07-05T10:30:00+08:00');

const mockState = {
    user: { id: 1, nickname: 'Jessie', role: '产品经理候选人' },
    conversations: [
        { id: 1, buyer_id: 'tb_1028', platform: 'taobao', order_id: 'TB20260705001', status: 'active', agent_type: 'bot', created_at: '2026-07-05T09:42:00+08:00' },
        { id: 2, buyer_id: 'jd_8842', platform: 'jd', order_id: 'JD20260704018', status: 'resolved', agent_type: 'bot', created_at: '2026-07-05T08:16:00+08:00' },
        { id: 3, buyer_id: 'pdd_5271', platform: 'pinduoduo', order_id: 'PDD20260703032', status: 'escalated', agent_type: 'human', created_at: '2026-07-04T18:28:00+08:00' },
        { id: 4, buyer_id: 'tb_3317', platform: 'taobao', order_id: 'TB20260702009', status: 'resolved', agent_type: 'bot', created_at: '2026-07-04T15:03:00+08:00' },
        { id: 5, buyer_id: 'jd_4106', platform: 'jd', order_id: 'JD20260701088', status: 'active', agent_type: 'human', created_at: '2026-07-04T11:40:00+08:00' },
        { id: 6, buyer_id: 'tb_0924', platform: 'taobao', order_id: 'TB20260630011', status: 'resolved', agent_type: 'bot', created_at: '2026-07-03T20:20:00+08:00' }
    ],
    messages: {
        1: [
            { sender: 'buyer', content: '你好，我这个订单什么时候发货？', created_at: '2026-07-05T09:42:00+08:00' },
            { sender: 'bot', content: '您好，现货商品通常会在下单后 48 小时内发出。您的订单预计今天 18:00 前揽收。', created_at: '2026-07-05T09:42:08+08:00' },
            { sender: 'buyer', content: '可以改一下收货地址吗？', created_at: '2026-07-05T09:43:10+08:00' },
            { sender: 'bot', content: '订单未出库前可以修改地址。我已为您标记为需要人工确认，请客服协助处理。', created_at: '2026-07-05T09:43:18+08:00' }
        ],
        2: [
            { sender: 'buyer', content: '收到后不合适可以退吗？', created_at: '2026-07-05T08:16:00+08:00' },
            { sender: 'bot', content: '支持 7 天无理由退换，商品需保持未使用且配件齐全。', created_at: '2026-07-05T08:16:06+08:00' }
        ],
        3: [
            { sender: 'buyer', content: '优惠券为什么用不了？', created_at: '2026-07-04T18:28:00+08:00' },
            { sender: 'bot', content: '我没有找到完全匹配的优惠规则，已转人工进一步确认。', created_at: '2026-07-04T18:28:12+08:00' },
            { sender: 'human', content: '这张券仅限满 299 使用，当前订单金额未达到门槛。', created_at: '2026-07-04T18:31:00+08:00' }
        ]
    },
    knowledge: [
        { id: 1, title: '什么时候发货？', content: '现货商品下单后 48 小时内发货，预售商品以商品详情页时间为准。', category: 'shipping', keywords: ['发货', '物流', '揽收'], is_active: true, created_at: '2026-07-01T10:00:00+08:00' },
        { id: 2, title: '支持七天无理由退换吗？', content: '支持七天无理由退换，商品需保持不影响二次销售。', category: 'after_sale', keywords: ['退货', '换货', '售后'], is_active: true, created_at: '2026-07-01T11:00:00+08:00' },
        { id: 3, title: '优惠券无法使用怎么办？', content: '请确认优惠券门槛、适用品类和有效期，如仍异常可转人工处理。', category: 'promotion', keywords: ['优惠券', '满减', '活动'], is_active: true, created_at: '2026-07-02T09:30:00+08:00' },
        { id: 4, title: '可以修改收货地址吗？', content: '订单未出库前可修改地址，已出库订单需要联系快递尝试改派。', category: 'shipping', keywords: ['地址', '改地址', '收货'], is_active: true, created_at: '2026-07-03T14:20:00+08:00' },
        { id: 5, title: '发票怎么开？', content: '确认收货后可在订单详情申请电子发票，企业发票需填写抬头和税号。', category: 'invoice', keywords: ['发票', '抬头', '税号'], is_active: false, created_at: '2026-07-04T16:10:00+08:00' }
    ],
    shops: [
        { id: 1, name: '拾光家居旗舰店', platform: 'taobao' },
        { id: 2, name: '南风生活馆', platform: 'jd' },
        { id: 3, name: '软装优选店', platform: 'taobao' },
        { id: 4, name: '好物小铺', platform: 'pinduoduo' },
        { id: 5, name: '家具严选', platform: 'taobao' }
    ],
    products: [
        { id: 1, name: '奶油风布艺沙发' },
        { id: 2, name: '落地灯' },
        { id: 3, name: '圆形茶几' },
        { id: 4, name: '窗帘套装' }
    ]
};

// 从 localStorage 获取 token
function getToken() { return localStorage.getItem('zhike_token') || ''; }
function saveToken(token) { localStorage.setItem('zhike_token', token); }
function getUser() { try { return JSON.parse(localStorage.getItem('zhike_user') || 'null'); } catch { return null; } }
function saveUser(u) { localStorage.setItem('zhike_user', JSON.stringify(u)); }

function logout() {
    localStorage.removeItem('zhike_token');
    localStorage.removeItem('zhike_user');
    window.location.href = 'login.html';
}

function requireAuth() {
    if (!getToken()) { window.location.href = 'login.html'; return false; }
    return true;
}

async function api(url, options = {}) {
    if (USE_MOCK_API) return mockApi(url, options);
    const token = getToken();
    const headers = { 'Content-Type': 'application/json', ...options.headers };
    if (token) headers['Authorization'] = `Bearer ${token}`;
    const res = await fetch(API_BASE + url, { ...options, headers });
    if (res.status === 401) { logout(); return null; }
    if (!res.ok) {
        const err = await res.json().catch(() => ({ detail: '请求失败' }));
        throw new Error(err.detail || '请求失败');
    }
    return res.json();
}

async function mockApi(url, options = {}) {
    await new Promise(resolve => setTimeout(resolve, 120));
    const [path, queryString = ''] = url.split('?');
    const params = new URLSearchParams(queryString);
    const method = (options.method || 'GET').toUpperCase();

    if (path === '/api/auth/login' || path === '/api/auth/register') {
        saveToken('mock-token');
        saveUser(mockState.user);
        return { token: 'mock-token', user: mockState.user };
    }
    if (path === '/api/auth/me') return mockState.user;
    if (path === '/api/analytics/summary') return mockAnalytics();
    if (path === '/api/conversations') return limitList(mockState.conversations, params);
    if (/^\/api\/conversations\/\d+\/messages$/.test(path)) {
        const id = Number(path.match(/\d+/)[0]);
        return mockState.messages[id] || mockState.messages[1] || [];
    }
    if (path === '/api/knowledge/search') {
        const proxyResults = await tryQdrantSearch(options);
        if (proxyResults) return proxyResults;
        const body = parseBody(options);
        const query = (body.query || '').toLowerCase();
        return mockState.knowledge
            .map(item => ({ ...item, score: scoreKnowledge(item, query) }))
            .filter(item => item.score > 0)
            .sort((a, b) => b.score - a.score)
            .slice(0, body.limit || 5);
    }
    if (path === '/api/knowledge') {
        if (method === 'POST') {
            const body = parseBody(options);
            const item = { id: Date.now(), created_at: MOCK_NOW.toISOString(), ...body };
            mockState.knowledge.unshift(item);
            return item;
        }
        const proxyItems = await tryQdrantList(params);
        if (proxyItems) return proxyItems;
        const category = params.get('category');
        let items = [...mockState.knowledge];
        if (category) items = items.filter(item => item.category === category);
        return limitList(items, params);
    }
    if (/^\/api\/knowledge\/\d+$/.test(path)) {
        const id = Number(path.match(/\d+/)[0]);
        const index = mockState.knowledge.findIndex(item => item.id === id);
        if (method === 'DELETE') {
            if (index >= 0) mockState.knowledge.splice(index, 1);
            return { ok: true };
        }
        if (method === 'PUT') {
            const body = parseBody(options);
            if (index >= 0) mockState.knowledge[index] = { ...mockState.knowledge[index], ...body };
            return mockState.knowledge[index] || body;
        }
    }
    if (path === '/api/shops') return limitList(mockState.shops, params);
    if (path === '/api/products') return limitList(mockState.products, params);
    return {};
}

async function tryQdrantSearch(options) {
    if (!USE_QDRANT_PROXY) return null;
    try {
        const response = await fetch('/api/knowledge/search', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: options.body || '{}'
        });
        if (!response.ok) return null;
        const data = await response.json();
        if (data && data.fallback === false && Array.isArray(data.items)) return data.items;
    } catch (error) {
        console.warn('Qdrant search fallback to mock data', error);
    }
    return null;
}

async function tryQdrantList(params) {
    if (!USE_QDRANT_PROXY) return null;
    try {
        const response = await fetch(`/api/knowledge?${params.toString()}`);
        if (!response.ok) return null;
        const data = await response.json();
        if (data && data.fallback === false && Array.isArray(data.items)) return data.items;
    } catch (error) {
        console.warn('Qdrant list fallback to mock data', error);
    }
    return null;
}

function parseBody(options) {
    try { return JSON.parse(options.body || '{}'); } catch { return {}; }
}

function limitList(items, params) {
    const limit = Number(params.get('limit') || items.length);
    const offset = Number(params.get('offset') || 0);
    return items.slice(offset, offset + limit);
}

function mockAnalytics() {
    const total = mockState.conversations.length;
    const resolved = mockState.conversations.filter(c => c.status === 'resolved').length;
    const bot = mockState.conversations.filter(c => c.agent_type === 'bot').length;
    const totalMessages = Object.values(mockState.messages).flat().length + 42;
    return {
        total_conversations: 1286,
        today_conversations: 86,
        total_messages: totalMessages,
        today_messages: 314,
        total_users: 536,
        total_shops: mockState.shops.length,
        total_products: mockState.products.length,
        bot_resolution_rate: Math.round((bot / total) * 100),
        resolved_rate: Math.round((resolved / total) * 100)
    };
}

function scoreKnowledge(item, query) {
    if (!query) return 1;
    const haystack = [item.title, item.content, item.category, ...(item.keywords || [])].join(' ').toLowerCase();
    if (haystack.includes(query)) return 0.92;
    return (item.keywords || []).some(k => query.includes(k.toLowerCase())) ? 0.78 : 0;
}

function qs(params = {}) {
    return new URLSearchParams(Object.entries(params).filter(([_, v]) => v !== undefined && v !== null && v !== '')).toString();
}

// ============ 认证 ============
const AuthAPI = {
    login: (username, password) => api('/api/auth/login', { method: 'POST', body: JSON.stringify({ username, password }) }),
    register: (phone, nickname, password) => api('/api/auth/register', { method: 'POST', body: JSON.stringify({ phone, nickname, password }) }),
    getMe: () => api('/api/auth/me'),
};

// ============ 仪表盘 ============
const DashboardAPI = {
    analytics: () => api('/api/analytics/summary'),
    conversations: (params = {}) => api(`/api/conversations?${qs(params)}`),
    messages: (convId) => api(`/api/conversations/${convId}/messages`),
};

// ============ 知识库 ============
const KnowledgeAPI = {
    list: (params = {}) => api(`/api/knowledge?${qs(params)}`),
    search: (query, limit = 5) => api('/api/knowledge/search', { method: 'POST', body: JSON.stringify({ query, limit }) }),
    create: (data) => api('/api/knowledge', { method: 'POST', body: JSON.stringify(data) }),
    update: (id, data) => api(`/api/knowledge/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    delete: (id) => api(`/api/knowledge/${id}`, { method: 'DELETE' }),
};

// ============ 店铺 ============
const ShopAPI = {
    list: (params = {}) => api(`/api/shops?${qs(params)}`),
};

// ============ 商品 ============
const ProductAPI = {
    list: (params = {}) => api(`/api/products?${qs(params)}`),
};

// ============ 会话 ============
const ConversationAPI = {
    list: (params = {}) => api(`/api/conversations?${qs(params)}`),
    messages: (convId, limit = 50) => api(`/api/conversations/${convId}/messages?limit=${limit}`),
};

// ============ 公共：侧边栏渲染 ============
function renderSidebar(activePage) {
    return `
    <aside class="sidebar">
      <div class="sidebar-logo">
        <div class="logo-icon">🤖</div>
        <div class="logo-text">智客<span class="accent">AI</span></div>
      </div>
      <nav class="sidebar-menu">
        <div class="menu-group-title">工作台</div>
        <a class="menu-item ${activePage === 'dashboard' ? 'active' : ''}" href="dashboard.html"><span class="icon">📊</span><span>数据概览</span></a>
        <a class="menu-item ${activePage === 'conversations' ? 'active' : ''}" href="conversations.html"><span class="icon">💬</span><span>会话管理</span></a>
        <div class="menu-group-title">知识库</div>
        <a class="menu-item ${activePage === 'knowledge' ? 'active' : ''}" href="knowledge.html"><span class="icon">📚</span><span>FAQ 管理</span></a>
        <div class="menu-group-title">数据</div>
        <a class="menu-item ${activePage === 'analytics' ? 'active' : ''}" href="analytics.html"><span class="icon">📈</span><span>数据分析</span></a>
      </nav>
      <div class="sidebar-footer">
        <div class="avatar" id="user-avatar" style="background: linear-gradient(135deg, #FF6B35, #FFB627);">?</div>
        <div class="user-info">
          <div class="user-name" id="user-name">加载中...</div>
          <div class="user-role" style="cursor:pointer" onclick="logout()">退出登录</div>
        </div>
      </div>
    </aside>`;
}

// ============ 公共：初始化用户信息 ============
async function initUser() {
    try {
        const me = await AuthAPI.getMe();
        if (me) {
            saveUser(me);
            const avatar = document.getElementById('user-avatar');
            const name = document.getElementById('user-name');
            if (avatar) avatar.textContent = (me.nickname || '?')[0];
            if (name) name.textContent = me.nickname || '用户';
            return me;
        }
    } catch (e) { console.warn('获取用户信息失败', e); }
    return null;
}

// ============ 公共：日期格式化 ============
function formatDate(d) {
    if (!d) return '-';
    const date = new Date(d);
    const now = new Date();
    const diff = (now - date) / 1000;
    if (diff < 60) return '刚刚';
    if (diff < 3600) return `${Math.floor(diff / 60)} 分钟前`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} 小时前`;
    if (diff < 7 * 86400) return `${Math.floor(diff / 86400)} 天前`;
    return date.toLocaleDateString('zh-CN');
}

function formatTime(d) {
    if (!d) return '-';
    const date = new Date(d);
    return date.toLocaleString('zh-CN', { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' });
}
