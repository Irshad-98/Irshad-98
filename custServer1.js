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

let { custData } = require("./customerData1.js")
let fs = require("fs");
let fname = "customers.json";


app.get("/resetData",function(req,res) {
let data = JSON.stringify(custData);
fs.writeFile(fname, data, function(err) {
 if (err) res.status(404).send(err);
 else res.send("Data in file is reset");
})
  });


  app.get("/customers",function(req,res) {
    fs.readFile(fname, "utf8", function(err,data) {
     if (err) res.status(404).send(err);
     else {
        let customerArray = JSON.parse(data);
        res.send(customerArray);
     }
    })
      });

      app.get("/customers/:id",function(req,res) {
        let id =  req.params.id;
        fs.readFile(fname, "utf8", function(err,data) {
         if (err) res.status(404).send(err);
         else {
            let customerArray = JSON.parse(data);
            let customer = customerArray.find((st) => st.id === id);
            if(customer)
            res.send(customer);
            else res.status(404).send("No Student found");
         }
        })
          });

          app.post("/customers",function(req,res) {
            let body = req.body;
            fs.readFile(fname, "utf8", function(err,data) {
             if (err) res.status(404).send(err);
             else {
                let customerArray = JSON.parse(data);
                let maxid = Math.floor(Math.random() * 90 + 10)
                let newid = "XYZ" + maxid ;
                console.log("newid:",newid)
                let newCustomer = {id:newid, ...body};
                customerArray.push(newCustomer);
                let data1 = JSON.stringify(customerArray);
                fs.writeFile(fname,data1,function(err){
                if (err) res.status(404).send(err);
                else res.send(newCustomer);
                })
             }
            })
              });

          app.put("/customers/:id",function(req,res) {
            let id = req.params.id;
            let body = req.body;
            fs.readFile(fname, "utf8", function(err,data) {
             if (err) res.status(404).send(err);
             else {
                let customerArray = JSON.parse(data);
                let index = customerArray.findIndex((st) => st.id === id);
                if(index >= 0){
                let updatedCustomer = { ...customerArray[index], ...body};
                customerArray[index] = updatedCustomer
                let data1 = JSON.stringify(customerArray);
                fs.writeFile(fname,data1,function(err){
                if (err) res.status(404).send(err);
                else res.send(updatedCustomer);
                })
             }
             else res.status(404).send("No Student Found");
            }
            })
              });

              
              app.delete("/customers/:id",function(req,res) {
                let id = req.params.id;
                fs.readFile(fname, "utf8", function(err,data) {
                 if (err) res.status(404).send(err);
                 else {
                    let customerArray = JSON.parse(data);
                    let index = customerArray.findIndex((st) => st.id === id);
                    if(index >= 0){
                    let deleteCustomer = custData.splice(index,1);
                    let data1 = JSON.stringify(customerArray);
                    fs.writeFile(fname,data1,function(err){
                    if (err) res.status(404).send(err);
                    else res.send(deleteCustomer);
                    })
                 }
                 else res.status(404).send("No Student Found");
                }
                })
                  });