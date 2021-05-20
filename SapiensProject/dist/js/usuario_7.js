function PrintPerfil(idOpcion) {
    //0=alumdiur, 1=alumlab, 2=docente/admin
    if ((idOpcion == 0)||(idOpcion ==1)) {
        var titulo2 = "Actualización de Datos del Alumno";
        var titulo3 = "Información General del Alumno";
    }
    else if (idOpcion == 2) {
        var titulo2 = "Información General del Usuario";
        var titulo3 = "Datos de Usuario";
    }
    var doc = new jsPDF('p', 'pt');
    var marg_vert = 20;
    SetHeader(titulo2, doc);
    doc.setFontSize(10);    
    doc.text(40, marg_vert + 55, titulo3);
    doc.setFontType("normal");
    doc.setFontSize(9);
    var txtNombre = $('#txtNombre').val();
    var txtApellido = $('#txtApellido').val();
    var txtCedula = $('#txtCedula').val();
    if (idOpcion == 1) {
        doc.text(40, marg_vert + 70, "Plan:");
        doc.text(170, marg_vert + 70, $('#DescEspecialidadLabel').text());

        doc.text(40, marg_vert + 90, "Grupo:");
        doc.text(170, marg_vert + 90, $('#btnSpanGrupoName').text());
    }
    doc.setLineWidth(0.5);
    doc.setDrawColor(0);
    doc.line(40, marg_vert + 95, 550, marg_vert + 95);
    //fila 1
    doc.setFontStyle("bold");
    doc.text(40, marg_vert + 110, "Nombre Completo:");
    doc.setFontType("normal");
    doc.text(170, marg_vert + 110, txtNombre);
    doc.line(40, marg_vert + 115, 550, marg_vert + 115);
    //fila 2
    doc.setFontStyle("bold");
    doc.text(40, marg_vert + 130, "Apellidos:");
    doc.setFontType("normal");
    doc.text(170, marg_vert + 130, txtApellido);
    doc.line(40, marg_vert + 135, 550, marg_vert + 135);
    //fila3
    doc.setFontStyle("bold");
    doc.text(40, marg_vert + 150, "Cédula:");
    doc.setFontType("normal");
    doc.text(170, marg_vert + 150, txtCedula);
    doc.line(40, marg_vert + 155, 550, marg_vert + 155);
    //fila4
    doc.setFontStyle("bold");
    doc.text(40, marg_vert + 170, "Fecha de Nacimiento:");
    doc.setFontType("normal");
    doc.text(170, marg_vert + 170, $('#txt_Fecha_nacimiento').val());
    doc.line(40, marg_vert + 175, 550, marg_vert + 175);
    //fila5
    doc.setFontStyle("bold");
    doc.text(40, marg_vert + 190, "Sexo:");
    doc.setFontType("normal");
    doc.text(170, marg_vert + 190, $('#ddl_sexo').val());
    doc.line(40, marg_vert + 195, 550, marg_vert + 195);
    //fila6
    doc.setFontStyle("bold");
    doc.text(40, marg_vert + 210, "Teléfono:");
    doc.setFontType("normal");
    doc.text(170, marg_vert + 210, $('#celularEstudiante').val());
    doc.line(40, marg_vert + 215, 550, marg_vert + 215);
    //fila7
    doc.setFontStyle("bold");
    doc.text(40, marg_vert + 230, "Email:");
    doc.setFontType("normal");
    doc.text(170, marg_vert + 230, $('#emailEstudiante').val()); 
    doc.line(40, marg_vert + 235, 550, marg_vert + 235);
    //fila8
    doc.setFontStyle("bold");
    doc.text(40, marg_vert + 250, "Dirección:");
    doc.setFontType("normal");
    doc.text(170, marg_vert + 250, $('#txt_direccion').val());
    doc.line(40, marg_vert + 255, 550, marg_vert + 255);    
    if ((idOpcion == 0) || (idOpcion == 1)) {
        //titulo
        doc.setFontType("bold");
        doc.setFontSize(11);
        doc.text(40, marg_vert + 260, "Datos medicos");
        doc.setFontSize(9);
        //fila9
        doc.setFontStyle("bold");
        doc.text(40, marg_vert + 270, "Tipo de Sangre del Alumno:");
        doc.setFontType("normal");
        doc.text(170, marg_vert + 270, $('#ddl_tipo_sangre').val());
        //fila10
        doc.setFontStyle("bold");
        doc.text(40, marg_vert + 290, "Alergias que padece:");
        doc.setFontType("normal");
        doc.text(170, marg_vert + 290, $('#txt_tipo_alergia').val());
        //fila11
        doc.setFontStyle("bold");
        doc.text(40, marg_vert + 310, "Doclencias o enfermedades que padece:");
        doc.setFontType("normal");
        doc.text(170, marg_vert + 310, $('#txt_tipo_enf').val());
    }
    else if (idOpcion == 2) {
        doc.text(40, marg_vert + 270, "Título:");
        doc.text(170, marg_vert + 270, $('#TituloDocente').val());

        doc.text(40, marg_vert + 290, "Fecha de Inicio::");
        doc.text(170, marg_vert + 290, $('#FechaIngreso').val());

        doc.text(40, marg_vert + 310, "Observaciones:");
        doc.text(170, marg_vert + 310, $('#txtObservacion').val());
    }
    if (idOpcion == 0) {
        doc.setFontType("bold");
        doc.setFontSize(10);
        doc.text(40, marg_vert + 330, "Datos de Acudiente 1  ");
        doc.setFontSize(9);
        doc.setFontType("normal");
        doc.text(40, marg_vert + 350, "Nombre: ");
        doc.text(170, marg_vert + 350, $('#nombreAcudiante1').val());

        doc.text(40, marg_vert + 370, "Cédula:  ");
        doc.text(170, marg_vert + 370, $('#cedulaAcudiente1').val());

        doc.text(40, marg_vert + 390, "Email:  ");
        doc.text(170, marg_vert + 390, $('#emailAcudiente1').val());

        doc.text(40, marg_vert + 410, "Teléfono:  ");
        doc.text(170, marg_vert + 410, $('#celularAcudiente1').val());
        doc.setFontType("bold");
        doc.setFontSize(10);
        doc.text(40, marg_vert + 430, "Datos de Acudiente 2  ");
        doc.setFontSize(9);
        doc.setFontType("normal");
        doc.text(40, marg_vert + 450, "Nombre:  ");
        doc.text(170, marg_vert + 450, $('#nombreAcudiente2').val());

        doc.text(40, marg_vert + 470, "Cédula:  ");
        doc.text(170, marg_vert + 470, $('#cedulaAcudiente2').val());

        doc.text(40, marg_vert + 490, "Email:  ");
        doc.text(170, marg_vert + 490, $('#emailAcudiente2').val());

        doc.text(40, marg_vert + 510, "Teléfono:  ");
        doc.text(170, marg_vert + 510, $('#celularAcudiente2').val());

        doc.text(40, marg_vert + 530, "Persona Autorizada:  ");
        doc.text(170, marg_vert + 530, $('#txtPersonaAutorizada').val());
    }
    doc.save('InformacionAlumno.pdf');
}   
function limpiar(idOpcion) {
    //0=alumdiur, 1=alumlab, 2=docente/admin
    //Todos
    $('#NombreEstudiante').text('');
    $('.txt_Cedula').val('');
    $('.txt_Nombre').val('');
    $('.txt_Apellido').val('');
    $('.txt_Direccion').val('');
    $('#txt_Fecha_nacimiento').val('');
    $('.txt_Email').val('');
    $('.txt_Celular').val('');
    $('.ddl_Sexo').val(-1);
    $('#idUsuario').val(-1);
    $('#txt_Opcion').val(2);
    $('#img_FotoPerfilS').attr('src', '../../Documents/ProfilePhotos/avatar5.png');
    $("#contPhoto").css("display", "none");
    QueryStringCustom.x1 = 2;
    QueryStringCustom.x2 = '';   
    $('#Tit2').text('');
    $('#div-SuccessMessage').css("display", "block");
    $('#div-ErrorMessage').css("display", "none");
    if ((idOpcion == 0) || (idOpcion == 1)) {
        $('#div-SuccessMessage').removeClass().addClass('alert alert-warning alert-dismissable');
        $('#Tit1').text('Usted puede empezar a crear un ALUMNO NUEVO');
        $('#txt_tipo_enf').val('');
        $('#txt_tipo_alergia').val('');
        $('#ddl_tipo_sangre').val(-1);
        $('#nombreAcudiante1').val('');
        $('#cedulaAcudiente1').val('');
        $('#ddl_nacionalidad1').val(18);
        $('#txt_direccion1').val('');
        $('#emailAcudiente1').val('');
        $('#celularAcudiente1').val('');
        $('#nombreAcudiente2').val('');
        $('#cedulaAcudiente2').val('');
        $('#ddl_nacionalidad2').val(18);
        $('#txt_direccion2').val('');
        $('#emailAcudiente2').val('');
        $('#celularAcudiente2').val('');
        $('#txtPersonaAutorizada').val('');
        $('#celularAcudiente3').val('');
        $('#celularAcudiente3').val('');
        $('#cedulaAcudiente3').val('');         
        if (idOpcion == 0) {
            $('#hidSubnivel').val(-1);
            $('#DescEspecialidadLabel').text('');
            $('#spanInformation').html();
            //cargarSelectSubNivel();
        }
        else if (idOpcion == 1) {
            $('#txt_ocup_1').val('');
            $('#txt_ocup_2').val('');
            $('#txtObservacion').val('');
            cargar_Especialidad(-1);
        }
    }
    else if (idOpcion == 2) {
        $('#div-SuccessMessage').removeClass().addClass('alert alert-warning alert-dismissable');
        $('#Tit1').text('Usted puede empezar a crear un USUARIO NUEVO');
        $('#Tit2').text('');
        $('#div-ErrorMessage').css("display", "none");
        $('#div-SuccessMessage').css("display", "block"); 
        $('#AlertStudents').hide();       
        $('#TituloDocente').val('');
        $('#FechaIngreso').val('');
        $('#txtObservacion').val('');
    }    
}
jQuery.extend(jQuery.expr[':'], {
    focusable: function (el, index, selector) {
        return $(el).is('a, button, :input, [tabindex]');
    }
});
$(document).on('keypress', 'input,select', function (e) {
    var code = e.keyCode || e.which;
    switch (code) {
        case 38:
            e.preventDefault();
            var $canfocus = $(':focusable');
            var index = $canfocus.index(document.activeElement) - 1;
            if (index >= $canfocus.length) index = 0;
            $canfocus.eq(index).focus();
            break;
        case 40:
            e.preventDefault();
            var $canfocus = $(':focusable');
            var index = $canfocus.index(document.activeElement) + 1;
            if (index >= $canfocus.length) index = 0;
            $canfocus.eq(index).focus();
            break;
        case 13:
            e.preventDefault();
            var $canfocus = $(':focusable');
            var index = $canfocus.index(document.activeElement) + 1;
            if (index >= $canfocus.length) index = 0;
            $canfocus.eq(index).focus();
            break;
    }
});
function CargarPeactree() {
    var parameters = { "idUsuario": $('#idUsuario').val() };
    jQueryAjaxCallback("../Shared/Utility.aspx/CargarIdPeactree", JSON.stringify(parameters), "POST", "json", PostCargarPeactree);
}
function PostCargarPeactree(data) {
    var m = $.parseJSON(data.d);
    $('#idPeactCust').val(m[0].CustomerID);
}
function CargarUsuarioContra() {
    var parameters = { "idUsuario": $('#idUsuario').val() };
    jQueryAjaxCallback("../Shared/Utility.aspx/CargarUsuarioContrasena", JSON.stringify(parameters), "POST", "json", PostCargarUsuarioContra);
}
function PostCargarUsuarioContra(data) {
    var objArray = $.parseJSON(data.d);
        $('#perfil_usuario').val(objArray[0].NombreUsuario);
        $('#perfil_contrasena').val(objArray[0].Contrasena);        
}
function PrintCallBack(idRol, idTipoMetodologia) {
    var xmlData1 = [];
    var nc = $('#NombreEstudiante').text();
    var nu = $('#perfil_usuario').val();
    var c = $('#perfil_contrasena').val();
    xmlData1.push({ 'Nombre': nc, 'idUsuario': QueryStringCustom.x2, 'NombreCompleto': nc, 'NombreUsuario': nu, 'Contrasena': c });
    ImprimirUsuario(xmlData1, idRol, $('#lbl_colegio').html());
}
function PostCintilloUser(data) {
    console.log(data.d);
    $('#wrapper1').html('<iframe id="output1" src="' + data.d + '"></iframe>');
}
function ImprimirUsuario(xmlData1, idRol) {
    $('#mdlImpr').modal('show');   
    $('#wrapper1').show();
    $('#msjPrint').hide();
    $('#wrapper1').empty();
    var parameters = { "DataJson": xmlData1, "idRol": idRol, "escuela": $('#lbl_colegio').html() };
    jQueryAjaxCallback("../Shared/Utility.aspx/ImprimirCintillos", JSON.stringify(parameters), "POST", "json", PostCintilloUser);
}
function PrintCintillo(data) {
    var doc = new jsPDF('p', 'pt');
    var counter = 0;
    doc.setFontSize(10);
    var rol = 5;
    var escuela = document.getElementById('lbl_colegio').innerHTML;
    var marg_vert = 20;
    var m = $.parseJSON(data.d);
        var arrayLength = m.length;
        while (counter < arrayLength) {
            var RecordCount = arrayLength;
            if (rol == 5) {
                var DesactivarUsuarioPorPeriodo = $('#ddlMetodologia option:selected').attr('DesactivarUsuarioPorPeriodo');
                if (ConverterBool(DesactivarUsuarioPorPeriodo) == true) {
                    doc.text(20, marg_vert, escuela + ' - ' + $('#ddlMetodologia option:selected').attr('nombre'));
                }
                else if (ConverterBool(DesactivarUsuarioPorPeriodo) == false) {
                    doc.text(20, marg_vert, escuela + ' - ' + $("#subnivel option:selected").text());
                }
                doc.text(20, marg_vert + 10, 'Nombre: ' + m[counter].NombreCompleto);
                doc.text(300, marg_vert + 10, 'Cédula: ' + m[counter].Cedula);

                doc.setFontSize(9);
                if (rol == 5)
                    doc.text(20, marg_vert + 30, "Estimado Alumno " + m[counter].NombreCompleto + " :");              
                doc.text(20, marg_vert + 50, "Nos complace informarle que para atenderles mejor hemos implantado un Sistema de gestión on line que nos permitirá facilitar ");
                doc.text(20, marg_vert + 60, "la comunicación y el acceso a su información académica.");
                doc.text(20, marg_vert + 70, "Para ello le invitamos a ingresar a la página web de la escuela:  " + m[counter].web);
                doc.text(20, marg_vert + 80, "Su Usuario es: " + m[counter].NombreUsuario);
                doc.text(300, marg_vert + 80, "Su Clave es: " + m[counter].Contrasena);
                doc.text(20, marg_vert + 95, "_______________________________________________________________________________________________________________");
                marg_vert = marg_vert + 105;
            }
            else if (rol == 19) {
                var DesactivarUsuarioPorPeriodo = $('#ddlMetodologia option:selected').attr('DesactivarUsuarioPorPeriodo');
                if (ConverterBool(DesactivarUsuarioPorPeriodo) == true) {
                    doc.text(20, marg_vert, escuela + ' - ' + $('#ddlMetodologia option:selected').attr('nombre'));
                }
                else if (ConverterBool(DesactivarUsuarioPorPeriodo) == false) {
                    doc.text(20, marg_vert, escuela + ' - ' + $("#subnivel option:selected").text());
                }
                doc.text(20, marg_vert + 10, 'Nombre: ' + m[counter].NombreCompleto);
                doc.text(300, marg_vert + 10, 'Cédula: ' + m[counter].Cedula);
                doc.setFontSize(9);
                if (rol == 19)
                    doc.text(20, marg_vert + 30, "Estimado Padre/Encargado " + m[counter].NombreCompleto + " :");
                doc.text(20, marg_vert + 50, "Nos complace informarle que para atenderles mejor hemos implantado un Sistema de gestión on line que nos permitirá facilitar ");
                doc.text(20, marg_vert + 60, "la comunicación y el acceso a su información académica.");
                doc.text(20, marg_vert + 70, "Para ello le invitamos a ingresar a la página web de la escuela:  " + m[counter].web);
                doc.text(20, marg_vert + 80, "Su Usuario es: " + m[counter].NombreUsuario);
                doc.text(300, marg_vert + 80, "Su Clave es: " + m[counter].Contrasena);
                doc.text(20, marg_vert + 95, "_______________________________________________________________________________________________________________");
                marg_vert = marg_vert + 105;
            }
            if (rol != 5) {
                doc.setFontSize(10);
                doc.text(20, marg_vert, escuela);
                doc.text(20, marg_vert + 10, 'Nombre: ' + m[counter].NombreCompleto);
                doc.text(300, marg_vert + 10, 'Cédula: ' + m[counter].Cedula);
                doc.text(20, marg_vert + 20, 'Usuario: ' + m[counter].NombreUsuario);
                doc.text(300, marg_vert + 20, 'Contraseña:' + m[counter].Contrasena);
                doc.text(20, marg_vert + 30, "");
                doc.text(20, marg_vert + 35, "Estimados Docente/Administrativos: ");
                doc.text(20, marg_vert + 45, "Es importante recordarles que la contraseña suministrada es su responsabilidad, recomendamos  mantenerla en un lugar seguro. ");
                doc.text(20, marg_vert + 55, "La direccion web para acceder al sistema es: " + m[counter].web);
                doc.text(20, marg_vert + 65, "_________________________________________________________________________________________________________");
                marg_vert = marg_vert + 75;
            }
            counter++;
            if (counter < RecordCount) {
                if (marg_vert > 694) { doc.addPage(); marg_vert = 20; }
            }
        }
        doc.save('USUARIOS_ACADEMICA.pdf');
}
function AlGrupo() {
    $('#tblAlumnosG tbody').empty();
    $('#TitleAl').html('' + $('#ddl_sub_nivel option:selected').text() +' <strong id="totAlP" class="text-red"></strong>');
    $('#ModalAlumnoG').modal('show');
    var parameters = { "idSubnivel": $('#ddl_sub_nivel').val() };
    jQueryAjaxCallback("../Shared/Utility.aspx/GetUsuariosSubnivel", JSON.stringify(parameters), "POST", "json", PostAlGrupo);
}
function PostAlGrupo(data) {
    $('#tblAlumnosG tbody').empty();
    var c = 0, h='';
    var m = $.parseJSON(data.d);
    var arrayLength = m.length;   
    while (c < arrayLength) {
        var bloq = '';
        if (m[c].Estatus == 2)
            bloq = '<span class="description" style="font-size: 14px;color:red;"><i class="fa fa-lock text-red"></i> Bloqueado</span>';
        h += '<tr><td>' + (c + 1) + '</td>' +
            '<td onclick="EditUsuarioPerf(' + m[c].idUsuario + ');" style="cursor:pointer;" ><div class="user-block"><img  class="rounded" src="../../Documents/ProfilePhotos/' + m[c].ProfilePhoto + '" alt="User Image">' +
            '<span class="username"><a href="#" style="font-size: 14px;color: #1c82e1;">' + m[c].NombreCompleto + '</a></span><span class="description" style="font-size: 14px;">' + m[c].Cedula + '</span>'+bloq+'</div></td>' +
            '<td><button onclick="EditUsuarioPerf(' + m[c].idUsuario + ');" type="button" style="margin-right:2px;" class="btn btn-primary btn-sm"><i class="fa fa-tags"></i> Editar</button></td></tr > ';
        c++;
    }
    $('#tblAlumnosG tbody').html(h);
    $('#totAlP').html('<label>  Total: '+c+'</label>');
}
function EditUsuarioPerf(idUsuario) {
    $('#ModalAlumnoG').modal('hide');
    EditAl(idUsuario);
}
function CallBuscarCreditos() {
    $('#ddlCreditos').empty();
    $('#wrapper').html('');
    var parameters = { "idUsuario": $('#idUsuario').val() };
    jQueryAjaxCallback("../Shared/Utility.aspx/GetCretitosBoletines", JSON.stringify(parameters), "POST", "json", PostCallBuscarCreditos);
}
function PostCallBuscarCreditos(data) {
    var counter = 0;
    var m = $.parseJSON(data.d);
    var arrayLength = m.length;
    var select = document.getElementById('ddlCreditos');
    while (counter < arrayLength) {
        var opt = document.createElement('option');
        opt.value = m[counter].id;
        opt.innerHTML = m[counter].text1;
        opt.setAttribute("tipo", m[counter].tipo);
        opt.setAttribute("idSubnivel", m[counter].idSubnivel);
        opt.setAttribute("tipoFormato", m[counter].tipoFormato);    
        opt.setAttribute("idMetodoPromedio", m[counter].idMetodoPromedio); 
        select.appendChild(opt);
        ++counter;
    }    
    MenuOpcionBoletinCre();
}
function MenuOpcionBoletinCre() {
    var tipo = $('#ddlCreditos option:selected').attr('tipo');
    if (tipo == 1)
        PrintBoletin();
    else if (tipo == 2)
        PrintAcumulativo();
}
function PrintAcumulativo() {
    var idS = $('#ddlCreditos option:selected').attr('idSubnivel');
    var anio = $('#ddlCreditos').val();
    var tf = $('#ddlCreditos option:selected').attr('tipoFormato');
    var imp = $('#ddlCreditos option:selected').attr('idMetodoPromedio');
    var idU = [];
    idU.push({ 'idUsuario': $('#idUsuario').val() });
    PreguntarAnioEnCurso(idU, idS, imp, anio, 2)



 
    //var parameters = { "DataJson": idU, "idSubnivel": idS,  "TipoEspecialidad": imp, "Anio": anio, "tipoFormato": "TABLA" };
    //jQueryAjaxCallback("../Shared/Utility.aspx/ImprimirCreditosAcumulativos", JSON.stringify(parameters), "POST", "json", PostGen);
}
var idU, idS, imp, anio, fun;
function PreguntarAnioEnCurso(u, s, i, a, f) {
    idU = u, idS = s, imp = i, anio = a, fun = f;
    $('#MdPregunta').modal('show');
}
function GenerarCredito() {
    $('#MdPregunta').modal('hide');
    var opcion = $('input:radio[name=pregunta]:checked').val();
    parameters = { "DataJson": idU, "idSubnivel": idS, "TipoEspecialidad": imp, "Anio": anio, "PreguntarAnioEnCurso": opcion };
    console.log(parameters)
    if (fun == 1)
        jQueryAjaxCallback("../Shared/Utility.aspx/ImprimirCreditosAcumulativos", JSON.stringify(parameters), "POST", "json", PostGen);
    else if (fun == 2)
        jQueryAjaxCallback("../Shared/Utility.aspx/ImprimirCreditosAcumulativos", JSON.stringify(parameters), "POST", "json", PostCredit2);
}
function PostGen(data) {
    $('#wrapper').html('<iframe id="output" src="' + data.d + '"></iframe>');
}
function PostCredit2(data) {
    $('#wrapper').html('<iframe id="output" src="' + data.d + '"></iframe>');
}
function PrintBoletin() {
    var idU = [];
    idU.push({ 'idUsuario': $('#idUsuario').val() });
    var idS = $('#ddlCreditos option:selected').attr('idSubnivel');
    var anio = $('#ddlCreditos').val();
    var tf = $('#ddlCreditos option:selected').attr('tipoFormato');
    var imp = $('#ddlCreditos option:selected').attr('idMetodoPromedio');
    var parameters = { "DataJson": idU, "idSubnivel": idS, "idMetodoPromedio": imp, "Anio": anio, "tipoFormato": tf };
    jQueryAjaxCallback("../Shared/Utility.aspx/ImprimirCreditos", JSON.stringify(parameters), "POST", "json", PostGen);
}
function PostGen(data) {
    $('#wrapper').html('<iframe id="output" src="' + data.d + '"></iframe>');
}
function PrintAlumno() {
    var parameters = { "idSubnivel": $('#ddl_sub_nivel').val(), "idPeriodo": -1, "opcion": 3 };
    console.log(parameters)
    jQueryAjaxCallback("../Shared/Utility.aspx/ListaAlumnos", JSON.stringify(parameters), "POST", "json", PostPrintAlumno);
}
function PostPrintAlumno(data) {
    var p = $.parseJSON(data.d);
    var arrayLength = p.length;
    var getColumnsA = [
        { title: "#", dataKey: "RowNumber" },
        { title: "Nombre del Alumno", dataKey: "NombreCompleto" },
        { title: "Cédula ", dataKey: "Cedula" }
    ];
    var rowCount = arrayLength || 2;
    var _data = [];
    for (var j = 1; j <= rowCount; j++) {
        _data.push({
            RowNumber: j,
            NombreCompleto: p[j - 1].NombreCompleto,
            Cedula: p[j - 1].Cedula
        });
    }    
    var doc = new jsPDF('p', 'pt');
    doc.setFontSize(9);
    doc.autoTable(getColumnsA, _data, {
        theme: 'grid',
        addPageContent: function (data) {
            SetHeader("Lista de Alumnos", doc);
            doc.setFontSize(9);
            doc.text("GRUPO: " + $('#ddl_sub_nivel option:selected').text(), data.settings.margin.left + 15, 80);
            doc.text("AÑO LECTIVO: " + p[0].anio, data.settings.margin.left + 15, 95);
        },
        margin: { top: 100, bottom: 50, horizontal: 15 },
        styles: { overflow: 'linebreak' }
    });
    doc.save('Lista_Alumnos.pdf');
}