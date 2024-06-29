const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const config = require("../../../config.json");
const mongoUrl = config.mongoprueba;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
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

const ProductoSchema = new mongoose.Schema(
  {
    fecha: Date,
    no: Number,
    item_No: Number,
    rfid: String,
    codigoBarras: String,
    categoria: String,
    marca: String,
    clasificacion: String,
    foto: String,
    foto2: String,
    nombreOriginal: String,
    nombre: String,
    color: String,
    funcion: String,
    material: String,
    estanqueidad: String,
    bateriaPila: String,
    medidaProducto: String,
    pedido: Number,
    especificacionElectrica: String,
    tipoBateria: String,
    bateria: String,
    costoUnitario: String,
    impuesto: String,
    precio: Number,
    cantidad: Number,
  },
  {
    collection: "producto",
    versionKey: false,
  }
);

const Producto = db.model("producto", ProductoSchema);


const VentaSchema = new mongoose.Schema(
  {
    fecha: Date,
    codigoBarras: String,
    categoria: String,
    nombre: String,
    cantidad: Number,
    NombreCliente: String, 
  },
  {
    collection: "venta",
    versionKey: false,
  }
);

const Venta = db.model("venta", VentaSchema);


app.get("/getCodigoBarras", async (req, res) => {
  try {
    const codigoBarras = req.query.codigoBarras;
    const result = await Producto.findOne({ codigoBarras });
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(400).json("400");
    }
  } catch (error) {
    res.status(500).json("500");
  }
});

app.get("/getAllProducto", async (req, res) => {
  try {
    const productos = await Producto.find();
    res.json(productos);
  } catch (error) {
    console.error("Error al obtener los productos:", error);
    res.status(500).json({ message: "Error al obtener los productos" });
  }
});

app.get("/getOneProducto", async (req, res) => {
  try {
    const { item_No } = req.query;
    const producto = await Producto.findOne({ item_No });
    res.json(producto.codigoBarras);
  } catch (error) {
    console.error("Error al obtener el producto:", error);
    res.status(500).json({ message: "Error al obtener el producto" });
  }
});

app.post("/addProducto", async (req, res) => {
  try {
    const data = req.body;
    const productoExistente = await Producto.findOne({
      codigoBarras: data.barcodeData,
    });
    if (productoExistente) {
      return res
        .status(400)
        .json({ error: "El producto ya existe en la base de datos" });
    }
    const nuevoProducto = new Producto({
      fecha: Date.now(),
      no: data.no || "",
      item_No: data.item_No || "",
      rfid: data.rfid || "",
      codigoBarras: data.barcodeData || "",
      categoria: data.categoria || "",
      marca: data.marca || "",
      clasificacion: data.clasificacion || "",
      foto: data.foto || "",
      foto2: data.foto2 || "",
      nombreOriginal: data.nombreOriginal || "",
      nombre: data.nombre || "",
      color: data.color || "",
      funcion: data.funcion || "",
      material: data.material || "",
      estanqueidad: data.estanqueidad || "",
      bateriaPila: data.bateriaPila || "",
      medidaProducto: data.medidaProducto || "",
      pedido: data.pedido || "",
      especificacionElectrica: data.especificacionElectrica || "",
      tipoBateria: data.tipoBateria || "",
      bateria: data.bateria || "",
      costoUnitario: data.costoUnitario || "",
      impuesto: data.impuesto || "",
      precio: data.precio || "",
      cantidad: 0,
    });

    await nuevoProducto.save();

    res.status(201).json({ message: "Producto agregado exitosamente" });
  } catch (error) {
    console.error("Error al agregar el producto:", error);
    res.status(500).json({ error: "Error al agregar el producto" });
  }
});

app.put("/actulizarCantidad", async (req, res) => {
  const { codigoBarras, cantidad } = req.body;
  try {
    let producto = await Producto.findOne({ codigoBarras });
    if (!producto) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    producto.cantidad += cantidad;

    await producto.save();

    res.status(200).json({ message: "Cantidad actualizada correctamente" });
  } catch (error) {
    console.error("Error al actualizar la cantidad:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

app.put("/descontarCantidad", async (req, res) => {
  const { codigoBarras, cantidad } = req.body;
  try {
    let producto = await Producto.findOne({ codigoBarras });
    if (!producto) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    if (producto.cantidad < cantidad) {
      return res
        .status(400)
        .json({ message: "Cantidad insuficiente en inventario" });
    }
    producto.cantidad -= cantidad;

    await producto.save();

    const nuevaVenta = new Venta({
      fecha: new Date(),
      codigoBarras: producto.codigoBarras,
      categoria: producto.categoria,
      nombre: producto.nombre,
      cantidad: cantidad,
      NombreCliente: "prueba",
    });

    await nuevaVenta.save();

    res.status(200).json({ message: "Cantidad actualizada correctamente" });
  } catch (error) {
    console.error("Error al actualizar la cantidad:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

const PORT = 3140;
app.listen(PORT, () => {
  console.log("Server is running on port ", { PORT });
});
