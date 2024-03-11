import React, {useEffect, useState} from 'react';
import Modal from 'react-modal';
import { Menu, SideMenu } from '../components/Menu'
import { Header } from '../components/Header_'
import Flex from '@react-css/flex'
import mas from '../assets/anadir.png';

//CSS
import '../css/main.css'
import '../css/header.css'
import '../css/body.css'

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
    width: '55%',
    height: '80vh',
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

export const Usuarios = () => {
    //Tablas
    const url='http://localhost:8080/api/simnil/persona/';
    const [usuarios, setUsuarios] = useState([]);
    const [idPersonas, setIdPersonas] = useState('');
    const [nombre, setNombre] = useState('');
    const [apellidoPaterno, setApellidoPaterno] = useState('');
    const [apellidoMaterno, setApellidoMaterno] = useState('');
    const [nombreUsuario, setNombreUsuario] = useState('');
    const [contrasenia, setContrasenia] = useState('');
    const [estatus, setEstatus] = useState(false);
    const [numeroTelefoncico, setNumeroTelefoncico] = useState('');
    const [correo, setCorreo] = useState('');
    const [rol, setRol] = useState('');

    useEffect( () => {
      getUsuarios();
    }, []);

    const getUsuarios = async () => {
      const respuesta = await axios.get(url);
      setUsuarios(respuesta.data.data);
    }

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

    function closeModalEdit() { setOpenEdit(false); }

    const openModalEdit = (idPersonas, nombre, apellidoPaterno, apellidoMaterno, correo, nombreUsuario, contrasenia, estatus, numeroTelefoncico, rol) => {
      setOpenEdit(true);

      setIdPersonas(idPersonas);
      setNombre(nombre);
      setApellidoPaterno(apellidoPaterno);
      setApellidoMaterno(apellidoMaterno);
      setCorreo(correo);
      setNombreUsuario(nombreUsuario);
      setContrasenia(contrasenia);
      setEstatus(estatus);
      setNumeroTelefoncico(numeroTelefoncico);
      setRol(rol);
    }
    
    const validar = (metodo) => {
      var parametros, url='http://localhost:8080/api/simnil/persona/';
      if(idPersonas == '' || idPersonas == null) setIdPersonas(1);
  
      if(nombre.trim() === ''){
        show_alerta('Escribe el Nombre de la Persona', 'warning');
      } else if(apellidoPaterno.trim() === ''){
        show_alerta('Escribe el Apellido Paterno', 'warning');
      } else if(apellidoMaterno.trim() === ''){
        show_alerta('Escribe el Apellido Materno', 'warning');
      } else if(nombreUsuario.trim() === ''){
        show_alerta('Escribe el Nombre de Usuario', 'warning');
      } else if(contrasenia.trim() === ''){
        show_alerta('Escribe la Contraseña', 'warning');
      } else if(numeroTelefoncico.trim() === ''){
        show_alerta('Escribe el Número de Teléfono', 'warning');
      } else if(correo.trim() === ''){
        show_alerta('Escribe el Correo Electrónico', 'warning');
      } else {
        parametros = {
          idPersona: idPersonas,
          nombre: nombre,
          apellido_materno: apellidoMaterno,
          apellido_paterno: apellidoPaterno,
          correo_electronico: correo,
          nombre_usuario: nombreUsuario,
          contrasenia: contrasenia,
          estatus: estatus,
          numero_telefonico: numeroTelefoncico
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
            show_alerta('Usuario Almacenado Correctamente', 'success');
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
        url: url+parametros.idPersonas,
        data: parametros
      }).then(function (respuesta) {
        var tipo = respuesta.data[0];
        var msj = respuesta.data[1];
        show_alerta(msj, tipo);
        if(tipo === 'success'){
          document.getElementById('cancelarEdit').click();
          getUsuarios();
        } else {
          show_alerta('Ushario Eliminado', 'success');
          getUsuarios();        
        }
      })
      .catch(function (error) {
        show_alerta('Error en la Solicitud', 'error');
        console.log(error);
      });
    }
  
    const deleteUsuario = (id_, name) => {
      const MySawl = withReactContent(Swal);
      MySawl.fire({
        title: '¿Seguro de eliminar el Usuario '+name+'?',
        icon: 'question', text: 'No se podrá dar marcha atrás',
        showCancelButton: true, confirmButtonText: 'Si, Eliminar', cancelButtonText: 'Cancelar'
      }).then((result) => {
        if(result.isConfirmed){
          setIdPersonas(id_);
          enviarSolicitud('DELETE', {idPersonas:id_}, 'http://localhost:8080/api/simnil/persona/');
        } else {
          show_alerta('El usuario NO fue elminado', 'info');
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
          <SideMenu selected={2} />
          <div id="der">
            <div id="der-main">
              <div id="info">
                <h1>Usuarios</h1>
                <button onClick={openModal} ><img src={mas} />Agregar Usuario</button>
              </div>
              <hr />

              {/*Tablas dinamicas */}
              <div className='container-fluid'>
                <div className="row mt-3">
                  <div className="col-12 col-lg-8 offset-0 offset-lg-2" style={{width: '90%', marginLeft: '5%', fontSize: 15}}>
                    <div className="table-responsive">
                      <table className='table table-bordered'>
                        <thead>
                          <tr style={{textAlign: 'center', fontSize: 17}}>
                            <th>#</th>
                            <th>Nombre(s)</th>
                            <th>Apellido Paterno</th>
                            <th>Apellido Materno</th>
                            <th>Usuario</th>
                            <th>Contraseña</th>
                            <th>Núm. Tel.</th>
                            <th>Correo Electrónico</th>
                            <th>Rol</th>
                            <th>Estatus</th>
                            <th>Acciones</th>
                          </tr>
                        </thead>
                        <tbody className='table-group-divider'>
                          {usuarios.map( (usuario, i) => (
                              <tr key={usuario.idPersonas}>
                                <td>{(i+1)}</td>
                                <td>{usuario.nombre}</td>
                                <td>{usuario.apellidoPaterno}</td>
                                <td>{usuario.apellidoMaterno}</td>
                                <td>{usuario.nombreUsuario}</td>
                                <td>{usuario.contrasenia}</td>
                                <td>{usuario.numeroTelefoncico}</td>
                                <td>{usuario.correo}</td>
                                <td>{usuario.rolBean.rol}</td>
                                <td>{usuario.estatus == true ? "Activo": "Inactivo"}</td>
                                <td style={{width: '15%'}}>
                                  <button className='btn btn-warning' style={{width: '45%'}} onClick={() => openModalEdit(
                                    usuario.idPersonas, usuario.nombre, usuario.apellidoPaterno, usuario.apellidoMaterno, usuario.correo, usuario.nombreUsuario, usuario.contrasenia, usuario.estatus, usuario.numeroTelefoncico, usuario.rolBean.rol
                                  )}>
                                    <img src={edit} className='icon' style={{width: '60%'}} />
                                  </button>
                                  &nbsp;
                                  <button className='btn btn-danger' style={{width: '45%'}} onClick={() => deleteUsuario(usuario.idPersonas, usuario.nombre)}>
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

            <input type='text' placeholder='Nombre de la Comunidad' id='nombre_' value={nombre} onChange={(e) => setNombre(e.target.value)} />
            <input type='text' placeholder='Municipio' id='municipio_' value={municipio} onChange={(e) => setMunicipio(e.target.value)} />
            <div className='info-1'>
              <input type='text' placeholder='Código Postal' id='cp_' value={codigoPostal} onChange={(e) => setCodigoPostal(e.target.value)} />
              <input type='text' placeholder='Activo' />
            </div>
            

            <button id='recu' style={{width: '50%'}} onClick={() => validar('PUT')}>Guardar Cambios</button>
            <button className='cancelar' id='cancelarEdit' style={{width: '50%'}} onClick={closeModal}>Cancelar</button>
            </form>
          </Modal>

          <Modal
              isOpen={modalEdit}
              onAfterOpen={afterOpenModal}
              onRequestClose={closeModalEdit}
              style={customStyles}
              contentLabel="Modal Edit"
          >
            <h2 ref={(_subtitle) => (subtitle = _subtitle)} style={{color: 'black', fontSize: 35}}>Editar Usuario</h2>
            <form style={{
                width: '90%',
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center'}}>

            <div className='info-1'>
              <input type='text' placeholder='Nombre' id='nombre_' value={nombre} onChange={(e) => setNombre(e.target.value)} />
              <input type='text' placeholder='Apellido Paterno' id='ape_paterno' value={apellidoPaterno} onChange={(e) => setApellidoPaterno(e.target.value)} />
            </div>
            
            <div className='info-1'>
              <input type='text' placeholder='Apellido Materno' id='ape_materno' value={apellidoMaterno} onChange={(e) => setApellidoMaterno(e.target.value)} />
              <input type='text' placeholder='Telefono' id='telefono' value={numeroTelefoncico} onChange={(e) => setNumeroTelefoncico(e.target.value)} />
            </div>

            <div className='info-1'>
              <input type='text' placeholder='Usuario' id='usuario' value={nombreUsuario} onChange={(e) => setNombreUsuario(e.target.value)} />
              <input type='text' placeholder='Contraseña' id='password' value={contrasenia} onChange={(e) => setContrasenia(e.target.value)} />
            </div>

            <div className='info-1'>
              <input type='text' placeholder='Correo Electrónico' id='correo' value={correo} onChange={(e) => setCorreo(e.target.value)} />
              <input type='text' placeholder='Rol' id='rol' value={rol} onChange={(e) => setRol(e.target.value)} />
            </div>

            <button id='recu' style={{width: '50%'}} onClick={() => validar('PUT')}>Guardar Cambios</button>
            <button className='cancelar' id='cancelarEdit' style={{width: '50%'}} onClick={closeModal}>Cancelar</button>
            </form>
          </Modal>

          <Modal
              isOpen={modalIsOpen}
              onAfterOpen={afterOpenModal}
              onRequestClose={closeModal}
              style={customStyles}
              contentLabel="Login Modal"
          >
              <h2 ref={(_subtitle) => (subtitle = _subtitle)} style={{color: 'black', fontSize: 35}}>Registrar Usuario</h2>
              <form style={{
                  width: '90%',
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center'}}>

              <div className='info-1'>
                <input type='text' placeholder='Nombre' />
                <input type='text' placeholder='Apellido Paterno' />
              </div>

              <div className='info-1'>
                <input type='text' placeholder='Apellido Materno' />
                <input type='text' placeholder='Número de Teléfono' />
              </div>
                    
              <input type='text' placeholder='Correo Electrónico' />
              <input type='text' placeholder='Usuario' />
              <input type='text' placeholder='Contraseña' />


              <button id='recu'>Crear Usuario</button>
              <button id='cancelar' onClick={closeModal}>Cancelar</button>
              </form>
          </Modal>
        </div>
      </Flex>
        </>
    );
}