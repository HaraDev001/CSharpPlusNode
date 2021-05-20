using System;

/// <summary>
/// Summary description for CalendarEvent
/// </summary>
public class CalendarEvent
{
    public int idCategoriaPorcentaje { get; set; }
    public int id { get; set; }
    public int idTask { get; set; }
    public int idtipoEvento { get; set; }
    public int EsConFechaEntrega  { get; set; }
    public int SubTipoNota { get; set; }
    public int idSubNivel { get; set; }
    public int idAsignatura { get; set; }
    public string Fi { get; set; }
    public string NombreAsignatura { get; set; }
    public string Fecha_Entrega { get; set; }
    public int idUsuario { get; set; }
    public int AnioLectivo { get; set; }
    public int idTipoActividad { get; set; }
    public string NombreTipoActividad { get; set; }
    public string color { get; set; }
    public string NombreActividad { get; set; }
    public string DescripcionActividad { get; set; }
    public string TipoNota { get; set; }
    public string FechaRegistro { get; set; }
    public DateTime FechaInicioActividad { get; set; }
    public DateTime FechaFinActividad { get; set; }
    public bool oBloqueoAgenda { get; set; }
    public string NombreSubnivel { get; set; }
    public string Educador { get; set; }
    public int CantidadSumativa { get; set; }
    public int TipoEscala { get; set; }
    public int idRubrica { get; set; }
    public int puntos { get; set; }
    public int porcentajeA { get; set; }
    public string ArchivoAdjunto { get; set; }
}
