/* ==========================================================================
   MiniCity (Hongkong) Co., Limited — Global Corporate Site
   Single JavaScript file for the entire site  [Reuse-B]
   Native JavaScript only. No frameworks, no third-party libraries.
   ========================================================================== */
(function () {
  'use strict';

  /* ------------------------------------------------------------------
     0. SITE CONFIGURATION — single source of truth for company data
     ------------------------------------------------------------------ */
  var SITE = {
    company: 'MiniCity (Hongkong) Co., Limited',
    companyShort: 'MiniCity',
    address: 'E8 ROOM 1207, 12/F, BLOCK 2, GOLDEN IND BLDG, 16-26 KWAI TAK ST, KWAI CHUNG, HONG KONG',
    website: 'manchengcw.com',
    url: 'https://manchengcw.com',
    emailSupport: 'support@manchengcw.com',
    emailAccount: 'chengxing@manchengcw.com',
    phone: '+852 3980 8866',
    spriteUrl: 'images/sprite.svg',
    businessScope:
      'Wholesale and retail of trendy toys, figurines, cultural and creative gifts and home ornaments; ' +
      'cultural and creative product design; business information consultation; import and export of ' +
      'goods and technology; general trade (excluding regulated businesses such as finance, insurance and lending)',
    nav: [
      { label: 'Home', href: '/', page: 'home' },
      { label: 'Services', href: '/services.html', page: 'services' },
      { label: 'Culture', href: '/culture.html', page: 'culture' },
      { label: 'News', href: '/news.html', page: 'news' },
      { label: 'Contact', href: '/contact.html', page: 'contact' }
    ]
  };

  /* ------------------------------------------------------------------
     0b. SPRITE PATH RESOLUTION
     Resolve the sprite next to this script, so the site works at a domain
     root or inside a sub-directory without a hard-coded absolute path.
     ------------------------------------------------------------------ */
  (function resolveSprite() {
    var src = document.currentScript && document.currentScript.src;
    if (!src) return;
    var idx = src.lastIndexOf('/js/');
    if (idx === -1) return;
    SITE.spriteUrl = src.slice(0, idx) + '/images/sprite.svg';
  })();

  /* ------------------------------------------------------------------
     1. SEO CONFIGURATION  [Reuse-F]
     ------------------------------------------------------------------ */
  var SEO = {
    '/': {
      title: 'MiniCity (Hongkong) Co., Limited — Trendy Toys, Figurines, Gifts & Global Trade',
      description:
        'MiniCity (Hongkong) Co., Limited wholesales and retails trendy toys, figurines, cultural and creative gifts and home ornaments, designs cultural and creative products, and delivers import and export, general trade and business information consultation from Hong Kong.',
      canonical: 'https://manchengcw.com/',
      ogType: 'website',
      twitter: 'summary_large_image'
    },
    '/services.html': {
      title: 'Services — Wholesale, Retail, Product Design, Import & Export | MiniCity (Hongkong)',
      description:
        'Eight business lines: wholesale and retail of trendy toys, figurines, cultural and creative gifts and home ornaments; cultural and creative product design; business information consultation; import and export of goods and technology; general trade — plus the MiniCity Management App for iOS and Android.',
      canonical: 'https://manchengcw.com/services.html',
      ogType: 'website',
      twitter: 'summary_large_image'
    },
    '/culture.html': {
      title: 'Culture & Milestones — Our Mission, Vision and Values | MiniCity (Hongkong)',
      description:
        'The story of MiniCity (Hongkong) Co., Limited: our mission, vision, values, milestone timeline, crew spirit and global compliance and CSR commitments for cultural and creative trade.',
      canonical: 'https://manchengcw.com/culture.html',
      ogType: 'website',
      twitter: 'summary_large_image'
    },
    '/news.html': {
      title: 'News & Insights — Toys, Figurines, Gifts and Global Trade | MiniCity (Hongkong)',
      description:
        'Company news, product design trends, import and export updates, app releases and market insights from MiniCity (Hongkong) Co., Limited.',
      canonical: 'https://manchengcw.com/news.html',
      ogType: 'website',
      twitter: 'summary_large_image'
    },
    '/contact.html': {
      title: 'Contact Us — Hong Kong Office & Business Enquiries | MiniCity (Hongkong)',
      description:
        'Reach MiniCity (Hongkong) Co., Limited at E8 ROOM 1207, 12/F, BLOCK 2, GOLDEN IND BLDG, 16-26 KWAI TAK ST, KWAI CHUNG, HONG KONG. Business support support@manchengcw.com; key accounts chengxing@manchengcw.com.',
      canonical: 'https://manchengcw.com/contact.html',
      ogType: 'website',
      twitter: 'summary_large_image'
    },
    '/privacy.html': {
      title: 'Privacy Policy | MiniCity (Hongkong) Co., Limited',
      description:
        'How MiniCity (Hongkong) Co., Limited collects, uses, shares and protects personal data across our website and mobile applications on the Apple App Store and Google Play, including advertising and regional privacy rights.',
      canonical: 'https://manchengcw.com/privacy.html',
      ogType: 'article',
      twitter: 'summary'
    },
    '/terms.html': {
      title: 'Terms of Service | MiniCity (Hongkong) Co., Limited',
      description:
        'Terms governing use of the MiniCity website and the MiniCity Management App, including licensing, purchases and subscriptions, third-party services, advertising, liability limits and Hong Kong governing law.',
      canonical: 'https://manchengcw.com/terms.html',
      ogType: 'article',
      twitter: 'summary'
    }
  };

  /* ------------------------------------------------------------------
     2. SHARED HEADER  [Reuse-C]
     ------------------------------------------------------------------ */
  function buildHeader() {
    var host = document.getElementById('site-header');
    if (!host) return;

    var links = SITE.nav
      .map(function (item) {
        return (
          '<a href="' + item.href + '" data-nav="' + item.page + '">' + item.label + '</a>'
        );
      })
      .join('');

    host.className = 'site-header';
    host.innerHTML =
      '<div class="container header-inner">' +
      '<a class="brand" href="/" aria-label="' + SITE.company + ' home">' +
      '<svg class="brand-mark" viewBox="0 0 64 64" aria-hidden="true"><use href="#logo"></use></svg>' +
      '<span class="brand-text"><strong>' + SITE.companyShort + '</strong>' +
      '<span>(Hongkong) Co., Limited</span></span>' +
      '</a>' +
      '<nav class="nav" id="primary-nav" aria-label="Primary">' + links + '</nav>' +
      '<div class="header-actions">' +
      '<a class="btn btn-primary btn-sm" href="/contact.html">Talk to Us</a>' +
      '<button class="nav-toggle" type="button" aria-expanded="false" aria-controls="primary-nav" aria-label="Toggle navigation">' +
      '<svg class="icon-menu" viewBox="0 0 24 24" aria-hidden="true"><use href="#menu"></use></svg>' +
      '<svg class="icon-close" viewBox="0 0 24 24" aria-hidden="true"><use href="#close"></use></svg>' +
      '</button>' +
      '</div>' +
      '</div>';
  }

  /* ------------------------------------------------------------------
     3. SHARED FOOTER  [Reuse-D]
     ------------------------------------------------------------------ */
  function buildFooter() {
    var host = document.getElementById('site-footer');
    if (!host) return;

    host.className = 'site-footer';
    host.innerHTML =
      '<div class="container footer-grid">' +
      '<div class="footer-col footer-brand">' +
      '<a class="brand" href="/">' +
      '<svg class="brand-mark" viewBox="0 0 64 64" aria-hidden="true"><use href="#logo"></use></svg>' +
      '<span class="brand-text"><strong>' + SITE.companyShort + '</strong>' +
      '<span>(Hongkong) Co., Limited</span></span>' +
      '</a>' +
      '<p class="footer-about">' + SITE.businessScope + '.</p>' +
      '</div>' +

      '<div class="footer-col">' +
      '<h4>Company</h4>' +
      '<ul>' +
      '<li><a href="/services.html">Services</a></li>' +
      '<li><a href="/culture.html">Our Culture</a></li>' +
      '<li><a href="/news.html">News &amp; Insights</a></li>' +
      '<li><a href="/contact.html">Contact Us</a></li>' +
      '</ul>' +
      '</div>' +

      '<div class="footer-col">' +
      '<h4>Business Lines</h4>' +
      '<ul>' +
      '<li><a href="/services.html#trading">Toys &amp; Figurines</a></li>' +
      '<li><a href="/services.html#gifts">Gifts &amp; Home Ornaments</a></li>' +
      '<li><a href="/services.html#design">Product Design</a></li>' +
      '<li><a href="/services.html#consulting">Business Consultation</a></li>' +
      '<li><a href="/services.html#trade">Import &amp; Export</a></li>' +
      '<li><a href="/services.html#app">Mobile Management App</a></li>' +
      '</ul>' +
      '</div>' +

      '<div class="footer-col">' +
      '<h4>Get in Touch</h4>' +
      '<p><strong>Office</strong><br>' + SITE.address + '</p>' +
      '<p class="mt-1"><strong>Business support</strong><br>' +
      '<a href="mailto:' + SITE.emailSupport + '">' + SITE.emailSupport + '</a></p>' +
      '<p class="mt-1"><strong>Key accounts</strong><br>' +
      '<a href="mailto:' + SITE.emailAccount + '">' + SITE.emailAccount + '</a></p>' +
      '<p class="mt-1"><strong>Website</strong><br>' +
      '<a href="https://' + SITE.website + '" rel="noopener">' + SITE.website + '</a></p>' +
      '</div>' +
      '</div>' +

      '<div class="footer-legal">' +
      '<div class="container footer-legal-inner">' +
      '<div class="footer-links">' +
      '<a href="/privacy.html">Privacy Policy</a>' +
      '<a href="/terms.html">Terms of Service</a>' +
      '<a href="/contact.html">Contact</a>' +
      '</div>' +
      '<div>&copy; <span data-year>2026</span> ' + SITE.company + '. All rights reserved.</div>' +
      '</div>' +
      '</div>';
  }

  /* ------------------------------------------------------------------
     4. SEO APPLICATION + JSON-LD  [Reuse-F]
     ------------------------------------------------------------------ */
  function setMeta(selector, attr, value) {
    var el = document.head.querySelector(selector);
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute(attr, attr.replace('content', ''));
      document.head.appendChild(el);
    }
    el.setAttribute('content', value);
    return el;
  }

  function pathKey() {
    var p = window.location.pathname || '/';
    if (p === '' || p === '/' || p === '/index.html') return '/';
    if (p.charAt(p.length - 1) === '/' && p !== '/') return p + 'index.html';
    return p;
  }

  function applySEO() {
    var key = pathKey();
    var cfg = SEO[key];

    /* No config for this path (e.g. 404.html, or a file:// URL whose path
       is not a site route). Leave the static per-page <head> meta alone
       instead of overwriting it with the homepage values. */
    if (!cfg) return;

    document.title = cfg.title;

    setMeta('meta[name="description"]', 'name', cfg.description);

    var canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', cfg.canonical);

    setMeta('meta[property="og:title"]', 'property', cfg.title);
    setMeta('meta[property="og:description"]', 'property', cfg.description);
    setMeta('meta[property="og:url"]', 'property', cfg.canonical);
    setMeta('meta[property="og:type"]', 'property', cfg.ogType);
    setMeta('meta[property="og:site_name"]', 'property', SITE.company);
    setMeta('meta[name="twitter:card"]', 'name', cfg.twitter);
    setMeta('meta[name="twitter:title"]', 'name', cfg.title);
    setMeta('meta[name="twitter:description"]', 'name', cfg.description);
  }

  function injectJSONLD() {
    var data = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: SITE.company,
      alternateName: SITE.companyShort,
      url: SITE.url,
      email: SITE.emailSupport,
      description: SITE.businessScope,
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'E8 Room 1207, 12/F, Block 2, Golden Ind Bldg, 16-26 Kwai Tak St',
        addressLocality: 'Kwai Chung',
        addressRegion: 'Hong Kong',
        postalCode: '',
        addressCountry: 'HK'
      },
      contactPoint: [
        {
          '@type': 'ContactPoint',
          contactType: 'business support',
          email: SITE.emailSupport,
          availableLanguage: ['English', 'Chinese']
        },
        {
          '@type': 'ContactPoint',
          contactType: 'key accounts',
          email: SITE.emailAccount,
          availableLanguage: ['English', 'Chinese']
        }
      ],
      sameAs: [
        'https://' + SITE.website,
        'https://' + SITE.website + '/services.html',
        'https://' + SITE.website + '/culture.html',
        'https://' + SITE.website + '/news.html'
      ]
    };

    var script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(data);
    document.head.appendChild(script);
  }

  /* ------------------------------------------------------------------
     5. SVG SPRITE LOADER + MASCOT RESOLUTION  [Reuse-E]
     ------------------------------------------------------------------ */
  function injectSprite() {
    if (document.getElementById('mc-sprite-host')) return Promise.resolve(false);

    return fetch(SITE.spriteUrl)
      .then(function (res) {
        if (!res.ok) throw new Error('Sprite request failed: ' + res.status);
        return res.text();
      })
      .then(function (svgText) {
        var host = document.createElement('div');
        host.id = 'mc-sprite-host';
        host.setAttribute('aria-hidden', 'true');
        host.className = 'sprite-host';
        host.innerHTML = svgText;
        document.body.insertBefore(host, document.body.firstChild);
        resolveMascots();
        return true;
      })
      .catch(function () {
        return loadSpriteViaXHR();
      });
  }

  /* Fallback for environments where fetch() is unavailable or blocked
     (e.g. some file:// setups). Uses XMLHttpRequest instead. */
  function loadSpriteViaXHR() {
    return new Promise(function (resolve) {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', SITE.spriteUrl, true);
      xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300 && xhr.responseText) {
          var host = document.createElement('div');
          host.id = 'mc-sprite-host';
          host.setAttribute('aria-hidden', 'true');
          host.className = 'sprite-host';
          host.innerHTML = xhr.responseText;
          document.body.insertBefore(host, document.body.firstChild);
          resolveMascots();
          resolve(true);
        } else {
          markSpriteMissing();
          resolve(false);
        }
      };
      xhr.onerror = function () {
        markSpriteMissing();
        resolve(false);
      };
      try {
        xhr.send();
      } catch (e) {
        markSpriteMissing();
        resolve(false);
      }
    });
  }

  /* The sprite could not be loaded. Never leave invisible holes on the page:
     flag the document so CSS can render geometric stand-ins, and tell the
     developer exactly why (file:// blocks cross-file fetch). */
  function markSpriteMissing() {
    document.documentElement.classList.add('sprite-missing');
    if (window.console && console.warn) {
      console.warn(
        '[MiniCity] SVG sprite could not be loaded from images/sprite.svg. ' +
        'Icons and mascots are showing placeholders. Serve the site over HTTP ' +
        '(e.g. node _tools/serve.cjs) instead of opening the file directly — ' +
        'browsers block cross-file fetch() on file:// URLs.'
      );
    }
  }

  function resolveMascots() {
    var nodes = document.querySelectorAll('[data-mascot]');
    Array.prototype.forEach.call(nodes, function (node) {
      if (node.getAttribute('data-mascot-done') === 'true') return;
      var id = node.getAttribute('data-mascot');
      if (!id) return;
      node.setAttribute('data-mascot-done', 'true');
      node.innerHTML =
        '<svg viewBox="0 0 64 64" width="100%" height="100%" role="img" aria-label="' +
        id.replace(/-/g, ' ') +
        '"><use href="#' + id + '"></use></svg>';
    });
  }

  /* ------------------------------------------------------------------
     6. REVEAL OBSERVER + STAGGER  [Reuse-G]
     ------------------------------------------------------------------ */
  function initReveal() {
    var items = document.querySelectorAll('.reveal, .stagger');
    if (!items.length) return;

    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || !('IntersectionObserver' in window)) {
      Array.prototype.forEach.call(items, function (el) {
        el.classList.add('in');
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );

    Array.prototype.forEach.call(items, function (el) {
      observer.observe(el);
    });
  }

  /* ------------------------------------------------------------------
     7. NAVIGATION STATE
     ------------------------------------------------------------------ */
  function setActiveNav() {
    var path = window.location.pathname || '/';
    var current = 'home';
    if (path === '/services.html') current = 'services';
    else if (path === '/culture.html') current = 'culture';
    else if (path === '/news.html') current = 'news';
    else if (path === '/contact.html') current = 'contact';
    else if (path === '/privacy.html' || path === '/terms.html') current = '';

    var links = document.querySelectorAll('#primary-nav a[data-nav]');
    Array.prototype.forEach.call(links, function (link) {
      link.classList.toggle('is-active', link.getAttribute('data-nav') === current);
    });
  }

  function initMobileNav() {
    var header = document.getElementById('site-header');
    var toggle = header ? header.querySelector('.nav-toggle') : null;
    var nav = document.getElementById('primary-nav');
    if (!toggle || !nav) return;

    toggle.addEventListener('click', function () {
      var open = header.classList.toggle('nav-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });

    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        header.classList.remove('nav-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && header.classList.contains('nav-open')) {
        header.classList.remove('nav-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  function initStickyHeader() {
    var header = document.getElementById('site-header');
    if (!header) return;
    var onScroll = function () {
      header.classList.toggle('is-stuck', window.scrollY > 12);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  function initSmoothScroll() {
    document.addEventListener('click', function (e) {
      var link = e.target.closest ? e.target.closest('a[href^="#"]') : null;
      if (!link) return;
      var id = link.getAttribute('href');
      if (!id || id === '#') return;
      var target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      var top = target.getBoundingClientRect().top + window.scrollY - 90;
      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  }

  /* ------------------------------------------------------------------
     8. BACK TO TOP
     ------------------------------------------------------------------ */
  function initBackToTop() {
    var btn = document.createElement('button');
    btn.className = 'to-top';
    btn.type = 'button';
    btn.setAttribute('aria-label', 'Back to top');
    btn.innerHTML =
      '<svg viewBox="0 0 24 24" aria-hidden="true"><use href="#arrow-up"></use></svg>';
    document.body.appendChild(btn);

    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    var onScroll = function () {
      btn.classList.toggle('is-visible', window.scrollY > 500);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ------------------------------------------------------------------
     9. NEWS FILTER
     ------------------------------------------------------------------ */
  function initNewsFilter() {
    var buttons = document.querySelectorAll('[data-filter]');
    var cards = document.querySelectorAll('[data-category]');
    if (!buttons.length || !cards.length) return;

    Array.prototype.forEach.call(buttons, function (btn) {
      btn.addEventListener('click', function () {
        var filter = btn.getAttribute('data-filter');
        Array.prototype.forEach.call(buttons, function (b) {
          b.classList.toggle('is-active', b === btn);
          b.setAttribute('aria-pressed', b === btn ? 'true' : 'false');
        });
        Array.prototype.forEach.call(cards, function (card) {
          var cat = card.getAttribute('data-category');
          card.hidden = !(filter === 'all' || cat === filter);
        });
      });
    });
  }

  /* ------------------------------------------------------------------
     10. FAQ ACCORDION
     ------------------------------------------------------------------ */
  function initFaq() {
    var items = document.querySelectorAll('[data-faq]');
    Array.prototype.forEach.call(items, function (item) {
      var btn = item.querySelector('.faq-q');
      if (!btn) return;
      btn.addEventListener('click', function () {
        var open = item.classList.toggle('is-open');
        btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
    });
  }

  /* ------------------------------------------------------------------
     11. CONTACT FORM VALIDATION
     ------------------------------------------------------------------ */
  function initContactForm() {
    var form = document.querySelector('[data-form="contact"]');
    if (!form) return;

    var status = form.querySelector('[data-form-status]');
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    var validateField = function (input) {
      var group = input.closest('.form-group');
      if (!group) return true;
      var value = (input.value || '').trim();
      var ok = true;

      if (input.hasAttribute('required') && !value) ok = false;
      if (ok && input.type === 'email' && value && !emailPattern.test(value)) ok = false;
      if (ok && input.type === 'checkbox' && !input.checked) ok = false;

      group.classList.toggle('has-error', !ok);
      input.classList.toggle('has-error', !ok);
      return ok;
    };

    var fields = form.querySelectorAll('input, textarea');
    Array.prototype.forEach.call(fields, function (input) {
      input.addEventListener('blur', function () {
        validateField(input);
      });
      input.addEventListener('input', function () {
        var group = input.closest('.form-group');
        if (group && group.classList.contains('has-error')) validateField(input);
      });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var valid = true;
      var firstBad = null;

      Array.prototype.forEach.call(fields, function (input) {
        var ok = validateField(input);
        if (!ok) {
          valid = false;
          if (!firstBad) firstBad = input;
        }
      });

      if (!valid) {
        if (status) {
          status.className = 'form-status is-error';
          status.textContent =
            'Please complete the highlighted fields before sending your enquiry.';
        }
        if (firstBad && firstBad.focus) firstBad.focus();
        return;
      }

      if (status) {
        status.className = 'form-status is-ok';
        status.textContent =
          'Thank you. Your enquiry has been recorded and our business support team will reply to ' +
          SITE.emailSupport +
          '.';
      }
      form.reset();
    });
  }

  /* ------------------------------------------------------------------
     12. GRACEFUL IMAGE FALLBACK
     ------------------------------------------------------------------ */
  function initImageFallback() {
    var markBroken = function (target) {
      if (!target || target.tagName !== 'IMG') return;
      target.classList.add('is-broken');
      target.setAttribute('data-fallback', 'true');
    };

    document.addEventListener('error', function (e) {
      markBroken(e.target);
    }, true);

    /* Images that already failed before this handler was attached */
    Array.prototype.forEach.call(document.images, function (img) {
      if (img.complete && img.naturalWidth === 0) markBroken(img);
    });
  }

  /* ------------------------------------------------------------------
     13. CURRENT YEAR
     ------------------------------------------------------------------ */
  function fillYear() {
    var year = String(new Date().getFullYear());
    Array.prototype.forEach.call(document.querySelectorAll('[data-year]'), function (el) {
      el.textContent = year;
    });
  }

  /* ------------------------------------------------------------------
     14. BOOT
     ------------------------------------------------------------------ */
  function boot() {
    buildHeader();
    buildFooter();
    applySEO();
    injectJSONLD();
    fillYear();
    setActiveNav();
    initMobileNav();
    initStickyHeader();
    initSmoothScroll();
    initReveal();
    initNewsFilter();
    initFaq();
    initContactForm();
    initBackToTop();
    initImageFallback();
    /* Both success paths inside injectSprite() call resolveMascots() themselves;
       it must NOT run again here, or mascot placeholders would be turned into
       <use> references to symbols that do not exist. */
    injectSprite();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
