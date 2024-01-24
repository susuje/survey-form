import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import View from './pages/View'
import MyData from './pages/MyData'
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/view" element={<View />} />
      <Route path="/mydata" element={<MyData />} />
    </Routes>
  )
}

export default App
