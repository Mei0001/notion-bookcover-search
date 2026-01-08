// API設定
const GOOGLE_BOOKS_API = 'https://www.googleapis.com/books/v1/volumes';
const OPENBD_API = 'https://api.openbd.jp/v1/get';

// DOM要素
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const loadingEl = document.getElementById('loading');
const errorEl = document.getElementById('error');
const resultsEl = document.getElementById('results');

// 状態管理
let currentBooks = [];

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
  clearResults();

  try {
    // 日本語検出（ひらがな、カタカナ、漢字を含むか）
    const isJapanese = /[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]/.test(query);

    let books;
    if (isJapanese) {
      // 日本語書籍の場合、openBDを優先
      books = await searchOpenBD(query);

      // openBDで見つからない場合、Google Booksで検索
      if (!books || books.length === 0) {
        books = await searchGoogleBooks(query);
      }
    } else {
      // 英語書籍の場合、Google Booksを使用
      books = await searchGoogleBooks(query);
    }

    if (!books || books.length === 0) {
      showError('検索結果が見つかりませんでした');
      return;
    }

    currentBooks = books;
    displayResults(books);
  } catch (error) {
    console.error('Search error:', error);
    showError('検索中にエラーが発生しました。もう一度お試しください。');
  } finally {
    hideLoading();
  }
}

// Google Books API検索
async function searchGoogleBooks(query) {
  const url = `${GOOGLE_BOOKS_API}?q=${encodeURIComponent(query)}&maxResults=20&langRestrict=ja`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Google Books API error');
  }

  const data = await response.json();

  if (!data.items) {
    return [];
  }

  return data.items.map(item => {
    const volumeInfo = item.volumeInfo;
    const imageLinks = volumeInfo.imageLinks || {};

    return {
      title: volumeInfo.title || '不明',
      authors: volumeInfo.authors || [],
      publishedDate: volumeInfo.publishedDate || '',
      thumbnail: imageLinks.thumbnail || imageLinks.smallThumbnail || '',
      coverUrl: imageLinks.large || imageLinks.medium || imageLinks.thumbnail || imageLinks.smallThumbnail || '',
      source: 'Google Books'
    };
  }).filter(book => book.coverUrl); // 画像のある書籍のみ
}

// openBD API検索
async function searchOpenBD(query) {
  // openBDはISBN検索がメインなので、タイトル検索は制限的
  // ここでは簡易的にGoogle Booksで検索してISBNを取得し、openBDで詳細を取得する方式を採用
  // より良い実装には専用の書籍検索APIが必要

  // まずGoogle BooksでISBNを取得
  const googleBooks = await searchGoogleBooks(query);

  // ISBNがあるものを抽出
  const isbns = googleBooks
    .map(book => book.isbn)
    .filter(isbn => isbn);

  if (isbns.length === 0) {
    return googleBooks;
  }

  // openBDで詳細を取得（最大10冊）
  const isbnQuery = isbns.slice(0, 10).join(',');
  const url = `${OPENBD_API}?isbn=${isbnQuery}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (!data || data.length === 0) {
      return googleBooks;
    }

    return data
      .filter(item => item !== null)
      .map(item => {
        const summary = item.summary || {};
        const onix = item.onix || {};
        const collateralDetail = onix.CollateralDetail || {};
        const descriptiveDetail = onix.DescriptiveDetail || {};

        return {
          title: summary.title || descriptiveDetail.TitleDetail?.TitleElement?.TitleText?.content || '不明',
          authors: summary.author ? [summary.author] : [],
          publishedDate: summary.pubdate || '',
          thumbnail: summary.cover || '',
          coverUrl: summary.cover || '',
          isbn: summary.isbn || '',
          source: 'openBD'
        };
      })
      .filter(book => book.coverUrl);
  } catch (error) {
    console.error('openBD error:', error);
    return googleBooks;
  }
}

// 検索結果表示
function displayResults(books) {
  resultsEl.innerHTML = '';

  books.forEach(book => {
    const bookCard = createBookCard(book);
    resultsEl.appendChild(bookCard);
  });
}

// 書籍カード作成
function createBookCard(book) {
  const card = document.createElement('div');
  card.className = 'book-card';

  const thumbnail = document.createElement('img');
  thumbnail.src = book.thumbnail || book.coverUrl;
  thumbnail.alt = book.title;
  thumbnail.className = 'book-thumbnail';
  thumbnail.loading = 'lazy';

  const info = document.createElement('div');
  info.className = 'book-info';

  const title = document.createElement('h3');
  title.className = 'book-title';
  title.textContent = book.title;

  const authors = document.createElement('p');
  authors.className = 'book-authors';
  authors.textContent = book.authors.join(', ') || '著者不明';

  const date = document.createElement('p');
  date.className = 'book-date';
  date.textContent = book.publishedDate || '';

  info.appendChild(title);
  info.appendChild(authors);
  if (book.publishedDate) {
    info.appendChild(date);
  }

  card.appendChild(thumbnail);
  card.appendChild(info);

  // クリックでURLをコピー
  card.addEventListener('click', () => copyToClipboard(book.coverUrl, card));

  return card;
}

// クリップボードにコピー
async function copyToClipboard(url, cardElement) {
  try {
    await navigator.clipboard.writeText(url);
    showCopyFeedback(cardElement);
  } catch (error) {
    console.error('Clipboard error:', error);
    // フォールバック: テキストエリアを使用
    fallbackCopy(url, cardElement);
  }
}

// クリップボードコピーのフォールバック
function fallbackCopy(text, cardElement) {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.select();

  try {
    document.execCommand('copy');
    showCopyFeedback(cardElement);
  } catch (error) {
    console.error('Fallback copy error:', error);
    showError('コピーに失敗しました');
  } finally {
    document.body.removeChild(textarea);
  }
}

// コピー成功フィードバック
function showCopyFeedback(cardElement) {
  const feedback = document.createElement('div');
  feedback.className = 'copy-feedback';
  feedback.textContent = '✓ Copied!';

  cardElement.appendChild(feedback);

  setTimeout(() => {
    feedback.remove();
  }, 2000);
}

// UI制御関数
function showLoading() {
  loadingEl.classList.remove('hidden');
}

function hideLoading() {
  loadingEl.classList.add('hidden');
}

function showError(message) {
  errorEl.textContent = message;
  errorEl.classList.remove('hidden');
}

function hideError() {
  errorEl.classList.add('hidden');
}

function clearResults() {
  resultsEl.innerHTML = '';
}
