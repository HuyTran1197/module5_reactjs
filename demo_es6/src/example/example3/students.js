// function getInfo(student){
//     return ({
//         firstName: student.firstName || "Quân",
//         degree: student.degree || "NA"
//     })
// }

const getInfo = ({firstName = "Quân", degree = "NA"}) => ({firstName,degree})

const student1 = {
    firstName: "John",
    gender: "male",
    degree: 'Bachelor',
    english: 'English'
}
const student2 = {
    name: "John",
    gender: "male",
    degree: 'Bachelor',
    english: 'English'
}
const result = getInfo(student2);
export default result;