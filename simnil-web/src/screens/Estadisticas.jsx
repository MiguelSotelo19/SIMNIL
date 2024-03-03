
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
          <Header />
        </div>

        <div id='main'>
          <SideMenu />
          <div id="der">
            <div id="der-main">
              <h1>Consulta de Información</h1>
              <hr />
              
            </div>
          </div>
        </div>
      </Flex>
        </>
    );
}