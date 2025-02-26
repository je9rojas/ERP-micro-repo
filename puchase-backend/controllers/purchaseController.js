const Purchase = require('../models/purchaseModels');

// Crear una nueva compra
exports.createPurchase = async (req, res) => {
    try {
        // Extraer los datos del cuerpo de la solicitud
        const { productCode, productName, quantity, price, invoiceNumber } = req.body;

        // Calcular el total de la compra
        const total = quantity * price;

        // Crear una nueva compra con los datos proporcionados
        const newPurchase = new Purchase({ productCode, productName, quantity, price, total, invoiceNumber });

        // Guardar la compra en la base de datos
        await newPurchase.save();

        // Responder con la compra creada y un código de estado 201 (Created)
        res.status(201).json(newPurchase);
    } catch (err) {
        // Manejar errores y responder con un código de estado 500 (Internal Server Error)
        res.status(500).json({ error: err.message });
    }
};

// Obtener todas las compras
exports.getPurchases = async (req, res) => {
    try {
        // Buscar todas las compras en la base de datos
        const purchases = await Purchase.find();

        // Responder con la lista de compras y un código de estado 200 (OK)
        res.status(200).json(purchases);
    } catch (err) {
        // Manejar errores y responder con un código de estado 500 (Internal Server Error)
        res.status(500).json({ error: err.message });
    }
};

// Obtener una compra por ID
exports.getPurchaseById = async (req, res) => {
    try {
        // Buscar la compra por su ID
        const purchase = await Purchase.findById(req.params.id);

        // Si no se encuentra la compra, responder con un código de estado 404 (Not Found)
        if (!purchase) {
            return res.status(404).json({ message: 'Compra no encontrada' });
        }

        // Responder con la compra encontrada y un código de estado 200 (OK)
        res.status(200).json(purchase);
    } catch (err) {
        // Manejar errores y responder con un código de estado 500 (Internal Server Error)
        res.status(500).json({ error: err.message });
    }
};

// Actualizar una compra
exports.updatePurchase = async (req, res) => {
    try {
        // Extraer los datos del cuerpo de la solicitud
        const { productCode, productName, quantity, price, invoiceNumber } = req.body;

        // Calcular el total de la compra
        const total = quantity * price;

        // Buscar y actualizar la compra por su ID
        const updatedPurchase = await Purchase.findByIdAndUpdate(
            req.params.id,
            { productCode, productName, quantity, price, total, invoiceNumber },
            { new: true } // Devolver el documento actualizado
        );

        // Si no se encuentra la compra, responder con un código de estado 404 (Not Found)
        if (!updatedPurchase) {
            return res.status(404).json({ message: 'Compra no encontrada' });
        }

        // Responder con la compra actualizada y un código de estado 200 (OK)
        res.status(200).json(updatedPurchase);
    } catch (err) {
        // Manejar errores y responder con un código de estado 500 (Internal Server Error)
        res.status(500).json({ error: err.message });
    }
};

// Eliminar una compra
exports.deletePurchase = async (req, res) => {
    try {
        // Buscar y eliminar la compra por su ID
        const deletedPurchase = await Purchase.findByIdAndDelete(req.params.id);

        // Si no se encuentra la compra, responder con un código de estado 404 (Not Found)
        if (!deletedPurchase) {
            return res.status(404).json({ message: 'Compra no encontrada' });
        }

        // Responder con un mensaje de éxito y un código de estado 200 (OK)
        res.status(200).json({ message: 'Compra eliminada' });
    } catch (err) {
        // Manejar errores y responder con un código de estado 500 (Internal Server Error)
        res.status(500).json({ error: err.message });
    }
};