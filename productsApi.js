var express = require("express");
var app = express();
app.use(express.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
    res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE, HEAD"
  );
  next();
});
const port = 2410;
app.listen(port, () => console.log(`Node app listening on port ${port}`));

let { productsData } = require("./productData.js")

app.get("/products/test",function(req,res) {
    res.send ("Test Response");
  });
  app.get("/products",function(req,res) {
    let categoryStr = req.query.category;
    let maxprice = +(req.query.maxprice); 
    let maxqty = +(req.query.maxqty); 
    let minqty = +(req.query.minqty);
    let arr1 = productsData;
    if (categoryStr) {
    let categoryArr = categoryStr.split(",");
    arr1 = arr1.filter((st) => categoryArr.find((c1) => c1 === st.category));
}
    if (maxprice) {
    arr1 = arr1.filter((product) => product.price >= maxprice);
  }

    if (maxqty) {
    arr1 = arr1.filter((product) => product.quantity >= maxqty);
  }

   if (minqty) {
    arr1 = arr1.filter((product) => product.quantity <= minqty);
  }
    res.send (arr1);
  });

  app.get("/products/:prodname",function(req,res) {
    let prodname = req.params.prodname;
    const product = productsData.filter((pt) => pt.prod === prodname);
    res.send (product);
  });

  app.get("/products/category/:catname",function(req,res) {
    let catname = req.params.catname;
    const product = productsData.filter((st) => st.category === catname);
    res.send (product);
  });

  app.get("/products/order/:field", function (req, res) {
    let field = req.params.field;
    let product;
  
    if (field === "price") {
      product = productsData.sort((a, b) => a.price - b.price);
    } else if (field === "quantity") {
      product = productsData.sort((a, b) => a.quantity - b.quantity);
    } else if (field === "value") {
      product = productsData.sort((a, b) => a.price * a.quantity - b.price * b.quantity);
    } 
    res.send(product);
  });
  
  app.post("/products", function (req, res) {
    let body = req.body;
    console.log(body);
    let newProduct = { ...body };
    productsData.push(newProduct);
    res.send(newProduct);
  });

  app.put("/products/:prodname", function (req, res) {
    let prodname = req.params.prodname;
    let body = req.body;
    let index = productsData.findIndex((pt) => pt.prod === prodname);
    if (index >= 0) {
      let updatedProduct = { prod: prodname, ...body };
      productsData[index] = updatedProduct;
      res.send(updatedProduct);
    } else {
      res.status(404).send("Product not found");
    }
  });
  
  app.delete("/products/:prodname", function (req, res) {
    let prodname = req.params.prodname;
    let index = productsData.findIndex((pt) => pt.prod === prodname);
  
    if (index >= 0) {
      let deletedProduct = productsData.splice(index, 1);
      res.send(deletedProduct);
    } else {
      res.status(404).send("Product not found");
    }
  });