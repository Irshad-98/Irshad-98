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

let { studentsData } = require("./studentData.js")
let fs = require("fs");
let fname = "students.json";


app.get("/svr/resetData",function(req,res) {
let data = JSON.stringify(studentsData);
fs.writeFile(fname, data, function(err) {
 if (err) res.status(404).send(err);
 else res.send("Data in file is reset");
})
  });


  app.get("/svr/students",function(req,res) {
    fs.readFile(fname, "utf8", function(err,data) {
     if (err) res.status(404).send(err);
     else {
        let studentArray = JSON.parse(data);
        res.send(studentArray);
     }
    })
      });

      app.get("/svr/students/:id",function(req,res) {
        let id = +req.params.id;
        fs.readFile(fname, "utf8", function(err,data) {
         if (err) res.status(404).send(err);
         else {
            let studentArray = JSON.parse(data);
            let student = studentArray.find((st) => st.id === id);
            if(student)
            res.send(student);
            else res.status(404).send("No Student found");
         }
        })
          });

          app.get("/svr/students/course/:name",function(req,res) {
            let name = req.params.name;
            fs.readFile(fname, "utf8", function(err,data) {
             if (err) res.status(404).send(err);
             else {
                let studentArray = JSON.parse(data);
                const arr1 = studentArray.filter((st) => st.course === name);
                res.send (arr1);
             }
            })
              });

              

              app.post("/svr/students",function(req,res) {
                let body = req.body;
                fs.readFile(fname, "utf8", function(err,data) {
                 if (err) res.status(404).send(err);
                 else {
                    let studentArray = JSON.parse(data);
                    let maxid = studentArray.reduce((acc,curr) => (curr.id >= acc ? curr.id : acc),0)
                    let newid = maxid + 1;
                    let newStudent = {id:newid, ...body};
                    studentArray.push(newStudent);
                    let data1 = JSON.stringify(studentArray);
                    fs.writeFile(fname,data1,function(err){
                    if (err) res.status(404).send(err);
                    else res.send(newStudent);
                    })
                 }
                })
                  });
 
                  app.put("/svr/students/:id",function(req,res) {
                    let id = +req.params.id;
                    let body = req.body;
                    fs.readFile(fname, "utf8", function(err,data) {
                     if (err) res.status(404).send(err);
                     else {
                        let studentArray = JSON.parse(data);
                        let index = studentArray.findIndex((st) => st.id === id);
                        if(index >= 0){
                        let updatedStudent = { ...studentArray[index], ...body};
                        studentArray[index] = updatedStudent
                        let data1 = JSON.stringify(studentArray);
                        fs.writeFile(fname,data1,function(err){
                        if (err) res.status(404).send(err);
                        else res.send(updatedStudent);
                        })
                     }
                     else res.status(404).send("No Student Found");
                    }
                    })
                      });
                      app.delete("/svr/students/:id",function(req,res) {
                        let id = +req.params.id;
                        fs.readFile(fname, "utf8", function(err,data) {
                         if (err) res.status(404).send(err);
                         else {
                            let studentArray = JSON.parse(data);
                            let index = studentArray.findIndex((st) => st.id === id);
                            if(index >= 0){
                                let deleteStudent = studentsData.splice(index,1);
                            let data1 = JSON.stringify(studentArray);
                            fs.writeFile(fname,data1,function(err){
                            if (err) res.status(404).send(err);
                            else res.send(deleteStudent);
                            })
                         }
                         else res.status(404).send("No Student Found");
                        }
                        })
                          });



