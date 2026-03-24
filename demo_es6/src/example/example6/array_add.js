const newArr = (courses,addedCourses) => {
    let arr = [];
    for (let i = 0; i < courses.length; i++) {
        arr.push(courses[i]);
    }
    for (let i = 0; i < addedCourses.length; i++) {
        arr.push(addedCourses[i]);
    }
    return arr;
}

let courses = [
    {
        id: 1,
        title: 'ReactJS Tutorial',
        rating: 4.2
    },
    {
        id: 2,
        title: 'Angular Tutorial',
        rating: 2.5
    },
    {
        id: 3,
        title: 'VueJS Tutorial',
        rating: 3.8
    },
    {
        id: 4,
        title: 'Java Tutorial',
        rating: 4
    },
    {
        id: 5,
        title: 'JavaScript Tutorial',
        rating: 3.5
    }
];

let addedCourses = [
    {
        id: 6,
        title: "PHP Tutorial",
        rating: 3,
    },
    {
        id: 7,
        title: "C# Tutorial",
        rating: 2,
    },
    {
        id: 8,
        title: "Docker Tutorial",
        rating: 3.8,
    }
];

// const arrayAdd = [...courses,...addedCourses];
const arrayAdd = newArr(courses,addedCourses);
export default arrayAdd;
