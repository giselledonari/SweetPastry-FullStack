let total = document.getElementById("total");
let carroCompras = document.getElementById("carrito-compras");
traer_carrito(usuario)
//traer el carrito
async function traer_carrito(){
  await fetch(`/carrito/`)
}

//leer botones disminuir carro
const disminuirCarro = document.querySelectorAll(".btn-disminuirCarro");
for (let i = 0; i < disminuirCarro.length; i++) {
  disminuirCarro[i].addEventListener("click", async () => {
    id = disminuirCarro[i].id;
    await disminuir(id);
    await eliminarCeros()
    location.reload();

  });
}

//leer botones aumentar carro
const aumentarCarro = document.querySelectorAll(".btn-aumentarCarro");
for (let i = 0; i < aumentarCarro.length; i++) {
  aumentarCarro[i].addEventListener("click", async () => {
    id = aumentarCarro[i].id;
    await aumentar(id);
    location.reload();
  });
}
//leer eliminar item
const eliminarItem = document.querySelectorAll(".btn-eliminar");

for (let i = 0; i < eliminarItem.length; i++) {
  eliminarItem[i].addEventListener("click", async() => {
    id = parseInt(eliminarItem[i].id);
    await eliminar(id,usuario);
    location.reload();
  });
}

async function eliminar(id,rut){
    await fetch("/eliminarProductoCarrito",{
        method:'DELETE',
        headers:{
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({
          producto_id:parseInt(id),
          usuario_rut:rut
        })
    })

}

async function vaciarCarro(rut){
    await fetch("/vaciarCarrito",{
        method:'DELETE',
        headers:{
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({
          usuario_rut:rut
        })
    })

}

async function eliminarCeros(){
    await fetch("/eliminarStockCero",{method:'DELETE'})

}

async function compra(rut){
  await fetch("/compra",{
      method:'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({
        usuario_rut:rut
      })
  })

}


//leer vaciarCarro

document.querySelector("#boton-vaciarCarro").addEventListener("click",async () => {
  await vaciarCarro(usuario);
  location.reload();
});

//hacer la compra

document.querySelector("#btn-comprar").addEventListener("click",async () => {
  console.log("comprando")
  await compra(usuario)
  document.querySelector("#finalcompra").innerHTML=`<h3 class="mt-3">Gracias por tu Compra!</h3>`
});


