const registro=document.querySelector("#registro")
const alert=document.querySelector("#alert")

registro.addEventListener("submit",async(e)=>{
    e.preventDefault()
    const rut=document.querySelector("#rut").value
    const nombre=document.querySelector("#nombre").value
    const apellido=document.querySelector("#apellido").value
    const email=document.querySelector("#email").value
    const contrasena=document.querySelector("#contrasena").value

    let respuesta=await fetch('form/registro',{
        method:"POST",
        headers:{
            'Content-Type': 'application/json'
          },
        body:JSON.stringify({rut,nombre,apellido,email,contrasena})
    })
    let resp=await respuesta.json()
    console.log(resp)
    if (resp.mensaje){
        alert.innerHTML=`
        <div class="alert alert-success" role="alert">
        Usuario agregado con exito
        </div>
        `
    }
    else{
        alert.innerHTML=`
        <div class="alert alert-danger" role="alert">
        Error:${resp.err}
      </div>
        `
    }
})