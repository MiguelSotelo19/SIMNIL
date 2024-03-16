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
  const [ fechasArray, setFechas ] = useState([]);
  const [ fechasArrayFin, setFechasFin ] = useState([]);
  const [ fechaInicio, setFechaInicio ] = useState(''); 
  const [ fechaFin, setFechaFin] = useState('');
 
  useEffect( () => {
    getFechas();
  }, []);

  const getPozos = async () => {
    const respuesta = await axios.get(urlPozos);
    setPozos(respuesta.data.data);
  }

  const getFechas = async () => {
    await getPozos(); 

    let fechas = [];
    for (let i = 0; i < pozos.length; i++) {
      const pozo = pozos[i];
      
      for(let j = 0; j < pozo.datosPozoBeans.length; j++){
        const datos = pozo.datosPozoBeans[j];
    
        let anio = parseInt(datos.fechaRecopilacion.substr(0, 4), 10);
        let mes = parseInt(datos.fechaRecopilacion.substr(5, 2), 10);
        let dia = parseInt(datos.fechaRecopilacion.substr(8, 2), 10);
        let hora = parseInt(datos.horaRecopilacion.substr(0, 2), 10);
        let minutos = parseInt(datos.horaRecopilacion.substr(3, 2), 10);
        let segundos = parseInt(datos.horaRecopilacion.substr(6, 2), 10);
    
        let fecha ={ x: new Date(anio, mes, dia, hora, minutos, segundos), y: datos.nivelAgua };
    
        fechas.push(fecha);
      }
    }
    fechas.sort((a, b) => a.x - b.x);
    
    for(let i=0; i<fechas.length; i++){ 
      let fecha = (fechas[i].x+"").substr(0, 15);
      if(i == fechas.length-1) break; 

      //console.log("["+i+"]Empieza con "+fecha); 
      if(fecha == ((fechas[i+1].x+"").substr(0, 15))) { 
        //console.log("Entra con "+fecha);
        fechas.splice(i, 1);
        i--;
      }
      //console.log(fechas.length); 
    }
 
    //console.log("FECHAS");
    console.log(fechas); 
    setFechas(fechas); 
  }

  const asignarFechas = (inicio) => { 
    let arrayAux = [];
    for (let i = 0; i < fechasArray.length; i++) {
      const element = fechasArray[i].x;
      inicio = new Date(inicio); 

      if(element.getTime() > inicio.getTime()){
        arrayAux.push(fechasArray[i]); 
      }
    }
    setFechasFin(arrayAux); 
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
                  <select onChange={(e) => { setFechaInicio(e.target.value); asignarFechas(e.target.value); }}>
                    <option value={null}></option>
                    {fechasArray.map((fecha) => ( 
                      <option key={fecha.x} value={fecha.x}>{fecha.x.toLocaleDateString()}</option>
                    ))}
                  </select>
                </div>

                <div id="btn-fin">
                  <p>Fecha Fin</p>
                  <select onChange={(e) => { setFechaFin(e.target.value); }}>
                    <option value={null}></option>
                    {fechasArrayFin.map((fecha) => (
                      <option key={fecha.x} value={fecha.x}>{fecha.x.toLocaleDateString()}</option>
                    ))}
                  </select> 
                </div> 
              </div>

              <h1 style={{marginTop: '3%'}}>Histograma</h1>
              <hr />

              <Histograma fechaInicio={fechaInicio} fechaFin={fechaFin} />

            </div>
          </div>
        </div>
      </Flex>
        </>
    );
}