const jwt = require('jsonwebtoken');
const { secretKey } = require('../config/jwt');

module.exports = (req, res, next) => {
  // Dapatkan token dari header Authorization
  const token = req.header('Authorization');

  // Jika token tidak ada, kirim respons 'Unauthorized'
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    // Verifikasi token
    const decodedToken = jwt.verify(token, secretKey);
    req.user = decodedToken; // Tambahkan data pengguna ke objek request

    // Lanjutkan ke middleware atau rute berikutnya
    next();
  } catch (error) {
    // Tangani kesalahan jika token tidak valid
    return res.status(401).json({ error: 'Unauthorized' });
  }
};