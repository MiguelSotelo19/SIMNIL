import { Menu, SideMenu } from '../components/Menu'
import { Header } from '../components/Header_'
import Flex from '@react-css/flex'

//CSS
import '../css/main.css'
import '../css/header.css'
import '../css/body.css'
 
export const Estadisticas = () => {
    return(
        <>
        <Flex row id='container'>
        <div id='elements'>
          <Menu />
          <Header usuario='Administrador' />
        </div>

        <div id='main'>
          <SideMenu selected={1} />
          <div id="der">
            <div id="der-main">
              <h1>Consulta de Información</h1>
              <hr />

              <div id="opciones">
                <div id="btn-pozo">
                  <p>Pozo</p>
                  <select>
                    <option>HOLA</option>
                  </select>
                </div>

                <div id="btn-inicio">
                  <p>Fecha Inicio</p>
                  <select>
                    <option>HOLA</option>
                  </select>
                </div>

                <div id="btn-fin">
                <p>Fecha Fin</p>
                  <select>
                    <option>HOLA</option>
                  </select>
                </div>
              </div>

              <h1 style={{marginTop: '3%'}}>Histograma</h1>
              <hr />

            </div>
          </div>
        </div>
      </Flex>
        </>
    );
}