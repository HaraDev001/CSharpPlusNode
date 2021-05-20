using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;

namespace SapiensProject.Models
{
    public class AccountModel
    {
        Connection cnn;

        public IDataReader getUserData(string nombreUsuario, string contrasena, string player_id, DateTime FechaAccion)
        {
            cnn = new Connection();
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.Add(new SqlParameter("@NombreUsuario", nombreUsuario));
            parList.Add(new SqlParameter("@Contrasena", contrasena));
            parList.Add(new SqlParameter("@player_id", player_id));
            parList.Add(new SqlParameter("@FechaAccion", DateTime.Now));
            return cnn.ExecuteReader("PRC_VALIDAR_CREDENCIALES_USUARIO2", parList);
        }
        public IDataReader getUserDataAplicacion(int idUsuario, int idRol)
        {
            cnn = new Connection();
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.Add(new SqlParameter("@idUsuario", idUsuario));
            parList.Add(new SqlParameter("@idRol", idRol));
            return cnn.ExecuteReader("PRC_VALIDAR_CREDENCIALES_USUARIO_APLICACION", parList);
        }
        public void updatePassword(int idUsuario, string ContrasenaNueva)
        {
            cnn = new Connection();
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.Add(new SqlParameter("@idUsuario", idUsuario));
            parList.Add(new SqlParameter("@ContrasenaNueva", ContrasenaNueva));
            cnn.ExecuteReader("PRC_UPDATE_CONTRASENA", parList);
        }
        public IDataReader tienePermisoAlumno(int idEscuela, string url)
        {
            cnn = new Connection();
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.Add(new SqlParameter("@idEscuela", idEscuela));
            parList.Add(new SqlParameter("@url", url));
            return cnn.ExecuteReader("PRC_PERMISO_PAGINA_ALUMNO", parList);
        }
        public IDataReader tienePermiso(int idUsuario, string url)
        {
            cnn = new Connection();
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.Add(new SqlParameter("@idUsuario", idUsuario));
            parList.Add(new SqlParameter("@url", url));
            return cnn.ExecuteReader("PRC_PERMISO_PAGINA", parList);
        }
        public string paginasAlumno(int idEscuela)
        {
            cnn = new Connection();
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.Add(new SqlParameter("@idEscuela", idEscuela));
            return Utility.jsonSql(cnn.ExecuteReader("PRC_SELECT_PAGINAS_ALUMNO", parList));
        }
        public string paginas(int idUsuario)
        {
            cnn = new Connection();
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.Add(new SqlParameter("@idUsuario", idUsuario));
            return Utility.jsonSql(cnn.ExecuteReader("PRC_SELECT_PAGINAS", parList));
        }
        public string bloquearWebUsuario(string json)
        {
            cnn = new Connection();
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.Add(new SqlParameter("@xmlData", json));
            return Utility.jsonSql(cnn.ExecuteReader("PRC_UPDATE_PERMISO_ALUMNO_BOLETIN", parList));
        }
        public string bloquearPaginas(string json, int idUsuario)
        {
            cnn = new Connection();
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.Add(new SqlParameter("@json", json));
            parList.Add(new SqlParameter("@idUsuario", idUsuario));
            return Utility.jsonSql(cnn.ExecuteReader("PRC_UPDATE_PERMISO_PAGINA", parList));
        }
        public string bloquearPaginasAlumno(string json, int idEscuela)
        {
            cnn = new Connection();
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.Add(new SqlParameter("@json", json));
            parList.Add(new SqlParameter("@idEscuela", idEscuela));
            return Utility.jsonSql(cnn.ExecuteReader("PRC_UPDATE_PERMISO_PAGINA_ALUMNO", parList));
        }

        public string CargarAdjuntosAula(int idEscuela, int idTask, int idUsuario)
        {
            cnn = new Connection();
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.Add(new SqlParameter("@idEscuela", idEscuela));
            parList.Add(new SqlParameter("@idTask", idTask));
            parList.Add(new SqlParameter("@idUsuario", idUsuario));
            return Utility.jsonSql(cnn.ExecuteReader("PRC_AULA_ADJUNTOS_ALUMNO", parList));
        }
        public string GuardarArchivosAulaAlumno(int idEscuela, string archivos, int idTask, int idUsuario, DateTime Fecha)
        {
            cnn = new Connection();
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.Add(new SqlParameter("@idEscuela", idEscuela));
            parList.Add(new SqlParameter("@archivos", archivos));
            parList.Add(new SqlParameter("@idTask", idTask));
            parList.Add(new SqlParameter("@idUsuario", idUsuario));
            parList.Add(new SqlParameter("@Fecha", Fecha));
            return Utility.jsonSql(cnn.ExecuteReader("PRC_GUARDAR_ARCHIVOS_AULA_ALUMNO_NUEVO", parList));
        }

        public string guardarArchivos(string archivos, int idRelacionado, string funcionalidad, int idUsuario, DateTime FechaRegistro)
        {
            cnn = new Connection();
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.Add(new SqlParameter("@archivos", archivos));
            parList.Add(new SqlParameter("@idRelacionado", idRelacionado));
            parList.Add(new SqlParameter("@funcionalidad", funcionalidad));
            parList.Add(new SqlParameter("@idUsuario", idUsuario));
            parList.Add(new SqlParameter("@FechaRegistro", FechaRegistro));
            return Utility.jsonSql(cnn.ExecuteReader("PRC_GUARDAR_ARCHIVOS_NUEVO", parList));
        }
        public string leerArchivos(int idRelacionado, string funcionalidad)
        {
            cnn = new Connection();
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.Add(new SqlParameter("@idRelacionado", idRelacionado));
            parList.Add(new SqlParameter("@funcionalidad", funcionalidad));
            return Utility.jsonSql(cnn.ExecuteReader("PRC_LEER_ARCHIVOS", parList));
        }
    }
}