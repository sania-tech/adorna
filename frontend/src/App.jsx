import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './componets/Navbar/'

const App = () => {
  return (
    <div classname='px-4 sm:px-[5vw] md:px-[7vw] 1g:px-[9vw]'>
      
      

      
      <Navbar/> 

     
        <Routes>

        <Route path='/' element ={<home/>}/>
        <Route path = '/collection' element = {<collection/>}/>
        <Route path = '/about' element = {<about/>}/>
        <Route path = '/contact' element = {<contact/>}/>
        <Route path = '/product/:productId' element = {<product/>}/>
        <Route path = '/cart' element = {<cart/>}/>
        <Route path = '/login' element = {<login/>}/>
        <Route path = '/place-order' element = {<placeorder/>}/>
        <Route path = '/orders' element = {<orders/>}/>
        </Routes>



      

    </div>
  )
}

export default App
