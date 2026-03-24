import "bootstrap/dist/css/bootstrap.min.css"
import './App.css'
import C from "./example/example1/prime_numbers.js";
import student from "./example/example2/student.js";
import result from "./example/example3/students.js";
import list from "./example/example4/blogs.js";
import others from "./example/example5/others.js";
import arrayAdd from "./example/example6/array_add.js";

function App() {

    return (
        <>
            <div>
                <h1>Example 1: Prime numbers in array is:</h1>
                <p>{C.map((e,i)=>(
                    <span key={i}>{e+', '} </span>
                ))}</p>
            </div>
            <hr/>
            <div>
                <h1>Example 2: Student:</h1>
                <pre>{JSON.stringify(student,null,2)}</pre>
            </div>
            <hr/>
            <div>
                <h1>Example 3: Others student</h1>
                <pre>{JSON.stringify(result,null,2)}</pre>
            </div>
            <hr/>
            <div>
                <h1>Example 4: Rating blog list higher or equal 4:</h1>
                <pre>{JSON.stringify(list,null,2)}</pre>
            </div>
            <hr/>
            <div>
                <h1>Example 5: Rating blog list less than 4:</h1>
                <div>{others.map((e,i)=>(
                    <p key={i}>
                        {'<'+e.id+'>'+'-'
                            +'<'+e.title+'>'+'-'
                            +'<'+e.rating+'>'}
                    </p>
                ))}</div>
            </div>
            <hr/>
            <div>
                <h1>Example 6: Array after added:</h1>
                <pre>{JSON.stringify(arrayAdd,null,2)}</pre>
            </div>
        </>
    )
}

export default App
