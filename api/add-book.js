import { Client } from '@notionhq/client';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const notionKey = process.env.NOTION_API_KEY;
  const databaseId = process.env.NOTION_DATABASE_ID;

  if (!notionKey || !databaseId) {
    return res.status(500).json({ error: 'Notion APIの設定がされていません' });
  }

  const { title, author, coverUrl, description } = req.body;

  if (!title) {
    return res.status(400).json({ error: '書籍タイトルは必須です' });
  }

  try {
    const notion = new Client({ auth: notionKey });

    const properties = {
      '作品名': {
        title: [{ text: { content: title } }],
      },
    };

    if (author) {
      properties['著者'] = {
        rich_text: [{ text: { content: author } }],
      };
    }

    if (coverUrl) {
      properties['ファイル&メディア'] = {
        files: [{
          name: `${title}.jpg`,
          type: 'external',
          external: { url: coverUrl },
        }],
      };
    }

    if (description) {
      properties['概要'] = {
        rich_text: [{ text: { content: description.slice(0, 2000) } }],
      };
    }

    const pageData = {
      parent: { database_id: databaseId },
      properties,
    };

    // ページカバーに表紙画像を設定（ギャラリービュー用）
    if (coverUrl) {
      pageData.cover = {
        type: 'external',
        external: { url: coverUrl },
      };
    }

    const page = await notion.pages.create(pageData);

    return res.status(200).json({
      success: true,
      pageId: page.id,
      pageUrl: page.url,
    });
  } catch (error) {
    console.error('Notion API error:', error);

    const message = error.code === 'validation_error'
      ? `Notionプロパティエラー: ${error.message}`
      : 'Notionへの追加に失敗しました';

    return res.status(500).json({ error: message });
  }
}
