using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;

namespace SapiensProject.Models
{
    public class ProfessorModel
    {
        Connection cnn;

        public IDataReader obtenerListaExamenes(int idUsuario, int idEscuela, string NombreExamen, int idAsignatura, int idSubnivel, int PageIndex, int PageSize)
        {
            cnn = new Connection();
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.Add(new SqlParameter("@idUsuario", idUsuario));
            parList.Add(new SqlParameter("@idEscuela", idEscuela));
            parList.Add(new SqlParameter("@NombreExamen", NombreExamen));
            parList.Add(new SqlParameter("@idAsignatura", idAsignatura));
            parList.Add(new SqlParameter("@idSubnivel", idSubnivel));
            parList.Add(new SqlParameter("@PageIndex", PageIndex));
            parList.Add(new SqlParameter("@PageSize", PageSize));
            return cnn.ExecuteReader("PRC_SELECT_EXAMEN_USUARIO", parList);
        }
    }
}