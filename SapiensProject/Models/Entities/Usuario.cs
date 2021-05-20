using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;

namespace SapiensProject.Models.Entities
{
    //mejorar estas variables que solo se usen para inicio de sesion ojo atencion Euclides
    public class Usuario
    {
        public bool encuesta { get; set; }
        public int TipoContabilidad { get; set; }
        public string Contrasena { get; set; }
        public string SubDominio { get; set; }
        public string Logo { get; set; }
        public int idUsuario { get; set; }
        public int idRol { get; set; }
        public string nombreRol { get; set; }
        public int idEscuela { get; set; }
        public string nombreEscuela { get; set; }
        public string escuela_frase { get; set; }
        public string Acudiente { get; set; }
        public string CedulaAcudiente { get; set; }
        public string NombreUsuario { get; set; }
        public string RutaModulo { get; set; }
        public int Activo { get; set; }
        public int Estatus { get; set; }
        public bool EstatusPeriodoPreMatriculaAlumnos { get; set; }
        public string NombreCompleto { get; set; }
        public string Cedula { get; set; }
        public bool DesactivarUsuarioPorPeriodo { get; set; }
        public bool DesactivarColegioPorPeriodo { get; set; }
        public string Nombre { get; set; }
        public bool EscuelaUsaRedSocial { get; set; }
        public string FacebookPageId { get; set; }
        public string Languaje { get; set; }
        public string direccion { get; set; }
        public int idSubNivel { get; set; }


        public string UpdateDatosrapidos(int idUsuario, string Nombre, string Apellido, string Cedula)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idUsuario", idUsuario));
            parList.ToAdd(new SqlParameter("@Nombre", Nombre));
            parList.ToAdd(new SqlParameter("@Apellido", Apellido));
            parList.ToAdd(new SqlParameter("@Cedula", Cedula));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_GRUPOS_UPDATE_ESTUDIANTE_RAPIDO", parList));
        }
        public string ObtenerContadores(int idEscuela)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idEscuela", idEscuela));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_SELECT_CONTADORES", parList));
        }
        public string CallUsersDiferrent(int idUsuario, int idRol)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idUsuario", idUsuario));
            parList.ToAdd(new SqlParameter("@idRol", idRol));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_USUARIO_SELECT_DIFERENTES", parList));
        }
        public string CargarVisitantes(int idEscuela)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idEscuela", idEscuela));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_VISITANTES_SELECT", parList));
        }
        public string RegistrarVisitantes(int idEscuela, DateTime fecha, string persona, string identificacion, string motivo)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idEscuela", idEscuela));
            parList.ToAdd(new SqlParameter("@fecha", fecha));
            parList.ToAdd(new SqlParameter("@persona", persona));
            parList.ToAdd(new SqlParameter("@identificacion", identificacion));
            parList.ToAdd(new SqlParameter("@motivo", motivo));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_VISITANTES_GUARDAR", parList));
        }
        public string ValidarUsuarioEncargado(int idUsuario, int idEscuela)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idUsuario", idUsuario));
            parList.ToAdd(new SqlParameter("@idEscuela", idEscuela));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_ENCARGADO_SELECT_ALUMNOS", parList));
        }
        public string CargarPermisosAdmin(int idUsuario)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idUsuario", idUsuario));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_USUARIO_SELECT_PERMISOS", parList));
        }
        public string GuardarCustomerId(int idUsuario, string CustomerID)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idUsuario", idUsuario));
            parList.ToAdd(new SqlParameter("@CustomerID", CustomerID));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_USUARIO_GUARDAR_CUSTOMERID", parList));
        }
        public string CargarUsuarioContrasena(int idEscuela, int idUsuario)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idEscuela", idEscuela));
            parList.ToAdd(new SqlParameter("@idUsuario", idUsuario));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_USUARIO_SELECT_USUARIOS_CONTRASENA", parList));
        }
        public string CargarIdPeactree(int idUsuario)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idUsuario", idUsuario));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_USUARIO_SELECT_USUARIOS_PEACTREE", parList));
        }
        public string ObtenerUsuario(int idEscuela, int idRol, int Activo)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idEscuela", idEscuela));
            parList.ToAdd(new SqlParameter("@idRol", idRol));
            parList.ToAdd(new SqlParameter("@Activo", Activo));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_SELECT_USUARIOS_POR_ROL", parList));
        }
        public string SendEncuesta(int idEncuestaUsuario, int idUsuario, string json)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idEncuestaUsuario", idEncuestaUsuario));
            parList.ToAdd(new SqlParameter("@idUsuario", idUsuario));
            parList.ToAdd(new SqlParameter("@json", json));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_ENCUESTA_INSERT_ENCUESTA_USUARIO", parList));
        }
        public string ObtenerEncuestaPreguntas(int idEncuestaUsuario)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idEncuestaUsuario", idEncuestaUsuario));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_ENCUESTA_SELECT_ENCUESTA_DETALLE", parList));
        }
        public string ObtenerItemEncuestaUsuario(int idUsuario)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idUsuario", idUsuario));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_ENCUESTA_SELECT_ENCUESTA_USUARIO", parList));
        }
       
        public string UpdateCedula(int idEscuela, int idUsuario, string Cedula)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idEscuela", idEscuela));
            parList.ToAdd(new SqlParameter("@idUsuario", idUsuario));
            parList.ToAdd(new SqlParameter("@Cedula", Cedula));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_USUARIO_UPDATE_CEDULA", parList));
        }
        public string Savemoneda(int idEscuela, int idTipoMoneda)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idEscuela", idEscuela));
            parList.ToAdd(new SqlParameter("@idTipoMoneda", idTipoMoneda));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_FACTURA_GUARDAR_MONEDA_ESCUELA", parList));
        }
        public string CallParametrosMoneda(int idEscuela)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idEscuela", idEscuela));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_FACTURA_MONEDA_ESCUELA", parList));
        }
        public string CallMoneda()
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_FACTURA_TIPO_MONEDA", parList));
        }
        public string CallContaUsuarios(int idEscuela)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idEscuela", idEscuela));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_USUARIO_SELECT_CONTADORES", parList));
        }        
             public string OBTENER_USUARIOS_ELIMINADOS(int idEscuela)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idEscuela", idEscuela));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_ALUMNO_ELIMINADOS", parList));
        }
        public string OBTENER_USUARIOS_BUSQUEDA(int idEscuela, int rol, int idSubnivel, int Estatus)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idEscuela", idEscuela));
            parList.ToAdd(new SqlParameter("@idSubnivel", idSubnivel));
            parList.ToAdd(new SqlParameter("@idRol", rol));
            parList.ToAdd(new SqlParameter("@Estatus", Estatus));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_SELECT_USUARIOS_ADMIN", parList));
        }
        public string GetAlumnosCustomerID(int idEscuela)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idEscuela", idEscuela));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_SELECT_ALUMNOS_ESCUELA", parList));
        }
        public static string ObtenerAuditoria(int idEscuela, int pageIndex, int PageSize, int idUsuario)
        {
            Utility ut = new Utility();
            string query = "[PRC_SELECT_BITACORA]";
            SqlCommand cmd = new SqlCommand(query);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@idEscuela", idEscuela);
            cmd.Parameters.AddWithValue("@pageIndex", pageIndex);
            cmd.Parameters.AddWithValue("@PageSize", PageSize);
            cmd.Parameters.AddWithValue("@idUsuario", idUsuario);
            return ut.GetData(cmd, pageIndex, PageSize).GetXml();
        }
        public static string ObtenerDocentes(int idEscuela, int pageIndex, string nombre, bool Activo) // Usado por  Yaser rodriguez en el modulo de busqueda de docentes
        {
            Utility ut = new Utility();
            string query = "[PRC_SELECT_DOCENTES]";
            SqlCommand cmd = new SqlCommand(query);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@idEscuela", idEscuela);
            cmd.Parameters.AddWithValue("@NombreCompleto", nombre);
            cmd.Parameters.AddWithValue("@Activo", Activo);
            cmd.Parameters.AddWithValue("@PageIndex", pageIndex);
            cmd.Parameters.AddWithValue("@PageSize", 7);
            return ut.GetData(cmd, pageIndex, 7).GetXml();

        }
        
             public string GuardarComentariosCrm(int idReporte, string Comentarios, int idUsuario, DateTime Fecha)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idReporte", idReporte)).
                ToAdd(new SqlParameter("@Comentarios", Comentarios)).
            ToAdd(new SqlParameter("@idUsuario", idUsuario)).
            ToAdd(new SqlParameter("@Fecha", Fecha));
            return Utility.jsonSql(Connection.Instance.ExecuteReader("PRC_UPDATE_COMENTARIOS_CRM", parList));
        }
        public string GuardarLanguaje(int idUsuario, string Languaje)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idUsuario", idUsuario)).
            ToAdd(new SqlParameter("@Languaje", Languaje));
            return Utility.jsonSql(Connection.Instance.ExecuteReader("PRC_GUARDAR_LENGUAJE_USUARIO", parList));
        }        
            public string GetReporteCrmId(int idReporte)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idReporte", idReporte));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_SELECT_REPORTES_CRM_ID", parList));
        }
        
            public string GuardarReporteID(int idReporte, int Estatus, int idUsuario)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idReporte", idReporte));
            parList.ToAdd(new SqlParameter("@Estatus", Estatus));
            parList.ToAdd(new SqlParameter("@idUsuarioSoporte", idUsuario));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_UPDATE_REPORTE_CRM_ID", parList));
        }
        public string GetReporteCrm(int idEscuela,int idUsuario,  int idRolA)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idEscuela", idEscuela));
            parList.ToAdd(new SqlParameter("@idRolA", idRolA));
            parList.ToAdd(new SqlParameter("@idUsuario", idUsuario));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_SELECT_REPORTES_CRM", parList));
        }
        public string GuardarReporteCrm(int idEscuela, int idUsuario, string Asunto, string Descripcion, DateTime Fecha)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idEscuela", idEscuela));
            parList.ToAdd(new SqlParameter("@idUsuario", idUsuario));
            parList.ToAdd(new SqlParameter("@Asunto", Asunto));
            parList.ToAdd(new SqlParameter("@Descripcion", Descripcion));
            parList.ToAdd(new SqlParameter("@Fecha", Fecha));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_UPDATE_REPORTE_CRM", parList));
        }
        public string GetUsuariosCrm(int idEscuela)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idEscuela", idEscuela));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_SELECT_USUARIOS_TODOS", parList));
        }
        public string Encuesta(int idUsuario, string respuesta)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idUsuario", idUsuario));
            parList.ToAdd(new SqlParameter("@respuesta", respuesta));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_ENCUESTA", parList));
        }
        
            public string EliminarFacturas(int idEscuela, int idFactura)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idEscuela", idEscuela));
            parList.ToAdd(new SqlParameter("@idFactura", idFactura));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_UPDATE_FACTURA", parList));
        }
            public string Obtenerfacturas(int idEscuela, int idUsuario)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idEscuela", idEscuela));
            parList.ToAdd(new SqlParameter("@idUsuario", idUsuario));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_FACTURA_LISTA_SELECT", parList));
        }
        public string Get_Languaje_Usuario(int idUsuario)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idUsuario", idUsuario));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_SELECT_USUARIOS_LANGUAJE", parList));
        }
        public List<response> UpdateStatus(int idUsuario, bool status, string Accion)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idUsuario", idUsuario)).
            ToAdd(new SqlParameter("@Activo", status)).
            ToAdd(new SqlParameter("@Accion", Accion));
            IDataReader dt = Connection.Instance.ExecuteReader("PRC_UPDATE_USUARIOS_STATUS", parList);
            List<response> resp = new List<response>();
            while (dt.Read())
            {
                resp.Add(new response { text = dt.GetValue(0).ToString(), Activo = Convert.ToBoolean(dt.GetValue(1)) });
            }
            return resp;
        }
        public string UpdateUsuario(int idEscuela, string usuario, string contrasena, int idUsuario, string Email)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idUsuario", idUsuario)).
            ToAdd(new SqlParameter("@usuario", usuario)).
             ToAdd(new SqlParameter("@idEscuela", idEscuela)).
            ToAdd(new SqlParameter("@contrasena", contrasena)).
            ToAdd(new SqlParameter("@Email", Email));
            return Utility.jsonSql(Connection.Instance.ExecuteReader("PRC_UPDATE_USUARIO", parList));
        }

        public string GuardarNombreFotoDePerfil(int idUsuario, string NombreArchivo)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idUsuario", idUsuario)).
            ToAdd(new SqlParameter("@NombreArchivo", NombreArchivo));
            IDataReader dt = Connection.Instance.ExecuteReader("PRC_GUARDAR_NOMBRE_FOTOPERFIL", parList);
            return "";
        }

        public string BuscarGuardarNombreFotoDePerfil(int idUsuario)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idUsuario", idUsuario));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_SELECT_FOTOPERFIL", parList));
        }
        public string ConsultarHorario(int idUsuario, int idRol)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idUsuario", idUsuario));
            parList.ToAdd(new SqlParameter("@idRol", idRol));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_SELECT_HORARIO", parList));
        }

        public string SELECT_JSONHORARIOSxUSUARIO(int idEscuela, int idUsuario, int idRol, int idPeriodo, int idSubNivel)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idEscuela", idEscuela));
            parList.ToAdd(new SqlParameter("@idUsuario", idUsuario));
            parList.ToAdd(new SqlParameter("@idRol", idRol));
            parList.ToAdd(new SqlParameter("@idPeriodo", idPeriodo));
            parList.ToAdd(new SqlParameter("@idSubNivel", idSubNivel));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_SELECT_JSONHORARIOSxUSUARIO", parList));
        }
        public String CallNotasAlumos(int idEscuela, int idPeriodo, int idUsuario)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idEscuela", idEscuela));
            parList.ToAdd(new SqlParameter("@idPeriodo", idPeriodo));
            parList.ToAdd(new SqlParameter("@idUsuario", idUsuario));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_ALUMNOS_SELECT_NOTAS", parList));
        }
        public String ConsultarInformaciondeNotas(int idPeriodo, int idAsignatura, int idUsuario)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idPeriodo", idPeriodo));
            parList.ToAdd(new SqlParameter("@idAsignatura", idAsignatura));
            parList.ToAdd(new SqlParameter("@idUsuario", idUsuario));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_SELECT_AGENDA_NOTA", parList));
        }

        public string buscarHorariosDocente(int idUsuario, int idPeriodo)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idUsuario", idUsuario));
            parList.ToAdd(new SqlParameter("@idPeriodo", idPeriodo));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_SELECT_HORARIOS_DOCENTE", parList));
        }

    }
}