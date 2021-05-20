using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;

namespace SapiensProject.Models.Entities
{
    public class Periodo
    {
        public DateTime FechaInicio { get; set; }
        public DateTime FechaFin { get; set; }
        public long RowNumber { get; set; }
        public int id { get; set; }
        public int idEscuela { get; set; }
        public string Nombre { get; set; }
        public string FechaIniciof { get; set; }
        public string FechaFinf { get; set; }
        public bool Activo { get; set; }
        public string Metodologia { get; set; }
        public string Descripcion { get; set; }
        public int idPeriodo { get; set; }
        public int idTipoMetodologia { get; set; }
        public string periodo { get; set; }
        public int idOrden { get; set; }
        public int idUsuario { get; set; }
        public bool PPBE { get; set; }
        public bool PNE { get; set; }
        public string SavePeriodoBoletinAcum(int TipoModeloHistorico, int idEscuela, int vpta)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@TipoModeloHistorico", TipoModeloHistorico));
            parList.ToAdd(new SqlParameter("@idEscuela", idEscuela));
            parList.ToAdd(new SqlParameter("@vpta", vpta));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_BOLETIN_CONFIGURACION_ACUMULATIVO", parList));
        }
        public string SavePeriodoBoletin(int idEscuela, bool t1, bool t2, bool t3, int vpt, int cdp)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idEscuela", idEscuela));
            parList.ToAdd(new SqlParameter("@t1", t1));
            parList.ToAdd(new SqlParameter("@t2", t2));
            parList.ToAdd(new SqlParameter("@t3", t3));
            parList.ToAdd(new SqlParameter("@vpt", vpt));
            parList.ToAdd(new SqlParameter("@cdp", cdp));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_SAVE_PERIODO", parList));
        }
        public string Guardar_Periodo(int idEscuela, string nombre, string fechai_txt, string fechaf_txt,  int idOrden, int opcion, int id, int AnioLectivo)
        {
            string text = "";
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idEscuela", idEscuela)).
            ToAdd(new SqlParameter("@nombre", nombre)).
            ToAdd(new SqlParameter("@fechai_txt", fechai_txt)).
            ToAdd(new SqlParameter("@fechaf_txt", fechaf_txt)).
            ToAdd(new SqlParameter("@idOrden", idOrden)).
            ToAdd(new SqlParameter("@opcion", opcion)).
             ToAdd(new SqlParameter("@AnioLectivo", AnioLectivo)).
             ToAdd(new SqlParameter("@idPeriodo", id));
            IDataReader dt = Connection.Instance.ExecuteReader("PRC_GUARDAR_PERIODO", parList);
            while (dt.Read())
            {
                text = dt.GetValue(0).ToString();
            }
            return text;
        }
        public string SelectAcumConf(int idEscuela)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idEscuela", idEscuela));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_CONFIGURACION_ACUMULATIVO", parList));
        }
        public string SelectPeriBoletin(int idEscuela)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idEscuela", idEscuela));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_SELECT_PERIODO_BOLETIN", parList));
        }
        public string ObtenerPeriodoMatricula(int idUsuario)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idUsuario", idUsuario));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_SELECT_PERIODO_MATRICULA", parList));
        }
        public string ObtenerPeriodo(int idEscuela)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idEscuela", idEscuela));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_SELECT_PERIODO_TIPO_METODOLOGIA", parList));
        }
        public string ObtenerPeriodoTask(int idEscuela, bool DesactivarUsuarioPorPeriodo)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idEscuela", idEscuela));
            parList.ToAdd(new SqlParameter("@DesactivarUsuarioPorPeriodo", DesactivarUsuarioPorPeriodo));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_SELECT_PERIODO_TASK", parList));
        }
        public string ObtenerUsuarioPeriodo(int idPeriodo, int idEscuela)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idPeriodo", idPeriodo));
            parList.ToAdd(new SqlParameter("@idEscuela", idEscuela));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_REPORTES_SELECT_DOCENTES", parList));
        }
        public string ObtenerPeriodoLibretas1(int idEscuela, int idUsuario, int idRol, int idSubnivel)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idEscuela", idEscuela));
            parList.ToAdd(new SqlParameter("@idUsuario", idUsuario));
            parList.ToAdd(new SqlParameter("@idRol", idRol));
            parList.ToAdd(new SqlParameter("@idSubnivel", idSubnivel));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_SELECT_PERIODO_LIBRETAS1", parList));
        }
        public string ObtenerPeriodoLibretas(int idEscuela, int idUsuario, int idRol, int idSubnivel)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idEscuela", idEscuela));
            parList.ToAdd(new SqlParameter("@idUsuario", idUsuario));
            parList.ToAdd(new SqlParameter("@idRol", idRol));
            parList.ToAdd(new SqlParameter("@idSubnivel", idSubnivel));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_SELECT_PERIODO_LIBRETAS", parList));
        }
        public string ObtenerPAdmin(int idEscuela, int idPeriodo)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idEscuela", idEscuela));
            parList.ToAdd(new SqlParameter("@idPeriodo", idPeriodo));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_SELECT_PERIODO_ADMIN", parList));
        }
        public List<Periodo> ObtenerPNivel(int idNivel, int idEscuela)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idEscuela", idEscuela));
            parList.ToAdd(new SqlParameter("@Nivel", idNivel));
            IDataReader datos = (System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_SELECT_PERIODO_X_NIVEL", parList);
            return Utility.LoadObjectsFromDataReader<Periodo>(datos);
        }
        public string UpdateStatus(int idEscuela, int id, int status, int CodCampo)
        {
            string text = "";
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idEscuela", idEscuela)).
            ToAdd(new SqlParameter("@id", id)).
            ToAdd(new SqlParameter("@Activo", status)).
            ToAdd(new SqlParameter("@CodCampo", CodCampo));
            IDataReader dt = Connection.Instance.ExecuteReader("PRC_UPDATE_PERIODO_STATUS", parList);
            while (dt.Read())
            {
                text = dt.GetValue(0).ToString();
            }
            return text;
        }
        public string UpdateDocentesAutorizados(int idPeriodo, string listaProfesores)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idPeriodo", idPeriodo)).
            ToAdd(new SqlParameter("@listaProfesores", listaProfesores));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_UPDATE_DOCENTES_AUTORIZADOS", parList));
        }

    }
}