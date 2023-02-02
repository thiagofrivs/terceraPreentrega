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




let productosEnCarrito= JSON.parse(localStorage.getItem("productos-en-carrito"))
const contenedorCarritoVacio=document.querySelector("#carrito-vacio")
const contenedorCarritoProductos=document.querySelector("#carrito-productos")
const contenedorCarritoAcciones=document.querySelector("#carrito-acciones")
const contenedorCarritoComprado=document.querySelector("#carrito-comprado")
const textoTotal=document.querySelector("#total")
const botonVaciar=document.querySelector("#vaciar-carrito")
const botonComprar=document.querySelector("#boton-comprar")
const inicio=document.getElementById("inicio")
const carrito=document.getElementById("carrito")


inicio.classList.remove("active")
carrito.classList.add("active")

console.log(productosEnCarrito)
let total=0

function agregarHTML(){
    if (productosEnCarrito){

        contenedorCarritoVacio.classList.add("disabled")
        contenedorCarritoProductos.classList.remove("disabled")
        contenedorCarritoAcciones.classList.remove("disabled")
        contenedorCarritoComprado.classList.add("disabled")

        contenedorCarritoProductos.innerHTML=""

        productosEnCarrito.forEach(producto => {
            

            const div=document.createElement("div")
            div.classList.add("carrito-producto")
            div.innerHTML = `
                            <img class="carrito-producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
                            <div class="carrito-producto-titulo">
                                <small>Título</small>
                                <h3>${producto.titulo}</h3>
                            </div>
                            <div class="carrito-producto-cantidad">
                                <small>Cantidad</small>
                                <p>${producto.cantidad}</p>
                            </div>
                            <div class="carrito-producto-precio">
                                <small>Precio</small>
                                <p>$${producto.precio}</p>
                            </div>
                            <div class="carrito-producto-subtotal">
                                <small>Subtotal</small>
                                <p>$${producto.precio*producto.cantidad}</p>
                            </div>
                            <button class="carrito-producto-eliminar" id="${producto.id}"><i class="bi bi-trash"></i></button>`
            contenedorCarritoProductos.append(div)


            const botonEliminar=document.querySelector(`#${producto.id}`)

            botonEliminar.addEventListener("click",(e)=>{
                sacarDelCarrito(e.currentTarget.id)
            })
            
        });

        actualizaTotal(total)
        
        
    }
}

agregarHTML()


botonVaciar.addEventListener("click",(e)=>{
    contenedorCarritoProductos.classList.add("disabled")
    contenedorCarritoAcciones.classList.add("disabled")
    contenedorCarritoVacio.classList.remove("disabled")
    localStorage.clear()
})

botonComprar.addEventListener("click",(e)=>{
    contenedorCarritoProductos.classList.add("disabled")
    contenedorCarritoAcciones.classList.add("disabled")
    contenedorCarritoComprado.classList.remove("disabled")
    localStorage.clear()
})

function sacarDelCarrito(idBoton){
    
    if(productosEnCarrito.some(producto=>producto.id===idBoton)){
        const index = productosEnCarrito.findIndex(producto=>producto.id===idBoton)
        
        
        
        if(productosEnCarrito[index].cantidad==1){
                productosEnCarrito.splice(index,1)
                localStorage.clear()
                localStorage.setItem("productos-en-carrito",JSON.stringify(productosEnCarrito))
                console.log(productosEnCarrito)
        }else{
            productosEnCarrito[index].cantidad--;
            console.log(productosEnCarrito)
        }
    }
    
    agregarHTML()
    if (productosEnCarrito.length==0){
        contenedorCarritoProductos.classList.add("disabled")
        contenedorCarritoAcciones.classList.add("disabled")
        contenedorCarritoVacio.classList.remove("disabled")
        localStorage.clear()
    }

    actualizaTotal(total)
};


function actualizaTotal(total){
    productosEnCarrito.forEach(producto =>{
        total=total+producto.cantidad*producto.precio;
        textoTotal.innerText=`$${total}`
    })
}