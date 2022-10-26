class Producto {

    constructor(tipo, categoria, titulo, autor, precio, imagen, masvendidos, id) {
        this.tipo = tipo;
        this.categoria = categoria;
        this.titulo = titulo;
        this.autor = autor;
        this.precio = precio;
        this.imagen = imagen;
        this.masvendidos = masvendidos;
        this.id = id;
    }
}
class Categoria {

    constructor(tipo, categoria, div) {
        this.tipo = tipo;
        this.categoria = categoria;
        this.div = div;
    }
}

class Carrito {
    constructor(id, titulo, precio) {
        this.id = id;
        this.titulo = titulo;
        this.precio = precio;
        this.cantidad = '1';
        this.preciototal = precio;
    }

}

const btnCarritoCompras = document.getElementById('btnCarritoCompras'),
    btnCarritoVaciar = document.getElementById('btnCarritoVaciar'),
    btnCarritoFinalizar = document.getElementById('btnCarritoFinalizar'),
    formCarritoCompras = document.getElementById('formCarritoCompras'),
    inpEmail = document.getElementById('inpEmail'),
    inpRecordarme = document.getElementById('inpRecordarme'),
    modalCarrito = document.getElementById('modalCarrito'),
    modalCarritoCompras = document.getElementById('modalCarritoCompras'),
    modalCarritoPie = document.getElementById('modalCarritoPie'),
    carritoDeCompras = [];

const carritoStorage = JSON.parse(localStorage.getItem('carrito'));
if (carritoStorage){
    carritoStorage.forEach(elemento => {
        const sumaProducto = new Carrito(elemento.id, elemento.titulo, elemento.precio);
        carritoDeCompras.push(sumaProducto);
    });
}

const categorias = [
    new Categoria("", "", "productosMasVendidos"),
    new Categoria("Libros", "Ciencia Ficción", "librosCienciaFiccion"),
    new Categoria("Libros", "Cómic y manga", "librosComicManga"),
    new Categoria("Libros", "Historia", "librosHistoria"),
    new Categoria("Libros", "Infantiles", "librosInfantiles"),
    new Categoria("Juegos de mesa", "", "juegosMesa"),
];

const productos = [
    new Producto('Libros', 'Historia', 'Notas al pie', 'Dolina, Alejandro', 3180, '../images/prod_notas.png', 'si', 1),
    new Producto('Libros', 'Ciencia Ficción', 'El italiano', 'Perez-Reverte, Arturo', 3799, '../images/prod_el_italiano.png', 'si', 2),
    new Producto('Libros', 'Ciencia Ficción', 'Estrellas y galaxias', 'Diaz Beltran, Angeles', 6560, '../images/prod_estrellas.png', 'si', 3),
    new Producto('Libros', 'Ciencia Ficción', 'El destino celeste', 'Robinette Kowal, Mary', 4390, '../images/prod_cf_destino.jpg', 'no', 4),
    new Producto('Libros', 'Ciencia Ficción', 'Cismatrix', 'Sterling, Bruce', 3150, '../images/prod_cf_cismatrix.jpg', 'no', 5),
    new Producto('Libros', 'Ciencia Ficción', 'Una princesa de Marte', 'Burroughs, Edgar Rice', 2450, '../images/prod_cf_princesa.jpg', 'no', 6),
    new Producto('Libros', 'Ciencia Ficción', 'El rey de amarillo', 'Chambers, Robert', 3110, '../images/prod_cf_amarillo.jpg', 'no', 7),
    new Producto('Libros', 'Ciencia Ficción', 'El sueño del Fevre', 'Martin, George R.', 3150, '../images/prod_cf_fevre.jpg', 'no', 8),
    new Producto('Libros', 'Ciencia Ficción', 'Una canción para Lya', 'Martin, George R.', 3299, '../images/prod_cf_lya.jpg', 'no', 9),
    new Producto('Libros', 'Ciencia Ficción', 'Star Wars - The Mandalorian', 'Disney', 1950, '../images/prod_cf_starw_mandalorian.jpg', 'no', 10),
    new Producto('Libros', 'Ciencia Ficción', 'Star Wars Icons - Han Solo', 'Mcintyre, Gina', 9900, '../images/prod_cf_starw_hansolo.jpg', 'no', 11),
    new Producto('Libros', 'Cómic y manga', 'Star Wars - Los diarios de Wan-Kenobi', 'Editorial Planeta', 3099, '../images/prod_cm_kenobi.jpg', 'no', 12),
    new Producto('Libros', 'Cómic y manga', 'Love Wars', 'Cuaresma, Eric', 2120, '../images/prod_cm_love.jpg', 'no', 13),
    new Producto('Libros', 'Cómic y manga', 'Nave prisión', 'Bruce, Jones', 2020, '../images/prod_cm_prision.jpg', 'no', 14),
    new Producto('Libros', 'Cómic y manga', 'Transformers: Cybertron Oscuro', 'Roberts, James', 4900, '../images/prod_cm_transf_cybertron.jpg', 'no', 15),
    new Producto('Libros', 'Cómic y manga', 'Transformers More than meets the eye', 'Roberts, James', 3190, '../images/prod_cm_transf_eye.jpg', 'no', 16),
    new Producto('Libros', 'Historia', 'Roma soy yo', 'Posteguillo, Santiago', 3999, '../images/prod_roma.png', 'si', 17),
    new Producto('Libros', 'Historia', 'Una Corona de huesos dorados', 'Armentrout, Jennifer', 3550, '../images/prod_corona.png', 'si', 18),
    new Producto('Libros', 'Historia', 'La gran aventura de los griegos', 'Negrete, Javier', 4600, '../images/prod_hist_griegos.jpg', 'si', 19),
    new Producto('Libros', 'Historia', 'Roma Victoriosa', 'Negrete, Javier', 3750, '../images/prod_hist_roma.jpg', 'no', 20),
    new Producto('Libros', 'Historia', 'Rusia revolución y guerra civil', 'Beevor, Antony', 4399, '../images/prod_hist_rusia.jpg', 'no', 21),
    new Producto('Libros', 'Historia', 'Los dias de la revolución', 'Sacheri, Eduardo', 3349, '../images/prod_hist_revolucion.jpg', 'no', 22),
    new Producto('Libros', 'Historia', 'Breve historia contemporánea de la Argentina', 'Romero, Jose Luis', 3099, '../images/prod_hist_argentina.jpg', 'no', 23),
    new Producto('Libros', 'Historia', 'Historia secreta Mapuche', 'Cayuqueo, Pedro', 3899, '../images/prod_hist_mapuche.jpg', 'no', 24),
    new Producto('Libros', 'Infantiles', 'Vicnix En la ciudad secreta', 'Invictor', 2349, '../images/prod_inf_vicnix.jpg', 'si', 25),
    new Producto('Libros', 'Infantiles', 'En busca de la esmeralda', 'Invictor y Mayo', 2349, '../images/prod_inf_esmeralda.jpg', 'no', 26),
    new Producto('Libros', 'Infantiles', "Five Nights at Freddy's", 'Cawthon, Scott', 3749, '../images/prod_inf_freddy.jpg', 'no', 27),
    new Producto('Libros', 'Infantiles', 'La casa de los madrigal', 'Disney', 1049, '../images/prod_inf_madrigal.jpg', 'no', 28),
    new Producto('Libros', 'Infantiles', 'Lightyear - Al infinito y más alla', 'Pixar, Disney', 4149, '../images/prod_inf_lightyear.jpg', 'no', 29),
    new Producto('Libros', 'Infantiles', 'El mundo de arriba', 'Disney', 1019, '../images/prod_inf_mundo.jpg', 'no', 30),
    new Producto('Juegos de mesa', '', 'Monopoly', 'Hasbro', 7799, '../images/prod_jdm_monopoly.png', 'no', 31),
    new Producto('Juegos de mesa', '', 'Scrabble', 'Ruibal', 4439, '../images/prod_jdm_scrabble.png', 'no', 32),
    new Producto('Juegos de mesa', '', 'Preguntados', 'ToyCo', 3399, '../images/prod_jdm_preguntados.png', 'no', 33),
    new Producto('Juegos de mesa', '', 'TEG', 'Yetem', 6499, '../images/prod_jdm_teg.png', 'no', 34),
    new Producto('Juegos de mesa', '', 'Twister', 'Hasbro', 4739, '../images/prod_jdm_twister.png', 'no', 35),
    new Producto('Juegos de mesa', '', 'Burako', 'Top Toys', 3439, '../images/prod_jdm_burako.png', 'no', 36)
];

function armaListado(array, tipo, categoria, div) {
    if (div == 'productosMasVendidos') {
        listado = array.filter((elemento) => elemento.masvendidos == 'si');
    } else {
        listado = array.filter((elemento) => elemento.tipo == tipo && elemento.categoria == categoria);
    }
    return listado;
}

function mostrarProductos(array, nombrediv) {
    const contenedor = document.getElementById(nombrediv);
    contenedor.innerHTML = "";
    array.forEach(elemento => {
        contenedor.innerHTML += `<div class="col">
                                    <div class="card prod_card p-1 mb-1 h-100">
                                        <img loading="lazy" src="${elemento.imagen}" class="img_sombra img_opac mb-1"
                                        alt="Portada ${elemento.titulo}">
                                        <div class="card-body p-0 text-center">
                                            <p class="popp_s font_espac1 mb-1">${elemento.titulo}</p>
                                            <p class="popp_s font_autor font_espac1">${elemento.autor}</p>
                                        </div>
                                        <div class="card-footer p-1 mb-0 text-center">
                                            <p class="popp_s font_precio mb-0">
                                                $ ${elemento.precio}
                                                <button class="btn btn-primary btn-sm p-0 btnsumarcarrito ms-2" id="btn_${elemento.id}" value="${elemento.id}" title="Sumar al carrito">
                                                    <img src="../images/add.png">
                                                </button>
                                            </p>
                                        </div>
                                    </div>
                                </div>`;
    });
}

function sumoCarrito() {
    listado = productos.find((elemento) => elemento.id == (this.value));
    const sumaProducto = new Carrito(listado.id, listado.titulo, listado.precio);
    if (carritoDeCompras.some((el) => el.id === listado.id)){
        const index = carritoDeCompras.findIndex(object => {
            return object.id === sumaProducto.id;
          });
        carritoDeCompras[index].cantidad++;
        carritoDeCompras[index].preciototal = carritoDeCompras[index].cantidad * carritoDeCompras[index].precio;
        console.log(carritoDeCompras);
    } else {
        carritoDeCompras.push(sumaProducto);
        console.log("no está");
    }
    localStorage.setItem('carrito', JSON.stringify(carritoDeCompras));
    Toastify({
        text: "Producto agregado al carrito",
        duration: 3000,
        gravity: "bottom",
        position: "center",
        style: {
            background: "#888888aa"
        }
    }).showToast();
}

function verCarrito(){
    modalCarritoCompras.innerHTML = "";
    let carritoStorage = JSON.parse(localStorage.getItem('carrito'));
    contenido = `<table class="table table-striped font_carrito">
                                    <thead>
                                        <tr>
                                            <th scope="col">Cod Producto</th>
                                            <th scope="col">Título</th>
                                            <th scope="col">Precio</th>
                                            <th scope="col">Cantidad</th>
                                            <th scope="col">Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>`;
    if (carritoStorage) {
        carritoStorage.forEach(elemento => {
            contenido += `<tr>
                                <th scope="row">${elemento.id}</th>
                                <td>${elemento.titulo}</td>
                                <td>$ ${elemento.precio}</td>
                                <td>X</td>
                                <td>$ 2</td>
                            </tr>`;
        });
        const total = carritoStorage.reduce((acc, item) => acc + item.precio, 0)
        contenido += `</tbody>
                     <tfoot>
                        <tr>
                        <th scope="row">Total</th>
                        <td colspan="3"></td>
                        <th scope="row">$ ${total}</th>
                        </tr>
                    </tfoot>
                `;
        modalCarritoPie.classList.remove("d-none");
        
         
    } else {
        contenido += `<tr>
                        <th scope="row" colspan="4" class="text-center">Carrito vacio</th>
                      </tr></tbody>`;
        modalCarritoPie.classList.add("d-none");
    }
    contenido += "</table>";
    modalCarritoCompras.innerHTML += contenido;
    
}

function recuperoEmail(storage) {
    let emailStorage = JSON.parse(storage.getItem('email'));
    return emailStorage;
}

btnCarritoCompras.addEventListener('click', () => {
    if(localStorage.getItem('email')){
        inpEmail.value = JSON.parse(localStorage.getItem('email'));
    } else {
        inpEmail.value = JSON.parse(sessionStorage.getItem('email'));
    }
    verCarrito();
})

btnCarritoVaciar.addEventListener('click', () => {
    localStorage.removeItem('carrito');
    carritoDeCompras.splice(0);
    verCarrito();
})

modalCarrito.addEventListener('hide.bs.modal', () => {
    if (inpRecordarme.checked && inpEmail.value != '') {
        localStorage.setItem('email', JSON.stringify(inpEmail.value));
        sessionStorage.removeItem('email');
    } else { 
        sessionStorage.setItem('email', JSON.stringify(inpEmail.value));
        localStorage.removeItem('email');
    }
});

formCarritoCompras.addEventListener('submit', (e) => {
    e.preventDefault();
    swal("Orden de compra generada!", "En instantes recibirá por email la confirmación y un link para generar el pago", "success");
    $('#modalCarrito').modal('hide');
    localStorage.removeItem('carrito');
    carritoDeCompras.splice(0); 
});

window.onload = () => {
	// Armo listado de categorias y productos
    categorias.forEach((elemento) => {
		let lista = armaListado(productos,elemento.tipo,elemento.categoria,elemento.div);
		mostrarProductos(lista, elemento.div);
	});
    // Armo botones para productos
	btnSumarC = document.querySelectorAll(".btnsumarcarrito");
	btnSumarC.forEach((element) => {
		element.addEventListener("click", sumoCarrito);
	});
};