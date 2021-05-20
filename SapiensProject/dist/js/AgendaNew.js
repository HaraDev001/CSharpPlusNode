function _Dibujar_Agenda(ArrayHorarios) {//vertical 
    var html = '', cierrepanel = '', name = '', TipoActividad = '', Materia = '', Docente = '', TipoNota = '', titulo = '', contenido = '', adjunto = '';
    console.log('g ' + ArrayHorarios[0].Actividades)
    $('#Grupo').val(ArrayHorarios[0].Actividades[0].NombreSubnivel);
        for (var d = 0; d < ArrayHorarios.length; d++) {
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
                //TipoActividad = '<strong>' + traducir('Tipo_de_Actividad') + ':</strong> ' + ArrayHorarios[d].Actividades[i].TipoActividad + '<br>';
                if (ArrayHorarios[d].Actividades[i].idTask > 0)
                    TipoActividad = '';
                else
                TipoActividad = '<strong>Tipo de Actividad:</strong> ' + ArrayHorarios[d].Actividades[i].TipoActividad + '<br>';
                //Tipo de Nota
                //Materia
                Materia = '<strong>Materia: </strong>' + ArrayHorarios[d].Actividades[i].NombreSubnivel + ' '+ArrayHorarios[d].Actividades[i].NombreAsignatura + '<br>';
                //Docente
                Docente = '<strong>Docente:</strong> ' + ArrayHorarios[d].Actividades[i].Educador + '<br>';
                //Titulo
                titulo = '<strong>Tema:</strong> ' + ArrayHorarios[d].Actividades[i].NombreActividad + '<br>';
                //Contenido
                contenido = '<strong>Contenido:</strong> ' + ArrayHorarios[d].Actividades[i].description + '<br>';
                //Cierre de panel
                cierrepanel = '</address>';
                //Adjunto
                //adjunto = '<div id=' + divAttach + '></div>';
                ///////////////inicio archivo
                var htmlArchivo = '';
                var adjunto_json = ArrayHorarios[d].Actividades[i].ArchivoAdjunto;
                if (adjunto_json.trim().length >1) {                                       
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
                    html += '<span style="font-size: 15px;"><strong>Evento: </strong>' + ArrayHorarios[d].Actividades[i].NombreActividad + '<span>' + cierrepanel;
                }
                //Aula Virtual y otros Accessos
                if (ArrayHorarios[d].Actividades[i].idTask > 0) {
                    if (ArrayHorarios[d].Actividades[i].EsConFechaEntrega == 1)
                        var fl = '<strong><i class="fa fa-bell text-red"><i> Fecha Limite de Entrega:' + ArrayHorarios[d].Actividades[i].Fecha_Entrega + '</i></i></strong>';
                    else
                        var fl = '';
                    html += '<a class="text-aqua" target="_blank" style="font-weight:bold;text-decoration: underline;" href="Auladetalle?y_=' + ArrayHorarios[d].Actividades[i].idTask + '&idU=' + ArrayHorarios[d].Actividades[i].idUsuarioAlumno +'"><i class="fa fa-caret-square-o-right fa-2x"></i>  Ver Actividad en el Classroom</a><br>' + fl;
                }
                //Fecha de Registro
                html += '<p><small>Fecha de Registro:  ' + ArrayHorarios[d].Actividades[i].FechaRegistro + '</small></p></div>';
                if (ArrayHorarios[d].Actividades.length > 1) {
                    html += '<hr style="margin: 10px 0 0px;">';
                }
                html += '</div>';
            }
        }
        $('#div_Agenda').html(html);
    win.hidePleaseWait();
}