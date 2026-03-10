# МиграПро CMS

Лендинг с резиновой (fluid) версткой. HTML/CSS/JS, сборщик Vite. Контент редактируется через Decap CMS (бывший Netlify CMS).

## Установка

```bash
npm install
```

## Запуск

```bash
npm run dev
```

## Сборка

```bash
npm run build
```

## Админка (Decap CMS)

- **URL:** `/admin/` или `/admin/index.html` (http://localhost:5173/admin/)
- **Локальная разработка без GitHub:** `npm run cms` (decap-server) + `local_backend: true` в config
- **Продакшен с GitHub:** см. [docs/GITHUB-SETUP.md](docs/GITHUB-SETUP.md)

Редактируется: Meta Description (SEO), Hero, Преимущества, Карточки услуг, порядок блоков, изображения.

## Структура

```
├── index.html
├── content/
│   └── home.json     # контент главной (редактируется через CMS)
├── public/
│   ├── admin/        # Decap CMS (index.html, config.yml)
│   └── img/
└── src/
    ├── index.js
    ├── styles/
    └── js/
        ├── main.js
        ├── header.js
        └── content.js   # загрузка home.json
```
