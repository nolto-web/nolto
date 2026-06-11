const STORAGE_KEY = "nolto_ops_v1";

const weeklyItems = [
  { id: "site", title: "NOLTOトップページ確認", desc: "PC・スマホで表示崩れがないか確認する" },
  { id: "links", title: "主要リンク確認", desc: "records / templates / tools / contact への導線を確認する" },
  { id: "downloads", title: "テンプレートDL確認", desc: "公開中テンプレートのダウンロードが動くか確認する" },
  { id: "note", title: "noteコメント・記事ネタ確認", desc: "コメント返信、新しい記事案、NOLTO反映漏れを確認する" },
  { id: "analytics", title: "Analytics確認", desc: "直近7日のアクセス数と見られたページを確認する" },
  { id: "search", title: "Search Console確認", desc: "インデックス、表示回数、検索キーワードを確認する" }
];

const monthlyItems = [
  { id: "template", title: "無料テンプレート追加・改善", desc: "月1個を目安に追加、または既存テンプレートを改善する" },
  { id: "records", title: "records.html整理", desc: "note記事が増えたら一覧に追加する" },
  { id: "templates", title: "templates.html整理", desc: "無料公開中・準備中の表示が古くないか確認する" },
  { id: "tools", title: "tools.html確認", desc: "A8リンク、広告表記、掲載ツールを確認する" },
  { id: "sitemap", title: "sitemap.xml確認", desc: "新規ページがあればサイトマップに追加する" },
  { id: "next", title: "翌月の作業を決める", desc: "記事テーマ、追加テンプレート、改善ページを決める" }
];

const defaultState = {
  weekly: {},
  monthly: {},
  articles: [
    {
      id: crypto.randomUUID(),
      title: "SNS投稿案10本テンプレートを無料公開しました",
      status: "公開済み",
      url: "https://note.com/msy9989/n/n7fae117e617c",
      memo: "2個目の無料テンプレート紹介記事。records.html反映済み。"
    },
    {
      id: crypto.randomUUID(),
      title: "AIで作ったサイトをNetlifyで無料公開した方法",
      status: "公開済み",
      url: "https://note.com/msy9989/n/n9479df737b32",
      memo: "Netlify公開の制作記録。"
    }
  ],
  templates: [
    {
      id: crypto.randomUUID(),
      title: "HP・SNS簡易診断レポート雛形",
      status: "無料公開中",
      formats: "Word / PDF / Markdown",
      url: "https://nolto-web.github.io/nolto/templates.html",
      memo: "1個目の無料テンプレート。"
    },
    {
      id: crypto.randomUUID(),
      title: "SNS投稿案10本テンプレート",
      status: "無料公開中",
      formats: "Word / PDF / Excel / Markdown",
      url: "https://nolto-web.github.io/nolto/templates.html",
      memo: "2個目の無料テンプレート。"
    }
  ],
  snsPosts: [
    {
      id: crypto.randomUUID(),
      title: "工務店LPサンプル紹介スレッド",
      platform: "X",
      status: "投稿予定",
      scheduledDate: "",
      postedDate: "",
      url: "",
      purpose: "整体院LPとの違いを見せる。施工事例・信頼感・問い合わせ導線を重視したサンプルとして紹介する。",
      thread: "1/5\n工務店向けのLPサンプルも公開しています。\n\n施工事例、信頼感、問い合わせ導線を重視した構成です。\n\nhttps://nolto-web.github.io/nolto/sample/\n\n---\n2/5\n工務店向けLPでは、見た人が知りたい情報を早く確認できることを意識しました。\n\n・どんな工事に対応しているか\n・施工事例\n・料金の目安\n・相談までの流れ\n\n---\n3/5\n整体院向けLPとは違い、やわらかさよりも、地域密着の信頼感や実績の見せ方を重視しています。\n\n業種によってLPの雰囲気や必要な情報はかなり変わります。\n\n---\n4/5\nNOLTOでは、業種ごとに雰囲気を変えたLPサンプルを少しずつ増やしています。\n\n現在は、工務店向けと整体院・リラクゼーションサロン向けを公開中です。\n\n---\n5/5\n制作サンプルはこちら\nhttps://nolto-web.github.io/nolto/sample/\n\nNOLTOはこちら\nhttps://nolto-web.github.io/nolto/",
      memo: "別日に投稿する候補。投稿後にURLと反応を記録する。"
    },
    {
      id: crypto.randomUUID(),
      title: "制作記録noteまとめスレッド",
      platform: "X",
      status: "下書き",
      scheduledDate: "",
      postedDate: "",
      url: "",
      purpose: "records.htmlへの導線を増やす。",
      thread: "1/5\nNOLTOの制作記録をnoteにまとめています。\n\nLP制作、問い合わせフォーム、Netlify公開、無料テンプレート、SNS導線づくりなど、作ったものを記録しています。\n\nhttps://nolto-web.github.io/nolto/records.html",
      memo: "記事がもう少し増えたら投稿してもよい。"
    }
  ],
  metrics: [],
  tasks: [
    { id: crypto.randomUUID(), title: "3個目の無料テンプレート候補を決める", done: false, memo: "AI副業プロンプト集など" },
    { id: crypto.randomUUID(), title: "Search Consoleで未登録ページを再リクエスト", done: false, memo: "割当量が戻ったら実施" }
  ]
};

let state = loadState();
let currentEdit = null;
let snsFilter = "all";

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return structuredClone(defaultState);
    
    const parsed = JSON.parse(raw);
    return {
      ...structuredClone(defaultState),
      ...parsed,
      snsPosts: parsed.snsPosts || structuredClone(defaultState.snsPosts)
    };

  } catch {
    return structuredClone(defaultState);
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  renderAll();
}

function qs(id) {
  return document.getElementById(id);
}

function escapeHtml(value = "") {
  return String(value).replace(/[&<>"']/g, char => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
  }[char]));
}

function renderChecklist(containerId, items, stateKey) {
  const container = qs(containerId);
  container.innerHTML = items.map(item => `
    <label class="check-item">
      <input type="checkbox" data-check="${stateKey}" data-id="${item.id}" ${state[stateKey][item.id] ? "checked" : ""}>
      <span>
        <strong>${escapeHtml(item.title)}</strong>
        <small>${escapeHtml(item.desc)}</small>
      </span>
    </label>
  `).join("");
}

function renderStats() {
  const done = weeklyItems.filter(item => state.weekly[item.id]).length;
  const progress = weeklyItems.length ? Math.round(done / weeklyItems.length * 100) : 0;
  qs("weeklyProgress").textContent = `${progress}%`;
  qs("articleCount").textContent = state.articles.length;
  qs("templateCount").textContent = state.templates.length;
  qs("nextActionCount").textContent = state.tasks.filter(task => !task.done).length;
  const snsEl = qs("snsScheduledCount");
  if (snsEl) {
    snsEl.textContent = (state.snsPosts || []).filter(post => post.status !== "投稿済み" && post.status !== "反応確認済み").length;
  }
}

function renderArticles() {
  const container = qs("articleCards");
  if (!state.articles.length) {
    container.innerHTML = qs("emptyTemplate").innerHTML;
    return;
  }
  container.innerHTML = state.articles.map(article => `
    <article class="card">
      <div class="card-top">
        <span class="badge ${article.status === "公開済み" ? "done" : ""}">${escapeHtml(article.status || "メモ")}</span>
        <button class="icon-btn" data-edit="article" data-id="${article.id}" type="button">編集</button>
      </div>
      <h3>${escapeHtml(article.title)}</h3>
      <p>${escapeHtml(article.memo || "")}</p>
      ${article.url ? `<div class="card-actions"><a class="btn secondary" href="${escapeHtml(article.url)}" target="_blank" rel="noopener">記事を開く</a></div>` : ""}
    </article>
  `).join("");
}

function renderTemplates() {
  const container = qs("templateCards");
  if (!state.templates.length) {
    container.innerHTML = qs("emptyTemplate").innerHTML;
    return;
  }
  container.innerHTML = state.templates.map(template => `
    <article class="card">
      <div class="card-top">
        <span class="badge ${template.status === "無料公開中" ? "done" : ""}">${escapeHtml(template.status || "準備中")}</span>
        <button class="icon-btn" data-edit="template" data-id="${template.id}" type="button">編集</button>
      </div>
      <h3>${escapeHtml(template.title)}</h3>
      <p><strong>形式：</strong>${escapeHtml(template.formats || "")}</p>
      <p>${escapeHtml(template.memo || "")}</p>
      ${template.url ? `<div class="card-actions"><a class="btn secondary" href="${escapeHtml(template.url)}" target="_blank" rel="noopener">ページを開く</a></div>` : ""}
    </article>
  `).join("");
}


function renderSnsPosts() {
  const container = qs("snsPostCards");
  if (!container) return;

  const posts = (state.snsPosts || []).filter(post => snsFilter === "all" || post.status === snsFilter);

  if (!posts.length) {
    container.innerHTML = qs("emptyTemplate").innerHTML;
    return;
  }

  container.innerHTML = posts.map(post => {
    const threadText = post.thread || "";
    const firstPart = threadText.split("---")[0]?.trim() || threadText.slice(0, 220);
    return `
      <article class="card">
        <div class="card-top">
          <span class="badge ${post.status === "投稿済み" || post.status === "反応確認済み" ? "done" : ""}">${escapeHtml(post.status || "下書き")}</span>
          <button class="icon-btn" data-edit="snsPost" data-id="${post.id}" type="button">編集</button>
        </div>
        <h3>${escapeHtml(post.title)}</h3>
        <div class="sns-meta">
          <span><strong>媒体：</strong>${escapeHtml(post.platform || "X")}</span>
          <span><strong>予定日：</strong>${escapeHtml(post.scheduledDate || "未設定")}</span>
          <span><strong>投稿日：</strong>${escapeHtml(post.postedDate || "未投稿")}</span>
        </div>
        <p>${escapeHtml(post.purpose || "")}</p>
        ${firstPart ? `<div class="thread-preview">${escapeHtml(firstPart)}</div>` : ""}
        <p>${escapeHtml(post.memo || "")}</p>
        <div class="card-actions">
          ${post.url ? `<a class="btn secondary" href="${escapeHtml(post.url)}" target="_blank" rel="noopener">投稿を開く</a>` : ""}
          <button class="btn ghost" data-copy-thread="${post.id}" type="button">本文をコピー</button>
        </div>
      </article>
    `;
  }).join("");
}


function renderMetrics() {
  const container = qs("metricList");
  if (!state.metrics.length) {
    container.innerHTML = `<div class="empty"><p>まだ記録がありません。</p></div>`;
    return;
  }
  container.innerHTML = [...state.metrics].reverse().map(metric => `
    <div class="metric-item">
      <div>
        <strong>${escapeHtml(metric.date)} / ${escapeHtml(metric.period)}</strong>
        <p>
          アクセス数：${escapeHtml(metric.views || 0)}　
          表示回数：${escapeHtml(metric.impressions || 0)}　
          クリック数：${escapeHtml(metric.clicks || 0)}
        </p>
        <p>${escapeHtml(metric.memo || "")}</p>
      </div>
      <button class="icon-btn" data-delete-metric="${metric.id}" type="button">×</button>
    </div>
  `).join("");
}

function renderTasks() {
  const container = qs("taskList");
  if (!state.tasks.length) {
    container.innerHTML = `<div class="empty"><p>まだタスクがありません。</p></div>`;
    return;
  }
  container.innerHTML = state.tasks.map(task => `
    <div class="task-item ${task.done ? "done" : ""}">
      <label>
        <input type="checkbox" data-task-done="${task.id}" ${task.done ? "checked" : ""}>
        <strong>${escapeHtml(task.title)}</strong>
        <p>${escapeHtml(task.memo || "")}</p>
      </label>
      <button class="icon-btn" data-edit="task" data-id="${task.id}" type="button">編集</button>
    </div>
  `).join("");
}

function renderAll() {
  renderStats();
  renderChecklist("weeklyChecklist", weeklyItems, "weekly");
  renderChecklist("monthlyChecklist", monthlyItems, "monthly");
  renderArticles();
  renderTemplates();
  renderSnsPosts();
  renderMetrics();
  renderTasks();
}

function openEditor(type, id = null) {
  currentEdit = { type, id };
  const dialog = qs("editDialog");
  const fields = qs("dialogFields");
  qs("deleteDialogBtn").style.display = id ? "inline-flex" : "none";
  const data = id ? state[type + "s"].find(item => item.id === id) : {};

  if (type === "article") {
    qs("dialogTitle").textContent = id ? "記事メモを編集" : "記事メモを追加";
    fields.innerHTML = `
      <label>タイトル<input name="title" value="${escapeHtml(data?.title || "")}" required></label>
      <label>状態
        <select name="status">
          ${["案", "下書き", "投稿済み", "NOLTO反映済み", "公開済み"].map(v => `<option ${data?.status === v ? "selected" : ""}>${v}</option>`).join("")}
        </select>
      </label>
      <label>URL<input name="url" value="${escapeHtml(data?.url || "")}" placeholder="https://note.com/..."></label>
      <label>メモ<textarea name="memo" rows="4">${escapeHtml(data?.memo || "")}</textarea></label>
    `;
  }

  if (type === "template") {
    qs("dialogTitle").textContent = id ? "テンプレートを編集" : "テンプレートを追加";
    fields.innerHTML = `
      <label>タイトル<input name="title" value="${escapeHtml(data?.title || "")}" required></label>
      <label>状態
        <select name="status">
          ${["準備中", "無料公開中", "改善中", "公開検討中"].map(v => `<option ${data?.status === v ? "selected" : ""}>${v}</option>`).join("")}
        </select>
      </label>
      <label>配布形式<input name="formats" value="${escapeHtml(data?.formats || "")}" placeholder="Word / PDF / Excel / Markdown"></label>
      <label>URL<input name="url" value="${escapeHtml(data?.url || "")}"></label>
      <label>メモ<textarea name="memo" rows="4">${escapeHtml(data?.memo || "")}</textarea></label>
    `;
  }

  if (type === "snsPost") {
    qs("dialogTitle").textContent = id ? "SNS投稿を編集" : "SNS投稿を追加";
    fields.innerHTML = `
      <label>投稿タイトル<input name="title" value="${escapeHtml(data?.title || "")}" required></label>
      <label>媒体<input name="platform" value="${escapeHtml(data?.platform || "X")}" placeholder="X"></label>
      <label>状態
        <select name="status">
          ${["下書き", "投稿予定", "投稿済み", "反応確認済み"].map(v => `<option ${data?.status === v ? "selected" : ""}>${v}</option>`).join("")}
        </select>
      </label>
      <label>投稿予定日<input type="date" name="scheduledDate" value="${escapeHtml(data?.scheduledDate || "")}"></label>
      <label>投稿済み日<input type="date" name="postedDate" value="${escapeHtml(data?.postedDate || "")}"></label>
      <label>投稿URL<input name="url" value="${escapeHtml(data?.url || "")}" placeholder="https://x.com/..."></label>
      <label>目的<textarea name="purpose" rows="3">${escapeHtml(data?.purpose || "")}</textarea></label>
      <label>スレッド本文<textarea name="thread" rows="10" placeholder="1/5...&#10;&#10;---&#10;2/5...">${escapeHtml(data?.thread || "")}</textarea></label>
      <label>反応メモ・改善メモ<textarea name="memo" rows="4">${escapeHtml(data?.memo || "")}</textarea></label>
    `;
  }


  if (type === "task") {    qs("dialogTitle").textContent = id ? "タスクを編集" : "タスクを追加";
    fields.innerHTML = `
      <label>タスク名<input name="title" value="${escapeHtml(data?.title || "")}" required></label>
      <label>状態
        <select name="done">
          <option value="false" ${!data?.done ? "selected" : ""}>未完了</option>
          <option value="true" ${data?.done ? "selected" : ""}>完了</option>
        </select>
      </label>
      <label>メモ<textarea name="memo" rows="4">${escapeHtml(data?.memo || "")}</textarea></label>
    `;
  }

  dialog.showModal();
}

function saveEditor(form) {
  const values = Object.fromEntries(new FormData(form).entries());
  const collection = currentEdit.type + "s";

  if (currentEdit.type === "task") {
    values.done = values.done === "true";
  }

  if (currentEdit.id) {
    state[collection] = state[collection].map(item => item.id === currentEdit.id ? { ...item, ...values } : item);
  } else {
    state[collection].unshift({ id: crypto.randomUUID(), ...values });
  }

  qs("editDialog").close();
  saveState();
}

function deleteCurrent() {
  if (!currentEdit?.id) return;
  const collection = currentEdit.type + "s";
  state[collection] = state[collection].filter(item => item.id !== currentEdit.id);
  qs("editDialog").close();
  saveState();
}

function exportData() {
  const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  const date = new Date().toISOString().slice(0, 10);
  a.href = url;
  a.download = `nolto-ops-backup-${date}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

function importData(file) {
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const imported = JSON.parse(reader.result);
      
      state = {
        ...structuredClone(defaultState),
        ...imported,
        snsPosts: imported.snsPosts || structuredClone(defaultState.snsPosts)
      };

      saveState();
      alert("データを読み込みました。");
    } catch {
      alert("JSONの読み込みに失敗しました。");
    }
  };
  reader.readAsText(file);
}

document.addEventListener("change", (event) => {
  const checkType = event.target.dataset.check;
  if (checkType) {
    state[checkType][event.target.dataset.id] = event.target.checked;
    saveState();
  }

  const taskId = event.target.dataset.taskDone;
  if (taskId) {
    state.tasks = state.tasks.map(task => task.id === taskId ? { ...task, done: event.target.checked } : task);
    saveState();
  }
});

document.addEventListener("click", (event) => {
  const editBtn = event.target.closest("[data-edit]");
  if (editBtn) {
    openEditor(editBtn.dataset.edit, editBtn.dataset.id);
  }

  const metricDelete = event.target.closest("[data-delete-metric]");
  if (metricDelete) {
    state.metrics = state.metrics.filter(metric => metric.id !== metricDelete.dataset.deleteMetric);
    saveState();
  }

  const filterBtn = event.target.closest("[data-sns-filter]");
  if (filterBtn) {
    snsFilter = filterBtn.dataset.snsFilter;
    document.querySelectorAll("[data-sns-filter]").forEach(btn => btn.classList.toggle("is-active", btn === filterBtn));
    renderSnsPosts();
  }

  const copyBtn = event.target.closest("[data-copy-thread]");
  if (copyBtn) {
    const post = (state.snsPosts || []).find(item => item.id === copyBtn.dataset.copyThread);
    if (post?.thread) {
      navigator.clipboard.writeText(post.thread).then(() => {
        copyBtn.textContent = "コピー済み";
        setTimeout(() => copyBtn.textContent = "本文をコピー", 1200);
      }).catch(() => alert("コピーできませんでした。"));
    }
  }
});

qs("resetWeeklyBtn").addEventListener("click", () => {
  if (confirm("週次チェックをリセットしますか？")) {
    state.weekly = {};
    saveState();
  }
});

qs("completeWeeklyBtn").addEventListener("click", () => {
  weeklyItems.forEach(item => state.weekly[item.id] = true);
  saveState();
});

qs("resetMonthlyBtn").addEventListener("click", () => {
  if (confirm("月次チェックをリセットしますか？")) {
    state.monthly = {};
    saveState();
  }
});

qs("completeMonthlyBtn").addEventListener("click", () => {
  monthlyItems.forEach(item => state.monthly[item.id] = true);
  saveState();
});

qs("addArticleBtn").addEventListener("click", () => openEditor("article"));
qs("addTemplateBtn").addEventListener("click", () => openEditor("template"));
const addSnsBtn = qs("addSnsPostBtn");
if (addSnsBtn) addSnsBtn.addEventListener("click", () => openEditor("snsPost"));
qs("addTaskBtn").addEventListener("click", () => openEditor("task"));

qs("closeDialogBtn").addEventListener("click", () => qs("editDialog").close());
qs("deleteDialogBtn").addEventListener("click", deleteCurrent);
qs("editForm").addEventListener("submit", (event) => {
  event.preventDefault();
  saveEditor(event.target);
});

qs("metricForm").addEventListener("submit", (event) => {
  event.preventDefault();
  state.metrics.push({
    id: crypto.randomUUID(),
    date: qs("metricDate").value,
    period: qs("metricPeriod").value,
    views: qs("metricViews").value,
    impressions: qs("metricImpressions").value,
    clicks: qs("metricClicks").value,
    memo: qs("metricMemo").value
  });
  event.target.reset();
  qs("metricDate").valueAsDate = new Date();
  saveState();
});

qs("exportDataBtn").addEventListener("click", exportData);
qs("exportDataBtn2").addEventListener("click", exportData);
qs("importFile").addEventListener("change", (event) => importData(event.target.files[0]));

qs("metricDate").valueAsDate = new Date();

document.querySelector(".nav-toggle").addEventListener("click", (event) => {
  const nav = document.querySelector(".mobile-nav");
  const isOpen = nav.classList.toggle("is-open");
  event.currentTarget.setAttribute("aria-expanded", String(isOpen));
});

document.querySelectorAll(".mobile-nav a").forEach(link => {
  link.addEventListener("click", () => {
    document.querySelector(".mobile-nav").classList.remove("is-open");
    document.querySelector(".nav-toggle").setAttribute("aria-expanded", "false");
  });
});

renderAll();
