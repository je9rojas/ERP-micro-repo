const express = require('express');
const router = express.Router();
const purchaseController = require('../controllers/purchaseController');

// Rutas para las compras
router.post('/purchases', purchaseController.createPurchase);
router.get('/purchases', purchaseController.getPurchases);
router.get('/purchases/:id', purchaseController.getPurchaseById);
router.put('/purchases/:id', purchaseController.updatePurchase);
router.delete('/purchases/:id', purchaseController.deletePurchase);

module.exports = router;