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
  blocks: [{ id: 'hero' }, { id: 'features' }, { id: 'services' }],
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

const reorderBlocks = (content) => {
  const blocks = content.blocks?.length ? content.blocks : DEFAULTS.blocks;
  const app = document.getElementById('app');
  if (!app) return;
  const idMap = { hero: 'hero', features: 'features', services: 'services-cards' };
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
