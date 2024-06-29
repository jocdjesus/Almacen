const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('../../../config.json');
const mongoUrl = config.mongoprueba;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(mongoUrl)
  .then(() => {
    console.log("Connected to database");
  })
  .catch((e) => console.log(e));

const db = mongoose.connection.useDb("Ecommerce");
db.on(
  "error",
  console.error.bind(console, "Error al conectar a la base de datos:")
);
db.once("open", () => {
  console.log("Conexión exitosa a la base de datos.");
});

const UsuarioSchema = new mongoose.Schema(
  {
    picture: String,
    usuario: String,
    nombre: String,
    apellidop: String,
    apellidom: String,
    password: String,
    email: String,
    fechaNacimiento: String,
    genero: String,
    departamento: String,
    status: String,
    contacto: String,
    calle: String,
    numeroI: String,
    numeroE: String,
    ciudad: String,
    estado: String,
    cp: String,
    rango: String,
  },
  {
    collection: 'usuario',
    versionKey: false,
  }
);

const Usuario = db.model('usuario', UsuarioSchema);

app.get('/getAllUsuario', async (req, res) => {
  try {
    const activeUsuarios = await Usuario.find({})
      .sort({ fechaContratacion: -1 })
      .limit(30);
    res.send({ status: 'ok', data: activeUsuarios });
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: 'error', message: 'Internal server error' });
  }
});

app.get('/getUsuario', async (req, res) => {
  try {
    const { email } = req.query;
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res
        .status(404)
        .send([{ status: 'not found', message: 'Usuario no encontrado' }]);
    }
    res.send([usuario]);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send([{ status: 'error', message: 'Internal server error' }]);
  }
});

app.post('/addUsuario', async (req, res) => {
  try {
    const data = req.body;
    const hashedPassword = await bcrypt.hash(data.password, 12);
    const nuevoUsuario = new Usuario({
      picture: data.picture || '/images/imagenes/user.png',
      usuario: data.usuario,
      nombre: data.nombre,
      apellidop: data.apellidop,
      apellidom: data.apellidom,
      password: hashedPassword,
      email: data.email,
      fechaNacimiento: data.fechaNacimiento,
      genero: data.genero,
      departamento: data.departamento,
      status: data.status,
      contacto: data.contacto,
      calle: data.calle,
      numeroI: data.numeroI,
      numeroE: data.numeroE,
      ciudad: data.ciudad,
      estado: data.estado,
      cp: data.cp,
      rango: 'Usuario',
    });

    await nuevoUsuario.save();

    res.status(200).json({ message: 'Datos guardados con éxito' });
  } catch (error) {
    console.error('Error al guardar los datos:', error);
    res.status(500).json({ message: 'Error al guardar los datos' });
  }
});

app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Usuario.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Credenciales incorrectas' });
    }
    const passwordsMatch = await bcrypt.compare(password, user.password);
    if (passwordsMatch) {
      res.status(200).json({
        message: 'Inicio de sesión exitoso',
      });
    } else {
      res.status(401).json({ message: 'Credenciales incorrectas' });
    }
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).json({ message: 'Error al iniciar sesión' });
  }
});

const PORT = 3120;
app.listen(PORT, () => {
  console.log('Server is running on port ', { PORT });
});
