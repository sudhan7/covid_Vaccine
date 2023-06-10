import { useState } from 'react'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import {Adminlogin,Userregister,Home,Userlogin,Addcenter,Removecenter,Getdetail,Adminhome,Userhome,Userapply,Usersearch,Userapplication} from './pages'
import Logout from './components/Logout'
function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
    <Router>
      <Logout/>
    <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/userlogin' element={<Userlogin/>}/>
    <Route path='/adminlogin' element={<Adminlogin/>}/>
    <Route path='/useregister' element={<Userregister/>}/>
    <Route path='/Adminaddcenter' element={<Addcenter/>}/>
    <Route path='/Adminremovecenter' element={<Removecenter/>}/>
    <Route path='/Admingetdetail' element={<Getdetail/>}/>
    <Route path='/Adminhome' element={<Adminhome/>}/>
    <Route path='/Userhome' element={<Userhome/>}/>
    <Route path='/Userapply' element={<Userapply/>}/>
    <Route path='/searchcenter' element={<Usersearch/>}/>
    <Route path='/applications' element={<Userapplication/>}/>


    </Routes>
    </Router>
    </div>
  )
}

export default App