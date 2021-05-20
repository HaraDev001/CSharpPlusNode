using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;

namespace SapiensProject.Models.Entities
{
    public class response
    {
        public string text { get; set; }
        public string id_usuario { get; set; }
        public bool Activo { get; set; }
    }
    public class response_update
    {
        public string idDesactivar { get; set; }
        public string text1 { get; set; }
    }
    public class Student
    {
        public string RedesS { get; set; }
        public int idOpcion { get; set; }
        public string PersonaAutorizada { get; set; }
        public string Cedula_PersonaAutorizada { get; set; }
        public int idAsignatura { get; set; }
        public int prematriculadas { get; set; }
        public int matriculadas { get; set; }
        public int retiradas { get; set; }
        public int incluidas { get; set; }
        public int countsubnivel { get; set; }
        public int idPeriodo { get; set; }
        public string Expediente { get; set; }
        public int matriculada { get; set; }
        public string Nota { get; set; }
        public string DescripcionActividad { get; set; }
        public string NombreTipoActividad { get; set; }
        public string FechaInicioActividad { get; set; }
        public string CedulaAcudiente { get; set; }
        public string NombreAcudiente { get; set; }
        public int total_trimestres { get; set; }
        public int id_consejero { get; set; }
        public string observaciones { get; set; }
        public string Titulo_Secundario { get; set; }
        public string nota_promedio { get; set; }
        public string Titulo_Escuela { get; set; }
        public string NombreCompleto2 { get; set; }
        public long RowNumber { get; set; }
        public int periodo { get; set; }
        public int id { get; set; }
        public int idEscuela { get; set; }
        public int idUsuario { get; set; }
        public int idTipoMetodologia { get; set; }
        public string Logo { get; set; }
        public string Nombre { get; set; }
        public string NombreEstudiante { get; set; }
        public string Apellido { get; set; }
        public bool Activo { get; set; }
        public string Cedula { get; set; }
        public string FechaNacimiento { get; set; }
        public string Direccion { get; set; }
        public int idEspecialidad { get; set; }
        public int idEspecialidad1 { get; set; }
        public int idNivel { get; set; }
        public int idSubNivel { get; set; }
        public string EmailAcudiente { get; set; }
        public string CelularAcudiente { get; set; }
        public string TelefonoAcudiente { get; set; }
        public string TipoMetodologia { get; set; }
        public string Sexo { get; set; }
        public string TipoConducta { get; set; }
        public string TipoSangre { get; set; }
        public string Celular_estudiante { get; set; }
        public string Email_estudiante { get; set; }
        public string Ocupacion1 { get; set; }
        public string Ocupacion2 { get; set; }
        public string Cedula_Acudiente2 { get; set; }
        public string NombreAcudiente2 { get; set; }
        public string EmailAcudiente2 { get; set; }
        public string EmailRecuperarPassword { get; set; }
        public string CelularAcudiente2 { get; set; }
        public string TipoAlergia { get; set; }
        public string TipoEnfermedad { get; set; }
        //Campos nuevos de estudiante matricula
        public string docente_consejero { get; set; }
        public string met_desc { get; set; }
        public string NIVELNOMBRE { get; set; }
        public string esp_desc { get; set; }
        public string niv_desc { get; set; }
        public string sub_desc { get; set; }
        public bool DesactivarUsuarioPorPeriodo { get; set; }
        public string Descripcion { get; set; }
        public string promedio { get; set; }
        public string cod_asignatura { get; set; }
        public string periodo_desc { get; set; }
        public string descripcion_trimestre { get; set; }
        public string fecha_trimestre { get; set; }
        public string color { get; set; }
        public string class_color { get; set; }
        public int PRE { get; set; }
        public int MAT { get; set; }
        public int NacionalidadAlumno { get; set; }
        public int NacionalidadAlumno1 { get; set; }
        public int NacionalidadAlumno2 { get; set; }
        public string DireccionAcudiente1 { get; set; }
        public string DireccionAcudiente2 { get; set; }
        public string CelularPersonaAutorizada { get; set; }
        public List<response> Insert(int idEscuela, string Nombre, string Apellido, string Cedula, string FechaNacimiento, int idNivel, string TipoSangre, string Sexo, string Direccion, string NombreAcudiente, string CedulaAcudiente, string EmailAcudiente, string FechaIngreso, string celular_est, string email_est, string ocupacion1, string ocupacion2, string cedula2, string nombre2, string email2, string tipo_alergia, string tipo_enf, int idSubNivel, string xmlEspecialidad, string Expediente, string txt_tel_acud_1, string txt_tel_acud_2, int Estatus)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idEscuela", idEscuela)).
            ToAdd(new SqlParameter("@Nombre", Nombre)).
            ToAdd(new SqlParameter("@Apellido", Apellido)).
            ToAdd(new SqlParameter("@Cedula", Cedula)).
            ToAdd(new SqlParameter("@FechaNacimiento", FechaNacimiento)).
            ToAdd(new SqlParameter("@idNivel", idNivel)).
            ToAdd(new SqlParameter("@TipoSangre", TipoSangre)).
            ToAdd(new SqlParameter("@Sexo", Sexo)).
            ToAdd(new SqlParameter("@Direccion", Direccion)).
            ToAdd(new SqlParameter("@NombreAcudiente", NombreAcudiente)).
            ToAdd(new SqlParameter("@CedulaAcudiente", CedulaAcudiente)).
            ToAdd(new SqlParameter("@EmailAcudiente", EmailAcudiente)).
            ToAdd(new SqlParameter("@FechaIngreso", FechaIngreso)).
            ToAdd(new SqlParameter("@celular_est", celular_est)).
            ToAdd(new SqlParameter("@email_est", email_est)).
            ToAdd(new SqlParameter("@ocupacion1", ocupacion1)).
            ToAdd(new SqlParameter("@ocupacion2", ocupacion2)).
            ToAdd(new SqlParameter("@cedula2", cedula2)).
            ToAdd(new SqlParameter("@nombre2", nombre2)).
            ToAdd(new SqlParameter("@email2", email2)).
            ToAdd(new SqlParameter("@tipo_alergia", tipo_alergia)).
            ToAdd(new SqlParameter("@tipo_enf", tipo_enf)).
            ToAdd(new SqlParameter("@idSubNivel", idSubNivel)).
            ToAdd(new SqlParameter("@xmlEspecialidad", xmlEspecialidad)).
            ToAdd(new SqlParameter("@Expediente", Expediente)).
            ToAdd(new SqlParameter("@txt_tel_acud_1", txt_tel_acud_1)).
            ToAdd(new SqlParameter("@txt_tel_acud_2", txt_tel_acud_2)).
            ToAdd(new SqlParameter("@Estatus", Estatus));
            IDataReader dt = Connection.Instance.ExecuteReader("PRC_INSERT_ESTUDIANTE", parList);
            List<response> resp = new List<response>();
            while (dt.Read())
            {
                resp.Add(new response { id_usuario = dt.GetValue(0).ToString(), text = dt.GetValue(1).ToString() });
            }
            return resp;
        }

        public List<response_update> Update(int idUsuario, int idEscuela, string Nombre, string Apellido, string Cedula, string FechaNacimiento, int idNivel, string TipoSangre, string Sexo, string Direccion, string NombreAcudiente, string CedulaAcudiente, string EmailAcudiente, string FechaIngreso, string celular_est, string email_est, string ocupacion1, string ocupacion2, string cedula2, string nombre2, string email2, string tipo_alergia, string tipo_enf, int idSubNivel, string xmlEspecialidad, string Expediente, string txt_tel_acud_1, string txt_tel_acud_2, int Estatus)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idUsuario", idUsuario)).
            ToAdd(new SqlParameter("@idEscuela", idEscuela)).
            ToAdd(new SqlParameter("@Nombre", Nombre)).
            ToAdd(new SqlParameter("@Apellido", Apellido)).
            ToAdd(new SqlParameter("@Cedula", Cedula)).
            ToAdd(new SqlParameter("@FechaNacimiento", FechaNacimiento)).
            ToAdd(new SqlParameter("@idNivel", idNivel)).
            ToAdd(new SqlParameter("@TipoSangre", TipoSangre)).
            ToAdd(new SqlParameter("@Sexo", Sexo)).
            ToAdd(new SqlParameter("@Direccion", Direccion)).
            ToAdd(new SqlParameter("@NombreAcudiente", NombreAcudiente)).
            ToAdd(new SqlParameter("@CedulaAcudiente", CedulaAcudiente)).
            ToAdd(new SqlParameter("@EmailAcudiente", EmailAcudiente)).
            ToAdd(new SqlParameter("@FechaIngreso", FechaIngreso)).
            ToAdd(new SqlParameter("@celular_est", celular_est)).
            ToAdd(new SqlParameter("@email_est", email_est)).
            ToAdd(new SqlParameter("@ocupacion1", ocupacion1)).
            ToAdd(new SqlParameter("@ocupacion2", ocupacion2)).
            ToAdd(new SqlParameter("@cedula2", cedula2)).
            ToAdd(new SqlParameter("@nombre2", nombre2)).
            ToAdd(new SqlParameter("@email2", email2)).
            ToAdd(new SqlParameter("@tipo_alergia", tipo_alergia)).
            ToAdd(new SqlParameter("@tipo_enf", tipo_enf)).
            ToAdd(new SqlParameter("@idSubNivel", idSubNivel)).
            ToAdd(new SqlParameter("@xmlEspecialidad", xmlEspecialidad)).
            ToAdd(new SqlParameter("@Expediente", Expediente)).
            ToAdd(new SqlParameter("@txt_tel_acud_1", txt_tel_acud_1)).
            ToAdd(new SqlParameter("@txt_tel_acud_2", txt_tel_acud_2)).
            ToAdd(new SqlParameter("@Estatus", Estatus));
            IDataReader dt = Connection.Instance.ExecuteReader("PRC_UPDATE_ESTUDIANTE", parList);
            List<response_update> resp = new List<response_update>();
            resp = Utility.LoadObjectsFromDataReader<response_update>(dt);

            return resp;
        }
        public string Historico_Insert_Update(int idUsuario, int idEscuela, int idAsignatura, decimal Nota)
        {
            string text = "";
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idUsuario", idUsuario)).
            ToAdd(new SqlParameter("@idEscuela", idEscuela)).
            ToAdd(new SqlParameter("@idAsignatura", idAsignatura)).
            ToAdd(new SqlParameter("@Nota", Nota));
            IDataReader dt = Connection.Instance.ExecuteReader("PRC_INSERT_UPDATE_HISTORIAL_NOTA", parList);
            while (dt.Read())
            {
                text = dt.GetValue(0).ToString();
            }
            return text;
        }
        public string ObtenerEstudiantesXEscuelaFoda(int idEscuela, int idSubnivel)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idEscuela", idEscuela));
            parList.ToAdd(new SqlParameter("@idSubnivel", idSubnivel));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_SELECT_ALUMNO_FODA", parList));
        }
        public string ObtenerEstudiantesXEscuela(int idEscuela, int idSubnivel, int Anio, int tipo)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idEscuela", idEscuela)).
            ToAdd(new SqlParameter("@idSubnivel", idSubnivel)).
            ToAdd(new SqlParameter("@Anio", Anio)).
            ToAdd(new SqlParameter("@tipo", tipo));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_SELECT_ALUMNO_CREDITOS", parList));
        }
        public string PRC_SELECT_ALUMNO_CUSTOMER(int escuela)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idEscuela", escuela));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_SELECT_ALUMNO_CUSTOMER", parList));
        }
        public string PRC_SELECT_NOMBRES_IMPORTADOS(int escuela)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idEscuela", escuela));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_SELECT_NOMBRES_IMPORTADOS", parList));
        }        
            public string GetSelectTransacion(int escuela, string Customer_ID, string @Transaction_Ref, int TipoContabilidad, int idUsuario, int idFactura)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idEscuela", escuela));
            parList.ToAdd(new SqlParameter("@Customer_ID", Customer_ID));
            parList.ToAdd(new SqlParameter("@Transaction_Ref", Transaction_Ref));
            parList.ToAdd(new SqlParameter("@TipoContabilidad", TipoContabilidad));
            parList.ToAdd(new SqlParameter("@idUsuario", idUsuario));
            parList.ToAdd(new SqlParameter("@idFactura", idFactura));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_SELECT_TRANSACION_PEACHTRE", parList));
        }
        public string PRC_UPDATE_COSTOS_NIVELES(int idEscuela, string xml)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idEscuela", idEscuela));
            parList.ToAdd(new SqlParameter("@xmlData", xml));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_UPDATE_NIVELES_COSTOS", parList));
        }
        
        public string PRC_SELECT_COSTOS_NIVELES(int idEscuela)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idEscuela", idEscuela));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_SELECT_NIVELES_COSTOS", parList));
        }
        public string PRC_SELECT_ESTADODECUENTA(int escuela, string Customer_ID, int idUsuario)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idEscuela", escuela));
            parList.ToAdd(new SqlParameter("@customerId", Customer_ID));
            parList.ToAdd(new SqlParameter("@idUsuario", idUsuario));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_SELECT_ESTADODECUENTA", parList));
        }
        public string PRC_READ_CUENTA_DESCUENTO(int idEscuela)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idEscuela", idEscuela));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_READ_CUENTA_DESCUENTO", parList));
        }

        public string SepararCupo(int idEscuela, int idUsuario, int idNivel, string Observaciones, DateTime Fecha)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idEscuela", idEscuela));
            parList.ToAdd(new SqlParameter("@idUsuario", idUsuario));
            parList.ToAdd(new SqlParameter("@idNivel", idNivel));
            parList.ToAdd(new SqlParameter("@Observaciones", Observaciones));
            parList.ToAdd(new SqlParameter("@Fecha", Fecha));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_INSERT_PREMATRICULA_GENERICO_ALUMNO", parList));
        }
        public string CallPrematricula(int idEscuela, int idNivel)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idEscuela", idEscuela));
            parList.ToAdd(new SqlParameter("@idNivel", idNivel));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_SELECT_PREMATRICULA_GENERICO", parList));
        }
        public string SavePrematricula(int idEscuela, string TxtNombre, string TxtApellido, string TxtCedula, int ddlNivel, string TxtObservaciones, int idUsuario, DateTime Fecha)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idEscuela", idEscuela));
            parList.ToAdd(new SqlParameter("@TxtNombre", TxtNombre));
            parList.ToAdd(new SqlParameter("@TxtApellido", TxtApellido));
            parList.ToAdd(new SqlParameter("@TxtCedula", TxtCedula));
            parList.ToAdd(new SqlParameter("@ddlNivel", ddlNivel));
            parList.ToAdd(new SqlParameter("@TxtObservaciones", TxtObservaciones));
            parList.ToAdd(new SqlParameter("@idUsuario", idUsuario));
            parList.ToAdd(new SqlParameter("@Fecha", Fecha));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_INSERT_PREMATRICULA_GENERICO", parList));
        }
        public string SavePrematriculaMontoPagado(int idEscuela, int idUsuario, float monto)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idEscuela", idEscuela));
            parList.ToAdd(new SqlParameter("@idUsuario", idUsuario));
            parList.ToAdd(new SqlParameter("@monto", monto));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_UPDATE_MONTO_PREMATRICULA_GENERICO", parList));
        }
        public string PRC_SAVE_CUENTA_DESCUENTO(int escuela,int id, int idOpcion,  string idCuentaDescuento, string ddlTipoCuenta)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idEscuela", escuela));
            parList.ToAdd(new SqlParameter("@id", id));
            parList.ToAdd(new SqlParameter("@idOpcion", idOpcion));
            parList.ToAdd(new SqlParameter("@idCuentaDescuento", idCuentaDescuento));
            parList.ToAdd(new SqlParameter("@ddlTipoCuenta", ddlTipoCuenta));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_SAVE_CUENTA_DESCUENTO", parList));
        }

        public string mostrargrupos(int idEscuela)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idEscuela", idEscuela));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_ALUMNO_SELECT_SUBNIVEL", parList));
        }
        public string PRC_USUARIOS_UPDATE_ESTATUS(int idEscuela, string xmlData, int idOpcion, int idSubnivel)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idEscuela", idEscuela)).
                 ToAdd(new SqlParameter("@xmlData", xmlData)).
            ToAdd(new SqlParameter("@idOpcion", idOpcion)).
            ToAdd(new SqlParameter("@idSubnivel", idSubnivel));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_USUARIOS_UPDATE_ESTATUS", parList));
        }
        public string EditarTipoConducta(int TipoConducta, int idUsuario)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@TipoConducta", TipoConducta)).
            ToAdd(new SqlParameter("@idUsuario", idUsuario));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_UPDATE_TIPOCONDUCTA", parList));
        }

        public string PRC_SELECT_MATRICULADOS(int idEscuela, int idPeriodo, int idOpcion)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idPeriodo", idPeriodo)).
                 ToAdd(new SqlParameter("@idEscuela", idEscuela)).
            ToAdd(new SqlParameter("@idOpcion", idOpcion));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_SELECT_MATRICULADOS", parList));
        }
        public List<Student> obtenerTablaNotasPorAsignatura(int idUsuario, int idAsignatura, int idPeriodo)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.Add(new SqlParameter("@idUsuario", idUsuario));
            parList.Add(new SqlParameter("@idAsignatura", idAsignatura));
            parList.Add(new SqlParameter("@idPeriodo", idPeriodo));
            IDataReader dt = (System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_SELECT_TABLA_NOTAS_ESTUDIANTE", parList);

            List<Student> str = new List<Student>();
            while (dt.Read())
            {
                Student r = new Student();
                //r.Nota = Utility.formatearNotaDecimales(dt["Nota"].ToString());                
                r.Nota = (decimal.Parse(dt["Nota"].ToString()) > 0 ? Utility.formatearNotaDecimales(dt["Nota"].ToString()) : (dt["NotaText"].ToString() == "" ? "Pendiente" : dt["NotaText"].ToString()));
                r.FechaInicioActividad = dt["FechaInicioActividad"].ToString();
                r.NombreTipoActividad = dt["NombreTipoActividad"].ToString();
                r.DescripcionActividad = dt["DescripcionActividad"].ToString();
                r.color = dt["color"].ToString();
                str.Add(r);
            }
            return str;
        }
        public string GuardarFactura(int idEscuela, int idUsuario, int idTipoVenta, string Detalle, string Observaciones, string xmlData, DateTime fechaFactura, decimal subtotal, decimal descuentoTotal, decimal subtotalMenosDescuentos,  decimal totalCompleto)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idEscuela", idEscuela));
            parList.ToAdd(new SqlParameter("@idUsuario", idUsuario));
            parList.ToAdd(new SqlParameter("@idTipoVenta", idTipoVenta));
            parList.ToAdd(new SqlParameter("@Detalle", Detalle));
            parList.ToAdd(new SqlParameter("@Observaciones", Observaciones));
            parList.ToAdd(new SqlParameter("@xmlData", xmlData));
            parList.ToAdd(new SqlParameter("@fechaFactura", fechaFactura));
            parList.ToAdd(new SqlParameter("@subtotal", subtotal));
            parList.ToAdd(new SqlParameter("@descuentoTotal", descuentoTotal));
            parList.ToAdd(new SqlParameter("@subtotalMenosDescuentos", subtotalMenosDescuentos));
            parList.ToAdd(new SqlParameter("@totalCompleto", totalCompleto));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_FACTURA_GUARDAR", parList));
        }
        
            public string guardarpagofacturarapido(int idEscuela, int idFactura, decimal Pago, DateTime Fecha)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idEscuela", idEscuela));
            parList.ToAdd(new SqlParameter("@idFactura", idFactura));
            parList.ToAdd(new SqlParameter("@Pago", Pago));
            parList.ToAdd(new SqlParameter("@Fecha", Fecha));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_INSERT_PAGO_FACTURA", parList));
        }
        public string obtenerCategoriasFactura(int idEscuela)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idEscuela", idEscuela));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_FACTURA_TIPO_CATEGORIA", parList));
        }        
             public string CargarFacturaId(int idFactura)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idFactura", idFactura));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_FACTURA_ID", parList));
        }        
             public string AnularFactura(int idFactura, string Observaciones)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idFactura", idFactura));
            parList.ToAdd(new SqlParameter("@Observaciones", Observaciones));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_FACTURA_ANULAR", parList));
        }
        public string ObtenerAlumnosMatricula(int idEscuela, int idUsuario)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idUsuario", idUsuario));
            parList.ToAdd(new SqlParameter("@idEscuela", idEscuela));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_ALUMNOS_MATRICULAS", parList));
        }
          
        public string ObtenerAlumnosPreMatricula(int idEscuela, int idSubnivel, int idPeriodo, int opcion)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idEscuela", idEscuela));
            parList.ToAdd(new SqlParameter("@idSubnivel", idSubnivel));
            parList.ToAdd(new SqlParameter("@idPeriodo", idPeriodo));
            parList.ToAdd(new SqlParameter("@opcion", opcion));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_SELECT_ALUMNOS_PRE_MATRICULA", parList));
        }
        public List<response> RetirarStudents(int idEscuela, int idUsuario, bool status, int idRol)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idEscuela", idEscuela)).
            ToAdd(new SqlParameter("@idUsuario", idUsuario)).
            ToAdd(new SqlParameter("@Activo", status)).
            ToAdd(new SqlParameter("@idRol", idRol));
            IDataReader dt = Connection.Instance.ExecuteReader("PRC_UPDATE_ESTATUS_USUARIO", parList);
            List<response> resp = new List<response>();
            while (dt.Read())
            {
                resp.Add(new response { text = dt.GetValue(0).ToString(), Activo = Convert.ToBoolean(dt.GetValue(1)) });
            }
            return resp;
        }
        public string ObtenerEstudiante(int idEscuela, int idUsuario)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idUsuario", idUsuario));
            parList.ToAdd(new SqlParameter("@idEscuela", idEscuela));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_SELECT_ALUMNO_INFORMACION", parList));
        }

        public string ObtenerAlumno(int idEscuela, int idUsuario)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idEscuela", idEscuela));
            parList.ToAdd(new SqlParameter("@idUsuario", idUsuario));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_SELECT_ALUMNO", parList));
        }
        public string EliminarHistorico(int idHistorico, int idEscuela)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idHistorico", idHistorico));
            parList.ToAdd(new SqlParameter("@idEscuela", idEscuela));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_HISTORICO_DELETE", parList));
        }
        public string ObtenerTotalPeriodos(int idUsuario, int idEscuela)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idUsuario", idUsuario));
            parList.ToAdd(new SqlParameter("@idEscuela", idEscuela));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_PROMEDIOS_ESTUDIANTES", parList));
        }
        public string ObetenerSalones(int idPeriodo)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idPeriodo", idPeriodo));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_GRUPO_SELECT_SALON", parList));
        }
        public string ObetenerAsignaturasMatriculaLaboralStudents(int tipo, int idUsuario, int idPeriodo)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@tipo", tipo)).
            ToAdd(new SqlParameter("@idUsuario", idUsuario)).
            ToAdd(new SqlParameter("@idPeriodo", idPeriodo));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_SELECT_ASIGNATURAS_MATRICULAS_LABORAL", parList));
        }
        public List<Student> ObtenerHistorico(int idEscuela, int idUsuario, int idOpcion, int idOrdenPeriodo)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idEscuela", idEscuela)).
                ToAdd(new SqlParameter("@idOpcion", idOpcion)).
                ToAdd(new SqlParameter("@idOrdenPeriodo", idOrdenPeriodo)).
            ToAdd(new SqlParameter("@idusuario", idUsuario));
            IDataReader dt = (System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_SELECT_HISTORIAL_NOTA_ALUMNO", parList);
            return Utility.LoadObjectsFromDataReader<Student>(dt);
        }
        public string SaveAlumno(string jsonAlumno, int idEscuela, int idSubnivel, int idOpcion, int idEstatus)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@json", jsonAlumno));
            parList.ToAdd(new SqlParameter("@idEscuela", idEscuela));
            parList.ToAdd(new SqlParameter("@idSubnivel", idSubnivel));
            parList.ToAdd(new SqlParameter("@idOpcion", idOpcion));
            parList.ToAdd(new SqlParameter("@idEstatus", idEstatus));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_SAVE_ALUMNO", parList));
        }
        public string CostosEspecialidad(int idUsuario, int anioMatricula)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idUsuario", idUsuario));
            parList.ToAdd(new SqlParameter("@anioMatricula", anioMatricula));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_READ_COSTOS_ESPECIALIDAD", parList));
        }

        public string ActualizarDatosContactoEstudiante(int idSubnivel, int idEscuela, string PersonaAutorizada, string Direccion, string Nombre, string Apellido, string Cedula, string txt_Fecha_nacimiento, int idUsuario, string emailEstudiante, string celularEstudiante, string nombreAcudiente1, string cedulaAcudiente1, string emailAcudiente1, string celularAcudiente1, string nombreAcudiente2, string cedulaAcudiente2, string emailAcudiente2, string celularAcudiente2, string Sexo, string TipoSangre, string TipoAlergia_, string TipoEnf_, int idOpcion, int NacionalidadAlumno, int NacionalidadAlumno1, int NacionalidadAlumno2, string DireccionAcudiente1, string DireccionAcudiente2, string CelularPersonaAutorizada, int origenpropio, string Cedula_PersonaAutorizada, string RedesS)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idUsuario", idUsuario))
            .ToAdd(new SqlParameter("@Nombre", Nombre))
             .ToAdd(new SqlParameter("@idEscuela", idEscuela))
            .ToAdd(new SqlParameter("@Apellido", Apellido))
            .ToAdd(new SqlParameter("@Cedula", Cedula))
            .ToAdd(new SqlParameter("@txt_Fecha_nacimiento", txt_Fecha_nacimiento))
            .ToAdd(new SqlParameter("@emailEstudiante", emailEstudiante))
            .ToAdd(new SqlParameter("@celularEstudiante", celularEstudiante))
            .ToAdd(new SqlParameter("@nombreAcudiente1", nombreAcudiente1))
            .ToAdd(new SqlParameter("@cedulaAcudiente1", cedulaAcudiente1))
            .ToAdd(new SqlParameter("@emailAcudiente1", emailAcudiente1))
            .ToAdd(new SqlParameter("@celularAcudiente1", celularAcudiente1))
            .ToAdd(new SqlParameter("@nombreAcudiente2", nombreAcudiente2))
            .ToAdd(new SqlParameter("@cedulaAcudiente2", cedulaAcudiente2))
            .ToAdd(new SqlParameter("@emailAcudiente2", emailAcudiente2))
            .ToAdd(new SqlParameter("@celularAcudiente2", celularAcudiente2))
            .ToAdd(new SqlParameter("@UsuarioSexo", Sexo))
            .ToAdd(new SqlParameter("@UsuarioTipoSangre", TipoSangre))
            .ToAdd(new SqlParameter("@UsuarioTipoAlergia", TipoAlergia_))
            .ToAdd(new SqlParameter("@UsuarioTipoEnf", TipoEnf_))
            .ToAdd(new SqlParameter("@Direccion", Direccion))
            .ToAdd(new SqlParameter("@PersonaAutorizada", PersonaAutorizada))
            .ToAdd(new SqlParameter("@idOpcion", idOpcion))
            .ToAdd(new SqlParameter("@idSubNivel", idSubnivel))
            .ToAdd(new SqlParameter("@NacionalidadAlumno", NacionalidadAlumno))
            .ToAdd(new SqlParameter("@NacionalidadAlumno1", NacionalidadAlumno1))
            .ToAdd(new SqlParameter("@NacionalidadAlumno2", NacionalidadAlumno2))
            .ToAdd(new SqlParameter("@DireccionAcudiente1", DireccionAcudiente1))
            .ToAdd(new SqlParameter("@DireccionAcudiente2", DireccionAcudiente2))
            .ToAdd(new SqlParameter("@CelularPersonaAutorizada", CelularPersonaAutorizada))
            .ToAdd(new SqlParameter("@origenpropio", origenpropio))
            .ToAdd(new SqlParameter("@cedulaPersonaAutorizada", Cedula_PersonaAutorizada))
            .ToAdd(new SqlParameter("@RedesS", RedesS))
             .ToAdd(new SqlParameter("@FechaAccion", DateTime.Now));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_INSERT_ALUMNO_DATOS_CONTACTO", parList));
        }


        public string Actualizar_CustomerID(int idUsuario, string CustomerID)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idUsuario", idUsuario))
                   .ToAdd(new SqlParameter("@CustomerID", CustomerID));
            Connection.Instance.ExecuteReader("PRC_UPDATE_CustomerID", parList);
            return "Success";
        }
        public string _PAGOS_HISTORIAL_ALUMNO(int idUsuario)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idUsuario", idUsuario));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_SELECT_PAGOS_HISTORIAL_ALUMNO", parList));
        }
    }
}