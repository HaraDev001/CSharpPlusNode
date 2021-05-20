
using System;
using System.Web.Http;
using System.Web.Routing;
using System.Web.Mvc;

namespace SapiensProject
{
    public class Global : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            // WARNING - Not compatible with attribute routing.
            AreaRegistration.RegisterAllAreas();

            WebApiConfig.Register(GlobalConfiguration.Configuration);
            //GlobalConfiguration.Configure(WebApiConfig.Register);   // first one    
            RouteConfig.RegisterRoutes(RouteTable.Routes);    //second one
            GlobalConfiguration.Configuration.EnsureInitialized();
        }

        protected void Session_Start(object sender, EventArgs e)
        {

        }

        protected void Application_BeginRequest(object sender, EventArgs e)
        {

        }

        protected void Application_AuthenticateRequest(object sender, EventArgs e)
        {

        }

        protected void Application_Error(object sender, EventArgs e)
        {

        }

        protected void Session_End(object sender, EventArgs e)
        {

        }

        protected void Application_End(object sender, EventArgs e)
        {

        }

        static Int32 _Global_opcion;
        public static Int32 Global_opcion
        {
            get
            {
                return _Global_opcion;
            }
            set
            {
                _Global_opcion = value;
            }
        }
        static Int32 _Global_idEscuela;
        public static Int32 Global_idEscuela
        {
            get
            {
                return _Global_idEscuela;
            }
            set
            {
                _Global_idEscuela = value;
            }
        }

        static string _GlobalParametro;
        public static string GlobalParametro
        {
            get
            {
                return _GlobalParametro;
            }
            set
            {
                _GlobalParametro = value;
            }
        }
        static string _Global_Titulo;
        public static string Global_Titulo
        {
            get
            {
                return _Global_Titulo;
            }
            set
            {
                _Global_Titulo = value;
            }
        }
        static string _Global_Titulo1;
        public static string Global_Titulo1
        {
            get
            {
                return _Global_Titulo1;
            }
            set
            {
                _Global_Titulo1 = value;
            }
        }
        static string _Global_Titulo2;
        public static string Global_Titulo2
        {
            get
            {
                return _Global_Titulo2;
            }
            set
            {
                _Global_Titulo2 = value;
            }
        }
        static string _Global_Titulo3;
        public static string Global_Titulo3
        {
            get
            {
                return _Global_Titulo3;
            }
            set
            {
                _Global_Titulo3 = value;
            }
        }
        static string _Global_Titulo4;
        public static string Global_Titulo4
        {
            get
            {
                return _Global_Titulo4;
            }
            set
            {
                _Global_Titulo4 = value;
            }
        }
        static string _Global_Logo;
        public static string Global_Logo
        {
            get
            {
                return _Global_Logo;
            }
            set
            {
                _Global_Logo = value;
            }
        }
        static string _Global_nombre_alumno;
        public static string Global_nombre_alumno
        {
            get
            {
                return _Global_nombre_alumno;
            }
            set
            {
                _Global_nombre_alumno = value;
            }
        }
        static string _Global_nombre_apellido;
        public static string Global_nombre_apellido
        {
            get
            {
                return _Global_nombre_apellido;
            }
            set
            {
                _Global_nombre_apellido = value;
            }
        }

        static string _Global_especialidad;
        public static string Global_especialidad
        {
            get
            {
                return _Global_especialidad;
            }
            set
            {
                _Global_especialidad = value;
            }
        }
        static string _Global_piedepagina;
        public static string Global_piedepagina
        {
            get
            {
                return _Global_piedepagina;
            }
            set
            {
                _Global_piedepagina = value;
            }
        }
        static string _Global_cedula;
        public static string Global_cedula
        {
            get
            {
                return _Global_cedula;
            }
            set
            {
                _Global_cedula = value;
            }
        }
    }
}