const fs = require('fs');
const path = require('path');

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.ico': 'image/x-icon'
};

module.exports = (req, res) => {
  let file = req.url.split('?')[0];
  if (file === '/' || !file) file = '/index.html';
  const filePath = path.join(__dirname, file.replace(/^\/+/, ''));

  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = path.extname(filePath).toLowerCase();
    res.setHeader('Content-Type', MIME_TYPES[ext] || 'text/html; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=3600');
    return fs.createReadStream(filePath).pipe(res);
  }

  // Fallback a index.html
  const indexPath = path.join(__dirname, 'index.html');
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  fs.createReadStream(indexPath).pipe(res);
};
