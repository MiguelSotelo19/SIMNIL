import React, { useEffect, useState } from 'react';
import { Menu, SideMenu } from '../components/Menu';
import { Header } from '../components/Header_';
import Flex from '@react-css/flex';
import axios from 'axios';
import Histograma from '../components/Histograma';

export const Estadisticas = () => {
  const urlPozos = 'http://localhost:8080/api/simnil/pozos/';
  const [pozos, setPozos] = useState([]);
  const [fechasArray, setFechas] = useState([]);
  const [fechasArrayFin, setFechasFin] = useState([]);
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');

  useEffect(() => {
    const getPozos = async () => {
      try {
        const respuesta = await axios.get(urlPozos);
        setPozos(respuesta.data.data);
        getFechas(respuesta.data.data);
      } catch (error) {
        console.error('Error al obtener datos de la API:', error);
      }
    };
    getPozos();
  }, []);

  const getFechas = (pozosData) => {
    let fechas = [];
    for (let i = 0; i < pozosData.length; i++) {
      const pozo = pozosData[i];
      for (let j = 0; j < pozo.datosPozoBeans.length; j++) {
        const datos = pozo.datosPozoBeans[j];
        let anio = parseInt(datos.fechaRecopilacion.substr(0, 4), 10);
        let mes = parseInt(datos.fechaRecopilacion.substr(5, 2), 10);
        let dia = parseInt(datos.fechaRecopilacion.substr(8, 2), 10);
        let hora = parseInt(datos.horaRecopilacion.substr(0, 2), 10);
        let minutos = parseInt(datos.horaRecopilacion.substr(3, 2), 10);
        let segundos = parseInt(datos.horaRecopilacion.substr(6, 2), 10);
        let fecha = { x: new Date(anio, mes, dia, hora, minutos, segundos), y: datos.nivelAgua };
        fechas.push(fecha);
      }
    }
    fechas.sort((a, b) => a.x - b.x);

    for (let i = 0; i < fechas.length; i++) {
      let fecha = (fechas[i].x + '').substr(0, 15);
      if (i === fechas.length - 1) break;
      if (fecha === (fechas[i + 1].x + '').substr(0, 15)) {
        fechas.splice(i, 1);
        i--;
      }
    }
    setFechasFin(fechas);
    setFechas(fechas);
    
    document.getElementById("inicio").min = getFormatFecha(fechas[0].x);
    document.getElementById("fin").min = getFormatFecha(fechas[0].x);

    let size = fechas.length - 1;
    document.getElementById("inicio").max = getFormatFecha(fechas[size].x);
    document.getElementById("fin").max = getFormatFecha(fechas[size].x);
  };

  const getFormatFecha = (fechaOriginal) => {
    var fecha = new Date(fechaOriginal);
    var año = fecha.getFullYear(); 
    var mes = fecha.getMonth(); 
    var dia = fecha.getDate(); 

    var fechaFormateada = año + '-' + (mes < 10 ? '0' : '') + mes + '-' + (dia < 10 ? '0' : '') + dia;
    return fechaFormateada
  }

  const asignarFechas = (inicio) => {
    document.getElementById("fin").value='';
    setFechaFin('');
    var fechaInicial = new Date(inicio);
    var unDiaEnMilisegundos = 86400000;
    var fechaFinal = new Date(fechaInicial.getTime() + unDiaEnMilisegundos);

    var newFecha = fechaFinal.toISOString().split('T')[0];
    document.getElementById("fin").min = newFecha;
  };

  return (
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
                  <p className='selectText'>Fecha Inicio</p>
                  <input id='inicio' className='calendar' type='date' onChange={(e) => {setFechaInicio(e.target.value); asignarFechas(e.target.value);}} />
                </div>

                <div id="btn-fin">
                  <p className='selectText'>Fecha Fin</p>
                  <input id='fin' className='calendar' type='date' onChange={(e) => {setFechaFin(e.target.value);}} />
                </div>  
              </div>

              <h1 style={{ marginTop: '3%' }}>Histograma</h1>
              <hr />

              <Histograma fechaInicio={fechaInicio} fechaFin={fechaFin} />

            </div>
          </div>
        </div>
      </Flex>
    </>
  );
}
