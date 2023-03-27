///eliminar producto

if(document.querySelector("#formEliminar")){
    document.querySelector("#formEliminar").addEventListener("submit",async ()=>{
        const id=document.querySelector("#idProducto").value
        await fetch(`/eliminarProducto/`,{
            method: 'delete',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({id})})
            
        .catch(err=>console.log(err))
    })
}

//Modificar producto
if(document.querySelector("#formModificar")){
    document.querySelector("#formModificar").addEventListener("submit",async ()=>{
        const nombre=document.querySelector("#nombre").value
        const description=document.querySelector("#description").value
        const imagen=document.querySelector("#imagen").value
        const id=document.querySelector("#idProducto").value
        const precio=document.querySelector("#precio").value
        const inventario=document.querySelector("#inventario").value
        console.log(id,nombre,precio)
        await fetch(`/modificarProducto`,{
        method: 'put',
        headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({nombre,description,imagen,id,precio,inventario})
        })
        .catch(err=>console.log(err))
    })
}

