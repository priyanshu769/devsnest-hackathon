import { useEffect } from 'react'
import { Routes, Route } from 'react-router'
import { Link } from 'react-router-dom'
import './App.css'
import { useApp } from './Context/AppContext'
import { ProductsPage, Cart, User, Product } from './Pages'

const App = () => {
  const {state, dispatch} = useApp()
  console.log(state)
  useEffect(() => {
    const dataFromLocalStorage = JSON.parse(localStorage.getItem("user"))
    if(dataFromLocalStorage){
      dispatch({type:"SET_USER", payload: dataFromLocalStorage})
    }
  }, [dispatch])

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user))
  }, [state.user])

  return (
    <div className="App">
    <Link to="/">Home</Link>
    <Link to="/cart">Cart</Link>
    <Link to="/user">User</Link>
      <Routes>
        <Route path="/" element={<ProductsPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/user" element={<User />} />
        <Route path="/product/:productId" element={<Product />} />
      </Routes>
    </div>
  )
}

export default App
