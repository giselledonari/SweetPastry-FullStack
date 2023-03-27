//como aun no seimplemntan usuarios fijaremos el usuario_rut
const usuario="00-0"
//leer botones mas
const agregar = document.querySelectorAll(".btn-mas");
for (let i = 0; i < agregar.length; i++) {
  agregar[i].addEventListener("click", async() => {
    let id = agregar[i].id;
    await aumentar(id);
    numero_carrito();
    actualizarCantidades();

  });
}

//leer botones menos
const quitar = document.querySelectorAll(".btn-menos");
for (let i = 0; i < quitar.length; i++) {
  quitar[i].addEventListener("click", async() => {
    let id = quitar[i].id;
    await disminuir(id);
    numero_carrito();
    actualizarCantidades();
  });
}
//obtener productos
async function obtener_productos(){
  let fetch_data= await fetch("/api/productos")
  let data =await fetch_data.json()
  return data
}

//obtener carro
async function obtener_carrito(){
  let fetch_data= await fetch("/api/carrito")
  let data =await fetch_data.json()
  return data
}

//funcion para agregar al carro
async function aumentar(id) {
  let carro=await obtener_carrito()
  if (carro.err){
    document.querySelector("#alert").innerHTML=`
      <div class="alert alert-danger" role="alert">
          Oooops! debes iniciar sesion para agregar productos a tu carrito
      </div>
      `
  }
  let productos=await obtener_productos()
  let producto =productos.find((x) => {return x.id == id;})
  

  let producto_carro = carro.find((x) => {return x.producto_id == producto.id;}); 
  console.log(producto_carro)
  //si no esta en el carro el producto
  if (producto_carro === undefined) {
    if (producto.inventario > 0) {
      await fetch("/agregarCarrito",{
        method:'POST',
        headers:{
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({
          cantidad:1,
          producto_id:parseInt(id),
          usuario_rut:usuario
        })
      })
    } else {
      alert(`No quedan ${producto.nombre_producto} en la tienda`);
    }
  } 
  //si si esta en el carro
  else {
    if (producto_carro.cantidad< producto.inventario) {
      let nueva_cantidad=producto_carro.cantidad + 1;
      await fetch("/modificarCarrito",{
        method:'PUT',
        headers:{
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({
          cantidad:nueva_cantidad,
          producto_id:id,
          usuario_rut:usuario
        })
      })
    } else {
      alert(`Solo quedan ${producto.inventario} ${producto.nombre_producto}`);
    }
  }
}

//funcion para quitar del carro (de a 1)
async function disminuir(id) {
  let carro=await obtener_carrito()
  if (carro.err){
    document.querySelector("#alert").innerHTML=`
      <div class="alert alert-danger" role="alert">
          Oooops! debes iniciar sesion para agregar productos a tu carrito
      </div>
      `
  }
  let productos=await obtener_productos()
  let producto = productos.find((x) => {return x.id ==id;})

  let producto_carro = carro.find((x) => {return x.producto_id == producto.id;}); 

  if (producto_carro === undefined || producto_carro.cantidad == 0) {
    // si la cantidad es 0 o no existe en el carro, que no haga nada
    return;
  } else {
    let nueva_cantidad=producto_carro.cantidad - 1;
      await fetch("/modificarCarrito",{
        method:'PUT',
        headers:{
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({
          cantidad:nueva_cantidad,
          producto_id:id,
          usuario_rut:usuario
        })
      })
  }
}


//funcion para acltualizar numero del carrito
async function numero_carrito() {
  let carro=await obtener_carrito()
  let numeroCarro = document.querySelector("#numero-carrito");
  let suma = carro.reduce((suma, value) => {return suma + value.cantidad}, 0)

  numeroCarro.textContent = "(" + suma + ")";
}

//actualiza las cantidades en los cuadritos blancos de los botones
async function actualizarCantidades() {
  let carro=await obtener_carrito()

  for (producto of carro) {
   let id = "cantidad" + producto.producto_id;
   let cantidad = producto.cantidad;

    if (document.getElementById(id)) {
      document.getElementById(id).textContent = cantidad;
    }
  }
}

numero_carrito();
actualizarCantidades();

///leer las paginas

let card = document.querySelectorAll(".cardProductos");
card.forEach((cardProducto) => {
  cardProducto.addEventListener("click", () => {
    let id = cardProducto.id;
    fetch(`/productoid/${id}`).then((resp) =>
      resp.json()
    );

    window.location.href = `/productoid/${id}`;
  });
});
