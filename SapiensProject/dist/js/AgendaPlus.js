function _Dibujar_Agenda(ArrayHorarios) {//vertical
    console.log('iniciando _Dibujar_Agenda....');
    $('#div_table').hide();
    $('#div_Agenda').show();
    $('#div_Agenda').empty();
    var html = '', cierrepanel = '', name = '', TipoActividad = '', Materia = '', Docente = '', TipoNota = '', titulo = '', contenido = '', adjunto = '';
    if (ArrayHorarios.length == 0) {
        for (var i = 1; i < 6; i++) {
            name = moment($('#fechaStart').val()).day(i).format('dddd DD');
            html += '</div>';
            html += '<div class="box-body" style="padding: 5px 0;"><div class="invoice-details row no-margin" style="font-size: 25px;text-align: center;background-color:#FF9F43;"><div class="col-md-12"><i class="fa fa-clock-o"></i><b> ' + name + '</b></div></div></div>';
            html += '<div class="box-body" style="padding: 5px 0;">';
            html += '<div class="box-body" style="padding: 5px 0;">';
            html += ' <address><strong style="color:#e39a19" data-i18n="header.t29">Los docentes no han registrado actividad para este día.</strong></address>';
            html += '</div>';
        }
        $('#div_Agenda').html(html);
    }
    else {
        console.log(ArrayHorarios)
        console.log(ArrayHorarios[0].Actividades[0])
        console.log(ArrayHorarios[0].Actividades[0].NombreSubnivel)
        $('#Grupo').val(ArrayHorarios[0].Actividades[0].NombreSubnivel);
        for (var d = 0; d < ArrayHorarios.length; d++) {
            console.log(d);
            if (d > 0)
                html += '</div>';
            name = moment(ArrayHorarios[d].dia).format('dddd D');
            html += '<div class="box-body" style="padding: 5px 0;word-wrap: break-word;"><div class="invoice-details row no-margin" style="font-size: 25px;text-align: center;background-color:#FF9F43;"><div class="col-md-12"><i class="fa fa-clock-o"></i><b> ' + name + '</b></div></div></div>';
            $('#div_Agenda').append(html);
            for (var i = 0; i < ArrayHorarios[d].Actividades.length; i++) {
                var idtipoEvento = ArrayHorarios[d].Actividades[i].idtipoEvento;
                htmlTN = '';
                var divAttach = 'div_att' + ArrayHorarios[d].Actividades[i].id;
                if (ArrayHorarios[d].Actividades[i].TipoNota != 'Formativa')
                    TipoNota = '<strong class="text-blue">' + ArrayHorarios[d].Actividades[i].TipoNota + '</strong> (' + name + ')<br/>';
                else
                    TipoNota = '<strong class="text-yellow">' + ArrayHorarios[d].Actividades[i].TipoNota + '</strong> (' + name + ')<br/>';

                //Inicio de Panel
                html += '<div class="box-body" style="padding: 5px 0;word-wrap: break-word;"><div class="col-sm-12 invoice-col"><address>';
                //Tipo de Actividad
                TipoActividad = '<strong data-i18n="header.t34">Tipo de Actividad:</strong> ' + ArrayHorarios[d].Actividades[i].TipoActividad + '<br>';
                //Tipo de Nota
                //Materia
                Materia = '<strong data-i18n="header.t33">Materia: </strong>' + ArrayHorarios[d].Actividades[i].NombreSubnivel + ' ' + ArrayHorarios[d].Actividades[i].NombreAsignatura + '<br>';
                //Docente
                Docente = '<strong data-i18n="header.t32">Docente:</strong> ' + ArrayHorarios[d].Actividades[i].Educador + '<br>';
                //Titulo
                titulo = '<strong data-i18n="header.t31">Tema:</strong> ' + ArrayHorarios[d].Actividades[i].NombreActividad + '<br>';
                //Contenido
                contenido = '<strong data-i18n="header.t30">Contenido:</strong> ' + ArrayHorarios[d].Actividades[i].description + '<br>';
                //Cierre de panel
                cierrepanel = '</address>';
                //Adjunto
                //adjunto = '<div id=' + divAttach + '></div>';
                ///////////////inicio archivo
                var htmlArchivo = '';
                var adjunto_json = ArrayHorarios[d].Actividades[i].ArchivoAdjunto;
                if (adjunto_json.trim().length > 1) {
                    var a = jQuery.parseJSON(adjunto_json)
                    var leng_a = a.length;
                    var cont_a = 0;
                    if (leng_a > 0) {
                        while (cont_a < leng_a) {
                            htmlArchivo += ConstruirAttachCss(a[cont_a].archivo, 1);
                            cont_a++;
                        }
                    }
                }
                adjunto = htmlArchivo;
                ///////fin comentario
                //Algoritmo de armar la agenda
                if (idtipoEvento == 1) {
                    html += TipoActividad + TipoNota + Materia + Docente + titulo + contenido + adjunto + cierrepanel;
                }
                else if (idtipoEvento == 2) {
                    html += '<span style="font-size: 15px;"><strong data-i18n="header.t37">Evento: </strong>' + ArrayHorarios[d].Actividades[i].NombreActividad + '<span>' + cierrepanel;
                }
                //Aula Virtual y otros Accessos
                if (ArrayHorarios[d].Actividades[i].EsConFechaEntrega == 1)
                    var fl = '<strong><i class="fa fa-bell text-red"><i> <span data-i18n="header.t35">Fecha Limite de Entrega</span>:' + ArrayHorarios[d].Actividades[i].Fecha_Entrega + '</i></i></strong>';
                else
                    var fl = '';
                if (ArrayHorarios[d].Actividades[i].idTask > 0) {
                    html += '<a class="text-aqua" target="_blank" style="font-weight:bold;text-decoration: underline;" href="Auladetalle?y_=' + ArrayHorarios[d].Actividades[i].idTask + '"><i class="fa fa-caret-square-o-right fa-2x"></i>  Ver Actividad en el Classroom</a><br>' + fl;
                }
                //Fecha de Registro
                //Fecha de Registro
                html += '<p><small><span data-i18n="header.t35">Fecha de Registro</span>:  ' + ArrayHorarios[d].Actividades[i].FechaRegistro + '</small></p></div>';
                if (ArrayHorarios[d].Actividades.length > 1) {
                    html += '<hr style="margin: 10px 0 0px;">';
                }
                html += '</div>';
                //fileLeer(ArrayHorarios[d].Actividades[i].ArchivoAdjunto, divAttach, true);
            }
        }
        $('#div_Agenda').html(html);
    }
    win.hidePleaseWait();
}