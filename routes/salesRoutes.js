const express = require('express');
const rescue = require('express-rescue');

const salesController = require('../controllers/salesController');

const router = express.Router();

router.post('/sales', rescue(salesController.createSale));
router.get('/sales', rescue(salesController.getAllSales));
router.get('/sales/:id', rescue(salesController.getSalesById));
router.put('/sales/:id', rescue(salesController.updateSale));
router.delete('/sales/:id', rescue(salesController.deleteSale));

module.exports = router;
