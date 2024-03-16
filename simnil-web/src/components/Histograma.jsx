import React, { useEffect, useState } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';
import axios from 'axios';

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const Histograma = ({ fechaInicio, fechaFin }) => {
  const [historial, setHistorial] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const urlPozos = 'http://localhost:8080/api/simnil/pozos/';
      const response = await axios.get(urlPozos);
      const pozos = response.data.data;
      renderHisto(pozos, fechaInicio, fechaFin);
    };

    fetchData();
  }, [fechaInicio, fechaFin]);

  const renderHisto = (pozos, fechaInicio, fechaFin) => {
    let historial = [];

    for (let i = 0; i < pozos.length; i++) {
      const pozo = pozos[i];
      let fechas = [];
      let available = true;

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
      fechas = fechas.sort();
      fechas.sort((a, b) => a.x - b.x);

      if (fechaInicio && fechaInicio !== '') {
        let arrayFechas = [];
        for (let i = 0; i < fechas.length; i++) {
          const element = fechas[i].x;
          fechaInicio = new Date(fechaInicio);

          if (element.getTime() >= fechaInicio.getTime()) {
            arrayFechas.push(fechas[i]);
          }
        }
        fechas = arrayFechas;
      }

      console.log(fechas);
      if (fechas.length === 0) available = false;

      let dato_histo = {
        type: "spline",
        name: "Pozo " + pozo.nombre,
        showInLegend: available,
        xValueFormatString: "DD-MM-YY hh:mm tt",
        yValueFormatString: "Nivel de Agua ###,##%",
        dataPoints: fechas
      }

      historial.push(dato_histo);
    }
	console.log("===================================");

    setHistorial(historial);
  }

  const options = {
    theme: "light2",
    animationEnabled: true,
    axisX: {
      title: "Fechas"
    },
    axisY: {
      title: "Consumo de Agua",
      titleFontColor: "#6D78AD",
      lineColor: "#6D78AD",
      labelFontColor: "#6D78AD",
      tickColor: "#6D78AD"
    },
    axisY2: {
      title: "Consumo de Agua",
      titleFontColor: "#51CDA0",
      lineColor: "#51CDA0",
      labelFontColor: "#51CDA0",
      tickColor: "#51CDA0"
    },
    toolTip: {
      shared: true
    },
    legend: {
      cursor: "pointer"
    },
    data: historial
  };

  return (
    <div>
      <CanvasJSChart options={options} />
    </div>
  );
}

export default Histograma;
