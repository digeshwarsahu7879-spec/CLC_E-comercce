export default async function handler(req, res) {
  const url = new URL(req.url || '/', 'http://localhost');
  // Empty catalog — no demo products
  if (url.pathname.includes('catalog') || url.pathname.includes('product')) {
    res.statusCode = 200;
    res.setHeader('content-type', 'application/json');
    res.end(JSON.stringify({ products: [] }));
    return;
  }
  res.statusCode = 200;
  res.setHeader('content-type', 'text/html; charset=utf-8');
  res.end('<!DOCTYPE html><html><head><title>CLC</title></head><body><h1>CLC CureLifeCare</h1><p>No products yet. Add from Admin.</p></body></html>');
}
