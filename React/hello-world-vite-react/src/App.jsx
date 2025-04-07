import { useState } from 'react' 
import './App.css'
import Index from './pages/Index'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
    <Layout>
       <Routes> 
          <Route path="/" element={<Index />} />
       </Routes>
    </Layout>
    </BrowserRouter>
  )
}

export default App
