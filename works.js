const works = [
  {
    title: "掃除屋さんは恋を知らない",
    genres: ["恋愛", "NL", "BL", "ホラー"],
    platforms: [{ name: "キャラぷ", url: "https://s.kyarapu.com/s/69206ed78fa00af7c688f231" }],
    sensitive: true,
    image: "./assets/01-soujiya.png",
    description: "【サイコパス×一目惚れ】\n超合理主義、共感のできない人間が、\n恋愛にどう向き合うのか。"
  },
 {
    title: "まっしろな記憶を、君と。",
    genres: ["恋愛", "NL", "BL", "ミステリー"],
    platforms: [{ name: "キャラぷ", url: "https://s.kyarapu.com/s/693060d486854aacc04d2557" }],
    sensitive: false,
    image: "./assets/nemui-icon.png",
    description: "【記憶喪失×看病シチュ】\n言葉の端々に潜む、重要な手がかり。\n──結末は、あなた次第。"
  },
  {
    title: "恋するアンドロイド",
    genres: ["GENERAL", "恋愛"],
    platforms: [{ name: "キャラぷ", url: "" },{ name: "Plaitoon", url: "" }],
    sensitive: false,
    image: "./assets/nemui-icon.png",
    description: "心を学ぶアンドロイドと、少しずつ距離を縮めていく物語。"
  },
  {
    title: "夜を歩くもの",
    genres: ["GENERAL", "HORROR"],
    platforms: [{ name: "Talelynx", url: "" }],
    sensitive: false,
    image: "./assets/nemui-icon.png",
    description: "あなたの言葉が手がかりになる、静かなミステリー＆ホラー。"
  },
  {
    title: "チェリーボーイは朝のありかを知らない",
    genres: ["BL", "恋愛"],
    platforms: [{ name: "Plaitoon", url: "" }],
    sensitive: true,
    image: "./assets/nemui-icon.png",
    description: "大人同士の距離と感情を描く、センシティブなテーマを含む作品。"
  },
  {
    title: "秘密の同居人",
    genres: ["恋愛"],
    platforms: [{ name: "キャラぷ", url: "" }],
    sensitive: true,
    image: "./assets/nemui-icon.png",
    description: "秘密を抱えたふたりの関係を描く、大人向けの恋愛作品。"
  },
  {
    title: "赤い部屋の招待状",
    genres: ["BL", "HORROR"],
    platforms: [{ name: "Talelynx", url: "" }],
    sensitive: true,
    image: "./assets/nemui-icon.png",
    description: "閉ざされた部屋で選択を重ねる、ダークな対話型ホラー。"
  }
];

const filters = ["ALL", "GENERAL", "SENSITIVE", "恋愛", "日常", "NL", "BL", "ホラー", "ミステリー"];
const filtersElement = document.querySelector(".works-filters");
const gridElement = document.querySelector(".works-grid");
const statusElement = document.querySelector(".works-status");
const moreButton = document.querySelector(".works-more");
const mobileWorksQuery = window.matchMedia("(max-width: 560px)");
const mobileWorksLimit = 3;
let activeFilter = "ALL";
let isWorksExpanded = false;

function matchesFilter(work, filter) {
  if (filter === "ALL") return true;
  if (filter === "SENSITIVE") return work.sensitive;
  if (filter === "GENERAL") return !work.sensitive;
  return work.genres.includes(filter);
}

function createPlatform(platform) {
  if (!platform.url) {
    return `<span class="work-platform">${platform.name}</span>`;
  }

  return `<a class="work-platform" href="${platform.url}" target="_blank" rel="noopener noreferrer">${platform.name}</a>`;
}

function createWorkCard(work, index) {
  const tags = [work.sensitive ? "SENSITIVE" : "GENERAL", ...work.genres.filter((tag) => tag !== "GENERAL")];
  const spoiler = work.sensitive
    ? `<button class="spoiler-cover" type="button" aria-label="${work.title}のセンシティブ画像を表示する">
        <span class="spoiler-label">SENSITIVE CONTENT</span>
        <span class="spoiler-action">CLICK TO REVEAL</span>
      </button>`
    : "";

  return `<article class="work-card${work.sensitive ? " is-sensitive" : ""}" data-work-index="${index}">
    <div class="work-media">
      <img class="work-image" src="${work.image}" alt="${work.title}のサムネイル" loading="lazy">
      ${spoiler}
    </div>
    <div class="work-info">
      <h3>${work.title}</h3>
      <p class="work-tags">${tags.map((tag) => `<span class="work-tag">${tag}</span>`).join("")}</p>
      <p class="work-description">${work.description}</p>
      <div class="work-platforms" aria-label="掲載プラットフォーム">${work.platforms.map(createPlatform).join("")}</div>
    </div>
  </article>`;
}

function renderWorks() {
  const filteredWorks = works
    .map((work, index) => ({ work, index }))
    .filter(({ work }) => matchesFilter(work, activeFilter));

  const shouldLimitWorks = mobileWorksQuery.matches && !isWorksExpanded;
  const visibleWorks = shouldLimitWorks
    ? filteredWorks.slice(0, mobileWorksLimit)
    : filteredWorks;
  const remainingWorks = filteredWorks.length - visibleWorks.length;

  gridElement.innerHTML = visibleWorks.length
    ? visibleWorks.map(({ work, index }) => createWorkCard(work, index)).join("")
    : `<p class="works-empty">このタグの作品はまだありません。</p>`;

  statusElement.textContent = visibleWorks.length === filteredWorks.length
    ? `${filteredWorks.length} WORK${filteredWorks.length === 1 ? "" : "S"}`
    : `${visibleWorks.length} / ${filteredWorks.length} WORKS`;

  moreButton.hidden = remainingWorks <= 0;
  moreButton.textContent = remainingWorks > 0
    ? `MORE WORKS — 残り${remainingWorks}件`
    : "MORE WORKS";
  moreButton.setAttribute("aria-expanded", String(isWorksExpanded));
}

function renderFilters() {
  filtersElement.innerHTML = filters.map((filter) => `
    <button
      class="filter-button${filter === activeFilter ? " is-active" : ""}"
      type="button"
      data-filter="${filter}"
      aria-pressed="${filter === activeFilter}"
    >${filter}</button>
  `).join("");
}

filtersElement.addEventListener("click", (event) => {
  const button = event.target.closest(".filter-button");
  if (!button) return;

  activeFilter = button.dataset.filter;
  isWorksExpanded = false;
  renderFilters();
  renderWorks();
});

moreButton.addEventListener("click", () => {
  isWorksExpanded = true;
  renderWorks();
});

gridElement.addEventListener("click", (event) => {
  const cover = event.target.closest(".spoiler-cover");
  if (!cover) return;

  const card = cover.closest(".work-card");
  card.classList.add("is-revealed");
});

mobileWorksQuery.addEventListener("change", () => {
  isWorksExpanded = false;
  renderWorks();
});

renderFilters();
renderWorks();
