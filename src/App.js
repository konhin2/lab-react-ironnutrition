import React from 'react';
import {useState} from 'react'
import './App.css';
import 'bulma/css/bulma.css';
import foods from './foods.json';
import FoodBox from './components/index';


function App() {
  const [foodsState, setFoods] = useState(foods);
  const [creating, setCreating] = useState(false)
  const [newFood, setNewFood] = useState({
    name:"",
    calories:0,
    image: "",
    quantity: 0
  })
  const [searchTerm, setSearchTerm] = useState("")
  // GESTION DE ERRORES
  const [error, setError] = useState(null)
  // Funciones
  const handleChange = (event) => {
    console.log(event.target)
    setNewFood({
      ...newFood,
      [event.target.name]: event.target.value,
    })
  }
  const createFood = (event) => {
    event.preventDefault();
    setCreating(true)
  }
  const createFormFood = (event, food) => {
    event.preventDefault();
    // VALIDACIÓN
    var expression = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
    var regex = new RegExp(expression);
    if(!newFood.name.trim() || !newFood.calories.trim() || !newFood.image.trim() || !newFood.quantity.trim()){
      setError("All fields required")
      return
    } else if(newFood.image.match(regex) === null){
      setError("Image must be a valid URL")
      return
    }
    setCreating(false)
    setFoods ([
      ...foodsState,
      newFood
    ])
    setNewFood({
      name:"",
      calories:0,
      image: "",
      quantity: 0
    })
    setError(null)
  }
  // Condiciones
  if (creating){
    return (
      <div>
        <form onSubmit={(e)=>{createFormFood(e)}}>
          <h3>Name</h3>
          <input 
            name="name"
            value={newFood.name}
            onChange={(e) => {handleChange(e) }}
          />
          <h3>Calories</h3>
          <input 
            name="calories"
            type="number"
            value={newFood.calories}
            onChange={(e) => {handleChange(e) }}
          />
          <h3>Quantiry</h3>
          <input 
            name="quantity"
            type="number"
            value={newFood.quantity}
            onChange={(e) => {handleChange(e) }}
          />
          <h3>Image</h3>
          <input 
            name="image"
            value={newFood.image}
            onChange={(e) => {handleChange(e) }}
          />
          <button>Add</button>
        </form>
        {error ? error : null}
      </div>
    )
  }
  return (
    <div className='container'>
      <button onClick={(e)=>{createFood(e)}}>Add Food</button>
      <input type="text" placeholder="Search" className="search" onChange={event => { setSearchTerm(event.target.value)}}/>
      {
        foodsState.filter((val) => {
          if(searchTerm == ''){
            return val
          } else if(val.name.toLowerCase().includes(searchTerm.toLowerCase())){
            return val
          }
        }).map((food) => {
          return (
            <FoodBox 
              name={food.name}
              calories={food.calories}
              image={food.image}
              quantity={food.quantity}
            />
          )
        })
      }
    </div>
  );
}

export default App;