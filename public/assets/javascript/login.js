const login=document.querySelector("#login")
const alert=document.querySelector("#alert")

login.addEventListener("submit",async(e)=>{
    e.preventDefault()

    const email=document.querySelector("#email").value
    const contrasena=document.querySelector("#contrasena").value

    let respuesta=await fetch('form/login',{
        method:"POST",
        headers:{
            'Content-Type': 'application/json'
          },
        body:JSON.stringify({email,contrasena})
    })

    let resp=await respuesta.json()
    console.log(resp)
    if (resp.mensaje=="admin"){
        window.location.href="/admin/home"
    }
    else if(resp.mensaje=="usuario"){
        window.location.href="/index"
    }
    else{
        alert.innerHTML=`
        <div class="alert alert-danger" role="alert">
        Error:${resp.err}
      </div>
        `
    }
})


