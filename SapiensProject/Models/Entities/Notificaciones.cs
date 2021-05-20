using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Web.Script.Serialization;

namespace SapiensProject.Models.Entities
{
    public class Notificaciones
    {
        public int id { get; set; }
        public int idObjeto { get; set; }
        public string TipoObjeto { get; set; }
        public int idUsuario { get; set; }
        public string NombreUsuario { get; set; }
        public string Accion { get; set; }
        public string DetalleAccion { get; set; }
        public int idUsuarioCreador { get; set; }
        public string NombreUsuarioCreador { get; set; }
        public int Visualizada { get; set; }
        public DateTime Fecha { get; set; }
        public String NombreActividad { get; set; }
        public String DescripcionCompleta { get; set; }

        public string BuscarNotificaciones(int idUsuario)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            IDataReader dt = null;
            parList.ToAdd(new SqlParameter("@idUsuario", idUsuario));
            dt = (System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_SELECT_NOTIFIACIONES", parList);
            var lista_notificaiones = Utility.LoadObjectsFromDataReader<Notificaciones>(dt);
            JavaScriptSerializer jss = new JavaScriptSerializer();
            return jss.Serialize(lista_notificaiones);
        }

        public string BuscarTodasLasNotificacionesDelUsuario(int idUsuario)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            IDataReader dt = null;
            parList.ToAdd(new SqlParameter("@idUsuario", idUsuario));
            dt = (System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_SELECT_NOTIFICACIONES_DEL_USUARIO", parList);
            var lista_notificaiones = Utility.LoadObjectsFromDataReader<Notificaciones>(dt);
            JavaScriptSerializer jss = new JavaScriptSerializer();
            return jss.Serialize(lista_notificaiones);
        }

        public string BuscarNotificacionesDelAdminSinLeer(int idUsuario)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            IDataReader dt = null;
            parList.ToAdd(new SqlParameter("@idUsuario", idUsuario));
            dt = (System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_SELECT_NOTIFIACIONES", parList);
            var lista_notificaiones = Utility.LoadObjectsFromDataReader<Notificaciones>(dt);
            JavaScriptSerializer jss = new JavaScriptSerializer();
            return jss.Serialize(lista_notificaiones);
        }

        public string BuscarNotificaionesParaAdmin(int idEscuela, int idOpcion, DateTime fechaInicial, DateTime fechaFinal, int idUsuario)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idEscuela", idEscuela));
            parList.ToAdd(new SqlParameter("@idOpcion", idOpcion));
            parList.ToAdd(new SqlParameter("@fechaInicial", fechaInicial));
            parList.ToAdd(new SqlParameter("@fechaFinal", fechaFinal));
            parList.ToAdd(new SqlParameter("@idUsuario", idUsuario));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_SELECT_NOTIFICACIONES_PARA_ADMIN", parList));
        }

        public void NotificacionesVisualizadas(int idUsuario)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idUsuario", idUsuario));
            Connection.Instance.ExecuteReader("PRC_UPDATE_NOTIFICAIONES_VISTAS", parList);
        }
    }
}