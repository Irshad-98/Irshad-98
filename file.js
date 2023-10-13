const persons = [
   { name: "Jack", age: 25 },
   { name: "Bob", age: 29 },
   { name: "Anna", age: 27 },
];
persons.push({ name: "Kathy", age: 30 });
console.log(persons)
let name1 = "Anna";
let person = persons.find(p1 => p1.name === name1)
console.log(person)