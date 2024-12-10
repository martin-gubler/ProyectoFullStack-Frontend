
import Conversacion from './Components/Conversacion'
import { Route, Routes } from 'react-router-dom'
import ListaContactos from './Components/ListaContactos'
import VerifyEmail from './Components/VerifyEmail/VerifyEmail'
import Register from './Components/Register/Register'
import Login from './Components/Login/Login'
import ForgotPassword from './Components/ForgotPassword/ForgotPassword'
import ResetPassword from './Components/ResetPassword/ResetPassword'
import ProtectedRoute from './Components/ProtectedRoutes/ProtectedRoute'
import UnauthenticatedUser from './Components/ProtectedRoutes/UnauthenticatedUser'


function App() {

  return (
    <Routes>

      <Route path='/register' element={<Register/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/forgot-password' element={<ForgotPassword/>}/>
      <Route path='/reset-password/:reset_token' element={<ResetPassword/>}/>
      <Route path='/verify/:verification_token' element={ <VerifyEmail/>}/>
      <Route path='/unauthenticated' element={<UnauthenticatedUser/>}/>

      <Route element={<ProtectedRoute/>}>
        <Route path='/' element = {<ListaContactos/>}/>
        <Route path='/conversation/:receiver_id' element={ <Conversacion/>}/>
      </Route>
    </Routes>
  )
}



export default App
