var ObjAsignaturas = [];
var Periodo_;
var Periodo_P;
var Periodo_E;
cargarMetodologia_razor();
function cargarMetodologia_razor() {
    var parameters = { "Activo": 1 };
    jQueryAjaxCallback("../Shared/Utility.aspx/cargarMetodologia_razor", JSON.stringify(parameters), "POST", "json", cargarSelectPeriodoM_razor);
}
$(document).ready(function () {
    $(".Search").keyup(function () {
        var bus = $.trim($(this).val());
        if (bus != "") {
            $(".actions-trigger").hide();
            $(".actions-trigger:contains-ci('" + bus + "')").show();
        }
        else {
            $(".actions-trigger").show();
        }
    });
    $("#kwd_search").keyup(function () {
        var bus = $.trim($(this).val());
        if (bus != "") {
            $("#tablaEstPreMatricula tbody>tr").hide();
            $("#tablaEstPreMatricula td:contains-ci('" + bus + "')").parent("tr").show();
        }
        else {
            $("#tablaEstPreMatricula tbody>tr").show();
        }
    });
    $('[data-toggle="tooltip"]').tooltip();
    $("#Text1").keyup(function () {
        var bus = $.trim($(this).val());
        if (bus != "") {
            $("#gvCustomers1 tbody>tr").hide();
            $("#gvCustomers1 td:contains-ci('" + bus + "')").parent("tr").show();
        }
        else {
            $("#gvCustomers1 tbody>tr").show();
        }
    });
});
$(document).ready(function () {
    $('#openBtn').click(function () {
        $('#myModal').modal({
            show: true
        });
    });
    $(document).on('show.bs.modal', '.modal', function (event) {
        var zIndex = 1040 + (10 * $('.modal:visible').length);
        $(this).css('z-index', zIndex);
        setTimeout(function () {
            $('.modal-backdrop').not('.modal-stack').css('z-index', zIndex - 1).addClass('modal-stack');
        }, 0);
    });
});
function cargarSelectPeriodoM_razor(data) {   
    var m = $.parseJSON(data.d);
    var counter = 0;
    var arrayLength = m.length;
    while (counter < arrayLength) {
        var select = document.getElementById('ddlMetodologia');
        var opt = document.createElement('option');
        opt.value = m[counter].id;
        opt.innerHTML = m[counter].nombre;
        opt.setAttribute("DesactivarUsuarioPorPeriodo", m[counter].DesactivarUsuarioPorPeriodo);
        select.appendChild(opt);
        ++counter;
    }
    if (m[0].cantidad_metodologias == 1) {
        if (m[0].DesactivarUsuarioPorPeriodo == false) {
            CargarListaAsignaturas();
            if (idRolA == 4) {
                ValidarConsejeria();
            }
        }
        else if (m[0].DesactivarUsuarioPorPeriodo == true) {
         
            CargarProgramaPost();
        }
    }
    else if (m[0].cantidad_metodologias > 1) {
        CargarListaAsignaturas(idRolA);
    }

}
function ValidarConsejeria() {
    var parameters = {};
    jQueryAjaxCallback("../Shared/Utility.aspx/ValidarConsejeria", JSON.stringify(parameters), "POST", "json", PostValidarConsejeria);
}
function PostValidarConsejeria(data) {    
    var m = $.parseJSON(data.d);
    if (m[0].EsConsejero == 1) {
        //$('#HeaderBox').append('<a class="btn btn-app" href="Creditos"><span class="badge bg-green">5</span><i class="fa fa-clone"></i> Créditos </a >');
        $('#HeaderBox').append('');
    }
    else if (m[0].EsConsejero == 0) {
        $('#HeaderBox').append('<div id="Div_NoEsConsejero"><div class="alert" style="color: #781d2d;background-color: #fad7dd;border-color: #f8c7d0;" role="alert">Nota: Su Usuario de Docente, no tiene asignado Grupo como Consejero o Guía.</div></div>');
    }
}
function limpiarBus() {
    $('#Text1').val('');
    $('#kwd_search').val('');
}
function CargarListaAsignaturas() {
    $('#trim009').html($('.PeriodoAsignatura option:selected').text())
    limpiarBus();
    $('#table1').empty();
    if ($('#ddlMetodologia option:selected').attr('DesactivarUsuarioPorPeriodo') == 'true') {
        $('.labControl').show();
        $('#tablaEstPreMatricula tbody').html();
        $('#h5diurna').html('<i class="fa fa-cubes"></i> Período: ' + $('.PeriodoAsignatura option:selected').text());
        var parameters = { "idPeriodo": $('.PeriodoAsignatura').val(), "DesactivarUsuarioPeriodo": 1, "Modulo": idRolA, "Activo": 1 };
        console.log(parameters);
        jQueryAjaxCallback("../Shared/Utility.aspx/CargarPreMatricula", JSON.stringify(parameters), "POST", "json", CargarLaboral1);
    }
    else if ($('#ddlMetodologia option:selected').attr('DesactivarUsuarioPorPeriodo') == 'false') {
        $('.labControl').hide();
        var parameters = { "idPeriodo": -1, "DesactivarUsuarioPeriodo": 0, "Modulo": idRolA, "Activo": 1 };
        jQueryAjaxCallback("../Shared/Utility.aspx/CargarPreMatricula", JSON.stringify(parameters), "POST", "json", CargarDiurnat1);
    }
}
function ActualizarGrupo(idSubnivel, Activo) {
    var periodoA = $('.PeriodoAsignatura').val();
    var parameters = { "idSubnivel": idSubnivel, "idPeriodo": periodoA, "Activo": Activo };
    jQueryAjaxCallback("../Shared/Utility.aspx/ActualizarGrupo", JSON.stringify(parameters), "POST", "json", PostUpdateGrupo);
}
function CallAbrirGrupos() {
    var periodoA = $('.PeriodoAsignatura').val();
    var parameters = { "idSubnivel": idSubnivel, "idPeriodo": periodoA, "Activo": Activo };
    jQueryAjaxCallback("../Shared/Utility.aspx/ActualizarGrupo", JSON.stringify(parameters), "POST", "json", PostUpdateGrupo);
}
function PostUpdateGrupo(data) {
    $('#Text1').val();
    CargarListaAsignaturas();
}
function MostrarHorarioGrupo(idSubnivel) {
    if (idSubnivel == -1)
        idSubnivel = $('#ddlSubnivelHorario').val();
    else
        $('#ddlSubnivelHorario').val(idSubnivel);
    var idPeriodo;
    $('#ModalHorario').modal('show');   
    ObtenerJSONHORARIOSxUSUARIOStu(-1, idSubnivel);
    var DesactivarUsuarioPorPeriodo = $('#ddlMetodologia option:selected').attr('DesactivarUsuarioPorPeriodo');
    if (ConverterBool(DesactivarUsuarioPorPeriodo) == false)
        idPeriodo = -1;
    else if (ConverterBool(DesactivarUsuarioPorPeriodo) == true)
        idPeriodo = $('.PeriodoAsignatura').val();
    $('#UrlHorario').attr('href', 'Horario?x1=' + idSubnivel + '&x2=' + idPeriodo + '&x4=' + DesactivarUsuarioPorPeriodo);
   }
//function SelBaja() {
//    var disabled = false;
//    var clicks = $(this).data('clicks');
//    if (clicks) {
//        $("#tblGruposBajas input[type='checkbox']").iCheck("uncheck");
//        $(".fa", this).removeClass("fa-check-square-o").addClass('fa-square-o');
//        $('.chk').css('background-color', '');
//    } else {
//        $("#tblGruposBajas tr").each(function () {
//            if ($(this).css('display') != 'none') {
//                var e = $(this).find("input[type='checkbox']");
//                //e.iCheck("check");
//                $(this).css('background-color', '#ffc');
//            }
//        });
//        $(".fa", this).removeClass("fa-square-o").addClass('fa-check-square-o');
//        disabled = false;
//    }
//    $(this).data("clicks", !clicks);
//}
function ValidarXmlDataBaja(objeto) {
    var xmlData = '<xmlData>';
    if (objeto.length > 0) {
        for (var i = 0; i < objeto.length; i++) {
            xmlData += '<data idUsuario="' + $(this).find("td:eq(3) option:selected").val() + '"';
            xmlData += ' idSubnivel="' + objeto[i].dataset.idsubnivel + '" />';
        }
        xmlData += '</xmlData>';
    }
    else
        xmlData = '';
    return xmlData;
}
function OpenPeriodo() {
    $('#details_plan').modal('show');
}
function ActivarGrupo() {
    $('#search_baja').val('');
    //var inputCheck = $('#tblGruposBajas tbody tr input[type="checkbox"]:checked');
    //var xmlData = ValidarXmlDataBaja(inputCheck);
    var xmlData = '<xmlData>';
    var cont = 0;
    $('#tblGruposBajas tbody tr').each(function () {
        if ($(this).find("td:eq(0) input[type='checkbox']:checked").length ==1)
        {
            xmlData += '<data ';
            xmlData += ' idUsuario="' + $(this).find("td:eq(3) option:selected").val() + '"';
            xmlData += ' Nombre="' + $(this).find("td:eq(2) input:text").val()  + '"';
            xmlData += ' idasignatura="' + $(this).find("td:eq(2)").data('idasignatura') + '" />';
            cont++;
        }
    });
    xmlData += '</xmlData>';
    if (cont=== 0)
        exit;
    else {
        $('#tblGruposBajas tbody').empty();
        var parameters = { "xmlData": xmlData, "Activo": 1, "idPeriodo": $('.PeriodoAsignatura').val() };
        console.log(parameters)
        jQueryAjaxCallback("../Shared/Utility.aspx/ActualizarSubnivel", JSON.stringify(parameters), "POST", "json", PostActivarGrupo, false);
    }
}
function PostActivarGrupo(data) {
    CallGrupoBajas();
    $('#ModalGrupo').modal('hide');
    Message(1, 'Se han abierto los grupos exitosamente', 'Mensaje Exitoso');
}
function OpenGrupos() {
    $('#ModalGrupo').modal('show');
    $('#txtAbrrGrupoPer').text($('.PeriodoAsignatura option:selected').text());
    CallGrupoBajas();
}
function CallGrupoBajas() {
    $('#tblGruposBajas tbody').empty();
    var parameters = { };
    jQueryAjaxCallback("../Shared/Utility.aspx/CargarAsignaturasGrupos", JSON.stringify(parameters), "POST", "json", PostOpenGrupos);
}
function PostOpenGrupos(data) {
    $('#tblGruposBajas tbody').empty();
    var m = $.parseJSON(data.d);
    var counter = 0, html = '';
    var arrayLength = m.length;
    while (counter < arrayLength) {
        html += '<tr class="chk"><td>' +
            '<input id="' + m[counter].idAsignatura + '"  style="position:relative;left:auto;opacity:initial;"  type="checkbox">'+
            '</td>' +
            '<td>' + m[counter].codigo + '</td>' +
            '<td data-nombre="' + m[counter].Descripcion + '" data-idAsignatura="' + m[counter].idAsignatura + '"><input type="text" value="' + m[counter].Descripcion + '"/></td>';

        html += '<td><select>';
            html += '<option selected value="-1">--Profesor sin asignar--</option>';
        for (var d = 0; d < ArrayDocentes.length; d++) {
            if (m[counter].idUsuario == ArrayDocentes[d].IdDocente)
                html += '<option selected value="' + ArrayDocentes[d].IdDocente + '">' + ArrayDocentes[d].NombreCompleto + '</option>';
            else
                html += '<option value="' + ArrayDocentes[d].IdDocente + '">' + ArrayDocentes[d].NombreCompleto + '</option>';
        }
        html += '</select></td></tr>';
        counter++;
    }
    $('#tblGruposBajas tbody').append(html);
    CargarListaAsignaturas();
}
function MdlConfMat(idSubnivel, idNivel, NombreCompleto, idAsignatura, salon, codhor) {
    $('#confgrupo').modal('show');
    $('#_confM_nombre').val(NombreCompleto);
    $('#_confM_idAsignatura').val(idAsignatura);
    $('#_confM_idSubnivel').val(idSubnivel);
    $('#_confM_salon').val(salon);
    $('#_confM_codhor').val(codhor);
    var parameters = { "param1": $('#ddlMetodologia').val(), "nivel": idNivel, "idSubnivel": idSubnivel, "Activo": -1 };
    jQueryAjaxCallback("../Shared/Utility.aspx/ObtenerAsignaturaAdmin", JSON.stringify(parameters), "POST", "json", PostMdlConfMat);
}
function PostMdlConfMat(data) {
    var m = $.parseJSON(data.d);
    var counter = 0;
    var arrayLength = m.length;
    while (counter < arrayLength) {
        var select = document.getElementById('_confM_materia');
        var opt = document.createElement('option');
        opt.value = m[counter].id;
        opt.innerHTML = m[counter].Descripcion;
        select.appendChild(opt);
        ++counter;
    }
    $('#_confM_materia').val($('#_confM_idAsignatura').val());
}
function SaveEditGrupo() {
    var grupo = $('#_confM_nombre').val();
    var idAsignatura = $('#_confM_idAsignatura').val();
    var salon = $('#_confM_salon').val();
    var cod_hor = $('#_confM_codhor').val();
    var parameters = { "idSubnivel": $('#_confM_idSubnivel').val(), "nombre": grupo, "salon": salon, "cod_hor": cod_hor, "idAsignatura": idAsignatura };
    jQueryAjaxCallback("../Shared/Utility.aspx/EditGrupo", JSON.stringify(parameters), "POST", "json", PostSaveEditGrupo);
}
function PostSaveEditGrupo(data) {
    CargarListaAsignaturas();
    $('#confgrupo').modal('hide');
}
//function GuardarConfiguracion() {
//    var IdPeriodoConfiguracion = document.getElementById('IdPeriodoConfiguracion').value;
//    var checkedValue = $('input[name="optionsRadios"]:checked').val();
//    if (checkedValue == 'option1')
//        var Activo = 1;
//    else if (checkedValue == 'option2')
//        var Activo = 0;
//    var parameters = { "Activo": Activo, "IdPeriodoConfiguracion": IdPeriodoConfiguracion };
//    jQueryAjaxCallback("../Shared/Utility.aspx/GuardarConfiguracion", JSON.stringify(parameters), "POST", "json", CargarMensaje);
//}
function CargarMensaje(data) {
    $('#configuracionPreMatricula').modal('hide');
}
function view_configuracion() {
    $('#configuracionPreMatricula').modal('show');
}
function btn_print(idSubnivel) {
    var idOpcion;
    var idPeriodo = -1
    if ($('#ddlMetodologia option:selected').attr('DesactivarUsuarioPorPeriodo') == 'true') {
        idPeriodo = $(".PeriodoAsignatura").val();
        idOpcion = 2;
    }
    else if ($('#ddlMetodologia option:selected').attr('DesactivarUsuarioPorPeriodo') == 'false') {
        idOpcion = 3;
        idPeriodo = -1;
    }
    var parameters = { "idSubnivel": idSubnivel, "idPeriodo": idPeriodo, "opcion": idOpcion };
    console.log(parameters)
    jQueryAjaxCallback("../Shared/Utility.aspx/ListaAlumnos", JSON.stringify(parameters), "POST", "json", btn_print_final);
}
function getDataA(rowCount, p) {
    rowCount = rowCount || 2;
    var data = [];
    for (var j = 1; j <= rowCount; j++) {
        data.push({
            RowNumber: j,
            NombreCompleto: p[j - 1].NombreCompleto,
            Cedula: p[j - 1].Cedula
        });
    }
    return data;
}
function getColumnsA(){
    return [
        { title: "#", dataKey: "RowNumber" },
        { title: "Nombre del Alumno", dataKey: "NombreCompleto" },
        { title: "Cédula ", dataKey: "Cedula" }
    ];
}
function CargarLaboral1(data) {
    var counter = 0;
    var objArray = $.parseJSON(data.d);
    var arrayLength = objArray.length;
    var planif = '', editG = '',  doc = '', hor = '', com='', par=1;
        while (counter < arrayLength) {
            var customer = counter + 1;
            com = '';
            if (par == 2) {
                com = ' background-color: rgba(34, 41, 47, 0.05);';
                par = 0;
            }
            if (idRolA == 1) {
                $('.labControl').show();
                if (customer == 1) {
                    $('#TextMatricula').text('Total Alumnos Matriculados: ' + objArray[counter].Tot_mat );
                    }
                editG = '<span style="cursor:pointer;" onclick="MdlConfMat(' + objArray[counter].idSubNivel + ',\'' + objArray[counter].idNivel + '\',\'' + objArray[counter].Descripcion + '\',\'' + objArray[counter].idAsignatura + '\',\'' + objArray[counter].Salon + '\',\'' + objArray[counter].CodHor + '\');"><u class="text-aqua">' + objArray[counter].Descripcion + '</u></span>';
                cerr = '';//'<button style="color:#fff;background-color:#db1b3f;border-color:##d01a3b;margin: 0 0 10px 0px;padding:.1875rem .75rem;font-size:.875rem;line-height:1.5;border-radius:.2rem;" onclick="ActualizarGrupo(' + objArray[counter].idSubNivel + ', false);"  type="button"  class="btn btn-danger btn-sm">Cerrar Grupo</button>';
                hor = '<a target="_blank"  style="color:#fff;background-color:#2c7be5;border-color:#2c7be5;margin: 0 0 10px 0px;padding:.1875rem .75rem;font-size:.875rem;line-height:1.5;border-radius:.2rem;margin-right: .5rem;"  href="Horario?x1=' + objArray[counter].idSubNivel + '&x2=' + $('.PeriodoAsignatura option:selected').val() + '&x3=' + objArray[counter].Descripcion + '&x4=' + $('#ddlMetodologia option:selected').attr('DesactivarUsuarioPorPeriodo') + '"&x5=' + objArray[counter].idAsignatura + '"  class="btn btn-primary btn-sm" data-idnivel="' + objArray[counter].idNivel + '" data-nombreasingatura="' + objArray[counter].Descripcion + '" data-idasignatura="' + objArray[counter].idAsignatura + '" data-nombrehorario="' + objArray[counter].Descripcion + '" data-idsubnivel="' + objArray[counter].idSubNivel + '"><i class="fa fa-clock-o"></i> Horario</a>';
                doc = '<a class="btn btn-falcon-default btn-sm" id="btn_mostrar_consejero_' + counter + '" style="margin-right: .5rem;margin: 0 0 10px 0px;padding:.1875rem .75rem;font-size:.875rem;line-height:1.5;border-radius:.2rem;"  data-idtxtprofe="profe_' + customer + '" data-idperiodo="' + $('.PeriodoAsignatura option:selected').val() + '" data-idasignatura="' + objArray[counter].idAsignatura + '" data-nombrehorario="' + objArray[counter].Descripcion + '" data-idsubnivel="' + objArray[counter].idSubNivel + '" onclick="MostrarModalDocentesLaboral(this)"><i class="fa fa-user-o"></i> Docente</a>' + planif;
            }
            else if (idRolA == 4) {
                $('.labControl').show();
                editG = objArray[counter].Descripcion;
                cerr = '';
                hor = '<a target="_blank" style="color:#fff;background-color:#2c7be5;border-color:#2c7be5;margin: 0 0 10px 0px;padding:.1875rem .75rem;font-size:.875rem;line-height:1.5;border-radius:.2rem;margin-right: .5rem;" href="Horario?x1=' + objArray[counter].idSubNivel + '&x2=' + $('.PeriodoAsignatura option:selected').val() + '&x3=' + objArray[counter].Descripcion + '&x4=' + $('#ddlMetodologia option:selected').attr('DesactivarUsuarioPorPeriodo') + '"&x5=' + objArray[counter].idAsignatura + '" class="btn btn-primary btn-sm" data-idnivel="' + objArray[counter].idNivel + '" data-nombreasingatura="' + objArray[counter].Descripcion + '" data-idasignatura="' + objArray[counter].idAsignatura + '" data-nombrehorario="' + objArray[counter].Descripcion + '" data-idsubnivel="' + objArray[counter].idSubNivel + '" ><i class="fa fa-clock-o"></i> Horario</a>';
                doc = '' + planif;
            }
            $('#table1').append('<div style="border-color: #d8e2ef;border-left-width: 0;border-right-width: 0;border-radius: 0;padding: 1rem;' + com +'" class="actions-trigger border-bottom-0 border"  href="#!">' +
                '<div class="box-tools pull-right"><div class="dropdown"><button type="button" class="btn btn-box-tool dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><svg viewBox="0 0 24 24" focusable="false" width="24" height="24" class=" NMm5M"><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path></svg></button>' +
                '<ul class="dropdown-menu"><li><a href="#" class="dropdown-item" onclick=btn_print(' + objArray[counter].idSubNivel + ');><i class="fa fa-print"></i> Imprimir (.Pdf)</a></li>' +
                '<li><a href="#" class="dropdown-item" onclick="CallAlumnosGrupoTable(' + objArray[counter].idSubNivel + ', 2, 2)"><i class="fa fa-print"></i> Imprimir (Excel)</a></li></ul>' +
                '</div></div>' +
                '<div class="row justify-content-between align-items-center">' +
                '<div class="col-sm-4">' +
                '<div class="media">' +
                '<div style="margin-right: .5rem;"><div class="avatar avatar-3xl">' +
                '<div class="avatar-name rounded-circle" style="width:100%;height:100%;"><span>' + (counter+1) + '</span></div>' +
                '</div>' +
                '</div>' +
                '<div class="media-body" style="margin: 0 0 10px 0px;font-size: .83333rem;">' +
                '<h5 style="margin-bottom:.25rem;font-size: 1rem;">' + editG + '</h5>' +
                '<p style="line-height:2;font-size:.73333rem;margin-bottom: 0;">Docente: <a data-idtxtprofe="profe_' + customer + '" data-idperiodo="' + $('.PeriodoAsignatura option:selected').val() + '" data-idasignatura="' + objArray[counter].idAsignatura + '" data-nombrehorario="' + objArray[counter].Descripcion + '" data-idsubnivel="' + objArray[counter].idSubNivel + '" onclick="MostrarModalDocentesLaboral(this)" id="profe_' + customer + '" style="color: #2c7be5;" href="#">' + objArray[counter].NombreCompleto + '</a></p>' +
                '<p style="line-height:2;margin-bottom: 0;"><span data-param2="2" data-nombreasingatura="' + objArray[counter].Descripcion + '" data-consejero="' + objArray[counter].NombreCompleto + '" data-idasignatura="' + objArray[counter].idAsignatura + '" data-nombrehorario="" data-idtipoespecialidad="' + objArray[counter].idTipoEspecialidad + '" data-idsubnivel="' + objArray[counter].idSubNivel + '" onclick="CargarListaEstudiante(this)" style="cursor:pointer;color: #f5803e;line-height:0;font-size: 1rem;font-weight: 600;"> Matriculados: ' + objArray[counter].RowNumberMatricula + '</span></p>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div class="col-sm-8">' + hor +
                '<button  style="margin: 0 0 10px 0px;padding:.1875rem .75rem;font-size:.875rem;line-height:1.5;border-radius:.2rem;margin-right: .5rem;"  class="btn btn-primary btn-sm"  data-param2="2" data-nombreasingatura="' + objArray[counter].Descripcion + '" data-consejero="' + objArray[counter].NombreCompleto + '" data-idasignatura="' + objArray[counter].idAsignatura + '" data-nombrehorario="" data-idtipoespecialidad="' + objArray[counter].idTipoEspecialidad + '" data-idsubnivel="' + objArray[counter].idSubNivel + '" onclick="CargarListaEstudiante(this)"><i class="fa fa-users"></i> Alumnos</button>' + doc +
                '<a href="Academica?tp=2&prd=' + $('.PeriodoAsignatura option:selected').val() + '&idS=' + objArray[counter].idSubNivel + '" style="color:#fff;background-color:#2c7be5;border-color:#2c7be5;margin: 0 0 10px 0px;padding:.1875rem .75rem;font-size:.875rem;line-height:1.5;border-radius:.2rem;margin-right: .5rem;" class="btn btn-falcon-default btn-sm" ><i class="fa fa-sort-numeric-asc"></i> Libreta de Nota</a>' +
                '<a href="AsistenciaA?tp=2&prd=' + $('.PeriodoAsignatura option:selected').val() + '&idS=' + objArray[counter].idSubNivel + '" style="color:#fff;background-color: #00ac64;border-color: #009f5c;margin: 0 0 10px 0px;padding:.1875rem .75rem;font-size:.875rem;line-height:1.5;border-radius:.2rem;margin-right: .5rem;" class="btn btn-falcon-default btn-sm" ><i class="fa fa-sitemap"></i> Asistencia</a>'+
                cerr + '</div>' +
                '</div>');
            ++counter;
            ++par;
        }
        if (idRolA == 1) {
            getEstudiantePrematricula();
        }
    }
function CargarDiurnat1(data) {
    var counter = 0,  doc_extra ='';
    var objArray = $.parseJSON(data.d);
    var arrayLength = objArray.length;
    $('#table1').empty();
    var foda = '', hor = '', doc = '', customer = 0, com = '', par = 1, con ='';
    var asis_desc = ' Consejería', lib_desc = '';
    $('.labControl').hide();
    while (counter < arrayLength) {
        customer = counter + 1;
        lib_desc = 'Libreta de Notas', com = '', con = '';
        if (objArray[counter].idMetodoPromedio == 1) {
            asis_desc = 'Evaluación Trimestral Pre-Escolar';
            lib_desc = 'Calificar Avance Semanal';
        }
        else {
            asis_desc = 'Consejería Trimestral';
        }        
        if (par == 2) {
            com = ' background-color: rgba(34, 41, 47, 0.05);';
            par = 0;
        }
        //if ($('#ddlMetodologia').val() == 16) {
        //    foda = '<a target="_blank" href="foda?&idT=' + $('#ddlMetodologia').val() + '&idS=' + objArray[counter].idSubNivel + '" style="color:#fff;background-color: #00ac64;border-color: #009f5c;margin: 0 0 10px 0px;padding:.1875rem .75rem;font-size:.875rem;line-height:1.5;border-radius:.2rem;margin-right: .5rem;" class="btn btn-falcon-default btn-sm" ><i class="fa fa-tags"></i> Foda Anual</a>';
        //}	
       var name = 'Asistencia'
        if ($('#idEscuela_').val() == 75)
             var name = 'AsistenciaA'
        if (idRolA == 1) {
            if (customer == 1) {
                var TotEst = objArray[counter].TotEst;
                $('#h5diurna').text('Total Matriculados ' + objArray[0].anio + ': ' + TotEst);
            }
            doc_extra = 'data-idsubnivel="' + objArray[counter].idSubNivel + '" data-idconsejero="' + objArray[counter].idUsuarioConsejero + '" onclick="MostrarModalDocneteDiurna(this)" data-nombrehorario="' + objArray[counter].Descripcion + '" data-idnivel="' + objArray[counter].idNivel + '" data-nombrehorario="' + objArray[counter].Descripcion + '" data-idsubnivel="' + objArray[counter].idSubNivel + '"';
            con = '<a href="Evaluacion?x1=' + objArray[counter].idSubNivel + '" style = "color: #fff;background-color: #f3681a;border-color: #f2600e;margin: 0 0 10px 0px;padding:.1875rem .75rem;font-size:.875rem;line-height:1.5;border-radius:.2rem;margin-right: .5rem;" class="btn btn-falcon-default btn-sm"> <i class="fa fa-star-o"></i> ' + asis_desc + '</a>';
            hor = '<button style="color:#fff;background-color:#2c7be5;border-color:#2c7be5;margin: 0 0 10px 0px;padding:.1875rem .75rem;font-size:.875rem;line-height:1.5;border-radius:.2rem;margin-right: .5rem;" onclick="MostrarHorarioGrupo(' + objArray[counter].idSubNivel + ',\'' + objArray[counter].Descripcion + '\');" class="btn btn-primary btn-sm" type="button"><i class="fa fa-clock-o"></i> Horario</button> ';
            if (objArray[counter].idTipoEspecialidad == 5) {
                doc = '<a class="btn btn-falcon-default btn-sm" id="btn_mostrar_consejero_' + counter + '" style="margin-right: .5rem;margin: 0 0 10px 0px;padding:.1875rem .75rem;font-size:.875rem;line-height:1.5;border-radius:.2rem;"  data-idtxtprofe="profe_' + customer + '" data-idperiodo="' + $('.PeriodoAsignatura option:selected').val() + '" data-idasignatura="' + objArray[counter].idAsignatura + '" data-nombrehorario="' + objArray[counter].Descripcion + '" data-idsubnivel="' + objArray[counter].idSubNivel + '" onclick="MostrarModalDocentesLaboral(this)"><i class="fa fa-user-o"></i> Docente</a>'
            }
            else {
                doc = '<button style="margin: 0 0 10px 0px;padding:.1875rem .75rem;font-size:.875rem;line-height:1.5;border-radius:.2rem;margin-right: .5rem;" data-idnivel="' + objArray[counter].idNivel + '" data-nombrehorario="' + objArray[counter].Descripcion + '" data-idsubnivel="' + objArray[counter].idSubNivel + '" data-idconsejero="' + objArray[counter].idUsuarioConsejero + '"  class="btn btn-light  btn-sm" onclick="MostrarModalDocneteDiurna(this)" type="button"><i class="fa fa-tags"></i> Asignar Docentes</button>';
            }    
            doc += '<a href="Planeamientos" style="color:#fff;background-color: #00ac64;border-color: #009f5c;margin: 0 0 10px 0px;padding:.1875rem .75rem;font-size:.875rem;line-height:1.5;border-radius:.2rem;margin-right: .5rem;" class="btn btn-falcon-default btn-sm" ><i class="fa fa-sitemap"></i> Planeamientos</a>' +
                '<a href="' + name + '?tp=2&prd=' + $('.PeriodoAsignatura option:selected').val() + '&idS=' + objArray[counter].idSubNivel + '" style="color:#fff;background-color: #00ac64;border-color: #009f5c;margin: 0 0 10px 0px;padding:.1875rem .75rem;font-size:.875rem;line-height:1.5;border-radius:.2rem;margin-right: .5rem;" class="btn btn-falcon-default btn-sm" ><i class="fa fa-sitemap"></i> Asistencia</a>';
        }
        else if (idRolA == 4) {				
            hor = '<button style="color:#fff;background-color:#2c7be5;border-color:#2c7be5;margin: 0 0 10px 0px;padding:.1875rem .75rem;font-size:.875rem;line-height:1.5;border-radius:.2rem;margin-right: .5rem;" onclick="MostrarHorarioGrupo(' + objArray[counter].idSubNivel + ',\'' + objArray[counter].Descripcion + '\');" class="btn btn-primary btn-sm" type="button"><i class="fa fa-clock-o"></i> Horario</button> ';
            doc =   '<a href="Planeamientos" style="color: #fff;background-color: #00ac64;border-color: #009f5c;margin: 0 0 10px 0px;padding:.1875rem .75rem;font-size:.875rem;line-height:1.5;border-radius:.2rem;margin-right: .5rem;" class="btn btn-falcon-default btn-sm" ><i class="fa fa-sitemap"></i> Planeamientos</a>' +
                '<a href="' + name + '?tp=2&prd=' + $('.PeriodoAsignatura option:selected').val() + '&idS=' + objArray[counter].idSubNivel + '" style="color:#fff;background-color: #00ac64;border-color: #009f5c;margin: 0 0 10px 0px;padding:.1875rem .75rem;font-size:.875rem;line-height:1.5;border-radius:.2rem;margin-right: .5rem;" class="btn btn-falcon-default btn-sm" ><i class="fa fa-sitemap"></i> Asistencia</a>';
            if (objArray[counter].idMetodoPromedio != 1) {
                if (objArray[counter].idUsuario == objArray[counter].idUsuarioConsejero) {
                    con = '<a href="Evaluacion?x1=' + objArray[counter].idSubNivel + '" style = "color: #fff;background-color: #f3681a;border-color: #f2600e;margin: 0 0 10px 0px;padding:.1875rem .75rem;font-size:.875rem;line-height:1.5;border-radius:.2rem;margin-right: .5rem;" class="btn btn-falcon-default btn-sm"> <i class="fa fa-star-o"></i>' + asis_desc + '</a>';
                }
            }
            else
                con = '<a href="Evaluacion?x1=' + objArray[counter].idSubNivel + '" style = "color: #fff;background-color: #f3681a;border-color: #f2600e;margin: 0 0 10px 0px;padding:.1875rem .75rem;font-size:.875rem;line-height:1.5;border-radius:.2rem;margin-right: .5rem;" class="btn btn-falcon-default btn-sm"> <i class="fa fa-star-o"></i>' + asis_desc + '</a>';
        }
        var select = document.getElementById('ddlSubnivelHorario');
        var opt = document.createElement('option');
        opt.value = objArray[counter].idSubNivel;
        opt.innerHTML = objArray[counter].DescripcionLarga;
        select.appendChild(opt);
        var desc = objArray[counter].Descripcion.slice(0, 7);
        $('#table1').append('<div style="border-color: #d8e2ef;border-left-width: 0;border-right-width: 0;border-radius: 0;padding: 1rem;' + com +'" class="actions-trigger border-bottom-0 border "  href="#!">' +
            '<div class="box-tools pull-right"><div class="dropdown"><button type="button" class="btn btn-box-tool dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><svg viewBox="0 0 24 24" focusable="false" width="24" height="24" class=" NMm5M"><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path></svg></button>'+
            '<ul class="dropdown-menu"><li><a href="#" class="dropdown-item" onclick=btn_print(' + objArray[counter].idSubNivel + ');><i class="fa fa-print"></i> Imprimir (.Pdf)</a></li>' +
            '<li><a href="#" class="dropdown-item" onclick="CallAlumnosGrupoTable(' + objArray[counter].idSubNivel + ', 3, 2)"><i class="fa fa-print"></i> Imprimir (Excel)</a></li></ul > '+
            '</div></div>' +
            '<div class="row justify-content-between align-items-center">' +
            '<div class="col-sm-4">' + 
            '<div class="media">' +
            '<div  style="margin-right: .5rem;"><div class="avatar avatar-3xl">' +
            '<div class="avatar-name rounded-circle" style="width:100%;height:100%;"><span>' + desc + '</span></div>' +
            '</div>' +
            '</div>' +
            '<div class="media-body" style="margin: 0 0 10px 0px;font-size: .83333rem;">' +
            '<h5 style="margin-bottom:.25rem;font-weight: 510;font-size: 1rem;">' + objArray[counter].DescripcionLarga + '</h5>' +
            '<p style="line-height:2;font-size:.73333rem;margin-bottom: 0;">Consejero/Guía: <i data-idtxtprofe="profe_' + customer + '" id="profe_' + customer + '" '+doc_extra+' style="color: #2c7be5;cursor:pointer;">' + objArray[counter].NombreCompleto + '</i></p>' +
            '<span data-param2="3" data-nombreasingatura="' + objArray[counter].Descripcion + '" data-idasignatura="' + objArray[counter].idSubNivel + '" data-nombrehorario="" data-idtipoespecialidad="' + objArray[counter].idTipoEspecialidad + '" data-idsubnivel="' + objArray[counter].idSubNivel + '" onclick="CargarListaEstudiante(this)" style="cursor:pointer;color: #f5803e;line-height:0;font-size: 1rem;font-weight: 600">' + objArray[counter].RowNumberMatricula + ' Alumnos</span>' +
            '<p style="line-height:2;margin-bottom: 0;"><i class= "fa fa-male text-blue"></i> ' + objArray[counter].male + ' <i class="fa fa-female text-red"></i> ' + objArray[counter].female + ' </p>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<div class="col-sm-8">' +  hor +
            '<button data-param2="3" style="margin: 0 0 10px 0px;padding:.1875rem .75rem;font-size:.875rem;line-height:1.5;border-radius:.2rem;margin-right: .5rem;"  class="btn btn-primary btn-sm"  data-consejero="' + objArray[counter].NombreCompleto + '" data-nombreasingatura="' + objArray[counter].Descripcion + '" data-idasignatura="' + objArray[counter].idSubNivel + '" data-nombrehorario="" data-idtipoespecialidad="' + objArray[counter].idTipoEspecialidad + '" data-idsubnivel="' + objArray[counter].idSubNivel + '" onclick="CargarListaEstudiante(this)"><i class="fa fa-users"></i> Alumnos</button>' + doc +
            con + '<a href="Academica?tp=2&prd=-1&idS=' + objArray[counter].idSubNivel + '" style="color:#fff;background-color:#2c7be5;border-color:#2c7be5;margin: 0 0 10px 0px;padding:.1875rem .75rem;font-size:.875rem;line-height:1.5;border-radius:.2rem;margin-right: .5rem;" class="btn btn-falcon-default btn-sm" ><i class="fa fa-sort-numeric-asc"></i> ' + lib_desc + '</a>' +foda+
            '</div>' +
            '</div>');
        ++counter;
        ++par;
    }
}
function CargarProgramaPost() {
    if ($('#ddlMetodologia option:selected').attr('DesactivarUsuarioPorPeriodo') == 'true') {
        $('#gvCustomers1 thead').empty();
        $('#gvCustomers1 thead').append('<tr><th>#</th><th style="width:5%;">Codigo</th><th style="text-align:left;width:15%;">Grupos</th><th>Docente</th><th># Pre-Matriculados</th><th># Matriculados</th><th style="text-align: center;">Acciones</th></tr>');
        $('.div_periodo').show();
        if (idRolA == 1)
            $('#TabAlum').show();
        var parameters = { "idSubnivel": -1, "idUsuario": -1, "idRol": idRolA };
        jQueryAjaxCallback("../Shared/Utility.aspx/ObtenerPeriodoLibretas", JSON.stringify(parameters), "POST", "json", SetPeriodo);
    }
    else if ($('#ddlMetodologia option:selected').attr('DesactivarUsuarioPorPeriodo') == 'false') {
        $('#gvCustomers1').empty();
        $('#gvCustomers1').append('<thead style="font-weight: bold; background-color: #ecf0f5;">' +
            '<tr><th>#</th>' +
            '<th style="text-align:left;">Grupos</th>' +
            '<th style="text-align:left;">Consejero</th>' +
            '<th style="text-align:center;"># Matriculados</th>' +
            '<th style="text-align: center;">Acciones</th></tr></thead>');
        $('.div_periodo').hide();
        if (idRolA == 1)
            $('#TabAlum').hide();
        CargarListaAsignaturas();
    }
}
function SetPeriodo(m) {
    var counter = 0;
    var data = $.parseJSON(m.d);
    var arrayLength = data.length;
    $('.PeriodoAsignatura').empty();
    for (var i = 0; i < arrayLength; i++) {
        $('.PeriodoAsignatura').append('<option value="' + data[i].id + '">' + data[i].Nombre + '</option>');
    }
    if (data[0].idPeriodoSet != -1)
    $('.PeriodoAsignatura').val(data[0].idPeriodoSet);
        CargarListaAsignaturas(); 
}
function CargarListaEstudiante(thisElement) {
    console.log('CargarListaEstudiante');
    $('#ListAlumnosA tbody').empty();
    $('#ChkAll').prop('checked', false);
    $('#btnImprimir').empty();
    $('#NunMatriculados').text('Matriculados ' + 0);
    $('#MdAlumnos').modal('show');
    $('#NunMatriculados').data('idasignatura', $(thisElement).data('idasignatura'));
    $('#tm_lista').text($(thisElement).data('nombreasingatura'));
    $('#tm_lista_idSubnivel').val($(thisElement).data('idsubnivel'));
    $('#btnPrintMdAl').attr('onclick', 'btn_print(' + $(thisElement).data('idsubnivel') + ')');
    $('#btnAgregarAl').attr('href', 'StudentDetailDiurno?x1=2&x3=' + $('#ddlMetodologia').val()+'');
    $('#param2').val($(thisElement).data('param2'));
    var idTipoespecialidad = $(thisElement).data('idtipoespecialidad');
    console.log(idTipoespecialidad)
    var DesactivarUsuarioPorPeriodo = ConverterBool($('#ddlMetodologia option:selected').attr('DesactivarUsuarioPorPeriodo'));   
    if (idRolA == 1) {
        if ((DesactivarUsuarioPorPeriodo == true) || (idTipoespecialidad == 5)) {
            $('#MatricularAl').show();
            $('#btnMovelAl').hide();
            $('#btnEliminarAl').show();
            $('#btnEliminarAl').text(' Eliminar del Grupo');
            $('#btnAgregarAl').hide();
            $('#btnEliminarAl').attr('onclick', 'AccionAlumnoGrupo(8, ' + $(thisElement).data('idsubnivel')+')');
            $('#btnAgregarAl').attr('href', 'StudentDetail?x1=2');
        }
        else if (DesactivarUsuarioPorPeriodo == false) {
            $('#MatricularAl').hide();
            $('#btnMovelal').show();
            $('#btnEliminarAl').show();
            $('#btnAgregarAl').attr('href', 'StudentDetailDiurno?x1=2');
        }
    }
    $('#btnImprimir').html('<strong id="totAl" class="text-red"></strong><button data-idasignatura="' + $(thisElement).data('idasignatura') + '" type="button" class="btn btn-primary float-right" onclick="btn_print(' + $(thisElement).data('idsubnivel')+');"><i class=" fa fa-file-pdf-o"></i> Imprimir Lista</button>');
        $('#NunMatriculados').data('actual', true).css({ 'color': 'black' });
       
    $('#_confM_idSubnivel').val($(thisElement).data('idsubnivel'));
    CallAlumnosGrupoTable($(thisElement).data('idsubnivel'), $('#param2').val(), 1);
}
function CallAlumnosGrupoTable(idSubnivel, opcion, opcion2) {
    console.log('CallAlumnosGrupoTable');
    var idPeriodo = $('.PeriodoAsignatura option:selected').val();
    if (opcion == 3)
        idPeriodo = -1;
    var parameters = { "idSubnivel": idSubnivel, "idPeriodo": idPeriodo, "opcion": opcion };
    console.log(parameters)
    if (opcion2 == 1)
        jQueryAjaxCallback("../Shared/Utility.aspx/ListaAlumnos", JSON.stringify(parameters), "POST", "json", DibujaListaAlumnos);
    else if (opcion2 == 2)
        jQueryAjaxCallback("../Shared/Utility.aspx/RepListaGrupo", JSON.stringify(parameters), "POST", "json", Postbtn_excel);
}
function btn_excel() {
    CallAlumnosGrupoTable($('#tm_lista_idSubnivel').val(), $('#param2').val(), 2);
}
function Postbtn_excel(data) {
    if (data.d == "-1") {
        Message(1, 'No se encontro registros por imprimir', 'Mensaje Exitoso');
    }
    else {
        document.getElementById("dlink").href = data.d;
        document.getElementById("dlink").click();
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
function AccionAlumnoGrupo(tipo, idSubnivel, idUsuario) {
    if (tipo == 6) {
        $('.none').remove();
        $('.1ref').css('display', 'inline');
        $('.3ref').css('display', 'inline');
        $('.4ref').css('display', 'none');
        $('.t_user').css('display', '');
        $('.t_cont').css('display', '');
    }
    else if (tipo == 7) {
        var parameters = { "idUsuario": idUsuario, "Nombre": $('#edit_nombre').val(), "Apellido": $('#edit_apellido').val(), "Cedula": $('#edit_cedula').val() };
        jQueryAjaxCallback("../Shared/Utility.aspx/UpdateDatosrapidos", JSON.stringify(parameters), "POST", "json", PostAccionAlumnoGrupo);
    }
    else if (tipo == 5) {
        $('.none').remove();
        $('.1ref').css('display', 'inline');
        $('.3ref').css('display', 'inline');
        $('.4ref').css('display', 'none');

        $("#a_nom_" + idUsuario).css('display', 'none');
        $("#a_ape_" + idUsuario).css('display', 'none');
        $("#a_ced_" + idUsuario).css('display', 'none');
        $('.t_user').css('display', 'none');
        $('.t_cont').css('display', 'none');

        $('#a_edit' + idUsuario).css('display', 'none');
        $('#a_cancel' + idUsuario).css('display', 'inline');
        $('#a_guardar' + idUsuario).css('display', 'inline');

        var cedula = $("#td_ced_" + idUsuario + " span").html();
        var nombre = $("#td_nom_" + idUsuario + " a").html();
        var apellido = $("#td_ape_" + idUsuario + " a").html();

        $('#td_nom_' + idUsuario).append('<input class="none" id="edit_nombre" type="text" maxlength="100" value="' + nombre + '">');
        $('#td_ape_' + idUsuario).append('<input class="none" id="edit_apellido" maxlength="100" type="text" value="' + apellido + '">');
        $('#td_ced_' + idUsuario).append('<input class="none" id="edit_cedula" maxlength="100" type="text" value="' + cedula + '">');
    }
    else {
        var inputCheck = $('#ListAlumnosA tbody tr input[type="checkbox"]:checked');
        var xmlData = ValidarXmlData(inputCheck);
        if (xmlData.length === 0)
            exit;
        else {
            $('#ListAlumnosA tbody').empty();
            idSubnivel = $('#tm_lista_idSubnivel').val();
            if (tipo == 2) {
                idSubnivel = $('input[name="grupo"]:checked').val();
            }
            var parameters = { "xmlData": xmlData, "idOpcion": tipo, "idSubnivel": idSubnivel };
            jQueryAjaxCallback("../Shared/Utility.aspx/EstatusUser", JSON.stringify(parameters), "POST", "json", PostAccionAlumnoGrupo, false);
        }
    }
}
function getEstudiantePrematricula() {
    $('#tablaEstPreMatricula tbody').empty();
    $('#tablaEstPreMatricula thead').empty();
    var parameters = { "idPeriodo": $('.PeriodoAsignatura option:selected').val() };
    console.log(parameters)
    jQueryAjaxCallback("../Shared/Utility.aspx/EstudiantePrematricula", JSON.stringify(parameters), "POST", "json", DibujarTablaEstudiantesPreMatricula);
}
function DibujarTablaEstudiantesPreMatricula(data) {
    var ArrayMatriculas = JSON.parse(data.d);
    var click = false;
    var counter = 1;
    for (var i = 0; i < ArrayMatriculas.length; i++) {
        if (i == 0) {
            $('#tablaEstPreMatricula thead').append('<tr><td style="text-align: left;">Alumno</td>' +
                '<td style="text-align: center;">Matrícula </td> <td style="text-align: center;">Acciones</td></tr> <tr class="bg-blue">' +
                '<td style="text-align:left;" colspan=4>Total Materias Matriculadas ' + ArrayMatriculas[i].Tot_mat + '</td>' +
                '</tr>');
        }
        if (ConverterBool(ArrayMatriculas[i].Activo) == false) {
            if (click == false) {
                $('#tablaEstPreMatricula tbody').append('<tr class="bg-blue"><td colspan="4">Alumnos sin registros de matrícula</td></tr>');
                click = true;
                counter = 1;
            }
        }
        $('#tablaEstPreMatricula tbody').append('<tr>' +
            //href=StudentDetail?x1=1&x2=' + ArrayMatriculas[i].idUsuario + '&x3=' + ArrayMatriculas[i].idTipoMetodologia + '
            '<td><a class=1ref onclick="getAsignaturasAMatricular(2,' + ArrayMatriculas[i].idUsuario + ', \'' + ArrayMatriculas[i].NombreCompleto + '\')" style="cursor:pointer;font-size: 14px;" > <u class="text-aqua"><div class="user-block"><span class="username" style="margin-left: 0px;">' + (counter) + '. ' + ArrayMatriculas[i].NombreCompleto + '</span>' +
            '<span class="description" style="font-size: 14px;margin-left: 0px;">' + ArrayMatriculas[i].Cedula + '</span></div></u></a></td>' +
            '<td style="text-align:center;"><button type="button" class="btn btn-success btn-sm" onclick="getAsignaturasAMatricular(2,' + ArrayMatriculas[i].idUsuario + ', \'' + ArrayMatriculas[i].NombreCompleto + '\')" ><i class="fa fa-plus my-float"></i> Matricular (' + ArrayMatriculas[i].matriculadas + ')</button></td>' +
            '<td style="text-align:center;"><button type="button" onclick="PrintMatricula(' + ArrayMatriculas[i].idUsuario + ');" style="margin-right:2px;" class="btn btn-success btn-sm"><i class="fa fa-print"></i> Imprimir Matrícula</button><button type="button" data-nombre="' + ArrayMatriculas[i].NombreCompleto + '" data-idrol="5" data-idusuario="' + ArrayMatriculas[i].idUsuario + '" onclick="Obtener_HorarioxUsuario(this);" style="margin-right:2px;" class="btn btn-primary btn-sm"><i class="fa fa-table"> Horario </i> Ver Horario</button></td>' +
            '</tr>');
        counter++;
    }
}
function PrintMatricula(idUsuario, type) {
    var parameters = '';
    if (type == 'HOT') {
        parameters = { "idUsuario": idUsuario, "idPeriodo": $('.PeriodoAsignatura').val(), "tipo": 1 };
        jQueryAjaxCallback("../Shared/Utility.aspx/ReporteAsignaturaAlumno", JSON.stringify(parameters), "POST", "json", PostPrintHorariosExcel);
    }
    else {
        parameters = { "idUsuario": idUsuario, "idPeriodo": $('.PeriodoAsignatura').val(), "tipo": 2 };
        jQueryAjaxCallback("../Shared/Utility.aspx/ReporteAsignaturaAlumno", JSON.stringify(parameters), "POST", "json", PostPrintMatricula);
    }
}
function PostPrintHorariosExcel(data) {
    if (data.d == "-1") {
        Message(1, 'Mensaje Exitoso', 'Mensaje Exitoso');
    }
    else {
        document.getElementById("dlink").href = data.d;
        document.getElementById("dlink").click();
    }
}
function PostPrintHorarios(data) {
    var counter = 0;
    var p = $.parseJSON(data.d);
    var arrayLength = p.length;
    var _Salon = "";
    var marg_vert = 20;
    var doc = new jsPDF('p', 'pt');
    doc.setFontSize(10);
    doc.text("Periodose: " + p[0].NombrePer, 25, 70);
    var data = [];
    var column = [
        { title: "Cod Hor.", dataKey: "CodHor" },
        { title: "Materia", dataKey: "Subnivel" },
        { title: "Docente", dataKey: "Consejero" },
        { title: "Horario", dataKey: "Horario" },
        { title: "Creditos", dataKey: "Creditos" }
    ];
    doc.autoTable([], [], {
        margin: { top: 70, bottom: 50, horizontal: 10 },
        addPageContent: function (data) {
            SetHeader("HORARIOS", doc);
        }
    });
    while (counter < arrayLength) {
        if (counter == 0) {
            _Salon = p[counter].Salon;
        }
        if (_Salon == p[counter].Salon) {
            data.push({
                CodHor: p[counter].CodHor,
                Subnivel: p[counter].Subnivel,
                Consejero: p[counter].Consejero,
                Horario: NomenclaturaHorarioCorrido(p[counter].Horario),
                Creditos: p[counter].Creditos
            });
        }
        else if (_Salon != p[counter].Salon) {
            doc.text(_Salon, 25, doc.autoTable.previous.finalY + 20);
            doc.autoTable(column, data, {
                margin: { bottom: 50, horizontal: 25, top: 60 },
                theme: 'grid',
                //pageBreak: 'avoid',
                addPageContent: function (data) {
                    SetHeader("HORARIOS", doc);
                },
                startY: doc.autoTable.previous.finalY + 25
            });
            _Salon = p[counter].Salon;
            data = [];
            data.push({
                CodHor: p[counter].CodHor,
                Horario: NomenclaturaHorarioCorrido(p[counter].Horario),
                CodMat: p[counter].CodMat,
                Subnivel: p[counter].Subnivel,
                Consejero: p[counter].Consejero,
                Salon: p[counter].Salon
            });
        }
        counter++;
    }
    doc.save('Horarios_' + p[0].idUsuario + '.pdf');
}
function PostPrintMatricula(data) {
    var counter = 0;
    var p = $.parseJSON(data.d);
    var arrayLength = p.length;
    var doc = new jsPDF('p', 'pt');
    doc.autoTable(getColMatri(), getDatMAtri(arrayLength, p), {
        theme: 'grid',
        addPageContent: function (data) {
            var marg_vert = 20;
            var tituloreporte = "MATERIAS MATRICULADAS";
            if (p[0].idUsuario == -1) {
                $('#typeR').val(-1);
                tituloreporte = 'LISTA DE GRUPOS ABIERTOS';
            }
            else
                $('#typeR').val(0);
            SetHeader(tituloreporte, doc,'l');
            doc.setFontSize(10);
            if (p[0].idUsuario == -1) {
                doc.text("Periodo: " + p[0].NombrePer, 25, 80);
            }
            else {
                doc.text("Cédula: " + p[0].cedula, 10, 80);
                doc.text("Alumno: " + p[0].Alumno, 150, 80);
                doc.text("Periodo: " + p[0].NombrePer, 400, 80);
            }
            doc.setFontSize(9);
            var str = '';
            if (p[0].idUsuario != -1) {
                str = "                                                                                                                                          Recibido:__________________________";
                doc.text(str, 25, doc.internal.pageSize.getHeight() - 170);
                str = "                                                                                                                                          Fecha:_____________________________";
                doc.text(str, 25, doc.internal.pageSize.getHeight() - 145);
            }
            if (typeof doc.putTotalPages === 'function') {
                str = str;
            }
            if (p[0].idUsuario != -1) {
                doc.text("--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------", 25, doc.internal.pageSize.getHeight() - 125);
                doc.text("Nota: La direccion web para acceder a la plataforma educativa academica es: www.academicanet.com", 25, doc.internal.pageSize.getHeight() - 115);
                doc.text("Usuario: " + p[0].NombreUsuario, 25, doc.internal.pageSize.getHeight() - 95);
                doc.text("Contrasena: " + p[0].Contrasena, 25 + 175, doc.internal.pageSize.getHeight() - 95);
                doc.text("--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------", 25, doc.internal.pageSize.getHeight() - 85);
                doc.text("Fecha Impreso: " + moment().locale('es').format('MMM D YYYY, h:mm:ss a'), 25, doc.internal.pageSize.getHeight() - 145);
            }
        },
        margin: { top: 100, bottom: 50, horizontal: 10 },
        styles: { overflow: 'linebreak', fontSize: 7 }
    });
    doc.save('MatriculaAlumno_' + p[0].idUsuario + '.pdf');
}
var getColMatri = function () {
    if ($('#typeR').val() == -1) {
        return [
            { title: "Cod Hor.", dataKey: "CodHor" },
            { title: "Materia", dataKey: "Subnivel" },
            { title: "Horario", dataKey: "Horario" },
            { title: "Docente", dataKey: "Consejero" },
            { title: "Salon", dataKey: "Salon" }
        ];
    }
    else {
        return [
            { title: "Cod Hor.", dataKey: "CodHor" },
            { title: "Materia", dataKey: "Subnivel" },
            { title: "Horario", dataKey: "Horario" },
            { title: "Docente", dataKey: "Consejero" }
        ];
    }
}
function getDatMAtri(rowCount, p) {
    rowCount = rowCount || 4;
    var data = [];
    for (var j = 1; j <= rowCount; j++) {
        if ($('#typeR').val() == -1) {
            data.push({
                CodHor: p[j - 1].CodHor,
                Horario: NomenclaturaHorarioCorrido(p[j - 1].Horario),
                CodMat: p[j - 1].CodMat,
                Subnivel: p[j - 1].Subnivel,
                Consejero: p[j - 1].Consejero,
                Salon: p[j - 1].Salon
            });
        }
        else {
            data.push({
                CodHor: p[j - 1].CodHor,
                CodMat: p[j - 1].CodMat,
                Subnivel: p[j - 1].Subnivel,
                Consejero: p[j - 1].Consejero,
                Horario: NomenclaturaHorarioCorrido(p[j - 1].Horario)
            });
        }
    }
    return data;
}
function busqueda(opcion) {
    if (opcion == 1) {
        $("#kwd_search").hide();
        $("#Text1").show();
    }
    else if (opcion == 2) {
        $("#Text1").hide();
        $("#kwd_search").show();
    }
}
function getAsignaturasAMatricular(tipo, idUsuario, NombreCompleto) {
    $("#search_mat").val('');
    $('#TipoOpcionMatricula').val(tipo);
    if (tipo == 1) {
        $('#tit_mat').text(NombreCompleto + ' - ' + $('.PeriodoAsignatura option:selected').text());
    }
    else if (tipo == 2) {
        $('#tit_mat').text(NombreCompleto + ' - ' + $('.PeriodoAsignatura option:selected').text());
    }
    $('#txtCosto').text('0.00');
    $('#txtCreditos').text('0');
    $('#div_PreMatriculaAlumno').css('display', 'block');
    $('#div_alertMatricula').hide();
    $('#Table_matricula tbody').empty();
    $('#ModalMatricula').data('idusuario', Number(idUsuario));
    $('#ModalMatricula').data('NombreCompleto', NombreCompleto);
    $('#ModalMatricula').modal('toggle'); 
    var parameters = { "tipo": tipo, "idUsuario": Number(idUsuario), "idPeriodo": Number($('.PeriodoAsignatura option:selected').val()) };
    jQueryAjaxCallback("../Shared/Utility.aspx/getAsignaturas", JSON.stringify(parameters), "POST", "json", cargarSelectLaboral);
    CargarSalon();
}
function CargarSalon() {
    var parameters = { "idPeriodo": Number($('.PeriodoAsignatura option:selected').val()) };
    jQueryAjaxCallback("../Shared/Utility.aspx/getSalones", JSON.stringify(parameters), "POST", "json", PostCargarSalon);
}
function PostCargarSalon(data) {
    var m = $.parseJSON(data.d);
    var counter = 0;
    var select, opt;
    $('#BuscSalon').find('option').remove().end();
    var arrayLength = m.length;
    while (counter < arrayLength) {
        if (counter == 0) {
            select = document.getElementById('BuscSalon');
            opt = document.createElement('option');
            opt.value = -1;
            opt.innerHTML = '-- Todos los Salones --';
            select.appendChild(opt);
        }
        select = document.getElementById('BuscSalon');
        opt = document.createElement('option');
        opt.value = m[counter].Salon;
        opt.innerHTML = m[counter].Salon;
        select.appendChild(opt);
        counter++;
    }
}
$('#divBtnMatricula').on('click', function () {
    $('#div_alert,#btnActulizarRegistro').hide();
    $('#div_PreMatriculaAlumno').modal('toggle');
});
function Viewimpresion(idOpcion) {
    $('#tblRpt1 tbody').empty();
    $('#tblRpt5 tbody').empty();
    $('#tblRpt3 tbody').empty();
    $('#LblTotal5').text('');
    $('#PrintGrupo').modal('show');
    var parameters = { "idPeriodo": Number($('.PeriodoAsignatura option:selected').val()), "idOpcion": idOpcion, "file": '-1' };
    if (idOpcion == 1)
        jQueryAjaxCallback("../Shared/Utility.aspx/RepAlumMatr", JSON.stringify(parameters), "POST", "json", PostViewimpresion);
    else if (idOpcion == 5)
        jQueryAjaxCallback("../Shared/Utility.aspx/RepAlumMatr", JSON.stringify(parameters), "POST", "json", PostViewimpresio5);
    else if (idOpcion == 3) {
        parameters = { "idUsuario": -1, "idPeriodo": $('.PeriodoAsignatura').val(), "tipo": 2 };
        jQueryAjaxCallback("../Shared/Utility.aspx/ReporteAsignaturaAlumno", JSON.stringify(parameters), "POST", "json", PostViewimpresio3);
    }
}
function PostViewimpresio3(data) {
    $('#tblRpt3 tbody').empty();
    var m = $.parseJSON(data.d);
    var counter = 0;
    var arrayLength = m.length;
    while (counter < arrayLength) {
        $('#tblRpt3 tbody').append('<tr><td>' + + m[counter].CodHor + '</td>' +
            '<td>' + m[counter].Subnivel + '</td>' +
            '<td style="text-align:center">' + NomenclaturaHorarioCorrido(m[counter].Horario) + '</td>' +
            '<td style="text-align:center">' + m[counter].Consejero + '</td></tr>');
        counter++;
    }
}
function PostViewimpresio5(data) {
    $('#tblRpt5 tbody').empty();
    var m = $.parseJSON(data.d);
    var counter = 0, counter5 = 0;
    var arrayLength = m.length;
    var idSubnivel = -1;
    var count = 0;
    while (counter < arrayLength) {        
        if (m[counter].idSubnivel == idSubnivel) {
            count++;
            $('#tblRpt5 tbody').append('<tr><td>' + (count + 1) + '. ' + m[counter].NombreCompleto + '</td></tr>');
        }
        else if (m[counter].idSubnivel != idSubnivel) {
            count = 0;
            counter5++;
            idSubnivel = m[counter].idSubnivel;
            $('#tblRpt5 tbody').append('<tr style="background-color:#F5F5F6;font-weight:bold;"><td>' + m[counter].NombreGrupo + '</td></tr>');
            $('#tblRpt5 tbody').append('<tr><td>' + (count + 1) + '. ' + m[counter].NombreCompleto + '</td></tr>');
        }
        counter++;
    }
    $('#LblTotal5').text('Total de Grupos: '+counter5);
}
function PostViewimpresion(data) {
    $('#tblRpt1 tbody').empty();
    var m = $.parseJSON(data.d);
    var counter = 0;
    var arrayLength = m.length;
    while (counter < arrayLength) {
        $('#tblRpt1 tbody').append('<tr><td>' + (counter + 1) + '. '+ m[counter].NombreCompleto + '</td>' +
            '<td>' + m[counter].Cedula + '</td>' +
            '<td style="text-align:center">' + m[counter].anio + '</td>' +
            '<td style="text-align:center">' + m[counter].idOrdenPeriodo + '</td>' +
            '<td>' + m[counter].especialidad + '</td>' +
            '<td style="text-align:center">' + m[counter].sn_matriculada + '</td></tr>');
        counter++;
    }
}
function impresion(idOpcion) {    
    var periodo = $('.PeriodoAsignatura option:selected').text();
    periodo = periodo.replace(/^#\?/, '');
    var file = "NIVELES_" + periodo;
    if (idOpcion == 1)
        file = "GLOBAL_" + periodo;
    var parameters = { "idPeriodo": $('.PeriodoAsignatura').val(), "idOpcion": idOpcion, "file": file };
    jQueryAjaxCallback("../Shared/Utility.aspx/RepAlumMatr", JSON.stringify(parameters), "POST", "json", PostReport);
}
function PostReport(data) {
    if (data.d == "-1") {
        Message(1, 'No se encontro registros por imprimir', 'Mensaje Exitoso');
    }
    else {
        document.getElementById("dlink").href = data.d;
        document.getElementById("dlink").click();
    }
}
function btn_print_final(data) {
    var counter = 0;
    var p = $.parseJSON(data.d);
    var arrayLength = p.length;
    var doc = new jsPDF('p', 'pt');
    doc.setFontSize(9);
    doc.autoTable(getColumnsA(), getDataA(arrayLength, p), {
        theme: 'grid',
        addPageContent: function (data) {
            SetHeader("Lista de Alumnos", doc);
            doc.setFontSize(9);
            doc.text("GRUPO: " + p[0].grupo, data.settings.margin.left + 15, 80);
            doc.text("AÑO LECTIVO: " + p[0].anio, data.settings.margin.left + 15, 95);
        },
        margin: { top: 100, bottom: 50, horizontal: 15 },
        styles: { overflow: 'linebreak' }
    });
    doc.save('Lista_Alumnos.pdf');
}