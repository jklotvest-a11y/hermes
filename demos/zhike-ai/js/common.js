// Web 端公共 JS
document.addEventListener('DOMContentLoaded', () => {
  // 侧边栏菜单高亮
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.menu-item').forEach(el => {
    if (el.dataset.page === path.replace('.html', '')) {
      el.classList.add('active');
    }
  });
});
