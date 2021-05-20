using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;

namespace SapiensProject.Models.Entities
{
    public class Agenda
    {
        Connection cnn;
        //this method retrieves all events within range start-end
        
        public string getEventsMejoradaEstudiante(int idUsuario, int idEscuela, DateTime fechaInicioActividad, DateTime FechaFinActividad, DateTime FechaUsuario)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.Add(new SqlParameter("@idUsuario", idUsuario));            
            parList.Add(new SqlParameter("@FechaInicioActividad", fechaInicioActividad));
            parList.Add(new SqlParameter("@FechaFinActividad", FechaFinActividad));
            parList.Add(new SqlParameter("@FechaUsuario", FechaUsuario));
            parList.Add(new SqlParameter("@idEscuela", idEscuela));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_SELECT_AGENDA_ESTUDIANTE_MEJORADA", parList));
        }
        public List<CalendarEvent> getEvents(int idUsuario, int idRol, int idEscuela, DateTime fechaInicioActividad, DateTime FechaFinActividad, int idSubNivel, DateTime FechaUsuario)
        {
            List<CalendarEvent> events = new List<CalendarEvent>();
            cnn = new Connection();
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.Add(new SqlParameter("@idUsuario", idUsuario));
            parList.Add(new SqlParameter("@idRol", idRol));
            parList.Add(new SqlParameter("@idEscuela", idEscuela));
            parList.Add(new SqlParameter("@FechaInicioActividad", fechaInicioActividad));
            parList.Add(new SqlParameter("@FechaFinActividad", FechaFinActividad));
            parList.Add(new SqlParameter("@idSubnivel", idSubNivel));
            parList.Add(new SqlParameter("@FechaUsuario", FechaUsuario));
            IDataReader datos = cnn.ExecuteReader("PRC_SELECT_AGENDA", parList);
            while (datos.Read())
            {
                CalendarEvent cevent = new CalendarEvent();
                cevent.oBloqueoAgenda = Convert.ToBoolean(datos["oBloqueoAgenda"]);
                cevent.id = (int)datos["id"];
                cevent.idTask = (int)datos["idTask"];
                cevent.idtipoEvento = (int)datos["idtipoEvento"];
                cevent.SubTipoNota = (int)datos["SubTipoNota"];
                cevent.idSubNivel = (int)datos["idSubNivel"];
                cevent.NombreSubnivel = (string)datos["NombreSubnivel"];
                cevent.idAsignatura = (int)datos["idAsignatura"];
                cevent.NombreAsignatura = (string)datos["NombreAsignatura"];
                cevent.idUsuario = (int)datos["idUsuario"];
                cevent.idTipoActividad = (int)datos["idTipoActividad"];
                cevent.NombreTipoActividad = (string)datos["NombreTipoActividad"];
                cevent.Educador = (string)datos["Educador"];
                cevent.NombreActividad = (string)datos["NombreActividad"];
                cevent.DescripcionActividad = (string)datos["DescripcionActividad"];
                cevent.ArchivoAdjunto = (string)datos["ArchivoAdjunto"];
                cevent.FechaInicioActividad = (DateTime)datos["FechaInicioActividad"];
                cevent.FechaFinActividad = (DateTime)datos["FechaFinActividad"];
                cevent.Fi = (string)datos["Fi"];
                cevent.TipoNota = (string)datos["TipoNota"];
                cevent.color = (string)datos["color"];
                cevent.FechaRegistro = (string)datos["FechaRegistro"];
                cevent.TipoEscala = (int)datos["TipoEscala"];
                cevent.idRubrica = (int)datos["idRubrica"];
                cevent.puntos = (int)(datos["puntos"]);
                cevent.porcentajeA = (int)datos["porcentajeA"];
                cevent.idCategoriaPorcentaje = (int)datos["idCategoriaPorcentaje"];
                cevent.EsConFechaEntrega = (int)datos["EsConFechaEntrega"];
                cevent.Fecha_Entrega = (string)datos["Fecha_Entrega"].ToString();
                events.Add(cevent);
            }
            return events;
        }
        public IDataReader obtenerFiltrosAgendaAdmin(int idEscuela, int idUsuario, int idRol)
        {
            cnn = new Connection();
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.Add(new SqlParameter("@idEscuela", idEscuela));
            parList.Add(new SqlParameter("@idUsuario", idUsuario));
            parList.Add(new SqlParameter("@idRol", idRol));
            return cnn.ExecuteReaderDataSet("PRC_SELECT_FILTROS_AGENDA_ADMIN", parList);
        }

        public string GetAgendaConfig(int idEscuela)
        {
            cnn = new Connection();
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.Add(new SqlParameter("@idEscuela", idEscuela));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_AGENDA_SELECT_CONFIGURACION", parList));
        }
        public string LeerConfiguracion(int idEscuela)
        {
            cnn = new Connection();
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.Add(new SqlParameter("@idEscuela", idEscuela));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_READ_CONFIGURACION", parList));
        }
        public string GuardarConfiguracion(int idEscuela, string configuracion)
        {
            cnn = new Connection();
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.Add(new SqlParameter("@idEscuela", idEscuela));
            parList.Add(new SqlParameter("@configuracion", configuracion));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_UPDATE_CONFIGURACION", parList));
        }
        public string GuardarConfAgenda(int idEscuela, int UsarBloqAg, int CantSum, int DiaBloqueo, string HoraBloqueo, int agenda_admin_tipo_nota, int agenda_admin_tipo_act, int agenda_admin_mensaje)
        {
            cnn = new Connection();
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.Add(new SqlParameter("@idEscuela", idEscuela));
            parList.Add(new SqlParameter("@UsarBloqAg", UsarBloqAg));
            parList.Add(new SqlParameter("@CantSum", CantSum));
            parList.Add(new SqlParameter("@DiaBloqueo", DiaBloqueo));
            parList.Add(new SqlParameter("@HoraBloqueo", HoraBloqueo));
            parList.Add(new SqlParameter("@agenda_admin_tipo_nota", agenda_admin_tipo_nota));
            parList.Add(new SqlParameter("@agenda_admin_tipo_act", agenda_admin_tipo_act));
            parList.Add(new SqlParameter("@agenda_admin_mensaje", agenda_admin_mensaje));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_AGENDA_CONFIGURACION", parList));
        }
       
            public string CargarDataRubro(int idEscuela, int idUsuario,int idAsignatura, int idSubnivel, int idPeriodo, int idRolA)
        {
            cnn = new Connection();
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.Add(new SqlParameter("@idEscuela", idEscuela));
            parList.Add(new SqlParameter("@idUsuario", idUsuario));
            parList.Add(new SqlParameter("@idAsignatura", idAsignatura));
            parList.Add(new SqlParameter("@idSubnivel", idSubnivel));
            parList.Add(new SqlParameter("@idPeriodo", idPeriodo));
            parList.Add(new SqlParameter("@idRolA", idRolA));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_SELECT_COMPARTIR_RUBROS_DATA", parList));
        }
        public string GuardarTipoNota(int idEscuela, int idAgenda, int TipoScala, int idRubrica)
        {
            cnn = new Connection();
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.Add(new SqlParameter("@idEscuela", idEscuela));
            parList.Add(new SqlParameter("@idAgenda", idAgenda));
            parList.Add(new SqlParameter("@TipoScala", TipoScala));
            parList.Add(new SqlParameter("@idRubrica", idRubrica));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_LIBRETA_GUARDAR_TIPONOTA_COLUMN", parList));
        }
        public string GuardarColumnNota(int idEscuela, int idAgenda, int puntos, string TipoNota, string NombreActividad, int TipoScala, int idRubrica, int idUsuario)
        {
            cnn = new Connection();
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.Add(new SqlParameter("@idEscuela", idEscuela));
            parList.Add(new SqlParameter("@idAgenda", idAgenda));
            parList.Add(new SqlParameter("@puntos", puntos));
            parList.Add(new SqlParameter("@TipoNota", TipoNota));
            parList.Add(new SqlParameter("@NombreActividad", NombreActividad));
            parList.Add(new SqlParameter("@TipoScala", TipoScala));
            parList.Add(new SqlParameter("@idRubrica", idRubrica));
            parList.Add(new SqlParameter("@idUsuario", idUsuario));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_LIBRETA_GUARDAR_COLUMN", parList));
        }
        public string CallNotasAlumno(int idEscuela, int idUsuario, int idPeriodo, int idAsignatura)
        {
            cnn = new Connection();
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.Add(new SqlParameter("@idEscuela", idEscuela));
            parList.Add(new SqlParameter("@idUsuario", idUsuario));
            parList.Add(new SqlParameter("@idPeriodo", idPeriodo));
            parList.Add(new SqlParameter("@idAsignatura", idAsignatura));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_STUDENT_SELECT_NOTAS", parList));
        }
        public string GetNotaCalculadaPuntos(int idTask, int Puntos)
        {
            cnn = new Connection();
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.Add(new SqlParameter("@idTask", idTask));
            parList.Add(new SqlParameter("@Puntos", Puntos));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_SELECT_CALCULO_NOTA_PUNTOS", parList));
        }
        public string DetalleAgenda(int idEscuela, int idAgenda)
        {
            cnn = new Connection();
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.Add(new SqlParameter("@idEscuela", idEscuela));
            parList.Add(new SqlParameter("@idAgenda", idAgenda));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_STUDENT_SELECT_IDAGENDA", parList));
        }
        public string GuardarBoleta(string Observacion, int idAlumno, int idDocente, string tipoBoleta, string listaFaltas, DateTime fecha, DateTime FechaRegistro)
        {
            cnn = new Connection();
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.Add(new SqlParameter("@Observacion", Observacion));
            parList.Add(new SqlParameter("@idAlumno", idAlumno));
            parList.Add(new SqlParameter("@idDocente", idDocente));
            parList.Add(new SqlParameter("@tipoBoleta", tipoBoleta));
            parList.Add(new SqlParameter("@listaFaltas", listaFaltas));
            parList.Add(new SqlParameter("@fecha", fecha));
            parList.Add(new SqlParameter("@FechaRegistro", FechaRegistro));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_BOLETA_INSERT", parList));
        }        
            public string GetTotalIngresos(int idUsuario)
        {
            cnn = new Connection();
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.Add(new SqlParameter("@idUsuario", idUsuario));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_USUARIO_SELECT_INGRESOS", parList));
        }        
           
        public string CallBoleta(int idEscuela,int idUsuario, int idRolA)
        {
            cnn = new Connection();
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.Add(new SqlParameter("@idEscuela", idEscuela));
            parList.Add(new SqlParameter("@idUsuario", idUsuario));
            parList.Add(new SqlParameter("@idRolA", idRolA));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_BOLETA_SELECT", parList));
        }
        public string updateEvent(DateTime Fecha,int idEscuela, CalendarEvent cevent, int idUsuario, int idModulo)
        {
            cnn = new Connection();
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.Add(new SqlParameter("@idEscuela", idEscuela));
            parList.Add(new SqlParameter("@idAgenda", cevent.id));
            parList.Add(new SqlParameter("@idSubNivel", cevent.idSubNivel));
            parList.Add(new SqlParameter("@idAsignatura", cevent.idAsignatura));
            parList.Add(new SqlParameter("@idTipoActividad", cevent.idTipoActividad));
            parList.Add(new SqlParameter("@NombreActividad", cevent.NombreActividad));
            parList.Add(new SqlParameter("@DescripcionActividad", cevent.DescripcionActividad));
            parList.Add(new SqlParameter("@TipoNota", cevent.TipoNota));
            parList.Add(new SqlParameter("@idUsuario", idUsuario));
            parList.Add(new SqlParameter("@FechaInicioActividad", cevent.FechaInicioActividad));
            parList.Add(new SqlParameter("@FechaFinActividad", cevent.FechaFinActividad));
            parList.Add(new SqlParameter("@idModulo", idModulo));
            parList.Add(new SqlParameter("@SubTipoNota", cevent.SubTipoNota));
            parList.Add(new SqlParameter("@TipoEscala", cevent.TipoEscala));
            parList.Add(new SqlParameter("@idRubrica", cevent.idRubrica));
            parList.Add(new SqlParameter("@puntos", cevent.puntos));
            parList.Add(new SqlParameter("@porcentajeA", cevent.porcentajeA));
            parList.Add(new SqlParameter("@idCategoriaPorcentaje", cevent.idCategoriaPorcentaje));
            parList.Add(new SqlParameter("@Fecha", Fecha));
            IDataReader datos = cnn.ExecuteReader("PRC_UPDATE_AGENDA", parList);
            string id = "-1";
            while (datos.Read())
            {
                id = datos["IDENTITY"].ToString();
            }
            return id;
        }
        public string ActualizarEvento(DateTime Fecha, int idEvento, string NombreEvento)
        {
            cnn = new Connection();
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.Add(new SqlParameter("@idEvento", idEvento));
            parList.Add(new SqlParameter("@NombreEvento", NombreEvento));
            parList.Add(new SqlParameter("@Fecha", Fecha));
            IDataReader datos = cnn.ExecuteReader("PRC_AGENDA_EVENTOS_UPDATE", parList);
            string id = "-1";
            while (datos.Read())
            {
                id = datos["IDENTITY"].ToString();
            }
            return id;
        }
        //this method updates the event start and end time
        public void updateEventTime(DateTime Fecha,  int idEscuela,int idtipoEvento, int id, int idUsuario, DateTime start, DateTime end)
        {
            cnn = new Connection();
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.Add(new SqlParameter("@idEscuela", idEscuela));
            parList.Add(new SqlParameter("@idtipoEvento", idtipoEvento));
            parList.Add(new SqlParameter("@id", id));
            parList.Add(new SqlParameter("@idUsuario", idUsuario));
            parList.Add(new SqlParameter("@FechaInicioActividad", start));
            parList.Add(new SqlParameter("@FechaFinActividad", end));
            parList.Add(new SqlParameter("@Fecha", Fecha));
            cnn.ExecuteReader("PRC_UPDATE_AGENDA_FECHAHORA", parList);
        }
        public string deleteEvent(int idEscuela, int idAgenda, int Estatus, int idUsuario, DateTime FechaAccion)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idEscuela", idEscuela));
            parList.ToAdd(new SqlParameter("@id", idAgenda));
            parList.ToAdd(new SqlParameter("@Estatus", Estatus));
            parList.ToAdd(new SqlParameter("@idUsuario", idUsuario));
            parList.Add(new SqlParameter("@FechaAccion", FechaAccion));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_DELETE_AGENDA", parList));
        }
        public string deleteEventdeleteEventPlanificador(int idAgenda, int Estatus, int idUsuario, DateTime FechaAccion)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@id", idAgenda));
            parList.ToAdd(new SqlParameter("@Estatus", Estatus));
            parList.ToAdd(new SqlParameter("@idUsuario", idUsuario));
            parList.Add(new SqlParameter("@FechaAccion", FechaAccion));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_AGENDA_DELETE_PLANIFICADOR", parList));
        }        
            public string GetBiblioteca(int idEscuela, string Funcionalidad, int idRolA, int idUsuario)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idEscuela", idEscuela));
            parList.ToAdd(new SqlParameter("@Funcionalidad", Funcionalidad));
            parList.ToAdd(new SqlParameter("@idRolA", idRolA));
            parList.ToAdd(new SqlParameter("@idUsuario", idUsuario));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_BIBLIOTECA_SELECT", parList));
        }
        public string GetEstadisticasTask(int idEscuela, int idOpcion)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idEscuela", idEscuela));
            parList.ToAdd(new SqlParameter("@idOpcion", idOpcion));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_AULA_VIRTUAL_SELECT_ESTADISTICAS", parList));
        }
        public string GetTaskActividad(int idOpcion, int idSubnivel, int idUsuario)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idOpcion", idOpcion));
            parList.ToAdd(new SqlParameter("@idSubnivel", idSubnivel));
            parList.ToAdd(new SqlParameter("@idUsuario", idUsuario));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_AULA_VIRTUAL_SELECT_TASK_ACTIVIDADES", parList));
        }
        //this method adds events to the database
        public string addEvent(int idEscuela, int idSubNivel, int idAsignatura, int idEducador, int idTipoActividad, string NombreActividad, string DescripcionActividad, DateTime FechaInicioActividad, DateTime FechaFinActividad, string TipoNota, int SubTipoNota, int idModulo, int TipoEscala, int idRubrica, int puntos, int porcentajeA, int idCategoriaPorcentaje, int idTipoEvento, DateTime FechaAccion)
        {
            cnn = new Connection();
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.Add(new SqlParameter("@idEscuela", idEscuela));
            parList.Add(new SqlParameter("@idSubNivel", idSubNivel));
            parList.Add(new SqlParameter("@idAsignatura", idAsignatura));
            parList.Add(new SqlParameter("@idUsuario", idEducador));
            parList.Add(new SqlParameter("@TipoNota", TipoNota));
            parList.Add(new SqlParameter("@idTipoActividad", idTipoActividad));
            parList.Add(new SqlParameter("@NombreActividad", NombreActividad));
            parList.Add(new SqlParameter("@DescripcionActividad", DescripcionActividad));
            parList.Add(new SqlParameter("@FechaInicioActividad", FechaInicioActividad));
            parList.Add(new SqlParameter("@FechaFinActividad", FechaFinActividad));
            parList.Add(new SqlParameter("@idModulo", idModulo));
            parList.Add(new SqlParameter("@SubTipoNota", SubTipoNota));
            parList.Add(new SqlParameter("@TipoEscala", TipoEscala));
            parList.Add(new SqlParameter("@idRubrica", idRubrica));
            parList.Add(new SqlParameter("@puntos", puntos));
            parList.Add(new SqlParameter("@porcentajeA", porcentajeA));
            parList.Add(new SqlParameter("@idCategoriaPorcentaje", idCategoriaPorcentaje));
            parList.Add(new SqlParameter("@FechaAccion", FechaAccion));
            parList.Add(new SqlParameter("@idTipoEvento", idTipoEvento));
            IDataReader datos = cnn.ExecuteReader("PRC_INSERT_AGENDA_ROLES", parList);
            string id = "-1";
            while (datos.Read())
            {
                id = datos["IDENTITY"].ToString();
            }
            return id;
        }
        public DateTime getFechaBloqueoAgendaActual(int idEscuela)
        {
            //obtener de la base de datos la fecha de bloqueo de agenda para la escuela correspondiente
            //PRC_SELECT_BLOQUEO_AGENDA
            cnn = new Connection();
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.Add(new SqlParameter("@idEscuela", idEscuela));
            IDataReader datos = cnn.ExecuteReader("PRC_SELECT_BLOQUEO_AGENDA", parList);

            DateTime fechaBloqueoAgendaActual = new DateTime();
            while (datos.Read())
            {
                fechaBloqueoAgendaActual = (DateTime)datos["fechaBloqueoActual"];
            }
            return fechaBloqueoAgendaActual;
        }
        public string callbloqueo(int idEscuela)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idEscuela", idEscuela));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_SELECT_AGENDA_BLOQUEO", parList));
        }
        public string GetIdAgenda(int idEscuela, int idAgenda)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idEscuela", idEscuela));
            parList.ToAdd(new SqlParameter("@idAgenda", idAgenda));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_AGENDA_SELECT_ID", parList));
        }

        public string VerificarActividadesParaHoy(string Fecha, int IdEscuela, int idSubNivel)
        {
            cnn = new Connection();
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.Add(new SqlParameter("@Fecha", Fecha));
            parList.Add(new SqlParameter("@IdEscuela", IdEscuela));
            parList.Add(new SqlParameter("@idSubNivel", idSubNivel));
            IDataReader datos = cnn.ExecuteReader("PRC_SELECT_VERIFICAR_ACTIVIDADES_PARA_HOY", parList);
            string numeroActividades = "";
            while (datos.Read())
            {
                numeroActividades = datos["NUMEROACTIVIDAES"].ToString();
            }
            return numeroActividades;
        }

        public string Guardar_ConfigBloqueoGuia(DateTime FechaBloqueoGuia, DateTime FechaCorteBloqueoGuia, int idEscuela, DateTime FechaProximoBloqueoGuia, int PeriodoBloqueo)
        {
            cnn = new Connection();
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.Add(new SqlParameter("@FechaBloqueoGuia", FechaBloqueoGuia));
            parList.Add(new SqlParameter("@FechaCorteBloqueoGuia", FechaCorteBloqueoGuia));
            parList.Add(new SqlParameter("@idEscuela", idEscuela));
            parList.Add(new SqlParameter("@FechaProximoBloqueoGuia", FechaProximoBloqueoGuia));
            parList.Add(new SqlParameter("@PeriodoBloqueo", PeriodoBloqueo));
            cnn.ExecuteReader("PRC_UPDATE_CONFIG_BLOQUEO_GUIA", parList);
            return "";
        }

        public BloqueAgenda Buscar_ConfigBloqueo(int idEscuela)
        {
            cnn = new Connection();
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.Add(new SqlParameter("@idEscuela", idEscuela));
            IDataReader datos = cnn.ExecuteReader("PRC_SELECT_CONFIG_BLOQUEO_GUIA", parList);

            BloqueAgenda obj = new BloqueAgenda();
            while (datos.Read())
            {
                if (datos["FechaBloqueoGuia"].ToString() != "")
                    obj.FechaBloqueoGuia = Convert.ToDateTime(datos["FechaBloqueoGuia"].ToString());
                if (datos["FechaCorteBloqueoGuia"].ToString() != "")
                    obj.FechaCorteBloqueoGuia = Convert.ToDateTime(datos["FechaCorteBloqueoGuia"].ToString());
                if (datos["FechaProximoBloqueo"].ToString() != "")
                    obj.FechaProximoBloqueo = Convert.ToDateTime(datos["FechaProximoBloqueo"].ToString());
                if (datos["PeriododeBloqueo"].ToString() != "")
                    obj.PeriododeBloqueo = Convert.ToInt32(datos["PeriododeBloqueo"].ToString());
            }

            return obj;
        }
    }

    public class BloqueAgenda
    {
        public BloqueAgenda()
        {
            PeriododeBloqueo = -1;
        }
        public DateTime? FechaBloqueoGuia { get; set; }
        public DateTime? FechaCorteBloqueoGuia { get; set; }
        public DateTime? FechaProximoBloqueo { get; set; }
        public int PeriododeBloqueo { get; set; }
    }
}
