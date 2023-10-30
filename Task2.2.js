const fs = require("fs");
const readline = require("readline-sync");

const fileName = "data.json";

function createOrResetData() {
    const data = { A: 0, B: 0 };
    fs.writeFileSync(fileName, JSON.stringify(data));
    console.log("Data has been created/reset to {A: 0, B: 0}.");
}

function readData() {
    try {
        const data = fs.readFileSync(fileName, "utf8");
        const obj = JSON.parse(data);
        console.log("Current Data:", obj);
    } catch (err) {
        console.log("Error reading the data:", err);
    }
}

function incrementA() {
    try {
        const data = fs.readFileSync(fileName, "utf8");
        const obj = JSON.parse(data);
        obj.A = (obj.A || 0) + 1;
        fs.writeFileSync(fileName, JSON.stringify(obj));
        console.log("A incremented.");
    } catch (err) {
        console.log("Error incrementing A:", err);
    }
}

function incrementB() {
    try {
        const data = fs.readFileSync(fileName, "utf8");
        const obj = JSON.parse(data);
        obj.B = (obj.B || 0) + 1;
        fs.writeFileSync(fileName, JSON.stringify(obj));
        console.log("B incremented.");
    } catch (err) {
        console.log("Error incrementing B:", err);
    }
}

const option = readline.question("Enter Option: 1: Create/Reset 2: Read 3: IncrementA 4: IncrementB - ");

switch (option) {
    case "1":
        createOrResetData();
        break;
    case "2":
        readData();
        break;
    case "3":
        incrementA();
        break;
    case "4":
        incrementB();
        break;
    default:
        console.log("Invalid option.");
}
