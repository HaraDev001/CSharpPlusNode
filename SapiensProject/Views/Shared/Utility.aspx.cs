using DocumentFormat.OpenXml;
using DocumentFormat.OpenXml.Packaging;
using DocumentFormat.OpenXml.Wordprocessing;
using ExcelDataReader;
//using SapiensProject.Controllers;
using Google.Apis.Classroom.v1.Data;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using OfficeOpenXml;
using OfficeOpenXml.Style;
using SapiensProject.Controllers;
using SapiensProject.Models;
using SapiensProject.Models.Entities;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Text.RegularExpressions;
using System.Web;
using System.Web.Configuration;
using System.Web.Script.Serialization;
using System.Web.Security;
using System.Web.Services;
using System.Xml;
using Microsoft.Azure.Storage;
using Microsoft.Azure.Storage.Auth;
//using Microsoft.Azure.Storage.Shared

namespace SapiensProject.Views.Shared
{
    public partial class Utility : System.Web.UI.Page
    {
        static public string AUTH_ANT = "AUTHANT";

        private static bool esEstudiante()
        {
            AccountController acc = new AccountController();
            var usuario = acc.getCurrentUser();
            return usuario.idRol == 5;
        }


        #region General

        [WebMethod]
        public static string GetTask(int idOpcion)
        {
            AccountController account = new AccountController();
            Usuario usr = account.getCurrentUser();
            Models.Entities.Agenda stu = new Models.Entities.Agenda();
            return stu.GetEstadisticasTask(usr.idEscuela, idOpcion);
        }
        [WebMethod]
        public static string ValidarOpcionesIniciales(int idRol)
        {
            SapiensProject.Models.Entities.EscuelaMetodologia Escuela = new EscuelaMetodologia();
            AccountController account = new AccountController();
            return Escuela.ValidarOpcionesIniciales(account.getCurrentUser().idEscuela, idRol);
        }
        [WebMethod]
        public static string GetTaskActividades(int idOpcion, int idSubnivel, int idUsuario)
        {
            AccountController account = new AccountController();
            Usuario usr = account.getCurrentUser();
            Models.Entities.Agenda stu = new Models.Entities.Agenda();
            return stu.GetTaskActividad(idOpcion, idSubnivel, idUsuario);
        }
        [WebMethod]
        public static string GetBiblioteca(string Funcionalidad, int idRolA, int idUsuario)
        {
            AccountController account = new AccountController();
            Usuario usr = account.getCurrentUser();
            Models.Entities.Agenda stu = new Models.Entities.Agenda();
            if (idRolA == 4)
                idUsuario = account.getCurrentUser().idUsuario;
            else if (idRolA == 5)
                idUsuario = account.getCurrentUser().idUsuario;
            return stu.GetBiblioteca(usr.idEscuela, Funcionalidad, idRolA, idUsuario);
        }
        [WebMethod]
        public static string recuperarNotaMinMax(int idSubnivel)
        {
            Especialidad esp = new Especialidad();
            return esp.ObtenerEspAsig_(idSubnivel);
        }

        [WebMethod]
        public static string CambioC(string c1)
        {
            AccountController acc = new AccountController();
            acc.updatePassword(acc.getCurrentUser().idUsuario, c1);
            AccountController account = new AccountController();
            return "http://academicanet.com";
        }

        [WebMethod]
        public static string CerrarSesionSistema(string param)
        {
            //if (esEstudiante()) return "#";
            AccountController account = new AccountController();
            HttpCookie cookieAdmin = new HttpCookie(AUTH_ANT, "");      //elimino cookie admin para evitar confusion
            cookieAdmin.Expires = DateTime.Now.AddDays(-1);
            HttpContext.Current.Response.Cookies.Add(cookieAdmin);
            FormsAuthentication.SignOut();
            //string s = account.getCurrentUser().SubDominio;
            return "/";
        }

        [WebMethod]
        public static string ObtenerPeriodoLibretas(int idSubnivel, int idUsuario, int idRol)
        {
            Models.Entities.Periodo per = new Models.Entities.Periodo();
            AccountController account = new AccountController();
            Usuario usr = account.getCurrentUser();
            if (idUsuario == -1)
            {
                idUsuario = usr.idUsuario;
                idRol = usr.idRol;
            }
            return per.ObtenerPeriodoLibretas(usr.idEscuela, idUsuario, idRol, idSubnivel);
        }

        [WebMethod]
        public static string GrupoObtenerAsignatura(int idSubnivel, int idRolA)
        {
            Asignatura asig = new Asignatura();
            AccountController account = new AccountController();
            Usuario usr = account.getCurrentUser();
            return asig.GrupoObtenerAsignatura(idSubnivel, 1, usr.idUsuario, idRolA);
        }

        [WebMethod]
        public static string GetMensajesSinLeer()
        {
            Mensajes mail = new Mensajes();
            AccountController account = new AccountController();
            return mail.getMensajesSinLer(account.getCurrentUser().idUsuario);
        }
        [WebMethod]
        public static string GetNotificacionesSinLeer()
        {
            Mensajes mail = new Mensajes();
            AccountController account = new AccountController();
            return mail.getMensagetNotificacionesSinLer(account.getCurrentUser().idUsuario);
        }
        [WebMethod]
        public static string cargarDatosContactoEstudiante(int idUsuario)
        {
            Models.Entities.Proffesor prof = new Models.Entities.Proffesor();
            Usuario usr = new AccountController().getCurrentUser();
            if (idUsuario == -1)
            {
                idUsuario = usr.idUsuario;
            }
            return prof.ObtenerProfesor(idUsuario, usr.idEscuela);
        }
        [WebMethod]
        public static string GetLanguaje()
        {
            Usuario us = new Usuario();
            AccountController account = new AccountController();
            return us.Get_Languaje_Usuario(account.getCurrentUser().idUsuario);
        }

        [WebMethod]
        public static string ValidarUsuarioDesacPer()
        {
            AccountController account = new AccountController();
            Models.Entities.Proffesor prof = new Models.Entities.Proffesor();
            return prof.ValidarDocenteDesacPer(account.getCurrentUser().idUsuario, account.getCurrentUser().idEscuela);
        }
        #endregion

        #region Archivos
        public static string GetSAS()
        {
            SharedAccessAccountPolicy adHocSASpolicy2 = new SharedAccessAccountPolicy()
            {
                // When the start time for the SAS is omitted, the start time is assumed to be the time when the storage service receives the request.
                // Omitting the start time for a SAS that is effective immediately helps to avoid clock skew.
                SharedAccessExpiryTime = DateTime.Now.AddDays(1),
                Protocols = SharedAccessProtocol.HttpsOnly,
                Services = SharedAccessAccountServices.Blob,    //indispensable
                ResourceTypes = SharedAccessAccountResourceTypes.Service | SharedAccessAccountResourceTypes.Object | SharedAccessAccountResourceTypes.Container,
                Permissions = SharedAccessAccountPermissions.Read | SharedAccessAccountPermissions.Write | SharedAccessAccountPermissions.Create | SharedAccessAccountPermissions.Update | SharedAccessAccountPermissions.List
            };
            string myAccountName = WebConfigurationManager.AppSettings["StorageAccount"];
            string myAccountKey = WebConfigurationManager.AppSettings["StorageAccountKey"];
            StorageCredentials storageCredentials = new StorageCredentials(myAccountName, myAccountKey);

            CloudStorageAccount csa = new CloudStorageAccount(storageCredentials, true);
            string sas = csa.GetSharedAccessSignature(adHocSASpolicy2);
            return sas;
        }
        [WebMethod]
        public static string CargarAdjuntosTaskAlumno(int idTask, int idUsuario)
        {
            AccountModel account_ = new AccountModel();
            AccountController account = new AccountController();
            return account_.CargarAdjuntosAula(account.getCurrentUser().idEscuela, idTask, idUsuario);
        }
        [WebMethod]
        public static string GuardarArchivosAulaAlumno(string archivos, int idTask, DateTime Fecha, int idUsuario)
        {
            AccountModel account_ = new AccountModel();
            AccountController account = new AccountController();
            if (idUsuario == -1)
                idUsuario = account.getCurrentUser().idUsuario;
            return account_.GuardarArchivosAulaAlumno(account.getCurrentUser().idEscuela, archivos, idTask, idUsuario, Fecha);
        }
        [WebMethod]
        public static string GuardarArchivos(string archivos, int idRelacionado, string funcionalidad, int idUsuario, DateTime Fecha)
        {
            AccountModel account_ = new AccountModel();
            AccountController account = new AccountController();
            if (idUsuario == -1)
                idUsuario = account.getCurrentUser().idUsuario;
            return account_.guardarArchivos(archivos, idRelacionado, funcionalidad, idUsuario, Fecha);
        }
        [WebMethod]
        public static string LeerArchivos(int idRelacionado, string funcionalidad)
        {
            AccountModel account = new AccountModel();
            return account.leerArchivos(idRelacionado, funcionalidad);
        }

        #endregion

        #region Task 
        [WebMethod]
        public static string SaveComentario(int idTask, string Comentario, DateTime Fecha)
        {
            Models.Entities.Proffesor prof = new Models.Entities.Proffesor();
            AccountController account = new AccountController();
            return prof.SaveComentarios(account.getCurrentUser().idUsuario, idTask, Comentario, Fecha);
        }
        [WebMethod]
        public static string EliminarComentario(int id)
        {
            Models.Entities.Proffesor prof = new Models.Entities.Proffesor();
            AccountController account = new AccountController();
            return prof.EliminarComentario(account.getCurrentUser().idEscuela, id);
        }
        [WebMethod]
        public static string ReadComentariosCRM(int idReporte)
        {
            Models.Entities.Proffesor prof = new Models.Entities.Proffesor();
            AccountController account = new AccountController();
            return prof.ReadComentariosCRM(account.getCurrentUser().idEscuela, idReporte);
        }
        [WebMethod]
        public static string ReadComentarios(int idTask)
        {
            Models.Entities.Proffesor prof = new Models.Entities.Proffesor();
            AccountController account = new AccountController();
            return prof.ReadComentarios(account.getCurrentUser().idEscuela, idTask);
        }

        [WebMethod]
        public static string CargarSubNivelTask(int idRol, int idPeriodo, int idSubnivel, int idUsuario, int DesactivarPrescolar)
        {
            Models.Entities.Asignatura prof = new Models.Entities.Asignatura();
            AccountController account = new AccountController();
            if (idUsuario == -1)
                idUsuario = account.getCurrentUser().idUsuario;
            return prof.ObtenerSubNivelTask(idUsuario, account.getCurrentUser().idEscuela, idRol, idPeriodo, idSubnivel, DesactivarPrescolar);
        }
        [WebMethod]
        public static string CargarNivelTask(bool DesactivarUsuarioPeriodo, int idRol, int idPeriodo, int idSubnivel)
        {
            Models.Entities.Asignatura prof = new Models.Entities.Asignatura();
            AccountController account = new AccountController();
            return prof.ObtenerNivelTask(account.getCurrentUser().idUsuario, DesactivarUsuarioPeriodo, idRol, idPeriodo, idSubnivel);
        }
        [WebMethod]
        public static string SaveTaskAlumno(int idTask, string Archivo)
        {
            Models.Entities.Proffesor prof = new Models.Entities.Proffesor();
            AccountController account = new AccountController();
            return prof.SaveTaskAlumno(account.getCurrentUser().idUsuario, idTask, Archivo);
        }
        [WebMethod]
        public static string SELECT_SUBNIVEL_ALUMNO(int idRol)
        {
            Models.Entities.Proffesor prof = new Models.Entities.Proffesor();
            AccountController account = new AccountController();
            return prof.SELECT_SUBNIVEL_ALUMNO(account.getCurrentUser().idUsuario, idRol);
        }
        [WebMethod]
        public static string SaveTask(int Puntos, DateTime FechaRegistro, int EsConFechaEntrega, string tema, string descripcion, bool DesactivarUsuarioPorPeriodo, int idSubnivel, int idAsignatura, string FechaAgenda, string FechaEntrega, int idOpcion, int id, int idPeriodo, int idTipoTask, string TipoNota, int SubTipoNota, int PermitirTareaTarde)
        {
            Models.Entities.Proffesor prof = new Models.Entities.Proffesor();
            AccountController account = new AccountController();
            DateTime _FechaEntrega = DateTime.ParseExact(FechaEntrega, "dd/MM/yyyy HH:mm", new CultureInfo("en-US"));
            DateTime _FechaAgenda = DateTime.ParseExact(FechaAgenda, "dd/MM/yyyy HH:mm", new CultureInfo("en-US"));
            return prof.SaveTask(Puntos, FechaRegistro, account.getCurrentUser().idEscuela, EsConFechaEntrega, account.getCurrentUser().idUsuario, DesactivarUsuarioPorPeriodo, idSubnivel, idAsignatura, tema, descripcion, _FechaAgenda, _FechaEntrega, idOpcion, id, idPeriodo, idTipoTask, TipoNota, SubTipoNota, PermitirTareaTarde);
        }
        [WebMethod]
        public static string ActualizarTask(int idTask, string tema, string descripcion, int EsConFechaEntrega, string FechaAgenda, string FechaEntrega, DateTime FechaRegistro, int idSubnivel, int idAsignatura, string TipoNota, int SubTipoNota, int PermitirTareaTarde)
        {
            Models.Entities.Proffesor prof = new Models.Entities.Proffesor();
            AccountController account = new AccountController();
            DateTime _FechaEntrega = DateTime.ParseExact(FechaEntrega, "dd/MM/yyyy HH:mm", new CultureInfo("en-US"));
            DateTime _FechaAgenda = DateTime.ParseExact(FechaAgenda, "dd/MM/yyyy HH:mm", new CultureInfo("en-US"));
            return prof.ActualizarTask(account.getCurrentUser().idEscuela, idTask, EsConFechaEntrega, _FechaEntrega, _FechaAgenda, tema, descripcion, FechaRegistro, idSubnivel, idAsignatura, TipoNota, SubTipoNota, PermitirTareaTarde);
        }
        [WebMethod]
        public static string _InsertComentPrivadosAlumnos(int idTask, int idUsuarioPrivado, string Comentario, DateTime FechaRegistro)
        {
            Models.Entities.Proffesor prof = new Models.Entities.Proffesor();
            AccountController account = new AccountController();
            if (idUsuarioPrivado == -1)
                idUsuarioPrivado = account.getCurrentUser().idUsuario;
            return prof._InsertComentPrivados(idTask, idUsuarioPrivado, account.getCurrentUser().idUsuario, Comentario, FechaRegistro);
        }
        [WebMethod]
        public static string getSalones(int idPeriodo)
        {
            Models.Entities.Student prof = new Models.Entities.Student();
            return prof.ObetenerSalones(idPeriodo);
        }
        [WebMethod]
        public static string GetSalonesVirtual(int idUsuario)
        {
            Models.Entities.Proffesor prof = new Models.Entities.Proffesor();
            AccountController account = new AccountController();
            if (idUsuario == -1)
            {
                idUsuario = account.getCurrentUser().idUsuario;
            }
            return prof._GetSalonesVirtual(account.getCurrentUser().idEscuela, idUsuario);
        }

        [WebMethod]
        public static string GetSalonVirtualProfesorSubnivel(int id, int idTipo)
        {
            Models.Entities.Proffesor prof = new Models.Entities.Proffesor();
            AccountController account = new AccountController();
            var a = prof.GetSalonVirtualSubnivelMeetingId(account.getCurrentUser().idEscuela, id, idTipo);
            if (a != "")
            {
                var meetingDetails = prof.meetingUrl(a);
                return meetingDetails;
            }
            return prof.GetSalonVirtualSubnivel(account.getCurrentUser().idEscuela, id);
        }
        [WebMethod]
        public static string GetcomentariosPrivados(int idTask, int idUsuarioPrivado, DateTime FechaAccion)
        {
            Models.Entities.Proffesor prof = new Models.Entities.Proffesor();
            AccountController account = new AccountController();
            if (idUsuarioPrivado == -1)
                idUsuarioPrivado = account.getCurrentUser().idUsuario;
            return prof._CargarComentPrivados(idTask, idUsuarioPrivado, account.getCurrentUser().idUsuario, FechaAccion);
        }
        [WebMethod]
        public static string GetActividadesestTask(int idUsuario)
        {
            Models.Entities.Proffesor prof = new Models.Entities.Proffesor();
            AccountController account = new AccountController();
            return prof._CargarActTaskEst(account.getCurrentUser().idEscuela, idUsuario);
        }
        [WebMethod]
        public static string CargarAlumnosTask(int idTask)
        {
            Models.Entities.Proffesor prof = new Models.Entities.Proffesor();
            AccountController account = new AccountController();
            return prof._CargarAlumTask(account.getCurrentUser().idEscuela, idTask);
        }
        [WebMethod]
        public static string DelArchivoAlumno(int idArchivo)
        {
            Models.Entities.Proffesor prof = new Models.Entities.Proffesor();
            AccountController account = new AccountController();
            return prof._deletearchivofileupload(account.getCurrentUser().idEscuela, idArchivo);
        }
        [WebMethod]
        public static string ObtenerTaskId(int idTask, DateTime Fecha, int idUsuario, int idRolA)
        {
            Models.Entities.Proffesor prof = new Models.Entities.Proffesor();
            AccountController account = new AccountController();
            if (idUsuario == -1)
            {
                idUsuario = account.getCurrentUser().idUsuario;
            }
            return prof.ObtenerTaskId(account.getCurrentUser().idEscuela, idTask, idUsuario, Fecha, idRolA);
        }
        [WebMethod]
        public static string iCargarTask(int idSubnivel, int idAsignatura, int idPeriodo, int Estatus, int idTask, int idOpcion, int idUsuario, int idRol)
        {
            Models.Entities.Proffesor prof = new Models.Entities.Proffesor();
            AccountController account = new AccountController();
            if (idUsuario == -1)
                idUsuario = account.getCurrentUser().idUsuario;
            return prof._CargarTask(account.getCurrentUser().idEscuela, idSubnivel, idAsignatura, idPeriodo, Estatus, idRol, idUsuario, idTask, idOpcion);
        }
        [WebMethod]
        public static string iEliminarTask(int id)
        {
            Models.Entities.Proffesor prof = new Models.Entities.Proffesor();
            AccountController account = new AccountController();
            return prof._EliminarTask(account.getCurrentUser().idEscuela, account.getCurrentUser().idUsuario, id);
        }
        [WebMethod]
        public static string GetArchivoAlumno(int idTask, int idUsuario)
        {
            Models.Entities.Proffesor prof = new Models.Entities.Proffesor();
            AccountController account = new AccountController();
            if (idUsuario == -1)
                idUsuario = account.getCurrentUser().idUsuario;
            return prof.GetArchivoAlumno(idUsuario, idTask);
        }
        #endregion

        #region examen

        [WebMethod]
        public static string actualizarNotasTask(int idTask, string xmlNotas, DateTime FechaAccion)
        {
            AccountController account = new AccountController();
            NotaModel tablaNotas = new NotaModel();
            tablaNotas.actualizarNotasTablaTask(account.getCurrentUser().idEscuela, account.getCurrentUser().idUsuario, idTask, xmlNotas, FechaAccion);
            return "1";
        }
        [WebMethod]
        public static string GuardarExamen(string examen, DateTime FechaRegistro, int idTask, int entregado, int idUsuario)
        {
            AccountController account = new AccountController();
            Models.Entities.Examen ex = new Models.Entities.Examen();
            Usuario usr = account.getCurrentUser();
            var idRol = usr.idRol;
            if (idUsuario == -1)    //usar usuario logueado
            {
                idUsuario = usr.idUsuario;
                return ex.SaveExamen(examen, idUsuario, FechaRegistro, idTask, entregado);
            }
            if (idRol == 1 || idRol == 4)   //sólo si es admin o profesor, usar idUsuario enviado
            {
                return ex.SaveExamen(examen, idUsuario, FechaRegistro, idTask, entregado);
            }
            return "";
        }
        [WebMethod]
        public static string LeerExamen(int id) //posiblemente NO USADO en ningun lado
        {
            Models.Entities.Examen ex = new Models.Entities.Examen();
            return ex.ReadExamen(id);
        }
        [WebMethod]
        public static string LeerExamenFromTask(int idTask)
        {
            AccountController account = new AccountController();
            Usuario usr = account.getCurrentUser();
            int idusuario = usr.idUsuario;
            Models.Entities.Examen ex = new Models.Entities.Examen();
            return ex.ReadExamenFromTask(idTask, idusuario);
        }
        [WebMethod]
        public static string TaskParaFromTask(int idTask)
        {
            AccountController account = new AccountController();
            Usuario usr = account.getCurrentUser();
            int idusuario = usr.idUsuario;
            Models.Entities.Examen ex = new Models.Entities.Examen();
            return ex.TaskParaFromTask(idTask, idusuario);
        }
        [WebMethod]
        public static string AlumnosFromTask(int idTask)
        {
            AccountController account = new AccountController();
            Usuario usr = account.getCurrentUser();
            int idusuario = usr.idUsuario;
            Models.Entities.Examen ex = new Models.Entities.Examen();
            return ex.AlumnosFromTask(usr.idEscuela, idTask, idusuario);
        }

        #endregion
    }
}