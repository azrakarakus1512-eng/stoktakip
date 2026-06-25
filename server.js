const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const { DatabaseSync } = require('node:sqlite');

const PORT = 3000;
const DB_FILE = path.join(__dirname, 'stock.db');
const PUBLIC_DIR = path.join(__dirname, 'public');
const UPLOADS_DIR = path.join(PUBLIC_DIR, 'uploads');

// Ensure public and uploads directories exist
if (!fs.existsSync(PUBLIC_DIR)) {
  fs.mkdirSync(PUBLIC_DIR, { recursive: true });
}
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

// Copy design system screenshots to uploads for fallback if they exist
const sourceImages = [
  { src: 'stitch_stitch_stock_tracking_app/ana_ekran_stok/screen.png', dest: 'ana_ekran.png' },
  { src: 'stitch_stitch_stock_tracking_app/image_4.png/screen.png', dest: 'image_4.png' },
  { src: 'stitch_stitch_stock_tracking_app/r_n_detay/screen.png', dest: 'urun_detay.png' },
  { src: 'stitch_stitch_stock_tracking_app/r_n_detay_g_ncellenmi/screen.png', dest: 'urun_detay_guncel.png' },
  { src: 'stitch_stitch_stock_tracking_app/yeni_r_n_ekle/screen.png', dest: 'yeni_urun.png' }
];

sourceImages.forEach(img => {
  const srcPath = path.join(__dirname, img.src);
  const destPath = path.join(UPLOADS_DIR, img.dest);
  if (fs.existsSync(srcPath)) {
    try {
      fs.copyFileSync(srcPath, destPath);
    } catch (e) {
      console.error(`Failed to copy screenshot ${img.src}:`, e);
    }
  }
});

// Initialize SQLite database
const db = new DatabaseSync(DB_FILE);

// Create tables
db.exec(`
  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    brand TEXT NOT NULL,
    model TEXT NOT NULL,
    serial_no TEXT,
    purchase_price REAL DEFAULT 0.0,
    sale_price REAL DEFAULT 0.0,
    stock_quantity INTEGER DEFAULT 0,
    image_url TEXT
  );
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS transactions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_id INTEGER NOT NULL,
    sales_person TEXT,
    branch TEXT,
    quantity INTEGER NOT NULL,
    date DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(product_id) REFERENCES products(id) ON DELETE CASCADE
  );
`);

function seedDatabase() {
  console.log('Seeding initial stock tracking database...');
  
  try {
    db.exec('DELETE FROM transactions');
    db.exec('DELETE FROM products');
  } catch (err) {
    console.error('Failed to clear database before seeding:', err);
  }
  
  const insertProduct = db.prepare(`
    INSERT INTO products (brand, model, serial_no, purchase_price, sale_price, stock_quantity, image_url)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);
  
  const insertTransaction = db.prepare(`
    INSERT INTO transactions (product_id, sales_person, branch, quantity, date)
    VALUES (?, ?, ?, ?, ?)
  `);

  // Seed Item 1: Apple iPhone 13 (Low Stock / Azalıyor)
  const p1 = insertProduct.run(
    'Apple', 
    'iPhone 13', 
    'SE513820', 
    120.00, 
    180.00, 
    5, 
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBY5A_m9m_nneppD8aU6bIzSBE4NdIdH_nNBFkD_El7Rjweq-lARHiOfl5wq84rmspxkwTak8QCI9jJnOgV2j_OppNGWXQghrOGpU7uZsgu0ZTFCCMXVz_3BBfr3mBBKK4q9-_JyGs-TeYG8JrQtfdtW0YEZr92SwEFiiMh5zhZqkNcHty_Y1QfuW3Lu05ag9WX1NjFP8u0dQswDMhb1dOSRz_2sQnlYttoNbr3gAVJ_oITqoz4SMOvZHHDPpOklf9lMeRyft5kzGBV'
  );
  
  // Seed Item 2: Samsung S21 (Critical Stock / Kritik)
  const p2 = insertProduct.run(
    'Samsung', 
    'S21', 
    'SN982310', 
    120.00, 
    180.00, 
    2, 
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDzVDyftIGv77WEBhOpsK_2objr3FFwOfN5NdWR6gdGBrEvPszFb4-li7oX_RDCvua1yrkVlz9D5AMdSUdTjZsboJLSznfdxLDsOWj7jU8_cwV4XTpCSid8qbP3gDlXN58GvUDqntYm3ASIXWY89IGneGHMwK2fik988B5hALlYScapdEeB1cfsfrZ7l0Sljhx1DtcM7trfkHTotLV5NlUh4dOZG8ATZb3eV092LEFu9b6qwEKeduKlIYYeRY7NcQMpjIZzidoa6jF3'
  );

  // Seed Item 3: Samsung S21 Ultra (Sufficient Stock / Yeterli)
  const p3 = insertProduct.run(
    'Samsung', 
    'S21 Ultra', 
    'SN482093', 
    120.00, 
    180.00, 
    12, 
    'https://lh3.googleusercontent.com/aida-public/AB6AXuD1BrWps-lsqtI5bJSegJYegWQiScMV9LpDqC1KY3VwinX3TholtdzMvPoyUftFAvsbpj_3aOtqI2drqI6lht5534AWTlru4d3uv0pHms3t-QfYD4jiFbjEda1fPUBxX1U3mh7k8LeYEBn6a9awEhj_omZgGSb5H5adThltTqm0_CGqi944QYKfjVnziRT2q0HJ2WsFGzUV9SS2QGbREm0yiDeaaIVIQzpKPcM5O94bUT9M3Em1Fbo1XP1h4kR10C0ihr8Vlz5DdIUU'
  );

  // Seed Item 4: Xiaomi Redmi Note 13 (Sold Out / Tükendi)
  const p4 = insertProduct.run(
    'Xiaomi', 
    'Redmi Note 13', 
    'XM901234', 
    90.00, 
    130.00, 
    0, 
    'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=300'
  );

  // Seed transaction histories
  const nowStr = new Date().toISOString();
  insertTransaction.run(p1.lastInsertRowid, 'Mert Yılmaz', 'TeknoPark Şubesi', -2, nowStr);
  insertTransaction.run(p1.lastInsertRowid, 'Sistem Açılış', 'Depo Girişi', 7, nowStr);

  insertTransaction.run(p2.lastInsertRowid, 'Ayşe Yılmaz', 'Karaköy Şubesi', -3, nowStr);
  insertTransaction.run(p2.lastInsertRowid, 'Sistem Açılış', 'Depo Girişi', 5, nowStr);

  insertTransaction.run(p3.lastInsertRowid, 'Mehmet Kaya', 'Kadıköy Şubesi', -1, nowStr);
  insertTransaction.run(p3.lastInsertRowid, 'Sistem Açılış', 'Depo Girişi', 13, nowStr);

  insertTransaction.run(p4.lastInsertRowid, 'Sistem Açılış', 'Depo Girişi', 5, nowStr);
  insertTransaction.run(p4.lastInsertRowid, 'Ali Veli', 'Merkez Şube', -5, nowStr);
  
  console.log('Database seeded successfully.');
}

// Check if database needs seeding
const productCountStmt = db.prepare('SELECT COUNT(*) as count FROM products');
const row = productCountStmt.get();
if (row.count === 0) {
  seedDatabase();
}

// Helper to send JSON responses
function sendJSON(res, data, statusCode = 200) {
  res.writeHead(statusCode, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify(data));
}

// Helper to send errors
function sendError(res, message, statusCode = 500) {
  sendJSON(res, { error: message }, statusCode);
}

// Helper to parse JSON body
function getJSONBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (err) {
        reject(err);
      }
    });
    req.on('error', err => reject(err));
  });
}

// Create HTTP Server
const server = http.createServer(async (req, res) => {
  const parsedUrl = new URL(req.url, `http://localhost:${PORT}`);
  const pathname = parsedUrl.pathname;
  const method = req.method;

  // CORS Headers for safety
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // --- API ROUTES ---

  // GET /api/products - Get all products with search & filter
  if (method === 'GET' && pathname === '/api/products') {
    try {
      const search = parsedUrl.searchParams.get('search') || '';
      const filter = parsedUrl.searchParams.get('filter') || 'all'; // all, kritik, azaliyor, yeterli

      let query = 'SELECT * FROM products';
      const params = [];

      if (search) {
        query += ' WHERE (brand LIKE ? OR model LIKE ? OR serial_no LIKE ?)';
        params.push(`%${search}%`, `%${search}%`, `%${search}%`);
      }

      const stmt = db.prepare(query);
      let products = stmt.all(...params);

      // Post-filtering for stock status levels
      // tukendi: 0
      // kritik: 1-2
      // azaliyor: >= 3 and <= 5
      // yeterli: > 5
      if (filter !== 'all') {
        products = products.filter(p => {
          const qty = p.stock_quantity;
          if (filter === 'tukendi') return qty === 0;
          if (filter === 'kritik') return qty > 0 && qty < 3;
          if (filter === 'azaliyor') return qty >= 3 && qty <= 5;
          if (filter === 'yeterli') return qty > 5;
          if (filter === 'uyari') return qty < 3;
          return true;
        });
      }

      sendJSON(res, products);
    } catch (e) {
      sendError(res, e.message);
    }
    return;
  }

  // GET /api/products/:id - Get a single product details with transactions
  const productDetailRegex = /^\/api\/products\/(\d+)$/;
  if (method === 'GET' && productDetailRegex.test(pathname)) {
    const id = parseInt(pathname.match(productDetailRegex)[1], 10);
    try {
      const productStmt = db.prepare('SELECT * FROM products WHERE id = ?');
      const product = productStmt.get(id);

      if (!product) {
        sendError(res, 'Ürün bulunamadı', 404);
        return;
      }

      const txStmt = db.prepare('SELECT * FROM transactions WHERE product_id = ? ORDER BY date DESC');
      const transactions = txStmt.all(id);

      sendJSON(res, { product, transactions });
    } catch (e) {
      sendError(res, e.message);
    }
    return;
  }

  // POST /api/products - Insert a new product
  if (method === 'POST' && pathname === '/api/products') {
    try {
      const body = await getJSONBody(req);
      const { brand, model, serial_no, purchase_price, sale_price, stock_quantity, image_data, image_name } = body;

      if (!brand || !model) {
        sendError(res, 'Marka ve Model alanları zorunludur.', 400);
        return;
      }

      let imageUrl = 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300'; // Default phone image placeholder
      
      // Save Base64 image to uploads if present
      if (image_data && image_name) {
        try {
          const base64Data = image_data.replace(/^data:image\/\w+;base64,/, '');
          const filename = `${Date.now()}_${image_name.replace(/[^a-zA-Z0-9.]/g, '_')}`;
          const filePath = path.join(UPLOADS_DIR, filename);
          fs.writeFileSync(filePath, base64Data, 'base64');
          imageUrl = `/uploads/${filename}`;
        } catch (imgErr) {
          console.error('Failed to save image:', imgErr);
        }
      }

      const stmt = db.prepare(`
        INSERT INTO products (brand, model, serial_no, purchase_price, sale_price, stock_quantity, image_url)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `);
      
      const result = stmt.run(
        brand,
        model,
        serial_no || '',
        parseFloat(purchase_price) || 0.0,
        parseFloat(sale_price) || 0.0,
        parseInt(stock_quantity, 10) || 0,
        imageUrl
      );

      // Create initial transaction if stock quantity is greater than 0
      const qty = parseInt(stock_quantity, 10) || 0;
      if (qty > 0) {
        const txStmt = db.prepare(`
          INSERT INTO transactions (product_id, sales_person, branch, quantity)
          VALUES (?, ?, ?, ?)
        `);
        txStmt.run(result.lastInsertRowid, 'Sistem Başlangıç', 'Depo Girişi', qty);
      }

      sendJSON(res, { success: true, productId: result.lastInsertRowid }, 201);
    } catch (e) {
      sendError(res, e.message, 400);
    }
    return;
  }

  // PUT /api/products/:id - Update product info
  if (method === 'PUT' && productDetailRegex.test(pathname)) {
    const id = parseInt(pathname.match(productDetailRegex)[1], 10);
    try {
      const body = await getJSONBody(req);
      const { brand, model, serial_no, purchase_price, sale_price } = body;

      if (!brand || !model) {
        sendError(res, 'Marka ve Model alanları zorunludur.', 400);
        return;
      }

      const stmt = db.prepare(`
        UPDATE products 
        SET brand = ?, model = ?, serial_no = ?, purchase_price = ?, sale_price = ?
        WHERE id = ?
      `);
      
      const result = stmt.run(
        brand,
        model,
        serial_no || '',
        parseFloat(purchase_price) || 0.0,
        parseFloat(sale_price) || 0.0,
        id
      );

      if (result.changes === 0) {
        sendError(res, 'Ürün bulunamadı veya güncellenemedi', 404);
        return;
      }

      sendJSON(res, { success: true });
    } catch (e) {
      sendError(res, e.message, 400);
    }
    return;
  }

  // POST /api/products/:id/transactions - Record a transaction (sale or adjustment) and update stock
  const productTxRegex = /^\/api\/products\/(\d+)\/transactions$/;
  if (method === 'POST' && productTxRegex.test(pathname)) {
    const id = parseInt(pathname.match(productTxRegex)[1], 10);
    try {
      const body = await getJSONBody(req);
      const { sales_person, branch, quantity } = body;
      const changeQty = parseInt(quantity, 10);

      if (isNaN(changeQty) || changeQty === 0) {
        sendError(res, 'Miktar sıfırdan farklı bir sayı olmalıdır.', 400);
        return;
      }

      // Check current stock
      const checkStmt = db.prepare('SELECT stock_quantity FROM products WHERE id = ?');
      const prod = checkStmt.get(id);

      if (!prod) {
        sendError(res, 'Ürün bulunamadı', 404);
        return;
      }

      const newQty = prod.stock_quantity + changeQty;
      if (newQty < 0) {
        sendError(res, 'Yetersiz stok! Stok miktarı sıfırın altına düşemez.', 400);
        return;
      }

      // Record transaction
      const txStmt = db.prepare(`
        INSERT INTO transactions (product_id, sales_person, branch, quantity)
        VALUES (?, ?, ?, ?)
      `);
      txStmt.run(id, sales_person || 'Bilinmeyen', branch || 'Depo', changeQty);

      // Update product stock quantity
      const updateStmt = db.prepare('UPDATE products SET stock_quantity = ? WHERE id = ?');
      updateStmt.run(newQty, id);

      sendJSON(res, { success: true, newStock: newQty });
    } catch (e) {
      sendError(res, e.message, 400);
    }
    return;
  }

  // DELETE /api/products/:id - Delete product
  if (method === 'DELETE' && productDetailRegex.test(pathname)) {
    const id = parseInt(pathname.match(productDetailRegex)[1], 10);
    try {
      const stmt = db.prepare('DELETE FROM products WHERE id = ?');
      const result = stmt.run(id);

      if (result.changes === 0) {
        sendError(res, 'Ürün bulunamadı', 404);
        return;
      }

      sendJSON(res, { success: true });
    } catch (e) {
      sendError(res, e.message);
    }
    return;
  }

  // POST /api/reset - Reset database to default seed data
  if (method === 'POST' && pathname === '/api/reset') {
    try {
      seedDatabase();
      sendJSON(res, { success: true, message: 'Database reset and re-seeded successfully.' });
    } catch (e) {
      sendError(res, e.message, 500);
    }
    return;
  }

  // --- STATIC FILE SERVER ---
  if (method === 'GET') {
    let filePath = path.join(PUBLIC_DIR, pathname === '/' ? 'index.html' : pathname);

    // Prevent directory traversal attacks
    if (!filePath.startsWith(PUBLIC_DIR)) {
      sendError(res, 'Forbidden', 403);
      return;
    }

    fs.stat(filePath, (err, stats) => {
      if (err || !stats.isFile()) {
        // Fallback to index.html for SPA routing if needed, or return 404
        filePath = path.join(PUBLIC_DIR, 'index.html');
        fs.stat(filePath, (fallbackErr, fallbackStats) => {
          if (fallbackErr || !fallbackStats.isFile()) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Not Found');
            return;
          }
          serveFile(filePath, res);
        });
        return;
      }
      serveFile(filePath, res);
    });
  }
});

function serveFile(filePath, res) {
  const ext = path.extname(filePath).toLowerCase();
  const mimeTypes = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.json': 'application/json'
  };

  const contentType = mimeTypes[ext] || 'application/octet-stream';
  res.writeHead(200, { 'Content-Type': contentType });

  const stream = fs.createReadStream(filePath);
  stream.on('error', () => {
    res.writeHead(500);
    res.end('Internal Server Error');
  });
  stream.pipe(res);
}

// Start listening
server.listen(PORT, () => {
  console.log(`Stitch Stock Tracking App server running at http://localhost:${PORT}`);
  console.log(`Open your browser and navigate to http://localhost:${PORT}`);
});
