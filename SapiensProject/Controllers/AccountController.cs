using SapiensProject.Models;
using SapiensProject.Models.Entities;
using System;
using System.Data;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.Security;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;

namespace SapiensProject.Controllers
{
    public class AccountController
    {
        public Usuario currentUser = null;
        public void updatePassword(int idUsuario, string ContrasenaNueva)
        {
            AccountModel acc = new AccountModel();
            acc.updatePassword(idUsuario, ContrasenaNueva);
        }
        public bool esUsuarioValido(string nombreUsuario, string contrasena, string player_id)
        {
            try
            {
                AccountModel account = new AccountModel();
                return crearPerfilUsuario(account.getUserData(nombreUsuario, contrasena, player_id, System.DateTime.Now));
            }
            catch (Exception ex)
            {
                SapiensProject.Models.Utility.WriteErrorLog("Ocurrio un ERROR al iniciar sesión de usuario - " + ex.Message);
                return false;
            }
        }
        public bool esUsuarioValidoAplicacion(int idUsuario, int idRol)
        {
            try
            {
                AccountModel account = new AccountModel();
                return crearPerfilUsuario(account.getUserDataAplicacion(idUsuario, idRol));
            }
            catch (Exception ex)
            {
                SapiensProject.Models.Utility.WriteErrorLog("Ocurrio un ERROR al iniciar sesión de usuario - " + ex.Message);
                return false;
            }
        }
        public bool tieneAccesoaPaginaAlumno(int idEscuela,  string pagina)
        {
            try
            {
                AccountModel account = new AccountModel();
                IDataReader datos = account.tienePermisoAlumno(idEscuela, pagina);
                datos.Read();
                var permiso = (int)datos["PERMISO"];
                if (permiso == 1)
                    return true;
                else return false;
            }
            catch (Exception ex)
            {
                SapiensProject.Models.Utility.WriteErrorLog("Ocurrio un ERROR al iniciar sesión de usuario - " + ex.Message);
                return false;
            }
        }
        public bool tieneAccesoaPagina(int idUsuario, int idRol, string pagina)
        {
            try
            {
                AccountModel account = new AccountModel();
                IDataReader datos = account.tienePermiso(idUsuario, pagina);
                datos.Read();
                var permiso = (int)datos["PERMISO"];
                if (permiso == 1)
                    return true;
                else return false;
            }
            catch (Exception ex)
            {
                SapiensProject.Models.Utility.WriteErrorLog("Ocurrio un ERROR al iniciar sesión de usuario - " + ex.Message);
                return false;
            }
        }
        private bool crearPerfilUsuario(IDataReader datos)
        {
            while (datos.Read())
            {
                currentUser = new Usuario();
                currentUser.SubDominio = datos["SubDominio"].ToString();
                currentUser.idUsuario = (int)datos["idUsuario"];
                currentUser.idRol = (int)datos["idRol"];
                currentUser.nombreRol = datos["NombreRol"].ToString();
                currentUser.idEscuela = (int)datos["idEscuela"];
                currentUser.NombreUsuario = datos["NombreUsuario"].ToString();
                currentUser.Activo = (int)datos["Activo"];
                currentUser.Estatus = (int)datos["Estatus"];
                currentUser.Logo = datos["Logo"].ToString();
                currentUser.RutaModulo = datos["RutaModulo"].ToString();
                currentUser.nombreEscuela = datos["nombreEscuela"].ToString();
                currentUser.escuela_frase = datos["NombreFrase"].ToString();
                currentUser.NombreCompleto = datos["NombreCompleto"].ToString();
                currentUser.DesactivarUsuarioPorPeriodo = Convert.ToBoolean(datos["DesactivarUsuarioPorPeriodo"]);
                currentUser.DesactivarColegioPorPeriodo = Convert.ToBoolean(datos["DesactivarColegioPorPeriodo"]);
                currentUser.EstatusPeriodoPreMatriculaAlumnos = Convert.ToBoolean(datos["EstatusPeriodoPreMatriculaAlumnos"]);
                currentUser.EscuelaUsaRedSocial = Convert.ToBoolean(datos["EscuelaUsaRedSocial"]);
                currentUser.FacebookPageId = datos["FacebookPageId"].ToString();
                currentUser.Languaje = datos["Languaje"].ToString();
                currentUser.direccion = datos["direccion"].ToString();
                currentUser.TipoContabilidad = (int)datos["TipoContabilidad"];
            }
            if (currentUser == null)
            {
                return false;
            }
            else
            {
                return true;
            }
        }
        public Usuario getCurrentUser()
        {
            // crear un nuevo metodo es reutilizar el codigo
            //va a recibir la misma informacion
            //copia de getCurrentUser que si es un usuario valido 
            Usuario currUser = null;
            if (HttpContext.Current.User.Identity.IsAuthenticated)// si esta autenticado recibe el cookie
            {
                var authCookie = HttpContext.Current.Request.Cookies[FormsAuthentication.FormsCookieName];
                if (authCookie != null && authCookie.Value != null)
                {
                    FormsAuthenticationTicket authTicket = FormsAuthentication.Decrypt(authCookie.Value);
                    if (authTicket != null && authTicket.UserData != null)
                    {
                        //-->>currUser = new Usuario();
                        JavaScriptSerializer jss = new JavaScriptSerializer();
                        currUser = jss.Deserialize<Usuario>(authTicket.UserData);
                        /**
                        var tokenHandler = new JwtSecurityTokenHandler();
                        var key = System.Text.Encoding.ASCII.GetBytes("private key you want");
                        ///** 
                        var tokenDescriptor = new SecurityTokenDescriptor
                        {
                            Subject = new ClaimsIdentity(new Claim[]
                            { new Claim(ClaimTypes.Name, authTicket.UserData) }),
                            Expires = DateTime.UtcNow.AddDays(7),
                            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
                        };
                        var token = tokenHandler.CreateToken(tokenDescriptor);
                        var tokenString = tokenHandler.WriteToken(token);

                        HttpContext.Current.Session.Add("JWToken", tokenString);
                        **/
                    }
                    else
                    {
                        redirectToLoginPage();//retornar un json de error currUser, authCookie, authTicket
                    }
                }
                else
                {
                    redirectToLoginPage();
                }
            }
            else
            {
                redirectToLoginPage();
            }
            return currUser;
        }
        public void redirectToLoginPage()
        {
            System.Web.Security.FormsAuthentication.SignOut();
            FormsAuthentication.RedirectToLoginPage();
        }

        public void redirectToNotAccessPage()
        {
            HttpContext.Current.Response.Redirect("/Views/Admin/NoPermiso", true);
        }
        public void redirectToNotAccessPageAlumno()
        {
            HttpContext.Current.Response.Redirect("/Views/Student/NoPermiso", true);
        }
        public static bool IsSessionTimedOut()
        {
            HttpContext ctx = HttpContext.Current;
            if (ctx == null)
                throw new Exception("Este método sólo se puede usar en una aplicación Web");
            //Comprobamos que haya sesión en primer lugar 
            //(por ejemplo si por ejemplo EnableSessionState=false)
            if (ctx.Session == null)
                return false;   //Si no hay sesión, no puede caducar
            //Se comprueba si se ha generado una nueva sesión en esta petición
            if (!ctx.Session.IsNewSession)
                return false;   //Si no es una nueva sesión es que no ha caducado
            HttpCookie objCookie = ctx.Request.Cookies["ASP.NET_SessionId"];
            //Esto en teoría es imposible que pase porque si hay una 
            //nueva sesión debería existir la cookie, pero lo compruebo porque
            //IsNewSession puede dar True sin ser cierto (más en el post)
            if (objCookie == null)
                return false;
            //Si hay un valor en la cookie es que hay un valor de sesión previo, pero como la sesión 
            //es nueva no debería estar, por lo que deducimos que la sesión anterior ha caducado
            if (!string.IsNullOrEmpty(objCookie.Value))
                return true;
            else
                return false;
        }
    }
}