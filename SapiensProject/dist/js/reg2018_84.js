var currentIdAgenda, currentIdUsuario, currentIdUsuarioNomenclatura, currentPeriodoFechaIni, currentPeriodoFechaFin;
var currentNotaMinima = -1, currentNotaMaxima = -1;
var fechaInicioPeriodo, fechaFinPeriodo;
var faltaMostrarNota = false
var idAgendaPendiente = 0;
$(document).keydown(function () {
    $(".Slibr").keyup(function () {
        var bus = $.trim($(this).val());
        if (bus != "") {
            $("#TablaNotasEst tbody>tr").hide();
            $("#TablaNotasEst td:contains-ci('" + bus + "')").parent("tr").show();
        }
        else {
            $("#TablaNotasEst tbody>tr").show();
        }
    });
    $('.inputs').keydown(function (e) {
        var fields = '', index = '';
        switch (e.keyCode) {
            case 13: //enter
                fields = $(this).parents('form:eq(0),body').find('.inputs');
                index = fields.index(this);
                if (index > -1 && (index + 1) < fields.length) {
                    fields.eq(index + 1).focus();
                }
                break;
            case 40: // <Down>
                fields = $(this).parents('form:eq(0),body').find('.inputs');
                index = fields.index(this);
                if (index > -1 && (index + 1) < fields.length) {
                    fields.eq(index + 1).focus();
                }
                break;
            case 37: //enter
                fields = $(this).parents('form:eq(0),body').find('.inputs');
                index = fields.index(this);
                if (index > -1 && (index - 1) < fields.length) {
                    fields.eq(index - 1).focus();
                }
                break;
            case 38: // <Down>
                fields = $(this).parents('form:eq(0),body').find('.inputs');
                index = fields.index(this);
                if (index > -1 && (index - 1) < fields.length) {
                    fields.eq(index - 1).focus();
                }
                break;
        }
    });
});
function CallDeleteActivities() {
    CallActividades(0);
}
function GuardarRubricaAlumno() {
    var Xml = '<xmldata>';
    var idAlumno = $('#ddlRubricaAlumno').val();
    var contExist = 0;
    $('.SelCrit').each(function (i, obj) {
        var no = $(this).data('idordencriterio');
        var comentario = $('#tr_rub_' + no).find('textarea').val();
        Xml += '<nota coment="' + comentario + '" idRubricaCriterio="' + $(this).data('idrubricacriterio') + '" idRubricaEscala="' + this.id + '" puntos="' + $(this).data('puntos') + '"/>';
        contExist++;
    });
    Xml += '</xmldata>';
    if (contExist == 0)
        alert('No ha seleccionado una opcion!');
    else {
        var idAsignatura = $('#idAsignatura').val();
        var idPeriodo = $('#idPeriodo').val();
        var idSubnivel = $('#idSubnivel').val();
        parameters = {
            "idAlumno": idAlumno, "idAgenda": $('#idAgendaRubrica').val(), "Xml": Xml, "idAsignatura": idAsignatura,
            "idSubnivel": idSubnivel, "idPeriodo": idPeriodo, 'TextHtml': '<table>' + $('#TblAlumnoRubrica').html() + '</table>'
        };
        jQueryAjaxCallback("../Shared/Utility.aspx/GuardarRubricaAlumno", JSON.stringify(parameters), "POST", "json", PostLibreta);
        Message(1, 'Exitoso', 'Se ha guardado la Rubrica con exito');
    }
}
function AgregarEscala(tipoCrear, ArrayEscala_l, ArrayEscala) {
    var countEsc = 0;
    var columFinalEscala = '<th>Pts.</th>';
    $('._e_').each(function (i, obj) {
        countEsc++;
    });
    if (countEsc == 0) {
        var desc0_ = "", punt0 = "";
        var th0 = '<th scope="col">Criterios</th>';
        var th1 = '';
        for (var h = 0; h < ArrayEscala_l; h++) {
            if (tipoCrear == 1) {
                if (h == 0) { desc0_ = "Excelente"; punt0 = "5"; }
                else if (h == 1) { desc0_ = "Muy bueno"; punt0 = "4"; }
                else if (h == 2) { desc0_ = "Bueno"; punt0 = "3"; }
                else if (h == 3) { desc0_ = "Regular"; punt0 = "2"; }
                else if (h == 4) { desc0_ = "Malo"; punt0 = "1"; }
            }
            else {
                desc0_ = ArrayEscala[h].Descripcion;
                punt0 = ArrayEscala[h].Puntaje;
            }
            th1 += '<th class="_e_"><input maxlength="100" type="text" id="et_' + (h + 1) + '" value="' + desc0_ + '" class="tit input_" placeholder="Titulo de Escala">' +
                '<input  onkeypress="return onKeyDecimal(event,this);" maxlength="5" style="width: 50%;" type="text" id="ep_' + (h + 1) + '" value="' + punt0 + '" class="punt input_" placeholder="Puntaje"> pts.</th> ';
        }
        $('#TblAdminRubrica thead').append('<tr>' + th0 + th1 + columFinalEscala + '</tr>');
    }
}
function AgregarCriterio(CantidadEscalas, tipoCrear, ArrayC, ArrayED) {
    var CantCriterios = 1, idOrdenCriterio = 1, max = 0;
    var puntmayor = 0;
    var desc0_ = "", desc1_ = "", columFinalCriterio = "";
    if (tipoCrear == 1) {
        CantCriterios = 1;
        $('._c_').each(function (i, obj) {
            idOrdenCriterio++;
        });
    }
    else {
        CantCriterios = ArrayC.length;
    }
    for (var i = 0; i < CantCriterios; i++) {
        if (tipoCrear == 1)
            desc0_ = "";
        else {
            desc0_ = ArrayC[i].Descripcion;
            CantidadEscalas = ArrayED.length;
        }
        var td = '<td data-idordencriterio="' + (idOrdenCriterio + i) + '"><textarea maxlength="500" class="_c_ textArea_" placeholder="Agregar Criterio">' + desc0_ + '</textarea></td>';
        for (var e = 0; e < CantidadEscalas; e++) {
            if (tipoCrear == 1) {
                desc1_ = "";
                td += '<td data-idordencriterio="' + (idOrdenCriterio + i) + '" class="_e2_" data-idorden="' + (e + 1) + '"><textarea maxlength="400" class="_subd_ textArea_" placeholder="Agregar descripción">' + desc1_ + '</textarea></td>';
            }
            else {
                if (ArrayED[e].idOrdenCriterio == ArrayC[i].idOrden) {
                    desc1_ = ArrayED[e].Descripcion;
                    td += '<td data-idRubricaCriterio="' + ArrayED[e].idRubricaCriterio + '" data-idordencriterio="' + (idOrdenCriterio + i) + '" class="_e2_" data-idorden="' + ArrayED[e].idOrden + '">' +
                        '<textarea maxlength="400" class="_subd_ textArea_" placeholder="Agregar descripción">' + desc1_ + '</textarea></td > ';
                }
            }
        }
        columFinalCriterio = "<td><span class='Respunt'>0</span><span onclick='EliminarCriterio(" + (idOrdenCriterio + i) + ");' class='fa fa-remove (alias) btnEliminar grow' aria-hidden='true' style='display: block; float: right; height: 16px; width: 15px; padding: 0;'></span></td>";
        $('#TblAdminRubrica tbody').append('<tr class="tr_' + (idOrdenCriterio + i) + '">' + td + columFinalCriterio + '</tr>');
    }
}
function EliminarCriterio(tr) {
    $('.tr_' + tr + '').remove();
    CalcularPuntosRubrica(1);
    //rcalcular
}
function AgregarFilaRubrica() {
    AgregarEscala(1, 5, {});
    AgregarCriterio(5, 1, {}, {});
    CalcularPuntosRubrica(1);
}
function CalcularPuntosRubrica(tipo) {
    var max = 0;
    var idOrdenCriterio = 0;
    $('._c_').each(function (i, obj) {
        idOrdenCriterio++;
    });
    if (idOrdenCriterio == 0) idOrdenCriterio = 1;
    $('._e_').each(function (i, obj) {

        if ($(this).find('.punt').val() > Number(max)) {
            max = $(this).find('.punt').val();
        }
    });
    $('.Respunt').text(max);
    max = idOrdenCriterio * max;
    if (tipo == 1)
        $('#_p_').text(max);
    else
        $('#_pa_').text('/' + max);
}
function CambiarEscala(id) {
    if (id == -1) {
        var te1 = $('#ddlEscala').val();
        var te2 = $('#ddlEscala_').val();
        if (te1 == 2) {
            $('.DivRubrica').show();
        }
        else if (te1 == 1) {
            $('.DivRubrica').hide();
        }
        if (te2 == 2) {
            $('.DivRubrica').show();
        }
        else if (te1 == 1) {
            $('.DivRubrica').hide();
        }
    }
    else {
        var te1 = $('#ddl_agenda_tescala_' + id).val();
        if (te1 == 2) {
            $('.DivRubrica').show();
            $('#lblEditidRub_').hide();
        }
        else if (te1 == 1) {
            $('.DivRubrica').hide();
            $('#lblEditidRub_').show();
        }
    }
}
function PrepararListadoRubro() {
    $('#Rubro2').hide();
    $('#Rubro1').show();
    $('#foo2').hide();
    $('#foo1').show();
    $('._t1_').hide();
    $('._t2_').hide();
    $('#header_admin_rub').show();
}
function mostrarubro() {
    LimpiarrRubricas();
    PrepararListadoRubro();
    var idMetodoPromedio = $('#idMetodoPromedio').val();
    $('#ModalRubroAdmin').modal('show');
    if (idMetodoPromedio == 6) {
        CargarRubricas(1);
    }
    else {
        $('#foo1').hide();
        $('#Rubro1').html('<div class="alert alert-danger alert-dismissible"><button type = "button" class="close" data-dismiss="alert" aria-hidden="true">×</button>' +
            '<h4><i class="icon fa fa-ban"></i> Opcion Deshabilitada</h4>Este modulo esta deshabilitado para el Colegio.</div>');
    }
}
function CargarRubricas(idOpcion) {
    parameters = {};
    $('#TblRubricas tbody').empty();
    $('#listRubrica').empty();
    jQueryAjaxCallback("../Shared/Utility.aspx/CargarRubricas", JSON.stringify(parameters), "POST", "json", PostCargarRubricas);
}
function PostCargarRubricas(data) {
    var counter = 0;
    var m = $.parseJSON(data.d);
    var arrayLength = m.length;
    //$('#ddlRubrica').find('option').remove().end();
    while (counter < arrayLength) {
        //var select = document.getElementById('ddlRubrica');
        //var opt = document.createElement('option');
        //opt.value = m[counter].idRubrica;
        //opt.innerHTML = m[counter].titulo;
        //select.appendChild(opt);
        $('#TblRubricas tbody').append('<tr><td><i style="cursor:pointer;" onclick="CrearRubrica(' + m[counter].idRubrica + ',2);"><u class="text-aqua">' + (counter + 1) + '. ' + m[counter].titulo + '</u></i></td> ' +
            '<td>' + m[counter].puntaje + '</td>' +
            '<td><button onclick="CrearRubrica(' + m[counter].idRubrica + ',2);" type="button" style="margin-right:2px;" class="btn btn-primary btn-sm"><i class="fa fa-th"></i> Editar</button></td>' +
            '</tr>');
        var tblr = 'Tbl_' + m[counter].idRubrica;
        //list-group-item 
        $('#listRubrica').append('<div><a data-toggle="collapse" data-parent="#accordion" href="#' + m[counter].idRubrica + '" onclick="ClickTipoNota(2,' + m[counter].idRubrica + ')">' +
            '<u class="text-aqua">' + m[counter].titulo + '</u>' +
            '</a>' +
            '<div id="' + m[counter].idRubrica + '" class="collapse">' +
            '<div class="box-body"><table style="table-layout: fixed;" class="table table-bordered" id="' + tblr + '"><thead></thead><tbody></tbody></table></div></div></div>');
        ++counter;
    }
    //$('.collapse').collapse();
}
var tablerubrica = '';
function CargaridRubrica_(idRubrica, table) {
    tablerubrica = table;
    parameters = { "idRubrica": idRubrica };
    jQueryAjaxCallback("../Shared/Utility.aspx/CargaridRubrica", JSON.stringify(parameters), "POST", "json", PostCargarRubricaPlantilla);
}
function PostCargarRubricaPlantilla(data) {
    var m = $.parseJSON(data.d);
    CreateTableRubrica(m, tablerubrica, 0);
}
function CrearRubrica(idRubrica, idOpcionRubrica) {
    LimpiarrRubricas();
    $('#idOpcionRubrica').val(idOpcionRubrica);
    $('#idRubrica').val(idRubrica);
    $('#header_admin_rub').hide();
    if (idOpcionRubrica == 1) {//de inicio
        $('#TblAdminRubrica tbody').empty();
        $('#TblAdminRubrica thead').empty();
        $('#Rubro1').hide();
        $('#Rubro2').show();
        $('#foo1').hide();
        $('#foo2').show();
        AgregarFilaRubrica();
        $('._t1_').show();
        $('._t2_').hide();
    }
    else if (idOpcionRubrica == 2) {//editar
        $('._t1_').show();
        $('._t2_').show();
        $('#Rubro1').hide();
        $('#Rubro2').show();
        $('#foo1').hide();
        $('#foo2').show();
        CargaridRubrica(idRubrica);
    }
}
function CargaridRubrica(idRubrica) {
    parameters = { "idRubrica": idRubrica };
    jQueryAjaxCallback("../Shared/Utility.aspx/CargaridRubrica", JSON.stringify(parameters), "POST", "json", PostCargaridRubrica);
}
function PostCargaridRubrica(data) {
    $('#TblAdminRubrica tbody').empty();
    $('#TblAdminRubrica thead').empty();
    var counter = 0, cont = 0;
    var m = $.parseJSON(data.d);
    var arrayLength = m.length;
    $('#TituloRubrica').val(m[0].titulo);
    //Arrays de criterios, escalas, detalles

    if (m[0].Criterios == undefined) {
        AgregarFilaRubrica();
    }
    else {
        var ArrayCriterio = m[0].Criterios;
        var ArrayEscala = m[0].Escalas;
        var ArrayEscalaD = m[0].EscalasDetalle;
        var ArrayCriterio_l = ArrayCriterio.length;
        var ArrayEscala_l = ArrayEscala.length;
        var ArrayEscalaD_l = ArrayEscalaD.length;
        AgregarCriterio(ArrayEscalaD_l, 2, ArrayCriterio, ArrayEscalaD);
        AgregarEscala(2, ArrayEscala_l, ArrayEscala);
        CalcularPuntosRubrica(1);
    }
}
function CargarAlumnoRubrica(idAgenda, idAlumno) {
    var parameters = { "idAgenda": idAgenda, "idAlumno": idAlumno };
    jQueryAjaxCallback("../Shared/Utility.aspx/CargarAlumnoRubrica", JSON.stringify(parameters), "POST", "json", PostCargarAlumnoRubrica);
}
function CreateTableRubrica(m, table, Si_puntos) {
    $('#' + table + ' tbody').empty();
    $('#' + table + ' thead').empty();
    var classSel = '';
    $('#TituloRubricaAlumno').text(m[0].titulo);
    var ArrayCriterio = m[0].Criterios;
    var ArrayEscala = m[0].Escalas;
    var ArrayEscalaD = m[0].EscalasDetalle;
    var ArrayCriterio_l = ArrayCriterio.length;
    var ArrayEscala_l = ArrayEscala.length;
    var ArrayEscalaD_l = ArrayEscalaD.length;
    var observaciones = ' ';
    for (var i = 0; i < ArrayCriterio_l; i++) {
        var tr = '<td data-idordencriterio="' + (i + 1) + '">' + ArrayCriterio[i].Descripcion + '</td>';
        for (var e = 0; e < ArrayEscalaD_l; e++) {
            if (ArrayEscalaD[e].idOrdenCriterio == ArrayCriterio[i].idOrden) {
                if (ArrayEscalaD[e]._value == ArrayEscalaD[e].idEscalaDetalle) {
                    observaciones = ArrayEscalaD[e]._Observacion;
                    classSel = 'SelCrit';
                    tr += '<td data-idRubricaCriterio="' + ArrayEscalaD[e].idRubricaCriterio + '" data-puntos="' + ArrayEscalaD[e].puntaje + '" onclick="PressCriterio(' + ArrayEscalaD[e].idEscalaDetalle + ', ' + (i + 1) + ', 1);" id="' + ArrayEscalaD[e].idEscalaDetalle + '"  data-idordencriterio="' + (i + 1) + '" class="_e2_ ' + classSel + '" data-idorden="' + (e + 1) + '">' + ArrayEscalaD[e].Descripcion + '</td>';
                }
                else {
                    classSel = '';
                    tr += '<td data-idRubricaCriterio="' + ArrayEscalaD[e].idRubricaCriterio + '" data-puntos="' + ArrayEscalaD[e].puntaje + '" onclick="PressCriterio(' + ArrayEscalaD[e].idEscalaDetalle + ', ' + (i + 1) + ', 0);" id="' + ArrayEscalaD[e].idEscalaDetalle + '"  data-idordencriterio="' + (i + 1) + '" class="_e2_ ' + classSel + '" data-idorden="' + (e + 1) + '">' + ArrayEscalaD[e].Descripcion + '</td>';
                }
            }
        }
        tr += '<td><textarea style="width: 100%;" placeholder="Escriba sus comentarios..."> ' + observaciones + '</textarea></td>';
        $('#' + table + ' tbody').append('<tr id="tr_rub_' + (i + 1) + '">' + tr + '</tr>');
        observaciones = ' ';
    }
    var th0 = '<th scope="col">Criterios</th>';
    var thf = '<th scope="col">Comentarios</th>';
    var th1 = '';
    for (var h = 0; h < ArrayEscala_l; h++) {
        th1 += '<th class="_e_">' + ArrayEscala[h].Descripcion + ' / ' + ArrayEscala[h].Puntaje + '</th> ';
    }
    $('#' + table + ' thead').append('<tr>' + th0 + th1 + thf + '</tr>');
    if (Si_puntos == 1) {
        var puntos = CalcularPuntosAlumnos();
        $('#_paA_').text(puntos);
        $('#_pa_').text('/' + m[0].Pmax * ArrayCriterio_l);
    }
}
function PostCargarAlumnoRubrica(data) {
    $('#SpanAlru').hide();
    var m = $.parseJSON(data.d);
    CreateTableRubrica(m, 'TblAlumnoRubrica', 1);
}
function PressCriterio(idEscalaDetalle, idordencriterio, sel) {
    $('._e2_').each(function (i, obj) {
        if ($(this).data('idordencriterio') == idordencriterio) {
            $(this).css('background', '');
            $(this).removeClass().addClass('_e2_');
            $(this).attr('onclick', 'PressCriterio(' + this.id + ',' + idordencriterio + ',0);');
        }
    });
    if (sel == 0) {
        $('#' + idEscalaDetalle + '').addClass('SelCrit');
        $('#' + idEscalaDetalle + '').attr('onclick', 'PressCriterio(' + idEscalaDetalle + ',' + idordencriterio + ',1);');
    }
    else
        $('#' + idEscalaDetalle + '').attr('onclick', 'PressCriterio(' + idEscalaDetalle + ',' + idordencriterio + ',0);');
    var puntos = CalcularPuntosAlumnos();
    $('#_paA_').text(puntos);
}
function CalcularPuntosAlumnos() {
    var puntos = 0;
    $('.SelCrit').each(function (i, obj) {
        puntos += $(this).data('puntos');
    });
    return puntos;
}
function GuardarRubrica() {
    var t = $.trim($('#TituloRubrica').val());
    if (t.length == 0) {
        alert('Favor de ingresar el nombre de la rubrica');
        return;
    }
    var idR = $('#idRubrica').val();
    var idO = $('#idOpcionRubrica').val();
    var countEsc = 1;
    var XmlEscala = '<xmldata>';
    var XmlCriterio = '<xmldata>';
    var XmlEscalaDetalle = '<xmldata>';
    //proceso de escala
    $('._e_').each(function (i, obj) {
        var titulo = $(this).find('.tit').val();
        var puntaje = $(this).find('.punt').val();
        XmlEscala += '<esc titulo="' + titulo + '" punt="' + puntaje + '" idOrden="' + countEsc + '"/>';
        countEsc++;
    });
    countEsc = 1;
    $('._c_').each(function (i, obj) {
        XmlCriterio += '<cri titulo="' + $(this).val() + '" idOrden="' + countEsc + '"/>';
        countEsc++;
    });
    countEsc = 1;
    var idOrdenCriterio = 0, idOrdenCriterioSistema = 0;
    $('._e2_').each(function (i, obj) {
        if (idOrdenCriterio != $(this).data('idordencriterio')) {
            idOrdenCriterio = $(this).data('idordencriterio');
            idOrdenCriterioSistema++;
        }
        var titulo = $(this).find('._subd_').val();
        var idOrden = $(this).data('idorden');
        XmlEscalaDetalle += '<esc_det titulo="' + titulo + '" idOrdenCriterio="' + idOrdenCriterioSistema + '" idOrdenDetalle="' + idOrden + '"/>';
        countEsc++;
    });
    XmlEscala += '</xmldata>';
    XmlCriterio += '</xmldata>';
    XmlEscalaDetalle += '</xmldata>';
    parameters = { "idRubrica": idR, "titulo": t, "idOpcion": idO, "XmlEscala": XmlEscala, "XmlEscalaDetalle": XmlEscalaDetalle, "XmlCriterio": XmlCriterio };
    jQueryAjaxCallback("../Shared/Utility.aspx/GuardarRubrica", JSON.stringify(parameters), "POST", "json", PostGuardarRubrica);
}
function PostGuardarRubrica(data) {
    var m = $.parseJSON(data.d);
    $('#idRubrica').val(m[0].idRubrica);
    $('#idOpcionRubrica').val(2);
    Message(1, 'Exitoso', 'Se ha guardado la Rubrica con exito');
    PrepararListadoRubro();
    CargarRubricas(-1);
}
function LimpiarrRubricas() {
    $('#TituloRubrica').val('');
    $('._e_').each(function (i, obj) {
        $(this).find('.tit').val('');
        $(this).find('.punt').val('');
    });
    $('#TblAlumnoRubrica thead').empty();
    $('#TblAlumnoRubrica tbody').empty();
    $('#TblAdminRubrica thead').empty();
    $('#TblAdminRubrica tbody').empty();
}
function agregarNvaNota() {
    var TipoNota = '';
    var SubTipoNota = 1;
    var selectedEventDate = moment($('#txtFechaActividad').val(), 'DD-MM-YYYY');
    console.log(currentPeriodoFechaIni)
    console.log(currentPeriodoFechaFin)
    //if (selectedEventDate.isBefore(currentPeriodoFechaIni) || selectedEventDate.isAfter(currentPeriodoFechaFin)) {
    //    $('#MsjAgrenota').show();
    //    $('#pmsj').text('La fecha escogida no cumple con la fecha de inicio y fecha final del período seleccionado:  Del ' + currentPeriodoFechaIni.format("DD-MM-YYYY") + ' al ' + currentPeriodoFechaFin.format("DD-MM-YYYY") + '');
    //    return false;
    //}
    var idEducador = -1;
    var idMetodoPromedio = $('#idMetodoPromedio').val();
    var DesactivarUsuarioPorPeriodo = ConverterBool($('#DesactivarUsuarioPorPeriodo').val());
    var idPeriodo = $('#idPeriodo').val();
    var idSubNivel = $('#idSubnivel').val();
    var idAsignatura = $('#idAsignatura').val();
    var idTipoActividad = $('#dllTipoActividad').val();
    var NombreActividad = $('#txtTituloActividad').val();
    if (DesactivarUsuarioPorPeriodo == true) {
        TipoNota = $("#dllTipoActividad option:selected").text();
    }
    else if (DesactivarUsuarioPorPeriodo == false) {
        if (idMetodoPromedio == 6) {
            TipoNota = $("#dllTipoActividad option:selected").text();
        }
        if (idMetodoPromedio == 3) {
            TipoNota = $('input[name="categorias_nota"]:checked').val();
            if (typeof TipoNota == 'undefined') {
                alert("Debe escoger el campo Tipo de Nota.");
                return;
            }
            else if (TipoNota == 'Nota Diaria Ejercicio') {
                TipoNota = 'Nota Diaria';
            }
            else if (TipoNota == 'Nota Diaria para entregar') {
                TipoNota = 'Nota Diaria';
                SubTipoNota = 2;
            }
        }
        else if (idMetodoPromedio == 2) {
            TipoNota = $('input[name="categorias_nota"]:checked').val();
            if (typeof TipoNota == 'undefined') {
                alert("Debe escoger el campo Tipo de Nota.");
                return;
            }
            else if (TipoNota == 'Nota Diaria Ejercicio') {
                TipoNota = 'Nota Diaria';
            }
            else if (TipoNota == 'Nota Diaria para entregar') {
                TipoNota = 'Nota Diaria';
                SubTipoNota = 2;
            }
        }
        else if (idMetodoPromedio == 1)
            TipoNota = 'Nota Diaria';
    }
    var FechaInicioActividad = $('#txtFechaActividad').val();
    var FechaFinActividad = $('#txtFechaActividad').val();
    if ($.trim(NombreActividad) == '' || $.trim(FechaInicioActividad) == '') {
        alert('Por favor complete todos los campos.');
        return false;
    }
    var TipoEscala = $('#ddlEscala').val();
    var idRubrica = $('#ddlRubrica').val();
    var DescripcionActividad = $('#txtTituloActividad').val() + ' ' + TipoNota;
    var idCategoriaPorcentaje = -1;
    var parameters = {
        "idEducador": idEducador, "idPeriodo": idPeriodo, "idSubNivel": idSubNivel, "idAsignatura": idAsignatura, "idTipoActividad": idTipoActividad,
        "NombreActividad": NombreActividad, "DescripcionActividad": DescripcionActividad, "FechaInicioActividad": FechaInicioActividad,
        "FechaFinActividad": FechaFinActividad, "TipoNota": TipoNota, "lectura": 0, "SubTipoNota": SubTipoNota, "idModulo": 2, "TipoEscala": TipoEscala,
        "idRubrica": idRubrica, "puntos": 0, "porcentajeA": 0, "idCategoriaPorcentaje": idCategoriaPorcentaje, "FechaAccion": GetDate()
    };
    console.log(parameters)
    jQueryAjaxCallback("../Shared/Utility.aspx/agregarActividad_string", JSON.stringify(parameters), "POST", "json", PostLibreta);
}
function compartirRubro() {
    $('#DivCompartirRubros tbody').empty();
    $('#DivCompartirLibretas tbody').empty();
    $('#DivCompartirRubrosFooter').hide();
    $('#ModalCompartirRubro').modal('show')
    var idPeriodo = $('#idPeriodo').val();
    var idSubnivel = $('#idSubnivel').val();
    var idAsignatura = $('#idAsignatura').val();
    var parameters = { "idAsignatura": idAsignatura, "idSubnivel": idSubnivel, "idPeriodo": idPeriodo, "idRolA": idRolA };
    console.log(parameters)
    jQueryAjaxCallback("../Shared/Utility.aspx/CargarDataRubros", JSON.stringify(parameters), "POST", "json", PostcompartirRubro);
}
function PostcompartirRubro(data) {   
    var c = 0;
    var m = $.parseJSON(data.d);
    var l = m.length;
    //libretas de notas
    while (c < l) {
        $('#DivCompartirLibretas tbody').append('<tr><td><input type="checkbox" data-idSubnivel="' + m[c].idSubnivel + '" data-idAsignatura="' + m[c].idAsignatura + '" data-idPeriodo="' + m[c].idPeriodo + '" class="js-switch" /></td>' +
            '<td>' + m[c].Nombre + '</td>' +
            '<td>' + m[c].NombrePeriodo+'</td></tr > ');
        c++;
    }
    //Rubros
    var lr = m[0].DataRubros.length;
    console.log(lr)
    if (lr > 0) {
        var cr = 0;
        var mr = $.parseJSON(m[0].DataRubros);
        var lr = mr.length;
        while (cr < lr) {
            $('#DivCompartirRubros tbody').append('<tr><td><input type="checkbox" id="_divNotRubro_' + mr[cr].idRubro + '" class="js-switch" /></td>' +
                '<td>' + mr[cr].TipoNota + '</td></tr>');
            cr++;
        }
        $('#DivCompartirRubrosFooter').show();
    }
    //css
    var elems = Array.prototype.slice.call(document.querySelectorAll('.js-switch'));
    elems.forEach(function (html) {
        var switchery = new Switchery(html, { size: 'small' });
    });
}
function CompartirRubrosFinales() {
    //recorrer las dos tablas de rubros y libretas
    //enviar por json a c#
    //codigo de boton nuevo
    //1 objeto Alumnos
    xmlRubros = '<xmlData>';
    xmlLibretas = '<xmlData>';
    var validar1 = 0;
    var validar2 = 0;
    $('#DivCompartirRubros tbody input:checked').each(function (key, value) {
        var id = this.id;
        var idRubro = id.replace('_divNotRubro_', '');
        xmlRubros += '<data idRubro="' + idRubro + '" />';
        validar1++;
    });
    $('#DivCompartirLibretas tbody input:checked').each(function (key, value) {
        var idSubnivel = $(this).data('idsubnivel');
        var idAsignatra = $(this).data('idasignatura');
        var idPeriodo = $(this).data('idperiodo');
        xmlLibretas += '<data  idSubnivel="' + idSubnivel + '" idAsignatura="' + idAsignatra + '" idPeriodo="' + idPeriodo + '" />';
        validar2  ++;
    });
    xmlRubros += '</xmlData>';
    xmlLibretas += '</xmlData>';
    if (validar1 == 0) {
        return;
    }
    if (validar2 == 0) {
        return;
    }
    var parameters = { "xmlRubros": xmlRubros, "xmlLibretas": xmlLibretas, "Fecha": GetDate() };
    jQueryAjaxCallback("../Shared/Utility.aspx/GuardarRubrosCompartidos", JSON.stringify(parameters), "POST", "json", PostCompartirRubrosFinales);
    console.log(parameters)
}
function PostCompartirRubrosFinales(data) {
    $('#ModalCompartirRubro').modal('hide');
    Message(1, 'Mensaje Exitoso', 'Mensaje Exitoso');
}
function notificar() {
    $('#DivNotificarAsignacionFinal tbody').empty();
    $('#DivNotificarAsignacion tbody').empty();
    $('#DivNotificarAlumno tbody').empty();
    $('#DivNotificarFooter').hide();
    $('#ModalNotificar').modal('show')
    var idPeriodo = $('#idPeriodo').val();
    var idSubnivel = $('#idSubnivel').val();
    var idAsignatura = $('#idAsignatura').val();
    var parameters = {
        "idAsignatura": idAsignatura, "idSubnivel": idSubnivel, "idPeriodo": idPeriodo,
        "idOpcion": 1, "Estatus": 1, "idRolA": idRolA, "PermitirFormativa": 0
    };
    jQueryAjaxCallback("../Shared/Utility.aspx/CargarDetalleCategoria", JSON.stringify(parameters), "POST", "json", Postnotificar);
}
function Postnotificar(data) {
    $('#DivNotificarFooter').show();
    var c = 0;
    var m = $.parseJSON(data.d);
    var l = m.length;
    //asignaciones
    while (c < l) {
        $('#DivNotificarAsignacion tbody').append('<tr><td><input type="checkbox" id="_divNotAgen_' + m[c].idAgenda + '" class="js-switch" /></td>' +
            '<td>' + m[c].NombreActividad + '</td>' +
            '<td>' + m[c].AgruparComo + '</td></tr>');
        c++;
    }
    //promedio final
    $('#DivNotificarAsignacionFinal tbody').append('<tr><td><input type="checkbox" id="_divNotpf__99_" class="js-switch" /></td>' +
        '<td>Calificación Final Actual</td>' +
        '<td> </td></tr>');
    //estudiante
    $('._alumno_').each(function (i, obj) {
        var id = this.id;
        $('#DivNotificarAlumno tbody').append('<tr><td><input type="checkbox" checked id="_divNotAlum_' + $(this).attr('idestudiante') + '" class="js-switch" /></td>' +
            '<td>' + $('#' + id + ' span').text() + ' ' + $('#' + id + ' p').text() + '</td>' +
            '<td> </td></tr>');
    });

    //css
    var elems = Array.prototype.slice.call(document.querySelectorAll('.js-switch'));
    elems.forEach(function (html) {
        var switchery = new Switchery(html, { size: 'small' });
    });
}
function CallOpconesAEjecutar() {
    if ($('#idMetodoPromedio').val() == 6)//oculta en la libreta de notas el menu la opcion de compartir rubros pra libretas porcentuales
        $('#opc_4').show();
    else
        $('#opc_4').hide();

    $('#OpcionRightMulti').show();
    Lectura();
    $('#DivLibreta').show();
    $('#DivOpcionDiu').show();
    $('#DivOpcionLab').show();
    //$('#fechainiAtrr').val(jsonPeriodo[counter].FechaInicio);
    //$('#fechafinAtrr').val(jsonPeriodo[counter].FechaFin);
    CargarRubricas(2);
    if ($('#dllTipoActividad option').length < 1) {
        cargarSelectTipoActividad();
    }
    if (ConverterBool($('#DesactivarUsuarioPorPeriodo').val()) == true) {
        construirTablaNota();
    }
    else if (ConverterBool($('#DesactivarUsuarioPorPeriodo').val()) == false) {
        construirTablaNota();
    }
}
function PostConstruirLAboral(data) {
    var counter = 0;
    var jsonPeriodo = $.parseJSON(data.d);
    var arrayLength = jsonPeriodo.length;
    while (counter < arrayLength) {
        if (jsonPeriodo[counter].id == $('#idPeriodo').val()) {
            $('#fechainiAtrr').val(jsonPeriodo[counter].FechaInicio);
            $('#fechafinAtrr').val(jsonPeriodo[counter].FechaFin);
            $('#tipo_calculo').html('<i class="fa fa-info-circle"></i><strong> Periodo: </strong>' + jsonPeriodo[counter].Nombre);
        }
        counter++;
    }
    construirTablaNota();
}
function mostrarHeaderNota(idAgenda) {
    $('#NombreHeaderColumn').val('');
    $('#RubroHeaderColumn').val('');
    $('#PuntosHeaderColumn').val(100);
    $('#encarcheckC').empty();
    $('#encarcheckC').append('<input type="checkbox" id="padrenot" class="js-switch" />');
    var elems = Array.prototype.slice.call(document.querySelectorAll('.js-switch'));
    elems.forEach(function (html) {
        var switchery = new Switchery(html, { size: 'small' });
    });
    $('#ModalHeaderColumn').modal('show');
    $('#HeaderColumnidAgenda').val(idAgenda);
    var parameters = { "idAgenda": idAgenda };
    jQueryAjaxCallback("../Shared/Utility.aspx/GetIdAgenda", JSON.stringify(parameters), "POST", "json", PostmostrarHeaderNota);
}
function PostmostrarHeaderNota(data) {
    console.log(data)
    var counter = 0;
    var m = $.parseJSON(data.d);
    /////////////
    if (m[0].dataRubro != undefined) {
        var a = m[0].dataRubro;
        var leng_a = a.length;
        var cont_a = 0;
        $('#RubroHeaderColumn').find('option').remove().end();        
        while (cont_a < leng_a) {
            select = document.getElementById('RubroHeaderColumn');
            opt = document.createElement('option');
            opt.value = a[cont_a].id
            opt.setAttribute("TipoNota", a[cont_a].TipoNota);
            opt.innerHTML = a[cont_a].TipoNota + ' (' + a[cont_a].Porcentaje+'%)'
            select.appendChild(opt);
            cont_a++;
        }
        $('#RubroHeaderColumn').val(m[0].idCategoriaPorcentaje);
    }
    ////////////
    if (m[0].AplicaPuntajeNotas == 1) {
        $('.DIVPUNTOS').show();
    }
    else
        $('.DIVPUNTOS').hide();
    $('#PuntosHeaderColumn').val(m[0].Puntos);
    $('#NombreHeaderColumn').val(m[0].NombreActividad);
    $('#HeaderColumnTipoScala').val(m[counter].TipoEscala);
    if (m[counter].TipoEscala == 1)
        $('#btnColumTipoNota').text('Númerico');
    else if (m[counter].TipoEscala == 2) {
        $('#btnColumTipoNota').text('Rúbrica');
        $('#HeaderColumnidRubrica').val(m[0].idRubrica);
    }
    else if (m[counter].TipoEscala == 3)
        $('#btnColumTipoNota').text('Cálculo de nota de asistencia');
    else if (m[counter].TipoEscala == 4)
        $('#btnColumTipoNota').text('Porcentaje de Concepto');
}
function CompartirRubros() {
    $('#ModalCompartirRubro').modal('show');
    $('#DivCompartirRubro').html('<table class="table" id="TblRubrosCompartir"><tbody><tr><td><input style="position:relative;left:auto;opacity:initial;" type="checkbox"></td>' +
        '<td>Actividades Grupales</td></tr><tr><td><input style="position:relative;left:auto;opacity:initial;" type="checkbox"></td>' +
        '<td>Asistencia</td></tr><tr><td><input style="position:relative;left:auto;opacity:initial;" type="checkbox"></td>' +
        '<td>Charlas</td></tr><tr><td><input style="position:relative;left:auto;opacity:initial;" type="checkbox"></td>' +
        '<td>Examenes</td></tr><tr><td><input style="position:relative;left:auto;opacity:initial;" type="checkbox"></td>' +
        '<td>Exposiciones</td></tr></tbody></table>');
}
function CompartirRubrosAccion() {
    Message(1, 'Exito', 'Mensaje Exitoso')
    $('#DivCompartirRubro').empty();
}
function GuardarColumnHeader() {
    var idRubrica = -1;
    var value = false;
    var HtmlText = '';
    var TipoScala = $('#HeaderColumnTipoScala').val();
    var idAgenda = $('#HeaderColumnidAgenda').val();
    var puntos = $('#PuntosHeaderColumn').val();
    var rubro = $('#RubroHeaderColumn option:selected').attr('TipoNota');
    var NombreActividad = $('#NombreHeaderColumn').val();
    if (NombreActividad.length == 0) {
        return;
    }
    if (puntos.length == 0) {
        return;
    }
    if (rubro.length == 0) {
        return;
    }
    if (TipoScala == 2) {
        idRubrica = $('#HeaderColumnidRubrica').val();
        HtmlText = '';
    }
    $('#encarcheckC input:checked').each(function () {
        value = true;
    });
    if (TipoScala == 3) {
        idAgendaPendiente = idAgenda
        faltaMostrarNota = true
    }
    var parameters = { "idAgenda": idAgenda, "puntos": puntos, "NombreActividad": NombreActividad, "TipoNota": rubro, "TipoScala": TipoScala, "idRubrica": idRubrica, "NotNotas": value, "HtmlText": HtmlText };
    jQueryAjaxCallback("../Shared/Utility.aspx/GuardarColumnNota", JSON.stringify(parameters), "POST", "json", PostGuardarColumnHeader);
}
function PostGuardarColumnHeader(data) {
    var counter = 0;
    var m = $.parseJSON(data.d);
    if (m[counter].idTipoScala == 2) {
        CargarAlumnoRubrica(m[counter].idAgenda, -1);
    }
    //if tiposcala = 2 entonces generar  html rubrica y despues enviar email
    construirTablaNota();
    $('#ModalHeaderColumn').modal('hide')
    Message(1, 'Se han guardado los cambios.', 'Exitoso');
}
function actualizarNotas(classname) {
    var xml = '<notas>';
    var currentId, currentPlaceHolder, comentario = '', id_comentario;
    var idmetodopromedio = $('#idMetodoPromedio').val();
    var PermitirNotasEnBlanco = true;
    var exitSubmit = false;
    if (idmetodopromedio === "1") {
        var preescolarTieneNotaEnBlanco = false;
        $('.' + classname + ' select').each(function (i, obj) {
            currentValue = $.trim($(this).val());
            currentId = this.id;
            if (currentValue.trim() === '')
                preescolarTieneNotaEnBlanco = true;
            xml += '<estudiante idUsuario="' + this.id.replace('select-', '') + '" nota="0" notaText="' + currentValue + '"/>';
        });
        if (preescolarTieneNotaEnBlanco) {
            if (confirm("Usted ha dejado calificaciones en blanco, ¿Desea continuar y guardar las calificaciones que no selecciono en blanco?") == false) {
                exitSubmit = true;
            }
        }
    }
    else {
        $('.' + classname + ' input[type=text]').each(function (i, obj) {
            currentValue = autocompletar($.trim($(this).val()), currentNotaMaxima);
            currentPlaceHolder = $.trim($(this)[0].placeholder);
            currentId = this.id;
            id_comentario = '';
            id_comentario = 'co' + currentIdAgenda + currentId;
            comentario = '';
            if (currentValue != "") {
                if (isNumeric(currentValue)) {
                    if (idmetodopromedio == 6) {
                        var max = parseInt($('#idAgenda_Puntos_' + classname).text());
                        currentNotaMaxima = max;
                        if (currentValue < 0 || currentValue > currentNotaMaxima) {
                            exitSubmit = true;
                            IsValid(currentId, 'ERROR');
                            alert('Por favor verifique: La nota mínima es de: ' + 0 + ' y la nota máxima es de: ' + currentNotaMaxima);
                            return false;
                        }
                    }
                    else {
                        if (currentValue < currentNotaMinima || currentValue > currentNotaMaxima) {
                            exitSubmit = true;
                            IsValid(currentId, 'ERROR');
                            alert('Por favor verifique: La nota mínima es de: ' + currentNotaMinima + ' y la nota máxima es de: ' + currentNotaMaxima);
                            return false;
                        }
                    }

                    xml += '<estudiante idUsuario="' + this.id + '" nota="' + currentValue + '" notaText="' + comentario + '"/>';
                }
                else {
                    exitSubmit = true;
                    IsValid(currentId, 'ERROR');
                    alert('El campo de nota solo acepta números [0-9] y punto decimal [.]');
                    return false;
                }
            }
            IsValid(currentId, 'NOTERROR');
        });
    }
    if (exitSubmit) {
        return false;
    }
    xml += '</notas>';
    $('#btnActualizarNota').attr('disabled', 'disabled');
    var periodoSelectedValue = $('#idPeriodo').val();
    var subnivelSelectedValue = $('#idSubnivel').val();
    var asignaturaSelectedValue = $('#idAsignatura').val();
    var parameters = {
        "idAsignatura": asignaturaSelectedValue, "idSubnivel": subnivelSelectedValue, "idPeriodo": periodoSelectedValue, "idAgenda": classname, "xmlNotas": xml, "lectura": 1, "FechaAccion": GetDate()
    };
    jQueryAjaxCallback("../Shared/Utility.aspx/actualizarNotas", JSON.stringify(parameters), "POST", "json", PostLibreta);
    Message(1, 'Exitoso', 'Nota actualizada con exito.');
}
function EnviarNotificacion() {
    //recorrer las tres tablass
    //enviar por json a c#
    //codigo de boton nuevo
    //1 objeto Alumnos
    jsonObj = [];
    $('#DivNotificarAlumno tbody input:checked').each(function (key, value) {
        item = {}
        var id = this.id;
        var idUsuario = id.replace('_divNotAlum_', '');
        item["idUsuario"] = idUsuario;
        //promedio final
        $('#DivNotificarAsignacionFinal tbody input:checked').each(function (key, value) {
            item["final"] = 1;
        });
        //Asignaturas
        $('#DivNotificarAsignacion tbody input:checked').each(function (key, value) {
            var id = this.id;
            var idAgenda = id.replace('_divNotAgen_', '');
            var nota = $('#' + idAgenda + idUsuario).text();
            if (nota == undefined)
                nota = 'Sin nota';
            var actividad = $('#theader_' + idAgenda).text();
            item["idAgenda"] = "La actividad de " + actividad + " genero una nota de: " + nota;
        });
        jsonObj.push(item);
    });
    console.log(jsonObj);
    var parameters = { "Fecha": GetDate(), "jsonText": jsonObj };
    jQueryAjaxCallback("../Shared/Utility.aspx/EnviarNotificacionNotas", JSON.stringify(parameters), "POST", "json", PostEnviarNotificacion);
    console.log(JSON.stringify(parameters))
}
function PostEnviarNotificacion(data) {
    $('#ModalNotificar').modal('hide');
    Message(1, 'Mensaje Exitoso', 'Mensaje Exitoso');
}
function EliminarActividades() {
    $('#MdActividadesEliminar').modal('show');
    CallActividades(0);
}
function CategoriaConfig() {
    var idMetodoPromedio = $('#idMetodoPromedio').val();
    if (idMetodoPromedio == 6) {
        $('#divGrafica').hide();
        $('#FooterCateg').show();
        CancelarCRubro();
        $('#DivRubroMay').hide();
        $('#lblAcumuRub').text('0 %');
        $('#lblAcumuRub').removeClass().addClass('label bg-red');
        $('#lblAcum_det').text('');
        $('#UlActividades').sortable({
            placeholder: 'sort-highlight',
            handle: '.handle',
            forcePlaceholderSize: true,
            zIndex: 999999,
            update: function (event, ui) {
                var orden = $(this).sortable('toArray').toString();
            }
        });
        $('#UlActividades').empty();
        $('#UlActividades').show();
        $('#TblActividades').hide();
        $('#CrearRubDiv').show();
        CallActividades(1);
        $('#Modal_CategoriaConfig').modal('show');
    }
    else {
        $('#FooterCateg').hide();
        $('#TblActividades tbody').empty();
        $('#TblActividades').show();
        $('#UlActividades').hide();
        $('#CrearRubDiv').hide();
        CallActividades(1);
        $('#Modal_CategoriaConfig').modal('show');
    }
}
function printPrueba() {
    var xml = "[", e = '';
    var counter = 0;
    var countitem = 0;
    $('._alumno_ p').css('color', '');
    $("#TablaNotasEst thead tr").each(function (index) {
        e = '';
        if (counter > 0) {
            xml += "{ ";
            $(this).children().each(function (index2) {
                if (countitem > 0) {
                    var er = $(this).html();
                    er = er.charAt(0);
                    if (er == '<') {
                        $(this).children().each(function (index3) {
                            e = $(this).html();
                            e = e.replace('<p>', ' ');
                            e = e.replace('</p>', ' ');
                            return false;
                        });
                    }
                    else {
                        e = $(this).html();
                    }
                    if (e == "") {
                        e = "";
                    }
                    xml += ", id" + countitem + ":'" + e + "' ";
                }
                else {
                    if ($('#idMetodoPromedio').val() == 6)
                        xml += "id0:'#', id01:'Alumnos', id02:'Final 100%' ";
                    else
                        xml += "id0:'Alumnos' ";
                }
                countitem++;
            });
        }
        counter++;
    });
    xml += "}, ";
    $("#TablaNotasEst tbody tr").each(function (index) {
        xml += "{ ";
        counter = 0;
        $(this).children().each(function (index2) {
            if (counter == 0) {
                e = $(this).attr('id');
                e = $('#' + e + ' span').html() + ', ' + $('#' + e + ' p').html();
            }
            else
                e = $(this).html();
            var c = " ";
            if (counter > 0)
                c = ",";
            if ((e == "") || (e == "&nbsp;")) {
                e = "";
            }
            ////
            var regex = new RegExp("\'", "g");
            var e = e.replace(regex, " ");
            ///
            xml += c + "id" + counter + ":'" + e + "' ";
            counter++;
        });
        xml = xml.substring(0, xml.length - 1);
        xml += " ,contador:'" + counter + "'},";
    });
    xml = xml.substring(0, xml.length - 1);
    xml += "]";
    $('._alumno_ p').css('color', '#999');
    var parameters = { "xml": xml };
    jQueryAjaxCallback("../Shared/Utility.aspx/LibretaExcel", JSON.stringify(parameters), "POST", "json", PostLibretaExcel);
}
function PostLibretaExcel(data) {
    if (data.d == "-1") {
        Message(1, 'No se encontro registros por imprimir', 'Mensaje Exitoso');
    }
    else {
        document.getElementById("dlink").href = data.d;
        document.getElementById("dlink").click();
    }
}
function loadImage(image, id) {
    //$('#MdImage').modal('show');
    //$('#imgPerfil').prop('src', image);
    //var nombre = $('#th_' + id + ' a').html();
    //$('#nombrePerfil').html(nombre);
}
function CallActividades(Estatus) {
    var idMetodoPromedio = $('#idMetodoPromedio').val();
    $('#TblActividades tbody').empty();
    var idPeriodo = $('#idPeriodo').val();
    var idSubnivel = $('#idSubnivel').val();
    var idAsignatura = $('#idAsignatura').val();
    if (Estatus == 1) {
        var parameters = { "idAsignatura": idAsignatura, "idSubnivel": idSubnivel, "idPeriodo": idPeriodo, "idOpcion": 1, "Estatus": Estatus, "idRolA": idRolA, "PermitirFormativa": 0 };
        if (idMetodoPromedio == 6) {
            $('#lblAcumuRub').text('0 %');
            $('#lblAcumuRub').removeClass().addClass('label bg-red');
            $('#UlActividades').empty();
            jQueryAjaxCallback("../Shared/Utility.aspx/CargarDetalleCategoria", JSON.stringify(parameters), "POST", "json", PostActividaesConfig6);
        }
        else
            jQueryAjaxCallback("../Shared/Utility.aspx/CargarDetalleCategoria", JSON.stringify(parameters), "POST", "json", PostActividaesConfig);
    }
    else if (Estatus == 0) {
        AgendasEliminadas(idAsignatura, idSubnivel, idPeriodo, Estatus)
    }
}
function EditarCategoria(idCategoriaPorcentaje, porcentaje, idTipoActividad) {
    var ddlidTipoActividad_ = 'select_nombre_' + idCategoriaPorcentaje;
    $('#td_nombre_' + idCategoriaPorcentaje + '').html('<select id="' + ddlidTipoActividad_ + '">');
    $('#td_porcentaje_' + idCategoriaPorcentaje + '').html('<input class="form-control" onkeypress="return onKeyDecimal(event,this);" maxlength="5" value="' + porcentaje + '" type="text" id="input_porcentaje_' + idCategoriaPorcentaje + '">%');
    $('#td_button_' + idCategoriaPorcentaje + '').html('<a class="btn btn-default" onclick="CancelarCategoria();" href="#">Cancelar</a><a class="btn btn-success" href="#" onclick="GuardarCategoria(' + idCategoriaPorcentaje + ');">Guardar</a>');
    var options = $("#dllTipoActividad > option").clone();
    $('#' + ddlidTipoActividad_).append(options);
    $('#' + ddlidTipoActividad_).val(idTipoActividad);
}
function GuardarCategoria(idCategoriaPorcentaje) {
    var porcentaje = $('#input_porcentaje_' + idCategoriaPorcentaje).val();
    var idTipoActividad = $('#select_porcentaje_' + idCategoriaPorcentaje).val();
    if (idTipoActividad.length == 0) {
        $('#MsjErrorCrarrubro').html('<div class="alert" style="color: #781d2d;background-color: #fad7dd;border-color: #f8c7d0;" role="alert"><i class="fa fa-info-circle fa-2x"></i> ERROR: el campo de Rubro es un campo obligatorio, favor de llenarlo.</div>');
        $('#MsjErrorCrarrubro').show();
        return;
    }
    if (porcentaje.length == 0) {
        $('#MsjErrorCrarrubro').html('<div class="alert" style="color: #781d2d;background-color: #fad7dd;border-color: #f8c7d0;" role="alert"><i class="fa fa-info-circle fa-2x"></i> ERROR: el campo de Porcentaje  es un campo obligatorio, favor de llenarlo.</div>');
        $('#MsjErrorCrarrubro').show();
        return;
    }
    if (porcentaje == 0) {
        $('#MsjErrorCrarrubro').html('<div class="alert" style="color: #781d2d;background-color: #fad7dd;border-color: #f8c7d0;" role="alert"><i class="fa fa-info-circle fa-2x"></i> ERROR: el campo de Porcentaje  es un campo obligatorio, favor de llenarlo.</div>');
        $('#MsjErrorCrarrubro').show();
        return;
    }
    var parameters = { "idCategoriaPorcentaje": idCategoriaPorcentaje, "porcentaje": porcentaje, "idTipoActividad": $.trim(idTipoActividad) };
    jQueryAjaxCallback("../Shared/Utility.aspx/GuardarCategoriaP", JSON.stringify(parameters), "POST", "json", PostGuardarCategoriaP);
}
function PostGuardarCategoriaP(data) {
    CallActividades(1);
    construirTablaNota();
}
function CancelarCategoria() {
    CallCategoria();
}
function PostActividaesElim(data) {
    $('#TblEliminadas tbody').empty();
    var counter = 0;
    var m = $.parseJSON(data.d);
    var AgruparComo = '';
    var arrayLength = m.length;
    while (counter < arrayLength) {
        if (AgruparComo != m[counter].AgruparComo) {
            AgruparComo = m[counter].AgruparComo;
            $('#TblEliminadas tbody').append('<tr style="color: #31708f;background-color: #d9edf7;border-color: #bce8f1;font-weight: bold;"><th colspan=6>Rubro: ' + m[counter].AgruparComo + '</th></tr>');
            $('#TblEliminadas tbody').append('<tr id="tr_edit_idAgenda_' + m[counter].idAgenda + '"><td><strong>N' + (counter + 1) + '</strong></td>' +
                '<td id="td_agenda_tactividad_' + m[counter].idAgenda + '"> ' + m[counter].TipoActividadNombre + '</td > ' +
                '<td id="td_agenda_nombre_' + m[counter].idAgenda + '">' + m[counter].NombreActividad + '</td>' +
                '<td id="td_agenda_fecha_' + m[counter].idAgenda + '">' + m[counter].FechaInicioActividad + '</td>' +
                '<td><button onclick="RecuperarActividad(' + m[counter].idAgenda + ');" type="button" class="btn btn-primary">Recuperar</button></td>' +
                '</tr>');
        }
        else {
            $('#TblEliminadas tbody').append('<tr><td><strong>N' + (counter + 1) + '</strong></td>' +
                '<td id="td_agenda_tactividad_' + m[counter].idAgenda + '"> ' + m[counter].TipoActividadNombre + '</td > ' +
                '<td id="td_agenda_nombre_' + m[counter].idAgenda + '">' + m[counter].NombreActividad + '</td>' +
                '<td id="td_agenda_fecha_' + m[counter].idAgenda + '">' + m[counter].FechaInicioActividad + '</td>' +
                '<td><button onclick="RecuperarActividad(' + m[counter].idAgenda + ');" type="button" class="btn btn-primary">Recuperar</button></td>' +
                '</tr> ');
        }
        counter++;
    }
}
function RecuperarActividad(idAgenda) {
    var parameters = { "id": idAgenda, "Estatus": 1, "FechaAccion": GetDate() };
    jQueryAjaxCallback("../Shared/Utility.aspx/deleteEvent", JSON.stringify(parameters), "POST", "json", PostRecuperarActividad);
}
function PostRecuperarActividad(data) {
    $('#TblEliminadas tbody').empty();
    CallDeleteActivities();
    construirTablaNota();
}
function EditCategoria(id, AgruparComo) {
    //$('#select_porcentaje_' + id + '').find('option').remove().end();
    $('#div_edit_' + id + '').hide();//botones de acciones
    $('#div_right_' + id + '').hide();//texto de objeto de editar
    $('#div_updt_' + id + '').show();//parametros editables
    var options = $("#dllTipoActividad > option").clone();
    //$('#select_porcentaje_' + id + '').append(options);
    $('#select_porcentaje_' + id + '').val(AgruparComo);
}
function CancelCategoria(id) {
    $('#MsjErrorCrarrubro').hide();
    $('#div_edit_' + id + '').show();//botones de acciones
    $('#div_right_' + id + '').show();//texto de objeto de editar
    $('#div_updt_' + id + '').hide();//parametros editables
    $('#DivCrearRubro').empty();
    $('#DivCrearRubro').hide();
}
function OcultarTrActividades6(idCategoriaPorcentaje, TipoNota, tipo) {
    $('.Tr_Crea_Asig').remove();
    $(".ClickCrearAsigna").show();
    if (tipo == 1) {
        for (var i = 0; i < ArrayidPor.length; i++) {
            var text = "TIPO_NOTA_" + ArrayidPor[i];
            $('.' + text).hide();
            $('#div_edit_' + ArrayidPor[i] + '').attr('onclick', 'OcultarTrActividades6(' + ArrayidPor[i] + ',\'' + text + '\',1);');
        }
        $('.' + TipoNota).show();
        $('#div_edit_' + idCategoriaPorcentaje + '').attr('onclick', 'OcultarTrActividades6(' + idCategoriaPorcentaje + ',\'' + TipoNota + '\',2);');
    }
    else if (tipo == 2) {
        $('.' + TipoNota).hide();
        $('#div_edit_' + idCategoriaPorcentaje + '').attr('onclick', 'OcultarTrActividades6(' + idCategoriaPorcentaje + ',\'' + TipoNota + '\',1);');
    }
}
function OcultarTrActividades(idCategoriaPorcentaje, TipoNota, tipo) {
    if (tipo == 1) {
        $('.' + TipoNota).show();
        $('#div_edit_' + idCategoriaPorcentaje + '').attr('onclick', 'OcultarTrActividades(' + idCategoriaPorcentaje + ',\'' + TipoNota + '\',2);');
    }
    else if (tipo == 2) {
        $('.' + TipoNota).hide();
        $('#div_edit_' + idCategoriaPorcentaje + '').attr('onclick', 'OcultarTrActividades(' + idCategoriaPorcentaje + ',\'' + TipoNota + '\',1);');
    }
}
function PostActividaesConfig(data) {
    $('#DivRubroMay').show();
    var porcentaje = '', html = '';
    $('#TblActividades tbody').empty();
    var counter = 0, countHeader = 0, labelTN = '', htmlTD = '';
    var m = $.parseJSON(data.d);
    var AgruparComo = '';
    var arrayLength = m.length;
    var idMetodoPromedio = m[0].idMetodoPromedio;
    while (counter < arrayLength) {
        if (AgruparComo != m[counter].AgruparComo) {
            countHeader++;
            labelTN = 'TIPO_NOTA_' + countHeader;
            AgruparComo = m[counter].AgruparComo;
            if (idMetodoPromedio == 6) {
                porcentaje = ' (' + m[counter].porcentaje + '%) ';
                html = ' <div id="div_right_' + m[counter].idCategoriaPorcentaje + '" class="pull-right"><a style="display:none;margin-right:5px;color:#2c7be5" href="#" title="Crear Subparámetro"><i class="fa fa-plus"></i></a><a onclick="EditCategoria(' + m[counter].idCategoriaPorcentaje + ',' + m[counter].idTipoActividad + ');" style="margin-right:5px;color:#2c7be5" href="#" title="Editar Categoría" data-original-title="Modificar"><i class="fa fa-pencil"></i></a></div>';
            }
            $('#TblActividades tbody').append('<tr style="color:#31708f;background-color: #d9edf7;border-color: #bce8f1;font-weight: bold;"><th colspan=6><div class="row" style="display:none;" id="div_updt_' + m[counter].idCategoriaPorcentaje + '"><div class="col-lg-4"><select class="custom-select custom-select-sm" id="select_porcentaje_' + m[counter].idCategoriaPorcentaje + '"></select></div><div class="col-lg-4"><input onkeypress="return onKeyDecimal(event,this);" maxlength="5" id="input_porcentaje_' + m[counter].idCategoriaPorcentaje + '" value="' + m[counter].porcentaje + '" class="form-control" style="height:30px;width:100px;" type="text">%</div><div class="col-lg-4" style="float:right;text-align:right;"> <button type="button" onclick="CancelCategoria(' + m[counter].idCategoriaPorcentaje + ');">Cancelar</button><button onclick="GuardarCategoria(' + m[counter].idCategoriaPorcentaje + ');" type="button">Guardar</button></div></div><span style="font-weight: 800;cursor:pointer;" onclick="OcultarTrActividades(' + m[counter].idCategoriaPorcentaje + ',\'' + labelTN + '\', 1);" id="div_edit_' + m[counter].idCategoriaPorcentaje + '" >Categoría: ' + m[counter].AgruparComo + porcentaje + '     </span><span style="font-size: 10px;color:red">  ' + m[counter].ContSubParam + ' Asignaciones</span>' + html + ' </th></tr>');
            if (idMetodoPromedio == 6) {
                htmlTD = 'style="display:none;"';
            }
            $('#TblActividades tbody').append('<tr ' + htmlTD + ' class="' + labelTN + '" id="tr_edit_idAgenda_' + m[counter].idAgenda + '">' +
                '<td><strong>N' + (counter + 1) + '</strong></td>' +
                '<td ' + htmlTD + ' id="td_agenda_tipoNota_' + m[counter].idAgenda + '">' + m[counter].TipoNota + '</td>' +
                '<td ' + htmlTD + ' id="td_agenda_tactividad_' + m[counter].idAgenda + '"> ' + m[counter].TipoActividadNombre + '</td > ' +
                '<td id="td_agenda_nombre_' + m[counter].idAgenda + '">' + m[counter].NombreActividad + '</td>' +
                '<td id="td_agenda_fecha_' + m[counter].idAgenda + '">' + m[counter].FechaInicioActividad + '</td>' +
                '<td id="td_agenda_button_' + m[counter].idAgenda + '"><button style="margin-right:2px;" onclick="EditarActividad(' + m[counter].idAgenda + ');" type="button" class="btn btn-primary">Editar</button><button type="button" class="btn btn-danger" style="margin-right:2px;" onclick="eliminarNotaAccept(1,' + m[counter].idAgenda + ');">Eliminar</button></td></tr> ');
        }
        else {
            if (idMetodoPromedio == 6) {
                htmlTD = 'style="display:none;"';
            }
            $('#TblActividades tbody').append('<tr ' + htmlTD + 'class="' + labelTN + '"><td><strong>N' + (counter + 1) +
                '</strong></td>' +
                '<td ' + htmlTD + ' id="td_agenda_tipoNota_' + m[counter].idAgenda + '">' + m[counter].TipoNota + '</td>' +
                '<td ' + htmlTD + ' id="td_agenda_tactividad_' + m[counter].idAgenda + '"> ' + m[counter].TipoActividadNombre + '</td > ' +
                '<td id="td_agenda_nombre_' + m[counter].idAgenda + '">' + m[counter].NombreActividad + '</td>' +
                '<td id="td_agenda_fecha_' + m[counter].idAgenda + '">' + m[counter].FechaInicioActividad + '</td>' +
                '<td id="td_agenda_button_' + m[counter].idAgenda + '"><button style="margin-right:2px;" onclick="EditarActividad(' + m[counter].idAgenda + ');" type="button" class="btn btn-primary">Editar</button><button type="button" class="btn btn-danger" style="margin-right:2px;" onclick="eliminarNotaAccept(1,' + m[counter].idAgenda + ');">Eliminar</button></td></tr> ');
        }
        counter++;
    }
}
var ArrayidPor = [];
function CrearAsigna(idCategoriaPorcentaje) {
    AccionEditarActividad(0);
    $('#DivCrearRubro').empty();
    $('#DivCrearRubro').hide();
    $('.ClickCrearAsigna').hide();
    $('.Tr_Crea_Asig').remove();
    CrearAsignacioncampos(idCategoriaPorcentaje);

}
function EliminarCategoria(idCategoriaPorcentaje) {
    $('#TblActividades tbody').empty();
    var idSubnivel = $('#idSubnivel').val();
    $('#UlActividades').empty();
    var parameters = { "idCategoriaPorcentaje": idCategoriaPorcentaje, "idSubnivel": idSubnivel };
    jQueryAjaxCallback("../Shared/Utility.aspx/EliminarRubro", JSON.stringify(parameters), "POST", "json", PostEliminarCategoria);
}
function PostEliminarCategoria(data) {
    CallActividades(1);
    construirTablaNota();
}
function PostActividaesConfig6(data) {
    $('#DivRubroMay').show();
    var porcentaje = '', html = '';
    $('#UlActividades').empty();
    var counter = 0, countHeader = 0, labelTN = '', htmlTD = '';
    var m = $.parseJSON(data.d);
    var AgruparComo = '';
    var arrayLength = m.length;
    var idMetodoPromedio = m[0].idMetodoPromedio;
    var AplicaPuntajeNotas = m[0].AplicaPuntajeNotas;
    if (m[0].totalPorcentajeC > 100) {
        $('#lblAcumuRub').removeClass().addClass('label bg-red');
        $('#lblAcum_det').text('Advertencia: Porcentaje mayor a ' + m[0].NotaMaxima + '%');
    }
    else if (m[0].totalPorcentajeC < 100) {
        $('#lblAcumuRub').removeClass().addClass('label bg-red');
        $('#lblAcum_det').text('Advertencia: Porcentaje menor a ' + m[0].NotaMaxima + '%');
    }
    else if (m[0].totalPorcentajeC == 100) {
        $('#lblAcumuRub').removeClass().addClass('label bg-aqua');
        $('#lblAcum_det').text('');
    }
    if (m[0].totalPorcentajeC == undefined)
        $('#lblAcumuRub').text('0 %');
    else
        $('#lblAcumuRub').text(m[0].totalPorcentajeC + ' %');
    ArrayidPor = [];
    idTipoOcultar = 2;
    while (counter < arrayLength) {
        if (AgruparComo != m[counter].AgruparComo) {
            ArrayidPor.push(m[counter].idCategoriaPorcentaje);
            countHeader++;
            labelTN = 'TIPO_NOTA_' + m[counter].idCategoriaPorcentaje;
            AgruparComo = m[counter].AgruparComo;
            PorcentajeC = ' (' + m[counter].PorcentajeC + '%) ';
            html = '<div id="div_right_' + m[counter].idCategoriaPorcentaje + '" class="pull-right"><a style="display:none;margin-right:5px;color:#2c7be5" href="#" title="Crear Subparámetro"><i class="fa fa-plus"></i></a><i onclick="EditCategoria(' + m[counter].idCategoriaPorcentaje + ',\'' + m[counter].AgruparComo + '\');" style="cursor:pointer;margin-right: 10px;" class="fa fa-pencil"></i>' +
                '<i style="cursor:pointer;margin-right: 10px;" onclick="EliminarCategoria(' + m[counter].idCategoriaPorcentaje + ');" class="fa fa-times text-red"></i></div ></div > ';
            $('#UlActividades').append('<li style="padding: 2px;background-color:#fdfdfd;">' +
                '<div class="row" style="padding: 10px;color: #31708f;background-color: #d9edf7;border-color: #bce8f1;font-weight: bold;">' +
                '<div class="col-sm-12">' +
                '<div id="div_edit_' + m[counter].idCategoriaPorcentaje + '" onclick="OcultarTrActividades6(' + m[counter].idCategoriaPorcentaje + ',\'' + labelTN + '\', ' + idTipoOcultar + ');"><span class="handle ui-sortable-handle"><i class="fa fa-ellipsis-v"></i><i class="fa fa-ellipsis-v"></i></span>' +
                '<span style="font-weight: 800;cursor:pointer;">Rubro:  ' + m[counter].AgruparComo + PorcentajeC + '</span>' +
                '<span style="font-size: 10px;color:red"> ' + m[counter].ContSubParam + ' Asignaciones</span>' + html +
                '<div class="row" style="display:none;" id="div_updt_' + m[counter].idCategoriaPorcentaje + '">' +
                '<div class="col-lg-4"><input maxlength="50" id="select_porcentaje_' + m[counter].idCategoriaPorcentaje + '"></input></div>' +
                '<div class="col-lg-4"><input onkeypress="return onKeyDecimal(event,this);" maxlength="5" id="input_porcentaje_' + m[counter].idCategoriaPorcentaje + '" value="' + m[counter].PorcentajeC + '" style="height:30px;width:100px;" type="text">%</div>' +
                '<div class="col-lg-4" style="float:right;text-align:right;"><button type="button" onclick="CancelCategoria(' + m[counter].idCategoriaPorcentaje + ');">Cancelar</button><button onclick="GuardarCategoria(' + m[counter].idCategoriaPorcentaje + ');" type="button">Guardar</button></div>' +
                '</div>' +
                '</div></div>' +
                '</div>' +
                '<div class="TIPO_NOTA_' + m[counter].idCategoriaPorcentaje + '" style="display:none;">' +
                '<div class="row"><div class="col-sm-12">' +
                '<table id="' + m[counter].idCategoriaPorcentaje + '" class="table table-striped" style="border: solid 1px black;">' +
                '<thead><tr><th>Título de Asignación</th><th style="text-align: center;" class="DIVPUNTOS">Puntos</th><th style="text-align: center;">Fecha</th><th style="text-align: center;">Tipo de nota</th><th style="text-align: center;">Acciones</th></tr></thead>' +
                '<tbody></tbody><tfoot></tfoot></table > ' +
                '</div></div></div></li>');
            $('#' + m[counter].idCategoriaPorcentaje + ' tbody').append('<tr class="' + labelTN + '" id="tr_edit_idAgenda_' + m[counter].idAgenda + '">' +
                '<td id="td_agenda_nombre_' + m[counter].idAgenda + '">' + m[counter].NombreActividad + '</td>' +
                '<td class="DIVPUNTOS" style="text-align: center;" id="td_agenda_puntos_' + m[counter].idAgenda + '">' + m[counter].Puntos + '</td>' +
                '<td style="text-align: center;" id="td_agenda_fecha_' + m[counter].idAgenda + '">' + m[counter].FechaInicioActividad + '</td>' +
                '<td style="text-align: center;" id="td_agenda_tescala_' + m[counter].idAgenda + '">' + m[counter].NombreEscala + ' ' + m[counter].NombreRubrica + '</td>' +
                //'<td id="td_agenda_idrubrica_' + m[counter].idAgenda + '">' + m[counter].NombreRubrica + '</td>' +
                '<td style="text-align: center;" id="td_agenda_button_' + m[counter].idAgenda + '"><button type="button" onclick="EditarActividad(' + m[counter].idAgenda + ');" class="btn btn-primary btn-xs" style="padding: 2px 9px;margin-left: 5px;"><i  class="fa fa-pencil"></i> Editar</button>' +
                //'<button type="button" class= "btn btn-warning btn-xs" style = "padding: 2px 9px;margin-left:5px;" onclick="AbrirTipoNota(1, ' + m[counter].idAgenda + ');"><i class="fa fa-superscript"></i></button>' +
                '<button type="button" class="btn btn-danger btn-xs" onclick="eliminarNotaAccept(1,' + m[counter].idAgenda + ');" style="padding: 2px 9px;margin-left:5px;"><i class="fa fa-times"></i> Eliminar</button></td></tr>');
            if (counter == 0) {
                $('.TIPO_NOTA_' + m[counter].idCategoriaPorcentaje).show();
            }
            $('#' + m[counter].idCategoriaPorcentaje + ' tfoot').html('<tr class="ClickCrearAsigna"><td colspan="7" style="cursor:pointer;">' +
                '<div><span onclick="CrearAsigna(' + m[counter].idCategoriaPorcentaje + ');" style="color:blue"><i class="fa fa-plus"></i> Crear nueva Asignación</span>' +
                '</div></td></tr>');
        }
        else {
            $('#' + m[counter].idCategoriaPorcentaje + ' tbody').append('<tr class="' + labelTN + '" id="tr_edit_idAgenda_' + m[counter].idAgenda + '">' +
                '<td id="td_agenda_nombre_' + m[counter].idAgenda + '">' + m[counter].NombreActividad + '</td>' +
                '<td class="DIVPUNTOS" style="text-align: center;" id="td_agenda_puntos_' + m[counter].idAgenda + '">' + m[counter].Puntos + '</td>' +
                '<td style="text-align: center;" id="td_agenda_fecha_' + m[counter].idAgenda + '">' + m[counter].FechaInicioActividad + '</td>' +
                '<td style="text-align: center;" id="td_agenda_tescala_' + m[counter].idAgenda + '">' + m[counter].NombreEscala + ' ' + m[counter].NombreRubrica + '</td>' +
                '<td style="text-align: center;" id="td_agenda_button_' + m[counter].idAgenda + '"><button type="button" onclick="EditarActividad(' + m[counter].idAgenda + ');" class="btn btn-primary btn-xs" style="padding: 2px 9px;margin-left: 5px;"><i  class="fa fa-pencil"></i> Editar</button>' +
                //'<button type="button" class= "btn btn-warning btn-xs" style = "padding: 2px 9px;margin-left:5px;" onclick="AbrirTipoNota(1, ' + m[counter].idAgenda + ');"> <i class="fa fa-superscript" ></i></button >' +
                '<button type="button" class="btn btn-danger btn-xs" onclick="eliminarNotaAccept(1,' + m[counter].idAgenda + ');" style="padding: 2px 9px;margin-left:5px;"><i class="fa fa-times"></i> Eliminar</button></td></tr>');
        }
        idTipoOcultar = 1;
        counter++;
    }
    console.log(AplicaPuntajeNotas);
    if (AplicaPuntajeNotas == 1)
        $('.DIVPUNTOS').show();
    else
        $('.DIVPUNTOS').hide();
}
function AbrirTipoNota(opcion, idAgenda) {
    $('#HeaderColumnOpcion').val(opcion);
    if (idAgenda != -1)
        $('#HeaderColumnidAgenda').val(idAgenda);
    $('#Modal_TipoNota').modal('show');
}
function CrearCamposRubro() {
    AccionEditarActividad(0);
    $('#DivRubroMay').hide();
    $('#DivCrearRubro').show();
    $('#DivCrearRubro').html('<div class=row><div class="col-sm-4"><input id="_NombreRubroCrear" placeholder="Nombre del rubro" style="width: 150px;" maxlength="50" type="text"></div>' +
        '<div class="col-sm-4"><input id="_PorcentajeoCrear" maxlength="3" onkeypress="return onKeyDecimal(event,this);" style="width: 150px;" placeholder="porcentaje" maxlength="50" type="text">%</div>' +
        '<div class="col-sm-4" style="text-align: right;"><button type="button" onclick="CrearRubro();" class="btn btn-primary" style="margin-right:10px;"><i class="fa fa-pencil"></i> Guardar</button>' +
        '<button type="button" onclick="CancelarCRubro();" class="btn btn-danger"><i style="cursor:pointer;margin-right:2px;" class="fa fa-times"></i> Cancelar</button></div></div>');
}
function GuardarLecciones() {
    var idPeriodo = $('#idPeriodo').val();
    var idSubNivel = $('#idSubnivel').val();
    var idAsignatura = $('#idAsignatura').val();
    var idTotalLecciones = $('#idTotalLecciones').val();
    if (idTotalLecciones.length == 0)
        return;
    var parameters = { "idAsignatura": idAsignatura, "idSubNivel": idSubNivel, "idPeriodo": idPeriodo, "idTotalLecciones": idTotalLecciones };
    jQueryAjaxCallback("../Shared/Utility.aspx/GuardarLecciones", JSON.stringify(parameters), "POST", "json", PostGuardarLecciones);
}
function PostGuardarLecciones(data){
    $('#MdTotalLeccionesAsitencia').modal('hide');
    $('#Modal_TipoNota').modal('hide');
}
function PostSetLecciones(data) {
    var m = $.parseJSON(data.d);
    $('#idTotalLecciones').val(m[0].TotalLecciones)
}
function ClickTipoNota(idTipoScala, idRubrica) {
    $('#HeaderColumnTipoScala').val(idTipoScala);
    if (idTipoScala == 1) {
        $('#btnColumTipoNota').text('Númerico');
    }
    else if (idTipoScala == 2) {
        $('#btnColumTipoNota').text('Rúbrica');
        $('#HeaderColumnidRubrica').val(idRubrica);
    }
    else if (idTipoScala == 3) {
        //formula de asistencia
        $('#Modal_TipoNota').modal('hide');
        $('#MdTotalLeccionesAsitencia').modal('show');
        $('#idTotalLecciones').val('')
        $('#btnColumTipoNota').text('Cálculo de nota de asistencia');
        var idPeriodo = $('#idPeriodo').val();
        var idSubNivel = $('#idSubnivel').val();
        var idAsignatura = $('#idAsignatura').val();
        var idTotalLecciones = $('#idTotalLecciones').val();
        var parameters = { "idAsignatura": idAsignatura, "idSubNivel": idSubNivel, "idPeriodo": idPeriodo };
        jQueryAjaxCallback("../Shared/Utility.aspx/GetLeccionestotales", JSON.stringify(parameters), "POST", "json", PostSetLecciones);
        return;
    }
    else if (idTipoScala == 4) {
        $('#btnColumTipoNota').text('Porcentaje de Concepto');
    }
    $('#Modal_TipoNota').modal('hide');
    if ($('#HeaderColumnOpcion').val() == 1) {
        var parameters = { "idAgenda": $('#HeaderColumnidAgenda').val(), "TipoScala": idTipoScala, "idRubrica": idRubrica };
        jQueryAjaxCallback("../Shared/Utility.aspx/GuardarTipoNota", JSON.stringify(parameters), "POST", "json", PostAccionEditarActividad);
    }
}
function CancelarCRubro() {
    $('#MsjErrorCrarrubro').hide();
    $('#DivRubroMay').show();
    $('#DivCrearRubro').hide();
    $('#DivCrearRubro').empty();
}
function CrearRubro() {
    var Rubro = $.trim($('#_NombreRubroCrear').val());
    var por = $('#_PorcentajeoCrear').val();
    if ($.trim(Rubro).length == 0) {
        $('#MsjErrorCrarrubro').show();
        $('#MsjErrorCrarrubro').html('<div class="alert" style="color: #781d2d;background-color: #fad7dd;border-color: #f8c7d0;" role="alert"><i class="fa fa-info-circle fa-2x"></i> ERROR: el campo de Rubro es un campo obligatorio, favor de llenarlo.</div>');
        return false;
    }
    if ($.trim(por).length == 0) {
        $('#MsjErrorCrarrubro').show();
        $('#MsjErrorCrarrubro').html('<div class="alert" style="color: #781d2d;background-color: #fad7dd;border-color: #f8c7d0;" role="alert"><i class="fa fa-info-circle fa-2"></i> ERROR: el campo de Porcentaje es un campo obligatorio, favor de llenarlo.</div>');
        return false;
    }
    var idPeriodo = $('#idPeriodo').val();
    var idSubNivel = $('#idSubnivel').val();
    var idAsignatura = $('#idAsignatura').val();
    var parameters = { "idAsignatura": idAsignatura, "idTipoActividad": -1, "porcentaje": por, "idSubnivel": idSubNivel, "idPeriodo": idPeriodo, "TipoNota": Rubro, "FechaAccion": GetDate() };
    console.log(parameters);
    jQueryAjaxCallback("../Shared/Utility.aspx/CrearRubro", JSON.stringify(parameters), "POST", "json", PostCrearRubro);
}
function PostCrearRubro(data) {
    var m = $.parseJSON(data.d);
    if (m[0].respuesta == 1) {
        CallActividades(1);
        construirTablaNota();
        $('#DivRubroMay').show();
        $('#DivCrearRubro').hide();
        $('#DivCrearRubro').empty();
        $('#MsjErrorCrarrubro').hide();
    }
    else if (m[0].respuesta == -1) {
        $('#MsjErrorCrarrubro').show();
        $('#MsjErrorCrarrubro').html('<div class="alert" style="color: #781d2d;background-color: #fad7dd;border-color: #f8c7d0;" role="alert"><i class="fa fa-info-circle fa-2"></i> ERROR: No puede agregar un rubro con el mismo nombre <b>' + m[0].Rubro + '</b></div>');
    }
}
function Grafica1() {
    $('#divGrafica').show();
    $('#pieChart').remove();
    $('#chart1').html('<canvas id="pieChart" style="height:250px"></canvas>');
    var parameters = { "idAsignatura": $('#idAsignatura').val(), "idPeriodo": $('#idPeriodo').val(), "idSubnivel": $('#idSubnivel').val(), "idUsuario": -1 };
    jQueryAjaxCallback("../Shared/Utility.aspx/GetDataGrafica1", JSON.stringify(parameters), "POST", "json", PostGrafica1);
}
function PostGrafica1(data) {
    var ArraysLabel1 = [];
    var ArraysValues1 = [];
    var counter = 0;
    var m = $.parseJSON(data.d);
    var arrayLength = m.length;
    while (counter < arrayLength) {
        ArraysLabel1.push(m[counter].AgruparComo);
        ArraysValues1.push(m[counter].SumNotas);
        counter++;
    }
    var data = {
        labels: ArraysLabel1,
        datasets: [
            {
                data: ArraysValues1,
                backgroundColor: [
                    "#FF6384",
                    "#63FF84",
                    "#84FF63",
                    "#8463FF",
                    "#6384FF"
                ]
            }]
    };
    var ctx = $('#pieChart').get(0).getContext('2d');
    var myPieChart = new Chart(ctx, {
        type: 'pie',
        data: data
    });
}
function CrearAsignacioncampos(idCategoriaPorcentaje) {
    $('#' + idCategoriaPorcentaje + ' tbody').append('<tr class="Tr_Crea_Asig"><td><input id="_Tr_Crea_Asig_nombre"  placeholder="asignacion" maxlength="50"  type="text"></td>' +
        '<input id="_Tr_Crea_Asig_idC" value="' + idCategoriaPorcentaje + '" type="hidden"/>' +
        '<td><input id="_Tr_Crea_Asig_fech" style="width: 150px;" maxlength="12" class="fechaEditActC" type="text"></td>' +
        '<td><button type="button" class="btn btn-danger btn-xs" style="cursor:pointer;margin-right:10px;" onclick="AccionEditarActividad(0);"><i class="fa fa-mail-reply (alias)"></i> Cancelar</button>' +
        '<button type="button" class="btn btn-primary btn-xs" style="cursor:pointer;margin-right:10px;" onclick="AccionEditarActividad(2,1);"><i class="fa fa-check" ></i> Guardar</button></td></tr> ');
    var options = $("#ddlRubrica > option").clone();
    $('#ddlRubrica_C').append(options);
    $('.fechaEditActC').datepicker({ format: 'dd/mm/yyyy', autoclose: true, language: "es", daysOfWeekHighlighted: "0,6", todayHighlight: true }).attr('readonly', 'readonly');
}
function CancelarCrearAsig() {
    $(".ClickCrearAsigna").show();
    $(".Tr_Crea_Asig").remove();
}
function EditarActividad(idAgenda) {
    CancelarCrearAsig();
    var parameters = { "idAgenda": idAgenda };
    jQueryAjaxCallback("../Shared/Utility.aspx/GetIdAgenda", JSON.stringify(parameters), "POST", "json", PostEditarActividad);
}
function PostEditarActividad(data) {
    var counter = 0;
    var m = $.parseJSON(data.d);
    var arrayLength = m.length;
    while (counter < arrayLength) {
        var idAgenda = m[counter].idAgenda;
        var idTipoActividad = m[counter].idTipoActividad;
        var NombreActividad = m[counter].NombreActividad;
        var fechaActividad = m[counter].fechaActividad;
        var TipoNota = m[counter].TipoNota;
        var SubTipoNota = m[counter].SubTipoNota;
        var Puntos = m[counter].Puntos;
        var NombreTipoEscala = m[counter].NombreTipoEscala;
        var TipoEscala = m[counter].TipoEscala;
        var idRubrica = m[counter].idRubrica;
        var NombreRubrica = m[counter].NombreRubrica;
        var porcentajeA = m[counter].porcentajeA;
        var idCategoriaPorcentaje = m[counter].idCategoriaPorcentaje;
        var AplicaPuntajeNotas = m[counter].AplicaPuntajeNotas;
        ++counter;
    }
    $('.divEditAct').empty();
    $('.divEditActV').show();
    var ddlTipoActividad_ = 'ddl_agenda_tactividad_' + idAgenda + '';
    var ddlTipoEscala_ = 'ddl_agenda_tescala_' + idAgenda + '';
    var ddlRubrica_ = 'ddl_agenda_idrubrica_' + idAgenda + '';
    var nombreTipoActividad = $('#td_agenda_tactividad_' + idAgenda + '').text();
    var ddlTipoNota_ = 'ddl_agenda_tipoNota_' + idAgenda + '';
    $('#td_agenda_tactividad_' + idAgenda + '').html('<div style="display:none;" class="divEditActV">' + nombreTipoActividad + '</div><div class="divEditAct"><select class="custom-select custom-select-sm" id="' + ddlTipoActividad_ + '"></select></div>');
    $('#td_agenda_tipoNota_' + idAgenda + '').html('<div style="display:none;" class="divEditActV">' + TipoNota + '</div><div class="divEditAct"><select class="custom-select custom-select-sm" id="' + ddlTipoNota_ + '"></select></div>');
    var options = $("#dllTipoActividad > option").clone();
    $('#' + ddlTipoNota_ + ', #' + ddlTipoActividad_ + '').append(options);
    //preescolar

    if ($('#idMetodoPromedio').val() == 1) {
        $('#' + ddlTipoActividad_ + '').val(idTipoActividad);
        $('#' + ddlTipoNota_ + '').html('<option SubTipoNota="1" value="Nota Diaria Ejercicio">Sumativa Ejercicio</option><option value="Formativa">Formativa</option>');
        $('#' + ddlTipoNota_ + '').val(TipoNota);
    }
    //sumativas
    else if ($('#idMetodoPromedio').val() == 2) {
        $('#' + ddlTipoActividad_ + '').val(idTipoActividad);
        $('#' + ddlTipoNota_ + '').html('<option SubTipoNota="1" value="Nota Diaria Ejercicio">Sumativa Ejercicio</option><option SubTipoNota="2" value="Nota Diaria para entregar">Sumativa para entregar</option><option value="Formativa">Formativa</option>');
        if ((TipoNota == 'Nota Diaria') && (SubTipoNota == 2))
            $('#' + ddlTipoNota_ + '').val('Nota Diaria para entregar');
        else if ((TipoNota == 'Nota Diaria') && (SubTipoNota == 1))
            $('#' + ddlTipoNota_ + '').val('Nota Diaria Ejercicio');
    }
    //tres tercios
    if ($('#idMetodoPromedio').val() == 3) {
        $('#' + ddlTipoActividad_ + '').val(idTipoActividad);
        $('#' + ddlTipoNota_ + '').html('<option SubTipoNota="1" value="Nota Diaria Ejercicio">Nota Diaria Ejercicio</option><option SubTipoNota="2" value="Nota Diaria para entregar">Nota Diaria para entregar</option><option SubTipoNota="1" value="Apreciacion">Apreciacion</option><option SubTipoNota="1" value="Examen">Examen</option><option value="Formativa">Formativa</option>');
        if ((TipoNota == 'Nota Diaria') && (SubTipoNota == 2))
            $('#' + ddlTipoNota_ + '').val('Nota Diaria para entregar');
        else if ((TipoNota == 'Nota Diaria') && (SubTipoNota == 1))
            $('#' + ddlTipoNota_ + '').val('Nota Diaria Ejercicio');
        else
            $('#' + ddlTipoNota_ + '').val(TipoNota);
    }
    else if ($('#idMetodoPromedio').val() == 5) {
        $('#' + ddlTipoNota_ + '').val(idTipoActividad);
        $('#' + ddlTipoActividad_ + '').val(idTipoActividad);
    }
    //porcentual
    else if ($('#idMetodoPromedio').val() == 6) {
        $('#' + ddlTipoNota_ + '').val(idTipoActividad);
        $('#' + ddlTipoActividad_ + '').val(idTipoActividad);
        $('#td_agenda_porcA_' + idAgenda + '').html(' <div style="display:none;" class="divEditActV">' + porcentajeA + '</div><div class="divEditAct"><input style="width: 90px;"onkeypress="return onKeyDecimal(event,this);"  maxlength="5" value="' + porcentajeA + '" type="text" id="input_agenda_porcA_' + idAgenda + '">%</div>');
        if (AplicaPuntajeNotas == 1) {
            $('#td_agenda_puntos_' + idAgenda + '').html(' <div style="display:none;" class="divEditActV">' + Puntos + '</div><div class="divEditAct"><input style="width: 90px;" maxlength="5" onkeypress="return onKeyDecimal(event,this);" value="' + Puntos + '" type="text" id="input_agenda_puntos_' + idAgenda + '"></div>');
        }
        else 
            $('#td_agenda_puntos_' + idAgenda + '').html('<div style="display:none;" class="divEditActV">' + Puntos + '</div><div class="divEditAct"><input style="width: 90px;display:none;" maxlength="5" onkeypress="return onKeyDecimal(event,this);" value="' + Puntos + '" type="text" id="input_agenda_puntos_' + idAgenda + '"></div>');

        var html_e = '<div style="display:none;" class="divEditActV">' + NombreTipoEscala + '</div><div class="divEditAct">' + NombreTipoEscala + '</div>';
        $('#td_agenda_tescala_' + idAgenda + '').html(html_e);
    }
    $('#td_agenda_nombre_' + idAgenda + '').html('<div style="display:none;" class="divEditActV">' + NombreActividad + '</div><div class="divEditAct"><input  maxlength="50" value="' + NombreActividad + '" type="text" id="input_agenda_nombre_' + idAgenda + '"></div>');
    $('#td_agenda_fecha_' + idAgenda + '').html('<div style="display:none;" class="divEditActV">' + fechaActividad + '</div><div class="divEditAct"><input  style="width: 150px;" class="fechaEditAct"  value="' + fechaActividad + '"  id="input_agenda_fecha_' + idAgenda + '"></div>');
    $('#td_agenda_button_' + idAgenda + '').html('<div style="display:none;" class="divEditActV"><button type="button" onclick="EditarActividad(' + idAgenda + ');" class="btn btn-primary btn-xs" style="padding: 2px 9px;margin-left: 5px;"><i  class="fa fa-pencil text-white"></i> Editar</button>' +
        //'<a onclick="AbrirTipoNota(1,' + idAgenda + ');" class= "btn btn-warning btn-xs" style="padding: 2px 9px;margin-left:5px;" > <i class="fa fa-superscript text-white"></i></a>' +
        '<button type="button" class="btn btn-danger btn-xs" onclick="eliminarNotaAccept(1,' + idAgenda + ');" style="padding: 2px 9px;margin-left:5px;"><i class="fa fa-times text-white"></i> Eliminar</button></div>' +
        '<div class="divEditAct"><div class="btn-group"><button type="button" class="btn btn-danger btn-xs" style="padding: 2px 9px;margin-left: 5px;" onclick="AccionEditarActividad(0);"><i class="fa fa-mail-reply (alias) text-white"></i> Cancelar</button>' +
        '<button type="button" class="btn btn-xs btn-primary" style="padding: 2px 9px;margin-left: 5px;" onclick="AccionEditarActividad(1,' + idAgenda + ',' + idCategoriaPorcentaje + ');"><i class="fa fa-check text-white"></i> Guardar</button>' +
        '</div></div>');
    $('.fechaEditAct').datepicker({ format: 'dd/mm/yyyy', autoclose: true, language: "es", daysOfWeekHighlighted: "0,6", todayHighlight: true }).attr('readonly', 'readonly');
}
function AccionEditarActividad(idOpcion, idAgenda, idCategoriaPorcentaje) {
    if (idOpcion == 0) {
        $('.divEditAct').empty();
        $('.divEditActV').show();
        $('.DivRubrica').empty();
        $('#MsjErrorCrarrubro').hide();
        $('#MsjErrorCrarrubro').empty();
        $('.Tr_Crea_Asig').remove();
        $('.ClickCrearAsigna').show();
    }
    else if (idOpcion == 1) {
        var idRubrica = -1;
        var idTipoActividad = $('#ddl_agenda_tactividad_' + idAgenda).val();
        var fi = $('#input_agenda_fecha_' + idAgenda + '').val();
        var TipoNota = $('#ddl_agenda_tipoNota_' + idAgenda + ' option:selected').text();
        var SubTipoNota = $('#ddl_agenda_tipoNota_' + idAgenda + ' option:selected').attr('SubTipoNota');
        var TipoEscala = -1;/*$('#ddl_agenda_tescala_' + idAgenda).val();*/
        var puntos = $('#input_agenda_puntos_' + idAgenda + '').val();
        var porcentajeA = $('#input_agenda_porcA_' + idAgenda + '').val();
        var nombre = $('#input_agenda_nombre_' + idAgenda + '').val();
        if ($('#idMetodoPromedio').val() == 6) {
            var idTipoActividad = -1;
            if ($.trim(puntos).length == 0) {
                $('#MsjErrorCrarrubro').show();
                $('#MsjErrorCrarrubro').html('<div class="alert" style="color: #781d2d;background-color: #fad7dd;border-color: #f8c7d0;" role="alert"><i class="fa fa-info-circle fa-2x"></i> ERROR: el campo de Puntos es un campo obligatorio, favor de llenarlo.</div>');
                return false;
            }
            //if ($.trim(porcentajeA).length == 0) {
            //    $('#MsjErrorCrarrubro').show();
            //    $('#MsjErrorCrarrubro').html('<div class="alert" style="color: #781d2d;background-color: #fad7dd;border-color: #f8c7d0;" role="alert"><i class="fa fa-info-circle fa-2x"></i> ERROR: el campo de Porcentaje es un campo obligatorio, favor de llenarlo.</div>');
            //    return false;
            //}
            if ($.trim(nombre).length == 0) {
                $('#MsjErrorCrarrubro').show();
                $('#MsjErrorCrarrubro').html('<div class="alert" style="color: #781d2d;background-color: #fad7dd;border-color: #f8c7d0;" role="alert"><i class="fa fa-info-circle fa-2x"></i> ERROR: el campo de Titulo de la Asignación es un campo obligatorio, favor de llenarlo.</div>');
                return false;
            }
        }
        else {
            var idtipoActividad = $('#ddl_agenda_tactividad_' + idAgenda + '').val();
            puntos = 100;
            porcentajeA = 0;
            TipoEscala = 1;
            idRubrica = -1;
            if ($('#ddl_agenda_tipoNota_' + idAgenda + '').val() == 'Nota Diaria Ejercicio') {
                TipoNota = 'Nota Diaria';
            }
            else if ($('#ddl_agenda_tipoNota_' + idAgenda + '').val() == 'Nota Diaria para entregar') {
                TipoNota = 'Nota Diaria';
            }
        }
        var eventToUpdate = {
            id: idAgenda,
            idTipoMetodologia: -1,
            idSubNivel: -1,
            idAsignatura: -1,
            idTipoActividad: idTipoActividad,
            NombreActividad: nombre,
            DescripcionActividad: '',
            SubTipoNota: SubTipoNota,
            TipoNota: TipoNota,
            FechaInicioActividad: moment(fi, 'DD-MM-YYYY'),
            FechaFinActividad: moment(fi, 'DD-MM-YYYY'),
            TipoEscala: TipoEscala,
            idRubrica: idRubrica,
            puntos: puntos,
            porcentajeA: 0,
            idCategoriaPorcentaje: idCategoriaPorcentaje
        };
        var parameters = { "Fecha": GetDate(), "cevent": eventToUpdate, "idModulo": 2 };
        jQueryAjaxCallback("../Shared/Utility.aspx/UpdateEvent", JSON.stringify(parameters), "POST", "json", PostAccionEditarActividad);
    }
    else if (idOpcion == 2) {
        var idEducador = -1;
        var idPeriodo = $('#idPeriodo').val();
        var idSubNivel = $('#idSubnivel').val();
        var idAsignatura = $('#idAsignatura').val();
        var NombreActividad = $('#_Tr_Crea_Asig_nombre').val();
        var idTipoActividad = -1;
        var FechaInicioActividad = $('#_Tr_Crea_Asig_fech').val();
        var TipoNota = '';
        var puntos = 100; // $('#_Tr_Crea_Asig_puntos').val();
        var porcA = 100//$('#_Tr_Crea_Asig_porA').val();
        if ($.trim(puntos).length == 0) {
            $('#MsjErrorCrarrubro').show();
            $('#MsjErrorCrarrubro').html('<div class="alert" style="color: #781d2d;background-color: #fad7dd;border-color: #f8c7d0;" role="alert"><i class="fa fa-info-circle fa-2x"></i> ERROR: el campo de Puntos es un campo obligatorio, favor de llenarlo.</div>');
            return false;
        }
        if ($.trim(porcA).length == 0) {
            $('#MsjErrorCrarrubro').show();
            $('#MsjErrorCrarrubro').html('<div class="alert" style="color: #781d2d;background-color: #fad7dd;border-color: #f8c7d0;" role="alert"><i class="fa fa-info-circle fa-2x"></i> ERROR: el campo de Porcentaje es un campo obligatorio, favor de llenarlo.</div>');
            return false;
        }
        if ($.trim(NombreActividad).length == 0) {
            $('#MsjErrorCrarrubro').show();
            $('#MsjErrorCrarrubro').html('<div class="alert" style="color: #781d2d;background-color: #fad7dd;border-color: #f8c7d0;" role="alert"><i class="fa fa-info-circle fa-2x"></i> ERROR: el campo de Titulo de la Asignación es un campo obligatorio, favor de llenarlo.</div>');
            return false;
        }
        var SubTipoNota = 1
        var TipoEscala = 1
        var idRubrica = -1;
        var idCategoriaPorcentaje = $('#_Tr_Crea_Asig_idC').val();
        var parameters = {
            "idEducador": idEducador,
            "idPeriodo": idPeriodo, "idSubNivel": idSubNivel, "idAsignatura": idAsignatura, "idTipoActividad": idTipoActividad, "NombreActividad": NombreActividad, "DescripcionActividad": NombreActividad,
            "FechaInicioActividad": FechaInicioActividad, "FechaFinActividad": FechaInicioActividad, "TipoNota": TipoNota, "lectura": 1, "SubTipoNota": SubTipoNota,
            "idModulo": 2, "TipoEscala": TipoEscala, "idRubrica": idRubrica, "puntos": puntos, "porcentajeA": porcA, "idCategoriaPorcentaje": idCategoriaPorcentaje, "FechaAccion": GetDate()
        };
        jQueryAjaxCallback("../Shared/Utility.aspx/agregarActividad_string", JSON.stringify(parameters), "POST", "json", PostAccionEditarActividad);
    }
}
function PostAccionEditarActividad(data) {
    $('#MsjErrorCrarrubro').hide();
    $('#MsjErrorCrarrubro').empty();
    $('#TblActividades tbody').empty();
    CallActividades(1);
    construirTablaNota();
}
function actualizarNotas_old(tableName) {
    var currentId, currentPlaceHolder, comentario, id_comentario;
    var idmetodopromedio = $('#idMetodoPromedio').val();
    var PermitirNotasEnBlanco = true;
    var $inputsText = $(tableName + ' input[type=text]');
    var $inputsSelect = $(tableName + ' select');
    var xml = '<notas>';
    var exitSubmit = false;
    //preescolar
    if (idmetodopromedio === "1") {
        var preescolarTieneNotaEnBlanco = false;
        $inputsSelect.each(function () {
            currentValue = $.trim($(this).val());
            currentId = this.id;
            if (currentValue.trim() === '') preescolarTieneNotaEnBlanco = true;
            xml += '<estudiante idUsuario="' + this.id.replace('select-', '') + '" nota="0" notaText="' + currentValue + '"/>';
        });
        if (preescolarTieneNotaEnBlanco) {
            if (confirm("Usted ha dejado calificaciones en blanco, ¿Desea continuar y guardar las calificaciones que no selecciono en blanco?") == false) {
                exitSubmit = true;
            }
        }
    }
    else {
        $inputsText.each(function () {
            if (this.id.charAt(0) == 'c') {
            }
            else if (this.id.charAt(0) != 'c') {
                currentValue = autocompletar($.trim($(this).val()), currentNotaMaxima);
                currentPlaceHolder = $.trim($(this)[0].placeholder);
                currentId = this.id;
                id_comentario = '';
                id_comentario = 'co' + currentIdAgenda + currentId;
                comentario = '';
                if (currentValue != "") {
                    if (isNumeric(currentValue)) {
                        if (currentValue < currentNotaMinima || currentValue > currentNotaMaxima) {
                            exitSubmit = true;
                            IsValid(currentId, 'ERROR');
                            alert('Por favor verifique: La nota mínima es de: ' + currentNotaMinima + ' y la nota máxima es de: ' + currentNotaMaxima);
                            return false;
                        }
                        xml += '<estudiante idUsuario="' + this.id + '" nota="' + currentValue + '" notaText="' + comentario + '"/>';
                    }
                    else {
                        exitSubmit = true;
                        IsValid(currentId, 'ERROR');
                        alert('El campo de nota solo acepta números [0-9] y punto decimal [.]');
                        return false;
                    }
                }
            }
            IsValid(currentId, 'NOTERROR');
        });
    }
    if (exitSubmit) {
        return false;
    }
    xml += '</notas>';
    $('#btnActualizarNota').attr('disabled', 'disabled');
    var periodoSelectedValue = $('#idPeriodo').val();
    var subnivelSelectedValue = $('#idSubnivel').val();
    var asignaturaSelectedValue = $('#idAsignatura').val();
    var parameters = { "idAsignatura": asignaturaSelectedValue, "idSubnivel": subnivelSelectedValue, "idPeriodo": periodoSelectedValue, "idAgenda": currentIdAgenda, "xmlNotas": xml, "lectura": 1 };
    jQueryAjaxCallback("../Shared/Utility.aspx/actualizarNotas", JSON.stringify(parameters), "POST", "json", PostLibreta);

}
function editActividad() {
    $('#toolTipBody_updatedialog_edit').show();
    $('#btnCancelUpdate').show();
    $('#btnSaveUpdate').show();
    $('#toolTipBody_updatedialog_edit').val($('#toolTipBody_updatedialog2').text());
    document.getElementById("toolTipBody_updatedialog1").style.display = 'none';
    document.getElementById("toolTipBody_updatedialog2").style.display = 'none';
    document.getElementById("div_body_update").style.display = 'none';
    document.getElementById("div_footer_update").style.display = 'none';
    document.getElementById("btnEditUpdate").style.display = 'none';
}
function CancelActividad() {
    document.getElementById("toolTipBody_updatedialog_edit").style.display = 'none';
    document.getElementById("btnCancelUpdate").style.display = 'none';
    document.getElementById("btnSaveUpdate").style.display = 'none';
    $('#toolTipBody_updatedialog1').show();
    $('#toolTipBody_updatedialog2').show();
    $('#div_body_update').show();
    $('#btnEditUpdate').show();
    document.getElementById("div_footer_update").style.display = 'block';
}
function mostrarDetalleNota(idAgenda, toolTipHeader, toolTipBody1, toolTipBody2) {
    setearIdAgenda(idAgenda);
    var classname = "." + idAgenda;
    $('#toolTipHeader_updatedialog').text(toolTipHeader);
    $('#toolTipBody_updatedialog1').text(toolTipBody1 + ': ');
    $('#toolTipBody_updatedialog2').text(toolTipBody2);
    $('#tblNotaEstudiantes').empty();
    var notaActual;
    var counterNotasPendientes = 0;
    var select = '';
    var textbox, tdNombreEstudiante, tdid, tdcomentario, id_comentario, hi_id_comentario = '';
    var count = 1;
    var idMetodoPromedio;
    var thead = 'Nombre';
    if (ConverterBool($('#DesactivarUsuarioPorPeriodo').val()) == true) {
        idMetodoPromedio = $('#idMetodoPromedio').val();
    }
    else if (ConverterBool($('#DesactivarUsuarioPorPeriodo').val()) == false) {
        idMetodoPromedio = $('#idMetodoPromedio').val();//Periodo_.data('idmetodopromedio');
    }
    $(classname).each(function (i, obj) {
        notaActual = $(this)[0].innerText.trim();
        tdNombreEstudiante = '<td style="text-align: left;">' + count + '. ' + $(this).parents('tr:first').find('th:nth-child(2)').text() + '</td>';
        tdid = $(this).parents('tr:first').find('th:nth-child(2)').attr('idestudiante');
        if (notaActual == '&nbsp;' || notaActual == '') {
            textbox = '<input tabindex="' + count + '" type="text" maxlength="6" class="form-control txtQty" id="' + tdid + '" style="height:30px;width:100px;display:' + habilitarInputPorMetodoPromedio("textbox") + '"></input>';
            if (idMetodoPromedio != 1) {
                id_comentario = 'co' + idAgenda + tdid;
            }
            else if (idMetodoPromedio == 1) {
                id_comentario = 'co' + idAgenda + tdid;
                select = '<select class="form-control" id="select-' + tdid + '" style="width:100px;display:' + habilitarInputPorMetodoPromedio("select") + '"><option value="">--Seleccione--</option><option value="LHL">LHL</option><option value="LEL">LEL</option><option value="LVL">LVL</option></select>';
            }
            $('#tblNotaEstudiantes').append('<tr>' + tdNombreEstudiante + '<td>' + textbox + select + '</td></tr>');
            counterNotasPendientes++;
        }
        else {
            if (idMetodoPromedio != 1) {
                id_comentario = 'co' + idAgenda + tdid;
                hi_id_comentario = 'hi' + idAgenda + tdid;
                var com_value = $('#' + hi_id_comentario + '').val();
            }
            $('#tblNotaEstudiantes').append('<tr>' + tdNombreEstudiante + '</td><td><input style="height:30px;width:100px;" type="text" pattern="[0-9]+(\.[0-9]?)?" class="form-control" id="' + tdid + '" nota="' + notaActual + '" placeholder="' + notaActual + '" title="Introduzca solo números." disabled></input></td></tr>');
        }
        count++;
    });
    if (counterNotasPendientes > 0) {
        $('#btnActualizarNota').removeAttr('disabled');
    }
    else {
        $('#btnActualizarNota').attr('disabled', 'disabled');
    }
    $('#updatedialog').modal('show');
}
function clickInput(_idAlumno) {
    $('.read').css('border', '');
    $('#th_' + _idAlumno + '').css('border', '5px solid #fcde3f');
    $('#th_' + _idAlumno + '').addClass('read');
}
function mostrarNota(idAgenda, idAlumno, TipoEscala) {

    console.log('mostrarNota')
    var iniInputs = '', _idAgenda = '', _idAlumno = '', classname = '', classOriginal = '', counter = 1, counterNotasPendientes = 0, idMetodoPromedio = '';
    if (TipoEscala == 2) {
        $('#idAgendaRubrica').val(idAgenda);
        $('#ddlRubricaAlumno').find('option').remove().end();
        $('._alumno_').each(function (i, obj) {
            var select = document.getElementById('ddlRubricaAlumno');
            var opt = document.createElement('option');
            opt.value = $(this).attr('idestudiante');
            var id = this.id;
            opt.innerHTML = $('#' + id + ' span').text() + ' ' + $('#' + id + ' p').text();
            select.appendChild(opt);
        });
        if (idAlumno != -1)
            $('#ddlRubricaAlumno').val(idAlumno);
        CargarAlumnoRubrica(idAgenda, $('#ddlRubricaAlumno').val());
        $('#ModalAlumnoRubrica').modal('show');
    }
    else if (TipoEscala == 1 || TipoEscala == 3) {
        console.log('tipo escala 3')
        if (ConverterBool($('#DesactivarUsuarioPorPeriodo').val()) == true) {
            idMetodoPromedio = $('#idMetodoPromedio').val();
        }
        else if (ConverterBool($('#DesactivarUsuarioPorPeriodo').val()) == false) {
            idMetodoPromedio = $('#idMetodoPromedio').val(); //Periodo_.data('idmetodopromedio');
        }
        //1. normalizar las columnas anteriormente seleccionadas    
        Normalizar(idAgenda);
        //2. marca los td seleccionados para deshabilitar los onclick
        _idAgenda = '.' + idAgenda;
        //a. marca los td seleccionados por la clase de seleccionado
        $('' + _idAgenda + '').addClass('selecionado');
        $('' + _idAgenda + '').each(function (i, obj) {
            var a = $(this).attr('id');
            if (a != undefined) {
                $('#' + a + '').addClass('change');
            }
        });
        //b. deshabilita el evento de onclick a los selecionados
        $('' + _idAgenda + '').attr('onclick', '');
        //c. deshabilita el style cursor:pointer
        $('' + _idAgenda + '').css('cursor', '');
        //d. crea los inputs o select para poner las notas recorriendo los alumnos
        $('.selecionado').each(function (i, obj) {
            notaActual = $.trim($(this).html());
            _idAlumno = $(this).attr('idalumno');
            if (counter == 1) {
                iniInputs = _idAlumno;
            }
            if (notaActual == '&nbsp;' || notaActual == '') {
                if (idMetodoPromedio == 1) {
                    $(this).html('<select class="form-control" id="select-' + _idAlumno + '" style="width:100px;display:' + habilitarInputPorMetodoPromedio("select") + '"><option value="">--Seleccione--</option><option value="LHL">LHL</option><option value="LEL">LEL</option><option value="LVL">LVL</option></select>');
                }
                else if (idMetodoPromedio != 1) {
                    //$(this).html('<input onkeypress="return onKeyDecimal(event,this);" onfocus="clickInput('+_idAlumno+');" tabindex="' + counter + '" maxlength="6" style="width:100px;display:' + habilitarInputPorMetodoPromedio("textbox") + '"  class="form-control" id="'+ _idAlumno +'"  type="text">');   
                    $(obj).html('<input onkeypress="return onKeyDecimal(event,this);"  tabindex="' + counter + '" maxlength="6" style="height: 30px;width:100px;display:' + habilitarInputPorMetodoPromedio("textbox") + '"  class="form-control inputs" id="' + _idAlumno + '"  type="text">');
                }
            }
            else {
                if (idMetodoPromedio != 1) {
                    //$(this).html('<input onkeypress="return onKeyDecimal(event,this);" onfocus="clickInput(' + _idAlumno + ');"style="width:100px;" tabindex="' + counter + '" disabled maxlength="6" nota="' + notaActual + '" placeholder="' + notaActual + '"  class="form-control" id="'+ _idAlumno +'"  type="text">');   
                    $(this).html('<input onkeypress="return onKeyDecimal(event,this);"  style="height: 30px;width:100px;" tabindex="' + counter + '" disabled maxlength="6" nota="' + notaActual + '" placeholder="' + notaActual + '"  class="form-control inputs" id="' + _idAlumno + '"  type="text">');
                }
            }
            counter++;
        });
        //e. ocultar el boton de guardar y ser visible el boton de eliminar 
        $('#tfootUpd_' + idAgenda + '').show();
        $('#tfootCerr_' + idAgenda + '').show();
        $('#tfootDel_' + idAgenda + '').hide();
        //f. mostrar el header de la columna seleccionada
        $('#theaderN_' + idAgenda + '').hide();
        $('#theader_' + idAgenda + '').show();
        ////////////////////////////activamos el focus para el primer input de nota
        var $code = $('#' + iniInputs);
        $(this).data('inputFocused', $code.is(":focus"));
        if ($(this).data('inputFocused')) {
            $code.blur();
        }
        else {
            $code.focus();
        }
    }
}
var ColumnaNota = 0;
function Normalizar(idAgenda, tipo) {
    var _idAgenda = '', _idAlumno = '', classname = '', classOriginal = '', _idTh = '';
    classname = '.selecionado';
    $(classname).each(function (i, obj) {
        classOriginal = this.className;
        _idAlumno = $(this).attr('idalumno');
        _idTh = $("[id*=th_" + _idAlumno + "]").attr('id');
        $('#' + _idTh + '').css('border', '');
        _idAgenda = $(this).attr('idAgenda');
        _TipoEscala = $(this).attr('TipoEscala');
        _nota = $(this).attr('nota');
        _id = $(this).attr('id');
        if (_id == undefined) {
            $('.selecionado').attr('onclick', 'mostrarNota("' + _idAgenda + '","' + _idAlumno + '","' + _TipoEscala + '");');
            $('.selecionado').css('cursor', 'pointer');
            $('.selecionado').empty();
            $(this).html(_nota);
            $('.selecionado').removeClass('selecionado');
        }
        else {
            $('#' + _id + '').attr('onclick', 'mostrarVentanaCambioNota("' + _idAgenda + '","' + _idAlumno + '","' + _nota + '","' + _TipoEscala + '");');
            $('#' + _id + '').removeClass('change');
            $('#' + _id + '').removeClass('selecionado');
            $('#' + _id + '').css('cursor', 'pointer');
            $('#' + _id + '').empty();
            $(this).html(_nota);
        }
    });
    //c. ocultar el boton de guardar y ser visible el boton de eliminar
    $('#tfootUpd_' + _idAgenda + '').hide();
    $('#tfootCerr_' + _idAgenda + '').hide();
    $('#tfootDel_' + _idAgenda + '').show();
    //d. normalizar los header
    $('#theaderN_' + _idAgenda + '').show();
    $('#theader_' + _idAgenda + '').hide();
}
function IsValid(input, action) {
    if (action == 'ERROR') {
        $('#' + input + '').css('background', '#ffe3e5');
        $('#' + input + '').css('border', '1px solid #ff808a');
        $('#' + input + '').focus();
    }
    else if (action == 'NOTERROR') {
        $('#' + input + '').css('border', '1px solid #ccc');
        $('#' + input + '').css('background', '');
    }
}
function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}
function abrirVentanaNomenclatura(idUsuario, nombre, nomenclatura) {
    currentIdUsuarioNomenclatura = idUsuario;
    $('#dllNomenclatura').val(nomenclatura);
    $('#nombreEstudiante_nomenclatura').text(nombre);
    $('#nomenclatura_dialog').modal('show');
}
function myOutFunction(id, idColumn, color) {
    $('#' + id + '').addClass(idColumn + ' ' + color);
}
function myMoveFunction(id_move, idColumn, color) {
    var class_move;
    //if (color == 'alert-success') { class_move = ' alertsuccessmove'; }
    //if (color == 'alert-warning') { class_move = ' alertwarningmove'; }
    //if (color == 'alert-danger') { class_move = ' alertdangermove'; }
    //document.getElementById(id_move).className =  + idColumn + class_move;
}
function msgErrorCalendario(msg) {
    $('#msgErrorLibreta').text(msg);
    $('#msgErrorLibreta').show();
    $('#div_programa').hide();
    $('#div_periodo').hide();
}
function limpiarFormNuevaNota() {
    $('#txtFechaActividad').val('');
    $('#txtTituloActividad').val('');
    $('#pmsj').empty();
    $('#MsjAgrenota').hide();
    $('#justificacion').val('');

}
function habilitarInputPorMetodoPromedio(input) {
    var idmetodopromedio = $('#idMetodoPromedio').val();
    var display = 'none;';
    if (idmetodopromedio === "1" && input === "textbox") {
        display = 'none;';
    }
    else if (idmetodopromedio === "1" && input === "select") {
        display = 'block;';
    }
    else if (idmetodopromedio != "1" && input === "textbox") {
        display = 'block;';
    }
    else if (idmetodopromedio != "1" && input === "select") {
        display = 'none;';
    }
    return display;
}
function eliminarNota(idAgenda, Actividad) {
    $('#delete_dialog').modal('show');
    $('#deleteidagenda').val(idAgenda);
    $('#mtElim').text(Actividad);
    $("#DivElim").html('<input type="checkbox" id="CheckOpc2" class="filled-in"><label for= "CheckOpc2"> Eliminar completamente esta actividad</label>');
}
function setearIdAgenda(idAgenda) {
    currentIdAgenda = idAgenda;
}
function setearIdsAgendaAlumno(idAgenda, idUsuario) {
    currentIdAgenda = idAgenda;
    currentIdUsuario = idUsuario;
}
function setearNotaMinMax(data) {
    var counter = 0;
    var objArray = $.parseJSON(data.d);
    var arrayLength = objArray.length;
    while (counter < arrayLength) {
        currentNotaMinima = objArray[counter].NotaMinima;
        currentNotaMaxima = objArray[counter].NotaMaxima;
        ++counter;
    }
}
function setearFechaIniFinPeriodo(ini, fin) {
    fechaInicioPeriodo = ini;
    fechaFinPeriodo = fin;
}
function obtenerNotaMinMax() {
    if (currentNotaMinima == -1 && currentNotaMaxima == -1) {
        var idSubnivel = $('#idSubnivel').val();
        var parameters = { "idSubnivel": idSubnivel };
        console.log(parameters)
        jQueryAjaxCallback("../Shared/Utility.aspx/recuperarNotaMinMax", JSON.stringify(parameters), "POST", "json", setearNotaMinMax, false);
    }
}
function notaFromPuntos(notaminima, notamaxima, puntosobtenidos, puntosTotales) {
    puntosTotales = puntosTotales.toFixed(2)
    var nota = 1.0 * notamaxima *   puntosobtenidos  / (puntosTotales )
    if (nota < notaminima) nota = notaminima
    nota = truncar(nota, 1)
    return nota
}
function truncar(numero, decimales) {
    numero = numero.toFixed(2)
    var num = numero.toString(); //If it's not already a String
    num = num.slice(0, (num.indexOf(".")) + decimales + 1); //With 3 exposing the hundredths place
    return num
}
function obtenerNotaMinMaxStalin(setearNotaMinMax, idSubnivel) {
    var parameters = { "idSubnivel": idSubnivel };
    console.log(parameters)
    jQueryAjaxCallback("../Shared/Utility.aspx/recuperarNotaMinMax", JSON.stringify(parameters), "POST", "json", setearNotaMinMax, false);

}
function mostrarVentanaCambioNota(idAgenda, idUsuario, notaActual, idTipoEscala) {
    if ($('#lectura').val() == 0) {
        return;
    }
    else {
        if (idTipoEscala == 2) {
            $('#idAgendaRubrica').val(idAgenda);
            $('#ddlRubricaAlumno').find('option').remove().end();
            $('._alumno_').each(function (i, obj) {
                var select = document.getElementById('ddlRubricaAlumno');
                var opt = document.createElement('option');
                opt.value = $(this).attr('idestudiante');
                var id = this.id;
                opt.innerHTML = $('#' + id + ' span').eq(0).text() + ' ' + $('#' + id + ' p').text();
                select.appendChild(opt);
            });
            $('#ddlRubricaAlumno').val(idUsuario);
            CargarAlumnoRubrica(idAgenda, $('#ddlRubricaAlumno').val());
            $('#ModalAlumnoRubrica').modal('show');
        }
        else if (idTipoEscala == 1) {
            setearIdsAgendaAlumno(idAgenda, idUsuario);
            $('#nombreEstudiante').html($('#th_' + idUsuario + ' span').html() + ', ' + $('#th_' + idUsuario + ' p').html());
            $('#descActividad').text($('#theaderN_' + idAgenda + '').attr('data-content'));
            if ($('#idMetodoPromedio').val() == 1) {
                $('#ddlNotaNueva').val(notaActual);
                $('#ddlNotaNueva').show();
                $('#notaNueva').hide();
                $('#notaActual').text(-1);
                $('#notaNueva').val(notaActual);
            }
            else {
                $('#ddlNotaNueva').hide();
                $('#notaNueva').show();
                $('#notaActual').text(notaActual);
                $('#notaNueva').val(notaActual);
            }
            $('#justificacion').text('');
            $('#btnCambiarNota').removeAttr('disabled');
            if (modificarNota == 1) {
                $('#msgbloqmodnot').hide()
                $('#displaymodificarnota').show()
                $('#btnCambiarNota').show()
            }
            else {
                $('#msgbloqmodnot').show()
                $('#displaymodificarnota').hide()                
                $('#btnCambiarNota').hide()
            }
            $('#cambionota_dialog').modal('show');
        }
    }
}
function eliminarNotaAccept(idOpcion, idAgenda) {
    var Opcion = 1, inputCheck = '';
    if (idOpcion == 1) {
        Opcion = 2;
        eliminarNota(idAgenda, 'Eliminar Actividad');
        return false;
    }
    else if (idOpcion == 0) {
        idAgenda = $('#deleteidagenda').val();
        if (CheckOpc2)
            inputCheck = $('#DivElim input[type="checkbox"]:checked');
        if (inputCheck.length > 0)
            Opcion = 2;
    }
    var periodoSelectedValue = $('#idPeriodo').val();
    var subnivelSelectedValue = $('#idSubnivel').val();
    var asignaturaSelectedValue = $('#idAsignatura').val();
    var parameters = { "idSubnivel": subnivelSelectedValue, "idPeriodo": periodoSelectedValue, "idAgenda": idAgenda, "idAsignatura": asignaturaSelectedValue, "justificacion": "...", "lectura": 1, "Opcion": Opcion, "FechaAccion": GetDate() };
    jQueryAjaxCallback("../Shared/Utility.aspx/eliminarNota", JSON.stringify(parameters), "POST", "json", PosteliminarNotaAccept);
}
function PosteliminarNotaAccept(data) {
    $('#delete_dialog').modal('hide');
    Message(1, 'Elemento Eliminado', 'Mensaje Exitoso');
    construirTablaNota();
    CallActividades(1);
}
function construirTablaNota() {
    currentNotaMinima = -1;
    currentNotaMaxima = -1;
    if ($('#idSubnivel').val() != "-1" && $('#idPeriodo').val() != "-1") {
        var parameters = { "idAsignatura": $('#idAsignatura').val(), "idSubnivel": $('#idSubnivel').val(), "idPeriodo": $('#idPeriodo').val(), "lectura": $('#lectura').val() };
        jQueryAjaxCallback("../Shared/Utility.aspx/construirTablaNota", JSON.stringify(parameters), "POST", "json", PostLibreta, false);
    }
    obtenerNotaMinMax();
}
function printDiv() {
    $('.xlx').show();
    $('.popovers').hide();
    $(".input-group-sm").hide();
    $(".hidden-sm-up").hide();
    $('._alumno_ p').css('color', '');
    var html = $('#tablaNotasWrapper').html();
    html = html.replace("<tfoot", "<tfoot style='display:none;'");
    html = html.replace("Agregue", "");
    html = html.replace("<span class='description'>", "");
    html = html.replace("<span class='description'>", "");
    html = html.replace("</span>", "");
    var html2 = '';//$('#textDiv').html();
    //html2 = html2.replace("div", "div style='display:none;text-align:center;' ");
    $(".input-group-sm").show();
    $('._alumno_ p').css('color', '#999');
    $(".hidden-sm-up").show();
    $('.xlx').hide();
    $('.popovers').show();
    var titulo3 = $('#BtnPeriodo').text() + ' /' + $('#BtnGrupo').text() + ' /' + $('#BtnMateria').text()
    WindowPrintAjax(html2 + html, 'Libreta de Calificaciones ', titulo3, 'table, th, td {border: 1px solid black;} table {width:100%;}', 'H');
}
function asignarNomenclatura() {
    var nomenclatura = $('#dllNomenclatura').val();
    if (nomenclatura != '-1') {
        $('#nomenclatura_dialog').modal('hide');
        var periodoSelectedValue = $('#idPeriodo').val();
        var subnivelSelectedValue = $('#idSubnivel').val();
        var asignaturaSelectedValue = $('#idAsignatura').val();
        var parameters = { "idSubnivel": subnivelSelectedValue, "idUsuario": currentIdUsuarioNomenclatura, "idAsignatura": asignaturaSelectedValue, "idPeriodo": periodoSelectedValue, "nomenclatura": nomenclatura, "lectura": 1 };
        jQueryAjaxCallback("../Shared/Utility.aspx/asignarNomenclaturaPromedio", JSON.stringify(parameters), "POST", "json", PostLibreta);
    }
}
function cargarSelectTipoActividad() {
    var parameters = { "select": "TipoActividad", "param1": $('#DesactivarUsuarioPorPeriodo').val(), "param2": "-1" };
    jQueryAjaxCallback("../Shared/Utility.aspx/loadSelectOptions", JSON.stringify(parameters), "POST", "json", CargarActividad, false);
}
function CargarActividad(data) {
    var m = $.parseJSON(data.d);
    var counter = 0;
    var arrayLength = m.length;
    $('#dllTipoActividad').find('option').remove().end();
    while (counter < arrayLength) {
        var select2 = document.getElementById('dllTipoActividad');
        var opt2 = document.createElement('option');
        opt2.value = m[counter].id;
        opt2.innerHTML = m[counter].Nombre;
        select2.appendChild(opt2);
        ++counter;
    }
}
function mostrarVentanaAgregarNvaNota() {
    limpiarFormNuevaNota();
    var fechainiAtrr = '', fechafinAtrr = '', idMetodoPromedio = '';
    idMetodoPromedio = $('#idMetodoPromedio').val();
    if (idMetodoPromedio == 6) {
        CategoriaConfig();
        $('#lblCrearActividad').html('Rubro');
        $('#DivTiposcala').show();
    }
    else {
        AN();
        $('#lblCrearActividad').html('Actividad');
    }
    var DesactivarUsuarioPorPeriodo = ConverterBool($('#DesactivarUsuarioPorPeriodo').val());
    fechainiAtrr = $('#fechainiAtrr').val();
    fechafinAtrr = $('#fechafinAtrr').val();
    if (fechainiAtrr.indexOf('Date') > -1 || fechafinAtrr.indexOf('Date') > -1) {
        fechaini = moment(eval(fechainiAtrr.replace('Date', '').replace('(', '').replace(')', '').replace('/', '').replace('/', ''))).format("D-M-YYYY");
        fechafin = moment(eval(fechafinAtrr.replace('Date', '').replace('(', '').replace(')', '').replace('/', '').replace('/', ''))).format("D-M-YYYY");
    }
    else {
        fechaini = fechainiAtrr;
        fechafin = fechafinAtrr;
    }
    if (DesactivarUsuarioPorPeriodo == false) {
        idMetodoPromedio = $('#idMetodoPromedio').val();
        if (idMetodoPromedio == 3) {
            $('#TipoNota_Div').show();
            $('#Option_2').show();
            $('#Option_3').show();
            $('#lbl_Option_2').show();
            $('#lbl_Option_3').show();
        }
        else if (idMetodoPromedio == 2) {
            $('#TipoNota_Div').show();
            $('#Option_2').hide();
            $('#Option_3').hide();
            $('#lbl_Option_2').hide();
            $('#lbl_Option_3').hide();
            $('#lbl_Option_2').html('Sumativa Ejercicio');
            $('#lbl_Option_3').html('Sumativa para entregar');
        }
        else {
            $('#TipoNota_Div').hide();
        }
    }
    if (DesactivarUsuarioPorPeriodo == true) {
        $('#TipoNota_Div').hide();
    }
    currentPeriodoFechaIni = moment(fechaini, 'DD-MM-YYYY');
    currentPeriodoFechaFin = moment(fechafin, 'DD-MM-YYYY');
    $('#txtFechaActividad').datepicker({ format: 'dd/mm/yyyy', autoclose: true, language: "es", daysOfWeekHighlighted: "0,6", todayHighlight: true }).attr('readonly', 'readonly');
}
function AN() {
    $('#SpanAN').html(' Agregue Calificación de ' + $('#BtnMateria').text());
    $('#agregarnvanota_dialog').modal('show');
}
function cambiarNota() {
    var NotaText = '';
    var txtJustificacion = $.trim($('#justificacion').val());
    if ($('#idMetodoPromedio').val() == 1) {
        var txtNotaNueva = -1;
        //desarrollar aqui guardar
        var periodoSelectedValue = $('#idPeriodo').val();
        var subnivelSelectedValue = $('#idSubnivel').val();
        var asignaturaSelectedValue = $('#idAsignatura').val();
        var notaAnterior = $('#notaActual').text();
        NotaText = $('#ddlNotaNueva').val();
        var parameters = {
            "idSubnivel": subnivelSelectedValue, "idPeriodo": periodoSelectedValue, "idUsuario": currentIdUsuario,
            "idAgenda": currentIdAgenda, "idAsignatura": asignaturaSelectedValue, "nota": txtNotaNueva, "notaAnterior": notaAnterior,
            "justificacion": txtJustificacion, "lectura": document.getElementById('lectura').value, "FechaAccion": GetDate(), "NotaText": NotaText
        };
        jQueryAjaxCallback("../Shared/Utility.aspx/cambiarNota", JSON.stringify(parameters), "POST", "json", PostLibreta);
        Message(1, 'Se ha actualizado la nota exitosamente', 'Mensaje Exitoso');
    }
    else {
        var txtNotaNueva = 0;
        if ($.trim($('#notaNueva').val()).length == 0)
            txtNotaNueva = 0;
        else
            txtNotaNueva = autocompletar($.trim($('#notaNueva').val()), currentNotaMaxima);
        if (isNumeric(txtNotaNueva)) {
            if ($('#idMetodoPromedio').val() == 6) {
                console.log('txtNotaNueva: ' + txtNotaNueva)
                var max = parseInt($('#idAgenda_Puntos_' + currentIdAgenda).text());
                currentNotaMaxima = max;
                if (txtNotaNueva < 0 || txtNotaNueva > currentNotaMaxima) {                   
                    IsValid('notaNueva', 'ERROR');
                    alert('Por favor verifique: La nota mínima es de: ' + 0 + ' y la nota máxima es de: ' + currentNotaMaxima);
                    return false;
                }
            }
            else {
                if (txtNotaNueva > currentNotaMaxima) {
                    IsValid('notaNueva', 'ERROR');
                    alert('La nota mínima es de: ' + currentNotaMinima + ' y la nota máxima es de: ' + currentNotaMaxima);
                    return false;
                }
            }
            $('#btnCambiarNota').attr('disabled', 'disabled');
            var periodoSelectedValue = $('#idPeriodo').val();
            var subnivelSelectedValue = $('#idSubnivel').val();
            var asignaturaSelectedValue = $('#idAsignatura').val();
            var notaAnterior = $('#notaActual').text();
            var parameters = {
                "idSubnivel": subnivelSelectedValue, "idPeriodo": periodoSelectedValue, "idUsuario": currentIdUsuario,
                "idAgenda": currentIdAgenda, "idAsignatura": asignaturaSelectedValue, "nota": txtNotaNueva, "notaAnterior": notaAnterior,
                "justificacion": txtJustificacion, "lectura": document.getElementById('lectura').value, "FechaAccion": GetDate(), "NotaText": NotaText
            };
            jQueryAjaxCallback("../Shared/Utility.aspx/cambiarNota", JSON.stringify(parameters), "POST", "json", PostLibreta);
            Message(1, 'Se ha actualizado la nota exitosamente', 'Mensaje Exitoso');
        }
        else if (isNumeric(txtNotaNueva) == false) {
            IsValid('notaNueva', 'ERROR');
            alert('El campo de nota solo acepta números [0-9] y punto decimal [.].');
            return false;
        }
    }
    IsValid('notaNueva', 'NOTERROR');
    IsValid('justificacion', 'NOTERROR');
}

function notaAsistenciaEstudiante(idUsuario, idPeriodo, idAsignatura, objhtml, idAgenda, idSubnivel) {
    var parameters = {
        "idUsuario": idUsuario, "idPeriodo": idPeriodo, "idAsignatura": idAsignatura, "idSubnivel": idSubnivel
    };
    jQueryAjaxCallback("../Shared/Utility.aspx/notaAsistenciaEstudiante", JSON.stringify(parameters), "POST", "json", function (data) {
        var datat = data.d
        var notajson = JSON.parse(datat)
        objhtml.val(notajson[0].nota)
        guardarNotasAsistencia(idAgenda)
    });
}

var timeoutGuardarNotasAsistencia

function guardarNotasAsistencia(idAgenda) {
    clearTimeout(timeoutGuardarNotasAsistencia);
    timeoutGuardarNotasAsistencia = setTimeout(function () {
        console.log("guardarNotasAsistencia")
        actualizarNotas(idAgenda)
    }, 3000);
}
function obtenerNotasAsistencia(idAgenda) {
    var idAsignatura = $('#idAsignatura').val();
    var idSubnivel = $('#idSubnivel').val();
    var idPeriodo = $('#idPeriodo').val();
    $('.' + idAgenda).each(function (i, obj) {
        var idAlumno = $(obj).attr('idalumno')
        var input = $('.' + idAgenda + ' input[id=\'' + idAlumno + '\']') //$(obj).html()
        input.val('-')
        var nota = notaAsistenciaEstudiante(idAlumno, idPeriodo, idAsignatura, input, idAgenda, idSubnivel)
        console.log(nota)
    })
}
function PostLibreta(data) {
    $('#updatedialog').modal('hide');
    $('#delete_dialog').modal('hide');
    $('#cambionota_dialog').modal('hide');
    $('#agregarnvanota_dialog').modal('hide');
    limpiarFormNuevaNota();
    var counter = 0;
    var objArray = $.parseJSON(data.d);
    var arrayLength = objArray.length;
    var strhtml;
    while (counter < arrayLength) {
        strhtml += objArray[counter];
        ++counter;
    }
    strhtml = strhtml.replace("undefined", "");
    $('#tablaNotasWrapper').html(strhtml);
    $('.popovers').popover();
    $(".pleaseWaitDiv").hide();

    if (faltaMostrarNota) {
        faltaMostrarNota = false
        mostrarNota(idAgendaPendiente, -1, 3)
        obtenerNotasAsistencia(idAgendaPendiente)
    }
    Lectura()
}
function Lectura() {
    if (idRolA == 4) {
        if ($('#lectura').val() == 1) {// incluir condicion de lista de profesores que tienen permiso
            $('#BtnRedactar').show();
            $('#Div_lectura').hide();
            $('#btnAgregue').show();
            $('#tableTfootLec').show();
        }
        else if ($('#lectura').val() == 0) {
            $('#BtnRedactar').hide();
            $('#Div_lectura').show();
            $('#btnAgregue').hide();
            $('#tableTfootLec').hide();
        }
    }
    else if (idRolA == 1) {
        $('#lectura').val(1);
    }
}