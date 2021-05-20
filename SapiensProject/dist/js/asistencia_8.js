var currentEvalHabitoIdUsuario, currentIdAreaOpcionesEvaluacion;
var estaCargadoListaHabitoActitud = false;
var selectOptions = {};
$(function () {
    EvaluacionPeriodo(QueryStringCustom.x1);
});
function EvaluacionPeriodo(idSubnivel) {
    $('#tablaAsistenciaWrapper').empty();
    $('#Modal_Evaluacion').modal('show');
    var parameters = { "idMetodoPromedio": -1, "idSubnivel": idSubnivel,  "idUsuario": -1, "idRol": -1 };
    jQueryAjaxCallback("../Shared/Utility.aspx/ObtenerPeriodoLibretas", JSON.stringify(parameters), "POST", "json", dibujarPeriodosEvaluacion);        
}
function dibujarPeriodosEvaluacion(data) {
    $('#tbPeriodos_E tbody').empty();
        var jsonPeriodo = JSON.parse(data.d);
    var html = '<tr style="background-color: #f2f6f8;border: 1px solid #ccc;">';
        for (var i = 0; i < jsonPeriodo.length; i++) {
            if (i == 0)
                html += '<td><i id="i_' + jsonPeriodo[i].id + '" class="fa fa-check text-blue"></i><a id="pa_' + jsonPeriodo[i].id +'" data-activo="' + jsonPeriodo[i].PublicarDocente_Asistencia + '" class="ElementoSelecionado" href="#" data-idMetodoPromedio="' + jsonPeriodo[i].idMetodoPromedio + '" data-opcion="Periodo" data-fechaini="' + jsonPeriodo[i].FechaInicio + '" data-fechafin="' + jsonPeriodo[i].FechaFin + '" data-idperiodo="' + jsonPeriodo[i].id + '" data-idsubnivel="' + jsonPeriodo[i].idSubnivel + '" onclick="optionSelecionadaE(this)">' + jsonPeriodo[i].Nombre + '</a></td>';
            else
                html += '<td><i style="display:none;" id="i_' + jsonPeriodo[i].id + '" class="fa fa-check text-blue"></i><a id="pa_' + jsonPeriodo[i].id +'"data-activo="' + jsonPeriodo[i].PublicarDocente_Asistencia + '" style="color:black;" href="#" data-idMetodoPromedio="' + jsonPeriodo[i].idMetodoPromedio + '" data-opcion="Periodo" data-fechaini="' + jsonPeriodo[i].FechaInicio + '" data-fechafin="' + jsonPeriodo[i].FechaFin + '" data-idperiodo="' + jsonPeriodo[i].id + '" data-idsubnivel="' + jsonPeriodo[i].idSubnivel + '" onclick="optionSelecionadaE(this)">' + jsonPeriodo[i].Nombre + '</a></td>';
        }
        html += '</tr>';
    $('#tbPeriodos_E tbody').append(html);
    if (jsonPeriodo[0].idPeriodoSet > 0) {
        var tr_a = $('#tbPeriodos_E tbody a');
        var tr_i = $('#tbPeriodos_E tbody i');
        for (var i = 0; i < tr_a.length; i++) {
            $(tr_a[i]).attr('class', '').css({ 'color': 'black' });
            $(tr_i[i]).hide();
        }
        $('#pa_' + jsonPeriodo[0].idPeriodoSet + '').attr('class', 'ElementoSelecionado').css({ 'color': '#1c82e1' });
        var iid = '#i_' + jsonPeriodo[0].idPeriodoSet;
        $(iid).show();
    }
        Periodo_E = $('#tbPeriodos_E tbody tr a[class="ElementoSelecionado"]').eq(0);
        if ((Periodo_E.data('activo') == true) && (idRolA ==4)) {
            $('#MsjAsistencia').empty();
            $('#MsjAsistencia').html('El Trimestre Seleccionado esta Cerrado por el Administrador');
        }
        else if ((Periodo_E.data('activo') == false) || (idRolA == 1)) {
            $('#MsjAsistencia').empty();
            $('#MsjAsistencia').html('<a href="#" onclick="actualizarAsistencia(1);" style="color: rgba(255, 255, 255, 0.9); display: inline-block; margin-right: 10px; text-decoration: none;">Desea guardar los Cambios en Asistencia?</a><a onclick="actualizarAsistencia(1);" id="GuardarAsistencia" title="Guardar Asistencia" href="#" class="btn btn-default btn-sm" style="margin-top: -5px; border: 0px none; box-shadow: none; color: rgb(243, 156, 18); font-weight: 600; background: rgb(255, 255, 255) none repeat scroll 0% 0%;">Guardar</a><span id="b-sample" class="label label-success b-sample-form-status hide" style="display: inline; opacity: 0.369074;">Guardando...</span>');
        }
        construirTablaAsistencia(Periodo_E.data('idperiodo'), jsonPeriodo[0].idSubnivel, Periodo_E.data('activo')  );
}
function optionSelecionadaE(thisElement) {
    $('#TablaAusencias tbody').empty();
    $('#TablaAusencias tbody').append('<div class="pleaseWaitDiv" style="display: none;"><div><span data-i18n="header.t18">Por favor espere...&nbsp;</span><div></div></div></div>');
    var tr_a = $('#tbPeriodos_E tbody a');
    var tr_i = $('#tbPeriodos_E tbody i');
        for (var i = 0; i < tr_a.length; i++) {
            $(tr_a[i]).attr('class', '').css({ 'color': 'black' });
            $(tr_i[i]).hide();
        }
    $(thisElement).attr('class', 'ElementoSelecionado').css({ 'color': '#1c82e1' });  
    var iid = '#i_' + $(thisElement).data('idperiodo');
    $(iid).show();
        Periodo_E = $('#tbPeriodos_E tbody tr a[class="ElementoSelecionado"]').eq(0);
        if ((Periodo_E.data('activo') == true) && (idRolA == 4)) {
            $('#MsjAsistencia').empty();
            $('#MsjAsistencia').html('El Trimestre Seleccionado esta Cerrado por el Administrador');
        }
        else if ((Periodo_E.data('activo') == false)||(idRolA == 1)) {
            $('#MsjAsistencia').empty();
            $('#MsjAsistencia').html('<a href="#" onclick="actualizarAsistencia(1);" style="color: rgba(255, 255, 255, 0.9); display: inline-block; margin-right: 10px; text-decoration: none;">Desea guardar los Cambios en Asistencia?</a><a onclick="actualizarAsistencia(1);" id="GuardarAsistencia" title="Guardar Asistencia" href="#" class="btn btn-default btn-sm" style="margin-top: -5px; border: 0px none; box-shadow: none; color: rgb(243, 156, 18); font-weight: 600; background: rgb(255, 255, 255) none repeat scroll 0% 0%;">Guardar</a>');
        }
        $('#tablaAsistenciaWrapper').empty();
    construirTablaAsistencia(Periodo_E.data('idperiodo'), Periodo_E.data('idsubnivel'));
}
function construirTablaAsistencia(periodoSelectedValue, subnivelSelectedValue, lectura) {
        mostrarElementos();
        var parameters = { "idPeriodo": periodoSelectedValue, "idSubnivel": subnivelSelectedValue };
        obtenerOpcionesEvaluacion();
        jQueryAjaxCallback("../Shared/Utility.aspx/construirTablaAsistencia", JSON.stringify(parameters), "POST", "json", PostConstr);       
}
function PostConstr(data) {
    $('#TablaAusencias tbody').empty();
    var m = $.parseJSON(data.d);
    var counter = 0;
    var arrayLength = m.length;
    while (counter < arrayLength) {
        var span = '';
        var linkEditarHabitos = '';
           if (m[0].idMetodoPromedio == 1)
               linkEditarHabitos = '<button type="button" onclick="mostrarHabitos(\'' + m[counter].idUsuario + '\');" class="btn btn-primary btn-sm"><span class="arrow_expand"></span> Calificar Pre-Escolar</button>';
           else
               linkEditarHabitos = '<button type="button" onclick="mostrarHabitos(\'' + m[counter].idUsuario + '\');" class="btn btn-primary btn-sm"><span class="arrow_expand"></span> HÁBITOS Y ACTITUDES</button>';
        if (ConverterBool(m[counter].Activo) == false)
            span = ' <i class="fa fa-lock text-red"></i>';
        $('#TablaAusencias tbody').append('<tr data-idusuario=' + m[counter].idUsuario + ' class="rowEstudiante" id="' + m[counter].idUsuario + '">' +
            '<td style="text-align:left;" class="sticky-cell" scope="col">' + (counter + 1) + '</td><td style="text-align:left;">' +(counter + 1)+ '. '+m[counter].Nombre +span+ '</td>' +
            '<td class="numerico" data-opcion="1"><input  type ="text" pattern="^[0-9]*$" class="form-control" value="' + m[counter].Ausencias + '" name="ausencias"></td>' +
            '<td class="numerico" data-opcion="2"><input  type ="text" pattern="^[0-9]*$" class="form-control" value="' + m[counter].Tardanzas + '" name="tardanzas"></td>' +
            '<td>' + linkEditarHabitos +'</td>'+
            '<td data-opcion="3"><textarea class="form-control observaciones" rows="2" cols="30" name="observaciones" maxlength="220">' + m[counter].Observaciones + '</textarea></td>' +
            '<td class="ocultar" style="display:none;"><i class="icon fa fa-check"></i></td></tr>');
        counter++;
    }
}
function obtenerOpcionesEvaluacion() {
    if (estaCargadoListaHabitoActitud === false) {
        jQueryAjaxCallback("../Shared/Utility.aspx/obtenerOpcionesEvaluacion", "", "POST", "json", setearOpcionesEvaluacion);
    }
}
function actualizarAsistencia(opcion) {
    var periodoSelectedValue = $('#tbPeriodos_E tbody tr a[class="ElementoSelecionado"]').eq(0);
    var $rows = $('#TablaAusencias tr.rowEstudiante');
    var xml = '<asistencia>';
    var exitSubmit = false;
    $rows.each(function () {
        xml += '<estudiante idPeriodo="' + periodoSelectedValue.data('idperiodo') +'"  idUsuario="' + this.id + '" ';
        var $inputs = $(this).find('input, textarea');
        $inputs.each(function () {
            var currentValue = $.trim($(this).val());
            if ($(this).attr('name') == 'ausencias'){
                if (!isNumeric(currentValue))
                    currentValue = 0;
            }
            if ($(this).attr('name') == 'tardanzas'){
                if (!isNumeric(currentValue))
                    currentValue = 0;
            }
            if ($(this).attr('name') != 'observaciones' && !isNumeric(currentValue)) {               
                exitSubmit = true;
                return false;
            }
            xml += $(this).attr('name') + '="' + currentValue + '" ';
        });
        xml += '/>';
    });
    if (exitSubmit) {
        alert('Por favor solo ingrese números [0-9].');
        return false;
    }
    xml += '</asistencia>';  
    var parameters = { "idPeriodo": periodoSelectedValue.data('idperiodo'), "idSubnivel": periodoSelectedValue.data('idsubnivel'), "xmlData": xml };
    if(opcion ==1)
        jQueryAjaxCallback("../Shared/Utility.aspx/actualizarTablaAsistencia", JSON.stringify(parameters), "POST", "json", updateCompleted);
    else
        jQueryAjaxCallback("../Shared/Utility.aspx/actualizarTablaAsistencia", JSON.stringify(parameters), "POST", "json", PupdateCompleted);
}
function mostrarHabitos(idUsuario) { 
    $('.chatbot').hide();
    $('.chatbot2').show();
    $('#tablaHabitosWrapper-content').empty();
    $('#details_habitos').modal('show');
    currentEvalHabitoIdUsuario = idUsuario;  
    $('#estudiante-eval-nombre').text($("#" + idUsuario).find("td:eq(1)").text());
    var parameters = { "idPeriodo": Periodo_E.data('idperiodo'), "idSubnivel": Periodo_E.data('idsubnivel'), "idUsuario": idUsuario };
    jQueryAjaxCallback("../Shared/Utility.aspx/construirTablaHabito", JSON.stringify(parameters), "POST", "json", callBackMostrarHabito);
}
function ocultarTablaHabito() {
    $('#tablaAsistenciaWrapper').show();
    $('#GuardarAsistencia').show();
    $('#nombreEstudiante_div').show();
    $("#programa").prop("disabled", false);
    $("#periodo").prop("disabled", false);
    $("#subnivel").prop("disabled", false);
    $('#tablaHabitosWrapper').hide();
    $('#GuardarHabito').hide();
    $('#RegresarAsistencia').hide();
}
function guardarTablaHabito() {    
    var xml = XML_c();
    $("#details_habitos").modal('hide');
    $("#Warning").modal('hide');
    var parameters = { "idPeriodo": Periodo_E.data('idperiodo'), "idUsuario": currentEvalHabitoIdUsuario, "xmlData": xml };
    jQueryAjaxCallback("../Shared/Utility.aspx/actualizarTablaHabito", JSON.stringify(parameters), "POST", "json", callBackGuardarTablaHabito);
}
function guardar_Ausencia(thisElement) {
    var idPeriodo = Periodo_E.data('idperiodo');
    var idUsuario = $(thisElement).parents()[1].dataset.idusuario;
    var parameters = { "Opcion": -1, "idPeriodo": idPeriodo, "idUsuario": idUsuario, "Ausencias": -1, "Tardanzas": -1, "Observaciones": "null_data" };

    if ($(thisElement).parents()[0].dataset.opcion == 1) {
        parameters.Ausencias = $(thisElement).val();
        parameters.Opcion = 1;
    }
    else if ($(thisElement).parents()[0].dataset.opcion == 2) {
        parameters.Tardanzas = $(thisElement).val();
        parameters.Opcion = 2;
    }
    else if ($(thisElement).parents()[0].dataset.opcion == 3) {
        parameters.Observaciones = $(thisElement).val();
        parameters.Opcion = 3;
    }

    if (parameters.Opcion != -1) {
        w.postMessage(parameters);
        w.onmessage = function (event) {
        }
    }
}
function setearOpcionesEvaluacion(data) {
    var arr = $.parseJSON(data.d);
    selectOptions = eval("[{" + arr + "}]");
}
function buscarSelectOptions(idArea) {
    for (var opt in selectOptions) {
        for (var id in selectOptions[opt]) {
            if (selectOptions[opt].hasOwnProperty(idArea)) {
                return selectOptions[opt]['' + idArea + ''];
            }
        }
    }
}
function PupdateCompleted(data) {
    Message(1, 'Mensaje Exitoso', 'Mensaje exitoso')
}
function updateCompleted(data) { 
    $(".ocultar").css({ 'display': '' });
    Message(1, 'Mensaje Exitoso', 'Mensaje exitoso')
}
function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}
function mostrarElementos() {
    $('#nombreEstudiante_div').show();
    $('#btnGuardarAsistencia_wrapper').css('visibility', 'visible');
}
function ocultarElementos() {
    $('#nombreEstudiante_div').hide();
    $('#TablaAusencias').hide();
    $('#btnGuardarAsistencia_wrapper').css('visibility', 'hidden');
}
$("#nombreEstudiante").keyup(function () {
    if ($(this).val() != "") {
        $("#TablaAusencias tbody>tr").hide();
        $("#TablaAusencias td:contains-ci('" + $(this).val() + "')").parent("tr").show();
    }
    else {
        $("#TablaAusencias tbody>tr").show();
    }
});
function callBackMostrarHabito(data) {
    //$('#estudiante-eval-nombre').text(nombre);
    $('#tablaHabitosWrapper-content').html('');
    loadHtmlString("tablaHabitosWrapper-content", data);
    if (Periodo_E.data('activo') == true) {
        document.getElementById('GuardarHabito').style.display = 'none';
    }
    else
        document.getElementById('GuardarHabito').style.display = 'inline';
    cargarSelectItems();
}
function cargarSelectItems() {
    var evaluacion = $('#tablaHabitosWrapper-content [id^="idArea-"]');
    evaluacion.each(function () {
        var arrValues = buscarSelectOptions(this.id);
        var selects = $(this).find('div');
        selects.each(function () {
            var currentSelect = this;
            if (currentSelect.className == 'col-sm-5 btn-group eva') {
                var reep = currentSelect.id.replace("idHabitoActitud-", "");
                reep = reep + '-';
                var html, idClick, idclass, idHtml;
                $.each(arrValues, function (key, value) {
                    var i = 0, strLength = value.length;
                    for (i; i < strLength; i++) {
                        value = value.replace("reep", reep);
                        value = value.replace("reemp", reep);
                    }
                    $('#' + currentSelect.id).append(value);
                    if ($(currentSelect).attr('idEvaluacionHabitoActitud') != '-1') {
                        var idEvaluacionHabitoActitud = reep + $(currentSelect).attr('idEvaluacionHabitoActitud');
                    }
                    else {
                        var idEvaluacionHabitoActitud = -1;
                    }
                    if (idEvaluacionHabitoActitud != -1) {
                        $("[id*=" + reep + "]").removeClass('btn btn-success').addClass('btn btn-default');
                        $('#' + idEvaluacionHabitoActitud).removeClass().addClass('btn btn-success');
                    }
                });
            }
        });
    });
}
function seleccionar(thisElement) {    
    var class2 = $('#' + thisElement.id).attr('class');
    if ((class2 == 'btn btn-default') || (class2 == 'btn-default btn')) {
        ////////////////////
        var divPadreNodosHijos = $(thisElement).parent().children();
        for (var i = 0; i < divPadreNodosHijos.length; i++) {
            $('#' + divPadreNodosHijos[i].id).removeClass('btn btn-success');
            $('#' + divPadreNodosHijos[i].id).addClass('btn btn-default');
        }
        ////////////////////
        $('#' + thisElement.id).removeClass('btn btn-default');
        $('#' + thisElement.id).addClass('btn btn-success'); 
    }
    else if ((class2 == 'btn btn-success') || (class2 == 'btn-success btn')) {
        ////////////////////
        var divPadreNodosHijos = $(thisElement).parent().children();
        for (var i = 0; i < divPadreNodosHijos.length; i++) {
            $('#' + divPadreNodosHijos[i].id).removeClass('btn btn-success');
            $('#' + divPadreNodosHijos[i].id).addClass('btn btn-default');
        }
        ////////////////////
        $('#' + thisElement.id).removeClass('btn btn-success');
        $('#' + thisElement.id).addClass('btn btn-default');
    }   
}
function XML_c() {
    var xml = '<evaluacion>';
    var arrayEvalucaciones = $('#tablaHabitosWrapper-content a.btn-success');
    for (var i = 0; i < arrayEvalucaciones.length; i++) {
        xml += '<habito id="' + String( arrayEvalucaciones[i].id).split('-')[0] + '" idEvaluacion="' + String(arrayEvalucaciones[i].id).split('-')[1] + '"/>';
    }
    xml += '</evaluacion>';
    return xml;
}
function callBackGuardarTablaHabito() {
    $('.chatbot').show();
    $('.chatbot2').hide();
    
    $('#tablaHabitosWrapper-content').empty();
    Message(1, 'Mensaje Exitoso', 'Mensaje exitoso')
}