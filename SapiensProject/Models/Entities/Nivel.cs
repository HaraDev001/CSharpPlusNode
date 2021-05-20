using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;

namespace SapiensProject.Models.Entities
{
    public class Nivel
    {

        public string Trimestre { get; set; }
        public Decimal SumPromedio { get; set; }
        public string Titulo_Escuela { get; set; }
        public string Alumno { get; set; }
        public string Cedula { get; set; }
        public string Grupo { get; set; }
        public int RowNumber { get; set; }
        public int id { get; set; }
        public int idOrden { get; set; }
        public int idEscuela { get; set; }
        public string Nombre { get; set; }
        public bool Activo { get; set; }
        public string NombreCorto { get; set; }
        public string MetodoPromedio { get; set; }
        public string Metodologia { get; set; }
        public string especialidad_desc { get; set; }
        public decimal CostoMatricula { get; set; }
        public decimal CostoMensualidad { get; set; }
        public string ObtenerNivelesAdministrador(int idEscuela)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idEscuela", idEscuela));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_SELECT_NIVEL", parList));
        }
        public string ObtenerNivelEspecialidad(int idEscuela, int idEspecialidad)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idEscuela", idEscuela));
            parList.ToAdd(new SqlParameter("@idEspecialidad", idEspecialidad));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_SELECT_NIVEL_ESPECIALIDAD", parList));
        }
        public string Guardar_Nivel(int idNivel, int idEscuela, string nombre, int especialidad, int mpromedio, int AplicaPuntajeNotas,int idorden, int idordenAcumulativo, bool activo, int opcion, string NombreCorto)
        {
            string text = "";
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idNivel", idNivel)).
            ToAdd(new SqlParameter("@idEscuela", idEscuela)).
            ToAdd(new SqlParameter("@nombre", nombre)).
            ToAdd(new SqlParameter("@especialidad", especialidad)).
            ToAdd(new SqlParameter("@mpromedio", mpromedio)).
            ToAdd(new SqlParameter("@AplicaPuntajeNotas", AplicaPuntajeNotas)).
            ToAdd(new SqlParameter("@idorden", idorden)).
            ToAdd(new SqlParameter("@idOrdenAcumulativo", idordenAcumulativo)).
            ToAdd(new SqlParameter("@Activo", activo)).
            ToAdd(new SqlParameter("@idOpcion", opcion)).
            ToAdd(new SqlParameter("@NombreCorto", NombreCorto));
            IDataReader dt = Connection.Instance.ExecuteReader("PRC_GUARDAR_NIVEL", parList);
            while (dt.Read())
            {
                text = dt.GetValue(0).ToString();
            }
            return text;
        }        
            public string CallNivelEnlaces(int idEscuela, int idEnlace)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idEscuela", idEscuela));
            parList.ToAdd(new SqlParameter("@idEnlace", idEnlace));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_ENLACES_NIVEL_SELECT", parList));
        }
        public string CallNivelesRank(int idEscuela)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idEscuela", idEscuela));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_SELECT_NIVEL_RANKING", parList));
        }
        public string ObtenerNivelMetodologia(int idEscuela)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idEscuela", idEscuela));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_SELECT_NIVEL_METODOLOGIA", parList));
        }

    }
}