//creo el servidor como las clases anteriores

const { log } = require('console');
const express = require('express');
const path = require('path')
const Contenedor = require("./managers/contenedorProductos")

const productsService = new Contenedor("productos.txt")

const app = express()
const viewsFolder = path.join(__dirname, "views")

console.log(viewsFolder);
const PORT = 5050
app.listen(PORT, () => console.log(`server listening en el puerto ${PORT}`))

app.use(express.static(__dirname + "/public"))

//middelware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//inicializamos nuestro servidor de plantills


//donde tengo las vista en mi proyecto
app.set("views", viewsFolder)

//que motor de plantillas voy a utilizar
app.set("view engine", "ejs")


//rutas de las vistas

app.get("/", (req, res) => {
  res.render("home")
})

app.get("/contacto", (req, res) => {
  res.render("contacto")
})

let usuarios = [
  { name: "Lara", edad: 27 },
  { name: "Leo", edad: 31 },
]
app.get("/usuarios", (req, res) => {
  res.render("usuarios", {
    people: usuarios
  })
})
app.post("/products", async (req, res) => {
  const newProduct = req.body
  console.log(req.body);
  await productsService.save(newProduct)
  res.redirect("/")

})

app.get("/productos", async (req, res) => {
  const productos = await productsService.getAll()
  // console.log(productos);
  res.render("productos", {
    productos: productos
  })

})

