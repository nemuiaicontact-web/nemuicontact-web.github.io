/*
  LABへの追加例

  {
    category: "PROJECT", // または "CASE STUDY"
    title: "プロジェクト名",
    description: [
      "説明の1行目。",
      "説明の2行目。"
    ],
    tags: ["WEB TOOL", "UI"],
    links: [
      {
        label: "OPEN PROJECT",
        url: "https://example.com/",
        external: true // サイト内ページなら false
      }
    ]
  }

  下の配列へ、上と同じ形で項目を追加してください。
*/

const labItems = [
  {
    category: "CASE STUDY",

    title: "未実装の恋は、一周年の夜に",

    description: [
      "本編に入る前に、",
      "ユーザーの中へ「過去の思い出」を仮構築するため、",
      "架空のファンサイト風外部ページを制作。"
    ],

    tags: [
      "EXTERNAL EXPERIENCE",
      "MEMORY DESIGN"
    ],

    links: [
      {
        label: "READ NOTE",
        url: "https://note.com/nemui_human/n/ncc9c67d569bc",
        external: true
      },
      {
        label: "VIEW ARCHIVE",
        url: "https://wax-mistake-f56.notion.site/37ac69eb98998083b6a1ed6c1f7376a4",
        external: true
      }
    ]
  }
];

const labCategories = ["PROJECT", "CASE STUDY"];

function escapeLabText(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function createLabDescription(description) {
  const lines = Array.isArray(description) ? description : [description];
  return lines.map((line) => escapeLabText(line)).join("<br>");
}

function createLabLink(link) {
  const externalAttributes = link.external
    ? ' target="_blank" rel="noopener noreferrer"'
    : "";
  const linkClass = link.external ? "" : " is-internal";

  return `<a class="lab-link${linkClass}" href="${escapeLabText(link.url)}"${externalAttributes}>
    ${escapeLabText(link.label)}
  </a>`;
}

function createLabCard(item) {
  return `<article class="lab-card">
    <p class="lab-card-type">${escapeLabText(item.category)}</p>
    <h4>${escapeLabText(item.title)}</h4>
    <p class="lab-card-description">${createLabDescription(item.description)}</p>
    <div class="lab-tags" aria-label="種別タグ">
      ${item.tags.map((tag) => `<span class="lab-tag">${escapeLabText(tag)}</span>`).join("")}
    </div>
    <div class="lab-links" aria-label="関連リンク">
      ${item.links.map(createLabLink).join("")}
    </div>
  </article>`;
}

function renderLab() {
  labCategories.forEach((category) => {
    const grid = document.querySelector(`[data-lab-category="${category}"]`);
    const items = labItems.filter((item) => item.category === category);

    grid.innerHTML = items.length
      ? items.map(createLabCard).join("")
      : `<p class="lab-empty">最初の${category}を準備中です。</p>`;
  });
}

renderLab();
