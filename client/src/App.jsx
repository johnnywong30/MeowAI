import { useState } from 'react'
import Chat from './components/Chat'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <div className='header'>
        <h1>BeeboBot</h1>
      </div>
      
      <div className="chatBox">
       <Chat/>
      </div>
    </div>
  )
}

export default App
