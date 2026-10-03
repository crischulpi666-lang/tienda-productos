import './style.css';

// ======================================
// ELEMENTOS DEL HTML
// ======================================

const buscador = document.getElementById("buscador");

const cantidadResultadosHTML =
    document.getElementById("cantidadResultados");

const contenedorProductos =
    document.getElementById("contenedorProductos");

const contadorCarritoHTML =
    document.getElementById("contadorCarrito");

const contadorCarritoMovilHTML =
    document.getElementById("contadorCarritoMovil");

const panelCarrito =
    document.getElementById("panelCarrito");

const productosCarritoHTML =
    document.getElementById("productosCarrito");

const totalCarritoHTML =
    document.getElementById("totalCarrito");

const overlayCarrito =
    document.getElementById("overlayCarrito");

const btnCarrito =
    document.getElementById("btnCarrito");

const btnCarritoMovil =
    document.getElementById("btnCarritoMovil");

const cerrarCarrito =
    document.getElementById("cerrarCarrito");

const btnComprar =
    document.getElementById("btnComprar");

const btnMenu =
    document.getElementById("btnMenu");

const menuMovil =
    document.getElementById("menuMovil");


// ======================================
// PRODUCTOS
// ======================================

const productos = [
    {
        nombre: "Laptop Lenovo",
        categoria: "Tecnología",
        precio: 650
    },
    {
        nombre: "Mouse inalámbrico",
        categoria: "Tecnología",
        precio: 25
    },
    {
        nombre: "Teclado mecánico",
        categoria: "Tecnología",
        precio: 55
    },
    {
        nombre: "Lámpara LED",
        categoria: "Hogar",
        precio: 30
    },
    {
        nombre: "Cafetera eléctrica",
        categoria: "Hogar",
        precio: 45
    },
    {
        nombre: "Audífonos Bluetooth",
        categoria: "Accesorios",
        precio: 40
    },
    {
        nombre: "Mochila urbana",
        categoria: "Accesorios",
        precio: 35
    },
    {
        nombre: "Smartwatch",
        categoria: "Accesorios",
        precio: 75
    }
];


// ======================================
// CARRITO
// ======================================

const carrito = [];


// ======================================
// AGREGAR AL CARRITO
// ======================================

const agregarCarrito = (producto) => {

    carrito.push(producto);

    actualizarCarrito();

};


// ======================================
// CALCULAR TOTAL
// ======================================

const calcularTotal = () => {

    let total = 0;

    carrito.forEach((producto) => {

        total = total + producto.precio;

    });

    return total;

};


// ======================================
// CANTIDAD DEL CARRITO
// ======================================

const cantidadCarrito = () => {

    return carrito.length;

};


// ======================================
// MOSTRAR PRODUCTOS
// ======================================

const mostrarProductos = (listaProductos) => {

    contenedorProductos.innerHTML = "";

    listaProductos.forEach((producto) => {

        const indice = productos.indexOf(producto);

        contenedorProductos.innerHTML += `
            <div class="bg-white rounded-xl shadow p-5 hover:shadow-lg transition">

                <div class="text-4xl mb-4">
                    🛍️
                </div>

                <h3 class="text-xl font-bold">
                    ${producto.nombre}
                </h3>

                <p class="text-gray-500 mt-2">
                    ${producto.categoria}
                </p>

                <p class="text-2xl font-bold text-blue-600 mt-4">
                    $${producto.precio}
                </p>

                <button
                    class="btn-agregar bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg mt-4 w-full"
                    data-indice="${indice}"
                >
                    Agregar al carrito
                </button>

            </div>
        `;

    });


    // ==================================
    // BOTONES AGREGAR AL CARRITO
    // ==================================

    const botonesAgregar =
        document.querySelectorAll(".btn-agregar");

    botonesAgregar.forEach((boton) => {

        boton.addEventListener("click", () => {

            const indice = boton.dataset.indice;

            agregarCarrito(productos[indice]);

        });

    });

};


// ======================================
// BUSCAR PRODUCTOS
// ======================================

const buscarProductos = () => {

    const texto = buscador.value.toLowerCase();

    const resultados = productos.filter((producto) => {

        return producto.nombre
            .toLowerCase()
            .includes(texto);

    });

    mostrarProductos(resultados);

    cantidadResultadosHTML.textContent =
        resultados.length + " productos encontrados";

};


// ======================================
// FILTRAR POR CATEGORÍA
// ======================================

const filtrarCategoria = (categoria) => {

    if (categoria === "Todos") {

        mostrarProductos(productos);

        cantidadResultadosHTML.textContent =
            productos.length + " productos encontrados";

        return;

    }


    const resultados = productos.filter((producto) => {

        return producto.categoria === categoria;

    });


    mostrarProductos(resultados);

    cantidadResultadosHTML.textContent =
        resultados.length + " productos encontrados";

};


// ======================================
// ACTUALIZAR CARRITO
// ======================================

const actualizarCarrito = () => {

    contadorCarritoHTML.textContent =
        cantidadCarrito();

    contadorCarritoMovilHTML.textContent =
        cantidadCarrito();


    productosCarritoHTML.innerHTML = "";


    carrito.forEach((producto, indice) => {

        productosCarritoHTML.innerHTML += `
            <div class="border-b pb-4 mb-4">

                <div class="flex justify-between items-start">

                    <div>

                        <h3 class="font-bold">
                            ${producto.nombre}
                        </h3>

                        <p class="text-gray-500 text-sm">
                            ${producto.categoria}
                        </p>

                        <p class="text-blue-600 font-bold mt-2">
                            $${producto.precio}
                        </p>

                    </div>

                    <button
                        class="btn-eliminar text-red-500 hover:text-red-700 font-bold"
                        data-indice="${indice}"
                    >
                        ✕
                    </button>

                </div>

            </div>
        `;

    });


    totalCarritoHTML.textContent =
        "$" + calcularTotal().toFixed(2);


    // ==================================
    // BOTONES ELIMINAR
    // ==================================

    const botonesEliminar =
        document.querySelectorAll(".btn-eliminar");

    botonesEliminar.forEach((boton) => {

        boton.addEventListener("click", () => {

            const indice = boton.dataset.indice;

            carrito.splice(indice, 1);

            actualizarCarrito();

        });

    });

};


// ======================================
// ABRIR CARRITO
// ======================================

const abrirCarrito = () => {

    panelCarrito.classList.remove("translate-x-full");

    overlayCarrito.classList.remove("hidden");

};


// ======================================
// CERRAR CARRITO
// ======================================

const cerrarPanelCarrito = () => {

    panelCarrito.classList.add("translate-x-full");

    overlayCarrito.classList.add("hidden");

};


// ======================================
// BOTÓN CARRITO
// ======================================

btnCarrito.addEventListener("click", () => {

    abrirCarrito();

});


// ======================================
// BOTÓN CARRITO MÓVIL
// ======================================

btnCarritoMovil.addEventListener("click", () => {

    abrirCarrito();

    menuMovil.classList.add("hidden");

});


// ======================================
// CERRAR CARRITO
// ======================================

cerrarCarrito.addEventListener("click", () => {

    cerrarPanelCarrito();

});


overlayCarrito.addEventListener("click", () => {

    cerrarPanelCarrito();

});


// ======================================
// BUSCADOR
// ======================================

buscador.addEventListener("input", () => {

    buscarProductos();

});


// ======================================
// BOTONES DE CATEGORÍAS
// ======================================

const botonesCategoria =
    document.querySelectorAll(".categoria");

botonesCategoria.forEach((boton) => {

    boton.addEventListener("click", () => {

        const categoria =
            boton.dataset.categoria;

        buscador.value = "";

        filtrarCategoria(categoria);

    });

});


// ======================================
// MENÚ MÓVIL
// ======================================

btnMenu.addEventListener("click", () => {

    menuMovil.classList.toggle("hidden");

});


// ======================================
// FINALIZAR COMPRA
// ======================================

btnComprar.addEventListener("click", () => {

    if (carrito.length === 0) {

        alert("El carrito está vacío.");

        return;

    }


    alert(
        "Compra realizada correctamente.\nTotal: $" +
        calcularTotal().toFixed(2)
    );


    carrito.length = 0;

    actualizarCarrito();

    cerrarPanelCarrito();

});


// ======================================
// MOSTRAR PRODUCTOS AL INICIAR
// ======================================

mostrarProductos(productos);

cantidadResultadosHTML.textContent =
    productos.length + " productos encontrados";


// ======================================
// ACTUALIZAR CARRITO AL INICIAR
// ======================================

actualizarCarrito();