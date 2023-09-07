const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const roleMiddleware = require('../middlewares/roleMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');
const Resident = require('../models/masyarakat');
const News = require('../models/News');

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.put('/change-password', authMiddleware, userController.changePassword);

router.get('/laporan-keuangan', roleMiddleware('admin'), (req, res) => {
  res.status(200).json({ message: 'Laporan Keuangan Desa' });
});

router.get('/residents', authMiddleware, roleMiddleware('admin'), userController.getResidents);
router.get('/news', userController.getNews);

module.exports = router;