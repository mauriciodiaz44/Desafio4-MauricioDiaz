import fs from "fs/promises";

export default class ProductManager {
  constructor() {
    this.path = "./products.json";
  }

  getProducts = async () => {
    try {
      const data = await fs.readFile(this.path, "utf-8");
      const products = JSON.parse(data);
      return products;
    } catch (e) {
      await fs.writeFile(this.path, JSON.stringify([]));
      return [];
    }
  };

  addProduct = async (title, description, price, thumbnail, code, stock) => {
    try {
      const file = await fs.readFile(this.path, "utf-8");
      const products = JSON.parse(file);

      const product = {
        id: products.length == 0 ? 1 : products[products.length - 1].id + 1,
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
      };

      products.forEach((i) => {
        if (i.code === code) {
          return console.log("El campo code coincide con otro producto.");
        }
      });

      if (
        title === "" ||
        description === "" ||
        price === "" ||
        thumbnail === "" ||
        stock === ""
      ) {
        return console.log("Por favor, completa todos los campos.");
      } else {
        products.push(product);
        await fs.writeFile(this.path, JSON.stringify(products));
        return product;
      }
    } catch (e) {
      console.log(e);
    }
  };

  getProductById = async (id) => {
    const file = await fs.readFile(this.path, "utf-8");
    const products = JSON.parse(file);
    const productoById = products.find((producto) => producto.id == id);

    if (!productoById) {
      return console.log("Not found");
    } else {
      return productoById;
    }
  };

  updateProduct = async (
    id,
    title,
    description,
    price,
    thumbnail,
    code,
    stock
  ) => {
    const file = await fs.readFile(this.path, "utf-8");
    let products = JSON.parse(file);

    const productoById = products.find((producto) => producto.id === id);
    let productRemoveById = products.filter((producto) => producto.id !== id);

    const product = {
      id: id,
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    };

    if (!productoById) {
      return console.log("Not found");
    } else {
      products = productRemoveById;
      products.push(product);
      await fs.writeFile(this.path, JSON.stringify(products));
      return product;
    }
  };

  deleteProduct = async (id) => {
    const file = await fs.readFile(this.path, "utf-8");
    const products = JSON.parse(file);

    const productoById = products.find((producto) => producto.id === id);
    const productRemoveById = products.filter((producto) => producto.id !== id);

    if (!productoById) {
      return console.log("Not found.");
    } else {
      await fs.writeFile(this.path, JSON.stringify(productRemoveById));
      return productRemoveById;
    }
  };
}
