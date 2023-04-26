import { useState } from 'react'
import {NavLink, BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Chat from './components/Chat'
import Code from './components/Code'
import Welcome from './components/Welcome'
import Image from './components/Image'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <div className="App">
          <header>
            <h1 class='header-1'>BeeboBot</h1>
            <br/>
            
          </header>
        <nav>
          <NavLink className='navlink' to='/chat'>
                Chat
          </NavLink>
          <NavLink className='navlink' to='/code'>
              Code
          </NavLink>
          <NavLink className='navlink' to='/image'>
              Image
          </NavLink>
            <br/>
        </nav>        
        <br/>
        <div className="App-body">
          <Routes>
            <Route path='/' element={<Welcome/>}/>
            <Route path='/chat' element={<Chat/>}/>
            <Route path='/code' element={<Code/>}/>
            <Route path='/image' element={<Image/>}/>
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App
