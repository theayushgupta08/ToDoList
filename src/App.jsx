import { useState, useEffect } from 'react'
import Navbar from './components/navbar'
import { v4 as uuidv4 } from 'uuid';  // Creates a unique ID for all the todo


function App() {

  // for single todo
  const [todo, settodo] = useState("")
  // for all todos
  const [todos, settodos] = useState([])
  // for hiding the finished task
  const [showFinished, setshowFinished] = useState(true)

  //for saving to local storage
  const saveToLocal = () => {
    localStorage.setItem("todos", JSON.stringify(todos))  //It will convert todos into string and save in JSON Format on local system
  }

  const toggleFinished = (e) => {
    setshowFinished(!showFinished)
  }


  //To view all todos from local storage
  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if (todoString) {  //Checking if my JSON is not null, if null we will not be getting anything from local Storage
      let todos = JSON.parse(localStorage.getItem("todos")) //It will convert string back to JSON and save in todos
      settodos(todos)
    }

  }, [])


  const handleEdit = (e, id) => {
    let t = todos.filter(item => {
      return item.id === id
    })
    settodo(t[0].todo)
    let newTodos = todos.filter(item => {
      return item.id != id
    });
    settodos(newTodos)
    saveToLocal()
  }

  const handleDelete = (e, id) => {

    let newTodos = todos.filter(item => {
      return item.id != id
    });
    settodos(newTodos)
    saveToLocal()
  }

  const handleAdd = () => {
    settodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    settodo("")
    console.log(todos)
    saveToLocal()
  }


  const handleChange = (e) => {
    settodo(e.target.value)
  }

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => {
      return item.id === id;
    }
    )
    let newTodos = [...todos];  //pass value by this to create a new object always
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    settodos(newTodos)
    saveToLocal()

  }



  return (
    <>
      <Navbar />
      <div className="mx-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-orange-100 bg-opacity-70 min-h-[80vh] md:w-[35%]">
        <h1 className='font-bold text-2xl text-center font-serif'>ZenList - My ToDo App</h1>
        <div className="addtodo my-5 flex justify-center items-center">
          <h3 className='p-2 font-bold font-serif'>Add ToDo: </h3>

          <div className='flex'>
            <input onChange={handleChange} value={todo} type="text" className='w-1/2 rounded-lg border-2 border-black px-3 py-1 ' />
            <button onClick={handleAdd} disabled={todo.length < 3} className='bg-orange-700 hover:bg-orange-900 p-2 py-1 text-white rounded-md mx-6 text-sm font-bold font-serif'>Add</button>
          </div>

        </div>
        <input className='my-3 font-serif' onChange={toggleFinished} type="checkbox" checked={showFinished} /> <label className='mx-2 font-serif' htmlFor="show">Show Finished</label>
        <div className='h-[1px] bg-black opacity-15 w-[90%] mx-auto my-2'></div>
        <h1 className='text-xl font-bold font-serif'>
          Your ToDo's
        </h1>

        <div className="todos">
          {
            todos.length === 0 && <div className='m-5 font-serif'>No Todo's yet!</div>
          }
          {
            todos.map(item => {


              return (showFinished || !item.isCompleted) && <div key={item.id} className="todo flex  my-3  justify-between">
                <div className="flex gap-5 font-serif">
                  <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} />
                  <div className={'${item.isCompleted ? "line-through" : ""}'} >{item.todo}</div>
                </div>
                <div className="buttons flex h-full">
                  <button onClick={(e) => handleEdit(e, item.id)} className='bg-orange-700 hover:bg-orange-900 p-2 py-1 text-white rounded-md mx-1 text-sm font-bold font-serif'>Edit</button>
                  <button onClick={(e) => handleDelete(e, item.id)} className='bg-orange-700 hover:bg-orange-900 p-2 py-1 text-white rounded-md mx-1 text-sm font-bold font-serif'>Delete</button>
                </div>
              </div>
            })
          }
        </div>


      </div>
    </>
  )
}

export default App
