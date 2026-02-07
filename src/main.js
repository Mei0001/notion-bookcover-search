// DOM要素
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const loadingEl = document.getElementById('loading');
const errorEl = document.getElementById('error');
const resultsEl = document.getElementById('results');

// 初期化
searchForm.addEventListener('submit', handleSearch);
searchInput.focus();

// 検索処理
async function handleSearch(e) {
  e.preventDefault();
  const query = searchInput.value.trim();

  if (!query) {
    showError('書籍名を入力してください');
    return;
  }

  showLoading();
  hideError();
  clearResults();

  try {
    const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
    const data = await response.json();

    if (!response.ok) {
      showError(data.error || '検索に失敗しました');
      return;
    }

    if (!data.books || data.books.length === 0) {
      showError('検索結果が見つかりませんでした');
      return;
    }

    displayResults(data.books);
  } catch (error) {
    console.error('Search error:', error);
    showError('検索中にエラーが発生しました');
  } finally {
    hideLoading();
  }
}

// 検索結果表示
function displayResults(books) {
  resultsEl.innerHTML = '';
  books.forEach((book) => {
    resultsEl.appendChild(createBookCard(book));
  });
}

// 書籍カード作成
function createBookCard(book) {
  const card = document.createElement('div');
  card.className = 'book-card';
  card.tabIndex = 0;

  const thumbnail = document.createElement('img');
  thumbnail.src = book.thumbnailUrl || book.coverUrl;
  thumbnail.alt = book.title;
  thumbnail.className = 'book-thumbnail';
  thumbnail.loading = 'lazy';
  thumbnail.onerror = () => {
    thumbnail.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="80" height="120" viewBox="0 0 80 120"%3E%3Crect fill="%23e4ddd4" width="80" height="120"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="30" fill="%239d8f82"%3E%F0%9F%93%96%3C/text%3E%3C/svg%3E';
  };

  const info = document.createElement('div');
  info.className = 'book-info';

  const title = document.createElement('h3');
  title.className = 'book-title';
  title.textContent = book.title;

  const author = document.createElement('p');
  author.className = 'book-authors';
  author.textContent = book.author || '著者不明';

  const meta = document.createElement('p');
  meta.className = 'book-meta';
  const parts = [];
  if (book.publisherName) parts.push(book.publisherName);
  if (book.salesDate) parts.push(book.salesDate);
  meta.textContent = parts.join(' / ');

  info.appendChild(title);
  info.appendChild(author);
  if (parts.length > 0) info.appendChild(meta);

  card.appendChild(thumbnail);
  card.appendChild(info);

  // カードクリックで即追加+Notionページを開く
  card.addEventListener('click', () => addAndOpen(book, card));

  return card;
}

// 書籍をNotionに追加してページを開く
async function addAndOpen(book, card) {
  // 二重クリック防止
  if (card.classList.contains('adding')) return;

  card.classList.add('adding');
  hideError();

  // オーバーレイ表示
  const overlay = document.createElement('div');
  overlay.className = 'card-overlay';
  overlay.textContent = '追加中...';
  card.appendChild(overlay);

  try {
    const response = await fetch('/api/add-book', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: book.title,
        author: book.author,
        coverUrl: book.coverUrl,
        description: book.itemCaption,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Notionへの追加に失敗しました');
    }

    // 成功: Notionページを新タブで開く
    overlay.textContent = '追加完了!';
    overlay.classList.add('done');

    setTimeout(() => {
      window.open(data.pageUrl, '_blank');
    }, 400);
  } catch (error) {
    console.error('Add to Notion error:', error);
    overlay.remove();
    card.classList.remove('adding');
    showError(error.message);
  }
}

// UI制御
function showLoading() {
  loadingEl.classList.remove('hidden');
}

function hideLoading() {
  loadingEl.classList.add('hidden');
}

function showError(message) {
  errorEl.textContent = message;
  errorEl.classList.remove('hidden');
  setTimeout(() => hideError(), 5000);
}

function hideError() {
  errorEl.classList.add('hidden');
}

function clearResults() {
  resultsEl.innerHTML = '';
}
