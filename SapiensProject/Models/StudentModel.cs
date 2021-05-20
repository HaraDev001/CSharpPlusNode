using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;

namespace SapiensProject.Models
{
    public class StudentModel
    {
        Connection cnn;
        public IDataReader obtenerListadoExamen(int idEscuela, int idUsuario, int FiltrarPorEstado)
        {
            cnn = new Connection();
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.Add(new SqlParameter("@idEscuela", idEscuela));
            parList.Add(new SqlParameter("@idUsuario", idUsuario));
            parList.Add(new SqlParameter("@FiltrarPorEstado", FiltrarPorEstado));
            return cnn.ExecuteReader("PRC_SELECT_LISTADO_EXAMEN_ESTUDIANTE", parList);
        }
        public IDataReader GetMensajeBloqueo(int idEscuela)
        {
            cnn = new Connection();
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.Add(new SqlParameter("@idEscuela", idEscuela));
            IDataReader dt = cnn.ExecuteReader("PRC_MENSAJE_SELECT_BLOQUEO", parList);
            return dt;
        }        
        public IDataReader esEstudiantePreescolar(int idUsuario, int idEscuela)
        {
            cnn = new Connection();
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.Add(new SqlParameter("@idUsuario", idUsuario));
            parList.Add(new SqlParameter("@idEscuela", idEscuela));
            IDataReader dt = cnn.ExecuteReader("PRC_VALIDAR_ESTUDIANTE_PREESCOLAR", parList);            
            return dt;
        }
        public String obtenerEmailRecuperarPassword(int idUsuario)
        {
            cnn = new Connection();
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.Add(new SqlParameter("@idUsuario", idUsuario));
            IDataReader dt = cnn.ExecuteReader("PRC_SELECT_USUARIO_RECUPERAR_PASSWORD", parList);
            string resp = string.Empty;
            while (dt.Read())
            {
                resp = dt["Email"].ToString();
            }
            return resp;
        }
    }
}