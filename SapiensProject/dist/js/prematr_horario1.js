var ObjAsignaturas = []; // aqui se colocan los datos de todas las asignaturas
//var DataHorarios = [];//aqui esta la lista de horarios solo con los id
var ArrayIndiceHorario = -1; //si es -1 no existe
var contador = 0;
var nav4 = window.Event ? true : false;
function SetMask() {
    $('.noneTime').inputmask(
        "hh:mm", {
            placeholder: "HH:MM",
            insertMode: false,
            showMaskOnHover: false,
            hourFormat: 12
        }
    );
}
function AgregarFila() {
    var indice = $('#table_Crearhorario tbody:eq(0) tr').length;
    var DesactivarUsuarioPorPeriodo = ConverterBool($('#DesactivarUsuarioPorPeriodo').val());
    var html = '<tr>';
    if (DesactivarUsuarioPorPeriodo == false) {
        ObjAsignaturas.sort();
        contador++;
        html += '<td><input data-fila="' + indice + '" type="text" placeholder=""  onKeyPress="return acceptNum(event)" style="width:80px;" maxlength="5" class="form-control input-sm pull-right noneTime" /></td>';
        html += '<td><input  data-fila="' + indice + '" type="text" placeholder="" onKeyPress="return acceptNum(event)"style="width:80px;" maxlength="5" class="form-control input-sm noneTime" /></td>';
        for (var i = 0; i < 5; i++) {
            html += '<td>';
            html += '<select class="form-control input-sm" data-fila="' + indice + '"  >';
            for (var k = 0; k < ObjAsignaturas.length; k++) {
                if (ObjAsignaturas[k].id == -11) {
                    html += '<option selected data-idasignatura="' + ObjAsignaturas[k].id + '" value="' + ObjAsignaturas[k].id + '">' + ObjAsignaturas[k].Descripcion + '</option>';
                }
                else if (ObjAsignaturas[k].id != -10) {
                    html += '<option data-idasignatura="' + ObjAsignaturas[k].id + '" value="' + ObjAsignaturas[k].id + '">' + ObjAsignaturas[k].Descripcion + '</option>';
                }
            }
            html += '</select>';
            html += '</td>';
        }
        html += '<td><a data-recreo="false" data-laboral="false" data-agregar="false" data-fila="' + indice + '" onclick="AgregarRecreo(this)" title="Click para eliminar"><span class="fa fa-remove (alias) btnEliminar grow" aria-hidden="true"></span></a></td>';
        html += '</tr>';
        html += '<tr class="not_target" style="zoom: 0.85;"><td colspan="8"><a data-recreo="false" data-laboral="false" data-agregar="true" data-fila="' + (indice + 1) + '" onclick="AgregarRecreo(this)" title="Click para agregar recreo"><span class="fa fa-plus" aria-hidden="true"></span> Click para agregar recreo</a></td></tr>';
    }
    else if (DesactivarUsuarioPorPeriodo == true) {
        var stylo = 'style="min-height: 30px;clear: both;overflow: hidden;height: 1%;color:white;background-color: #f4f4f4; border-color: #ddd; width:120px; float: left; white-space: pre-line; font-weight:bolder; font-size:0.7vw;"';//height:auto;
        html += '<td><input type="text" placeholder="" onKeyPress="return acceptNum(event)" data-fila="' + indice + '" class="form-control input-sm pull-right noneTime" maxlength="5" style="width:80px;" /></td>';
        html += '<td><input type="text" placeholder="" onKeyPress="return acceptNum(event)" data-fila="' + indice + '" class="form-control input-sm noneTime" maxlength="5" style="width:80px;" /></td>';
        html += '<td><a data-fila="' + indice + '" data-activo="false" class="form-control btn btn-default" ' + stylo + ' onclick="ActivarHora(this)"></a></td>';
        html += '<td><a data-fila="' + indice + '" data-activo="false" class="form-control btn btn-default" ' + stylo + ' onclick="ActivarHora(this)"></a></td>';
        html += '<td><a data-fila="' + indice + '" data-activo="false" class="form-control btn btn-default" ' + stylo + ' onclick="ActivarHora(this)"></a></td>';
        html += '<td><a data-fila="' + indice + '" data-activo="false" class="form-control btn btn-default" ' + stylo + ' onclick="ActivarHora(this)"></a></td>';
        html += '<td><a data-fila="' + indice + '" data-activo="false" class="form-control btn btn-default" ' + stylo + ' onclick="ActivarHora(this)"></a></td>';
        html += '<td><a data-fila="' + indice + '" data-activo="false" class="form-control btn btn-default" ' + stylo + ' onclick="ActivarHora(this)"></a></td>';
        html += '<td><a data-recreo="false" data-laboral="true" data-agregar="false" data-fila="' + indice + '" onclick="AgregarRecreo(this)" title="Click para eliminar"><span class="fa fa-remove (alias) btnEliminar grow" aria-hidden="true"></span></a></td>';
        html += '</tr>';
    }
    $('#table_Crearhorario tbody').append(html);
    $('#btnGuardarHorario').show();
    SetMask();
}
function ColocarHoraInputInferior(thisElemet) {
    var _td = $(thisElemet).parent().get(0);
    var _tr = $(_td).parent().get(0);//obtiene el tr seleccionado
    var tr2 = _tr.nextElementSibling;//obtiene el tr hermano de _tr seleccionado
}
function ActivarHora(Element) {
    if ($(Element).data('activo') == true) {
        $(Element).css({ 'background-color': '#f4f4f4', 'border-color': '#ddd' });
        $(Element).data('activo', false);
        $(Element).val(false);
        $(Element).text('');
    }
    else {
        $(Element).css({ 'background-color': '#00a65a', 'border-color': '#008d4c' });
        $(Element).data('activo', true);
        $(Element).val(true);
        $(Element).text($('#table_Crearhorario').data('nombrehorario'));
    }
}
function CargarHorarioAdmin(idSubnivel, idPeriodo, nombrehorario, nombreasingatura) {
    //limpiar asignaturas y horarios
    ObjAsignaturas = [];
    $('#table_Crearhorario tbody').empty();
    $('#btnAgregarFila').show();
    $('#btnEliminarHorario, #btnImprimirHorario').hide();
    //$('#btnGuardarHorario').hide();
    $('#table_Crearhorario').data('nombrehorario', nombrehorario);
    $('#titulo_H1').text(nombrehorario);
    MostrarHorario(nombrehorario, nombreasingatura, idSubnivel);
    var parameters = { "idSubNivel": idSubnivel, "idPeriodo": idPeriodo };
    jQueryAjaxCallback("../Shared/Utility.aspx/CargarHorarioLaboral", JSON.stringify(parameters), "POST", "json", PostCargarHorarioAdmin);
}
var DataHorariosI = [];
function PostCargarHorarioAdmin(response) {
    var tempHorario = JSON.parse(response.d)[0];
    console.log(tempHorario)
    var DesactivarUsuarioPorPeriodo = tempHorario.DesactivarUsuarioPorPeriodo;    
        $('.editorH').summernote('code', tempHorario.Observaciones);
    if ((tempHorario != null) && (tempHorario.ListaHorario != '')) {
        DataHorariosI = JSON.parse(tempHorario.ListaHorario);
        $('#btnEliminarHorario').data('idnivel', tempHorario.IdNivel);
        $('#btnEliminarHorario, #btnImprimirHorario').show();
        //$('#btnGuardarHorario').hide();
        if (ConverterBool(DesactivarUsuarioPorPeriodo) == false) {
            //$('#TxtObservacion').val(tempHorario.Observaciones);
            var parameters = { "idSubnivel": tempHorario.IdSubNivel };
            jQueryAjaxCallback("../Shared/Utility.aspx/CargarAsignaturas", JSON.stringify(parameters), "POST", "json", PostCargarAsignaturas);
        }
        else if (ConverterBool(DesactivarUsuarioPorPeriodo) == true) {
            DibujarTbodyTablaHorarioLaboral(tempHorario.NombreSubNivel, DataHorariosI);
        }
    }
    else {
        //$('#btnGuardarHorario').hide();
        MostrarHorario('', '', $('#idSubnivel').val());
    }
}
function PostCargarAsignaturas(response) {
    ObjAsignaturas = JSON.parse(response.d);
    AddRecreoyHoraLibre();
    DibujarTbodyTablaHorarioDiurno(DataHorariosI);
}
function DibujarHorarioDiurnoEstudiante(_Horarios) {
    $('#table_Crearhorario tbody').empty();
    var html = "";
    for (var i = 0; i < _Horarios.length; i++) {
        var temporal_indice = ObjAsignaturas.map(function (e) { return e.id; }).indexOf(Number(_Horarios[i].Lunes));
        if (ObjAsignaturas[temporal_indice].id == -10)
            html += '<tr class="recreo">';
        else
            html += '<tr>';
        html += '<td>' + _Horarios[i].HoraInicio + ' - ' + _Horarios[i].HoraFinal + '</td>';
        if (ObjAsignaturas[temporal_indice].id == -10) {
            html += '<td class="text-red" colspan="6" style="text-align:center;">' +
                'R&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +
                'E&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +
                'C&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +
                'R&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +
                'E&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +
                'O';
        }
        else {
            for (var d = 0; d <= 5; d++) {
                html += '<td>';
                var _indice = -1;
                if (d == 0) {
                    _indice = ObjAsignaturas.map(function (e) { return e.id; }).indexOf(Number(_Horarios[i].Lunes));
                    if (_indice != -1)
                        html += ObjAsignaturas[_indice].Descripcion +'<p></p>';
                }
                else if (d == 1) {
                    _indice = ObjAsignaturas.map(function (e) { return e.id; }).indexOf(Number(_Horarios[i].Martes));
                    if (_indice != -1)
                        html += ObjAsignaturas[_indice].Descripcion + '<p></p>';
                }
                else if (d == 2) {
                    _indice = ObjAsignaturas.map(function (e) { return e.id; }).indexOf(Number(_Horarios[i].Miercoles));
                    if (_indice != -1)
                        html += ObjAsignaturas[_indice].Descripcion + '<p></p>';
                }
                else if (d == 3) {
                    _indice = ObjAsignaturas.map(function (e) { return e.id; }).indexOf(Number(_Horarios[i].Jueves));
                    if (_indice != -1)
                        html += ObjAsignaturas[_indice].Descripcion + '<p></p>';
                }
                else if (d == 4) {
                    _indice = ObjAsignaturas.map(function (e) { return e.id; }).indexOf(Number(_Horarios[i].Viernes));
                    if (_indice != -1)
                        html += ObjAsignaturas[_indice].Descripcion + '<p></p>';
                }
                else if (d == 5) {
                    _indice = ObjAsignaturas.map(function (e) { return e.id; }).indexOf(Number(_Horarios[i].Sabado));
                    if (_indice != -1)
                        html += ObjAsignaturas[_indice].Descripcion + '<p></p>';
                }
                html += '</td>';
            }
        }
        html += '</tr>';
    }
    $('#table_Crearhorario tbody').append(html);
}
function DibujarTbodyTablaHorarioDiurno(_Horarios) {
    $('#table_Crearhorario tbody').empty();
    var html = "";
    for (var i = 0; i < _Horarios.length; i++) {
        var temporal_indice = ObjAsignaturas.map(function (e) { return e.id; }).indexOf(Number(_Horarios[i].Lunes));
        if (ObjAsignaturas[temporal_indice].id == -10)
            html += '<tr class="recreo">';
        else
            html += '<tr>';
        html += '<td><input data-fila="' + i + '" type="text"  onKeyPress="return acceptNum(event)" style="width:80px;" class="form-control input-sm noneTime" maxlength="5" value="' + _Horarios[i].HoraInicio + '" /></td>';
        html += '<td><input data-fila="' + i + '" type="text"  onKeyPress="return acceptNum(event)" style="width:80px;" class="form-control input-sm noneTime" maxlength="5" value="' + _Horarios[i].HoraFinal + '" /></td>';

        if (ObjAsignaturas[temporal_indice].id == -10) {
            html += '<td colspan="6" style="text-align:center;font-size: 21px;">' +
                'R&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +
                'E&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +
                'C&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +
                'R&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +
                'E&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +
                'O';
        }
        else {
            for (var d = 0; d < 5; d++) {
                html += '<td>';
                html += '<select class="form-control input-sm" data-fila="' + i + '" >';
                var _indice = -1;
                if (d == 0) {
                    _indice = ObjAsignaturas.map(function (e) { return e.id; }).indexOf(Number(_Horarios[i].Lunes));
                    if (_indice != -1)
                        html += '<option data-idasignatura="' + ObjAsignaturas[_indice].id + '" value="' + ObjAsignaturas[_indice].id + '" selected>' + ObjAsignaturas[_indice].Descripcion + '</option>';
                }
                else if (d == 1) {
                    _indice = ObjAsignaturas.map(function (e) { return e.id; }).indexOf(Number(_Horarios[i].Martes));
                    if (_indice != -1)
                        html += '<option data-idasignatura="' + ObjAsignaturas[_indice].id + '" value="' + ObjAsignaturas[_indice].id + '" selected>' + ObjAsignaturas[_indice].Descripcion + '</option>';
                }
                else if (d == 2) {
                    _indice = ObjAsignaturas.map(function (e) { return e.id; }).indexOf(Number(_Horarios[i].Miercoles));
                    if (_indice != -1)
                        html += '<option data-idasignatura="' + ObjAsignaturas[_indice].id + '" value="' + ObjAsignaturas[_indice].id + '" selected>' + ObjAsignaturas[_indice].Descripcion + '</option>';
                }
                else if (d == 3) {
                    _indice = ObjAsignaturas.map(function (e) { return e.id; }).indexOf(Number(_Horarios[i].Jueves));
                    if (_indice != -1)
                        html += '<option data-idasignatura="' + ObjAsignaturas[_indice].id + '" value="' + ObjAsignaturas[_indice].id + '" selected>' + ObjAsignaturas[_indice].Descripcion + '</option>';
                }
                else if (d == 4) {
                    _indice = ObjAsignaturas.map(function (e) { return e.id; }).indexOf(Number(_Horarios[i].Viernes));
                    if (_indice != -1)
                        html += '<option data-idasignatura="' + ObjAsignaturas[_indice].id + '" value="' + ObjAsignaturas[_indice].id + '" selected>' + ObjAsignaturas[_indice].Descripcion + '</option>';
                }
                else if (d == 5) {
                    _indice = ObjAsignaturas.map(function (e) { return e.id; }).indexOf(Number(_Horarios[i].Sabado));
                    if (_indice != -1)
                        html += '<option data-idasignatura="' + ObjAsignaturas[_indice].id + '" value="' + ObjAsignaturas[_indice].id + '" selected>' + ObjAsignaturas[_indice].Descripcion + '</option>';
                }
                for (var k = 0; k < ObjAsignaturas.length; k++) {
                    if (_indice != -1) {
                        if (ObjAsignaturas[_indice].id != ObjAsignaturas[k].id) {
                            html += '<option data-idasignatura="' + ObjAsignaturas[k].id + '" value="' + ObjAsignaturas[k].id + '">' + ObjAsignaturas[k].Descripcion + '</option>';
                        }
                    }
                }
                html += '</select>';
                html += '</td>';
            }
        }
        if (ObjAsignaturas[temporal_indice].id == -10)
            html += '<td><a data-recreo="true" data-laboral="false" data-agregar="false" data-fila="' + i + '" onclick="AgregarRecreo(this)" title="Click para eliminar"><span class="fa fa-remove (alias) btnEliminar grow" aria-hidden="true"></span></a></td>';
        else
            html += '<td><a data-recreo="false" data-laboral="false" data-agregar="false" data-fila="' + i + '" onclick="AgregarRecreo(this)" title="Click para eliminar"><span class="fa fa-remove (alias) btnEliminar grow" aria-hidden="true"></span></a></td>';

        html += '</tr>';
        if (ObjAsignaturas[temporal_indice].id == -10)//recreo = -10
            html += '<tr class="not_target" style="zoom: 0.85;"><td colspan="8"><a style="display:none;" data-recreo="false" data-laboral="false" data-agregar="true" data-fila="' + (i + 1) + '" onclick="AgregarRecreo(this)" title="Click para agregar recreo"><span class="fa fa-plus" aria-hidden="true"></span> Click para agregar recreo</a></td></tr>';
        else {
            if (i + 1 < _Horarios.length) {
                var _indice2 = ObjAsignaturas.map(function (e) { return e.id; }).indexOf(Number(_Horarios[i + 1].Lunes));
                if (_indice2 != -1) {
                    if (ObjAsignaturas[_indice2].id == -10)
                        html += '<tr class="not_target" style="zoom: 0.85;"><td colspan="8"><a style="display:none;" data-recreo="false" data-laboral="false" data-agregar="true" data-fila="' + (i + 1) + '" onclick="AgregarRecreo(this)" title="Click para agregar recreo"><span class="fa fa-plus" aria-hidden="true"></span> Click para agregar recreo</a></td></tr>';
                    else
                        html += '<tr class="not_target" style="zoom: 0.85;"><td colspan="8"><a data-recreo="false" data-laboral="false" data-agregar="true" data-fila="' + (i + 1) + '" onclick="AgregarRecreo(this)" title="Click para agregar recreo"><span class="fa fa-plus" aria-hidden="true"></span> Click para agregar recreo</a></td></tr>';
                }
                else
                    html += '<tr class="not_target" style="zoom: 0.85;"><td colspan="8"><a data-recreo="false" data-laboral="false" data-agregar="true" data-fila="' + (i + 1) + '" onclick="AgregarRecreo(this)" title="Click para agregar recreo"><span class="fa fa-plus" aria-hidden="true"></span> Click para agregar recreo</a></td></tr>';
            }
            else
                html += '<tr class="not_target" style="zoom: 0.85;"><td colspan="8"><a data-recreo="false" data-laboral="false" data-agregar="true" data-fila="' + (i + 1) + '" onclick="AgregarRecreo(this)" title="Click para agregar recreo"><span class="fa fa-plus" aria-hidden="true"></span> Click para agregar recreo</a></td></tr>';
        }
    }
    $('#table_Crearhorario tbody').append(html);
    $('#btnGuardarHorario').show();
    SetMask();
}
function MostrarHorario(nombrehorario, nombreasingatura, idsubnivel, idAsignatura) {
    $('#titulo_H1').text(nombrehorario);
    $('#table_Crearhorario').data('nombrehorario', nombrehorario);
    $('#btnGuardarHorario').data('nombrenivel', nombreasingatura);
    ObjAsignaturas = [];
    var DesactivarUsuarioPorPeriodo = ConverterBool($('#DesactivarUsuarioPorPeriodo').val());
    if (DesactivarUsuarioPorPeriodo == true) {
        var idAsignatura = $('#idAsignatura').val();
        ObjAsignaturas[ObjAsignaturas.length] = {
            "id": idAsignatura,
            "idNivel": -10,
            "idEscuela": -10,
            "idAsignaturaPrerrequisito": -10,
            "Nombre": nombreasingatura,
            "Descripcion": nombreasingatura,
            "Activo": true,
            "idTipoMetodologia": 0
        }
    }
    else if (DesactivarUsuarioPorPeriodo == false) {
        cargarSelectAsignatura(idsubnivel);
    }
}
function DibujarTbodyTablaHorarioLaboral(NombreMateria, DataHorarios) {
    $('#table_Crearhorario').data('nombrehorario', NombreMateria);
    var html = '';
    //color gris, hora no activa 
    var stylo = 'style="min-height: 30px; clear: both; overflow: hidden; height: 1%;color:white; background-color: #f4f4f4; border-color: #ddd; width:120px; float: left; white-space: pre-line; font-weight:bolder; font-size:0.7vw;"';
    //color verde, hora activada
    var stylo1 = 'style="min-height: 30px; clear: both; overflow: hidden; height: 1%;color:white; background-color:#00a65a; border-color: #008d4c; width:120px; float: left; white-space: pre-line; font-weight:bolder; font-size:0.7vw;"';

    for (var i = 0; i < DataHorarios.length; i++) {
        html += '<tr>';
        html += '<td><input type="text" placeholder=""  onKeyPress="return acceptNum(event)" data-fila="' + i + '" class="form-control input-sm pull-right noneTime" style="width:80px;" maxlength="5" value="' + DataHorarios[i].HoraInicio + '" /></td>';
        html += '<td><input type="text" placeholder="" onKeyPress="return acceptNum(event)" data-fila="' + i + '" class="form-control input-sm noneTime" style="width:80px;" maxlength="5"  value="' + DataHorarios[i].HoraFinal + '" /></td>';
        html += '<td><a data-fila="' + i + '" data-activo="' + DataHorarios[i].Lunes + '" class="form-control btn btn-default" ' + ((DataHorarios[i].Lunes) ? stylo1 : stylo) + ' onclick="ActivarHora(this)">' + ((DataHorarios[i].Lunes) ? NombreMateria : "") + '</a></td>';
        html += '<td><a data-fila="' + i + '" data-activo="' + DataHorarios[i].Martes + '" class="form-control btn btn-default" ' + ((DataHorarios[i].Martes) ? stylo1 : stylo) + ' onclick="ActivarHora(this)">' + ((DataHorarios[i].Martes) ? NombreMateria : "") + '</a></td>';
        html += '<td><a data-fila="' + i + '" data-activo="' + DataHorarios[i].Miercoles + '" class="form-control btn btn-default" ' + ((DataHorarios[i].Miercoles) ? stylo1 : stylo) + ' onclick="ActivarHora(this)">' + ((DataHorarios[i].Miercoles) ? NombreMateria : "") + '</a></td>';
        html += '<td><a data-fila="' + i + '" data-activo="' + DataHorarios[i].Jueves + '" class="form-control btn btn-default" ' + ((DataHorarios[i].Jueves) ? stylo1 : stylo) + ' onclick="ActivarHora(this)">' + ((DataHorarios[i].Jueves) ? NombreMateria : "") + '</a></td>';
        html += '<td><a data-fila="' + i + '" data-activo="' + DataHorarios[i].Viernes + '" class="form-control btn btn-default" ' + ((DataHorarios[i].Viernes) ? stylo1 : stylo) + ' onclick="ActivarHora(this)">' + ((DataHorarios[i].Viernes) ? NombreMateria : "") + '</a></td>';
        html += '<td><a data-fila="' + i + '" data-activo="' + DataHorarios[i].Sabado + '" class="form-control btn btn-default" ' + ((DataHorarios[i].Sabado) ? stylo1 : stylo) + ' onclick="ActivarHora(this)">' + ((DataHorarios[i].Sabado) ? NombreMateria : "") + '</a></td>';
        html += '<td><a data-recreo="false" data-laboral="true" data-agregar="false" data-fila="' + i + '" onclick="AgregarRecreo(this)" title="Click para eliminar"><span class="fa fa-remove (alias) btnEliminar grow" aria-hidden="true"></span></a></td>';
        html += '</tr>';
    }
    $('#table_Crearhorario tbody').append(html);
    $('#btnGuardarHorario').show();
    SetMask();
}
function OrdenarJson(ArrayHorarios) {
    ArrayHorarios.sort(function (a, b) {
        return Number(a.HoraInicio.replace(':', "")) - Number(b.HoraInicio.replace(':', ""));
    });
    return ArrayHorarios;
}
function UnificarJson(ArrayHorarios) {
    var tempHorario = [];
    for (var i = 0; i < ArrayHorarios.length; i++) {
        var existe = tempHorario.map(function (e) { return e.HoraInicio; }).indexOf(ArrayHorarios[i].HoraInicio);
        if (existe == -1) {
            tempHorario[tempHorario.length] = ArrayHorarios[i];
        }
        else {
            tempHorario[existe].Lunes += ":" + ((ArrayHorarios[i].Lunes) ? ArrayHorarios[i].Lunes : "");
            tempHorario[existe].Martes += ":" + ((ArrayHorarios[i].Martes) ? ArrayHorarios[i].Martes : "");
            tempHorario[existe].Miercoles += ":" + ((ArrayHorarios[i].Miercoles) ? ArrayHorarios[i].Miercoles : "");
            tempHorario[existe].Jueves += ":" + ((ArrayHorarios[i].Jueves) ? ArrayHorarios[i].Jueves : "");
            tempHorario[existe].Viernes += ":" + ((ArrayHorarios[i].Viernes) ? ArrayHorarios[i].Viernes : "");
            tempHorario[existe].Sabado += ":" + ((ArrayHorarios[i].Sabado) ? ArrayHorarios[i].Sabado : "");
        }
    }
    return tempHorario;
}
function GuardarHorario() {
    var eval = table_a_json();
    if (eval == '')
        var val = '';
    else
        val = eval;
    Message(1, 'Mensaje Exitoso', 'Se ha guardado el horario exitosamente');
    var Observaciones = $('.editorH').summernote('code');
    //var Observaciones = $('#TxtObservacion').val();
    var parameters = { "ObjHorario": val, "idSubNivel": $('#idSubnivel').val(), "Observaciones": Observaciones };
    jQueryAjaxCallback("../Shared/Utility.aspx/GuardarHorario", JSON.stringify(parameters), "POST", "json", PostGuardarHorario);
}
function seActualizoElHorario(data) {
    $('#table_Crearhorario tbody').empty();
    $('#AddHorario').modal('toggle');
}
function PostGuardarHorario(data) {
}
function AgregarRecreo(thisElemet) {
    /// <summary>Agrega una nueva fila de recreo</summary>

    var indice = $(thisElemet).data('fila');

    if (Boolean($(thisElemet).data('agregar')) == true) {
        $(thisElemet).hide();
        var html = '<tr style="background-color:#80b3ff;" class="recreo">';
        html += '<td><input data-fila="' + indice + '" type="text" placeholder=""  onKeyPress="return acceptNum(event)" maxlength="5" style="width:80px;" class="form-control input-sm pull-right noneTime" /></td>';
        html += '<td><input  data-fila="' + indice + '" type="text" placeholder=""  onKeyPress="return acceptNum(event)" maxlength="5" style="width:80px;" class="form-control input-sm noneTime" /></td>';
        html += '<td colspan="6" style="text-align:center;font-size: 21px;">' +
            'R&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +
            'E&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +
            'C&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +
            'R&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +
            'E&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +
            'O';
        html += '</td>';
        html += '<td><a data-recreo="true" data-laboral="false" data-agregar="false" data-fila="' + indice + '" onclick="AgregarRecreo(this)" title="Click para eliminar"><span class="fa fa-remove (alias) btnEliminar grow" aria-hidden="true"></span></a></td>';
        html += '</tr>';
        $('#table_Crearhorario tbody:eq(0) tr').eq($(thisElemet).data('fila')).after(html);
    }
    else {
        var _td = $(thisElemet).parent().get(0);
        var _tr = $(_td).parent().get(0);//selecinado el tr seleccionado
        if ($(thisElemet).data('laboral') == false) {//elimina al tr selecinado y al tr de abajo donde sale la palabra agregar recreo
            var tr1 = _tr;
            var tr2 = _tr.nextElementSibling;
            if ($(thisElemet).data('recreo') == false) {
                $(tr1).remove(); $(tr2).remove();//elimina los dos tr y su contenido
            }
            else {
                $(_tr.previousElementSibling).find('a').show();
                $(tr1).remove();
            }
        }
        else {//elimina solo al tr selecinado con su contenido
            $($(_td).parent().get(0)).remove();
        }
    }
    SetMask();
}
function cargarSelectAsignatura(idSubnivel) {
    /// <summary>ajax que busca las asignaturas por nivel</summary>
    var parameters = { "idSubnivel": idSubnivel };
    jQueryAjaxCallback("../Shared/Utility.aspx/CargarAsignaturas", JSON.stringify(parameters), "POST", "json", cargarDatosAsignatura);
}
function cargarDatosAsignatura(data) {
    ObjAsignaturas = JSON.parse(data.d);
    AddRecreoyHoraLibre();
}
function AddRecreoyHoraLibre() {
    /// <summary>Agrega recreo y hora libre a el array de asignaturas</summary>

    ObjAsignaturas = completarAsignaturasDefault(ObjAsignaturas)
}
function table_a_json() {
    var ObjHorarioNuevo = [];
    var _return = '';
    var longTable = $('#table_Crearhorario tbody:eq(0) tr').length;
    var DesactivarUsuarioPorPeriodo = ConverterBool($('#DesactivarUsuarioPorPeriodo').val());
    if (longTable > 0) {
        for (var i = 0; i < longTable; i++) {
            if (DesactivarUsuarioPorPeriodo == false) {
                if ($('#table_Crearhorario tbody:eq(0) tr').eq(i).prop('class') != "not_target") {
                    if ($('#table_Crearhorario tbody:eq(0) tr').eq(i).prop('class') != "recreo") {

                        if (ObjHorarioNuevo.map(function (e) {
                            return e.HoraInicio;
                        }).indexOf($('#table_Crearhorario tbody:eq(0) tr').eq(i).children().eq(0).children().val()) == -1) {
                            ObjHorarioNuevo[ObjHorarioNuevo.length] =
                                {
                                    "HoraInicio": $('#table_Crearhorario tbody:eq(0) tr').eq(i).children().eq(0).children().val(),
                                    "HoraFinal": $('#table_Crearhorario tbody:eq(0) tr').eq(i).children().eq(1).children().val(),
                                    "Lunes": $('#table_Crearhorario tbody:eq(0) tr').eq(i).children().eq(2).children().val(),
                                    "Martes": $('#table_Crearhorario tbody:eq(0) tr').eq(i).children().eq(3).children().val(),
                                    "Miercoles": $('#table_Crearhorario tbody:eq(0) tr').eq(i).children().eq(4).children().val(),
                                    "Jueves": $('#table_Crearhorario tbody:eq(0) tr').eq(i).children().eq(5).children().val(),
                                    "Viernes": $('#table_Crearhorario tbody:eq(0) tr').eq(i).children().eq(6).children().val(),
                                    "Sabado": $('#table_Crearhorario tbody:eq(0) tr').eq(i).children().eq(7).children().val()
                                };
                        }
                    }
                    else {
                        if (ObjHorarioNuevo.map(function (e) { return e.HoraInicio; }).indexOf($('#table_Crearhorario tbody:eq(0) tr').eq(i).children().eq(0).children().val()) == -1) {
                            ObjHorarioNuevo[ObjHorarioNuevo.length] =
                                {
                                    "HoraInicio": $('#table_Crearhorario tbody:eq(0) tr').eq(i).children().eq(0).children().val(),
                                    "HoraFinal": $('#table_Crearhorario tbody:eq(0) tr').eq(i).children().eq(1).children().val(),
                                    "Lunes": -10, "Martes": -10, "Miercoles": -10, "Jueves": -10, "Viernes": -10, "Sabado": -10
                                };
                        }
                    }
                }
            }
            else if (DesactivarUsuarioPorPeriodo == true) {
                if (ObjHorarioNuevo.map(function (e) { return e.HoraInicio; }).indexOf($('#table_Crearhorario tbody:eq(0) tr').eq(i).children().eq(0).children().val()) == -1) {
                    ObjHorarioNuevo[ObjHorarioNuevo.length] =
                        {
                            "HoraInicio": $('#table_Crearhorario tbody:eq(0) tr').eq(i).children().eq(0).children().val(),
                            "HoraFinal": $('#table_Crearhorario tbody:eq(0) tr').eq(i).children().eq(1).children().val(),
                            "Lunes": $('#table_Crearhorario tbody:eq(0) tr').eq(i).children().eq(2).children().data('activo'),
                            "Martes": $('#table_Crearhorario tbody:eq(0) tr').eq(i).children().eq(3).children().data('activo'),
                            "Miercoles": $('#table_Crearhorario tbody:eq(0) tr').eq(i).children().eq(4).children().data('activo'),
                            "Jueves": $('#table_Crearhorario tbody:eq(0) tr').eq(i).children().eq(5).children().data('activo'),
                            "Viernes": $('#table_Crearhorario tbody:eq(0) tr').eq(i).children().eq(6).children().data('activo'),
                            "Sabado": $('#table_Crearhorario tbody:eq(0) tr').eq(i).children().eq(7).children().data('activo')
                        };
                }
            }
        }
        _return = JSON.stringify(ObjHorarioNuevo);
    }
    else if (longTable == 0) {
        _return = "";
    }
    return _return;
}
function ImprimiarHorario(idUsuario) {
    var res = "";
    var DataHorarios = [];
    var DesactivarUsuarioPorPeriodo = ConverterBool($('#DesactivarUsuarioPorPeriodo').val());
    if (DesactivarUsuarioPorPeriodo == false) {
        DataHorarios = ObtenerDataParaImprimir("admin");
    }
    else if (DesactivarUsuarioPorPeriodo == true) {
        DataHorarios = ObtenerDataParaImprimir("estudiantes");
    }
    $('#div_tabla').empty();
    var html = '<tr><td>Inicio</td><td>Fin</td><td>Lunes</td><td>Martes</td><td>Miercoles</td><td>Jueves</td><td>Viernes</td><td>Sabado</td></tr>';
    for (var i = 0; i < DataHorarios.length; i++) {
        html += '<tr>';
        html += '<td>' + DataHorarios[i].HoraInicio + '</td>';
        html += '<td>' + DataHorarios[i].HoraFinal + '</td>';
        html += '<td>' + DataHorarios[i].Lunes + '</td>';
        html += '<td>' + DataHorarios[i].Martes + '</td>';
        html += '<td>' + DataHorarios[i].Miercoles + '</td>';
        html += '<td>' + DataHorarios[i].Jueves + '</td>';
        html += '<td>' + DataHorarios[i].Viernes + '</td>';
        html += '<td>' + DataHorarios[i].Sabado + '</td>';
        html += '</tr>';
    }
    $('#div_tabla').append(html);
    //if (idUsuario >= 0) {
    //    var parameters = { "idUsuario": idUsuario, "idPeriodo": $('#PeriodoAsignatura').val() };
    //    jQueryAjaxCallback("../Shared/Utility.aspx/ReporteAsignaturaAlumno", JSON.stringify(parameters), "POST", "json", PostImprimiarHorario);
    //}
    //else {
    var doc = new jsPDF('landscape');
    res = doc.autoTableHtmlToJson(document.getElementById("div_tabla"));
    doc.autoTable(res.columns, res.data, {
        addPageContent: function (data) {
            SetHeader('Horario', doc, 'landscape');
        },
        margin: { top: 45, bottom: 50, horizontal: 10 },
        styles: { overflow: 'linebreak' }
    });
    doc.save("Horario.pdf");
    //}
}
function PostImprimiarHorario(data) {
    var counter = 0;
    var p = $.parseJSON(data.d);
    var arrayLength = p.length;
    var doc = new jsPDF('landscape');
    res = doc.autoTableHtmlToJson(document.getElementById("div_tabla"));
    doc.autoTable(res.columns, res.data, {
        addPageContent: function (data) {
            SetHeader('Horario de Materias Matriculadas', doc, 'landscape');
            doc.setFontSize(11);
            var str = '';
            if (p[0].idUsuario != -1)
                str = "Recibido ______________________                                                                      Fecha:_________________________";
            if (typeof doc.putTotalPages === 'function') {
                str = str;
            }
            if (p[0].idUsuario != -1) {
                doc.text("Nota: La direccion web para acceder al sistema es: www.academicanet.com", data.settings.margin.left, doc.internal.pageSize.getHeight() - 35);
                doc.text("Usuario: " + p[0].NombreUsuario, data.settings.margin.left, doc.internal.pageSize.getHeight() - 30);
                doc.text("Contrasena: " + p[0].Contrasena, data.settings.margin.left + 175, doc.internal.pageSize.getHeight() - 30);
            }
            doc.text(str, data.settings.margin.left, doc.internal.pageSize.getHeight() - 15);
            doc.text("Fecha Impreso: " + moment().locale('es').format('D MMM YYYY, h:mm:ss a'), data.settings.margin.left, doc.internal.pageSize.getHeight() - 10);

        },
        margin: { top: 30, bottom: 50, horizontal: 10 },
        styles: { overflow: 'linebreak' }
    });
    doc.save("Horario.pdf");
}
function ObtenerDataParaImprimir(tipo) {
    var DataHorarios = [];
    var DesactivarUsuarioPorPeriodo = ConverterBool($('#DesactivarUsuarioPorPeriodo').val());
    if (tipo == "admin") {
        if (DesactivarUsuarioPorPeriodo == false) {
            DataHorarios = [];
            $('#table_Crearhorario tbody:eq(0) tr').each(function () {
                if ($(this).prop('class') != "not_target") {
                    if (DataHorarios.map(function (e) { return e.HoraInicio; }).indexOf($(this).find("td:eq(0) input[type='text']").val()) == -1) {
                        if ($(this).prop('class') == "recreo") {
                            DataHorarios.push({
                                HoraInicio: $(this).find("td:eq(0) input[type='text']").val(),
                                HoraFinal: $(this).find("td:eq(1) input[type='text']").val(),
                                Lunes: "Recreo",
                                Martes: "Recreo",
                                Miercoles: "Recreo",
                                Jueves: "Recreo",
                                Viernes: "Recreo",
                                Sabado: "Recreo"
                            });
                        }
                        else {
                            DataHorarios.push({
                                HoraInicio: $(this).find("td:eq(0) input[type='text']").val(),
                                HoraFinal: $(this).find("td:eq(1) input[type='text']").val(),
                                Lunes: $(this).find("td:eq(2) option:selected").text(),
                                Martes: $(this).find("td:eq(3) option:selected").text(),
                                Miercoles: $(this).find("td:eq(4) option:selected").text(),
                                Jueves: $(this).find("td:eq(5) option:selected").text(),
                                Viernes: $(this).find("td:eq(6) option:selected").text(),
                                Sabado: $(this).find("td:eq(7) option:selected").text()
                            });
                        }
                    }
                }
            });
        }
        else if (DesactivarUsuarioPorPeriodo == true) {
            $('#table_Crearhorario tbody:eq(0) tr').each(function () {
                if (DataHorarios.map(function (e) { return e.HoraInicio; }).indexOf($(this).find("td:eq(0) input[type='text']").val()) == -1) {
                    DataHorarios.push({
                        HoraInicio: $(this).find("td:eq(0) input[type='text']").val(),
                        HoraFinal: $(this).find("td:eq(1) input[type='text']").val(),
                        Lunes: $(this).find("td:eq(2) .btn").text(),
                        Martes: $(this).find("td:eq(3) .btn").text(),
                        Miercoles: $(this).find("td:eq(4) .btn").text(),
                        Jueves: $(this).find("td:eq(5) .btn").text(),
                        Viernes: $(this).find("td:eq(6) .btn").text(),
                        Sabado: $(this).find("td:eq(7) .btn").text()
                    });
                }
            });
        }
    }
    else {
        $('#table_Crearhorario tbody:eq(0) tr').each(function () {
            if (DataHorarios.map(function (e) { return e.HoraInicio; }).indexOf($(this).find("td:eq(0)").text()) == -1) {
                if ($(this).prop('class') == "recreo") {
                    DataHorarios.push({
                        HoraInicio: $(this).find("td:eq(0)").text(),
                        HoraFinal: $(this).find("td:eq(1)").text(),
                        Lunes: "RECREO",
                        Martes: "RECREO",
                        Miercoles: "RECREO",
                        Jueves: "RECREO",
                        Viernes: "RECREO",
                        Sabado: "RECREO"
                    });
                }
                else {
                    DataHorarios.push({
                        HoraInicio: $(this).find("td:eq(0)").text(),
                        HoraFinal: $(this).find("td:eq(1)").text(),
                        Lunes: $(this).find("td:eq(2)").text(),
                        Martes: $(this).find("td:eq(3)").text(),
                        Miercoles: $(this).find("td:eq(4)").text(),
                        Jueves: $(this).find("td:eq(5)").text(),
                        Viernes: $(this).find("td:eq(6)").text(),
                        Sabado: $(this).find("td:eq(7)").text()
                    });
                }
            }
        });
    }
    return DataHorarios;
}
function EliminarHorario(thisElement) {
    if (confirm("Are you sure to delete the schedule")) {
        var parameters = { "IdSubNivel": $('#idSubnivel').val() };
        jQueryAjaxCallback("../Shared/Utility.aspx/RemoverHorario", JSON.stringify(parameters), "POST", "json", SeEliminoHorarios);
    }
}
function SeEliminoHorarios() {
    $('#table_Crearhorario tbody').empty();
}
function acceptNum(evt) {
    var key = nav4 ? evt.which : evt.keyCode;
    return (key <= 13 || (key >= 48 && key <= 57) || key == 58);
}
function Obtener_HorarioxUsuario(thisElement) {
    $('#ModalHorario').modal('show');
    $('#table_Crearhorario tbody').empty();
    var parameters = { "idUsuario": $(thisElement).data('idusuario'), "idRol": $(thisElement).data('idrol'), 'idPeriodo': $('.PeriodoAsignatura option:selected').val(), "idSubnivel": -1 };
    console.log(parameters)
    jQueryAjaxCallback("../Shared/Utility.aspx/ObtenerJSONHORARIOSxUSUARIO", JSON.stringify(parameters), "POST", "json", dataHorarioxUsuario);
}
function dataHorarioxUsuario(data) {
    var _dataObjHorarios = JSON.parse(data.d);
    var JsonHorarios = [];
    var ObjArrayHorarios = [];
    if (_dataObjHorarios.length > 1) {
        var ObjArrayHorarios = [];
        for (var i = 0; i < _dataObjHorarios.length; i++) {
            if (_dataObjHorarios[i].Horario.length > 0) {
                var _Horario = JSON.parse(_dataObjHorarios[i].Horario);
                for (var k = 0; k < _Horario.length; k++) {
                    ObjArrayHorarios.push(Colocar_NombreHorario(_Horario[k], _dataObjHorarios[i].Nombre));
                }
            }
        }
        JsonHorarios = ObjArrayHorarios;
    }
    else {
        if (_dataObjHorarios[0].Horario.length > 0) {
            var _Horario = JSON.parse(_dataObjHorarios[0].Horario);
            for (var k = 0; k < _Horario.length; k++) {
                ObjArrayHorarios.push(Colocar_NombreHorario(_Horario[k], _dataObjHorarios[0].Nombre));
            }
            JsonHorarios = ObjArrayHorarios;
        }
    }
    if (JsonHorarios.length > 0) {
        var _obj = OrdenarJson(JsonHorarios);
        var ArrayHorario_ = UnificarJson(_obj);
        DibujarTbodyTablaHorarioLaboralFucionados(ArrayHorario_);//no funciona aun
    }
}
function SortByID(x, y) {
    return x.ID - y.ID;
}
function SortByName(x, y) {
    return ((x.Name == y.Name) ? 0 : ((x.Name > y.Name) ? 1 : -1));
}
function DibujarTbodyTablaHorarioLaboralFucionados(DataHorarios) {
    var html = '';
    for (var i = 0; i < DataHorarios.length; i++) {
        html += '<tr>';
        html += '<td style="width:15%;text-align:left;">' + DataHorarios[i].HoraInicio + ' - ' + DataHorarios[i].HoraFinal + '</td>';
        html += '<td style="width:15%;text-align:webkit-auto;text-align:left">' + crearHTML_tdcontenido(DataHorarios[i].Lunes) + '</td>';
        html += '<td style="width:15%;text-align:webkit-auto;text-align:left">' + crearHTML_tdcontenido(DataHorarios[i].Martes) + '</td>';
        html += '<td style="width:15%;text-align:webkit-auto;text-align:left">' + crearHTML_tdcontenido(DataHorarios[i].Miercoles) + '</td>';
        html += '<td style="width:15%;text-align:webkit-auto;text-align:left">' + crearHTML_tdcontenido(DataHorarios[i].Jueves) + '</td>';
        html += '<td style="width:15%;text-align:webkit-auto;text-align:left">' + crearHTML_tdcontenido(DataHorarios[i].Viernes) + '</td>';
        html += '<td style="width:15%;text-align:webkit-auto;text-align:left">' + crearHTML_tdcontenido(DataHorarios[i].Sabado) + '</td>';
        html += '</tr>';
    }
    $('#table_Crearhorario tbody').append(html);
    //$('#btnGuardarHorario').hide();
}
function Colocar_NombreHorario(Horario, Nombre) {
    /// <summary>cuando es true en alguna propiedad se coloca el nombre del horario de lo contrario false</summary>
    var ObjetoHora = { "HoraInicio": 0, "HoraFinal": 0, "Lunes": "", "Martes": "", "Miercoles": "", "Jueves": "", "Viernes": "", "Sabado": "" };
    ObjetoHora.HoraInicio = Horario.HoraInicio;
    ObjetoHora.HoraFinal = Horario.HoraFinal;
    ObjetoHora.Lunes = (Horario.Lunes == true) ? Nombre : false;
    ObjetoHora.Martes = (Horario.Martes == true) ? Nombre : false;
    ObjetoHora.Miercoles = (Horario.Miercoles == true) ? Nombre : false;
    ObjetoHora.Jueves = (Horario.Jueves == true) ? Nombre : false;
    ObjetoHora.Viernes = (Horario.Viernes == true) ? Nombre : false;
    ObjetoHora.Sabado = (Horario.Sabado == true) ? Nombre : false;
    return ObjetoHora;
}
function crearHTML_tdcontenido(data) {
    var html = '';
    var srt = String(data).search(":");
    if (srt != -1) {
        var Temp = String(data).replace(/false|0/g, " ").split(':');

        var icono = '<span class="glyphicon glyphicon-alert" aria-hidden="true" style="margin-left:5px; margin-right: 2px;"></span>';
        var colorText = 'style="color: white;"';
        if (Temp[0].length > 2 && Temp[1].length > 2)
            html += '<div class="bg-red-active color-palette" style="border-radius:5px;">';
        else {
            html += '<div>';
            icono = "";
            colorText = "";
        }
        for (var t = 0; t < Temp.length; t++) {
            if (Temp[t] != "" && Temp[t].length > 2)
                html += icono + ' <span ' + colorText + '>' + Temp[t] + '</span><br/>';
        }
        html += '</div>';
    }
    else {
        html += '<div>';
        html += String(data).replace(/false|0/g, " ");
        html += '</div>';
    }
    return html;
}
//ver horario en seccion estudiantes
var _Horarios;
function buscoHorarios(data) {
    var m = $.parseJSON(data.d);
    var l = m.length;
    if (m[0].DesactivarUsuarioPorPeriodo == 1) {
        dataHorarioxUsuario(data);
    }
    else if (m[0].DesactivarUsuarioPorPeriodo == 0) {
        $('#HorObs').html(m[0].Observaciones);
        _Horarios = $.parseJSON(m[0].Horario);
        var parameters = { "idSubnivel": m[0].idSubnivel };
        jQueryAjaxCallback("../Shared/Utility.aspx/CargarHorarioStu", JSON.stringify(parameters), "POST", "json", buscoHorarioDiurno);
    }
}



function completarAsignaturasDefault(ObjAsignaturas) {
    ObjAsignaturas.push({
        "id": -10,
        "idNivel": -10,
        "idEscuela": -10,
        "idAsignaturaPrerrequisito": -10,
        "Nombre": "RECREO",
        "Descripcion": "RECREO",
        "Activo": true,
        "idTipoMetodologia": 0
    })

    ObjAsignaturas.push({
        "id": -11,
        "idNivel": -11,
        "idEscuela": -11,
        "idAsignaturaPrerrequisito": -11,
        "Nombre": "HORA LIBRE",
        "Descripcion": "HORA LIBRE",
        "Activo": true,
        "idTipoMetodologia": 0
    })

    ObjAsignaturas.push({
        "id": -12,
        "idNivel": -12,
        "idEscuela": -12,
        "idAsignaturaPrerrequisito": -12,
        "Nombre": "ACTO CÍVICO",
        "Descripcion": "ACTO CÍVICO",
        "Activo": true,
        "idTipoMetodologia": 0
    })
    ObjAsignaturas.push({
        "id": -13,
        "idNivel": -13,
        "idEscuela": -13,
        "idAsignaturaPrerrequisito": -13,
        "Nombre": "DEVOCIONAL",
        "Descripcion": "DEVOCIONAL",
        "Activo": true,
        "idTipoMetodologia": 0
    })
    ObjAsignaturas.push({
        "id": -14,
        "idNivel": -14,
        "idEscuela": -14,
        "idAsignaturaPrerrequisito": -14,
        "Nombre": "CONSEJERÍA",
        "Descripcion": "CONSEJERÍA",
        "Activo": true,
        "idTipoMetodologia": 0
    })
    ObjAsignaturas.push({
        "id": -15,
        "idNivel": -15,
        "idEscuela": -15,
        "idAsignaturaPrerrequisito": -15,
        "Nombre": "CAPILLA",
        "Descripcion": "CAPILLA",
        "Activo": true,
        "idTipoMetodologia": 0
    })

    ObjAsignaturas.push({
        "id": -16,
        "idNivel": -16,
        "idEscuela": -16,
        "idAsignaturaPrerrequisito": -16,
        "Nombre": "MISA",
        "Descripcion": "MISA",
        "Activo": true,
        "idTipoMetodologia": 0
    })
    ObjAsignaturas.push({
        "id": -17,
        "idNivel": -17,
        "idEscuela": -17,
        "idAsignaturaPrerrequisito": -17,
        "Nombre": "REFORZAMIENTO",
        "Descripcion": "REFORZAMIENTO",
        "Activo": true,
        "idTipoMetodologia": 0
    })
    ObjAsignaturas.push({
        "id": -18,
        "idNivel": -18,
        "idEscuela": -18,
        "idAsignaturaPrerrequisito": -18,
        "Nombre": "INGLÉS",
        "Descripcion": "INGLÉS",
        "Activo": true,
        "idTipoMetodologia": 0
    })

    return ObjAsignaturas
}



function buscoHorarioDiurno(data) {
    ObjAsignaturas = [];
    //var Data = JSON.parse(data.d);
    var Data = $.parseJSON(data.d);
    $('#table_horario tbody').empty();
    ObjAsignaturas = Data;
    ObjAsignaturas = completarAsignaturasDefault(ObjAsignaturas)

    if (Data.Horario != "") {
        DibujarHorarioDiurnoEstudiante(_Horarios);
    }
    else {
        $('#div_imprimir').hide();
        $('#div_alert').show();
    }
}
function ObtenerJSONHORARIOSxUSUARIOStu(idUsuario, idSubnivel) {
    $('#table_Crearhorario tbody').empty();
    $('#HorObs').html('');
    var parameters = { "idUsuario": idUsuario, "idSubNivel": idSubnivel };
    jQueryAjaxCallback("../Shared/Utility.aspx/ObtenerJSONHORARIOSxUSUARIOStu", JSON.stringify(parameters), "POST", "json", buscoHorarios);
}
function printDivHorario() {
    var html = $('#divHor').html();
    var newWin = window.open('', 'Print-Academica');
    var logo = $('#img_logo_colegio').attr('src');
    var body = '<div style="text-align:left;"><img src="' + logo + '" style="height:100px;width:100px;float: left;"></div><div style="font-weight: bolder;text-align:center;">' + $("#lbl_colegio").text() + '</div>';
    body += '<p style="text-align:center;font-weight: bolder;">Horario </p>';
    //body += '<p style="text-align:center;font-weight: bolder;">Grupo ' + $("#Grupo").val() + '</p>';
    console.log(body);
    newWin.document.open();
    newWin.document.write('<html><body onload="window.print()">' + body + html + '</body></html>');
    newWin.document.close();
    setTimeout(function () { newWin.close(); }, 10);
}