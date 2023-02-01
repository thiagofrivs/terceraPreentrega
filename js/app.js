//Productos
const productos=[
    {
        id: "procesador-01",
        titulo:"Procesador 01",
        imagen:"./img/procesador/01.jpg",
        categoria:{
            nombre:"Procesador",
            id:"procesador"
        },
        precio:30000
    },
    {
        id: "teclado-01",
        titulo:"teclado 01",
        imagen:"./img/teclado/01.jpg",
        categoria:{
            nombre:"teclado",
            id:"teclado"
        },
        precio:8000
    },
    {
        id: "mouse-01",
        titulo:"mouse 01",
        imagen:"./img/mouse/01.jpeg",
        categoria:{
            nombre:"mouse",
            id:"mouse"
        },
        precio:5000
    },
    {
        id: "monitor-01",
        titulo:"monitor 01",
        imagen:"./img/monitor/01.jpeg",
        categoria:{
            nombre:"monitor",
            id:"monitor"
        },
        precio:40000
    },
]

const contenedorProductos=document.getElementById("contenedor-productos")
let botonesAgregar= document.querySelectorAll(".producto-agregar")


let productosEnCarrito = []
const productosEnCarritoLS=JSON.parse(localStorage.getItem("productos-en-carrito"))

productosEnCarritoLS  ?  productosEnCarrito=productosEnCarritoLS : productosEnCarrito=[];


function cargarProductos(productosElegidos){
    productosElegidos.forEach(producto => {
        
        const div=document.createElement("div")
        div.innerHTML=`
        <div class="card contenedor-producto" style="width: 18rem;">
            <img src="${producto.imagen}" class="card-img-top" alt="${producto.titulo}">
            <div class="card-body">
                <h5 class="card-title">${producto.titulo}</h5>
                <p class="card-text">$${producto.precio}</p>
                <button id="${producto.id}" class="btn btn-primary producto-agregar">Añadir al carrito</button>
            </div>
        </div>`
        contenedorProductos.append(div)

        actualizaBotonesAgregar()

    });
}

cargarProductos(productos)

function agregarAlCarrito(e){
    const idBoton = e.currentTarget.id
    const productoAgregado = productos.find(producto=>producto.id===idBoton)

    if(productosEnCarrito.some(producto=>producto.id===idBoton)){
        const index = productosEnCarrito.findIndex(producto=>producto.id===idBoton)
        productosEnCarrito[index].cantidad++;
    }else{
        productoAgregado.cantidad=1
        productosEnCarrito.push(productoAgregado)
    }
    console.log(productosEnCarrito)


    localStorage.setItem("productos-en-carrito",JSON.stringify(productosEnCarrito))
}

function actualizaBotonesAgregar(){
    botonesAgregar= document.querySelectorAll(".producto-agregar")

    botonesAgregar.forEach(boton=>{
        boton.addEventListener("click",agregarAlCarrito)
    });
}
