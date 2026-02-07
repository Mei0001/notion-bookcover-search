// DOM要素
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const loadingEl = document.getElementById('loading');
const errorEl = document.getElementById('error');
const successEl = document.getElementById('success');
const resultsEl = document.getElementById('results');

// 初期化
searchForm.addEventListener('submit', handleSearch);

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
  hideSuccess();
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

  // サムネイル
  const thumbnail = document.createElement('img');
  thumbnail.src = book.thumbnailUrl || book.coverUrl;
  thumbnail.alt = book.title;
  thumbnail.className = 'book-thumbnail';
  thumbnail.loading = 'lazy';
  thumbnail.onerror = () => {
    thumbnail.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="80" height="120" viewBox="0 0 80 120"%3E%3Crect fill="%23e4ddd4" width="80" height="120"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="30" fill="%239d8f82"%3E%F0%9F%93%96%3C/text%3E%3C/svg%3E';
  };

  // 情報エリア
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

  // Notion追加ボタン
  const addBtn = document.createElement('button');
  addBtn.className = 'add-button';
  addBtn.textContent = 'Notionに追加';
  addBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    addToNotion(book, addBtn);
  });

  card.appendChild(thumbnail);
  card.appendChild(info);
  card.appendChild(addBtn);

  return card;
}

// Notionにページ追加
async function addToNotion(book, button) {
  const originalText = button.textContent;
  button.textContent = '追加中...';
  button.disabled = true;
  button.classList.add('loading');

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

    button.textContent = '追加済み';
    button.classList.remove('loading');
    button.classList.add('done');
    showSuccess(`「${book.title}」をNotionに追加しました`);
  } catch (error) {
    console.error('Add to Notion error:', error);
    button.textContent = originalText;
    button.disabled = false;
    button.classList.remove('loading');
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

function showSuccess(message) {
  successEl.textContent = message;
  successEl.classList.remove('hidden');
  setTimeout(() => hideSuccess(), 3000);
}

function hideSuccess() {
  successEl.classList.add('hidden');
}

function clearResults() {
  resultsEl.innerHTML = '';
}
