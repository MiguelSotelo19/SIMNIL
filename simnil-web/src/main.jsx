import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Estadisticas } from './screens/Estadisticas'
import { Login } from './screens/Login'
import { Usuarios } from './screens/Usuarios'
import { Pozos } from './screens/Pozos'
import { Comunidades } from './screens/Comunidades'
import { Perfil } from './screens/Perfil'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <Routes>
      <Route path='/SIMNIL/' element={<Login />}/>
      <Route path='/SIMNIL/Estadisticas' element={< Estadisticas />}/>
      <Route path='/SIMNIL/Usuarios' element={<Usuarios />}/>
      <Route path='/SIMNIL/Pozos' element={<Pozos />}/>
      <Route path='/SIMNIL/Comunidades' element={<Comunidades />}/>
      <Route path='/SIMNIL/Perfil' element={<Perfil />}/>
    </Routes>
  </Router>
)
