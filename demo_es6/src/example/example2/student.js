const Person = {
    firstName : "John",
    lastName : "David",
    age: 30,
    gender: "male",
    occupation: "developer",
    nationality: "American",
    city: "New York",
    hobbies: ["reading","traveling","photography"],
    languages: ['Vietnamese','Spanish','English'],
    education: {
        degree: "Bachelor",
        major: "Computer Science",
        university: 'Harvard University'
    }
};

const {
    firstName,
    gender,
    education: {degree},
    languages: [,,english]
} = Person;

const student = {
    firstName,
    gender,
    degree,
    english
}
console.log(student);
export default student;

