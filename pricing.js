/* Renders window.NDD_PRICING. Edit pricing-config.js, not this file. */
(function () {
  'use strict';

  var cfg = window.NDD_PRICING;
  if (!cfg) return;

  var plans = Array.isArray(cfg.plans) ? cfg.plans : [];
  var fee = cfg.websiteFee || null;
  var primaryUrl = '';
  plans.forEach(function (plan) {
    if (plan && plan.primary && !primaryUrl) primaryUrl = safeUrl(plan.checkoutUrl);
  });

  document.querySelectorAll('[data-pricing-cta="primary"]').forEach(function (el) {
    if (!primaryUrl) return;
    el.href = primaryUrl;
    el.target = '_blank';
    el.rel = 'noopener noreferrer';
    var label = (el.textContent || 'Get started').replace(/\s+/g, ' ').trim();
    el.setAttribute('aria-label', label + ' (opens Stripe checkout in a new tab)');
  });

  var billingUrl = safeUrl(cfg.manageBillingUrl);
  document.querySelectorAll('[data-pricing-cta="billing"]').forEach(function (el) {
    if (!billingUrl) return;
    el.href = billingUrl;
    el.target = '_blank';
    el.rel = 'noopener noreferrer';
    if (!el.getAttribute('aria-label')) {
      el.setAttribute('aria-label', 'Manage billing (opens Stripe in a new tab)');
    }
  });

  var kicker = document.getElementById('pricing-kicker');
  var heading = document.getElementById('pricing-heading');
  var lede = document.getElementById('pricing-lede');
  var note = document.getElementById('pricing-note');
  var included = document.getElementById('pricing-included');
  var root = document.getElementById('pricing-offers');
  if (kicker && cfg.kicker) kicker.textContent = cfg.kicker;
  if (heading && cfg.heading) heading.textContent = cfg.heading;
  if (lede && cfg.lede) lede.textContent = cfg.lede;
  if (note && cfg.note) note.textContent = cfg.note;

  if (included) {
    included.textContent = '';
    if (fee && (fee.amount || (fee.features && fee.features.length))) {
      included.appendChild(includedCard(fee));
    }
  }

  if (!root) return;
  root.textContent = '';
  plans.forEach(function (plan, index) {
    root.appendChild(planCard(plan, fee, index));
  });

  function safeUrl(url) {
    return typeof url === 'string' && /^https:\/\//i.test(url) ? url : '';
  }

  function includedCard(item) {
    var article = document.createElement('article');
    article.className = 'card price-included reveal';
    var eyebrow = document.createElement('span');
    eyebrow.className = 'num';
    eyebrow.textContent = item.title || 'Included with every plan';
    article.appendChild(eyebrow);

    var title = document.createElement('h3');
    title.textContent = (item.amount || '') + (item.label ? ' ' + item.label : '');
    article.appendChild(title);

    article.appendChild(featureList(item.features));
    return article;
  }

  function planCard(plan, websiteFee, index) {
    var article = document.createElement('article');
    article.className = 'card price-card reveal';
    if (plan.primary) article.classList.add('price-card--primary');
    if (plan.badge) article.classList.add('price-card--popular');
    article.style.setProperty('--d', (index * 80) + 'ms');

    var top = document.createElement('div');
    top.className = 'price-card-top';
    var eyebrow = document.createElement('span');
    eyebrow.className = 'num';
    eyebrow.textContent = 'Monthly plan';
    top.appendChild(eyebrow);
    if (plan.badge) {
      var badge = document.createElement('span');
      badge.className = 'price-badge';
      badge.textContent = plan.badge;
      top.appendChild(badge);
    }
    article.appendChild(top);

    var title = document.createElement('h3');
    title.textContent = plan.name || 'Plan';
    article.appendChild(title);

    var figures = document.createElement('div');
    figures.className = 'price-figures';
    if (websiteFee && websiteFee.amount) {
      figures.appendChild(priceLine(websiteFee.amount, websiteFee.label || 'one-time website fee'));
    }
    if (plan.monthly) figures.appendChild(priceLine(plan.monthly, 'per month'));
    article.appendChild(figures);

    article.appendChild(featureList(plan.features));

    var checkout = safeUrl(plan.checkoutUrl);
    if (checkout) {
      var link = document.createElement('a');
      link.className = plan.primary ? 'btn' : 'btn btn-ghost';
      link.href = checkout;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.textContent = plan.cta || ('Choose ' + (plan.name || 'plan'));
      link.setAttribute('aria-label', link.textContent + ' (opens Stripe checkout in a new tab)');
      article.appendChild(link);
    }
    return article;
  }

  function priceLine(amount, detail) {
    var p = document.createElement('p');
    p.className = 'price-figure';
    var strong = document.createElement('b');
    strong.textContent = amount;
    var span = document.createElement('span');
    span.textContent = detail;
    p.appendChild(strong);
    p.appendChild(document.createTextNode(' '));
    p.appendChild(span);
    return p;
  }

  function featureList(features) {
    var list = document.createElement('ul');
    (Array.isArray(features) ? features : []).forEach(function (feature) {
      var li = document.createElement('li');
      li.textContent = feature;
      list.appendChild(li);
    });
    return list;
  }
})();
