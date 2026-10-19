/* Renders window.NDD_PRICING. Edit pricing-config.js, not this file. */
(function () {
  'use strict';

  var cfg = window.NDD_PRICING;
  if (!cfg) return;

  var plans = Array.isArray(cfg.plans) ? cfg.plans : [];
  var site = cfg.website || null;
  // "Get started" = the $499 one-time website link (monthly plans are optional).
  var primaryUrl = site ? safeUrl(site.checkoutUrl) : '';
  if (!primaryUrl) {
    plans.forEach(function (plan) {
      if (plan && plan.primary && !primaryUrl) primaryUrl = safeUrl(plan.checkoutUrl);
    });
  }

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
    if (site && (site.amount || (site.features && site.features.length))) {
      included.appendChild(websiteCard(site));
    }
  }

  if (!root) return;
  root.textContent = '';
  if (plans.length && cfg.plansHeading && !document.getElementById('pricing-plans-head')) {
    var head = document.createElement('div');
    head.id = 'pricing-plans-head';
    head.className = 'reveal';
    head.style.margin = '40px 0 16px';
    var h = document.createElement('h3');
    h.textContent = cfg.plansHeading;
    head.appendChild(h);
    if (cfg.plansLede) {
      var pl = document.createElement('p');
      pl.className = 'muted-sm';
      pl.textContent = cfg.plansLede;
      head.appendChild(pl);
    }
    root.parentNode.insertBefore(head, root);
  }
  plans.forEach(function (plan, index) {
    root.appendChild(planCard(plan, index));
  });

  function safeUrl(url) {
    return typeof url === 'string' && /^https:\/\//i.test(url) ? url : '';
  }

  function websiteCard(item) {
    var article = document.createElement('article');
    article.className = 'card price-included price-card--primary reveal';
    var eyebrow = document.createElement('span');
    eyebrow.className = 'num';
    eyebrow.textContent = (item.title || 'Website') + (item.subtitle ? ' · ' + item.subtitle : '');
    article.appendChild(eyebrow);

    var title = document.createElement('h3');
    title.textContent = (item.amount || '') + (item.label ? ' ' + item.label : '');
    article.appendChild(title);

    article.appendChild(featureList(item.features));

    var checkout = safeUrl(item.checkoutUrl);
    if (checkout) {
      var link = document.createElement('a');
      link.className = 'btn';
      link.href = checkout;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.textContent = item.cta || 'Get started';
      link.setAttribute('aria-label', link.textContent + ' — ' + (item.amount || '') + ' one-time (opens Stripe checkout in a new tab)');
      article.appendChild(link);
    }

    var na = cfg.noAccounts;
    if (na && Array.isArray(na.points) && na.points.length) {
      var box = document.createElement('div');
      box.className = 'price-no-accounts';
      box.style.marginTop = '20px';
      var nh = document.createElement('p');
      var nb = document.createElement('b');
      nb.textContent = na.title || 'No accounts needed';
      nh.appendChild(nb);
      box.appendChild(nh);
      var ul = featureList(na.points);
      ul.className = 'muted-sm';
      box.appendChild(ul);
      article.appendChild(box);
    }
    return article;
  }

  function planCard(plan, index) {
    var article = document.createElement('article');
    article.className = 'card price-card reveal';
    if (plan.badge) article.classList.add('price-card--popular');
    article.style.setProperty('--d', (index * 80) + 'ms');

    var top = document.createElement('div');
    top.className = 'price-card-top';
    var eyebrow = document.createElement('span');
    eyebrow.className = 'num';
    eyebrow.textContent = 'Optional monthly plan';
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
    if (plan.monthly) figures.appendChild(priceLine(plan.monthly, 'per month, optional'));
    article.appendChild(figures);

    article.appendChild(featureList(plan.features));

    var feeAmt = site && site.amount ? site.amount : '';
    var checkout = safeUrl(plan.checkoutUrl);
    if (checkout) {
      article.appendChild(buttonLink(checkout, 'btn btn-ghost',
        (feeAmt ? 'Website ' + feeAmt + ' + ' : '') + (plan.name || 'plan') + ' ' + (plan.monthly || '') + '/mo'));
    }
    var addOn = safeUrl(plan.addOnUrl);
    if (addOn) {
      var p = document.createElement('p');
      p.className = 'muted-sm';
      p.style.marginTop = '10px';
      p.appendChild(document.createTextNode('Already have your site? '));
      var a = buttonLink(addOn, '', 'Add ' + (plan.name || 'this plan') + ' only');
      a.style.textDecoration = 'underline';
      p.appendChild(a);
      article.appendChild(p);
    }
    return article;
  }

  function buttonLink(url, cls, text) {
    var link = document.createElement('a');
    if (cls) link.className = cls;
    link.href = url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.textContent = text;
    link.setAttribute('aria-label', text + ' (opens Stripe checkout in a new tab)');
    return link;
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
