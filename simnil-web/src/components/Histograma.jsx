import React, {useEffect, useState, Component} from 'react';
import CanvasJSReact from '@canvasjs/react-charts';
import axios from 'axios';

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const urlPozos = 'http://localhost:8080/api/simnil/pozos/';

const peticion = await axios.get(urlPozos);
const pozos = peticion.data.data;

let historial = []; 

function renderHisto(fechaInicio, fechaFin){
	historial = [];
	console.log("Desde Histo "+fechaInicio);
	console.log("Fecha Fin "+fechaFin);

	for (let i = 0; i < pozos.length; i++) {
		const pozo = pozos[i];
		let fechas = [];
		
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
		fechas = fechas.sort();
		fechas.sort((a, b) => a.x - b.x);
	
		let dato_histo = {
			type: "spline",
			name: "Pozo "+pozo.nombre,
			showInLegend: true,
			xValueFormatString: "DD-MM-YY hh:mm tt",
			yValueFormatString: "Nivel de Agua ###,##%",
			dataPoints: fechas
		}
	
		historial.push(dato_histo);
	}
}

document.onload = renderHisto();

class Histograma extends React.Component {
	constructor() {
		super();
		this.toggleDataSeries = this.toggleDataSeries.bind(this);
	}
	
	toggleDataSeries(e){
		if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
			e.dataSeries.visible = false;
		}
		else{
			e.dataSeries.visible = true;
		}
		this.chart.render();
	}
	
	render() {
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
				cursor: "pointer",
				itemclick: this.toggleDataSeries
			},
			data: historial
		}
		
		return (
		<div>
			<CanvasJSChart options = {options} 
				 onRef={ref => this.chart = ref}
			/>
			{ renderHisto(this.props.fechaInicio, this.props.fechaFin) }
		</div>
		);
	}
			
}
 
export default Histograma;
