
class Carrito {
    constructor(producto, precio) {
        this.producto = producto;
        this.precio = precio;
    }

}


const btnCancelar = document.getElementById('btnCancelar');

btnCancelar.addEventListener('click', () => {
    mostrarProductos(productos);
});