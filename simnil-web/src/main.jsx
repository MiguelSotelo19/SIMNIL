import React from 'react'
import ReactDOM from 'react-dom/client'
import { Estadisticas } from './screens/Estadisticas'
import { Login } from './screens/Login'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <Estadisticas />
      {/*<Login />*/}
  </React.StrictMode>,
)
