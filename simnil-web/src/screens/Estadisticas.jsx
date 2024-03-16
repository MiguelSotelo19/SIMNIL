import React, {useEffect, useState} from 'react';
import { Menu, SideMenu } from '../components/Menu';
import { Header } from '../components/Header_';
import Flex from '@react-css/flex';
import axios from 'axios';

//CSS
import '../css/main.css';
import '../css/header.css';
import '../css/body.css';

import Histograma from '../components/Histograma';

export const Estadisticas = () => {
  const urlPozos='http://localhost:8080/api/simnil/pozos/';
  const [pozos, setPozos] = useState([]);

  useEffect( () => {
    getPozos();
  }, []);

  const getPozos = async () => {
    const respuesta = await axios.get(urlPozos);
    setPozos(respuesta.data.data);
  }  

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

              <Histograma />

            </div>
          </div>
        </div>
      </Flex>
        </>
    );
}