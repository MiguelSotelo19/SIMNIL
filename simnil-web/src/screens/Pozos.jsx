import React, {useEffect, useState} from 'react';
import Modal from 'react-modal';
import { Menu, SideMenu } from '../components/Menu';
import { Header } from '../components/Header_';
import Flex from '@react-css/flex';
import mas from '../assets/anadir.png';

//CSS
import '../css/main.css';
import '../css/header.css';
import '../css/body.css';

//Tablas
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import edit from '../assets/editar.png';
import trash from '../assets/basura.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import { show_alerta } from '../js/functions';

Modal.setAppElement('#root');

const customStyles = {
  content: {
    width: '45%',
    height: '60vh',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    borderWidth: 2,
    borderColor: 'blue',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
};

Modal.setAppElement('#root');

export const Pozos = () => {
    //Tablas
    const url='http://localhost:8080/api/simnil/comunidades/';
    const [comunidades, setComunidades] = useState([]);
    const [idComunidad, setIdComunidad] = useState('');
    const [nombre, setNombre] = useState('');
    const [codigoPostal, setCodigoPostal] = useState('');
    const [municipio, setMunicipio] = useState('');
    const [estatus, setEstatus] = useState(false);

    useEffect( () => {
      getComunidades();
    }, []);

    const getComunidades = async () => {
      const respuesta = await axios.get(url);
      setComunidades(respuesta.data.data);
    }

    //Fin tablas
    let subtitle;
    const [modalIsOpen, setIsOpen] = React.useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        subtitle.style.color = '#f00';
    }

    function closeModal() {
        setIsOpen(false);
    }

    //Funciones
    function closeModalEdit() { setOpenEdit(false); }

  const openModalEdit = (idComunidad, nombre, codigoPostal, municipio, estatus) => {
    setOpenEdit(true);

    setIdComunidad(idComunidad),
    setNombre(nombre);
    setCodigoPostal(codigoPostal);
    setMunicipio(municipio);
    setEstatus(estatus);
  }

  const validar = (metodo) => {
    var parametros, url='http://localhost:8080/api/simnil/comunidades/';
    if(idComunidad == '' || idComunidad == null) setIdComunidad(1);

    if(nombre.trim() === ''){
      show_alerta('Escribe el nombre de la Comunidad', 'warning');
    } else if(codigoPostal.trim() === ''){
      show_alerta('Escribe el Codigo Postal', 'warning');
    } else if(municipio.trim() === ''){
      show_alerta('Escribe el nombre del Municipio', 'warning');
    } else {
      parametros = {
        idComunidad: idComunidad,
        nombre: nombre,
        codigo_postal: codigoPostal,
        municipio: municipio,
        estatus: true
      }

      enviarSolicitud(metodo, parametros, url);
    }
  }

  const enviarSolicitud = async(metodo, parametros, url) => {
    if(metodo === 'POST'){
      parametros.idComunidad = 0;
      await axios({
        method: metodo,
        url: url,
        data: parametros
      }).then(function (respuesta) {
        var tipo = respuesta.data[0];
        var msj = respuesta.data[1];
        show_alerta(msj, tipo);
        if(tipo === 'success'){
          document.getElementById('cancelarCreate').click();
          show_alerta('Comunidad Almacenada Correctamente', 'success');
          getComunidades();
        }
      })
      .catch(function (error) {
        show_alerta('Error en la Solicitud', 'error');
        console.log(error);
      });
    }

    await axios({
      method: metodo,
      url: url+parametros.idComunidad,
      data: parametros
    }).then(function (respuesta) {
      var tipo = respuesta.data[0];
      var msj = respuesta.data[1];
      show_alerta(msj, tipo);
      if(tipo === 'success'){
        document.getElementById('cancelarEdit').click();
        getComunidades();
      } else {
        document.querySelector("body > div.swal2-container.swal2-center.swal2-backdrop-show > div > div.swal2-actions > button.swal2-confirm.swal2-styled").click();
        show_alerta('Comunidad Eliminada', 'success');
        getComunidades();        
      }
    })
    .catch(function (error) {
      show_alerta('Error en la Solicitud', 'error');
      console.log(error);
    });
  }

  const deleteComunidad = (id_, name) => {
    const MySawl = withReactContent(Swal);
    MySawl.fire({
      title: '¿Seguro de eliminar la Comunidad '+name+'?',
      icon: 'question', text: 'No se podrá dar marcha atrás',
      showCancelButton: true, confirmButtonText: 'Si, Eliminar', cancelButtonText: 'Cancelar'
    }).then((result) => {
      if(result.isConfirmed){
        setIdComunidad(id_);
        enviarSolicitud('DELETE', {idComunidad:id_}, 'http://localhost:8080/api/simnil/comunidades/');
      } else {
        show_alerta('La comunidad NO fue elminada', 'info');
      }
    });
  }

    return(
        <>
        <Flex row id='container'>
        <div id='elements'>
          <Menu />
          <Header usuario='Administrador' />
        </div>

        <div id='main'>
          <SideMenu selected={3} />
          <div id="der">
            <div id="der-main">
              <div id="info">
                <h1>Pozos</h1>
                <button onClick={openModal}><img src={mas} />Agregar Pozos</button>
              </div>
              <hr />

              <div className='container-fluid'>
                <div className="row mt-3">
                  <div className="col-12 col-lg-8 offset-0 offset-lg-2" style={{width: '90%', marginLeft: '5%', fontSize: 15}} >
                    <div className="table-responsive">
                      <table className='table table-bordered'>
                        <thead>
                          <tr style={{textAlign: 'center', fontSize: 17}}>
                            <th>#</th>
                            <th>Comunidad</th>
                            <th>C.P.</th>
                            <th>Municipio</th>
                            <th>Estatus</th>
                            <th>Acciones</th>
                          </tr>
                        </thead>
                        <tbody className='table-group-divider'>
                          {comunidades.map( (comunidad, i) => (
                              <tr key={comunidad.idComunidad}>
                                <td>{(i+1)}</td>
                                <td>{comunidad.nombre}</td>
                                <td>{comunidad.codigo_postal}</td>
                                <td>{comunidad.municipio}</td>
                                <td>{comunidad.estatus == true ? "Activo": "Inactivo"}</td>
                                <td style={{width: '15%'}}>
                                  <button className='btn btn-warning' style={{width: '45%'}} onClick={() => openModalEdit(
                                    comunidad.idComunidad, comunidad.nombre, comunidad.codigo_postal, comunidad.municipio, comunidad.estatus
                                  )}>
                                    <img src={edit} className='icon' style={{width: '60%'}} />
                                  </button>
                                  &nbsp;
                                  <button className='btn btn-danger' style={{width: '45%'}} onClick={() => deleteComunidad(comunidad.idComunidad, comunidad.nombre)}>
                                    <img src={trash} className='icon' style={{width: '60%'}} />
                                  </button>
                                </td>
                              </tr>
                            ))
                          }
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              
            </div>
          </div>

          <Modal
              isOpen={modalIsOpen}
              onAfterOpen={afterOpenModal}
              onRequestClose={closeModal}
              style={customStyles}
              contentLabel="Login Modal"
          >
            <h2 ref={(_subtitle) => (subtitle = _subtitle)} style={{color: 'black', fontSize: 35}}>Registrar Pozo</h2>
            <form style={{
                width: '90%',
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center'}}>

            <input type='text' placeholder='Nombre del Pozo' />
            <input type='text' placeholder='Asignar Comunidades -- Beta' />

            <div className='info-1'>
              <input type='text' placeholder='Porcentaje de agua' />
              <input type='text' placeholder='Profundidad' />
            </div>

            <button id='recu'>Crear Pozo</button>
            <button id='cancelar' onClick={closeModal}>Cancelar</button>
            </form>
          </Modal>

        </div>
      </Flex>
        </>
    );
}