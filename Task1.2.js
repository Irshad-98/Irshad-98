const fs = require("fs");
const readline = require("readline-sync");

const fileName = "value.json";

function createOrResetValue() {
    const value = 0;
    fs.writeFileSync(fileName, JSON.stringify({ value }));
    console.log("Value has been created/reset to 0.");
}

function readValue() {
    try {
        const data = fs.readFileSync(fileName, "utf8");
        const obj = JSON.parse(data);
        console.log("Current Value:", obj.value);
    } catch (err) {
        console.log("Error reading the value:", err);
    }
}

function incrementValue() {
    try {
        const data = fs.readFileSync(fileName, "utf8");
        const obj = JSON.parse(data);
        obj.value = (obj.value || 0) + 1;
        fs.writeFileSync(fileName, JSON.stringify(obj));
        console.log("Value incremented.");
    } catch (err) {
        console.log("Error incrementing the value:", err);
    }
}

function decrementValue() {
    try {
        const data = fs.readFileSync(fileName, "utf8");
        const obj = JSON.parse(data);
        obj.value = (obj.value || 0) - 1;
        fs.writeFileSync(fileName, JSON.stringify(obj));
        console.log("Value decremented.");
    } catch (err) {
        console.log("Error decrementing the value:", err);
    }
}

const option = readline.question("Enter Option: 1: Create/Reset 2: Read 3: Increment 4: Decrement - ");

switch (option) {
    case "1":
        createOrResetValue();
        break;
    case "2":
        readValue();
        break;
    case "3":
        incrementValue();
        break;
    case "4":
        decrementValue();
        break;
    default:
        console.log("Invalid option.");
}
