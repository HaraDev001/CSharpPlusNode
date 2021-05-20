var semana = 0;
var fecha = new Date();
var ano = fecha.getFullYear();
var year = ano;
var lunes = moment().day(1)

function InitVert() {
    moment.locale("es");
    $('#vista').val(1);
	Buscador('')
    Cargar_Horarios(1);
}
function Buscador(accion) {
	var dias = 0
    if (accion == 'min')
        dias = - 7;
    else if (accion == 'max')
        dias = 7;	
    lunes = lunes.add(dias, 'd')
    var ultimo = moment(lunes)
	ultimo.add(5, 'd')
    $('#fechaStart').val(moment(lunes).format('YYYY-MM-DD'));
    $('#fechaFinal').val(moment(ultimo).format('YYYY-MM-DD'));
    $('#lblSemana').text(moment($('#fechaStart').val()).format('DD') + ' - ' + moment($('#fechaFinal').val()).format('DD MMMM'));
    if(accion != '')
    Cargar_Horarios(-1);
}
function Cargar_Horarios(tipo) {
    win.showPleaseWait();
    var FechaUsuario = moment().format('YYYY-MM-DD');
    $('#div_Agenda').empty();
    $('#tblAgendaH tbody').empty();
    var idSubNivel = -1;
    var idUsuario = -1;
    if (tipo == -1)
        tipo = $('#idTipo').val();
    else
        $('#idTipo').val(tipo);

    if (tipo == 1) {//vertical       
        idSubNivel = $('#idSubNivel').val();
        $('#Grupo').val($('#idSubNivel option:selected').text());
        if (idSubNivel == 0) {
            idSubNivel = -1;
            $('#Grupo').val('Mis Materias');
            idUsuario = $('#docentes').val();
        }
    }
    else if (tipo == 2) {//horizontal
        $('#Grupo').val('Mis Materias');
        idUsuario = $('#docentes').val();
    }
    var parameters = { "idClave": idRolA, "idSubNivel": idSubNivel, "idUsuario": idUsuario, "start": $('#fechaStart').val(), "end": $('#fechaFinal').val(), "FechaUsuario": GetDate() };
    if (idRolA == 4)
        if (idSubNivel > 0)
            var parameters = { "idClave": 1, "idSubNivel": idSubNivel, "idUsuario": -1, "start": $('#fechaStart').val(), "end": $('#fechaFinal').val(), "FechaUsuario": GetDate() };
    var url = "../Shared/Utility.aspx/SelectAgenda"
    $.ajax(
        {
            url: url,
            data: JSON.stringify(parameters),
            dataType: "json",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                var ArrayHorarios = Re_Ordenar_HorariosxDia($.parseJSON(data.d));
                    if ($('#vista').val() == 1) {                       
                        _Dibujar_Agenda(ArrayHorarios);
                    }
                    else if ($('#vista').val() == 2) {                      
                        Dibujar_Agenda(ArrayHorarios);
                    }
                win.hidePleaseWait();
            },
            error: function (result) {
                win.hidePleaseWait();
                alert("ERROR " + result.status + ' ' + result.statusText);
            }
        });
}
function Dibujar_Agenda(ArrayHorarios) {//table
    $('#div_table').show();
    $('#div_Agenda').hide();
    $('#tblAgendaH tbody').empty();
    var c1 = 0, c2 = 0, c3 = 0, c4 = 0, c5 = 0, cm = 0, hm = '', com = '';
    if (ArrayHorarios.length == 0) {
        $('._NotFound').show();
    }
    else {
        $('._NotFound').hide();
    }
    for (var d = 0; d < ArrayHorarios.length; d++) {
        html = '';
        var name = moment(ArrayHorarios[d].dia).format('dddd');
        if (name == 'lunes')
            c1 = ArrayHorarios[d].Actividades.length;
        else if (name == 'martes')
            c2 = ArrayHorarios[d].Actividades.length;
        else if (name == 'miércoles') {
            c3 = ArrayHorarios[d].Actividades.length;
        }
        else if (name == 'jueves')
            c4 = ArrayHorarios[d].Actividades.length;
        else if (name == 'viernes')
            c5 = ArrayHorarios[d].Actividades.length;
    }
    if (c1 > 0)
        cm = c1;
    if (c2 > cm)
        cm = c2;
    if (c3 > cm)
        cm = c3;
    if (c4 > cm)
        cm = c4;
    if (c5 > cm)
        cm = c5;
    var h1, h2, h3, h4, h5, html = '';
    for (var i = 0; i < cm; i++) {
        hm += '<tr id=' + i + '><td id="l_' + i + '"></td><td id="ma_' + i + '"></td><td id="mi_' + i + '">' +
            '</td><td id="j_' + i + '"></td><td id="v_' + i + '"></td></tr > ';
    }
    $('#tblAgendaH tbody').append(hm);
    for (var d = 0; d < ArrayHorarios.length; d++) {
        html = '';
        var name = moment(ArrayHorarios[d].dia).format('dddd');
        if (name == 'lunes')
            com = 'l_';
        else if (name == 'martes')
            com = 'ma_';
        else if (name == 'miércoles')
            com = 'mi_';
        else if (name == 'jueves')
            com = 'j_';
        else if (name == 'viernes')
            com = 'v_';
        for (var i = 0; i < ArrayHorarios[d].Actividades.length; i++) {
            var idtipoEvento = ArrayHorarios[d].Actividades[i].idtipoEvento;
            if (idtipoEvento == 1) {
                html += ArrayHorarios[d].Actividades[i].NombreSubnivel + ' ' + ArrayHorarios[d].Actividades[i].NombreAsignatura + ' - <strong>' + ArrayHorarios[d].Actividades[i].TipoNota + '</strong> ';
                html += ArrayHorarios[d].Actividades[i].TipoActividad + ' - ';
                html += ' <strong> Tema:</strong> ' + ArrayHorarios[d].Actividades[i].NombreActividad;
                html += '<strong> Contenido:</strong> ' + ArrayHorarios[d].Actividades[i].description;
                $('#' + com + '' + i).html(html);
            }
            else if (idtipoEvento == 2) {
                html += ' <strong> Evento: </strong> ' + ArrayHorarios[d].Actividades[i].NombreActividad;
                $('#' + com + '' + i).html(html);
            }
            html = '';
        }
    }
}
function pdf() {
    $(".pleaseWaitDiv").show();
    var vista = $('#vista').val();
    if (vista == 2) {
        exportPDF();
    }
    else if (vista == 1) {
        _exportPDF();
    }
    $(".pleaseWaitDiv").hide();
}
var specialElementHandlers = {
    // element with id of "bypass" - jQuery style selector
    '.no-export': function (element, renderer) {
        // true = "handled elsewhere, bypass text extraction"
        return true;
    }
};
function _exportPDF() {
    var doc = new jsPDF('l', 'pt', 'a4');
    $('#div_Agenda').css('font-size', '8px');
    var source = document.getElementById('div_Agenda').innerHTML;
    var margins = {
        top: 90,
        bottom: 25,
        left: 50,
        width: 1000
    };
    SetHeader("GUIA SEMANAL - " + $('#lblSemana').html(), doc, 'l');
    doc.setFontSize(10);
    doc.text("GRUPO: " + $("#Grupo").val(), 25, 65);
    //doc.text("DOCENTE: " + p[0].NombreCompletoUsuario, 25, 75);
    doc.fromHTML(
        source,
        margins.left,
        margins.top, {
            'width': 1000//,
            //'elementHandlers': specialElementHandlers
        },
        function (dispose) {
            doc.save('Agenda.pdf');
        }, margins
    );
    $('#div_Agenda').css('font-size', '14px');
}
function exportPDF() {
    var doc = new jsPDF('l', 'pt', 'a4');
    $('#tblAgendaH').css('font-size', '9px');
    var source = document.getElementById('print').innerHTML;
    var margins = {
        top: 90,
        bottom: 25,
        left: 100,
        width: 7.5
    };
    SetHeader("GUIA SEMANAL - " + $('#lblSemana').html(), doc, 'l');
    doc.setFontSize(10);
    doc.text("GRUPO: " + $("#Grupo").val(), 25, 65);
    var pageCount = doc.internal.getNumberOfPages();
    for (i = 0; i < pageCount; i++) {
        doc.setPage(i);
        doc.text(doc.internal.getCurrentPageInfo().pageNumber + "/" + pageCount, 15, 550);
    }
    //doc.text("DOCENTE: " + p[0].NombreCompletoUsuario, 25, 75);
    doc.fromHTML(
        source,
        margins.left,
        margins.top, {
            'width': 180,
            'elementHandlers': specialElementHandlers
        },
        function (dispose) {
            doc.save('Agenda.pdf');
        }, margins
    );
    $('#tblAgendaH').css('font-size', '14px');
}
function printDiv() {
    var html = '';
    if ($('#vista').val() == 1) {
        $('#div_Agenda').css('font-size', '8px');
        html = $('#div_Agenda').html();
        $('#div_Agenda').css('font-size', '14px');
        WindowPrintAjax(html, 'Agenda Semanal ' + $("#lblSemana").text(), 'Grupo ' + $("#Grupo").val(), ' ', 'V');
    }
    else if ($('#vista').val() == 2) {
        $('#tblAgendaH').css('font-size', '12px');
        $('#tblAgendaH tbody').css('font-size', '10.5px');
        html = document.getElementById("tblAgendaH");
        html = html.outerHTML;
        $('#tblAgendaH').css('font-size', '14px');
        $('#tblAgendaH tbody').css('font-size', '12px');
        WindowPrintAjax(html, 'Agenda Semanal ' + $("#lblSemana").text(), 'Grupo ' + $("#Grupo").val(), 'table, th, td {border: 1px solid black;} table {width:100%;}', 'H');
    }
}