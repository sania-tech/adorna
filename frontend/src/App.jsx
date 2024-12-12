import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Navbar from './componets/navbar'

const App = () => {
  return (
    <div classname='px-4 sm:px-[5vw] md:px-[7vw] 1g:px-[9vw]'>
      <navbar/> 

      <Router>
        <Route path='/' element ={<home/>}/>
        <Router path = '/collection' element = {<collection/>}/>
        <Router path = '/about' element = {<about/>}/>
        <Router path = '/contact' element = {<contact/>}/>
        <Router path = '/product/:productId' element = {<product/>}/>
        <Router path = '/cart' element = {<cart/>}/>
        <Router path = '/login' element = {<login/>}/>
        <Router path = '/place-order' element = {<placeorder/>}/>
        <Router path = '/orders' element = {<orders/>}/>



      </Router>

    </div>
  )
}

export default App
