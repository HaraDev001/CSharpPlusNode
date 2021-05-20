function Re_Ordenar_HorariosxDia(ArrayHorario) {
    var ObjHorario = [];    
    for (var i = 0; i < ArrayHorario.length; i++) {      
        if (ObjHorario.map(function (e) { return e.dia; }).indexOf(ArrayHorario[i].Fi) == -1) {
            ObjHorario.push({
                'dia': ArrayHorario[i].Fi,
                'Actividades': []
            });
        }
    }
    for (var i = 0; i < ArrayHorario.length; i++) {
        var indice = ObjHorario.map(function (e) { return e.dia; }).indexOf(ArrayHorario[i].Fi);
        if (indice != -1) {
            var _horario = new Horario(ArrayHorario[i].id,
                ArrayHorario[i].idTask,
                ArrayHorario[i].NombreAsignatura,
                ArrayHorario[i].idtipoEvento,
                ArrayHorario[i].NombreActividad,
                ArrayHorario[i].Fi,
                ArrayHorario[i].Fi,
                ArrayHorario[i].TipoNota,
                ArrayHorario[i].description,
                ArrayHorario[i].Educador,
                ArrayHorario[i].NombreTipoActividad,
                ArrayHorario[i].AgendaDiaBloqueo,
                ArrayHorario[i].AgendaHoraBloqueo,
                ArrayHorario[i].ArchivoAdjunto,
                ArrayHorario[i].NombreSubnivel,
                ArrayHorario[i].FechaRegistro,
                ArrayHorario[i].EsConFechaEntrega,
                ArrayHorario[i].Fecha_Entrega,
                ArrayHorario[i].idUsuarioAlumno
            );
            ObjHorario[indice].Actividades.push(_horario);
        }
    }
    return ObjHorario;
}
function Horario(id, idTask, NombreAsignatura, idtipoEvento, NombreActividad, FechaInicioActividad,Fi, TipoNota, description, Educador, TipoActividad, AgendaDiaBloqueo, AgendaHoraBloqueo, ArchivoAdjunto, NombreSubnivel, FechaRegistro, EsConFechaEntrega, Fecha_Entrega, idUsuarioAlumno) {
    this.id = id;
    this.idTask = idTask;
    this.NombreAsignatura = NombreAsignatura;
    this.idtipoEvento = idtipoEvento;
    this.NombreActividad = NombreActividad;
    this.FechaInicioActividad = FechaInicioActividad;
    this.Fi = Fi;
    this.TipoNota = TipoNota;
    this.description = description;
    this.Educador = Educador;
    this.TipoActividad = TipoActividad;
    this.AgendaDiaBloqueo = AgendaDiaBloqueo;
    this.AgendaHoraBloqueo = AgendaHoraBloqueo;
    this.ArchivoAdjunto = ArchivoAdjunto;
    this.NombreSubnivel = NombreSubnivel;
    this.FechaRegistro = FechaRegistro;
    this.EsConFechaEntrega = EsConFechaEntrega;
    this.Fecha_Entrega = Fecha_Entrega;
    this.idUsuarioAlumno = idUsuarioAlumno;
}