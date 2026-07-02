# Julia Vaskul — сайт-портфоліо

## Що вже готово
- **Home** — hero (Chanel Cruise як фонове відео), bio-блок, топ-6 (Chanel Cruise, Allure Homme Édition Blanche, Panthère, Typology Reimagined, Still Water, Jacquemus Poireau/Maïs)
- **Work** — 4 категорії, фільтр All/Video/Photo, ті самі 6 проєктів + місця-заглушки (в коді, коментарями) під решту зі списку в брифі
- **Deep Dive** — вкладки Photo Case (Typology, повний текст) та Video Pipeline (T50, 17 кроків, без промптів)
- **About** — біо + блок Recognition з цифрами LinkedIn-посту
- **Contact** — форма (потребує підключення Formspree, див. нижче)

## Як опублікувати на GitHub Pages
1. Створи новий репозиторій на GitHub з назвою **juliavaskul.github.io** (важливо: точно таке ім'я, з твоїм нікнеймом).
2. Завантаж усі файли з цієї папки в корінь репозиторію (Add file → Upload files, перетягни всі файли й папку `visuals`, `css`, `js`).
3. У репозиторії відкрий Settings → Pages → Source: **main branch / root** → Save.
4. Через кілька хвилин сайт буде доступний за адресою **https://juliavaskul.github.io**

## Що треба доробити перед публікацією
- [ ] **Formspree**: зареєструйся на formspree.io (безкоштовно), створи форму, встав свій form ID замість `YOUR_FORM_ID` у файлі `contact.html` (рядок з `action="https://formspree.io/f/YOUR_FORM_ID"`)
- [ ] **Favicon**: додай файл `favicon.png` (логотип/знак Basque Breeze) в корінь сайту
- [ ] **OG-зображення**: додай особисте чорно-біле фото в `visuals/og-portrait.jpg` (для прев'ю при шерингу в LinkedIn/месенджерах)
- [ ] **About**: текст біографії — чорновий, потрібно твоє фінальне затвердження або правки
- [ ] **Google Search Console**: після публікації зареєструй сайт і завантаж sitemap.xml

## Структура файлів
```
/index.html          Home
/work.html           Work
/deep-dive.html      Deep Dive
/about.html          About
/contact.html        Contact
/css/style.css       усі стилі
/js/main.js          вся інтерактивність (карусель, відео, фільтри)
/visuals/            фото і структура папок по проєктах
/sitemap.xml
/robots.txt
```

## Наступні проєкти для Work-сторінки (ще не додані)
Heritage & Narrative: Dior "The New Chapter", Chanel Eau Tendre
Fashion Editorial: Massimo Dutti SS26, Elie Saab "Sketch to Reality", Miu Miu "Unwrapped"
Beauty & Product: 3 нові Typology-відео, Yellow Series, Osea Malibu, LV Eyewear
Playful Luxury: Villeroy & Boch, Sundae "Birthday Cake", Jacquemus "Le Berlingot", Prada Lisbon

Коли будеш готова їх додати — просто скидай фото/відео по одному проєкту, як і раніше, і я допишу відповідні блоки в `work.html`.
