class Categoria {

    constructor(tipo, categoria, div, titulo) {
        this.tipo = tipo;
        this.categoria = categoria;
        this.div = div;
        this.titulo = titulo;
    }
}

class Carrito {
    constructor(id, titulo, precio, cantidad, preciototal) {
        this.id = id;
        this.titulo = titulo;
        this.precio = precio;
        this.cantidad = cantidad;
        this.preciototal = preciototal;
    }

}

const btnCarritoCompras = document.getElementById('btnCarritoCompras'),
    btnCarritoVaciar = document.getElementById('btnCarritoVaciar'),
    btnCarritoFinalizar = document.getElementById('btnCarritoFinalizar'),
    formCarritoCompras = document.getElementById('formCarritoCompras'),
    inpEmail = document.getElementById('inpEmail'),
    inpRecordarme = document.getElementById('inpRecordarme'),
    inpBusqueda = document.getElementById('inpBusqueda'),
    divBusqueda = document.getElementById('divBusqueda'),
    modalCarrito = document.getElementById('modalCarrito'),
    modalCarritoCompras = document.getElementById('modalCarritoCompras'),
    modalCarritoPie = document.getElementById('modalCarritoPie'),
    listaProductos = document.getElementById('listaProductos'),
    carritoDeCompras = [];

const carritoStorage = JSON.parse(localStorage.getItem('carrito'));

if (carritoStorage) {
    carritoStorage.forEach(elemento => {
        const sumaProducto = new Carrito(elemento.id, elemento.titulo, elemento.precio, elemento.cantidad, elemento.preciototal);
        carritoDeCompras.push(sumaProducto);
    });
}

const categorias = [
    new Categoria("", "", "mas_vend", "Más vendidos"),
    new Categoria("Libros", "Ciencia Ficción", "libros_ficcion", "Libros - Ciencia Ficción"),
    new Categoria("Libros", "Cómic y manga", "libros_comic", "Libros - Cómic y manga"),
    new Categoria("Libros", "Historia", "libros_historia", "Libros - Historia"),
    new Categoria("Libros", "Infantiles", "libros_infant", "Libros - Infantiles"),
    new Categoria("Juegos de mesa", "", "juegos", "Juegos de mesa"),
];

let contenido = "";
let idBoton = "";

// Funcion para armar el listado de productos armando primero si corresponde a mas vendidos, despues por tipo y categoria
function armaListado(array, tipo, categoria, div) {
    if (div == 'mas_vend') {
        listado = array.filter((elemento) => elemento.masvendidos == 'si');
    } else {
        listado = array.filter((elemento) => elemento.tipo == tipo && elemento.categoria == categoria);
    }
    return listado;
}

// Funcion para armar los sections y cards de productos por categoria
function mostrarProductos(array, nombrediv, titulo, accion) {
    if (accion == "busqueda") {
        contenido = "";
        idBoton = "btn_busq_";
    } else {
        idBoton = "btn_";
    }
    contenido += `<section class="section1 bkg_transp wow fadeInLeft mb-2" data-wow-delay="0" id="${nombrediv}">
                        <h3 class="popp_m mb-1">${titulo}</h3>
                        <div class="card-group row-cols-auto gap-3">`;
    array.forEach(elemento => {
        contenido += `<div class="col">
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
                                                <button class="btn btn-primary btn-sm p-0 btnsumarcarrito ms-2" id="${idBoton}${elemento.id}" value="${elemento.id}" title="Sumar al carrito">
                                                    <img src="../images/add.png">
                                                </button>
                                            </p>
                                        </div>
                                    </div>
                                </div>`;
    });
    contenido += `</section></div>`;
    accion == "listado" ? listaProductos.innerHTML = contenido : divBusqueda.innerHTML = contenido;
}

// Funcion para agregar productos, o sumar unidades, al carrito en base al value que tiene el boton
function sumoCarrito() {
    fetch('../js/productos.json')
        .then((response) => response.json())
        .then((productos) => {
            listado = productos.find((elemento) => elemento.id == (this.value));
            if (carritoDeCompras.some((el) => el.id === listado.id)) {
                const index = carritoDeCompras.findIndex(object => {
                    return object.id === listado.id;
                });
                carritoDeCompras[index].cantidad++;
                carritoDeCompras[index].preciototal = carritoDeCompras[index].cantidad * carritoDeCompras[index].precio;
            } else {
                const sumaProducto = new Carrito(listado.id, listado.titulo, listado.precio, 1, listado.precio);
                carritoDeCompras.push(sumaProducto);
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
            verCarrito();
        })
}

// Funcion para restar productos, o eliminar de ser 1 solo, del carrito en base al value del boton
function restoCarrito() {
    let mensaje = '';
    if (carritoDeCompras.some((el) => el.id == this.value)) {
        const id = this.value;
        let index = carritoDeCompras.findIndex(object => {
            return object.id == id;
        });
        if (carritoDeCompras[index].cantidad > 1) {
            carritoDeCompras[index].cantidad--;
            carritoDeCompras[index].preciototal = carritoDeCompras[index].cantidad * carritoDeCompras[index].precio;
        } else {
            carritoDeCompras.splice(index, 1);
        }
        localStorage.setItem('carrito', JSON.stringify(carritoDeCompras));
        mensaje = "Producto quitado del carrito";
    } else {
        mensaje = "Producto inexistente en el carrito";
    }
    Toastify({
        text: `${mensaje}`,
        duration: 3000,
        gravity: "bottom",
        position: "center",
        style: {
            background: "#888888aa"
        }
    }).showToast();
    verCarrito();
}

// Funcion para armar la vista del carrito en el modal
function verCarrito() {
    modalCarritoCompras.innerHTML = "";
    let carritoStorage = JSON.parse(localStorage.getItem('carrito'));
    contenido = `<table class="table table-striped font_carrito">
                                    <thead>
                                        <tr>
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
                            <td class="text-wrap">${elemento.titulo}</td>
                            <td class="text-nowrap"> $ ${elemento.precio}</td>
                            <td class="text-nowrap">
                                <button type="button" class="btn btn-sm p-0 btnrestarmodal me-1" id="btn_del_modal_${elemento.id}" value="${elemento.id}" title="Restar unidad">
                                    <img src="../images/del_modal.png">
                                </button>
                                ${elemento.cantidad}
                                <button type="button" class="btn btn-sm p-0 btnsumarmodal ms-1" id="btn_add_modal_${elemento.id}" value="${elemento.id}" title="Sumar unidad">
                                    <img src="../images/add_modal.png">
                                </button>
                            </td>
                            <td class="text-nowrap">$ ${elemento.preciototal}</td>
                        </tr>`;
        });
        const total = carritoStorage.reduce((acc, item) => acc + item.preciototal, 0)
        contenido += `</tbody>
                     <tfoot>
                        <tr>
                        <th scope="row">Total</th>
                        <td colspan="2"></td>
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
    // Armo botones para productos en modal
    btnSumarM = document.querySelectorAll(".btnsumarmodal");
    btnSumarM.forEach((element) => {
        element.addEventListener("click", sumoCarrito);
    });
    btnRestarM = document.querySelectorAll(".btnrestarmodal");
    btnRestarM.forEach((element) => {
        element.addEventListener("click", restoCarrito);
    });

}

// Chequea mail en storage al abrir carrito
btnCarritoCompras.addEventListener('click', () => {
    localStorage.getItem('email') ? inpEmail.value = JSON.parse(localStorage.getItem('email')) : inpEmail.value = JSON.parse(sessionStorage.getItem('email'));
    verCarrito();
})

// Vacia carrito en storage y const
btnCarritoVaciar.addEventListener('click', () => {
    localStorage.removeItem('carrito');
    carritoDeCompras.splice(0);
    verCarrito();
})

// Capto el evento de cierre del modal y guardo / elimino en storage el email dependiendo el checkbox
modalCarrito.addEventListener('hide.bs.modal', () => {
    if (inpRecordarme.checked && inpEmail.value != '') {
        localStorage.setItem('email', JSON.stringify(inpEmail.value));
        sessionStorage.removeItem('email');
    } else {
        sessionStorage.setItem('email', JSON.stringify(inpEmail.value));
        localStorage.removeItem('email');
    }
});

// Capto submit del modal y genero orden de compra, despues vacio el carrito
formCarritoCompras.addEventListener('submit', (e) => {
    e.preventDefault();
    const numeroRandom = Math.round((Math.random() * 10000));
    swal(`Orden de compra #${numeroRandom} generada!`, `En instantes le llegará un mail a ${inpEmail.value} con la confirmación de la solicitud y un link para generar el pago`, "success");
    $('#modalCarrito').modal('hide');
    localStorage.removeItem('carrito');
    carritoDeCompras.splice(0);
});

// Busqueda de productos
inpBusqueda.addEventListener('input', () => {
    if (inpBusqueda.value.length > 2) {
        fetch('../js/productos.json')
            .then((response) => response.json())
            .then((data) => {
                listado = data.filter((elemento) => elemento.titulo.toLowerCase().includes(inpBusqueda.value.toLowerCase()) || elemento.autor.toLowerCase().includes(inpBusqueda.value.toLowerCase()));
                if (listado.length > 0) {
                    mostrarProductos(listado, "divBusqueda", "Resultados de la búsqueda", "busqueda");
                    btnSumarC = document.querySelectorAll(".btnsumarcarrito");
                    btnSumarC.forEach((element) => {
                        element.addEventListener("click", sumoCarrito);
                    });
                } else {
                    divBusqueda.innerHTML = `<section class="section1 bkg_transp wow fadeInLeft mb-2" data-wow-delay="0" id="divBusqueda">
                        <h3 class="popp_m mb-1">Resultados de la búsqueda</h3>
                        <p class="popp_m">No se han encontrado productos que concuerden con lo ingresado</p>
                        </section>`;
                }
            }).catch(() => {
                divBusqueda.innerHTML = `<section class="section1 bkg_transp wow fadeInLeft mb-2" data-wow-delay="0" id="divBusqueda">
            <h3 class="popp_m mb-1">Resultados de la búsqueda</h3>
            <p class="popp_m">Se produjo un error, intente nuevamente más tarde o ponganse en contacto con nosotros</p>
            </section>`
            });
        divBusqueda.classList.remove("d-none");
    } else {
        divBusqueda.classList.add("d-none");
    }
})


window.onload = () => {
    // Armo listado de productos
    fetch('../js/productos.json')
        .then((response) => response.json())
        .then((data) => {
            // Armo listado de categorias con productos
            categorias.forEach((elemento) => {
                let lista = armaListado(data, elemento.tipo, elemento.categoria, elemento.div);
                mostrarProductos(lista, elemento.div, elemento.titulo, "listado");
            });
            // Armo botones para productos
            btnSumarC = document.querySelectorAll(".btnsumarcarrito");
            btnSumarC.forEach((element) => {
                element.addEventListener("click", sumoCarrito);
            });
        }).catch(() => {
            listaProductos.innerHTML = `<section class="section1 bkg_transp wow fadeInLeft" data-wow-delay="0">
            <h3 class="popp_m mb-1">No hay productos disponibles</h3>
            <p class="popp_s font_espac1 mb-1">Intente nuevamente más tarde o ponganse en contacto con nosotros</p>
            </section>`;
        });
};