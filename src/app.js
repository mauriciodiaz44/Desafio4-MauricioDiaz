import express from "express";
import ProductManager from "./ProductManager.js";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const manager = new ProductManager();

app.get("/products", async (req, res) => {
  const { limit } = req.query;
  const products = await manager.getProducts();
  const productsLimit = products.slice(0, limit);

  res.send(limit ? productsLimit : products);
});

app.get("/products/:pid", async (req, res) => {
  const { pid } = req.params;
  const products = await manager.getProducts();
  const productsById = products.find((producto) => producto.id == pid);

  res.send(pid < products.length ? productsById : products);
});

app.listen(8080, () => {
  console.log("escuchando en el puerto 8080!");
});
