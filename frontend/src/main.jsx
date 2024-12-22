import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import ShopContextProvider from './context/ShopContest.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ShopContextProvider>
      <App />
    </ShopContextProvider>console.log('Rendering App component')
console.log('Initializing ShopContextProvider')
console.log('Setting up BrowserRouter')
  </BrowserRouter>,
)
