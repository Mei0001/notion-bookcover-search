const RAKUTEN_API_BASE = 'https://openapi.rakuten.co.jp/services/api/BooksBook/Search/20170404';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { q } = req.query;

  if (!q || q.trim().length === 0) {
    return res.status(400).json({ error: '検索キーワードを入力してください' });
  }

  const appId = process.env.RAKUTEN_APP_ID;
  const accessKey = process.env.RAKUTEN_ACCESS_KEY;
  if (!appId || !accessKey) {
    return res.status(500).json({ error: '楽天APIの設定がされていません' });
  }

  try {
    const params = new URLSearchParams({
      applicationId: appId,
      accessKey: accessKey,
      title: q.trim(),
      hits: '20',
      formatVersion: '2',
    });

    const response = await fetch(`${RAKUTEN_API_BASE}?${params}`, {
      headers: {
        'Origin': 'https://notion-bookcover-search.vercel.app',
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return res.status(response.status).json({
        error: errorData.error_description || errorData.errors?.errorMessage || '楽天APIエラー',
      });
    }

    const data = await response.json();

    const books = (data.Items || []).map((item) => ({
      title: item.title || '',
      author: item.author || '',
      publisherName: item.publisherName || '',
      isbn: item.isbn || '',
      salesDate: item.salesDate || '',
      itemCaption: item.itemCaption || '',
      coverUrl: item.largeImageUrl
        ? item.largeImageUrl.replace('?_ex=200x200', '?_ex=400x400')
        : '',
      thumbnailUrl: item.mediumImageUrl || '',
      itemUrl: item.itemUrl || '',
      reviewAverage: item.reviewAverage || '',
      reviewCount: item.reviewCount || '',
    }));

    return res.status(200).json({ books, count: data.count || 0 });
  } catch (error) {
    console.error('Rakuten API error:', error);
    return res.status(500).json({ error: '検索中にエラーが発生しました' });
  }
}
