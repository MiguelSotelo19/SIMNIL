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
      <Route path='/SIMNIL/' Component={Login}/>
      <Route path='/SIMNIL/Estadisticas' Component={Estadisticas}/>
      <Route path='/SIMNIL/Usuarios' Component={Usuarios}/>
      <Route path='/SIMNIL/Pozos' Component={Pozos}/>
      <Route path='/SIMNIL/Comunidades' Component={Comunidades}/>
      <Route path='/SIMNIL/Perfil' Component={Perfil}/>
    </Routes>
  </Router>
)
