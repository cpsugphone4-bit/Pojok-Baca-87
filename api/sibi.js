// Vercel Serverless Function: /api/sibi
// Mencari PDF Kemendikbud via DuckDuckGo (tanpa API key), menyaring domain resmi.
// Catatan: hanya memproses link PDF dari domain Kemendikbud yang umum dipakai.
const https = require('https');

function fetchHTML(url){
  return new Promise((resolve, reject)=>{
    https.get(url, (res)=>{
      let data='';
      res.on('data', chunk=> data+=chunk);
      res.on('end', ()=> resolve(data));
    }).on('error', reject);
  });
}

function decodeEntities(str){
  return str
    .replace(/&amp;/g,'&')
    .replace(/&quot;/g,'"')
    .replace(/&#39;/g,"'")
    .replace(/&lt;/g,'<')
    .replace(/&gt;/g,'>');
}

function parseDDG(html){
  // Ambil semua href yang mengarah ke domain Kemendikbud & PDF
  const urls = new Set();
  const titles = {};
  const regexLink = /<a[^>]+href="([^"]+)"[^>]*>(.*?)<\/a>/gi;
  let m;
  while((m = regexLink.exec(html))){
    const href = decodeEntities(m[1]);
    const text = m[2].replace(/<[^>]+>/g,'').trim();
    if(!href) continue;
    const okDomain = /(static\.buku\.kemdikbud\.go\.id|buku\.kemdikbud\.go\.id|budi\.kemdikbud\.go\.id|budikemdikbud\.id)/i.test(href);
    const isPDF = /\.pdf(\?|$)/i.test(href);
    if(okDomain && isPDF){
      urls.add(href);
      titles[href] = text || 'Buku Kemendikbud (PDF)';
    }
  }
  // Convert to array of items
  return Array.from(urls).slice(0, 30).map(u=>({ title: titles[u] || 'Buku Kemendikbud (PDF)', url: u }));
}

module.exports = async (req, res) => {
  try{
    const term = (req.query.q || '').toString().trim();
    if(!term){
      res.setHeader('Access-Control-Allow-Origin','*');
      return res.status(200).json({items:[]});
    }
    const query = encodeURIComponent(`site:static.buku.kemdikbud.go.id filetype:pdf ${term}`);
    const url = `https://duckduckgo.com/html/?q=${query}&kl=id-id`;
    const html = await fetchHTML(url);
    let items = parseDDG(html);

    // Fallback tambahan dari domain 'buku.kemdikbud.go.id' (jika static tidak ketemu)
    if(items.length < 5){
      const q2 = encodeURIComponent(`site:buku.kemdikbud.go.id filetype:pdf ${term}`);
      const html2 = await fetchHTML(`https://duckduckgo.com/html/?q=${q2}&kl=id-id`);
      items = items.concat(parseDDG(html2));
    }

    // Unik dan batasi 30
    const seen = new Set();
    const uniq = [];
    for(const it of items){
      if(!seen.has(it.url)){ seen.add(it.url); uniq.push(it); }
      if(uniq.length>=30) break;
    }

    res.setHeader('Access-Control-Allow-Origin','*');
    res.status(200).json({ items: uniq });
  }catch(e){
    res.setHeader('Access-Control-Allow-Origin','*');
    res.status(200).json({ items: [] });
  }
};
