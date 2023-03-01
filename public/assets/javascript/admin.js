console.log("Hola")

///eliminar producto

if(document.querySelector("#formEliminar")){
    document.querySelector("#formEliminar").addEventListener("submit",async (event)=>{
        event.preventDefault()
        const id=document.querySelector("#idProducto").value
        await fetch(`http://localhost:3000/eliminarProducto/${id}`,{method: 'delete'})
        .catch(err=>console.log(err))
    })
}

//Modificar producto
if(document.querySelector("#formModificar")){
    document.querySelector("#formModificar").addEventListener("submit",()=>{
        const nombre=document.querySelector("#nombre").value
        const description=document.querySelector("#description").value
        const imagen=document.querySelector("#imagen").value
        const id=document.querySelector("#idProducto").value
        const precio=document.querySelector("#precio").value
        const inventario=document.querySelector("#inventario").value
        console.log(id,nombre,precio)
        fetch(`http://localhost:3000/modificarProducto`,{
        method: 'put',
        headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({nombre,description,imagen,id,precio,inventario})
        })
        .catch(err=>console.log(err))
    })
}

