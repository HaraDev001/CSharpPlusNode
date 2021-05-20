using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;

namespace SapiensProject.Models.Entities
{
    public class Examen
    {
        public string SaveExamen(string json, int idusuario,  DateTime FechaRegistro, int idTask, int entregado)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@json", json));
            parList.ToAdd(new SqlParameter("@idusuario", idusuario));
            parList.ToAdd(new SqlParameter("@FechaRegistro", FechaRegistro));
            parList.ToAdd(new SqlParameter("@entregado", entregado));
            if (idTask > 0)
            {
                parList.ToAdd(new SqlParameter("@idTask", idTask));
            }
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_SAVE_EXAMEN", parList));
        }
        public string ReadExamen(int idExamen)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idExamen", idExamen));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_READ_EXAMEN", parList));
        }
        public string ReadExamenFromTask(int idTask, int idUsuario)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idTask", idTask));
            parList.ToAdd(new SqlParameter("@idUsuario", idUsuario));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_EXAMEN_FROM_TASK", parList));
        }
        public string TaskParaFromTask(int idTask, int idUsuario)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idTask", idTask));
            parList.ToAdd(new SqlParameter("@idUsuario", idUsuario));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_TASK_PARA_FROM_TASK", parList));
        }
        public string AlumnosFromTask(int idEscuela, int idTask, int idUsuario)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idEscuela", idEscuela));
            parList.ToAdd(new SqlParameter("@idTask", idTask));
            parList.ToAdd(new SqlParameter("@idUsuario", idUsuario));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_ALUMNOS_FROM_TASK", parList));
        }

    }
}