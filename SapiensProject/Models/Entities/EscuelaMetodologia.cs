using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;

namespace SapiensProject.Models.Entities
{
    public class EscuelaMetodologia
    {
        public bool oBloqueoAgenda { get; set; }
        public string AgendaDiaBloqueo { get; set; }
        public string AgendaHoraBloqueo { get; set; }
        public bool UsarAprobacionAgenda { get; set; }
        public string Titulo_Escuela { get; set; }
        public string Logo { get; set; }
        public string Mision { get; set; }
        public string Vision { get; set; }
        public string Valores { get; set; }
        public long RowNumber { get; set; }
        public int id { get; set; }
        public int idEscuela { get; set; }
        public string TipoMetodologia { get; set; }
        public bool Activo { get; set; }
        public bool DesactivarUsuarioPorPeriodo { get; set; }
        public bool PermitirNomenclaturaComoPromedio { get; set; }
        public bool CalcPromedioCantTotalEventos { get; set; }
        public int total { get; set; }
        public bool EstatusPeriodoPreMatriculaAlumnos { get; set; }
        
        public string ObtenerAniosHistoricoa(int idEscuela)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idEscuela", idEscuela));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_SELECT_ANIOS_HISTORICO", parList));
        }
        public List<response> GuardarPreMatricula(int idEscuela, int Activo, int idPeriodo)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idEscuela", idEscuela)).
            ToAdd(new SqlParameter("@activo", Activo)).
            ToAdd(new SqlParameter("@idPeriodo", idPeriodo));
            IDataReader dt = Connection.Instance.ExecuteReader("PRC_GUARDAR_PREMATRICULA_CONFIGURACION", parList);
            List<response> resp = new List<response>();
            while (dt.Read())
            {
                resp.Add(new response { text = dt.GetValue(0).ToString() });
            }
            return resp;
        }
            public string ObtenerConfBloqueo(int idEscuela)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idEscuela", idEscuela));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_BLOQUEO_SELECT", parList));
        }
        public string PRC_ESCUELA_SELECT_ESCUELA(int idTipoReporte)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idTipoReporte", idTipoReporte));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_ESCUELA_SELECT_ESCUELA", parList));
        }
        public string INSERT_ANUNCIOSWEB_Y_ARCHIVOS(int idEscuela, string archivo, string descripcion, int tipo)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idEscuela", idEscuela));
            parList.ToAdd(new SqlParameter("@archivo", archivo));
            parList.ToAdd(new SqlParameter("@descripcion", descripcion));
            parList.ToAdd(new SqlParameter("@tipo", tipo));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_INSERT_ANUNCIOSWEB_Y_ARCHIVOS", parList));
        }        
             public string PROMOVERESCUELA(int idEscuela, int anio_promover, int eliminarmensajes, int idOpcion)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idEscuela", idEscuela));
            parList.ToAdd(new SqlParameter("@anio_promover", anio_promover));
            parList.ToAdd(new SqlParameter("@eliminarmensajes", eliminarmensajes));
            parList.ToAdd(new SqlParameter("@idOpcion", idOpcion));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_UPDATE_PROMOVER_ESCUELA", parList));
        }

        public string PRC_ESCUELA_UPDATE_ESCUELA(string NombreEscuela, int tipo_colegio, int anio_lectivo)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@NombreEscuela", NombreEscuela));
            parList.ToAdd(new SqlParameter("@tipo_colegio", tipo_colegio));
            parList.ToAdd(new SqlParameter("@anio_lectivo", anio_lectivo));
           
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_ESCUELA_UPDATE_ESCUELA", parList));
        }
        public string EliminarArchivosWeb(int idArchivo)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idArchivo", idArchivo));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_DELETE_ANUNCIOSWEB_Y_ARCHIVOS", parList));
        }
              public string GetSalonDocente(int idEscuela)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idEscuela", idEscuela));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_SALON_DOCENTE_SELECT_ESCUELA", parList));
        }
        
            public string GetSalonesMeetGoogleStudent(int idEscuela, int idUsuario)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idEscuela", idEscuela));
            parList.ToAdd(new SqlParameter("@idUsuario", idUsuario));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_SELECT_SALONES_MEET_GOOGLE_ALUMNO", parList));
        }

        public string GetRepUsoP(int idEscuela, string txtFechadesde, string txtFechahasta)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idEscuela", idEscuela));
            parList.ToAdd(new SqlParameter("@txtFechadesde", txtFechadesde));
            parList.ToAdd(new SqlParameter("@txtFechahasta", txtFechahasta));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_REPORTE_USO_PLATAFORMA", parList));
        }
        public string GuardarContrato(int idUsuario)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idUsuario", idUsuario));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_CONTRATO_GUARDAR", parList));
        }
        public string SELECT_ANUNCIO_Y_ARCHIVOS(int idEscuela)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idEscuela", idEscuela));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_SELECT_ANUNCIO_Y_ARCHIVOS", parList));
        }
        public string CargarGraficaAgenda1(int idEscuela, int idAgenda)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idEscuela", idEscuela));
            parList.ToAdd(new SqlParameter("@idAgenda", idAgenda));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_REPORTE_GRAFICA_AGENDA", parList));
        }
        public string CargarAlumnoAgenda(int idEscuela, int idAgenda)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idEscuela", idEscuela));
            parList.ToAdd(new SqlParameter("@idAgenda", idAgenda));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_REPORTE_GRAFICA_AGENDA_ALUMNO", parList));
        }
        public string CargarAgendas(int idEscuela, int idUsuario, int idPeriodo, int idRol, int idSubnivel)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idEscuela", idEscuela));
            parList.ToAdd(new SqlParameter("@idUsuario", idUsuario));
            parList.ToAdd(new SqlParameter("@idPeriodo", idPeriodo));
            parList.ToAdd(new SqlParameter("@idRol", idRol));
            parList.ToAdd(new SqlParameter("@idSubnivel", idSubnivel));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_AGENDA_SELECT", parList));
        }

        public string ValidarOpcionesIniciales(int idEscuela, int idRol)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idEscuela", idEscuela));
            parList.ToAdd(new SqlParameter("@idRol", idRol));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_INICIO_OPCIONES", parList));
        }
        

        public string ContadoresDashboard()
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_SELECT_DASHBOARD_ESCUELAS", parList));
        }
        public string ConfiguracionEscuelaMetodologiacargar(int idEscuela)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idEscuela", idEscuela));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_CONFIGURACION_SELECT_ESCUELA_METODOLOGIA", parList));
        }
        public string ConfiguracionEscuelaMetodologia5(int idEscuela, int c1, int c2, int c3, int c4, int c5)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idEscuela", idEscuela));
            parList.ToAdd(new SqlParameter("@c1", c1));
            parList.ToAdd(new SqlParameter("@c2", c2));
            parList.ToAdd(new SqlParameter("@c3", c3));
            parList.ToAdd(new SqlParameter("@c4", c4));
            parList.ToAdd(new SqlParameter("@c5", c5));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_CONFIGURACION_GUARDAR_ESCUELA_METODOLOGIA5", parList));
        }
        public string ConfiguracionEscuelaMetodologia6(int idEscuela, string c1)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idEscuela", idEscuela));
            parList.ToAdd(new SqlParameter("@c1", c1));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_CONFIGURACION_GUARDAR_ESCUELA_METODOLOGIA6", parList));
        }
        public string ConfiguracionEscuelaMetodologia7(int idEscuela, int c1, int c2)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idEscuela", idEscuela));
            parList.ToAdd(new SqlParameter("@c1", c1));
            parList.ToAdd(new SqlParameter("@c2", c2));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_CONFIGURACION_GUARDAR_ESCUELA_METODOLOGIA7", parList));
        }
        public string ConfiguracionEscuelaMetodologia2(int idEscuela, int c1, int c2)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idEscuela", idEscuela));
            parList.ToAdd(new SqlParameter("@c1", c1));
            parList.ToAdd(new SqlParameter("@c2", c2));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_CONFIGURACION_GUARDAR_ESCUELA_METODOLOGIA2", parList));
        }
        public string ConfiguracionEscuelaMetodologia(int idEscuela, string c2, bool c3, string c4, string c5, string c7, string c8, string c9, string c10, string c11)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idEscuela", idEscuela));
            parList.ToAdd(new SqlParameter("@c2", c2));
            parList.ToAdd(new SqlParameter("@c3", c3));
            parList.ToAdd(new SqlParameter("@c4", c4));
            parList.ToAdd(new SqlParameter("@c5", c5));
            parList.ToAdd(new SqlParameter("@c7", c7));
            parList.ToAdd(new SqlParameter("@c8", c8));
            parList.ToAdd(new SqlParameter("@c9", c9));
            parList.ToAdd(new SqlParameter("@c10", c10));
            parList.ToAdd(new SqlParameter("@c11", c11));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_CONFIGURACION_GUARDAR_ESCUELA_METODOLOGIA", parList));
        }
    }
}