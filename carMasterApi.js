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

let {carData} = require("./carMasters.js");
 
app.get("/cars",function(req,res) {
  let fuelStr = req.query.fuel;
  let typeStr = req.query.type;
  let maxprice = +(req.query.maxprice); 
  let maxqty = +(req.query.maxqty); 
  let arr1 = carData;
  if (fuelStr) {
  let fuelArr = fuelStr.split(",");
  arr1 = arr1.filter((st) => fuelArr.find((c1) => c1 === st.fuel));
}
if (typeStr) {
  arr1 = arr1.filter((st) => typeArr.find((c1) => c1 === st.type));
}
  if (maxprice) {
  arr1 = arr1.filter((product) => product.price >= maxprice);
}

  if (maxqty) {
  arr1 = arr1.filter((product) => product.quantity >= maxqty);
}
  res.send (arr1);
});
