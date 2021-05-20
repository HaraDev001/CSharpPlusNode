$('[data-toggle="tooltip"]').tooltip();
function OpcionesSel(tipo, table) {
    var e = $('#' + table + ' tbody input[type="checkbox"]:checked');
    var c = e.length;
    if (tipo == 6) {
        var xmlData1 = [];
        $('#mdlImpr').modal('show');
        if (c > 0) {
            for (var i = 0; i < c; i++) {
                xmlData1.push({ 'Nombre': e[i].dataset.grupo, 'idUsuario': e[i].dataset.idusuario, 'NombreCompleto': e[i].dataset.nombrecompleto, 'NombreUsuario': e[i].dataset.nombreusuario, 'Contrasena': e[i].dataset.contrasena, });
            }
            ImprimirUsuario(xmlData1, $('#idRol').val(), $('#lbl_colegio').html());
        }
        else {
            $('#msjPrint').show();
            $('#wrapper1').hide();
            $('#msjPrint').html('<div class="alert alert-warning alert-dismissible"><h4><i class="icon fa fa-warning"></i> No ha Seleccionado Usuarios para Imprimir!</h4></div >');
        }
    }
    else if (tipo != 6) {
        var xmlData = '';
        if (c > 0) {
            xmlData = ValidarXmlData(e);
            if (xmlData.length === 0)
                exit;
        }
        else {
            $('#delete_dialog').modal('show');
        }
        ModalMensaje(tipo, xmlData, c);
    }
}
function ButtonOpction(tipo) {
    var parameters = { "xmlData": $('#XmlOption').val(), "idOpcion": tipo, "idSubnivel": -1 };
    console.log(parameters)
    jQueryAjaxCallback("../Shared/Utility.aspx/EstatusUser", JSON.stringify(parameters), "POST", "json", PostAccionAlumnoGrupo, false);
    $('#delete_dialog').modal('hide');
}

function ModalMensaje(tipo, xmlData, c) {
    $('#XmlOption').val(xmlData);
    var non = '', header = '';
    $('#oBotonesEliminar_').html('<button class="btn btn-default" data-dismiss="modal" type="button">Cancelar</button><button onclick="ButtonOpction(' + tipo + ');" class="btn btn-primary float-right" type="button">Continuar</button>');
    if (tipo == 1) {
        header = 'Confirmar Accion de Eliminacion';
        non = 'eliminarlos';
    }
    else if (tipo == 4) {
        header = 'Confirmar Accion de Desbloqueo';
        non = 'desbloquearlos';
    }
    else if (tipo == 3) {
        header = 'Confirmar Accion de Bloqueo';
        non = 'bloquearlos';
    }
    $('#delete_dialog').modal('show');
    $('#nombreD').html(header);
    $('#oP').html('Se han seleccionado ' + c + ' usuarios para ' + non + ', desea continuar?');
}
$(function () {
    var parameters = { "input": -1 };
    jQueryAjaxCallback("../Shared/Utility.aspx/cargarMetodologia", JSON.stringify(parameters), "POST", "json", cargarSelectMetodologia, false);
});
function IIA() {
    Nivel();
    $('#modalInfoAlumno').modal('show');
}
function SelCrear() {
    $('#mcusuario').modal('show');
}
function UpdateUsuario() {
    var idOpcion = $('#idOpcionEditUser').val();
    var usuario = $('#TxtUsuario').val();
    var contrasena = $('#txtContrasena').val();
    var idUsuario = $('#idUsuario').val();
    var EmailEnviar = $('#EmailEnviar').val();
    var nombre = $('#nombre_email').text();
    if (usuario.length == 0) {
        fnAlertEstado("false", 'No puede dejar campos en blanco.', 'div_alert_user');
        return;
    }
    if (contrasena.length == 0) {
        fnAlertEstado("false", 'No puede dejar campos en blanco.', 'div_alert_user');
        return;
    }
    var parameters = { "Nombre": nombre, "usuario": usuario, "contrasena": contrasena, "idUsuario": idUsuario, "Email": EmailEnviar, "idOpcion": idOpcion };
    jQueryAjaxCallback("../Shared/Utility.aspx/UpdateUsuario", JSON.stringify(parameters), "POST", "json", PostUpdateUsuario, false);
}
function PostUpdateUsuario(data) {
    var user = $.parseJSON(data.d);
    if (user[0].value == 1) {
        Message(1, 'Se ha editado y enviado el Usuario exitosamente', 'Mensaje Exitoso');
        $('#editUser').modal('hide');
        GetCustomers(-1, 1, -1, $('#idRol').val());
        $('.SearchA').val('');
        $('.SearchE').val('');
        $('.Search').val('');
    }
    else if (user[0].value == 0)
        fnAlertEstado("false", 'El Usuario ya existe, favor de intentar con otro nombre de usuario a cambiar.', 'div_alert_user');
}
function permisos_modal(NombreCompleto, idUsuariot) {
    idUsuario = idUsuariot  //llenamos variable externa con valor pasado a esta funcion
    mostrarPaginas(idUsuario)
    $('#ModalPermisos').modal('show');
    $('#nombreP').html(NombreCompleto);
}
function PostPermisos(data) {
    var m = $.parseJSON(data.d);
    var counter = 0;
    var arrayLength = m.length;
    while (counter < arrayLength) {
        counter++;
    }
}
function GuardarPermisos() {
    //recorrer los check
    var XmlPermisos = '';
    //var parameters = { "idUsuario": idUsuario, "XmlPermisos": XmlPermisos };
    //jQueryAjaxCallback("../Shared/Utility.aspx/GuardarPermisos", JSON.stringify(parameters), "POST", "json", PostGuardarPermisos);
}
function PostGuardarPermisos() {
    $('#ModalPermisos').modal('hide');
    Message(1, 'Se han Guardado los permisos', 'Mensaje Exitoso');
}
function UserEdit(nombre1, idUsuario, nombre2, contrasena, email, idOpcion) {
    $('#nombre_email').html('<i class="fa fa-envelope-open-o"></i> ' + nombre1);
    $('#idUsuario').val(idUsuario);
    $('#editUser').modal('show');
    $('#div_alert_user').hide();
    $('#TxtUsuario').val(nombre2);
    $('#txtContrasena').val(contrasena);
    $('#EmailEnviar').val(email);
    $('#idOpcionEditUser').val(idOpcion);
    if (idOpcion == 2) {
        $('#DivEmail').hide();
        $('#btnEditUser').text('Restaurar Usuario y Contraseña');
        $('#msjred').hide();
    }
    else {
        $('#DivEmail').show();
        $('#btnEditUser').text('Enviar usuario por email');
        $('#msjred').show();
    }
}
function OnsuccessUsuario(data) {
    fnAlertEstado("true", '', 'div_alert');
    GetCustomers(-1, 1, -1, $('#idRol').val());
}
function change_metodologia() {
    var DesactivarUsuarioPorPeriodo = $('#ddlMetodologia option:selected').attr('DesactivarUsuarioPorPeriodo');
    if (ConverterBool(DesactivarUsuarioPorPeriodo) == true) {
        $('#subnivel').hide();
        GetCustomers(-1, 1, 1, $('#idRol').val());
    }
    else if (ConverterBool(DesactivarUsuarioPorPeriodo) == false) {
        $('#subnivel').show();
        GetCustomers(-1, 1, 1, $('#idRol').val());
    }
}
function cargarSelectMetodologia(data) {
    var m = $.parseJSON(data.d);
    var counter = 0;
    var idTipoMetodologiaInicial = -1;
    var idTipoMetodologiaIniciaD = -1;
    var arrayLength = m.length;
    while (counter < arrayLength) {
        var select = document.getElementById('ddlMetodologia');
        var opt = document.createElement('option');
        opt.value = m[counter].id;
        opt.innerHTML = m[counter].nombre;
        opt.setAttribute("DesactivarUsuarioPorPeriodo", m[counter].DesactivarUsuarioPorPeriodo);
        opt.setAttribute("UsarUsEn", m[counter].UsarUsEn);
        opt.setAttribute("nombre", m[counter].nombre);
        select.appendChild(opt);
        if (ConverterBool(m[counter].DesactivarUsuarioPorPeriodo) == true)
            idTipoMetodologiaInicial = m[counter].id;
        else if (ConverterBool(m[counter].DesactivarUsuarioPorPeriodo) == false)
            idTipoMetodologiaIniciaD = m[counter].id;
        ++counter;
    }
    var DesactivarUsuarioPorPeriodo = $('#ddlMetodologia option:selected').attr('DesactivarUsuarioPorPeriodo');
    LoadCreacionUsuario(DesactivarUsuarioPorPeriodo);
    $('#Estatus').val('1');
    CallContadoresusuarios();
    console.log($('#ddlMetodologia option:selected').attr('UsarUsEn'))
    if ($('#ddlMetodologia option:selected').attr('UsarUsEn') ==0) {
        $('#vistaEncargado').hide();
    }
    else if ($('#ddlMetodologia option:selected').attr('UsarUsEn') == 1)
        $('#vistaEncargado').show();
    if (m[0].cantidad_metodologias == 1) {
        if (ConverterBool(DesactivarUsuarioPorPeriodo) == true) {
            $('#LinkCreaAlum').attr("href", "StudentDetail?x1=2");
        }
        else if (ConverterBool(DesactivarUsuarioPorPeriodo) == false) {
            $('#LinkCreaAlum').attr("href", "StudentDetailDiurno?x1=2");
        }
    }
    if (ConverterBool(DesactivarUsuarioPorPeriodo) == false) {
        $('#subnivel').show();
        cargar_grupos();
    }
    else if (ConverterBool(DesactivarUsuarioPorPeriodo) == true) {
        $('#subnivel').hide();
        GetCustomers(-1, 1, -1, 5);
    }
}
function CallContadoresusuarios() {
    var parameters = {};
    jQueryAjaxCallback("../Shared/Utility.aspx/CallContaUsuarios", JSON.stringify(parameters), "POST", "json", PostContadores, false);
}
function PostContadores(data) {
    var m = $.parseJSON(data.d);
    $('#contAl').html(m[0].contAl);
    $('#contDo').html(m[0].contDo);
    $('#contAD').html(m[0].contAd);
    $('#contEn').html(m[0].contEn);
}
function LoadCreacionUsuario(DesactivarUsuarioPorPeriodo) {
    if (ConverterBool(DesactivarUsuarioPorPeriodo) == true) {
        var urlstudent = 'StudentDetail';
    }
    else {
        var urlstudent = 'StudentDetailDiurno';
    }
    $('#MenuCreacion').append('<div class="col-sm-6" style="border-right: 1px solid #e7eaec;"><h4>Alumno Diurno</h4><p class="text-center">' +
        '<a id="LinkDiur" target="_blank" onclick="$("#MenuCreacion").modal("hide");" href="StudentDetailDiurno?x1=2">' +
        '<i class="fa fa-child fa-5x text-aqua"></i></a></p></div>' +
        '<div class="col-sm-6"><h4>Alumno Laboral</h4><p class="text-center"><a id="LinkLAb" target="_blank" onclick="$("#MenuCreacion").modal("hide");" href="StudentDetail?x1=2">' +
        '<i class="fa fa-child fa-5x text-aqua"></i></a>' +
        '</p ></div > ');
}
function cargar_grupos() {
    var parameters = { "select": "Subnivel", "idPeriodo": -1 };
    jQueryAjaxCallback("../Shared/Utility.aspx/loadSelectOptionsUsuario", JSON.stringify(parameters), "POST", "json", CargarGruposSuccess, false);
}
function CargarGruposSuccess(data) {
    var counter = 0;
    $('#subnivel').find('option').remove().end();
    $('#ddlSubnivelEncargados').find('option').remove().end();    
    if (counter == 0) {
        var select = document.getElementById('subnivel');
        var select2 = document.getElementById('ddlSubnivelEncargados');
        var opt = document.createElement('option');
        var opt2 = document.createElement('option');
        opt.value = -1;
        opt2.value = -1;
        opt.innerHTML = '- Todos los Grupos -';
        opt2.innerHTML = '- Todos los Grupos -';
        select.appendChild(opt);
        select2.appendChild(opt2);
    }
    var objArray = $.parseJSON(data.d);
    var arrayLength = objArray.length;
    while (counter < arrayLength) {
        var select = document.getElementById('subnivel');
        var select2 = document.getElementById('ddlSubnivelEncargados');
        var opt = document.createElement('option');
        var opt2 = document.createElement('option');
        opt.value = objArray[counter].id;
        opt2.value = objArray[counter].id;
        opt.innerHTML = objArray[counter].Nombre;
        opt2.innerHTML = objArray[counter].Nombre;
        select.appendChild(opt);
        select2.appendChild(opt2);
        ++counter;
    }
    GetCustomers(-1, 1, -1, 5);
}
//function ChangeStatus(idUsuario, status, accion) {
//    $('.SearchA').val('');
//    $('.SearchE').val('');
//    $('.Search').val('');
//    $('.TableU Tbody').empty();
//    $('#_accion').val(accion);
//    var parameters = { "idUsuario": idUsuario, "status": status };
//    jQueryAjaxCallback("../Shared/Utility.aspx/ChangeStatus", JSON.stringify(parameters), "POST", "json", PostChangeStatus, false);
//}
//function PostChangeStatus(data) {
//    Message(1, 'Se ha bloqueado el usuario exitosamente', 'Mensaje Exitoso');
//    if ($('#_accion').val() == 1) {
//        GetCustomers(-1, 1, 1, $('#idRol').val());
//    }
//    else if ($('#_accion').val() == 0) {
//        GetCustomers(-1, 1, 1, $('#idRol').val());
//        GetCustomers(-1, 1, 0, $('#idRol').val());
//    }
//}
function GetCustomers(idUsuario, function_, Estatus, idRol) {
    CallContadoresusuarios();
    if (Estatus >= 0) {
        $('#Estatus').val(Estatus);
    }
    //$(".Search").keyup(function () {//que es esto?
    //    if ($(this).val() != "") {
    //        $(".TableU tbody>tr").hide();
    //        $(".TableU td:contains-ci('" + $(this).val() + "')").parent("tr").show();
    //    }
    //    else {
    //        $(".TableU tbody>tr").show();
    //    }
    //});
    $('#idRol').val(idRol);
    if (function_ == 1) {
        $('.TableU Tbody').empty();
    }
    idSubnivel = $('#subnivel').val();
    var DesactivarUsuarioPorPeriodo = ConverterBool($('#ddlMetodologia option:selected').attr('DesactivarUsuarioPorPeriodo'));
     if (idRol == 5) {
        if (DesactivarUsuarioPorPeriodo == true) {            
            idSubnivel = -1;
        }
        if (DesactivarUsuarioPorPeriodo == false) {            
            if (idUsuario != -1)
            { idSubnivel = -1; }
        }
    }
    else if (idRol == 19) {
         idSubnivel = $('#ddlSubnivelEncargados').val();
    }
    if (idSubnivel == '') idSubnivel = -1;
    var parameters = { "rol": idRol, "idSubnivel": idSubnivel, "Estatus": $('#Estatus').val() };
    if (function_ == 1) {
        jQueryAjaxCallback("../Shared/Utility.aspx/GetUsuarios", JSON.stringify(parameters), "POST", "json", OnSuccess, true);
    }
    else
        jQueryAjaxCallback("../Shared/Utility.aspx/GetUsuarios", JSON.stringify(parameters), "POST", "json", PrintCintillo);
}
function ALBLOQ() {
    $('#MultiCustomer').modal('show');
    $('#SubMenuMulti').html('<button type="button" onclick="AccionAlumnoGrupo(4, -1, 0);" class="btn btn-default btn-sm"><i class="fa fa-unlock-alt font-medium-4"></i> Desbloquear</button>' +
        '<button type="button" onclick="AccionAlumnoGrupo(1, 1, 0);" class="btn btn-default btn-sm"><i class="fa fa-trash-o font-medium-4"></i> Eliminar</button></div>');
    $('#TblMulti Tbody').empty();
    $('#titModMulti').text('Lista de Alumnos Bloqueados');
    $('.tbmultig').show();
    $('#Estatus').val(0);
    var parameters = { "rol": $('#idRol').val(), "idSubnivel": -1, "Estatus": 2 };
    jQueryAjaxCallback("../Shared/Utility.aspx/GetUsuarios", JSON.stringify(parameters), "POST", "json", OnSuccess);
}
function ALBLOQ_PROF() {
    $('#SubMenuMulti').html('<button type="button" onclick="AccionAlumnoGrupo(4, -1, 0);" class="btn btn-default btn-sm"><i class="fa fa-unlock-alt font-medium-4"></i> Desbloquear</button>' +
        '<button type="button" onclick="AccionAlumnoGrupo(1, -1, 0);" class="btn btn-default btn-sm"><i class="fa fa-trash-o font-medium-4"></i> Eliminar</button>');
    $('#TblMulti Tbody').empty();
    $('#titModMulti').text('Lista de Docentes Bloqueados');
    $('#Estatus').val(0);
    $('.tbmultig').hide();
    var parameters = { "rol": $('#idRol').val(), "idSubnivel": $('#subnivel').val(), "Estatus": 2 };
    jQueryAjaxCallback("../Shared/Utility.aspx/GetUsuarios", JSON.stringify(parameters), "POST", "json", OnSuccess);
}
function ALELIM_PROF() {
    $('#SubMenuMulti').html('<button type="button" onclick="AccionAlumnoGrupo(5, -1, 2);" class="btn btn-default btn-sm"><i class="fa fa-trash-o font-medium-4"></i> Restaurar</button>');
    $('#TblMulti Tbody').empty();
    $('#titModMulti').text('Lista de Docentes Eliminados');
    $('.tbmultig').hide();
    $('#Estatus').val(2);
    var parameters = { "rol": $('#idRol').val(), "idSubnivel": $('#subnivel').val(), "Estatus": 0 };
    jQueryAjaxCallback("../Shared/Utility.aspx/GetUsuarios", JSON.stringify(parameters), "POST", "json", OnSuccess);
}

function ALBLOQ_ADM() {
    $('#SubMenuMulti').html('<button type="button" onclick="AccionAlumnoGrupo(4, -1, 0);" class="btn btn-default btn-sm"><i class="fa fa-unlock-alt font-medium-4"></i> Desbloquear</button>' +
        '<button type="button" onclick="AccionAlumnoGrupo(1, -1, 0);" class="btn btn-default btn-sm"><i class="fa fa-trash-o font-medium-4"></i> Eliminar</button>');
    $('#TblMulti Tbody').empty();
    $('#titModMulti').text('Lista de Administradores Bloqueados');
    $('#Estatus').val(0);
    $('.tbmultig').hide();
    var parameters = { "rol": $('#idRol').val(), "idSubnivel": $('#subnivel').val(), "Estatus": 2 };
    jQueryAjaxCallback("../Shared/Utility.aspx/GetUsuarios", JSON.stringify(parameters), "POST", "json", OnSuccess);
}
function ALELIM_ADM() {
    $('#SubMenuMulti').html('<button type="button" onclick="AccionAlumnoGrupo(5, -1, 2);" class="btn btn-default btn-sm"><i class="fa fa-trash-o font-medium-4"></i> Restaurar</button>');
    $('#TblMulti Tbody').empty();
    $('#titModMulti').text('Lista de Administradores Eliminados');
    $('.tbmultig').hide();
    $('#Estatus').val(2);
    var parameters = { "rol": $('#idRol').val(), "idSubnivel": $('#subnivel').val(), "Estatus": 0 };
    jQueryAjaxCallback("../Shared/Utility.aspx/GetUsuarios", JSON.stringify(parameters), "POST", "json", OnSuccess);
}
function ALELIM() {
    $('#ModalEliminados').modal('show');
    $('#TblEliminados Tbody').empty();   
    $('#Estatus').val(2);
    CargarEliminados();
}
function CargarEliminados() {
    $('#GenericoBuscadorElim').val('');
    var parameters = {};
    jQueryAjaxCallback("../Shared/Utility.aspx/GetUsuariosEliminados", JSON.stringify(parameters), "POST", "json", PostALELIM);
}
function PostALELIM(data) {
    var m = $.parseJSON(data.d);
    var counter = 0;
    var url = '';
    var arrayLength = m.length;  
    var du = $('#ddlMetodologia option:selected').attr('DesactivarUsuarioPorPeriodo');
    while (counter < arrayLength) {  
        if (ConverterBool(du) === false) {
            url = ' style="cursor:pointer;" href="StudentDetailDiurno?x1=4&x2=' + m[counter].idUsuario + '"';
        }
        else if (ConverterBool(du) == true) {
            url = ' style="cursor:pointer;" href="StudentDetail?x1=4&x2=' + m[counter].idUsuario + '"';
        }
        $('#TblEliminados tbody').append('<tr><td><input class="ocultar" data-idusuario="' + m[counter].idUsuario + '" style="position:relative;left:auto;opacity:initial;" type="checkbox"></td>' +
            '<td><a target="_blank" ' + url +'><div class="user-page-info"><h6 class=text-aqua "mb-0">' + (counter + 1) + '. ' + m[counter].NombreCompleto + '</h6>' +
            '<span class="text-aqua font-small-2">' + m[counter].Cedula + '</span></div></a></td>' +
            '<td><a target="_blank" '+url+' class="btn btn-sm btn-primary"> Ver Perfil</a></td></tr> ');
        counter++;
    }
}
function RestaurarEliminado() { }
function MostrarIngresos(idUsuario) {
    $('#ModalIngresos').modal('show');
    $('#TblIngresos tbody').empty();
    var parameters = { "idUsuario":idUsuario};
    jQueryAjaxCallback("../Shared/Utility.aspx/GetTotalIngresos", JSON.stringify(parameters), "POST", "json", PostMostrarIngresos);    
}
function PostMostrarIngresos(data) {
    var m = $.parseJSON(data.d);
    var arrayLength = m.length;
    var counter = 0;
    while (counter < arrayLength) {
        $('#TblIngresos tbody').append('<tr><td>' + (counter + 1) + '</td><td>' + m[counter].Accion + '</td><td>' + moment(m[counter].Fecha).format('lll') +'</td></tr>');
        counter++;
    }
}
function OnSuccess(data) {
    console.log(data);
    var m = $.parseJSON(data.d);    
    var counter = 0, url = '', permisos = '', htmlTable = '', table = '', Grupo = '', arrayLength = m.length, idRol = $('#idRol').val(), du = $('#ddlMetodologia option:selected').attr('DesactivarUsuarioPorPeriodo');
    while (counter < arrayLength) {
        row = counter + 1;
        permisos = '';
        var spanRed = '';
        if (idRol == 5) {
            //tabla donde se vaa imprmir la lista de usuarios
            if (m[counter].Estatus == 0)
                table = 'TblMulti';
            else if (m[counter].Estatus == 1) {
                table = 'gvCustomers';
            }  
            else if (m[counter].Estatus == 2) {
                table = 'gvCustomers';
            }   
            if (ConverterBool(du) === false) {//si es diurno
                Grupo = '<td>' + m[counter].Grupo + '</td>';
                if (m[counter].Estatus == 1) {
                    spanRed = '';
                    url = ' style="cursor:pointer;" onclick="ViewPerfil(' + m[counter].idUsuario + ');" ';
                }
                else if (m[counter].Estatus == 2) {
                    spanRed = '<span class="" style="font-size: 14px;color:red;"><i class="fa fa-lock text-red"></i> Bloqueado</span>';
                    url = ' style="cursor:pointer;" onclick="ViewPerfil(' + m[counter].idUsuario + ');" ';
                }
            }
            else if (ConverterBool(du) == true) {//si es laboral
                spanRed = '';
                Grupo = '<td>' + m[counter].Grupo + '</td>';
                url = ' style="cursor:pointer;" onclick="ViewPerfil(' + m[counter].idUsuario + ');" ';
                if (m[counter].Estatus == 2) 
                    spanRed = '<span class="" style="font-size: 14px;color:red;"><i class="fa fa-lock text-red"></i> Bloqueado</span>';
            }
        }
        else if (idRol == 1) {
            if (m[counter].Estatus == 0) {
                table = 'TblMulti';
                url = ' style="cursor:pointer;" href="UsuarioDetails?x1=1&x2=' + m[counter].idUsuario + '&x4=1"';
            }
            else if (m[counter].Estatus != 0) {
                table = 'gvCustomersAdmin';
                url = ' style="cursor:pointer;" onclick="ViewPerfil(' + m[counter].idUsuario + ');" ';
                permisos = '<div class="dropdown-divider"></div><a onclick="permisos_modal(\'' + m[counter].NombreCompleto + '\',' + m[counter].idUsuario + ');" class="dropdown-item" href="#"><i class="fa fa-check-square-o" ></i> Permisos</a>';
                if (m[counter].Estatus == 2)
                    spanRed = '<span class="" style="font-size: 14px;color:red;"><i class="fa fa-lock text-red"></i> Bloqueado</span>';
            }
        }
        else if (idRol == 4) {
            if (m[counter].Estatus == 0) {
                table = 'TblMulti';
                url = ' style="cursor:pointer;" href="UsuarioDetails?x1=1&x2=' + m[counter].idUsuario + '&x4=4"';
            }
            else if (m[counter].Estatus != 0) {
                table = 'gvCustomersDocente';
                url = ' style="cursor:pointer;" onclick="ViewPerfil(' + m[counter].idUsuario + ');" ';
                if (m[counter].Estatus == 2) 
                    spanRed = '<span class="" style="font-size: 14px;color:red;"><i class="fa fa-lock text-red"></i> Bloqueado</span>';
            }
        }
        else if (idRol == 19) {
            Grupo = '<td>' + m[counter].Parentesco + '</td><td>' + m[counter].Grupo + '</td>';
            table = 'gvCustomersEncargado';
            url = ' style="cursor:pointer;" onclick="ViewPerfil(' + m[counter].idUsuario + ');" ';
        }
        if (m[counter].Estatus ==0)// esta bloqueado o eliminado
        {
            htmlTable += '<tr><td><input class="ocultar" data-grupo="' + m[counter].Grupo + '" data-contrasena="' + m[counter].Contrasena + '" data-nombreusuario="' + m[counter].NombreUsuario + '" data-nombrecompleto="' + m[counter].NombreCompleto + '" data-idusuario="' + m[counter].idUsuario + '" style="position:relative;left:auto;opacity:initial;" type="checkbox"></td>' +
                '<td><a ' + url + '><div class="user-page-info"><h6 class="text-aqua mb-0">' + (counter + 1) + '. ' + m[counter].NombreCompleto + '</h6>' +
                '<span class="text-aqua font-small-2">' + m[counter].Cedula + '</span></div></a></td>' +
                Grupo +
                '<td>' + m[counter].NombreUsuario + '</td>' +
                '<td>' + m[counter].Contrasena + '</td>' +
                '<td style="text-align:center">' + m[counter].Ingresos + '</td></tr>';
        }
        else if (m[counter].Estatus != 0)// esta activo o bloqueado
        {
            htmlTable += '<tr><td><input class="ocultar" data-grupo="' + m[counter].Grupo + '" data-contrasena="' + m[counter].Contrasena + '" data-nombreusuario="' + m[counter].NombreUsuario + '" data-nombrecompleto="' + m[counter].NombreCompleto + '" data-idusuario="' + m[counter].idUsuario + '" style="position:relative;left:auto;opacity:initial;" type="checkbox"></td>' +
                '<td><a ' + url + ' style="font-size: 14px;"><div class="user-page-info"><h6 class="text-aqua mb-0">' + (counter + 1) + '. ' + m[counter].NombreCompleto + '</h6>' +
                '<span class="text-aqua font-small-2">' + m[counter].Cedula + spanRed+'</span></div></a></td>' +
                Grupo + '<td>' + m[counter].NombreUsuario + '</td>' +
                '<td>' + m[counter].Contrasena + '</td>' +
                '<td style="text-align:center"><button class="btn btn-primary btn-sm" type="button" onclick="MostrarIngresos(' + m[counter].idUsuario + ');"><i class="fa fa-user"></i> ' + m[counter].Ingresos + '</button></td>' +
                '<td>' +               
                '<div class="input-group-btn">'+
                    '<button type="button" class="btn btn-primary btn-sm dropdown-toggle" data-toggle="dropdown" aria-expanded="false">Más Opciones</button>'+
                    '<div class="dropdown-menu" x-placement="bottom-start" style="position: absolute; transform: translate3d(0px, 38px, 0px); top: 0px; left: 0px; will-change: transform;">'+
                '<a class="dropdown-item" href="#" onclick="UserEdit(\'' + m[counter].NombreCompleto + '\',\'' + m[counter].idUsuario + '\',\'' + m[counter].NombreUsuario + '\',\'' + m[counter].Contrasena + '\',\'' + m[counter].Email + '\',1)" ><i class="fa fa-envelope-open-o"></i> Enviar Contraseña al correo</a>'+
                '<a class="dropdown-item" onclick="ChangeUserNewVersion(' + m[counter].idUsuario + ',' + idRol +',0);" href="#"><i class="fa fa-envelope-open-o"></i> Utilizar Sesión</a>'+
                '<a class="dropdown-item" href="#" onclick="UserEdit(\'' + m[counter].NombreCompleto + '\',\'' + m[counter].idUsuario + '\',\'' + m[counter].NombreUsuario + '\',\'' + m[counter].Contrasena + '\',\'' + m[counter].Email + '\',2)"><i class="fa fa-eercast"></i> Restaurar Usuario y Contraseña</a>'+
                permisos+
                    '</div>'+
                '</div > '    +    
               '</td>' +
                '</tr>';
        }
        counter++;
    }
    $('#' + table + ' tbody').html(htmlTable);
    $(".SearchA").attr("readonly", false);
    $(".SearchE").attr("readonly", false);
    $(".Search").attr("readonly", false);
}
function test1() {
    var vla = $('.checkbox-toggleu').attr('data-par');
    if (vla == 0) {
        $("#gvCustomers input:checkbox").attr('checked', 'checked');
        $('.checkbox-toggleu').html('<i class="fa fa-check-square-o font-medium-4""></i>');
        $('.checkbox-toggleu').attr('data-par', '1');
    }
    else {
        $("#gvCustomers input:checkbox").attr('checked', false);
        $('.checkbox-toggleu').html('<i class="fa fa-square-o font-medium-4""></i>');
        $('.checkbox-toggleu').attr('data-par', '0');
    }
}
function test2() {
    var vla = $('.checkbox-toggled').attr('data-par');
    if (vla == 0) {
        $("#gvCustomersDocente input:checkbox").attr('checked', 'checked');
        $('.checkbox-toggled').html('<i class="fa fa-check-square-o font-medium-4""></i>');
        $('.checkbox-toggled').attr('data-par', '1');
    }
    else {
        $("#gvCustomersDocente input:checkbox").attr('checked', false);
        $('.checkbox-toggled').html('<i class="fa fa-square-o font-medium-4""></i>');
        $('.checkbox-toggled').attr('data-par', '0');
    }
}
function test3() {
    var vla = $('.checkbox-togglea').attr('data-par');
    if (vla == 0) {
        $("#gvCustomersAdmin input:checkbox").attr('checked', 'checked');
        $('.checkbox-togglea').html('<i class="fa fa-check-square-o font-medium-4""></i>');
        $('.checkbox-togglea').attr('data-par', '1');
    }
    else {
        $("#gvCustomersAdmin input:checkbox").attr('checked', false);
        $('.checkbox-togglea').html('<i class="fa fa-square-o font-medium-4""></i>');
        $('.checkbox-togglea').attr('data-par', '0');
    }
}
function test4() {
    var vla = $('.checkbox-togglen').attr('data-par');
    if (vla == 0) {
        $("#gvCustomersEncargado input:checkbox").attr('checked', 'checked');
        $('.checkbox-togglen').html('<i class="fa fa-check-square-o font-medium-4""></i>');
        $('.checkbox-togglen').attr('data-par', '1');
    }
    else {
        $("#gvCustomersEncargado input:checkbox").attr('checked', false);
        $('.checkbox-togglen').html('<i class="fa fa-square-o font-medium-4""></i>');
        $('.checkbox-togglen').attr('data-par', '0');
    }
}
function ValidarXmlData(objeto) {
    var xmlData = '<xmlData>';
    if (objeto.length > 0) {
        for (var i = 0; i < objeto.length; i++) {
            xmlData += '<data ';
            xmlData += ' idUsuario="' + objeto[i].dataset.idusuario + '" />';
        }
        xmlData += '</xmlData>';
    }
    else
        xmlData = '';
    return xmlData;
}
function AccionAlumnoGrupo(tipo, idSubnivel, accion) {
    if ((tipo == 1) || (tipo == 4) || (tipo == 5)) {
        $('#_accion').val(accion);
        if (tipo == 5) {
            if($('#idRol').val() == 5)
                var inputCheck = $('#TblEliminados tbody tr input[type="checkbox"]:checked');
            else if ($('#idRol').val() != 5)
                var inputCheck = $('#TblMulti tbody tr input[type="checkbox"]:checked');
            var xmlData = ValidarXmlData(inputCheck);
            $('#TblEliminados tbody').empty();
            $('#TblMulti tbody').empty();
        }
        else {
            var inputCheck = $('#TblMulti tbody tr input[type="checkbox"]:checked');
            var xmlData = ValidarXmlData(inputCheck);
            $('#TblMulti tbody').empty();
        }
        if (xmlData.length === 0)
            exit;
        else {   
            var parameters = { "xmlData": xmlData, "idOpcion": tipo, "idSubnivel": idSubnivel };
            console.log(parameters);
            jQueryAjaxCallback("../Shared/Utility.aspx/EstatusUser", JSON.stringify(parameters), "POST", "json", PostAccionAlumnoGrupo, false);
        }
    }
}
function PostAccionAlumnoGrupo(data) {
    var AA = JSON.parse(data.d);
    if ($('#_accion').val() == 1) {//desde activos
        GetCustomers(-1, 1, 1, $('#idRol').val());
    }
    else if ($('#_accion').val() == 0) {//desde bloquados
        Message(1, 'Los cambios solicitados se realizaron exitosamente', 'Mensaje Exitoso');
        GetCustomers(-1, 1, 1, $('#idRol').val());
        GetCustomers(-1, 1, 0, $('#idRol').val());
    }
    else if ($('#_accion').val() == 2) {//desde eliminados
        Message(1, 'Los cambios solicitados se realizaron exitosamente', 'Mensaje Exitoso');
        GetCustomers(-1, 1, 1, $('#idRol').val());
        if ($('#idRol').val() ==5)
            CargarEliminados();
        else if ($('#idRol').val() == 4)
            ALELIM_PROF()
        else if ($('#idRol').val() == 1)
            ALELIM_ADM();
        //GetCustomers(-1, 1, 2, $('#idRol').val());
    }
}
function SelB() {
    var vla = $('.checkbox-BE').attr('data-par');
    if (vla == 0) {
        $('#TblMulti input[type="checkbox"]').iCheck("check");
        $(".fa", this).removeClass("fa-square-o").addClass('fa-check-square-o');
        $('.checkbox-BE').attr('data-par', '1');
    }
    else {
        $('#TblMulti input[type="checkbox"]').iCheck("uncheck");
        $(".fa", this).removeClass("fa-check-square-o").addClass('fa-square-o');
        $('.checkbox-BE').attr('data-par', '0');
    }
}
function SelElim() {
    var vla = $('.checkbox-BE').attr('data-par');
    if (vla == 0) {
        $('#TblEliminados input[type="checkbox"]').iCheck("check");
        $(".fa", this).removeClass("fa-square-o").addClass('fa-check-square-o');
        $('.checkbox-BE').attr('data-par', '1');
    }
    else {
        $('#TblEliminados input[type="checkbox"]').iCheck("uncheck");
        $(".fa", this).removeClass("fa-check-square-o").addClass('fa-square-o');
        $('.checkbox-BE').attr('data-par', '0');
    }
}
function SetColor(i) {
    $('.' + i).iCheck({
        checkboxClass: 'icheckbox_square-green',
        radioClass: 'iradio_square-green'
    }).on('onchange', function () {
    });
}
function ShowDelete(opcion, idUsuario, estatus, nombre, idRol) {
    $('.BannerAlert').empty();
    if (opcion == '2')
        if (estatus == true) {//restaurar
            $('#nombreD').html('Restaurar el Usuario: ' + nombre);
            $('#oP').html('<p>¿Está seguro de Habilitar/Activar el Usuario?</p><p>Esta acción habilitara automaticamente al usuario. Para cancelar la acción click en el botón "Cerrar".</p>');
            $('#delete_dialog').modal('show');
            $("#oBotonesEliminar_").empty();
            $("#oBotonesEliminar_").append('<a class="btn btn-danger"  href"#" onclick="retirar(' + idUsuario + ', ' + estatus + ', ' + idRol + ');" >Habilitar</a>');
        }
        else if (estatus == false) {//eliminar
            $('#nombreD').html('Eliminar el Usuario: ' + nombre);
            $('#oP').html('<p>¿Está seguro de eliminar el Usuario?</p><p>El retiro del alumno es irreversible. Una vez completada la acción el Usuario estara retirado en el sistema. Para cancelar la acción click en el botón "Cerrar".</p>');

            $('#delete_dialog').modal('show');
            $("#oBotonesEliminar_").empty();
            $("#oBotonesEliminar_").append('<a class="btn btn-danger"  href"#" onclick="retirar(' + idUsuario + ', ' + estatus + ', ' + idRol + ');" >Eliminar  Alumno</a>');
        }
}
function btn_print(idRol) {
    GetCustomers(-1, 2, -1, idRol);
}
function fnAlertEstado(estado, texto, id) {
    $('#' + id).show();
    if (String(estado) == "true") {
        $('#' + id).removeClass('alert-danger');
        $('#' + id).addClass('alert-success');
        $('#' + id + '  span').eq(0).removeClass('glyphicon-remove');
        $('#' + id + '  span').eq(0).addClass('glyphicon-ok');
        $('#' + id + '  span').text('Exito');
        $('#' + id + '  span').eq(1).text(texto);
    }
    else {
        $('#' + id).removeClass('alert-success');
        $('#' + id).addClass('alert-danger');
        $('#' + id + '  span').eq(0).removeClass('glyphicon-ok');
        $('#' + id + '  span').eq(0).addClass('glyphicon-remove');
        $('#' + id + '  span').text('Error');
        $('#' + id + '  span').eq(1).text(texto);
    }
}
function retirar(idUsuario, estatus, idRol) {
    var parameters = { "idUsuario": idUsuario, "status": estatus, "idRol": idRol };
    jQueryAjaxCallback("../Shared/Utility.aspx/RetirarUsuario", JSON.stringify(parameters), "POST", "json", RetirarUsuario, false);
}
function RetirarUsuario(data) {
    $('.SearchA').val('');
    $('.SearchE').val('');
    $('.Search').val('');
    $('#delete_dialog').modal('hide');
    GetCustomers(-1, 1, 1, $('#idRol').val());
    GetCustomers(-1, 1, 2, $('#idRol').val());
}