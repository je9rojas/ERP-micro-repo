// URL base de la API
const API_URL = 'http://localhost:3000/api/purchases';

// Elementos del DOM
const purchaseForm = document.getElementById('purchaseForm');
const purchasesTable = document.getElementById('purchasesTable').getElementsByTagName('tbody')[0];

// Función para cargar las compras
async function loadPurchases() {
    try {
        const response = await fetch(API_URL);
        const purchases = await response.json();

        // Limpiar la tabla
        purchasesTable.innerHTML = '';

        // Llenar la tabla con las compras
        purchases.forEach(purchase => {
            const row = purchasesTable.insertRow();
            row.insertCell().textContent = purchase.productCode;
            row.insertCell().textContent = purchase.productName;
            row.insertCell().textContent = purchase.quantity;
            row.insertCell().textContent = purchase.price;
            row.insertCell().textContent = purchase.total;
            row.insertCell().textContent = purchase.invoiceNumber;
            row.insertCell().textContent = new Date(purchase.purchaseDate).toLocaleString();
        });
    } catch (error) {
        console.error('Error cargando las compras:', error);
    }
}

// Función para crear una compra
async function createPurchase(event) {
    event.preventDefault();

    const productCode = document.getElementById('productCode').value;
    const productName = document.getElementById('productName').value;
    const quantity = document.getElementById('quantity').value;
    const price = document.getElementById('price').value;
    const invoiceNumber = document.getElementById('invoiceNumber').value;

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ productCode, productName, quantity, price, invoiceNumber }),
        });

        if (response.ok) {
            // Recargar las compras después de crear una nueva
            loadPurchases();
            // Limpiar el formulario
            purchaseForm.reset();
        } else {
            const errorData = await response.json();
            console.error('Error creando la compra:', errorData.error);
            alert(errorData.error); // Mostrar mensaje de error al usuario
        }
    } catch (error) {
        console.error('Error creando la compra:', error);
    }
}

// Evento para enviar el formulario
purchaseForm.addEventListener('submit', createPurchase);

// Cargar las compras al iniciar
loadPurchases();