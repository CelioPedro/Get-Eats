// Melhorias progressivas de acessibilidade para modais e controles interativos.
document.addEventListener('DOMContentLoaded', () => {
  const dialogSelectors = [
    '#filter-modal',
    '#auth-modal',
    '#login-modal',
    '#cart-modal',
    '#payment-modal',
    '#order-confirmation-modal',
    '#order-tracking-modal',
    '#order-history-modal',
    '.pedidos-modal-overlay',
    '#profile-modal',
    '#profile-edit-modal',
    '#profile-password-modal'
  ];

  const closeLabels = new Map([
    ['filter-modal-close', 'Fechar filtros'],
    ['cart-modal-close', 'Fechar modal'],
    ['close-modal-btn', 'Fechar modal'],
    ['pedidos-modal-close', 'Fechar pedidos']
  ]);

  function enhanceCloseButtons() {
    closeLabels.forEach((label, className) => {
      document.querySelectorAll(`.${className}`).forEach((button) => {
        if (!button.hasAttribute('type')) button.setAttribute('type', 'button');
        if (!button.hasAttribute('aria-label')) button.setAttribute('aria-label', label);
      });
    });
  }

  function titleDialog(dialog) {
    const title = dialog.querySelector('h1, h2, h3');
    if (!title) return;

    if (!title.id) {
      const base = dialog.id || dialog.className.toString().split(/\s+/)[0] || 'dialog';
      title.id = `${base}-title`;
    }

    dialog.setAttribute('aria-labelledby', title.id);
  }

  function isDialogVisible(dialog) {
    const style = window.getComputedStyle(dialog);
    return dialog.classList.contains('show') ||
      (style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0');
  }

  function syncDialogState(dialog) {
    dialog.setAttribute('role', 'dialog');
    dialog.setAttribute('aria-modal', 'true');
    dialog.setAttribute('aria-hidden', isDialogVisible(dialog) ? 'false' : 'true');
    titleDialog(dialog);
  }

  function enhanceDialogs() {
    document.querySelectorAll(dialogSelectors.join(',')).forEach(syncDialogState);
  }

  function focusFirstControl(dialog) {
    const control = dialog.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    if (control && typeof control.focus === 'function') control.focus();
  }

  function closeTopDialog() {
    const dialogs = Array.from(document.querySelectorAll(dialogSelectors.join(',')))
      .filter(isDialogVisible)
      .reverse();
    const dialog = dialogs[0];
    if (!dialog) return;

    const closeButton = dialog.querySelector('.filter-modal-close, .cart-modal-close, .close-modal-btn, .pedidos-modal-close');
    if (closeButton) {
      closeButton.click();
    } else {
      dialog.classList.remove('show');
      dialog.style.display = 'none';
    }
    syncDialogState(dialog);
  }

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeTopDialog();
  });

  const cartFloat = document.querySelector('.cart-float');
  if (cartFloat) {
    cartFloat.setAttribute('role', 'button');
    cartFloat.setAttribute('tabindex', '0');
    cartFloat.setAttribute('aria-label', 'Abrir carrinho');
    cartFloat.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        cartFloat.click();
      }
    });
  }

  document.querySelectorAll('.social-btn').forEach((button) => {
    if (!button.hasAttribute('type')) button.setAttribute('type', 'button');
  });

  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      const target = mutation.target;
      if (target === document.body) {
        enhanceDialogs();
        return;
      }
      if (target instanceof HTMLElement && target.matches(dialogSelectors.join(','))) {
        syncDialogState(target);
        if (isDialogVisible(target)) focusFirstControl(target);
      }
    });
  });

  document.querySelectorAll(dialogSelectors.join(',')).forEach((dialog) => {
    observer.observe(dialog, { attributes: true, attributeFilter: ['class', 'style'] });
  });
  observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });

  enhanceCloseButtons();
  enhanceDialogs();
});
