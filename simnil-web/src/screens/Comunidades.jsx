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

const customStyles = {
  content: {
    width: '45%',
    height: '61vh',
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

export const Comunidades = () => {
  const url='http://localhost:8080/api/simnil/comunidades/';
  const urlPozos='http://localhost:8080/api/simnil/pozos/';
  const [comunidades, setComunidades] = useState([]);
  const [pozos, setPozos] = useState([]);
  const [idComunidad, setIdComunidad] = useState('');
  const [nombre, setNombre] = useState('');
  const [codigoPostal, setCodigoPostal] = useState('');
  const [municipio, setMunicipio] = useState('');
  const [estatus, setEstatus] = useState(false);
  const [idPozo, setIdPozo] = useState('');
  const [nombrePozo, setNombrePozo] = useState('');

  useEffect( () => {
    getComunidades();
    getPozos();
  }, []);

  const getComunidades = async () => {
    const respuesta = await axios.get(url);
    setComunidades(respuesta.data.data);
  }

  const getPozos = async () => {
    const respuesta = await axios.get(urlPozos);
    setPozos(respuesta.data.data);
  }

  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [modalEdit, setOpenEdit] = React.useState(false);

  function openModal() {
    setNombre('');
    setMunicipio('');
    setCodigoPostal('');
    getPozos();
    setIsOpen(true);
  }

  function afterOpenModal() {
      subtitle.style.color = '#f00';
  }

  function closeModal() { setIsOpen(false); }

  function closeModalEdit() { setOpenEdit(false); }

  const openModalEdit = async (idComunidad, nombre, codigoPostal, municipio, estatus) => {
    setOpenEdit(true);

    let respuesta = await axios.get(urlPozos);
    respuesta = respuesta.data.data;
    let idPozoB, nombrePozoB;

    for(let i=0; i<respuesta.length; i++){
      console.log(respuesta[i].comunidadesBeans);
      for(let j=0; j<respuesta[i].comunidadesBeans.length; j++){
        if (respuesta[i].comunidadesBeans[j].idComunidad == idComunidad) {
          idPozoB=respuesta[i].idPozo;
          nombrePozoB=respuesta[i].nombre;
          break;
        }
      }
      
    }

    setIdPozo(idPozoB);
    setNombrePozo(nombrePozoB);

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
        estatus: true,
        pozoBean: {
          idPozo: idPozo
        }
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
      if(tipo === 'success'){
        document.getElementById('cancelarEdit').click();
        getComunidades();
      } else {
        document.querySelector("body > div.swal2-container.swal2-center.swal2-backdrop-show > div > div.swal2-actions > button.swal2-confirm.swal2-styled").click();
        show_alerta('Comunidad Actualizada', 'success');
        getComunidades();        
      }
    })
    .catch(function (error) {
      show_alerta('Error en la Solicitud', 'error');
      console.log(error);
    });
  }

  const deleteComunidad = (id_, name, validar) => {
    let mensaje, tittle, confirm;
    if(validar){
      tittle = '¿Seguro de desactivar la Comunidad '+name+'?';
      mensaje = 'Se mantendrá inhabilitado hasta que se actualice manualmente';
      confirm = 'Si, Eliminar';
    } else {
      tittle = '¿Seguro de activar la Comunidad '+name+'?';
      mensaje = 'Se activará la comunidad seleccionada';
      confirm = 'Si, Activar';
    }

    const MySawl = withReactContent(Swal);
    MySawl.fire({
      title: tittle,
      icon: 'question', text: mensaje,
      showCancelButton: true, confirmButtonText: confirm, cancelButtonText: 'Cancelar'
    }).then((result) => {
      if(result.isConfirmed){
        setIdComunidad(id_);
        enviarSolicitud('PATCH', {idComunidad:id_}, 'http://localhost:8080/api/simnil/comunidades/');
      } else {
        show_alerta('La comunidad NO pudo ser modificada', 'info');
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
          <SideMenu selected={4} />
          <div id="der">
            <div id="der-main">
              <div id="info">
                <h1>Comunidades</h1>
                <button onClick={openModal}><img src={mas} />Agregar Comunidades</button>
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

                                  {comunidad.estatus ? (
                                    <button className='btn btn-danger' style={{ width: '45%' }} onClick={() => deleteComunidad(comunidad.idComunidad, comunidad.nombre, true)}>
                                      <img src={trash} className='icon' style={{ width: '60%' }} />
                                    </button>
                                  ) : (
                                    <button className='btn' style={{ width: '45%', backgroundColor: 'green' }} onClick={() => deleteComunidad(comunidad.idComunidad, comunidad.nombre, false)}>
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

            <div className="field">
              <span className='labInp'>Nombre de la Comunidad</span>
              <input required type='text' placeholder='Nombre de la Comunidad' id='nombre_' value={nombre} onChange={(e) => setNombre(e.target.value)} />
            </div>
            
            <div className='info-1'>
              <div className="field">
                <span className='labInp'>Municipio</span>
                <input required type='text' placeholder='Municipio' id='municipio_' value={municipio} onChange={(e) => setMunicipio(e.target.value)} />
              </div>

              <div className="field">
                <span className='labInp'>Código Postal</span>
                <input required type='number' maxLength={5} minLength={5} placeholder='Código Postal' id='cp_' value={codigoPostal} onChange={(e) => setCodigoPostal(e.target.value)} />
              </div>
            </div>
            
            <span className='labInp'>Pozo que lo abastece</span>
            <select required onChange={(e) => setIdPozo(e.target.value)} id='listaPozo'>
              <option id='selected' value={idPozo}>{nombrePozo}</option>
              {pozos.map( (pozo) => (
                <option key={pozo.idPozo} value={pozo.idPozo}>{pozo.nombre}</option>
              ) )}
            </select>

            <div className="acciones">
              <button id='recu' onClick={() => validar('PUT')}>Guardar Cambios</button>
              <button className='cancelar' id='cancelarEdit' onClick={closeModal}>Cancelar</button>
            </div>

            </form>
          </Modal>

          <Modal
              isOpen={modalIsOpen}
              onAfterOpen={afterOpenModal}
              onRequestClose={closeModal}
              style={customStyles}
              contentLabel="Modal Create"
          >
            <h2 ref={(_subtitle) => (subtitle = _subtitle)} style={{color: 'black', fontSize: 35}}>Registrar Comunidad</h2>
            <form style={{
                width: '90%',
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center'}}>

            <div className="field">
              <span className='labInp'>Nombre de la Comunidad</span>
              <input required type='text' placeholder='Nombre de la Comunidad' id='nombre_' value={nombre} onChange={(e) => setNombre(e.target.value)} />
            </div>
            
            <div className='info-1'>
              <div className="field">
                <span className='labInp'>Municipio</span>
                <input required type='text' placeholder='Municipio' id='municipio_' value={municipio} onChange={(e) => setMunicipio(e.target.value)} />
              </div>

              <div className="field">
                <span className='labInp'>Código Postal</span>
                <input required type='number' maxLength={5} minLength={5} placeholder='Código Postal' id='cp_' value={codigoPostal} onChange={(e) => setCodigoPostal(e.target.value)} />
              </div>
            </div>
 
            <span className='labInp'>Pozo que lo abastece</span>
            <select required onChange={(e) => setIdPozo(e.target.value)} id='listaPozo'>
              <option id='selected'>Selecciona Pozo</option>
              {pozos.map( (pozo) => (
                <option key={pozo.idPozo} value={pozo.idPozo}>{pozo.nombre}</option>
              ) )}
            </select>

            <div className="acciones">
              <button id='recu' onClick={() => validar('POST')}>Crear Comunidad</button>
              <button className='cancelar' id='cancelarCreate' onClick={closeModal}>Cancelar</button>
            </div>
            
            </form>
          </Modal>
        </div>
      </Flex>
        </>
    );
}