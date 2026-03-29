import { Routes, Route } from 'react-router-dom';
import './styles/App.css'
import Login from './pages/Login'
import Index from './pages/Index'


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/ewars-dashboard" element={<Index />} />
      </Routes>
    </>
  )
}

export default App