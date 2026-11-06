/* EUROMASTER Masternet Custom Widget — Geschenkgutscheine, v1.0.0 */
(() => {
  'use strict';
  const key = 'em-gutscheine-hinweis-20261106-v1';
  const overlayId = 'em-gutscheine-overlay';
  function mount() {
    try { if (sessionStorage.getItem(key)) return; } catch (_) {}
    if (document.getElementById(overlayId)) return;
    const previousFocus = document.activeElement;
    const host = document.createElement('div');
    host.id = overlayId;
    const root = host.attachShadow({mode: 'open'});
    root.innerHTML = `
      <style>
        :host{position:fixed;inset:0;z-index:2147483647;display:block;font-family:Montserrat,Arial,sans-serif}
        *{box-sizing:border-box}
        .backdrop{position:absolute;inset:0;background:rgba(8,24,53,.68);backdrop-filter:blur(4px);display:flex;align-items:center;justify-content:center;padding:20px}
        .card{position:relative;width:100%;max-width:600px;max-height:calc(100dvh - 40px);overflow:auto;background:white;border-radius:22px;box-shadow:0 28px 80px #0005;color:#23324b}
        .heading{padding:40px 64px 30px 34px;background:#164194;color:white;border-top:7px solid #FEDD00}
        .kicker{display:block;color:#FEDD00;text-transform:uppercase;letter-spacing:.09em;font-size:12px;font-weight:800;margin-bottom:14px}
        h2{font-size:clamp(25px,5vw,34px);line-height:1.18;margin:0;font-weight:800}
        p{font-size:18px;line-height:1.65;margin:0;padding:30px 34px 36px}
        strong{color:#164194;font-weight:800}
        button{position:absolute;right:14px;top:20px;display:grid;place-items:center;width:44px;height:44px;border:0;border-radius:50%;background:#ffffff24;color:white;font:32px/1 Arial,sans-serif;cursor:pointer}
        button:hover{background:#ffffff40}button:focus-visible{outline:3px solid #FEDD00;outline-offset:3px}
        @media(max-width:480px){.backdrop{padding:14px}.card{max-height:calc(100dvh - 28px)}.heading{padding:34px 66px 26px 25px}p{padding:25px;font-size:17px}}
      </style>
      <div class="backdrop">
        <section class="card" role="dialog" aria-modal="true" aria-labelledby="title" aria-describedby="copy">
          <div class="heading"><span class="kicker">Wichtiger Hinweis</span><h2 id="title">Euromaster-<br>Geschenkgutscheine</h2></div>
          <p id="copy">Aus finanziellen Gründen sind die <strong>Vergabe und der Verkauf von Euromaster-Geschenkgutscheinen ab sofort nicht mehr gestattet.</strong></p>
          <button type="button" aria-label="Hinweis schließen">×</button>
        </section>
      </div>`;
    document.body.appendChild(host);
    const button = root.querySelector('button');
    const focusGuard = event => {
      if (!event.composedPath().includes(host)) button.focus();
    };
    const keyGuard = event => {
      if (event.key === 'Tab') { event.preventDefault(); button.focus(); }
      if (event.key === 'Escape') { event.preventDefault(); event.stopImmediatePropagation(); }
    };
    document.addEventListener('focusin', focusGuard, true);
    document.addEventListener('keydown', keyGuard, true);
    const cleanup = () => {
      document.removeEventListener('focusin', focusGuard, true);
      document.removeEventListener('keydown', keyGuard, true);
      host.remove();
      if (previousFocus && previousFocus.isConnected) previousFocus.focus();
    };
    button.addEventListener('click', () => {
      try { sessionStorage.setItem(key, 'closed'); } catch (_) {}
      cleanup();
    });
    button.focus();
    return cleanup;
  }
  window.defineBlock({
    blockDefinition: {
      name: 'euromaster-geschenkgutscheine-popup',
      factory: BaseBlock => class extends BaseBlock {
        renderBlock(container) {
          if (this.initialized) return;
          this.initialized = true;
          container.style.display = 'none';
          this.cleanupPopup = mount();
        }
        disconnectedCallback() {
          if (this.cleanupPopup) this.cleanupPopup();
          this.initialized = false;
          if (super.disconnectedCallback) super.disconnectedCallback();
        }
        static get observedAttributes() { return []; }
      },
      attributes: [], blockLevel: 'block',
      configurationSchema: {type: 'object', properties: {}}, uiSchema: {},
      label: 'Euromaster Geschenkgutscheine – Hinweis'
    },
    author: 'Euromaster', version: '1.0.0'
  });
})();
