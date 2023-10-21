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

let {custData} = require("./customerData.js");

app.get("/customers",function(req,res) {
  let cityStr = req.query.city;
  let gender     = req.query.gender;
  let payment     = req.query.payment;
  let sort     = req.query.sort;
  let arr1 = custData;
  if (cityStr) {
  let cityArr = cityStr.split(",");
  arr1 = arr1.filter((st) => cityArr.find((c1) => c1 === st.city));
}
  if(sort === "name"){
  arr1.sort((st1,st2) => st1.name.localeCompare(st2.name));
  }
  if(sort === "city"){
      arr1.sort((st1,st2) => st1.city.localeCompare(st2.city));
      }
      if(sort === "age"){
        arr1.sort((st1,st2) => st1.age.localeCompare(st2.age));
        }
        if(sort === "gender"){
            arr1.sort((st1,st2) => st1.gender.localeCompare(st2.gender));
            }
            if(sort === "payment"){
              arr1.sort((st1,st2) => st1.payment.localeCompare(st2.payment));
              }
   if (gender) {
      arr1 = arr1.filter((st) => st.gender === gender);
   }
   if (payment) {
    arr1 = arr1.filter((st) => st.payment === payment);
 }
  res.send (arr1);
});


app.get("/customers/:id",function(req,res) {
  let id =  req.params.id;
  let customer = custData.find((st) => st.id === id);
  if(customer) res.send (customer);
  else res.status(404).send("No student found");
});

app.get("/customers/gender/:name",function(req,res) {
  let name = req.params.name;
  const arr1 = custData.filter((st) => st.gender === name);
  res.send (arr1);
});

app.get("/customers/city/:name",function(req,res) {
  let name = req.params.name;
  const arr1 = custData.filter((st) => st.city === name);
  res.send (arr1);
});
 

  app.post("/customers",function(req,res) {
    let body = req.body;
    //console.log(body);
    let maxid = Math.floor(Math.random() * 90 + 10)
    console.log(maxid);
    let newid = "AZY" + maxid ;
    let newCustomer = {id:newid, ...body};
    custData.push(newCustomer);
    res.send(newCustomer);
  });

  app.put("/customers/:id",function(req,res) {
    let id = req.params.id;
    let body = req.body;
    let index = custData.findIndex((st) => st.id === id);
    if(index >= 0){
    let updatedCustomer = { id: id, ...body};
    custData[index] = updatedCustomer
    res.send(updatedCustomer);
  }
  else {
  res.status(404).send("No Customer found");
  }
  }); 
  
  app.delete("/customers/:id",function(req,res) {
    let id =   req.params.id;
    let index = custData.findIndex((st) => st.id === id);
    if(index >= 0){
    let deleteCustomer = custData.splice(index,1);
    res.send(deleteCustomer);
  }
  else {
  res.status(404).send("No Customer found");
  }
  }); 