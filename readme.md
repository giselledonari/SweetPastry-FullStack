# Sweet Pastry Ecommerce

Este es un proyecto de ecommerce que permite a los usuarios comprar pasteles. Los usuarios deben iniciar sesión para poder comprar, y tienen su propio carrito de compras donde pueden agregar y comprar productos. Además, hay una función de administrador que permite agregar, eliminar y modificar productos de la tienda.

## Tecnologías utilizadas

El proyecto utiliza las siguientes tecnologías:

- EJS
- CSS
- Bootstrap
- Node.js
- Express
- JavaScript
- JWT para autenticación
- Cookies
- Multer para subir fotos
- PostgreSQL
- Sequelize
- API REST

## Funcionalidades

La página principal (`index.ejs`) muestra una descripción del negocio.

![Página principal](https://github.com/giselledonari/sweetpastry/blob/main/git/scr1.jpg)

La página de productos (`products.ejs`) muestra todos los productos disponibles en la tienda. Al hacer clic en un producto, se muestra una descripción del producto y botones para agregar o quitar el producto del carrito de compras.

![Producto](https://github.com/giselledonari/sweetpastry/blob/main/git/scr2.jpg)

Los usuarios autenticados pueden acceder a su propio carrito de compras (`carrito.ejs`) donde pueden agregar o eliminar productos y finalizar la compra.

![Carrito](https://github.com/giselledonari/sweetpastry/blob/main/git/scr3.jpg)

La función de administrador permite agregar nuevos productos (`admin/agregar.ejs`), eliminar productos existentes (`admin/eliminar.ejs`) y modificar productos existentes (`admin/modificar.ejs`). El administrador también tiene una página (`admin/home.ejs`) donde puede ver las ventas realizadas.

![Admin](https://github.com/giselledonari/sweetpastry/blob/main/git/scr4.jpg)

Los datos del proyecto se almacenan en una base de datos PostgreSQL, y se utiliza Sequelize como ORM para interactuar con la base de datos. El servidor proporciona una API REST que se comunica con el front-end en EJS, y utiliza los verbos HTTP para crear, leer, actualizar y eliminar recursos.

## Cómo ejecutar el proyecto

Para ejecutar el proyecto, sigue los siguientes pasos:

1. Clona este repositorio a tu máquina local.
2. Instala las dependencias usando el comando `npm install`.
3. Crea un archivo `.env` en la raíz del proyecto y agrega las siguientes variables de entorno:
   - `PORT`: el puerto en el que se ejecutará el servidor
   - `SECRETO`: una clave secreta para JWT
   - `DB`: el link de conexión a la base de datos PostgreSQL
4. Ejecuta el comando `node server.js` para iniciar el servidor.
5. Abre tu navegador y visita `http://localhost:puerto` para ver la página principal.

