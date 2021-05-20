using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using RestSharp;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Net;

namespace SapiensProject.Models.Entities
{
    public class Proffesor
    {
        public int idOpcion { get; set; }
        public int TipoContratacion { get; set; }
        public int oContAct { get; set; }
        public int oContDesac { get; set; }
        public int cantidad_metodologias { get; set; }
        public string NombreDocente { get; set; }
        public string nombre { get; set; }
        public string apellido { get; set; }
        public string Cedula { get; set; }
        public int idRol { get; set; }
        public string fechaNacimiento { get; set; }
        public string FechaIngreso { get; set; }
        public string TituloDocente { get; set; }
        public string nombreRol { get; set; }
        public int idEscuela { get; set; }
        public string nombreEscuela { get; set; }
        public string NombreUsuario { get; set; }
        public string direccion { get; set; }
        public string email { get; set; }
        public string Telefono { get; set; }
        public string Celular { get; set; }
        public string RutaModulo { get; set; }
        public bool Activo { get; set; }
        public string NombreCompleto { get; set; }
        public bool DesactivarUsuarioPorPeriodo { get; set; }
        public int consejero { get; set; }
        public string observacion { get; set; }
        public string sexo { get; set; }
        public List<response> Insert(int idEscuela, string Nombre, string Apellido, string Cedula, string FechaNacimiento, string Direccion, string telefono1, string telefono2, string email, string observacion, string titulo, string fecha_inicio)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idEscuela", idEscuela)).
            ToAdd(new SqlParameter("@Nombre", Nombre)).
            ToAdd(new SqlParameter("@Apellido", Apellido)).
            ToAdd(new SqlParameter("@Cedula", Cedula)).
            ToAdd(new SqlParameter("@FechaNacimiento", FechaNacimiento)).
            ToAdd(new SqlParameter("@Direccion", Direccion)).
            ToAdd(new SqlParameter("@telefono1", telefono1)).
            ToAdd(new SqlParameter("@telefono2", telefono2)).
            ToAdd(new SqlParameter("@email", email)).
            ToAdd(new SqlParameter("@observacion", observacion)).
            ToAdd(new SqlParameter("@titulo", titulo)).
            ToAdd(new SqlParameter("@fecha_inicio", fecha_inicio));
            IDataReader dt = Connection.Instance.ExecuteReader("PRC_INSERT_DOCENTE", parList);
            List<response> resp = new List<response>();
            while (dt.Read())
            {
                resp.Add(new response { id_usuario = dt.GetValue(0).ToString(), text = dt.GetValue(1).ToString() });
            }
            return resp;
        }
        public string UpdateUsuario(int idRol, string json, int idUsuario, int idEscuela, 
            //string Nombre, string Apellido, string Cedula, string FechaNacimiento, string Direccion, string Email, string telefono1, string observacion, string titulo, DateTime fecha_inicio, string sexo, int origenpropio, int TipoContratacion, 
            int origenpropio, DateTime FechaAccion)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idUsuario", idUsuario)).
            ToAdd(new SqlParameter("@idEscuela", idEscuela)).
            ToAdd(new SqlParameter("@idRol", idRol)).
             ToAdd(new SqlParameter("@json", json)).
            //ToAdd(new SqlParameter("@Nombre", Nombre)).
            //ToAdd(new SqlParameter("@Apellido", Apellido)).
            //ToAdd(new SqlParameter("@Cedula", Cedula)).
            //ToAdd(new SqlParameter("@FechaNacimiento", FechaNacimiento)).
            //ToAdd(new SqlParameter("@Direccion", Direccion)).
            //ToAdd(new SqlParameter("@Email", Email)).
            //ToAdd(new SqlParameter("@telefono1", telefono1)).
            //ToAdd(new SqlParameter("@observacion", observacion)).
            //ToAdd(new SqlParameter("@titulo", titulo)).
            //ToAdd(new SqlParameter("@fecha_inicio", fecha_inicio)).
            //ToAdd(new SqlParameter("@idOpcion", idOpcion)).
            //ToAdd(new SqlParameter("@sexo", sexo)).
            ToAdd(new SqlParameter("@origenpropio", origenpropio)).
            //ToAdd(new SqlParameter("@TipoContratacion", TipoContratacion)).
            ToAdd(new SqlParameter("@FechaAccion", FechaAccion));
            return Utility.jsonSql((IDataReader)Connection.Instance.ExecuteReader("PRC_SAVE_USUARIO", parList));
        }
        public string SaveTaskAlumno(int idUsuario, int idTask, string Archivo)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idUsuario", idUsuario)).
            ToAdd(new SqlParameter("@Archivo", Archivo)).
            ToAdd(new SqlParameter("@idTask", idTask));
            return Utility.jsonSql((IDataReader)Connection.Instance.ExecuteReader("PRC_SAVE_TASK_ALUMNO", parList));
        }        
        public string ObtenerasistenciaAlumnoDetalle(int idEscuela, int idUsuario, int idT)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idEscuela", idEscuela));
            parList.ToAdd(new SqlParameter("@idUsuario", idUsuario));
            parList.ToAdd(new SqlParameter("@idT", idT));
            return Utility.jsonSql((IDataReader)Connection.Instance.ExecuteReader("PRC_STUDENT_SELECT_ASISTENCIA_DETALLE", parList));
        }
        public string ObtenerasistenciaAlumno(int idEscuela, int idUsuario)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idEscuela", idEscuela));
            parList.ToAdd(new SqlParameter("@idUsuario", idUsuario));
            return Utility.jsonSql((IDataReader)Connection.Instance.ExecuteReader("PRC_STUDENT_SELECT_ASISTENCIA", parList));
        }
        public string ValidarConsejeria(int idUsuario)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idUsuario", idUsuario));
            return Utility.jsonSql((IDataReader)Connection.Instance.ExecuteReader("PRC_USUARIO_VALIDAR_CONSEJERIA", parList));
        }
        public string ValidarDocenteDesacPer(int idUsuario, int idEscuela)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idUsuario", idUsuario));
            parList.ToAdd(new SqlParameter("@idEscuela", idEscuela));
            return Utility.jsonSql((IDataReader)Connection.Instance.ExecuteReader("PRC_VALIDATE_DOCENTE_DesactivarUsuarioPorPeriodo", parList));
        }
        public string SaveComentarios(int idUsuario, int idTask, string Comentario, DateTime Fecha)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idUsuario", idUsuario)).
            ToAdd(new SqlParameter("@idTask", idTask)).
             ToAdd(new SqlParameter("@Comentario", Comentario)).
            ToAdd(new SqlParameter("@Fecha", Fecha));
            return Utility.jsonSql((IDataReader)Connection.Instance.ExecuteReader("PRC_SAVE_TASK_COMENTARIO", parList));
        }
        public string EliminarComentario(int idEscuela, int id)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idEscuela", idEscuela));
            parList.ToAdd(new SqlParameter("@id", id));
            return Utility.jsonSql((IDataReader)Connection.Instance.ExecuteReader("PRC_UPDATE_TASK_COMENTARIO", parList));
        }
        public string ReadComentariosCRM(int idEscuela, int idReporte)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idEscuela", idEscuela));
            parList.ToAdd(new SqlParameter("@idReporte", idReporte));
            return Utility.jsonSql((IDataReader)Connection.Instance.ExecuteReader("PRC_READ_COMENTARIOS_CRM", parList));
        }
        public string ReadComentarios(int idEscuela, int idTask)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idEscuela", idEscuela));
            parList.ToAdd(new SqlParameter("@idTask", idTask));
            return Utility.jsonSql((IDataReader)Connection.Instance.ExecuteReader("PRC_READ_TASK_COMENTARIO", parList));
        }
        public string ActualizarTask(int idEscuela, int idTask,int EsConFechaEntrega, DateTime FechaEntrega, DateTime FechaAgenda, string tema, string descripcion, DateTime FechaRegistro, int idSubnivel, int idAsignatura, string TipoNota, int SubTipoNota, int PermitirTareaTarde)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idEscuela", idEscuela)).
                ToAdd(new SqlParameter("@idTask", idTask)).
                ToAdd(new SqlParameter("@EsConFechaEntrega", EsConFechaEntrega)).
                ToAdd(new SqlParameter("@Fecha_Entrega", FechaEntrega)).
            ToAdd(new SqlParameter("@Fecha_Agenda", FechaAgenda)).
            ToAdd(new SqlParameter("@tema", tema)).
            ToAdd(new SqlParameter("@descripcion", descripcion)).
            ToAdd(new SqlParameter("@FechaRegistro", FechaRegistro)).
            ToAdd(new SqlParameter("@TipoNota", TipoNota)).
            ToAdd(new SqlParameter("@idSubnivel", idSubnivel)).
            ToAdd(new SqlParameter("@idAsignatura", idAsignatura)).
            ToAdd(new SqlParameter("@SubTipoNota", SubTipoNota)).
            ToAdd(new SqlParameter("@PermitirTareaTarde", PermitirTareaTarde));
            return Utility.jsonSql((IDataReader)Connection.Instance.ExecuteReader("PRC_TASK_UPDATE", parList));
        }
        public string SaveTask(int Puntos, DateTime FechaRegistro, int idEscuela, int EsConFechaEntrega, int idUsuario, bool DesactivarUsuarioPorPeriodo, int idSubnivel, int idAsignatura, string tema, string descripcion, DateTime FechaAgenda, DateTime FechaEntrega,  int idOpcion, int id, int idPeriodo, int idTipoTask, string TipoNota, int SubTipoNota, int PermitirTareaTarde)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idEscuela", idEscuela)).
                ToAdd(new SqlParameter("@idUsuario", idUsuario)).
                ToAdd(new SqlParameter("@DesactivarUsuarioPorPeriodo", DesactivarUsuarioPorPeriodo)).
                ToAdd(new SqlParameter("@idSubnivel", idSubnivel)).
                ToAdd(new SqlParameter("@idAsignatura", idAsignatura)).
                ToAdd(new SqlParameter("@tema", tema)).
                ToAdd(new SqlParameter("@descripcion", descripcion)).
                ToAdd(new SqlParameter("@Fecha_Agenda", FechaAgenda)).
                ToAdd(new SqlParameter("@Fecha_Entrega", FechaEntrega)).
                ToAdd(new SqlParameter("@idOpcion", idOpcion)).
                ToAdd(new SqlParameter("@id", id)).
                ToAdd(new SqlParameter("@idPeriodo", idPeriodo)).
                ToAdd(new SqlParameter("@EsConFechaEntrega", EsConFechaEntrega)).
                ToAdd(new SqlParameter("@FechaRegistro", FechaRegistro)).
                ToAdd(new SqlParameter("@idTipoTask", idTipoTask)).
                ToAdd(new SqlParameter("@TipoNota", TipoNota)).
                ToAdd(new SqlParameter("@SubTipoNota", SubTipoNota)).
                 ToAdd(new SqlParameter("@PermitirTareaTarde", PermitirTareaTarde)).
                ToAdd(new SqlParameter("@Puntos", Puntos));
            return Utility.jsonSql((IDataReader)Connection.Instance.ExecuteReader("PRC_SAVE_TASK", parList));
        }
        public string GetArchivoAlumno(int idUsuario, int idTask)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idUsuario", idUsuario));
            parList.ToAdd(new SqlParameter("@idTask", idTask));
            return Utility.jsonSql((IDataReader)Connection.Instance.ExecuteReader("PRC_AULA_ALUMNO_ARCHIVO", parList));
        }
        public string SELECT_SUBNIVEL_ALUMNO(int idUsuario, int idRol)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idUsuario", idUsuario));
            parList.ToAdd(new SqlParameter("@idRol", idRol));
            return Utility.jsonSql((IDataReader)Connection.Instance.ExecuteReader("PRC_SELECT_SUBNIVEL_USUARIO", parList));
        }
        public string _EliminarTask(int idEscuela, int idUsuario, int id)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idEscuela", idEscuela));
            parList.ToAdd(new SqlParameter("@id", id));
            parList.ToAdd(new SqlParameter("@idUsuario", idUsuario));
            parList.Add(new SqlParameter("@FechaAccion", DateTime.Now));
            return Utility.jsonSql((IDataReader)Connection.Instance.ExecuteReader("PRC_DELETE_TASK", parList));
        }        
            public string _deletearchivofileupload(int idEscuela, int idArchivo)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idEscuela", idEscuela));
            parList.ToAdd(new SqlParameter("@idArchivo", idArchivo));
            return Utility.jsonSql((IDataReader)Connection.Instance.ExecuteReader("PRC_UPDATE_ARCHIVO_ACTIVO", parList));
        }
        public string ObtenerTaskId(int idEscuela, int idTask, int idUsuario, DateTime Fecha, int idRolA)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idEscuela", idEscuela));
            parList.ToAdd(new SqlParameter("@idTask", idTask));
            parList.ToAdd(new SqlParameter("@idUsuario", idUsuario));
            parList.ToAdd(new SqlParameter("@Fecha", Fecha));
            parList.ToAdd(new SqlParameter("@idRolA", idRolA));
            return Utility.jsonSql((IDataReader)Connection.Instance.ExecuteReader("PRC_AULAVIRTUAL_SELECT_ID", parList));
        }
        public string _CargarTask(int idEscuela, int idSubnivel, int idAsignatura, int idPeriodo, int Estatus, int idRol, int idUsuario, int idTask, int idOpcion)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idEscuela", idEscuela));
            parList.ToAdd(new SqlParameter("@idSubnivel", idSubnivel));
            parList.ToAdd(new SqlParameter("@idAsignatura", idAsignatura));
            parList.ToAdd(new SqlParameter("@idPeriodo", idPeriodo));
            parList.ToAdd(new SqlParameter("@Estatus", Estatus));
            parList.ToAdd(new SqlParameter("@idRol", idRol));
            parList.ToAdd(new SqlParameter("@idUsuario", idUsuario));
            parList.ToAdd(new SqlParameter("@idTask", idTask));
            parList.ToAdd(new SqlParameter("@idOpcion", idOpcion));
            return Utility.jsonSql((IDataReader)Connection.Instance.ExecuteReader("PRC_AULAVIRTUAL_SELECT", parList));
        }        
            public string _CargarComentPrivados(int idTask, int idUsuarioPrivado, int idUsuario, DateTime FechaAccion)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idTask", idTask));
            parList.ToAdd(new SqlParameter("@idUsuarioPrivado", idUsuarioPrivado));
            parList.ToAdd(new SqlParameter("@idUsuario", idUsuario));
            parList.ToAdd(new SqlParameter("@FechaAccion", FechaAccion));
            return Utility.jsonSql((IDataReader)Connection.Instance.ExecuteReader("PRC_AULA_SELECT_COMENTARIOS_PRIVADOS", parList));
        }
             public string _GetSalonesVirtual(int idEscuela, int idUsuario)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idEscuela", idEscuela));
            parList.ToAdd(new SqlParameter("@idUsuario", idUsuario));
            return Utility.jsonSql((IDataReader)Connection.Instance.ExecuteReader("PRC_SALONES_VIRTUALES_ALUMNOS", parList));
        }

        //token academica zoom
        string token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOm51bGwsImlzcyI6IjlmeW5iMWNZVHhpdXd4b1lfVEtRckEiLCJleHAiOjE3MTQ1MDMyNDAsImlhdCI6MTU4ODI2NzU1Nn0.ZuT1Jk020114ZZnI2z-V8k7qExd-rpQ9wV4hae4Mmio";
        public string meetingUrl(string meetingId)
        {
            ServicePointManager.SecurityProtocol = SecurityProtocolType.Ssl3 | SecurityProtocolType.Tls12;
            var client = new RestClient("https://api.zoom.us/v2/meetings/" + meetingId);
            var request = new RestRequest(Method.GET);
            request.AddHeader("content-type", "application/json");
            request.AddHeader("authorization", "Bearer " + token);
            IRestResponse response = client.Execute(request);
            var contenidojson = response.Content;
            //var a = getReportZoomMeeting(meetingId);
            return contenidojson;
        }
            
        public string getReportZoomParticipants(string id)
        {
            ServicePointManager.SecurityProtocol = SecurityProtocolType.Ssl3 | SecurityProtocolType.Tls12;
            var client = new RestClient("https://api.zoom.us/v2/report/meetings/"+id+"/participants?page_size=100");
           var request = new RestRequest(Method.GET);
            request.AddHeader("content-type", "application/json");
            request.AddHeader("authorization", "Bearer " + token);
            //request.AddJsonBody("{\"from\": \"2019-08-15\",\"to\": \"2021-09-13\"}");
            IRestResponse response = client.Execute(request);
            var contenidojson = response.Content;
            return contenidojson;
        }
        public string getReportZoomMeeting(string cuentazoom)
        {
            ServicePointManager.SecurityProtocol = SecurityProtocolType.Ssl3 | SecurityProtocolType.Tls12;
            var client = new RestClient("https://api.zoom.us/v2/report/users/"+ cuentazoom+"/meetings?type=past&page_size=30&from=2021-03-15");
           var request = new RestRequest(Method.GET);
            request.AddHeader("content-type", "application/json");
            request.AddHeader("authorization", "Bearer " + token);
            //request.AddJsonBody("{\"from\": \"2019-08-15\",\"to\": \"2021-09-13\"}");
            IRestResponse response = client.Execute(request);
            var contenidojson = response.Content;
            return contenidojson;
        }
        public string getNewMeeting(string cuentaZoom, string tokenparticular)
        {
            if (EsCuentaAcademica(cuentaZoom))
            {
                tokenparticular = token;
            }
                ServicePointManager.SecurityProtocol = SecurityProtocolType.Ssl3 | SecurityProtocolType.Tls12;
            var client = new RestClient("https://api.zoom.us/v2/users/" + cuentaZoom + "/meetings");
            var request = new RestRequest(Method.POST);
            request.AddHeader("content-type", "application/json");
            request.AddHeader("authorization", "Bearer " + tokenparticular);
            request.AddJsonBody("{\"topic\": \"Clases virtuales desde la Plataforma Académica.\",\"duration\": 300, \"settings\": { \"mute_upon_entry\": true,\"waiting_room\": true,\"use_pmi\": true, \"host_video\": true,  \"participant_video\": true,  \"auto_recording\": \"none\", \"approval_type\": 2  }}");
            IRestResponse response = client.Execute(request);
            var contenido = response.Content;
            return contenido;
        }
        public string hostUrlUpdated(string cuentaZoom, string meetingId, string tokenparticular)
        {
            if (EsCuentaAcademica(cuentaZoom))
            {
                tokenparticular = token;
            }
            ServicePointManager.SecurityProtocol = SecurityProtocolType.Ssl3 | SecurityProtocolType.Tls12;
            var client = new RestClient("https://api.zoom.us/v2/meetings/" + meetingId);
            var request = new RestRequest(Method.GET);
            request.AddHeader("content-type", "application/json");
            request.AddHeader("authorization", "Bearer " + tokenparticular);
            IRestResponse response = client.Execute(request);
            var contenidojson = response.Content;
            return contenidojson;
        }

        public string getMe(string token)
        {
            ServicePointManager.SecurityProtocol = SecurityProtocolType.Ssl3 | SecurityProtocolType.Tls12;
            var client = new RestClient("https://api.zoom.us/v2/users/me");
            var request = new RestRequest(Method.GET);
            //request.AddHeader("content-type", "application/json");
            request.AddHeader("authorization", "Bearer " + token);
            //request.AddJsonBody("{\"topic\": \"Clases virtuales desde la Plataforma Académica.\",\"duration\": 300, \"settings\": { \"mute_upon_entry\": true,\"waiting_room\": true,\"use_pmi\": true, \"host_video\": true,  \"participant_video\": true,  \"auto_recording\": \"none\", \"approval_type\": 2  }}");
            IRestResponse response = client.Execute(request);
            var contenido = response.Content;
            return contenido;
        }

        public string DeleteCuentaZoom(int id, int idEscuela)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@id", id));
            parList.ToAdd(new SqlParameter("@idEscuela", idEscuela));
            return Utility.jsonSql((IDataReader)Connection.Instance.ExecuteReader("PRC_DELETE_CTA_ZOOM", parList));
        }
        public string SaveCuentaZoom(int idCuentaZoom, string cuenta, int cuentaacademica, string jsontokens, string token, string refreshtoken, int idEscuela, string descripcion)
        {
            int idcuentazoom = 0;
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@id", idCuentaZoom));
            parList.ToAdd(new SqlParameter("@cuenta", cuenta));
            parList.ToAdd(new SqlParameter("@cuentaacademica", cuentaacademica));
            parList.ToAdd(new SqlParameter("@jsontokens", jsontokens));
            parList.ToAdd(new SqlParameter("@token", token));
            parList.ToAdd(new SqlParameter("@refreshtoken", refreshtoken));
            parList.ToAdd(new SqlParameter("@idEscuela", idEscuela));
            parList.ToAdd(new SqlParameter("@idcuentazoom", @idcuentazoom));
            parList.ToAdd(new SqlParameter("@descripcion", descripcion));
            return Utility.jsonSql((IDataReader)Connection.Instance.ExecuteReader("PRC_SAVE_CTA_ZOOM", parList));
        }
        public string ReadCuentaZoom(int idEscuela)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idEscuela", idEscuela));
            return Utility.jsonSql((IDataReader)Connection.Instance.ExecuteReader("PRC_READ_CTA_ZOOM", parList));
        }
        public string ExisteCuentaZoom(string cuenta)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@cuenta", cuenta));
            return Utility.jsonSql((IDataReader)Connection.Instance.ExecuteReader("PRC_EXISTE_CTA_ZOOM", parList));
        }
        public string SaveMeetingZoom(string cuenta, string meetingId, string urlinvitado, int idEscuela)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@cuenta", cuenta));
            parList.ToAdd(new SqlParameter("@meetingId", meetingId));
            parList.ToAdd(new SqlParameter("@urlinvitado", urlinvitado));
            parList.ToAdd(new SqlParameter("@idEscuela", idEscuela));
            return Utility.jsonSql((IDataReader)Connection.Instance.ExecuteReader("PRC_SAVE_MEETING_ZOOM", parList));
        }
        public bool EsCuentaAcademica(string cuenta)
        {
            if (
                cuenta.Contains("@colinasdelascumbres.com") || 
                cuenta.Contains("@scalaschools.com") ||  
                cuenta.Contains("@gmail.com") || 
                cuenta.Contains("@jardindeinfanciatiapatty.com") ||
                cuenta.Contains("@myteacheronline.page") ||
                cuenta.Contains("@hotmail.com")
                )
            {
                return true;
            }
            else return false;
        }
        public string SaveCuentaZoomRelacional(int idCuentaZoom, int idRelacional, string funcionalidad, int idEscuela)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idCuentaZoom", idCuentaZoom));
            parList.ToAdd(new SqlParameter("@idRelacional", idRelacional));
            parList.ToAdd(new SqlParameter("@funcionalidad", funcionalidad));
            parList.ToAdd(new SqlParameter("@idEscuela", idEscuela));
            return Utility.jsonSql((IDataReader)Connection.Instance.ExecuteReader("PRC_SAVE_CUENTA_ZOOM_RELACIONAL", parList));
        }
        public string ReadCuentaZoomRelacional(int idRelacional, string funcionalidad, int idEscuela)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idRelacional", idRelacional));
            parList.ToAdd(new SqlParameter("@funcionalidad", funcionalidad));
            parList.ToAdd(new SqlParameter("@idEscuela", idEscuela));
            return Utility.jsonSql((IDataReader)Connection.Instance.ExecuteReader("PRC_READ_CUENTA_ZOOM_RELACIONAL", parList));
        }
        public string GetSalonVirtualSubnivelMeetingId(int idEscuela, int id, int idTipo)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idEscuela", idEscuela));
            parList.ToAdd(new SqlParameter("@id", id));
            parList.ToAdd(new SqlParameter("@idTipo", idTipo));
            return Utility.jsonSql((IDataReader)Connection.Instance.ExecuteReader("PRC_SALON_VIRTUAL_MEETINGID", parList));
        }
        public string GetSalonVirtualEscuelaMeetingId(int idEscuela)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idEscuela", idEscuela));
            return Utility.jsonSql((IDataReader)Connection.Instance.ExecuteReader("PRC_SALON__ESCUELA_VIRTUAL_MEETINGID", parList));
        }
        public string GuardarCuentaZoom(int idEscuela, int idSubnivel, string idZoom, string UrlSalonvirtual, string idCuentaZoom)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idEscuela", idEscuela));
            parList.ToAdd(new SqlParameter("@idSubnivel", idSubnivel));
            parList.ToAdd(new SqlParameter("@idZoom", idZoom));
            parList.ToAdd(new SqlParameter("@UrlSalonvirtual", UrlSalonvirtual));
            parList.ToAdd(new SqlParameter("@idCuentaZoom", idCuentaZoom));
            return Utility.jsonSql((IDataReader)Connection.Instance.ExecuteReader("PRC_SALON_VIRTUAL_GRUPO_SAVE", parList));
        }
        public string GuardarCuentaZoomEscuela(int idEscuela, string idZoom, string UrlSalonvirtual, string idCuentaZoom, int idTipo)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idEscuela", idEscuela));
            parList.ToAdd(new SqlParameter("@idZoom", idZoom));
            parList.ToAdd(new SqlParameter("@UrlSalonvirtual", UrlSalonvirtual));
            parList.ToAdd(new SqlParameter("@idCuentaZoom", idCuentaZoom));
            parList.ToAdd(new SqlParameter("@idTipo", idTipo));
            return Utility.jsonSql((IDataReader)Connection.Instance.ExecuteReader("PRC_SALON_VIRTUAL_ESCUELA_SAVE", parList));
        }
        public string GetSalonVirtualSubnivel(int idEscuela,int idSubnivel)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idEscuela", idEscuela));
            parList.ToAdd(new SqlParameter("@idSubnivel", idSubnivel));
            return Utility.jsonSql((IDataReader)Connection.Instance.ExecuteReader("PRC_SALON_VIRTUAL_GRUPO", parList));
        }
        public string GetSalonVirtualEscuela(int idEscuela, int idTipo)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idEscuela", idEscuela));
            parList.ToAdd(new SqlParameter("@idTipo", idTipo));
            return Utility.jsonSql((IDataReader)Connection.Instance.ExecuteReader("PRC_SALON_VIRTUAL_ESCUELA", parList));
        }
        public string _InsertComentPrivados(int idTask, int idUsuarioPrivado, int idUsuarioEscribe,  string Comentario, DateTime FechaRegistro)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idTask", idTask));
            parList.ToAdd(new SqlParameter("@idUsuarioPrivado", idUsuarioPrivado));
            parList.ToAdd(new SqlParameter("@idUsuarioEscribe", idUsuarioEscribe));
            parList.ToAdd(new SqlParameter("@Comentario", Comentario));
            parList.ToAdd(new SqlParameter("@FechaRegistro", FechaRegistro));
            return Utility.jsonSql((IDataReader)Connection.Instance.ExecuteReader("PRC_AULA_SELECT_COMENTARIOS_PRIVADOS_ALUMNO", parList));
        }
            public string _CargarActTaskEst(int idEscuela, int idUsuario)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idEscuela", idEscuela));
            parList.ToAdd(new SqlParameter("@idUsuario", idUsuario));
            return Utility.jsonSql((IDataReader)Connection.Instance.ExecuteReader("PRC_AULA_ALUMNOS_COMPLETADOS", parList));
        }
        public string _CargarAlumTask(int idEscuela, int idTask)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idEscuela", idEscuela));
            parList.ToAdd(new SqlParameter("@idTask", idTask));
            return Utility.jsonSql((IDataReader)Connection.Instance.ExecuteReader("PRC_SELECT_ALUMNOS_TASK", parList));
        }
        public string UpdateConsejero(int idUsuario, int idSubnivel)
        {
            string text = "";
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idUsuario", idUsuario)).
                ToAdd(new SqlParameter("@idSubnivel", idSubnivel));
            IDataReader dt = Connection.Instance.ExecuteReader("PRC_UPDATE_CONSEJERO_GRUPO", parList);
            while (dt.Read())
            {
                text = dt.GetValue(0).ToString();
            }
            return text;
        }
        public string ObtenerNacionalidades()
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_SELECT_NACIONALIDADES", parList));
        }
        public string ObtenerProfesor(int idUsuario, int escuela)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idUsuario", idUsuario));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_SELECT_DOCENTE_INFORMACION", parList));
        }
        public string Insert_Asignatura_Educador(int idSubnivel, int idUsuarioConsejero)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idSubnivel", idSubnivel)).// idUsuario, idPeriodo, idAsignatura
            ToAdd(new SqlParameter("@idUsuarioConsejero", idUsuarioConsejero));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_INSERT_DOCENTE_ASIGNATURA", parList));
        }
        public string Insert_Matricula_LAboral_Pre(int tipo, int idUsuario, string xmlData, int idPeriodo)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@tipo", tipo)).
            ToAdd(new SqlParameter("@idUsuario", idUsuario)).
            ToAdd(new SqlParameter("@idPeriodo", idPeriodo)).
            ToAdd(new SqlParameter("@xmlData", xmlData));
            return Utility.jsonSql((IDataReader)Connection.Instance.ExecuteReader("PRC_GUARDAR_PRE_MATRICULA_LABORAL", parList));
        }
        public string ObtenerMetodologia(int escuela)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idEscuela", escuela));
            return Utility.jsonSql((IDataReader)Connection.Instance.ExecuteReader("PRC_SELECT_METODOLOGIA_ESCUELA", parList));
        }
        public string ObtenerMetodologia(int idEscuela, int idEducador)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idEscuela", idEscuela));
            parList.ToAdd(new SqlParameter("@idEducador", idEducador));
            return Utility.jsonSql((IDataReader)Connection.Instance.ExecuteReader("PRC_SELECT_METODOLOGIA_ESCUELA_EDUCADOR", parList));
        }

        public string BuscarTodosLosDocentes(int idEscuela)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idEscuela", idEscuela));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_SELECT_ALL_DOCENTES", parList));
        }

    }
}