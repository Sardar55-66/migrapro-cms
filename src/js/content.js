/**
 * Загружает контент из content/home.json и обновляет страницу.
 * Meta description, hero, features, services, порядок блоков.
 */

const DEFAULTS = {
  meta_description: 'МИГРАПРО — миграционные услуги в Москве и Московской области.',
  hero: {
    title_accent: 'Миграционные услуги',
    subtitle: 'в Москве и Московской области',
    desc: 'Помогаем иностранным гражданам в оформлении квоты на РВП, РВПО, РВП, ВНЖ, гражданства РФ,',
    subdesc: 'а также организациям, привлекающим иностранных сотрудников в России при оформлении виз для сотрудников по квоте и без квот',
    cta_text: 'Задать вопрос',
    img_desktop: '/img/img/people-pic.png',
    img_mobile: '/img/img/people-pic-mobile.svg',
  },
  features: [
    { text: 'Опытные специалисты', icon: '/img/icons/college.png' },
    { text: 'Комплексная юридическая поддержка', icon: '/img/icons/scale.png' },
    { text: 'Гарантия правильности оформления', icon: '/img/icons/tower.png' },
  ],
  services: [
    { title: 'Организациям', desc: 'Полный спектр правовой поддержки для компаний, нанимающих иностранных специалистов в России, включая оформление виз для высококвалифицированных специалистов (ВКС) и сотрудников по квоте и без квот', btn_text: 'Узнать подробнее' },
    { title: 'Иностранным гражданам', desc: 'Консультация и помощь иностранным гражданам в процессе получения РВП (разрешения на временное проживание), ВНЖ (вид на жительство) и приобретения Российского гражданства', btn_text: 'Узнать подробнее' },
  ],
  blocks: [{ id: 'hero' }, { id: 'features' }, { id: 'services' }, { id: 'state-services' }],
  state_services: {
    title: 'Государственные онлайн‑сервисы для иностранных граждан',
    subtitle: 'Здесь вы можете получить необходимую информацию для оформления РВП, ВНЖ и Российского гражданства',
    items: [
      { text: 'Проверить готовность документов РВП', url: '#' },
      { text: 'Проверить готовность документов ВНЖ', url: '#' },
      { text: 'Проверка наличия розыскных дел (ФССП)', url: '#' },
      { text: 'Проверить действительность разрешения на работу и патента', url: '#' },
      { text: 'Узнать идентификационный номер налогоплательщика (ИНН)', url: '#' },
      { text: 'Проверить наличие основания для запрета въезда в РФ', url: '#' },
      { text: 'Запись в миграционный центр Сахарово', url: '#' },
      { text: 'Наличие исполнительных производств', url: '#' },
    ],
  },
  footer: {
    address: 'Московская Область, Одинцовский р-н, п. Новоивановское, ул. Калинина 8',
    hours: 'Ежедневно с 09:00 до 18:00',
    phone: '+7 (495) 127-23-87',
    legal_text: 'Миграционный центр в Московской области ООО «Трудовой консультант» ИНН 772601001. Юр. адрес: 117208, г. Москва, вн.тер.г. муниципальный округ Чертаново Северное, ул. Чертановская, д.7а, подв. 0 помещ. 26, офис 168. ОГРН 5147746',
  },
};

const wrapAccent = (text, phrase) => {
  const idx = text.indexOf(phrase);
  if (idx === -1) return text;
  return text.slice(0, idx) + `<span class="hero__accent">${phrase}</span>` + text.slice(idx + phrase.length);
};

const applyMeta = (content) => {
  const desc = content.meta_description || DEFAULTS.meta_description;
  let meta = document.querySelector('meta[name="description"]');
  if (!meta) {
    meta = document.createElement('meta');
    meta.name = 'description';
    document.head.appendChild(meta);
  }
  meta.content = desc;
};

const applyHero = (content) => {
  const h = { ...DEFAULTS.hero, ...content.hero };
  const imgDesktop = h.img_desktop || DEFAULTS.hero.img_desktop;
  const imgMobile = h.img_mobile || DEFAULTS.hero.img_mobile;

  document.querySelectorAll('.hero__img').forEach((el) => { el.src = imgDesktop; });
  document.querySelectorAll('.hero__mobile-img').forEach((el) => { el.src = imgMobile; });

  document.querySelectorAll('.hero__cta').forEach((el) => { el.textContent = h.cta_text; });

  const accentSpans = document.querySelectorAll('.hero__title .hero__accent, .hero__mobile-title .hero__accent');
  accentSpans.forEach((el) => { el.textContent = h.title_accent; });

  document.querySelectorAll('.hero__mobile-title-rest, .hero__title-subtitle').forEach((el) => { el.textContent = h.subtitle; });

  const descHtml = wrapAccent(h.desc, 'иностранным гражданам');
  document.querySelectorAll('.hero__desc, .hero__mobile-desc').forEach((el) => { el.innerHTML = descHtml; });

  const subdescHtml = wrapAccent(h.subdesc, 'организациям, привлекающим иностранных сотрудников');
  document.querySelectorAll('.hero__subdesc, .hero__mobile-subdesc').forEach((el) => { el.innerHTML = subdescHtml; });
};

const FEATURE_ICONS = ['/img/icons/college.png', '/img/icons/scale.png', '/img/icons/tower.png'];

const applyFeatures = (content) => {
  const items = content.features?.length ? content.features : DEFAULTS.features;
  const container = document.querySelector('.features__inner');
  if (!container) return;
  container.innerHTML = items
    .map(
      (item, i) =>
        `<article class="features__item">
          <div class="features__icon" aria-hidden="true">
            <img src="${item.icon || FEATURE_ICONS[i % 3]}" alt="" width="56" height="56" />
          </div>
          <p class="features__text">${item.text || ''}</p>
        </article>`
    )
    .join('');
};

const applyServices = (content) => {
  const cards = content.services?.length ? content.services : DEFAULTS.services;
  const container = document.querySelector('.services-cards__inner');
  if (!container) return;
  container.innerHTML = cards
    .map(
      (card, i) =>
        `<article class="services-cards__card">
          <h2 class="services-cards__title" ${i === 0 ? 'id="services-cards-heading"' : ''}>${card.title || ''}</h2>
          <p class="services-cards__desc">${card.desc || ''}</p>
          <a class="services-cards__btn" href="#consultation">${card.btn_text || 'Узнать подробнее'}</a>
        </article>`
    )
    .join('');
};

const ARROW_ICON = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17L17 7"/><path d="M7 7h10v10"/></svg>';

const applyStateServices = (content) => {
  const data = content.state_services || DEFAULTS.state_services;
  const title = data.title || DEFAULTS.state_services.title;
  const subtitle = data.subtitle || DEFAULTS.state_services.subtitle;
  const items = data.items?.length ? data.items : DEFAULTS.state_services.items;

  const titleEl = document.querySelector('.state-services__title');
  if (titleEl) titleEl.textContent = title;
  const subtitleEl = document.querySelector('.state-services__subtitle');
  if (subtitleEl) subtitleEl.textContent = subtitle;

  const grid = document.querySelector('.state-services__grid');
  if (!grid) return;
  grid.innerHTML = items
    .map(
      (item) =>
        `<li>
          <a class="state-services__card" href="${item.url || '#'}" target="_blank" rel="noopener noreferrer">
            <span class="state-services__card-text">${item.text || ''}</span>
            <span class="state-services__card-icon" aria-hidden="true">${ARROW_ICON}</span>
          </a>
        </li>`
    )
    .join('');
};

const applyFooter = (content) => {
  const f = content.footer || DEFAULTS.footer;
  const address = f.address || DEFAULTS.footer.address;
  const hours = f.hours || DEFAULTS.footer.hours;
  const phone = f.phone || DEFAULTS.footer.phone;
  const legalText = f.legal_text || DEFAULTS.footer.legal_text;

  const addressEl = document.querySelector('.footer__address');
  if (addressEl) addressEl.innerHTML = address.replace(/\n/g, '<br/>');
  const hoursEl = document.querySelector('.footer__hours');
  if (hoursEl) hoursEl.textContent = hours;
  const phoneEl = document.querySelector('.footer__phone');
  if (phoneEl) {
    phoneEl.textContent = phone;
    phoneEl.href = `tel:${phone.replace(/\D/g, '')}`;
  }
  const legalEl = document.querySelector('.footer__legal-text--mobile, .footer__legal-text');
  if (legalEl) legalEl.textContent = legalText;
};

const reorderBlocks = (content) => {
  const blocks = content.blocks?.length ? content.blocks : DEFAULTS.blocks;
  const app = document.getElementById('app');
  if (!app) return;
  const idMap = { hero: 'hero', features: 'features', services: 'services-cards', 'state-services': 'state-services' };
  const order = blocks.map((b) => idMap[b.id] || b.id).filter(Boolean);
  const sections = order.map((id) => app.querySelector(`#block-${id}`)).filter(Boolean);
  sections.forEach((s) => s.remove());
  sections.forEach((s) => app.appendChild(s));
};

const applyContent = (content) => {
  applyMeta(content);
  applyHero(content);
  applyFeatures(content);
  applyServices(content);
  applyStateServices(content);
  applyFooter(content);
  reorderBlocks(content);
};

export const initContent = async () => {
  try {
    const mod = await import('../../content/home.json');
    const data = mod.default || mod;
    applyContent(data);
  } catch {
    applyContent(DEFAULTS);
  }
};
