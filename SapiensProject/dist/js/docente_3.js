var ArrayDocentes = [];
GetDocentes();
function MostrarModalDocentesLaboral(Element) {
    $('#btnGuardarDocente').data('idperiodo', $(Element).data('idperiodo'));
    $('#btnGuardarDocente').data('idasignatura', $(Element).data('idasignatura'));
    $('#btnGuardarDocente').data('idsubnivel', $(Element).data('idsubnivel'));
    $('#btnGuardarDocente').data('idtxtprofe', $(Element).data('idtxtprofe'));
    $('#btnGuardarDocente').data('idbtn', $(Element).prop('id'));
    $('#div_alert_docente').hide();
    $('#ModalDocente h4').text('Editar Docente - ' + $(Element).data('nombrehorario'));
    $('#ModalDocente').modal('show');
    MostrarDocenteSeleccionado($(Element).data('idconsejero'));
}
function Guardar_DocentesxGrupo(Element) {
    var ArrayInput = $('#div_Docentes input[type="radio"]:checked');
    if (ArrayInput.length > 0) {
        var idbntConsejero = $('#btnGuardarDocente').data('idbtn');
        $('#' + idbntConsejero).data('idconsejero', ArrayInput[0].value);
        var idtxtProfe =  $('#btnGuardarDocente').data('idtxtprofe');
        $('#' + idtxtProfe).text(ArrayInput[0].dataset.nombre);
        $('#ModalDocente').modal('hide');
        Message(1,'Se ha Guardado el Docente con Exito.','Mensaje exitoso');
        var parameters = { "idSubNivel": $('#btnGuardarDocente').data('idsubnivel'), "idUsuarioConsejero": ArrayInput[0].value };
        jQueryAjaxCallback("../Shared/Utility.aspx/Guardar_Docente", JSON.stringify(parameters), "POST", "json", PostGuardoDocente);       
    }
    else {
        fnAlertEstadoDocente(false);
    }
}
function GuardarConsejero(idsubnivel, idUsuarioConsejero){
	var parameters = { "idSubNivel": idsubnivel, "idUsuarioConsejero": idUsuarioConsejero };
	console.log(parameters)
	jQueryAjaxCallback("../Shared/Utility.aspx/Guardar_Docente", JSON.stringify(parameters), "POST", "json", PostGuardoDocente); 
}

function PostGuardoDocente(data) {
    fnAlertEstadoDocente(true);
}
function fnAlertEstadoDocente(estado) {
    $('#div_alert_docente').show();
    if (String(estado) == "true") {
        $('#div_alert_docente').removeClass('alert-danger');
        $('#div_alert_docente').addClass('alert-success');
        $('#div_alert_docente span').eq(0).removeClass('glyphicon-remove');
        $('#div_alert_docente span').eq(0).addClass('glyphicon-ok');
        $('#div_alert_docente strong').text('Exito');
        $('#div_alert_docente span').eq(1).text('Docente asiganado de forma correcta.');
        CargarListaAsignaturas();
    }
    else {
        $('#div_alert_docente').removeClass('alert-success');
        $('#div_alert_docente').addClass('alert-danger');
        $('#div_alert_docente  span').eq(0).removeClass('glyphicon-ok');
        $('#div_alert_docente  span').eq(0).addClass('glyphicon-remove');
        $('#div_alert_docente  strong').text('Error');
        $('#div_alert_docente  span').eq(1).text("Por favor selecciones un docente para guardar.");
    }
}
function GetDocentes() {
    var parameters = {};
    jQueryAjaxCallback("../Shared/Utility.aspx/SELECT_ALL_DOCENTES", JSON.stringify(parameters), "POST", "json", ResponseJsonDocentes);
}
function ResponseJsonDocentes(data) {
    ArrayDocentes = JSON.parse(data.d);
    var html = '';
    for (var i = 0; i < ArrayDocentes.length; i++) {
        if ("--DOCENTE, SIN ASIGNAR--" != ArrayDocentes[i].NombreCompleto) {
            html += '<div class="col-lg-12">';
            html += '<div class="input-group">';
            html += '<span class="input-group-addon">';
            html += '<input class="none" type="radio" id="' + i + '" name="docente" value="' + ArrayDocentes[i].IdDocente + '" data-nombre="' + ArrayDocentes[i].NombreCompleto + '">';
            html += '</span>';
            html += '<input style="cursor: pointer;" onclick="CkickDocente(' + i + ')" type="text" class="form-control" value="' + ArrayDocentes[i].NombreCompleto + '" readonly />';
            html += '</div>';
            html += '</div>';
        }
    }
    $('#div_Docentes').append(html);
}
function CkickDocente(idElemento) {
    if ($('#' + idElemento).is(':checked')) {
        $('#' + idElemento).prop('checked', false);
    }
    else {
        $('#' + idElemento).prop('checked', true);
    }
}
function _ObtenerAsignatura(idNivel, idSubnivel) {
    var parameters = { "param1": $('#ddlMetodologia').val(), "nivel": idNivel, "idSubnivel": idSubnivel, "Activo": 1 };
    jQueryAjaxCallback("../Shared/Utility.aspx/ObtenerAsignaturaAdmin", JSON.stringify(parameters), "POST", "json", dataAsignaturas);
}

function mostrarConsejero(idconsejero){
    var html = '<option value="-1">--DOCENTE, SIN ASIGNAR--</option>';
    $('#ddlConsejeroG').empty();
	for (var d = 0; d < ArrayDocentes.length; d++) {
			html += '<option value="' + ArrayDocentes[d].IdDocente + '">' + ArrayDocentes[d].NombreCompleto + '</option>';
	}
	$('#ddlConsejeroG').append(html);
	MostrarDocenteSeleccionado2(idconsejero)
}
function dataAsignaturas(data) {
	var idconsejero = $('#btnDocentesDiurno').data('idconsejero')
	mostrarConsejero(idconsejero)
        var datajson = JSON.parse(data.d);
        var html = '';
        for (var i = 0; i < datajson.length; i++) {
            html += '<tr>';
            html += '<td>' + (i + 1) + '</td>';
            html += '<td data-id="' + datajson[i].id + '">' + datajson[i].Descripcion + '</td>';
            html += insertSelect(datajson[i].idUsuario)
            html += insertSelect(datajson[i].idUsuarioAsistente)
            html += '</tr>';
        }
        $('#tb_Asignatura tbody').append(html);
}
function insertSelect(idUsuario) {
    html = '<td><select class="form-control">';
    if (idUsuario == -1)
        html += '<option selected value="-1">--Profesor sin asignar--</option>';
    for (var d = 0; d < ArrayDocentes.length; d++) {
        if (idUsuario == ArrayDocentes[d].IdDocente)
            html += '<option selected value="' + ArrayDocentes[d].IdDocente + '">' + ArrayDocentes[d].NombreCompleto + '</option>';
        else
            html += '<option value="' + ArrayDocentes[d].IdDocente + '">' + ArrayDocentes[d].NombreCompleto + '</option>';
   
    }
    html += '</select></td>';
    //html += '</select>' + idUsuario + '</td>';
    return html
}
function GuardarProfxAsignDiurno() {
	var idsubnivel = $('#btnDocentesDiurno').data('idsubnivel')
	var idconsejero = $('#ddlConsejeroG').val();
	GuardarConsejero(idsubnivel, idconsejero)
    var xmlData = '<xmlData>';
    $('#tb_Asignatura tbody tr').each(function () {
        xmlData += getXMLdata(this, 2, 0)
        xmlData += getXMLdata(this, 3, 1)
    });
    xmlData += '</xmlData>';
    var parameters = { "Xml": xmlData, "idSubnivel": $('#btnDocentesDiurno').data('idsubnivel') };
    console.log(parameters)
    jQueryAjaxCallback("../Shared/Utility.aspx/GuardarProfxAsignDiurno", JSON.stringify(parameters), "POST", "json", guardoProfxAsingaturaDiurna);
}
function getXMLdata(that, columna, tipo) {
    var xmlData = ''
    var option = $(that).find("td:eq(" + columna + ") option:selected").val()
    if (option != -1) {
        xmlData += '<data ';
        xmlData += ' idUsuario="' + option + '"';
        xmlData += ' tipo="' + tipo + '"';
        xmlData += ' idAsignatura="' + $(that).find("td:eq(1)").data('id') + '" />';
    }
    return xmlData
}
function guardoProfxAsingaturaDiurna(data) {
    Message(1, 'Se ha guardado el Docente con Exito.','Mensaje Exitoso');
}
function MostrarModalDocneteDiurna(Element) {
    $('#tb_Asignatura tbody').html('');
    _ObtenerAsignatura($(Element).data('idnivel'), $(Element).data('idsubnivel') );
    $('#btnDocentesDiurno').data('idperiodo', $(Element).data('idperiodo'));
    $('#btnDocentesDiurno').data('idasignatura', $(Element).data('idasignatura'));
    $('#btnDocentesDiurno').data('idsubnivel', $(Element).data('idsubnivel'));
    $('#btnDocentesDiurno').data('idtxtprofe', $(Element).data('idtxtprofe'));
    $('#btnDocentesDiurno').data('idconsejero', $(Element).data('idconsejero'));
    $('#div_alert_docente').hide();
    $('#addDocente h4').text('Editar Docentes - ' + $(Element).data('nombrehorario'));
    $('#addDocente').modal('show');
    MostrarDocenteSeleccionado($(Element).data('idconsejero'));
}
var MostrarDocenteSeleccionado = function (idconsejero) {
    $('#div_Docentes input[type="radio"]').each(function () {
        if ($(this).val() == idconsejero) {
			$(this).prop('checked', true);
		} else{
			$(this).prop('checked', false);
		}
    });
}
var MostrarDocenteSeleccionado2 = function (idconsejero) {
    if (idconsejero >0)
        $('#ddlConsejeroG').val(idconsejero);
    else
        $('#ddlConsejeroG').val(-1);
}