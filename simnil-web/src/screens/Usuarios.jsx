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
import ojo from '../assets/ojo.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import { show_alerta } from '../js/functions';

const customStyles = {
  content: {
    width: '55%',
    height: '81vh',
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
    const urlRoles = 'http://localhost:8080/api/simnil/rol/';
    const [usuarios, setUsuarios] = useState([]);
    const [roles, setRoles] = useState([]);
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
    const [rolName, setRolName] = useState('');    


    useEffect( () => {
      getUsuarios();
      getRoles();
    }, []);

    const getUsuarios = async () => {
      const respuesta = await axios.get(url);
      setUsuarios(respuesta.data.data);
    }

    const getRoles = async () => {
      const respuesta = await axios.get(urlRoles);
      setRoles(respuesta.data.data);
    }

    let subtitle;
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [modalEdit, setOpenEdit] = React.useState(false);

    function openModal() {
      setNombre('');
      setApellidoPaterno('');
      setApellidoMaterno('');
      setNumeroTelefoncico('');
      setNombreUsuario('');
      setContrasenia('');
      setCorreo('');
      getRoles();
      setIsOpen(true);
    }

    function afterOpenModal() {
        subtitle.style.color = '#f00';
    }

    function closeModal() {
        setIsOpen(false);
    }

    function closeModalEdit() { setOpenEdit(false); }

    const openModalEdit = async (idPersonas, nombre, apellidoPaterno, apellidoMaterno, correo, nombreUsuario, contrasenia, estatus, numeroTelefoncico, rol) => {
      setOpenEdit(true);

      let respuesta = await axios.get(urlRoles);
      respuesta = respuesta.data.data;
      let idRol, nombreRol;

      for(let i=0; i<respuesta.length; i++){
        if(respuesta[i].rol == rol){
          idRol = respuesta[i].idRol;
          nombreRol = respuesta[i].rol;
        }
      }
      setRolName(nombreRol);

      setIdPersonas(idPersonas);
      setNombre(nombre);
      setApellidoPaterno(apellidoPaterno);
      setApellidoMaterno(apellidoMaterno);
      setCorreo(correo);
      setNombreUsuario(nombreUsuario);
      setContrasenia(contrasenia);
      setEstatus(estatus);
      setNumeroTelefoncico(numeroTelefoncico);
      setRol(idRol);
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
      }  else {
        parametros = {
          idPersonas: idPersonas,
          nombre: nombre,
          apellidoPaterno: apellidoPaterno,
          apellidoMaterno: apellidoMaterno,          
          correo: correo,
          nombreUsuario: nombreUsuario,
          contrasenia: contrasenia,
          estatus: true,
          numeroTelefonico: numeroTelefoncico,
          rolBean: {
            idRol: rol
          }
        }

        enviarSolicitud(metodo, parametros, url);
        getUsuarios();
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
          } else {
            console.log("No se pudo");
            show_alerta('Usuario Almacenado Correctamente', 'success');
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
          show_alerta('Usuario Modificado Correctamente', 'success');
          getUsuarios();        
        }
      })
      .catch(function (error) {
        show_alerta('Error en la Solicitud', 'error');
        console.log(error);
      });
    }
  
    const deleteUsuario = (id_, name, validar) => {
      let mensaje, tittle, confirm;
      if(validar){
        tittle = '¿Seguro de desactivar el Usuario '+name+'?';
        mensaje = 'Se mantendrá inhabilitado hasta que se actualice manualmente';
        confirm = 'Si, Desactivar';
      } else {
        tittle = '¿Seguro de activar el Usuario '+name+'?';
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
          setIdPersonas(id_);
          enviarSolicitud('PATCH', {idPersonas:id_}, 'http://localhost:8080/api/simnil/persona/');
        } else {
          show_alerta('El usuario NO pudo ser modificado', 'info');
        }
      });
    }

    function mostrarPassword(){
      var cambio = document.getElementById("txtPassword");
      if(cambio.type == "password"){
        cambio.type = "text";
        $('.icon').removeClass('fa fa-eye-slash').addClass('fa fa-eye');
      }else{
        cambio.type = "password";
        $('.icon').removeClass('fa fa-eye').addClass('fa fa-eye-slash');
      }
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

              <div className='container-fluid'>
                <div className="row mt-3">
                  <div className="col-12 col-lg-8 offset-0 offset-lg-2" style={{width: '90%', marginLeft: '5%', fontSize: 15}}>
                    <div className="table-responsive">
                      <table className='table table-bordered'>
                        <thead>
                          <tr style={{textAlign: 'center', fontSize: 17}}>
                            <th>#</th>
                            <th>Nombre(s)</th>
                            <th>Apellidos</th>
                            <th>Usuario</th>
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
                                <td>{usuario.apellidoPaterno} {usuario.apellidoMaterno}</td>
                                <td>{usuario.nombreUsuario}</td>
                                <td>{usuario.numeroTelefonico}</td>
                                <td>{usuario.correo}</td>
                                <td>{usuario.rolBean.rol}</td>
                                <td>{usuario.estatus == true ? "Activo": "Inactivo"}</td>
                                <td style={{width: '15%'}}>
                                  <button className='btn btn-warning' style={{width: '45%'}} onClick={() => openModalEdit(
                                    usuario.idPersonas, usuario.nombre, usuario.apellidoPaterno, usuario.apellidoMaterno, usuario.correo, usuario.nombreUsuario, usuario.contrasenia, usuario.estatus, usuario.numeroTelefonico, usuario.rolBean.rol
                                  )}>
                                    <img src={edit} className='icon' style={{width: '60%'}} />
                                  </button>
                                  &nbsp;
                                  {usuario.estatus ? (
                                    <button className='btn btn-danger' style={{ width: '45%' }} onClick={() => deleteUsuario(usuario.idPersonas, usuario.nombre, true)}>
                                      <img src={trash} className='icon' style={{ width: '60%' }} />
                                    </button>
                                  ) : (
                                    <button className='btn' style={{ width: '45%', backgroundColor: 'green' }} onClick={() => deleteUsuario(usuario.idPersonas, usuario.nombre, false)}>
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
            <h2 ref={(_subtitle) => (subtitle = _subtitle)} style={{color: 'black', fontSize: 35}}>Editar Usuario</h2>
            <form style={{
                width: '90%',
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center'}}>

              <div className='info-1'>
                <div className="field">
                  <span className='labInp'>Nombre(s)</span>
                  <input required type='text' placeholder='Nombre' value={nombre} onChange={(e) => setNombre(e.target.value)} />
                </div>

                <div className="field">
                  <span className='labInp'>Apellido Paterno</span>
                  <input required type='text' placeholder='Apellido Paterno' value={apellidoPaterno} onChange={(e) => setApellidoPaterno(e.target.value)} />
                </div>
              </div>

              <div className='info-1'>
                <div className="field">
                  <span className='labInp'>Apellido Materno</span>
                  <input required type='text' placeholder='Apellido Materno' value={apellidoMaterno} onChange={(e) => setApellidoMaterno(e.target.value)} />
                </div>

                <div className="field">
                  <span className='labInp'>Núm. de Teléfono</span>
                  <input required type='tel' maxLength={10} minLength={10} min={0} placeholder='Número de Teléfono' value={numeroTelefoncico} onChange={(e) => setNumeroTelefoncico(e.target.value)} />
                </div>
              </div>

              <div className='info-1'>
                <div className="field">
                  <span className='labInp'>Nombre de Usuario</span>
                  <input required type='text' placeholder='Usuario' value={nombreUsuario} onChange={(e) => setNombreUsuario(e.target.value)} />
                </div>

                <div className="field">
                  <span className='labInp'>Contraseña</span>
                  <div className="input-group" style={{width: '80%'}}>
                    <input required type='password' id='txtPassword' placeholder='Contraseña'  value={contrasenia} onChange={(e) => setContrasenia(e.target.value)} />
                    <div>
                      <button id="show_password" className="btn btn-primary" type="button"  onClick={() => mostrarPassword()}> <img className='showPassword' src={ojo} /> </button>
                    </div>
                  </div>                  
                </div>
              </div>
                    
              <div className="field">
                <span className='labInp'>Correo Electrónico</span>
                <input required type='email' placeholder='Correo Electrónico' value={correo} onChange={(e) => setCorreo(e.target.value)} />
              </div>
              
              <select required onChange={(e) => setRol(e.target.value)} id='listaRol'>
              <option id='selected' value={rol}>{rolName}</option>
              {roles.map( (rol) => (
                <option key={rol.idRol} value={rol.idRol}>{rol.rol}</option>
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
              contentLabel="Login Modal">
              <h2 ref={(_subtitle) => (subtitle = _subtitle)} style={{color: 'black', fontSize: 35}}>Registrar Usuario</h2>
              <form style={{
                  width: '90%',
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center'}}>

              <div className='info-1'>
                <div className="field">
                  <span className='labInp'>Nombre(s)</span>
                  <input required type='text' placeholder='Nombre' value={nombre} onChange={(e) => setNombre(e.target.value)} />
                </div>

                <div className="field">
                  <span className='labInp'>Apellido Paterno</span>
                  <input required type='text' placeholder='Apellido Paterno' value={apellidoPaterno} onChange={(e) => setApellidoPaterno(e.target.value)} />
                </div>
              </div>

              <div className='info-1'>
                <div className="field">
                  <span className='labInp'>Apellido Materno</span>
                  <input required type='text' placeholder='Apellido Materno' value={apellidoMaterno} onChange={(e) => setApellidoMaterno(e.target.value)} />
                </div>

                <div className="field">
                  <span className='labInp'>Núm. de Teléfono</span>
                  <input required type='tel' maxLength={10} minLength={10} placeholder='Número de Teléfono' value={numeroTelefoncico} onChange={(e) => setNumeroTelefoncico(e.target.value)} />
                </div>
              </div>

              <div className='info-1'>
                <div className="field">
                  <span className='labInp'>Nombre de Usuario</span>
                  <input required type='text' placeholder='Usuario' value={nombreUsuario} onChange={(e) => setNombreUsuario(e.target.value)} />
                </div>

                <div className="field">
                  <span className='labInp'>Contraseña</span>
                  <div className="input-group" style={{width: '80%'}}>
                    <input required type='password' id='txtPassword' placeholder='Contraseña'  value={contrasenia} onChange={(e) => setContrasenia(e.target.value)} />
                    <div>
                      <button id="show_password" className="btn btn-primary" type="button"  onClick={() => mostrarPassword()}> <img className='showPassword' src={ojo} /> </button>
                    </div>
                  </div>                  
                </div>
              </div>
              
              <div className="field">
                <span className='labInp'>Correo Electrónico</span>
                <input required type='email' placeholder='Correo Electrónico' value={correo} onChange={(e) => setCorreo(e.target.value)} />
              </div>
              
              
              <select required onChange={(e) => setRol(e.target.value)} id='listaRol'>
              <option id='selected' value={null}>Selecciona Rol</option>
              {roles.map( (rol) => (
                <option key={rol.idRol} value={rol.idRol}>{rol.rol}</option>
              ) )}
            </select>

              <div className="acciones">
                <button id='recu' onClick={() => {if(rol != null || rol != '') validar('POST')}}>Crear Usuario</button>
                <button id='cancelar' className='cancelar' onClick={closeModal}>Cancelar</button>
              </div>
              
              </form>
          </Modal>
        </div>
      </Flex>
        </>
    );
}