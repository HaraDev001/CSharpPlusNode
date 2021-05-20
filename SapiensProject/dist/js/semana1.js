function semanasPeriodo(periodo) {
    var semanas = []
    var semanat = undefined
    actual = moment(periodo.inicio).toDate()
    final = moment(periodo.final).toDate()
    var timefinal = final.getTime()
    while (actual.getTime() <= final.getTime()) {
        semanat = semana(actual)
        semanas.push(semanat)
        actual = moment(actual).add(7, 'days').toDate()
    }
    return semanas
}
function llenarTablaPlanificacion(periodo, profesores, data) {
    var semanas = semanasPeriodo(periodo);
    //asignamos a cada profesor su propio arreglo de semanas
    profesores.forEach(function (elem) {
        elem.semanas = JSON.parse(JSON.stringify(semanas));
    })
    //verificamos si hay data para cada semana de cada profesor
    profesores.forEach(function (profesor) {
        profesor.semanas.forEach(function (semanat) {
            var id = profesor.idUsuario;
            var inicioSemana = moment(semanat.startDate).format("YYYY-MM-DD");
            var dataHallada;
            var hallado = data.find(function (elem) {
                var hallado = elem.idUsuario == id && elem.inicioSemana.localeCompare(inicioSemana) == 0
                if (hallado) {
                    dataHallada = elem
                }
                return hallado
            });
            semanat.dataHallada = dataHallada
            if (hallado != undefined) {
                semanat.mostrar = true;
            }
            else {
                semanat.mostrar = false;
            }
        })
    })
    var tabla = ""
    var thead = ""
    //armamos html para cabecera de la tabla, que depende de las semanas del periodo
    thead += "<tr>"
    thead += "<th>" + "Docente" + "</th>"
    semanas.forEach(function (semanat) {
        var inicioSemana = moment(semanat.startDate).format("YYYY-MM-DD")
        var date = moment(inicioSemana).toDate()
        thead += "<th>" + semanaString(date) + "</th>"
    })
    //armamos html para el cuerpo de la tabla
    var countProf = 0;
    profesores.forEach(function (profesor) {      
        tabla += "<tr>"
        tabla += "<td style='text-align:left;font-size:12px;padding-top:3px; min-width:200px;'>" + (countProf + 1) + '. ' + profesor.NombreCompleto + "</td>"
        profesor.semanas.forEach(function (semana) {
            var onclick = ''
            var id = profesor.idUsuario;        
            if (semana.mostrar) {
                valor = semana.dataHallada.registros
                var inicioSemana = semana.dataHallada.inicioSemana;
                onclick = " class='alert-success' onClick='LoadReportePlaneamientoDetalle(" + id + ", \"" + inicioSemana + "\")'"
            }
            else {
                valor = "0"
                onclick = " class= 'alert-danger'"
            }
            tabla += "<td style='text-align:center;cursor:pointer;' " + onclick + " > "+ valor + " </td>"
        })
        countProf++;
    })
    $('#TablePromedio tbody').html(tabla)
    $('#TablePromedio thead').html(thead);   
}
