let name = "Jack";
let age = 25;
let tech = ["JS","Node","React"];

function knowTech(techs){
    console.log("In function knowTech",techs);
    return tech.find((t1) => t1 === techs) ? true : false;
}

module.exports.data = {name, age, tech };
module.exports.fns = { knowTech };
