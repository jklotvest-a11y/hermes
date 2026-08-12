(function () {
    var OWNER_KEY = 'jessie-portfolio-owner-mode';
    var params = new URLSearchParams(window.location.search);

    // ?owner=1 enables a persistent local exclusion mode for the site owner.
    if (params.get('owner') === '1') {
        window.localStorage.setItem(OWNER_KEY, '1');
    } else if (params.get('owner') === '0') {
        window.localStorage.removeItem(OWNER_KEY);
    }

    var isLocal = /^(localhost|127\.0\.0\.1|0\.0\.0\.0)$/.test(window.location.hostname);
    var isOwner = window.localStorage.getItem(OWNER_KEY) === '1';
    if (isLocal || isOwner) {
        return;
    }

    var script = document.createElement('script');
    script.defer = true;
    script.src = '/_vercel/insights/script.js';
    document.head.appendChild(script);
})();
