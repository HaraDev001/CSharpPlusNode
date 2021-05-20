var overlay = $('<div class="overlay"><div class="fa fa-refresh fa-spin"></div></div>');
var materia_evaluar = '';
var A1, A2, A3, A4, A5, Mes, ANIO;

function Imprimir() {
    var _idSubNivel = $('#idSubNivel').val();
    if (_idSubNivel == -1) {
        var parameters = { "star": $('#startDate').text(), "idSubNivel": _idSubNivel, "idUsuario": -1, "idRolA": idRolA };
        jQueryAjaxCallback("../Shared/Utility.aspx/generarReporte", JSON.stringify(parameters), "POST", "json", jsPDFAgenda);
    }
    else {
        var parameters = { "star": $('#startDate').text(), "idSubNivel": _idSubNivel, "idUsuario": -1, "idRolA": idRolA };
        jQueryAjaxCallback("../Shared/Utility.aspx/generarReporte", JSON.stringify(parameters), "POST", "json", jsPDFAgenda);
    }
}
function IniciarDatePicker() {
    $('.week-picker_search').find('.ui-datepicker-current-day a').addClass('ui-state-active');
}
function inicializarBotonBusqueda() {
    var selectCurrentWeek_Search = function () {
        window.setTimeout(function () { $('.week-picker_search').find('.ui-datepicker-current-day a').addClass('ui-state-active') }, 1);
    }
    $('.week-picker_search').datepicker({
        dateFormat: 'dd/mm/yy',
        showOtherMonths: true,
        closeText: 'Cerrar',
        prevText: '<Ant',
        nextText: 'Sig>',
        currentText: 'Hoy',
        monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
        dayNames: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
        dayNamesShort: ['Lun', 'Mar', 'Mié', 'Juv', 'Vie', 'Sáb'],
        dayNamesMin: ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá'],
        selectOtherMonths: true,
        onSelect: function (dateText, inst) {
            var date = $(this).datepicker('getDate');
            startDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay());
            endDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay() + 6);
            var dateFormat = inst.settings.dateFormat || $.datepicker._defaults.dateFormat;
            $('#startDateSearch').text($.datepicker.formatDate(dateFormat, startDate, inst.settings));
            $('#endDateSearch').text($.datepicker.formatDate(dateFormat, endDate, inst.settings));
            selectCurrentWeek_Search();
        },
        beforeShowDay: function (date) {
            var cssClass = '';
            if (startDate === undefined) {
                var date_b = $(this).datepicker('getDate');
                startDate = new Date(date_b.getFullYear(), date_b.getMonth(), date_b.getDate() - date_b.getDay());
                endDate = new Date(date_b.getFullYear(), date_b.getMonth(), date_b.getDate() - date_b.getDay() + 6);
                if (date >= startDate && date <= endDate)
                    cssClass = 'ui-datepicker-current-day';
                $('#startDateSearch').text($.datepicker.formatDate('dd/mm/yy', startDate));
                $('#endDateSearch').text($.datepicker.formatDate('dd/mm/yy', endDate));
            }
            else if (startDate != undefined) {
                if (date >= startDate && date <= endDate) {
                    cssClass = 'ui-datepicker-current-day';
                }
            }
            return [true, cssClass];
        },
        onChangeMonthYear: function (year, month, inst) {
            selectCurrentWeek_Search();
        }
    });
    $('.week-picker_search .ui-datepicker-calendar tr').mousemove(function () { $(this).find('td a').addClass('ui-state-hover'); });
    $('.week-picker_search .ui-datepicker-calendar tr').mouseleave(function () { $(this).find('td a').removeClass('ui-state-hover'); });
}
function inicializarBotonImpresion() {
    var startDate;
    var endDate;
    var flag;
    var selectCurrentWeek = function () {
        window.setTimeout(function () { $('.week-picker').find('.ui-datepicker-current-day a').addClass('ui-state-active') }, 1);
    }
    $('.week-picker').datepicker({
        dateFormat: 'dd/mm/yy',
        showOtherMonths: true,
        closeText: 'Cerrar',
        prevText: '<Ant',
        nextText: 'Sig>',
        currentText: 'Hoy',
        monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
        dayNames: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
        dayNamesShort: ['Lun', 'Mar', 'Mié', 'Juv', 'Vie', 'Sáb'],
        dayNamesMin: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá'],
        selectOtherMonths: true,
        onSelect: function (dateText, inst) {
            var date = $(this).datepicker('getDate');
            startDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay() + 1);
            endDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay() + 6);
            var dateFormat = inst.settings.dateFormat || $.datepicker._defaults.dateFormat;
            $('#startDate').text($.datepicker.formatDate(dateFormat, startDate, inst.settings));
            $('#endDate').text($.datepicker.formatDate(dateFormat, endDate, inst.settings));
            selectCurrentWeek();
        },
        beforeShowDay: function (date) {
            var cssClass = '';
            if (startDate === undefined) {
                var date_b = $(this).datepicker('getDate');
                startDate = new Date(date_b.getFullYear(), date_b.getMonth(), date_b.getDate() - date_b.getDay() + 1);
                endDate = new Date(date_b.getFullYear(), date_b.getMonth(), date_b.getDate() - date_b.getDay() + 6);
                if (date >= startDate && date <= endDate)
                    cssClass = 'ui-datepicker-current-day';
                $('#startDate').text($.datepicker.formatDate('dd/mm/yy', startDate));
                $('#endDate').text($.datepicker.formatDate('dd/mm/yy', endDate));
            }
            else if (startDate != undefined) {
                if (date >= startDate && date <= endDate) {
                    cssClass = 'ui-datepicker-current-day';
                }
            }
            return [true, cssClass];
        },
        onChangeMonthYear: function (year, month, inst) {
            selectCurrentWeek();
        }
    });
    $('.week-picker .ui-datepicker-calendar tr').mousemove(function () { $(this).find('td a').addClass('ui-state-hover'); });
    $('.week-picker .ui-datepicker-calendar tr').mouseleave(function () { $(this).find('td a').removeClass('ui-state-hover'); });
}
function ltrim(str, filter) {
    filter || (filter = '\\s|\\&nbsp;');
    var pattern = new RegExp('^(' + filter + ')*', 'g');
    return str.replace(pattern, "");
}
function rtrim(str, filter) {
    filter || (filter = '\\s|\\&nbsp;');
    var pattern = new RegExp('(' + filter + ')*$', 'g');
    return str.replace(pattern, "");
}
function trim(str, filter) {
    filter || (filter = '\\s|\\&nbsp;');
    return ltrim(rtrim(str, filter), filter);
}
function showDescargarAgendaDialog() {
    window.setTimeout(function () {
        $('.week-picker').find('.ui-datepicker-current-day a').addClass('ui-state-active')
    }, 1);
    $('#DescargarAgendaDialog').modal('show');
}
function html_entities(str) {
    str = $('<textarea />').html(str).text();
    str = $('<textarea />').html(str)[0].innerText;
    return str;
}
function getData(rowCount, p) {
    rowCount = rowCount || 4;
    var data = [];
    var Validador = 0;
    var v1, v2, l1, l2, ma1, ma2, mi1, mi2, j1, j2 = '';
    var cv = 0, cl = 0, cma = 0, cmi = 0, cj = 0;
    for (var j = 0; j < rowCount; j++) {
        Validador = 0;
        //lunes
        if ((j + cl) < rowCount) {
            if (trim(p[j + cl].LUNES) == '-1') {
                if ((j + (cl + 1)) >= rowCount) {
                    l1 = ' ';
                    l2 = ' ';
                }
                else {
                    cl++;
                    if (trim(p[j + cl].LUNES) == '-1') {
                        if ((j + (cl + 1)) >= rowCount) {
                            l1 = ' ';
                            l2 = ' ';
                        }
                        else {
                            if (trim(p[j + cl].LUNES) != '-1') {
                                l1 = trim(p[j + cl].LUNES);
                                l2 = trim(p[j + cl].MATERIA) + ': ';
                                Validador = 1;
                            }
                            else {
                                cl++;
                                if (trim(p[j + cl].LUNES) == '-1') {
                                    if ((j + (cl + 1)) >= rowCount) {
                                        l1 = ' ';
                                        l2 = ' ';
                                    }
                                    else {
                                        if (trim(p[j + cl].LUNES) != '-1') {
                                            l1 = trim(p[j + cl].LUNES);
                                            l2 = trim(p[j + cl].MATERIA) + ': ';
                                            Validador = 1;
                                        }
                                        else {
                                            cl++;
                                            l1 = trim(p[j + cl].LUNES);
                                            l2 = trim(p[j + cl].MATERIA) + ': ';
                                            Validador = 1;
                                        }
                                    }
                                }
                                else {
                                    l1 = trim(p[j + cl].LUNES);
                                    l2 = trim(p[j + cl].MATERIA) + ': ';
                                    Validador = 1;
                                }
                            }
                        }
                    }
                    else {
                        l1 = trim(p[j + cl].LUNES);
                        l2 = trim(p[j + cl].MATERIA) + ': ';
                        Validador = 1;
                    }
                }
            }
            else {
                l1 = trim(p[j + cl].LUNES);
                l2 = trim(p[j + cl].MATERIA) + ': ';
                Validador = 1;
            }
        }
        else {
            l1 = ' ';
            l2 = ' ';
        }
        //martes
        if ((j + cma) < rowCount) {
            if (trim(p[j + cma].MARTES) == '-1') {
                if ((j + (cma + 1)) >= rowCount) {
                    ma1 = ' ';
                    ma2 = ' ';
                }
                else {
                    cma++;
                    if (trim(p[j + cma].MARTES) == '-1') {
                        if ((j + (cma + 1)) >= rowCount) {
                            ma1 = ' ';
                            ma2 = ' ';
                        }
                        else {
                            if (trim(p[j + cma].MARTES) != '-1') {
                                ma1 = trim(p[j + cma].MARTES);
                                ma2 = trim(p[j + cma].MATERIA) + ': ';
                                Validador = 1;
                            }
                            else {
                                cma++;
                                if (trim(p[j + cma].MARTES) == '-1') {
                                    cma++;
                                    if ((j + (cma + 1)) >= rowCount) {
                                        ma1 = ' ';
                                        ma2 = ' ';
                                    }
                                    else {
                                        if (trim(p[j + cma].MARTES) != '-1') {
                                            ma1 = trim(p[j + cma].MARTES);
                                            ma2 = trim(p[j + cma].MATERIA) + ': ';
                                            Validador = 1;
                                        }
                                        else {
                                            cma++;
                                            ma1 = trim(p[j + cma].MARTES);
                                            ma2 = trim(p[j + cma].MATERIA) + ': ';
                                            Validador = 1;
                                        }
                                    }
                                }
                                else {
                                    ma1 = trim(p[j + cma].MARTES);
                                    ma2 = trim(p[j + cma].MATERIA) + ': ';
                                    Validador = 1;
                                }
                            }
                        }
                    }
                    else {
                        ma1 = trim(p[j + cma].MARTES);
                        ma2 = trim(p[j + cma].MATERIA) + ': ';
                        Validador = 1;
                    }
                }
            }
            else {
                ma1 = trim(p[j + cma].MARTES);
                ma2 = trim(p[j + cma].MATERIA) + ': ';
                Validador = 1;
            }
        }
        else {
            ma1 = ' ';
            ma2 = ' ';
        }
        //miercoles
        if ((j + cmi) < rowCount) {
            if (trim(p[j + cmi].MIERCOLES) == '-1') {
                if ((j + (cmi + 1)) >= rowCount) {
                    mi1 = ' ';
                    mi2 = ' ';
                }
                else {
                    cmi++;
                    if (trim(p[j + cmi].MIERCOLES) == '-1') {
                        if ((j + (cmi + 1)) >= rowCount) {
                            mi1 = ' ';
                            mi2 = ' ';
                        }
                        else {
                            if (trim(p[j + cmi].MIERCOLES) != '-1') {
                                mi1 = trim(p[j + cmi].MIERCOLES);
                                mi2 = trim(p[j + cmi].MATERIA) + ': ';
                                Validador = 1;
                            }
                            else {
                                cmi++;
                                if (trim(p[j + cmi].MIERCOLES) == '-1') {
                                    cmi++;
                                    if ((j + (cmi + 1)) >= rowCount) {
                                        mi1 = ' ';
                                        mi2 = ' ';
                                    }
                                    else {
                                        if (trim(p[j + cmi].MIERCOLES) != '-1') {
                                            mi1 = trim(p[j + cmi].MIERCOLES);
                                            mi2 = trim(p[j + cmi].MATERIA) + ': ';
                                            Validador = 1;
                                        }
                                        else {
                                            cmi++;
                                            mi1 = trim(p[j + cmi].MIERCOLES);
                                            mi2 = trim(p[j + cmi].MATERIA) + ': ';
                                            Validador = 1;
                                        }
                                    }
                                }
                                else {
                                    mi1 = trim(p[j + cmi].MIERCOLES);
                                    mi2 = trim(p[j + cmi].MATERIA) + ': ';
                                    Validador = 1;
                                }
                            }
                        }
                    }
                    else {
                        mi1 = trim(p[j + cmi].MIERCOLES);
                        mi2 = trim(p[j + cmi].MATERIA) + ': ';
                        Validador = 1;
                    }
                }
            }
            else if (trim(p[j + cmi].MIERCOLES) != '-1') {
                mi1 = trim(p[j + cmi].MIERCOLES);
                mi2 = trim(p[j + cmi].MATERIA) + ': ';
                Validador = 1;
            }
        }
        else {
            mi1 = ' ';
            mi2 = ' ';
        }
        //jueves
        if ((j + cj) < rowCount) {
            if (trim(p[j + cj].JUEVES) == '-1') {
                if ((j + (cj + 1)) >= rowCount) {
                    j1 = ' ';
                    j2 = ' ';
                }
                else {
                    cj++;
                    if (trim(p[j + cj].JUEVES) == '-1') {
                        if ((j + (cj + 1)) >= rowCount) {
                            j1 = ' ';
                            j2 = ' ';
                        }
                        else {
                            if (trim(p[j + cj].JUEVES) != '-1') {
                                j1 = trim(p[j + cj].JUEVES);
                                j2 = trim(p[j + cj].MATERIA) + ': ';
                                Validador = 1;
                            }
                            else {
                                cj++;
                                if (trim(p[j + cj].JUEVES) == '-1') {
                                    cj++;
                                    if ((j + (cj + 1)) >= rowCount) {
                                        j1 = ' ';
                                        j2 = ' ';
                                    }
                                    else {
                                        if (trim(p[j + cj].JUEVES) != '-1') {
                                            j1 = trim(p[j + cj].JUEVES);
                                            j2 = trim(p[j + cj].MATERIA) + ': ';
                                            Validador = 1;
                                        }
                                        else {
                                            cj++;
                                            j1 = trim(p[j + cj].JUEVES);
                                            j2 = trim(p[j + cj].MATERIA) + ': ';
                                            Validador = 1;
                                        }
                                    }
                                }
                                else {
                                j1 = trim(p[j + cj].JUEVES);
                                j2 = trim(p[j + cj].MATERIA) + ': ';
                                Validador = 1;
                            }
                            }
                        }
                    }
                    else {
                        j1 = trim(p[j + cj].JUEVES);
                        j2 = trim(p[j + cj].MATERIA) + ': ';
                        Validador = 1;
                    }
                }
            }
            else {
                j1 = trim(p[j + cj].JUEVES);
                j2 = trim(p[j + cj].MATERIA) + ': ';
                Validador = 1;
            }
        }
        else {
            j1 = ' ';
            j2 = ' ';
        }
        //viernes
        if ((j + cv) < rowCount) {
            if (trim(p[j + cv].VIERNES) == '-1') {
                if ((j + (cv + 1)) >= rowCount) {
                    v1 = ' ';
                    v2 = ' ';
                }
                else {
                    cv++;
                    if (trim(p[j + cv].VIERNES) == '-1') {
                        if ((j + (cv + 1)) >= rowCount) {
                            v1 = ' ';
                            v2 = ' ';
                        }
                        else {
                            if (trim(p[j + cv].VIERNES) != '-1') {
                                v1 = trim(p[j + cv].VIERNES);
                                v2 = trim(p[j + cv].MATERIA) + ': ';
                                Validador = 1;
                            }
                            else {
                                cv++;
                                if (trim(p[j + cv].VIERNES) == '-1') {
                                    cv++;
                                    if ((j + (cv + 1)) >= rowCount) {
                                        v1 = ' ';
                                        v2 = ' ';
                                    }
                                    else {
                                        if (trim(p[j + cv].VIERNES) != '-1') {
                                            v1 = trim(p[j + cv].VIERNES);
                                            v2 = trim(p[j + cv].MATERIA) + ': ';
                                            Validador = 1;
                                        }
                                        else {
                                            cv++;
                                            v1 = trim(p[j + cv].VIERNES);
                                            v2 = trim(p[j + cv].MATERIA) + ': ';
                                            Validador = 1;
                                        }
                                    }
                                }
                                else {
                                v1 = trim(p[j + cv].VIERNES);
                                v2 = trim(p[j + cv].MATERIA) + ': ';
                                Validador = 1;
                            }
                            }
                        }
                    }
                    else {
                        v1 = trim(p[j + cv].VIERNES);
                        v2 = trim(p[j + cv].MATERIA) + ': ';
                        Validador = 1;
                    }
                }
            }
            else {
                v1 = trim(p[j + cv].VIERNES);
                v2 = trim(p[j + cv].MATERIA) + ': ';
                Validador = 1;
            }
        }
        else {
            v1 = ' ';
            v2 = ' ';
        }
        if (Validador == 1) {
            data.push({
                LUNES: html_entities(l2 + l1),
                MARTES: html_entities(ma2 + ma1),
                MIERCOLES: html_entities(mi2 + mi1),
                JUEVES: html_entities(j2 + j1),
                VIERNES: html_entities(v2 + v1)
            });
        }
    }
    console.log(data);
    return data;
}
function getColumns() {
    return [
        // { title: "MATERIA", dataKey: "MATERIA" },
        { title: "LUNES " + A1, dataKey: "LUNES" },
        { title: "MARTES " + A2, dataKey: "MARTES" },
        { title: "MIERCOLES " + A3, dataKey: "MIERCOLES" },
        { title: "JUEVES " + A4, dataKey: "JUEVES" },
        { title: "VIERNES " + A5, dataKey: "VIERNES" }
    ];
}
function jspdfAgendaDefault(p, arrayLength) {
    A1 = p[0].A1;
    Mes = p[0].Mes;
    A2 = p[0].A2;
    A3 = p[0].A3;
    A4 = p[0].A4;
    A5 = p[0].A5;
    ANIO = p[0].ANIO;
    var doc = new jsPDF('l', 'pt');
    doc.autoTable(getColumns(), getData(arrayLength, p), {
        addPageContent: function (data) {
            var titulo = "GUIA SEMANAL - " + Mes + " " + A1 + " al " + A5 + " del " + ANIO;            
            SetHeader(titulo, doc, 'l');
            doc.setFontSize(10);
            doc.text("GRUPO: " + p[0].SubNivel_desc, 25, 65);
            doc.text("DOCENTE: " + p[0].NombreCompletoUsuario, 25, 75);
        },
        //columnStyles: {
        //    text: {
        //        columnWidth: 'wrap'
        //    }
        //},
        theme: 'grid',
        headerStyles: { halign: 'center' },
        margin: { top: 90, horizontal: 15 },
        styles: {
            overflow: 'linebreak',
            fontSize: 8,
            lineColor: 41,
            cellPadding: 4.5,
            textColor: [78, 53, 73]
        }//,
        // bodyStyles: { valign: 'top', }
        //columnStyles: { MATERIA: { columnWidth: 'wrap' } },
        //drawCell: function (cell, data) {
        //    if (data.column.dataKey === 'MATERIA') {
        //        if (materia_evaluar != p[data.row.index].MATERIA) {
        //            var flag = 0;
        //        }
        //        materia_evaluar = p[data.row.index].MATERIA;
        //        var count = 0;
        //        $.each(p, function () {
        //            var p = $(this);
        //            if (materia_evaluar == $(this).find("MATERIA").prevObject[0].MATERIA) {
        //                count++;
        //            }
        //        });
        //        if (data.row.index % count === 0) {
        //            doc.setFontSize(7.5);
        //            doc.rect(cell.x, cell.y, data.table.width, cell.height * count, 'DF');
        //            doc.setTextColor(20);
        //            doc.setDrawColor(245);
        //            doc.autoTableText(p[data.row.index].MATERIA, cell.x + cell.width / 2, cell.y + cell.height * count / 2, {
        //                halign: 'center',
        //                valign: 'middle'
        //            });
        //        }
        //        return false;
        //    }
        //    else {
        //        var flag = materia_evaluar == $(this).find("MATERIA").prevObject[0].MATERIA;
        //    }
        //},
        //columnStyles:
        //    {
        //        MATERIA: { fillColor: 245, textColor: 20, fontStyle: 'bold' }
        //    }
    });
    doc.save('Guias.pdf');
}
function jsPDFAgenda(data) {
    $('#DescargarAgendaDialog').modal('hide');
    var counter = 0;
    var p = $.parseJSON(data.d);
    var arrayLength = p.length;
    jspdfAgendaDefault(p, arrayLength);
   
}
function postUpdate(data) {
}
function eventDropped(event, dayDelta, minuteDelta, allDay, revertFunc) {
    if ($(this).data("qtip")) $(this).qtip("destroy");
    updateEventOnDropResize(event, allDay);
}
function eventResized(event, dayDelta, minuteDelta, revertFunc) {
    if ($(this).data("qtip")) $(this).qtip("destroy");
    updateEventOnDropResize(event);
}