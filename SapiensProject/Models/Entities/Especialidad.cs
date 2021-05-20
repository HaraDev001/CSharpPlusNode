using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;

namespace SapiensProject.Models.Entities
{
    public class Especialidad
    {
        public int TipoEspecialidad { get; set; }
        public int id { get; set; }
        public int idEscuela { get; set; }
        public string Nombre { get; set; }
        public bool Activo { get; set; }
        public int idMetodoPromedio { get; set; }
        public string NombreMetodologia { get; set; }
        public decimal NotaMinima { get; set; }
        public decimal NotaMaxima { get; set; }
        public int idTipoMetodologia { get; set; }
        public string Guardar_Especialidad(int idEscuela, string nombre, decimal notaminima, decimal nfracaso, decimal notamaxima, int director, bool activo, int opcion, int tipoEspecialidad, int id)
        {
            string text = "";
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idEscuela", idEscuela)).
            ToAdd(new SqlParameter("@nombre", nombre)).
            ToAdd(new SqlParameter("@NotaMinima", notaminima)).
            ToAdd(new SqlParameter("@nfracaso", nfracaso)).
            ToAdd(new SqlParameter("@NotaMaxima", notamaxima)).
            ToAdd(new SqlParameter("@Director", director)).
            ToAdd(new SqlParameter("@Activo", activo)).
            ToAdd(new SqlParameter("@idOpcion", opcion)).
            ToAdd(new SqlParameter("@tipoEspecialidad", tipoEspecialidad)).
            ToAdd(new SqlParameter("@id", id));
            IDataReader dt = Connection.Instance.ExecuteReader("PRC_GUARDAR_ESPECIALIDAD", parList);
            while (dt.Read())
            {
                text = dt.GetValue(0).ToString();
            }
            return text;
        }
        public string ObtenerELaboral(int escuela, int Activo, bool DesactivarUsuarioPorPeriodo, int idUsuario)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idEscuela", escuela));
            parList.ToAdd(new SqlParameter("@Activo", Activo));
            parList.ToAdd(new SqlParameter("@DesactivarUsuarioPorPeriodo", DesactivarUsuarioPorPeriodo));
            parList.ToAdd(new SqlParameter("@idUsuario", idUsuario));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_SELECT_ESPECIALIDAD_LABORAL", parList));
        }
        public string ActualizarFoda(int idSubnivel, string xml)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idSubnivel", idSubnivel));
            parList.ToAdd(new SqlParameter("@xmlData", xml));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_FODA_GUARDARITEMS", parList));
        }
        public string GuardarTipoFoda(int idTipoFoda, string Nombre)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idTipoFoda", idTipoFoda));
            parList.ToAdd(new SqlParameter("@Nombre", Nombre));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_FODA_GUARDAR", parList));
        }
        public string GetParametrosFoda(int idEspecialidad)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idEspecialidad", idEspecialidad));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_FODA_SELECT", parList));
        }
        public string ObtenerE(int escuela, int idOpcion)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idEscuela", escuela));
            parList.ToAdd(new SqlParameter("@idOpcion", idOpcion));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_SELECT_ESPECIALIDAD", parList));
        }
        public string ObtenerEID(int idEscuela, int id)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idEscuela", idEscuela));
            parList.ToAdd(new SqlParameter("@id", id));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_SELECT_ESPECIALIDAD_ID", parList));
        }
        public List<Especialidad> ObtenerHistorico(int idEscuela, int idUsuario)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idEscuela", idEscuela));
            parList.ToAdd(new SqlParameter("@idUsuario", idUsuario));
            IDataReader dt = (System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_SELECT_ESPECIALIDAD_HISTORICO_LABORAL", parList);
            return Utility.LoadObjectsFromDataReader<Especialidad>(dt);
        }
        public List<Especialidad> ObtenerMetodoPromedio(bool Activo)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@Activo", Activo));
            IDataReader dt = (System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_SELECT_METODOPROMEDIO", parList);
            return Utility.LoadObjectsFromDataReader<Especialidad>(dt);
        }
        public string ObtenerEspAsig_(int idSubnivel)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idSubnivel", idSubnivel));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_SELECT_ESPECIALIDAD_ASIGNATURA", parList));
        }
        public List<Especialidad> ObtenerAlumno(int escuela, int idUsuario)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idEscuela", escuela));
            parList.ToAdd(new SqlParameter("@idUsuario", idUsuario));
            IDataReader dt = (System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_SELECT_ESPECIALIDAD_ALUMNO", parList);
            return Utility.LoadObjectsFromDataReader<Especialidad>(dt);
        }
    }
}