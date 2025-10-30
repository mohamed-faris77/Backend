import 'react-toastify/dist/ReactToastify.css';
import Landing from './components/Landing'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import VerifyOtp from './components/VerifyOtp'

import { ToastContainer } from 'react-toastify';


function App() {


  return (
    <>

      {/* Required for toast notifications */}
      <ToastContainer position="top-center" />

      {/* <Landing/> */}

      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/verify' element={<VerifyOtp />} />
        </Routes>
      </BrowserRouter>


    </>
  )
}

export default App
