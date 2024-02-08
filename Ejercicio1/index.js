const express = require('express')
const app = express();
let animales = require('./animales')
let tablaAnimales = ""

app.use(express.static('public'))


function verAnimales() {
    animales.forEach((animal) => {
        tablaAnimales += `<h2>${animal.nombre}</h2>
        <ul>
        <li>${animal.edad}</li>
        <li>${animal.tipo}</li>
        <form action="/adoptar">
        <input type="text" hidden name="nombre" value="${animal.nombre}" id="nombre">
        <button type="submit">Adoptar</button>
        </form>
        </ul>`
    })
}



app.get('/', function (req, res) {
    verAnimales()
    res.send(tablaAnimales)
})



app.get('/sumar-animal', function (req, res) {
    let { nombre, edad, tipo } = req.query
    let nuevoAnimal = { nombre, edad, tipo }
    edad = parseInt(edad)
    animales.push(nuevoAnimal)
    verAnimales()
    res.send(tablaAnimales)
})



app.get('/adoptar', function (req, res) {
    animales = animales.filter((animal) => animal.nombre != req.query.nombre)
    verAnimales()
    res.send(tablaAnimales)
})


app.listen(process.env.PORT || 3000, (e) => {
    e
        ? console.error("No se ha podido conectar el servidor")
        : console.log("Servidor conectado y a la escucha en el puerto: " + (process.env.PORT || 3000))
})