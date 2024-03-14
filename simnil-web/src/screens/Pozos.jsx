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
    const url='http://localhost:8080/api/simnil/pozos/';
    const [ pozos, setPozos ] = useState([]);
    const [ idPozo, setIdPozo ] = useState('');
    const [ nombre, setNombre ] = useState('');
    const [ porcentaje, setPorcentaje ] = useState('');
    const [ capLitros, setCapLitros ] = useState('');
    const [ profundidad, setProfundidad ] = useState('');

    useEffect( () => {
      getPozos();
    }, []);

    const getPozos = async () => {
      const respuesta = await axios.get(url);
      setPozos(respuesta.data.data);
    }

    //Fin tablas
    let subtitle;
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [modalEdit, setOpenEdit] = React.useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        subtitle.style.color = '#f00';
    }

    function closeModal() {
        setIsOpen(false);
    }

    function closeModalEdit() { 
      setOpenEdit(false); 
    }

    //Funciones
    function closeModalEdit() { setOpenEdit(false); }

  const openModalEdit = (idPozo, nombre, porcentaje, capLitros, profundidad) => {
    setOpenEdit(true);

    setIdPozo(idPozo),
    setNombre(nombre);
    setPorcentaje(porcentaje);
    setCapLitros(capLitros);
    setProfundidad(profundidad);
  }

  const validar = (metodo) => {
    var parametros, url='http://localhost:8080/api/simnil/pozos/';
    if(idPozo == '' || idPozo == null) setIdPozo(1);

    if(nombre.trim() === ''){
      show_alerta('Escribe el nombre del Pozo', 'warning');
    } else if(porcentaje === '' || porcentaje === null){
      show_alerta('Escribe el porcentaje', 'warning');
    } else if(capLitros === '' || capLitros === null){
      show_alerta('Escribe la capacidad del pozo', 'warning');
    } else if(profundidad === '' || profundidad === null){
      show_alerta('Escribe la profundidad del pozo', 'warning');
    } else {
      parametros = {
        idPozo: idPozo,
        porcentajeAgua: porcentaje,
        nombre: nombre,
        capacidadLitros: capLitros,
        profundidad: profundidad,
        estatus: true
      }

      enviarSolicitud(metodo, parametros, url);
    }
  }

  const enviarSolicitud = async(metodo, parametros, url) => {
    if(metodo === 'POST'){
      parametros.idPozo = 0;
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
          show_alerta('Pozo Almacenado Correctamente', 'success');
          getPozos();
        }
      })
      .catch(function (error) {
        show_alerta('Error en la Solicitud', 'error');
        console.log(error);
      });
    }

    console.log(parametros);
    await axios({
      method: metodo,
      url: url+parametros.idPozo,
      data: parametros
    }).then(function (respuesta) {
      var tipo = respuesta.data[0];
      var msj = respuesta.data[1];
      show_alerta(msj, tipo);
      if(tipo === 'success'){
        document.getElementById('cancelarEdit').click();
        getPozos();
      } 
    })
    .catch(function (error) {
      show_alerta('Error en la Solicitud', 'error');
      console.log(error);
    });
  }

  const deletePozo = (id_, name, validar) => {
    let mensaje, tittle, confirm;
    if(validar){
      tittle = '¿Seguro de desactivar el Pozo '+name+'?';
      mensaje = 'Se mantendrá inhabilitado hasta que se actualice manualmente';
      confirm = 'Si, Eliminar';
    } else {
      tittle = '¿Seguro de activar el Pozo '+name+'?';
      mensaje = 'Se activará al usuario seleccionado';
      confirm = 'Si, Activar';
    }

    const MySawl = withReactContent(Swal);
    MySawl.fire({
      title: tittle,
      icon: 'question', text: mensaje,
      showCancelButton: true, confirmButtonText: confirm, cancelButtonText: 'Cancelar'
    }).then((result) => {
      if(result.isConfirmed){
        setIdPozo(id_);
        enviarSolicitud('PATCH', {idPozo:id_}, 'http://localhost:8080/api/simnil/pozos/');
        setTimeout(function() { document.querySelector("body > div.swal2-container.swal2-center.swal2-backdrop-show > div > div.swal2-actions > button.swal2-confirm.swal2-styled").click(); }, 10);
        getPozos();
      } else {
        show_alerta('El pozo NO pudo ser modificado', 'info');
      }
      getPozos();
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
                            <th>Nombre</th>
                            <th>Porcentaje</th>
                            <th>Capacidad Litros</th>
                            <th>Profundidad</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                          </tr>
                        </thead>
                        <tbody className='table-group-divider'>
                          {pozos.map( (pozo, i) => (
                              <tr key={pozo.idPozo}>
                                <td>{(i+1)}</td>
                                <td>{pozo.nombre}</td>
                                <td>{pozo.porcentajeAgua}</td>
                                <td>{pozo.capacidadLitros}</td>
                                <td>{pozo.profundidad}</td>
                                <td>{pozo.estatus == true ? "Activo": "Inactivo"}</td>
                                <td style={{width: '15%'}}>
                                  <button className='btn btn-warning' style={{width: '45%'}} onClick={() => openModalEdit(
                                    pozo.idPozo, pozo.nombre, pozo.capacidadLitros, pozo.porcentajeAgua, pozo.profundidad, pozo.estatus
                                  )}>
                                    <img src={edit} className='icon' style={{width: '60%'}} />
                                  </button>
                                  &nbsp;
                                  
                                  {pozo.estatus ? (
                                    <button className='btn btn-danger' style={{ width: '45%' }} onClick={() => deletePozo(pozo.idPozo, pozo.nombre, true)}>
                                      <img src={trash} className='icon' style={{ width: '60%' }} />
                                    </button>
                                  ) : (
                                    <button className='btn' style={{ width: '45%', backgroundColor: 'green' }} onClick={() => deletePozo(pozo.idPozo, pozo.nombre, false)}>
                                      <img src={trash} className='icon' style={{ width: '60%' }} />
                                    </button>
                                  )}

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

            <div className='info-1'>
              <input type='text' placeholder='Nombre del Pozo' onChange={(e) => setNombre(e.target.value)} />
              <input type='text' placeholder='Porcentaje de agua' onChange={(e) => setPorcentaje(e.target.value)} />
            </div>

            <div className='info-1'>
            <input type='text' placeholder='Capacidad de Litros' onChange={(e) => setCapLitros(e.target.value)} />
              <input type='text' placeholder='Profundidad' onChange={(e) => setProfundidad(e.target.value)} />
            </div>

            <button id='recu' onClick={() => validar('POST')} >Crear Pozo</button>
            <button id='cancelar' className='cancelar' onClick={closeModal}>Cancelar</button>
            </form>
          </Modal>

          <Modal
              isOpen={modalEdit}
              onAfterOpen={afterOpenModal}
              onRequestClose={closeModalEdit}
              style={customStyles}
              contentLabel="Modal Edit"
          >
            <h2 ref={(_subtitle) => (subtitle = _subtitle)} style={{color: 'black', fontSize: 35}}>Editar Comunidad</h2>
            <form style={{
                width: '90%',
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center'}}>

            <div className='info-1'>
              <input type='text' placeholder='Nombre del Pozo' id='nombre_' value={nombre} onChange={(e) => setNombre(e.target.value)} />
              <input type='text' placeholder='Porcentaje de agua' id='porcentajeAgua' value={porcentaje} onChange={(e) => setPorcentaje(e.target.value)} />
            </div>

            <div className='info-1'>
              <input type='text' placeholder='Capacidad de Litros' id='capacidadLitros' value={capLitros} onChange={(e) => setCapLitros(e.target.value)} />
              <input type='text' placeholder='Profundidad' id='profundidad' value={profundidad} onChange={(e) => setProfundidad(e.target.value)} />
            </div>
            

            <button id='recu' style={{width: '50%'}} onClick={() => validar('PUT')}>Guardar Cambios</button>
            <button className='cancelar' id='cancelarEdit' style={{width: '50%'}} onClick={closeModal}>Cancelar</button>
            </form>
          </Modal>

        </div>
      </Flex>
        </>
    );
}