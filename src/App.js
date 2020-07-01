import React, {useState, useEffect} from 'react';
import {contextAuth} from "./utils/Context";
import Main from "./components/Auth/Main";
import {isLogged} from "./api/Login";
import {ToastContainer} from "react-toastify";
import Routing from './routers/Routing';
function App() {
  const [user, setUser] = useState(null)
  const [logged, setLogged] = useState(false)
  const [checkLogin, setCheckLogin] = useState(false)
  useEffect(() => {
    setUser(isLogged);
    setLogged(true);
    setCheckLogin(false);
  },[checkLogin])
  //Verifica si el usuario esta logueado o aun no
  if(!logged) return null;
  return (
    <contextAuth.Provider value={user}>
      {user ? <Routing setCheckLogin={setCheckLogin} /> : <Main setCheckLogin={setCheckLogin} /> }
      <ToastContainer 
        position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </contextAuth.Provider>
  );
} 
export default App;
