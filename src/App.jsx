import { useEffect, useState } from 'react'
import './App.css'
import Navbar from './components/navbar'
import { v4 as uuidv4 } from 'uuid';
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const[showFinished,setshowfinished]=useState(true)

useEffect(()=>{

  let todoStrig=localStorage.getItem("todos")
  if(todoStrig)
  {
    let todos=JSON.parse(localStorage.getItem("todos"))
    setTodos(todos)
  }
},[])
const savToLS=()=>{
  localStorage.setItem("todos",JSON.stringify(todos))
}

  const handalAdd=()=>{
    setTodos([...todos,{id:uuidv4(),todo,isCompleted:false}])
    setTodo("")
    savToLS()
  }

  const handleEdit=(e,id)=>{
    let t = todos.filter(i=>i.id === id) 
    setTodo(t[0].todo)
    let newTods=todos.filter(item=>{
      return item.id !==id
    })
    setTodos(newTods)
    savToLS()
  }

  const handalDelete=(e,id)=>{
   // let id=e.target.name;
      let newTods=todos.filter(item=>{
        return item.id !==id
      })
      setTodos(newTods)
      savToLS()
  }

  const handaChange=(e)=>{
    setTodo(e.target.value)
  }
  const handalCheckbox=(e)=>{

       let id=e.target.name;
       //console.log(id)
       let index=todos.findIndex(item=>{
        return item.id==id;
       })
       let newTodos=[...todos];
       newTodos[index].isCompleted=!newTodos[index].isCompleted;
       setTodos(newTodos)
       savToLS()
  }
   
   const togalFinish=(e)=>{
     setshowfinished(!showFinished)
     
   }
  return (
    <>
      <Navbar/>

      <div className=" mx-3 md:container Md:mx-auto mx-auto my-5 rounded-xl bg-violet-100 p-5 min-h-[70vh] md:w-1/2  ">
         <h1 className='text-center font-bold text-lx'>iTask- Manage Your todos at one place</h1>
        <div className="addTodo my-5 flex flex-col gap-5 ">
          <h2 className='text-xl font-bold my-5'>Add a Todo</h2>
          <input onChange={handaChange} type="text " value={todo} className='w-full bg-white-500 border-1 border-solid rounded-lg py-1 px-5' />
          <button onClick={handalAdd} disabled={todo.length<=3} className= '  w-f bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md  disabled:bg-violet-400 '>Save</button>
          </div>
          <div className="flex items-center gap-2">
  <input type="checkbox"className="w-4 h-4 m-4 "checked={showFinished} onChange={togalFinish} />
  <label>Show Finished</label>
</div>
        
        <h2 className='text-lg font-bold my-3'>Your Todos</h2>
        <div className="todos">
          {todos.length===0 && <div>No todos to display</div>}  
          {todos.map(item=>{

          return(showFinished || !item.isCompleted) &&<div key={item.id} className="todo  m-3 flex justify-between">
           <div className="flex gap-5">
           <input type="checkbox" onChange={handalCheckbox} checked={item.isCompleted} name={item.id} id='' />
           <div className={item.isCompleted?"line-through":""}>{item.todo}</div>
           </div>
            <div className="buttons flex h-full">
              <button onClick={(e)=>handleEdit(e, item.id)} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1 '><FaEdit /></button>
              <button onClick={(e)=>{handalDelete(e,item.id)}} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1'><MdDelete /></button>
            </div>
          </div>
          })}
        </div>
      </div>
    </>
  )
}

export default App
