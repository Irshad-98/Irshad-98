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

let { mobilesData } = require("./mobileData.js")

app.get("/mobiles/test",function(req,res) {
    res.send ("Test Response");
  });

  app.get("/mobiles", function (req, res) {
    const { ram, rom, color, brand } = req.query;
    let arr1 = mobilesData;
  
    if (ram) {
      arr1 = arr1.filter((mobile) => mobile.RAM.includes(ram));
    }
  
    if (rom) {
      arr1 = arr1.filter((mobile) => mobile.ROM.includes(rom));
    }
  
    if (color) {
      arr1 = arr1.filter((mobile) => mobile.colors.includes(color));
    }
  
    if (brand) {
      arr1 = arr1.filter((mobile) => mobile.brand === brand);
    }
  
    res.send(arr1);
  });
  

  app.get("/mobiles/:name",function(req,res) {
    let name = req.params.name;
    const mobile = mobilesData.filter((pt) => pt.name === name);
    res.send (mobile);
  });

  app.get("/mobiles/brand/:brandName",function(req,res) {
    let brandName = req.params.brandName;
    const mobile = mobilesData.filter((pt) => pt.brand === brandName);
    res.send (mobile);
  });

  app.get("/mobiles/color/:color", function (req, res) {
    let color = req.params.color;
    const mobile = mobilesData.filter((mobile) => mobile.colors.includes(color));
    res.send(mobile);
  });
  
  app.get("/mobiles/RAM/:ramSize",function(req,res) {
    let ramSize = req.params.ramSize;
    const mobile = mobilesData.filter((mobile) => mobile.RAM.includes(ramSize));
    res.send (mobile);
  });

  app.get("/mobiles/ROM/:romSize",function(req,res) {
    let romSize = req.params.romSize;
    const mobile = mobilesData.filter((mobile) => mobile.ROM.includes(romSize));
    res.send (mobile);
  });