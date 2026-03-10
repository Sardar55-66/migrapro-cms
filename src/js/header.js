const setupHeader = () => {
  const burger = document.querySelector('[data-burger]');
  const menu = document.querySelector('[data-mobile-menu]');
  const accordionBtns = document.querySelectorAll('[data-accordion]');

  const scrollbarWidth = () => window.innerWidth - document.documentElement.clientWidth;

  const handleOpen = () => {
    const scrollbar = scrollbarWidth();
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = scrollbar ? `${scrollbar}px` : '';
    document.documentElement.style.setProperty('--scrollbar-width', `${scrollbar}px`);
    burger?.setAttribute('aria-expanded', 'true');
    burger?.setAttribute('aria-label', 'Закрыть меню');
    menu?.setAttribute('aria-hidden', 'false');
    if (menu) menu.dataset.open = 'true';
  };

  const handleClose = () => {
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
    document.documentElement.style.setProperty('--scrollbar-width', '0px');
    burger?.setAttribute('aria-expanded', 'false');
    burger?.setAttribute('aria-label', 'Открыть меню');
    menu?.setAttribute('aria-hidden', 'true');
    if (menu) menu.dataset.open = 'false';
    menu?.querySelectorAll('.header__mobile-nav-item--expandable.is-open').forEach((el) => el.classList.remove('is-open'));
  };

  burger?.addEventListener('click', () => {
    const isOpen = burger.getAttribute('aria-expanded') === 'true';
    if (isOpen) handleClose();
    else handleOpen();
  });


  menu?.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      if (!link.closest('.header__mobile-contacts')) handleClose();
    });
  });

  accordionBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.header__mobile-nav-item--expandable');
      if (!item) return;
      const isOpen = item.classList.contains('is-open');
      document.querySelectorAll('.header__mobile-nav-item--expandable.is-open').forEach((el) => el.classList.remove('is-open'));
      if (!isOpen) item.classList.add('is-open');
    });
  });

  const mediaQuery = window.matchMedia('(min-width: 992px)');
  mediaQuery.addEventListener('change', (e) => {
    if (e.matches) handleClose();
  });
};

export { setupHeader };
