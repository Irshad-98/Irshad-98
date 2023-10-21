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

let { carMaster,cars } = require("./carMasters.js"); 

app.get("/cars", function (req, res) {
  let fuelStr = req.query.fuel;
  let typeStr = req.query.type;
  let maxprice = +(req.query.maxprice);
  let minprice = +(req.query.minprice);
  let sort     = req.query.sort;
  let arr1 = cars.slice(); 
  if (sort) {
    arr1.sort((st1, st2) => st1[sort] - st2[sort]);
  }


  if (fuelStr) {
    arr1 = arr1.filter((car) => {
    let fuelMatch = carMaster.find((ct) => ct.model == car.model && ct.fuel == fuelStr )
    return fuelMatch;
    }); 
  }

  if (typeStr) {
    arr1 = arr1.filter((car) => {
    let typeMatch = carMaster.find((ct) => ct.model == car.model && ct.type == typeStr )
    return typeMatch;
    }); 
  }
  

  if (maxprice && !minprice){
    arr1 = cars.filter((car) => car.price  <= maxprice); 
  }

  else if (minprice && !maxprice) {
    arr1 = cars.filter((car) => car.price  >= minprice); 
  }
  else if (minprice && maxprice) {
    arr1 = cars.filter((car) => car.price  <= maxprice && car.price  >= minprice); 
  }
  res.send(arr1); // Send the filtered car data
});

app.get("/cars/:id",function(req,res) {
  let id =  req.params.id;
  let car = cars.find((ca) => ca.id === id);
  if(car) res.send (car);
  else res.status(404).send("No car found");
});

app.post("/cars",function(req,res) {
  let body = req.body;
  console.log(body);
  // let maxid = cars.reduce((acc,curr) => (curr.id >= acc ? curr.id : acc),0)
  // let newid = maxid + "AZY" +1;
  let newCar = { ...body};
  cars.push(newCar);
  res.send(newCar);
});


app.put("/cars/:id",function(req,res) {
  let id = req.params.id;
  let body = req.body;
  let index = cars.findIndex((ca) => ca.id === id);
  if(index >= 0){
  let updatedCar = { id: id, ...body};
  cars[index] = updatedCar
  res.send(updatedCar);
}
else {
res.status(404).send("No car found");
}
}); 

app.delete("/cars/:id",function(req,res) {
  let id =   req.params.id;
  let index = cars.findIndex((ca) => ca.id === id);
  if(index >= 0){
  let deleteCar = cars.splice(index,1);
  res.send(deleteCar);
}
else {
res.status(404).send("No Car found");
}
}); 

app.get("/carmaster", function (req, res) {
  res.send(carMaster);
});