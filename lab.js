/*
  LABへの追加例

  {
    category: "PROJECT", // または "CASE STUDY"
    title: "プロジェクト名",
    description: "短い説明文。",
    tags: ["WEB TOOL", "UI"],
    url: "https://example.com/",
    linkLabel: "OPEN PROJECT",
    external: true // サイト内ページなら false
  }

  下の配列へ、上と同じ形で項目を追加してください。
*/

const labItems = [];

const labCategories = ["PROJECT", "CASE STUDY"];

function escapeLabText(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function createLabCard(item) {
  const externalAttributes = item.external
    ? ' target="_blank" rel="noopener noreferrer"'
    : "";
  const linkClass = item.external ? "" : " is-internal";

  return `<article class="lab-card">
    <p class="lab-card-type">${escapeLabText(item.category)}</p>
    <h4>${escapeLabText(item.title)}</h4>
    <p class="lab-card-description">${escapeLabText(item.description)}</p>
    <div class="lab-tags" aria-label="種別タグ">
      ${item.tags.map((tag) => `<span class="lab-tag">${escapeLabText(tag)}</span>`).join("")}
    </div>
    <a class="lab-link${linkClass}" href="${escapeLabText(item.url)}"${externalAttributes}>
      ${escapeLabText(item.linkLabel)}
    </a>
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
