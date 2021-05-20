using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Globalization;
using System.Net;
using System.Net.Mail;
using System.Text.RegularExpressions;

namespace SapiensProject.Models.Entities
{
    public class Mensajes
    {
        public int id { get; set; }
        public string asunto { get; set; }
        public string cuerpo { get; set; }
        public string fecha { get; set; }
        public string remitente { get; set; }
        public string para { get; set; }
        public Boolean leido { get; set; }

        public string enviarCorreo(string Subject, string TipoCorreo, int idMensaje, string mensaje, string para)
        {            
            return "";
        }
        /*
        public string enviarRubrica(int idAgenda, int idUsuario, string TextHtml)
        {
            string resp = "ERROR";
            Mensajes msg = new Mensajes();            
                    msg = msg.obtenerDatosRubrica(idAgenda, idUsuario, TextHtml);
                    resp = msg.enviar(msg.asunto, msg.para, msg.cuerpo);
            return resp;
        }
        private string enviar(string subject, string toList, string body)
        {
            string FromMail = ConfigurationManager.AppSettings["FromMail"];
            string Password = ConfigurationManager.AppSettings["Password"];
            using (System.Net.Mail.MailMessage MailSetup = new System.Net.Mail.MailMessage())
            {
                try
                {
                    MailSetup.Subject = subject;
                    MailSetup.From = new System.Net.Mail.MailAddress(ConfigurationManager.AppSettings["FromMail"]);
                    MailSetup.IsBodyHtml = true;
                    string[] emailList = toList.Split(',');
                    int cantidadEmail = 0;
                    foreach (string email in emailList)
                    {
                        if (email_bien_escrito(email))
                        {
                            MailSetup.Bcc.Add(email);
                            cantidadEmail++;
                        }
                    }
                    if (email_bien_escrito("notificaciones@academicanet.com"))
                        MailSetup.Bcc.Add("notificaciones@academicanet.com");
                    MailSetup.Body = body;                    
                    System.Net.Mail.SmtpClient SMTP = new System.Net.Mail.SmtpClient();
                    SMTP.UseDefaultCredentials = false;
                    SMTP.Port = Convert.ToInt32(ConfigurationManager.AppSettings["Port"]);
                    SMTP.Host = ConfigurationManager.AppSettings["Host"];
                    SMTP.EnableSsl = true;
                    SMTP.Credentials = new System.Net.NetworkCredential(FromMail, Password);
                    if (cantidadEmail > 0)
                    {
                        SMTP.Send(MailSetup);
                    }
                }
                catch (SmtpFailedRecipientsException ex)
                {
                    return "ERROR > " + ex.Message;
                }
                catch (SmtpException ex)
                {
                    return "ERROR > " + ex.Message + " / User > " + FromMail + " / Pwd > " + Password;
                }
                catch (Exception ex)
                {
                    return "ERROR > " + ex.Message + " / " + ex.StackTrace;
                }
            }
            return "ENVIADO";
        }*/
        private Boolean email_bien_escrito(string email)
        {
            return Regex.IsMatch(email, @"\A(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)\Z", RegexOptions.IgnoreCase);
        }
        private Attachment getFileFromUrl(string attachmentURL)
        {
            System.IO.Stream stream = new System.Net.WebClient().OpenRead(attachmentURL);
            Attachment attachement = new Attachment(stream, System.IO.Path.GetFileName(attachmentURL));
            return attachement;
        }
        public Mensajes obtenerDatosMensaje(int idMensaje)
        {
            Connection cnn = new Connection();
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.Add(new SqlParameter("@idMensaje", idMensaje));
            IDataReader datos = cnn.ExecuteReader("PRC_SERVICES_MENSAJE_PARA", parList);
            Mensajes msg = new Mensajes();
            while (datos.Read())
            {
                msg.fecha = datos["fecha"].ToString();
                msg.asunto = datos["asunto"].ToString();
                msg.cuerpo = datos["cuerpo"].ToString();
                msg.para = datos["para"].ToString();
            }
            return msg;
        }
        public Mensajes obtenerDatosRubrica(int idAgenda, int idUsuario, string TextHtml)
        {
            Connection cnn = new Connection();
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.Add(new SqlParameter("@idAgenda", idAgenda));
            parList.Add(new SqlParameter("@idUsuario", idUsuario));
            parList.Add(new SqlParameter("@TextHtml", TextHtml));
            IDataReader datos = cnn.ExecuteReader("PRC_SERVICES_RUBRICA_PARA", parList);
            Mensajes msg = new Mensajes();
            while (datos.Read())
            {
                msg.fecha = datos["fecha"].ToString();
                msg.asunto = datos["asunto"].ToString();
                msg.cuerpo = datos["cuerpo"].ToString();
                msg.para = datos["para"].ToString();
            }
            return msg;
        }
        public Mensajes obtenerDatosAsistencia(int idMensaje)
        {
            Connection cnn = new Connection();
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.Add(new SqlParameter("@idAlumnoAsistencia", idMensaje));
            IDataReader datos = cnn.ExecuteReader("PRC_SERVICES_ASISTENCIA_PARA", parList);
            Mensajes msg = new Mensajes();
            while (datos.Read())
            {
                msg.asunto = datos["asunto"].ToString();
                msg.cuerpo = datos["cuerpo"].ToString();
                msg.para = datos["para"].ToString();
            }
            return msg;
        }
        
        public string obtenerReporteAsistencia(int idEscuela, int idSubnivel, int idPeriodo)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idEscuela", idEscuela));
            parList.ToAdd(new SqlParameter("@idSubnivel", idSubnivel));
            parList.ToAdd(new SqlParameter("@idPeriodo", idPeriodo));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_ASISTENCIA_REPORTE", parList));
        }
        public string obtenerMensajes(DateTime Fecha, int idUsuario, int idMensaje, string Modulo)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idUsuario", idUsuario));
            parList.ToAdd(new SqlParameter("@idMensaje", idMensaje));
            parList.ToAdd(new SqlParameter("@Modulo", Modulo));
            parList.ToAdd(new SqlParameter("@Fecha", Fecha));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_SELECT_MENSAJE_LEIDO", parList));
        }
        public string SaveFirmas(int idUsuario, string FirmaText)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idUsuario", idUsuario));
            parList.ToAdd(new SqlParameter("@FirmaText", FirmaText));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_MENSAJES_UPDATE_FIRMAS", parList));
        }
        public string CallFirmasGet(int idUsuario)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idUsuario", idUsuario));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_MENSAJES_SELECT_FIRMAS", parList));
        }
        public string DeleteMsg(int idUsuario, string xmlData, int idOpcion, int idOpcionDelete, DateTime FechaAccion)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idUsuario", idUsuario));
            parList.ToAdd(new SqlParameter("@xmlData", xmlData));
            parList.ToAdd(new SqlParameter("@idOpcion", idOpcion));
            parList.ToAdd(new SqlParameter("@idOpcionDelete", idOpcionDelete));
            parList.ToAdd(new SqlParameter("@FechaAccion", FechaAccion));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_DELETE_MENSAJE", parList));
        }
        public string obtenerMensajes_enviados(int idEscuela, int idUsuario)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idEscuela", idEscuela));
            parList.ToAdd(new SqlParameter("@idUsuario", idUsuario));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_SELECT_MENSAJES_ENVIADOS", parList));
        }
        public string obtenerMensajes_master(int idEscuela, int idUsuario, int Activo)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idEscuela", idEscuela));
            parList.ToAdd(new SqlParameter("@idUsuario", idUsuario));
            parList.ToAdd(new SqlParameter("@Activo", Activo));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_SELECT_MENSAJES", parList));
        }
        public string BuscarMensajes_master(DateTime Fecha, int idUsuario, int idMensaje, int idOpcion, int TipoMensaje)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idUsuario", idUsuario));
            parList.ToAdd(new SqlParameter("@idMensaje", idMensaje));
            parList.ToAdd(new SqlParameter("@idOpcion", idOpcion));
            parList.ToAdd(new SqlParameter("@TipoMensaje", TipoMensaje));
            parList.ToAdd(new SqlParameter("@Fecha", Fecha));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_MENSAJE_BUSCAR", parList));
        }
        public string getMensagetNotificacionesSinLer(int idUsuario)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idUsuario", idUsuario));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_SELECT_NOTIFICACION_SIN_LEER", parList));
        }
        public string GetContenidoNotificacionesSinLeer(int idUsuario, int Leido)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idUsuario", idUsuario));
            parList.ToAdd(new SqlParameter("@Leido", Leido));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_SELECT_CONTENIDO_NOTIFICACION_SIN_LEER", parList));
        }



        public string getMensajesSinLer(int idUsuario)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idUsuario", idUsuario));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_SELECT_MENSAJE_SIN_LEER", parList));
        }
        public string getContenidoMensajesSinLer(int idUsuario)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idUsuario", idUsuario));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_SELECT_CONTENIDO_MENSAJE_SIN_LEER", parList));
        }        
            public string EliminarComportamientoAlumno(int idEscuela, int id)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idEscuela", idEscuela));
            parList.ToAdd(new SqlParameter("@id", id));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_UPDATE_COMPORTAMIENTO_ACTIVO", parList));
        }
        public string EliminarAsistenciaAlumno(int idEscuela, int id)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idEscuela", idEscuela));
            parList.ToAdd(new SqlParameter("@id", id));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_UPDATE_ASISTENCIA_ACTIVO", parList));
        }

        public string getUsuariosMensajes(int idEscuela, int idMensaje, bool Leido)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idMensaje", idMensaje));
            parList.ToAdd(new SqlParameter("@idEscuela", idEscuela));
            parList.ToAdd(new SqlParameter("@Leido", Leido));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_SELECT_MENSAJE_USUARIOS", parList));
        }
    }
}