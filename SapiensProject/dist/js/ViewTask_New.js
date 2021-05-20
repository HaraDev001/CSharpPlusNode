function CargarBlog(data) {
    if (data.d == "") {
        console.log('salir vacio');
        $('.no-results').show();
        return;
    }
    $('.no-results').hide();
    console.log(data)
    $('#div_registros').show();
    var m = $.parseJSON(data.d);
    var counter = 0, co = 0;
    var btn_Calificar = '', href = '', _descComent = '', _html = '', btn_editar = '', btn_eliminar = '';
    var arrayLength = m.length;
    var idTarea = 0
    var idSubnivel = $('#idSubnivel').val()
    while (counter < arrayLength) {
        idTarea = m[counter].idTask
        htmlArchivo = '', href = '';
        btn_Calificar = '';
        var estatus = '';
        _divAttach = 'div_att' + idTarea;
        var paginaDestino = ''
        if (m[counter].Tipo == 1) {
            paginaDestino = 'Auladetalle'
        }
        if (m[counter].Tipo == 2) {
            paginaDestino = 'Preguntas'
            if (idRolA == 5) {
                paginaDestino = 'Quiz'
            }
        }
        else if (m[counter].Tipo == 3) {
            paginaDestino = 'Auladetalle'
        }
        if (idRolA != 5) {
            href = ' target="_blank" href="' + paginaDestino + '?y_=' + idTarea + '&s_=' + idSubnivel + '"';
            btn_editar = '<li><a href="#" class="dropdown-item"   onclick= "EditarTask(' + idTarea + ');"><i class="fa fa-edit (alias)"></i> Editar</a></li>';
            if (m[counter].Tipo == 3)
                btn_Calificar = '<li><a ' + href + ' class="dropdown-item"><i class="fa fa-search"></i> Ver Material</a></li>';
            else
                btn_Calificar = '<li><a ' + href + ' class="dropdown-item"><i class="fa fa-search"></i> Calificar</a></li>';
            btn_eliminar = '<li><a href="#" class="dropdown-item" onclick=EliminarTask(' + idTarea + ');><i class="fa fa-trash"></i> Eliminar</a></li>';
        }
        else if (idRolA == 5) {
            href = ' target="_blank"href="' + paginaDestino + '?y_=' + idTarea + '&idU=' + $('#idUsuario').val() + '"';
            $('#div_instrucciones').hide();
            if (m[counter].idTipoTask == 1) {
                if (m[counter].Nota > 0) {
                    estatus = '<span style="color:#137333;font-weight: bold;font-size: 11.5px;">Tarea calificada</span>';
                }
                else if (m[counter].Entregado == 1) {
                    estatus = '<span style="color: #137333;font-weight: bold;font-size: 11.5px;""><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 15" width="16" height="15"><path fill="currentColor" d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.879a.32.32 0 0 1-.484.033l-.358-.325a.319.319 0 0 0-.484.032l-.378.483a.418.418 0 0 0 .036.541l1.32 1.266c.143.14.361.125.484-.033l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.879a.32.32 0 0 1-.484.033L1.891 7.769a.366.366 0 0 0-.515.006l-.423.433a.364.364 0 0 0 .006.514l3.258 3.185c.143.14.361.125.484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z"></path></svg> Tarea entregada</span>';
                }
                else if (m[counter].Entregado == 0) {
                    estatus = '<span style="color: red;font-weight: bold;font-size: 11.5px;""> Tarea no entregada</span>';
                }
                btn_editar = '<li><a ' + href + ' class="dropdown-item"><i class="fa fa-download"></i> Subir Tarea</a></li>';
            }
            else if (m[counter].idTipoTask == 3) {
                btn_editar = '<li><a ' + href + ' class="dropdown-item"><i class="fa fa-search"></i> Ver Material</a></li>';
            }
        }
        if (m[counter].array != undefined) {
            co = m[counter].array;
            _descComent = ' | <svg width="24" height="24" viewBox="0 0 24 24" focusable="false" class=" NMm5M"><path d="M18 14V6h-5v8l2.5-1.5z"></path><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H4V4h16v12z"></path></svg>' + ' '+co.length;
        }
        else
            _descComent = ' ';
        if (m[counter].idTipoTask == 1) {
            var TipoNotaDiv = '<p style="font-size: .85rem;line-height: 0px;margin - top: 0;" class="description"> <b>Evaluación:</b> ' + m[counter].TipoNota + '</p>';
            var icono = ReturnIcono(1);
            if (m[counter].EsConFechaEntrega == 1) {
                var FechaEntrega = '<span style="font-size: .85rem;" class="description"><p> <b>Fecha límite:</b> ' + moment(m[counter].Fecha_Entrega).format("D MMM h:mm a") + _descComent+'</p></span>';
            }
            else if (m[counter].EsConFechaEntrega == 0) {
                var FechaEntrega = '<span style="font-size: .85rem;" class="description"><p> <b>Fecha límite:</b> Sin fecha límite ' + _descComent+'</p></span>';
            }
        }
        else if (m[counter].idTipoTask == 3) {
            var icono = ReturnIcono(3);
            var FechaEntrega = '<span class="description" style="font-size: .85rem;"><p> <b>Fecha en Agenda:</b> ' + moment(m[counter].Fecha_Entrega).format("D MMM h:mm a") + _descComent+'</p></span>';
            var TipoNotaDiv = '<p class="description" style="font-size: .85rem;line-height: 0px;margin-top: 0;"> Material de Clases</p>'
        }
        else if (m[counter].idTipoTask == 2) {
            var icono = ReturnIcono(2);
            var FechaEntrega = '<span class="description" style="font-size: .85rem;"><p> <b>Fecha de Inicio:</b> ' + moment(m[counter].Fecha_Agenda).format('D MMM h:mm a') + _descComent + '</p></span>';
            var TipoNotaDiv = '<p class="description" style="font-size: .85rem;line-height: 0px;margin-top: 0;"> Examen en Linea</p>'
        }
        var right = '<button type="button" style="padding: inherit;" class="btn btn-box-tool" data-toggle="dropdown" aria-expanded="false"> ' +
            '<svg viewBox="0 0 24 24" focusable="false" width="24" height="24" class=" NMm5M"><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path></svg>' +
            '</button>' +
            '<ul class="dropdown-menu">' +
            '<li><a href="#" class="dropdown-item" onclick="PrintTask(' + idTarea + ');"><i class="fa fa-print"></i> Imprimir (.Pdf)</a></li>' +
            btn_editar + btn_Calificar + btn_eliminar +
            '</ul>';
        if (idRolA == 5)
            right = '';
        _html = '<li class="media read" style="padding-left: 9px;padding-bottom: inherit;">' +
            '<div class="todo-title-area d-flex align-items-center" ><a ' + href + '>' + icono +
            '</a></div>' +
            '<div class="media-body"><a ' + href + '>' +
            '<div class="user-details">' +
            '<div class="mail-items">' +
            '<span style="font-size:13px;" class="list-group-item-heading text-bold-600 mb-25">' + m[counter].Tema + '</span>' +
            '<span class="list-group-item-text text-truncate" style="font-size:13px;">' + FechaEntrega + TipoNotaDiv+'</span>' +
            '</div>' +
            '<div class="mail-meta-item">' +
            '<span class="float-right">' +
            '<span class="mail-date" style="font-size: 80%;" id="rig_' + counter + '"></span>' +
            '</span>' +
            '</div>' +
            '</div>' +
            '</a>'+
            '</div>' +
            '</li>';

        $('#table1').append(_html);
        $('#rig_' + counter).html(estatus+right);
        counter++;
    }
}
function ReturnIcono(id) {
    var html = '';
    if (id == 1)
        html = '<div class=""><div style="color: #fff;cursor: default;flex-shrink: 0;height: 2.5rem;line-height: 0;margin-right:1rem;width: 2.5rem;fill: #fff;background-color: #1e8e3e;display: flex;justify-content: center;align-items: center;border-radius: 50%;width: 50px;height: 50px;float: left;"><svg viewBox="0 0 24 24" focusable="false" width="30" height="30" class=" NMm5M hhikbc"><path d="M7 15h7v2H7zm0-4h10v2H7zm0-4h10v2H7z"></path><path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-.14 0-.27.01-.4.04a2.008 2.008 0 0 0-1.44 1.19c-.1.23-.16.49-.16.77v14c0 .27.06.54.16.78s.25.45.43.64c.27.27.62.47 1.01.55.13.02.26.03.4.03h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7-.25c.41 0 .75.34.75.75s-.34.75-.75.75-.75-.34-.75-.75.34-.75.75-.75zM19 19H5V5h14v14z"></path></svg></div></div>';
    else if (id == 2)
        html = '<div class=""><div style="color: #fff;cursor: default;flex-shrink: 0;height: 2.5rem;line-height: 0;margin-right:1rem;width: 2.5rem;fill: #fff;background-color: #1e8e3e;display: flex;justify-content: center;align-items: center;border-radius: 50%;width: 50px;height: 50px;float: left;"><svg focusable="false" width="24" height="24" viewBox="0 0 24 24" class=" NMm5M hhikbc"><path d="M19 2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h4l3 3 3-3h4c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 16H5V4h14v14z"></path><path d="M11 15h2v2h-2zm1-8c1.1 0 2 .9 2 2 0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4S8 6.79 8 9h2c0-1.1.9-2 2-2z"></path></svg></div></div>';
    else if (id == 3)
        html = '<div class=""><div style="color: #fff;cursor: default;flex-shrink: 0;height: 2.5rem;line-height: 0;margin-right:1rem;width: 2.5rem;fill: #fff;background-color: #1d3095;display: flex;justify-content: center;align-items: center;border-radius: 50%;width: 50px;height: 50px;float: left;"><svg focusable="false" width="30" height="30" viewBox="0 0 24 24" class=" NMm5M"><path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 18H6V4h2v8l2.5-1.5L13 12V4h5v16z"></path></svg></div></div>';

    return html
}