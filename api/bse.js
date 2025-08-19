// /api/bse.js — ambil data dari Google Custom Search API
export default async function handler(req, res) {
  const query = (req.query.q || '').toString();
  const apiKey = process.env.GOOGLE_API_KEY;
  const cx = process.env.GOOGLE_CX;

  if (!apiKey || !cx) {
    res.status(500).json({ error: 'GOOGLE_API_KEY / GOOGLE_CX belum diatur di Environment Variables' });
    return;
  }
  if (!query) { res.status(200).json({ items: [] }); return; }

  const url = `https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(query)}+site:buku.kemdikbud.go.id&key=${apiKey}&cx=${cx}&fileType=pdf&num=10`;

  try {
    const resp = await fetch(url);
    const data = await resp.json();
    const items = (data.items || []).map(it => ({ title: it.title, link: it.link }));
    res.status(200).json({ items });
  } catch (e) {
    res.status(500).json({ error: 'Gagal mengambil data dari Google API', detail: String(e) });
  }
}
