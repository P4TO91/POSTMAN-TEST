// Importamos las librerías necesarias
const express = require('express');
const bodyParser = require('body-parser');

// Creamos la aplicación de Express
const app = express();

// Usamos bodyParser para parsear el cuerpo de las peticiones HTTP
app.use(bodyParser.json());

// Este objeto almacenará los usuarios y sus contraseñas
let usuarios = {};

// Ruta para el registro de usuarios
app.post('/registro', (req, res) => {
    const { usuario, contrasena } = req.body;
    if (usuarios[usuario]) {
        return res.status(400).json({ error: 'El usuario ya existe' });
    }
    usuarios[usuario] = contrasena;
    res.json({ mensaje: 'Usuario registrado con éxito' });
});

// Ruta para el inicio de sesión
app.post('/login', (req, res) => {
    const { usuario, contrasena } = req.body;
    if (!usuarios[usuario] || usuarios[usuario] !== contrasena) {
        return res.status(401).json({ error: 'Error en la autenticación' });
    }
    res.json({ mensaje: 'Autenticación satisfactoria' });
});

// Iniciamos el servidor en el puerto 3000
app.listen(3000, () => console.log('Servidor iniciado en el puerto 3000'));
