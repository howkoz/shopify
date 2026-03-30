/**
 * Shopify Hub — Persistent Sidebar Navigation
 * Drop <script src="sidebar.js"></script> into any page.
 * Auto-injects sidebar HTML + CSS + layout shift.
 */
(function () {
  'use strict';

  var SIDEBAR_W = 230;

  /* ── Navigation tree ── */
  var sections = [
    { label: 'Hub', items: [
      { name: 'Command Center', href: 'index.html', icon: '⌘' }
    ]},
    { label: 'Demos', items: [
      { name: 'Demos Hub', href: 'demos.html', icon: '🎬' },
      { name: 'Checkout Demo', href: 'shopify-demo-v3.html', icon: '🛒' },
      { name: 'Dual Checkout', href: 'dual-checkout-demo.html', icon: '🔀' },
      { name: 'Shop Pay UX', href: 'shop-pay-experience.html', icon: '💳' },
      { name: 'Shop Pay Technical', href: 'shop-pay-technical-demo.html', icon: '⚙' }
    ]},
    { label: 'POS Pilot', items: [
      { name: 'POS Hub', href: 'pos-pilot.html', icon: '📋' },
      { name: 'Pilot Dashboard', href: 'shopify-pos-pilot-dashboard.html', icon: '📊' },
      { name: 'D2D Order Sync', href: 'shopify-pos-order-sync-model.html', icon: '🔄' },
      { name: 'Distributor Arch', href: 'shopify-pos-distributor-architecture.html', icon: '🏗' },
      { name: 'POS Sales', href: 'shopify-pos-sales-dashboard.html', icon: '📈' }
    ]},
    { label: 'Operations', items: [
      { name: 'Operations Hub', href: 'operations.html', icon: '📖' },
      { name: 'Admin Guide', href: 'shopify-admin-operations-guide.html', icon: '🔧' },
      { name: 'Settings Ref', href: 'shopify-settings-reference.html', icon: '⚙' },
      { name: 'Pros & Cons', href: 'shopify-pros-cons.html', icon: '⚖' },
      { name: 'Configurations', href: 'shopify-configurations.html', icon: '🔩' },
      { name: 'Architecture Flows', href: 'shopify-architecture-flows.html', icon: '🏛' }
    ]},
    { label: 'Payments', items: [
      { name: 'Payments Hub', href: 'payments.html', icon: '💳' },
      { name: 'ShopPay + WorldPay', href: 'shop-pay-worldpay-flows.html', icon: '🌐' },
      { name: 'Unified Demo', href: 'shop-pay-worldpay-unified-demo.html', icon: '🔐' },
      { name: 'Checkout Extend', href: 'checkout-extensibility.html', icon: '🧩' }
    ]},
    { label: 'Global Markets', items: [
      { name: 'Markets Hub', href: 'global-markets.html', icon: '🌍' },
      { name: 'Cost Calculator v3', href: 'global-market-costs-v3.html', icon: '💵' },
      { name: 'Decision Tool v4', href: 'market-decision-tool-v4.html', icon: '🎯' },
      { name: 'Markets Config', href: 'markets-configuration.html', icon: '⚙' },
      { name: 'Expansion Stores', href: 'expansion-stores.html', icon: '🏪' },
      { name: 'Enterprise Case', href: 'enterprise-justification.html', icon: '🏢' }
    ]},
    { label: 'US Migration', items: [
      { name: 'Migration Hub', href: 'migration.html', icon: '🚚' },
      { name: 'Orders Dashboard', href: 'orders_export_1-dashboard.html', icon: '📦' },
      { name: 'POS Sales Dash', href: 'pos-sales-dashboard.html', icon: '📈' }
    ]},
    { label: 'Data & Tools', items: [
      { name: 'Data Hub', href: 'data-tools.html', icon: '🔬' },
      { name: 'Analytics Cross-Mkt', href: 'analytics-cross-market.html', icon: '📊' }
    ]},
    { label: 'Strategy', items: [
      { name: 'Strategy Hub', href: 'strategy.html', icon: '🎯' },
      { name: 'Shopify Audiences', href: 'shopify-audiences.html', icon: '👥' }
    ]},
    { label: 'Automation', items: [
      { name: 'Shopify Flow', href: 'shopify-flow.html', icon: '⚡' },
      { name: 'Scripts Migration', href: 'scripts-migration.html', icon: '📜' },
      { name: 'Webhooks', href: 'webhook-integration.html', icon: '🔗' },
      { name: 'Launchpad', href: 'launchpad.html', icon: '🚀' }
    ]},
    { label: 'Security', items: [
      { name: 'Org Permissions', href: 'org-admin-permissions.html', icon: '🔒' },
      { name: 'Multipass SSO', href: 'multipass-sso.html', icon: '🔑' },
      { name: 'App Governance', href: 'app-governance.html', icon: '🛡' },
      { name: 'Data Privacy', href: 'data-privacy.html', icon: '🔐' }
    ]},
    { label: 'B2B & Commerce', items: [
      { name: 'B2B Wholesale', href: 'b2b-wholesale.html', icon: '🏭' },
      { name: 'Inventory Arch', href: 'inventory-architecture.html', icon: '📦' },
      { name: 'Fulfillment', href: 'fulfillment-returns.html', icon: '🚛' }
    ]},
    { label: 'Compliance', items: [
      { name: 'Tax Compliance', href: 'tax-compliance.html', icon: '📋' }
    ]}
  ];

  /* ── Detect current page ── */
  var currentFile = location.pathname.split('/').pop() || 'index.html';

  /* ── Inject CSS ── */
  var style = document.createElement('style');
  style.textContent = [
    '.shub-sidebar{position:fixed;top:0;left:0;bottom:0;width:' + SIDEBAR_W + 'px;background:#161b22;border-right:1px solid rgba(88,166,255,0.15);display:flex;flex-direction:column;z-index:9000;font-family:"DM Sans",-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;overflow:hidden}',
    '.shub-sidebar *{box-sizing:border-box;margin:0;padding:0}',
    '.shub-brand{padding:16px 16px 12px;border-bottom:1px solid rgba(88,166,255,0.15);display:flex;align-items:center;gap:10px;text-decoration:none;color:#e6edf3}',
    '.shub-brand:hover{opacity:0.9}',
    '.shub-logo{width:32px;height:32px;border-radius:8px;background:linear-gradient(135deg,#58a6ff,#39d2c0);display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:800;color:#fff;flex-shrink:0}',
    '.shub-brand-text{font-size:13px;font-weight:700;color:#e6edf3;letter-spacing:-0.3px}',
    '.shub-brand-sub{font-size:10px;color:rgba(230,237,243,0.5)}',
    '.shub-scroll{flex:1;overflow-y:auto;padding:6px 0}',
    '.shub-scroll::-webkit-scrollbar{width:4px}',
    '.shub-scroll::-webkit-scrollbar-track{background:transparent}',
    '.shub-scroll::-webkit-scrollbar-thumb{background:rgba(88,166,255,0.2);border-radius:2px}',
    '.shub-section{padding:2px 10px}',
    '.shub-label{font-size:9px;text-transform:uppercase;letter-spacing:1.2px;color:rgba(230,237,243,0.4);font-weight:700;padding:10px 8px 4px}',
    '.shub-nav{display:flex;align-items:center;gap:8px;padding:6px 10px;border-radius:6px;font-size:12px;color:rgba(230,237,243,0.7);text-decoration:none;transition:all .15s;margin-bottom:1px}',
    '.shub-nav:hover{background:rgba(88,166,255,0.07);color:#e6edf3}',
    '.shub-nav.active{background:rgba(88,166,255,0.15);color:#58a6ff;font-weight:600}',
    '.shub-nav-icon{width:18px;text-align:center;font-size:12px;flex-shrink:0}',
    '.shub-footer{padding:10px 16px;border-top:1px solid rgba(88,166,255,0.15);font-size:10px;color:rgba(230,237,243,0.4);line-height:1.6}',
    '.shub-footer a{color:#58a6ff;text-decoration:none}',
    '.shub-footer a:hover{text-decoration:underline}',
    '.shub-toggle{display:none;position:fixed;top:10px;left:10px;z-index:9001;width:36px;height:36px;border-radius:8px;background:#161b22;border:1px solid rgba(88,166,255,0.15);color:#58a6ff;font-size:18px;cursor:pointer;align-items:center;justify-content:center}',
    '@media(max-width:900px){.shub-sidebar{transform:translateX(-100%);transition:transform .25s}.shub-sidebar.open{transform:translateX(0)}.shub-toggle{display:flex}body.shub-pushed{margin-left:0!important}}',
    'body.shub-pushed{margin-left:' + SIDEBAR_W + 'px;transition:margin-left .25s}'
  ].join('\n');
  document.head.appendChild(style);

  /* ── Build sidebar HTML ── */
  var html = '<a class="shub-brand" href="index.html"><div class="shub-logo">S</div><div><div class="shub-brand-text">Shopify Hub</div><div class="shub-brand-sub">Unicity International</div></div></a>';
  html += '<div class="shub-scroll">';

  for (var s = 0; s < sections.length; s++) {
    var sec = sections[s];
    html += '<div class="shub-section"><div class="shub-label">' + sec.label + '</div>';
    for (var i = 0; i < sec.items.length; i++) {
      var item = sec.items[i];
      var isActive = (currentFile === item.href) ? ' active' : '';
      html += '<a class="shub-nav' + isActive + '" href="' + item.href + '"><span class="shub-nav-icon">' + item.icon + '</span><span>' + item.name + '</span></a>';
    }
    html += '</div>';
  }

  html += '</div>';
  html += '<div class="shub-footer">48 pages across 13 sections<br><a href="index.html">Back to Hub</a></div>';

  var sidebar = document.createElement('nav');
  sidebar.className = 'shub-sidebar';
  sidebar.innerHTML = html;

  /* ── Mobile toggle ── */
  var toggle = document.createElement('button');
  toggle.className = 'shub-toggle';
  toggle.innerHTML = '☰';
  toggle.onclick = function () {
    sidebar.classList.toggle('open');
  };

  /* ── Inject into page ── */
  document.body.insertBefore(sidebar, document.body.firstChild);
  document.body.insertBefore(toggle, document.body.firstChild);
  document.body.classList.add('shub-pushed');
})();
