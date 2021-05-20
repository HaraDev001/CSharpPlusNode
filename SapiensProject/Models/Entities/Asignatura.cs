using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;

namespace SapiensProject.Models.Entities
{
    public class Asignatura
    {
        public int idMetodoPromedio { get; set; }
        public int EstatusMaricula { get; set; }
        public string text_nivel { get; set; }
        public string text_area { get; set; }
        public int idOrden { get; set; }
        public string nota_nomenclatura { get; set; }
        public string nota_academica { get; set; }
        public string nota_historial1 { get; set; }
        public string nota_historial2 { get; set; }
        public string nota_historial3 { get; set; }
        public string ch { get; set; }
        public int id { get; set; }
        public int idNivel { get; set; }
        public string nivel_descripcion { get; set; }
        public string periodo_descripcion { get; set; }
        public string grupo_descripcion { get; set; }
        public int idAsignaturaPrerrequisito { get; set; }
        public string Nombre { get; set; }
        public string Descripcion { get; set; }
        public bool PermitirNomenclaturaComoPromedio { get; set; }
        public bool CalcPromedioCantTotalEventos { get; set; }
        public bool DesactivarUsuarioPorPeriodo { get; set; }
        public bool Activo { get; set; }
        public string check_table { get; set; }
        public int idAsignatura { get; set; }
        public int RowNumber { get; set; }
        public int RowNumberMatricula { get; set; }
        public enum FiltrarPor { Nivel, Periodo };
        public int idOrdenPeriodo { get; set; }
        public int idAreaHabitoActitud { get; set; }
        public string Estatus { get; set; }
        public decimal CostoTrimestral { get; set; }
        public int idPeriodo { get; set; }
        public int idSubnivel { get; set; }
        public int idTipoMetodologia { get; set; }
        public int Creditos { get; set; }
        public string Guardar_Asignatura(int idEscuela, string codigo, string nombre, int nivel, bool activo, int opcion, int idAsignatura, int Creditos, decimal Costo, int hrsSemanal, int idAsignaturaMaster, string Atributo, int AsignaturaConsolidada, string NombreAsignaturaConsolidadaBoletin)
        {
            string text = "";
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idEscuela", idEscuela)).
            ToAdd(new SqlParameter("@idAsignatura", idAsignatura)).
            ToAdd(new SqlParameter("@codigo", codigo)).
            ToAdd(new SqlParameter("@Descripcion", nombre)).
            ToAdd(new SqlParameter("@idNivel", nivel)).
            ToAdd(new SqlParameter("@Activo", activo)).
            ToAdd(new SqlParameter("@Creditos", Creditos)).
            ToAdd(new SqlParameter("@Costo", Costo)).
            ToAdd(new SqlParameter("@idOpcion", opcion)).
            ToAdd(new SqlParameter("@hrsSemanal", hrsSemanal)).
            ToAdd(new SqlParameter("@idAsignaturaMaster", idAsignaturaMaster)).
            ToAdd(new SqlParameter("@Atributo", Atributo)).
            ToAdd(new SqlParameter("@AsignaturaConsolidada", AsignaturaConsolidada)).
            ToAdd(new SqlParameter("@NombreAsignaturaConsolidadaBoletin", NombreAsignaturaConsolidadaBoletin));
            IDataReader dt = Connection.Instance.ExecuteReader("PRC_GUARDAR_ASIGNATURA", parList);
            while (dt.Read())
            {
                text = dt.GetValue(0).ToString();
            }
            return text;
        }
        public string EliminarAreaNivel(int idEscuela, int idAreaNivel)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idEscuela", idEscuela));
            parList.ToAdd(new SqlParameter("@idAreaNivel", idAreaNivel));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_MATERIAS_ELIMINAR_AREA_NIVEL", parList));
        }
            public string GetArea(int idEscuela, int idArea)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idEscuela", idEscuela));
            parList.ToAdd(new SqlParameter("@idArea", idArea));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_AREA_HABITO_SELECT_EVALUACION", parList));
        }
        public string Guardar_Area(int idEscuela, int idArea, string nombre, int activo, int opcion, string xmlData)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idEscuela", idEscuela));
            parList.ToAdd(new SqlParameter("@idArea", idArea));
            parList.ToAdd(new SqlParameter("@Nombre", nombre));
            parList.ToAdd(new SqlParameter("@Activo", activo));
            parList.ToAdd(new SqlParameter("@idOpcion", opcion));
            parList.ToAdd(new SqlParameter("@xmlData", xmlData));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_GUARDAR_AREA", parList));
        }
        public string Guardar_Area_x_HAbitos(int id, int area, string nombre, int idOrden, int opcion)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@id", id)).
            ToAdd(new SqlParameter("@area", area)).
            ToAdd(new SqlParameter("@Nombre", nombre)).
            ToAdd(new SqlParameter("@idOrden", idOrden)).
            ToAdd(new SqlParameter("@idOpcion", opcion));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_GUARDAR_AREA_HABITOS", parList));
        }
        public string GuardarTipocategoria(int idEscuela, int id, string nombre, decimal costo, int opcion)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idEscuela", idEscuela)).
            ToAdd(new SqlParameter("@id", id)).
            ToAdd(new SqlParameter("@nombre", nombre)).
            ToAdd(new SqlParameter("@costo", costo)).
            ToAdd(new SqlParameter("@opcion", opcion));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_FACTURA_GUARDAR_TIPO_CATEGORIA", parList));
        }        
        public string Guardar_Area_x_HAbitos_x_Nivel(int idEscuela, int idAreaHabitoActitud, int idNivel,int orden,  int opcion)
        {
            string text = "";
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idEscuela", idEscuela)).
            ToAdd(new SqlParameter("@idAreaHabitoActitud", idAreaHabitoActitud)).
            ToAdd(new SqlParameter("@idNivel", idNivel)).
             ToAdd(new SqlParameter("@orden", orden)).
            ToAdd(new SqlParameter("@idOpcion", opcion));
            IDataReader dt = Connection.Instance.ExecuteReader("PRC_GUARDAR_AREA_HABITOS_NIVEL", parList);
            while (dt.Read())
            {
                text = dt.GetValue(0).ToString();
            }
            return text;
        }
        public string Guardar_Copy_Asignatura_Nivel(int idEscuela, string xml)
        {
            string text = "";
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idEscuela", idEscuela)).
            ToAdd(new SqlParameter("@xmlData", xml));
            IDataReader dt = Connection.Instance.ExecuteReader("PRC_GUARDAR_ASIGNATURA_COPY_NIVEL", parList);
            while (dt.Read())
            {
                text = dt.GetValue(0).ToString();
            }
            return text;
        }
        public string Guardar_Asignatura_Docente(int idEscuela, string xml, int idSubnivel)
        {
            string text = "";
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idEscuela", idEscuela)).
            ToAdd(new SqlParameter("@xmlData", xml)).
            ToAdd(new SqlParameter("@idSubnivel", idSubnivel));
            IDataReader dt = Connection.Instance.ExecuteReader("PRC_INSERT_DOCENTE_ASIGNATURA_GRUPO", parList);
            while (dt.Read())
            {
                text = dt.GetValue(0).ToString();
            }
            return text;
        }
        public string LoadBoletinConfiguracion(int idEscuela, int id)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idEscuela", idEscuela));
            parList.ToAdd(new SqlParameter("@id", id));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_CONFIGURACIONBOLETIN_SELECT", parList));
        }
        public string EditarAsignaturaMaster(int idAsignaturaMaster)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idAsignaturaMaster", idAsignaturaMaster));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_CONFIGURACIONBOLETIN_SELECT", parList));
        }
        public string EliminarRubro(int idEscuela, int idCategoriaPorcentaje, int idSubnivel)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idEscuela", idEscuela));
            parList.ToAdd(new SqlParameter("@idCategoriaPorcentaje", idCategoriaPorcentaje));
            parList.ToAdd(new SqlParameter("@idSubnivel", idSubnivel));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_LIBRETA_DELETE_CATEGORIA", parList));
        }
        public string CallFormulaAgenda(int idAgenda)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idAgenda", idAgenda));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_LIBRETA_SELECT_FORMULA_AGENDA", parList));
        }
        public string DeleteItems(int idEscuela, int idHabito)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idEscuela", idEscuela));
            parList.ToAdd(new SqlParameter("@idHabito", idHabito));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_DELETE_HABITO", parList));
        }
        
        public string InsertFormula(int idAgenda, int idFormula)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idAgenda", idAgenda));
            parList.ToAdd(new SqlParameter("@idFormula", idFormula));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_LIBRETA_INSERT_FORMULA_AGENDA", parList));
        }
        public string InsertRubro(int idEscuela, int idUsuario, int idAsignatura, int idTipoActividad, decimal porcentaje, int idSubnivel, int idPeriodo, string TipoNota, DateTime FechaAccion)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idEscuela", idEscuela));
            parList.ToAdd(new SqlParameter("@idUsuario", idUsuario));
            parList.ToAdd(new SqlParameter("@idAsignatura", idAsignatura));
            parList.ToAdd(new SqlParameter("@idTipoActividad", idTipoActividad));
            parList.ToAdd(new SqlParameter("@porcentaje", porcentaje));
            parList.ToAdd(new SqlParameter("@idSubnivel", idSubnivel));
            parList.ToAdd(new SqlParameter("@idPeriodo", idPeriodo));
            parList.ToAdd(new SqlParameter("@TipoNota", TipoNota));
            parList.ToAdd(new SqlParameter("@FechaAccion", FechaAccion));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_LIBRETA_INSERT_CATEGORIA", parList));
        }
        public string GuardarCategoriaP(int idEscuela, int idCategoriaPorcentaje, decimal porcentaje, string idTipoActividad)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idEscuela", idEscuela));
            parList.ToAdd(new SqlParameter("@idCategoriaPorcentaje", idCategoriaPorcentaje));
            parList.ToAdd(new SqlParameter("@porcentaje", porcentaje));
            parList.ToAdd(new SqlParameter("@idTipoActividad", idTipoActividad));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_LIBRETA_UPDATE_CATEGORIA", parList));
        }
        public string ObtenerAsignaturaAdmin(int idEscuela, int nivel, int idSubnivel, int Activo)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idEscuela", idEscuela));
            parList.ToAdd(new SqlParameter("@Nivel", nivel));
            parList.ToAdd(new SqlParameter("@idSubnivel", idSubnivel));
            parList.ToAdd(new SqlParameter("@Activo", Activo));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_SELECT_ASIGNATURA_ADMIN", parList));
        }
        public string _ObtenerAsignaturaAdmin(int idEscuela, int nivel)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idEscuela", idEscuela));
            parList.ToAdd(new SqlParameter("@Nivel", nivel));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_SELECT_ASIGNATURA_ADMIN_TOTAL", parList));
        }
        public IDataReader ObteneridPlanEstudioAlumno(int idUsuario, int idEspecialidad)
        {
            Connection cnn = new Connection();
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idUsuario", idUsuario));
            parList.ToAdd(new SqlParameter("@idEspecialidad", idEspecialidad));
            return cnn.ExecuteReaderDataSet("PRC_SELECT_PLANESTUDIO_X_ALUMNO_NEW", parList);
        }       
        public string ObtenerSubNivelTask(int idUsuario, int idEscuela, int idRol, int idPeriodo, int idSubNivel, int DesactivarPrescolar)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idEscuela", idEscuela));
            parList.ToAdd(new SqlParameter("@idUsuario", idUsuario));
            parList.ToAdd(new SqlParameter("@idRol", idRol));
            parList.ToAdd(new SqlParameter("@idPeriodo", idPeriodo));
            parList.ToAdd(new SqlParameter("@idSubNivel", idSubNivel));
            parList.ToAdd(new SqlParameter("@DesactivarPrescolar", DesactivarPrescolar));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_SELECT_SUBNIVEL_TASK", parList));
        }
        public string ObtenerNivelTask(int idUsuario, bool DesactivarUsuarioPeriodo, int idRol, int idPeriodo, int idSubNivel)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@DesactivarUsuarioPeriodo", DesactivarUsuarioPeriodo));
            parList.ToAdd(new SqlParameter("@idUsuario", idUsuario));
            parList.ToAdd(new SqlParameter("@idRol", idRol));
            parList.ToAdd(new SqlParameter("@idPeriodo", idPeriodo));
            parList.ToAdd(new SqlParameter("@idSubNivel", idSubNivel));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_SELECT_NIVEL_TASK", parList));
        }
        public string GuardarAsignaturaMaster(int id, int es_consolidada, string name_consolidada, int orden, int Activo, int idOpcion, string descripcion,  int idEspecialidad)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@id", id));
            parList.ToAdd(new SqlParameter("@es_consolidada", es_consolidada));
            parList.ToAdd(new SqlParameter("@name_consolidada", name_consolidada));
            parList.ToAdd(new SqlParameter("@orden", orden));
            parList.ToAdd(new SqlParameter("@Activo", Activo));
            parList.ToAdd(new SqlParameter("@idOpcion", idOpcion));
            parList.ToAdd(new SqlParameter("@descripcion", descripcion));
            parList.ToAdd(new SqlParameter("@idEspecialidad", idEspecialidad));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_CONFIGURACION_CREDITOS_GUARDAR_ASIGNATURA_MASTER", parList));
        }
        public string CargarAsignaturaMaster(int idTipoEspecialidad, int idAsignaturaMaster)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idEspecialidad", idTipoEspecialidad));
            parList.ToAdd(new SqlParameter("@idAsignaturaMaster", idAsignaturaMaster));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_CONFIGURACION_CREDITOS_SELECT_ASIGNATURA_MASTER", parList));
        }
        public string CargarAsinaturaId(int idEscuela, int idAsignatura)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idEscuela", idEscuela));
            parList.ToAdd(new SqlParameter("@idAsignatura", idAsignatura));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_ASIGNATURA_SELECT_ID", parList));
        }
        public string ReporteAsignaturaAlumno(int idUsuario, int idPeriodo)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idUsuario", idUsuario));
            parList.ToAdd(new SqlParameter("@idPeriodo", idPeriodo));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_REPORTE_ALUMNO_MATRICULA", parList));
        }
        public string ObtenerAsignaturaXSubnivel(int idSubNivel)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idSubNivel", idSubNivel));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_SELECT_ASIGNTURA_SUBNIVEL", parList));
        }
        public string ObtenerAsignaturasLibretas( int idEscuela, int idUsuario, int idRol, int idSubnivel)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idEscuela", idEscuela));
            parList.ToAdd(new SqlParameter("@idSubnivel", idSubnivel));
            parList.ToAdd(new SqlParameter("@idUsuario", idUsuario));
            parList.ToAdd(new SqlParameter("@idRol", idRol));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_SELECT_ASIGNATURA_LIBRETAS", parList));
        }
        public string ObtenerLaboralProfesores(int idUsuario, int idEscuela, int idPeriodo, int idRol)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idUsuario", idUsuario));
            parList.ToAdd(new SqlParameter("@idPeriodo", idPeriodo));
            parList.ToAdd(new SqlParameter("@idEscuela", idEscuela));
            parList.ToAdd(new SqlParameter("@idRol", idRol));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_SELECT_LABORAL_PROFESORES_ADMIN", parList));
        }
        
             public string ObtenerSalonVirtualReporte(int idEscuela)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idEscuela", idEscuela));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_SELECT_SALONES_VIRTUALES_REPORTE", parList));
        }
        public string ObtenerSalonVirtual(int idEscuela,  int idUsuario, int Modulo)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idEscuela", idEscuela));
            parList.ToAdd(new SqlParameter("@idUsuario", idUsuario));
            parList.ToAdd(new SqlParameter("@Modulo", Modulo));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_SALONES_VIRTUAL_DIURNO", parList));
        }
        public string ObtenerPreMatricula(int idEscuela, int idPeriodo, int DesactivarUsuarioPeriodo, int idUsuario, int Modulo, int Activo)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idEscuela", idEscuela));
            parList.ToAdd(new SqlParameter("@idPeriodo", idPeriodo));
            parList.ToAdd(new SqlParameter("@DesactivarUsuarioPeriodo", DesactivarUsuarioPeriodo));
            parList.ToAdd(new SqlParameter("@idUsuario", idUsuario));
            parList.ToAdd(new SqlParameter("@Modulo", Modulo));
            parList.ToAdd(new SqlParameter("@Activo", Activo));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_SELECT_PRE_MATRICULA", parList));
        }
        public List<Asignatura> ObteneridOrdenPeriodo(int idUsuario, int idEscuela, int idEspecialidad)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idEscuela", idEscuela));
            parList.ToAdd(new SqlParameter("@idUsuario", idUsuario));
            parList.ToAdd(new SqlParameter("@idEspecialidad", idEspecialidad));

            IDataReader dt = (System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_SELECT_ORDENPERIODO_PLANESTUDIO", parList);
            return Utility.LoadObjectsFromDataReader<Asignatura>(dt);
        }
        public string GrupoObtenerAsignatura(int idSubnivel, int idActivo, int idUsuario, int idRolA)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idSubnivel", idSubnivel));
            parList.ToAdd(new SqlParameter("@idActivo", idActivo));
            parList.ToAdd(new SqlParameter("@idUsuario", idUsuario));
            parList.ToAdd(new SqlParameter("@idRolA", idRolA));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_GRUPOS_ASIGNATURA_DOCENTE", parList));
        }        
            public string GetLecionesTotales(int idEscuela, int idUsuario, int idAsignatura, int idSubNivel, int idPeriodo)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idEscuela", idEscuela));
            parList.ToAdd(new SqlParameter("@idUsuario", idUsuario));
            parList.ToAdd(new SqlParameter("@idAsignatura", idAsignatura));
            parList.ToAdd(new SqlParameter("@idSubNivel", idSubNivel));
            parList.ToAdd(new SqlParameter("@idPeriodo", idPeriodo));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_SELECT_TOTAL_LECCIONES", parList));
        }
        public string GuardarLecciones(int idEscuela, int idUsuario, int idAsignatura, int idSubNivel, int idPeriodo, int idTotalLecciones)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idEscuela", idEscuela));
            parList.ToAdd(new SqlParameter("@idUsuario", idUsuario));
            parList.ToAdd(new SqlParameter("@idAsignatura", idAsignatura));
            parList.ToAdd(new SqlParameter("@idSubNivel", idSubNivel));
            parList.ToAdd(new SqlParameter("@idPeriodo", idPeriodo));
            parList.ToAdd(new SqlParameter("@idTotalLecciones", idTotalLecciones));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_INSERT_TOTAL_LECCIONES", parList));
        }
        public string NivelObtenerAsignatura(int idNivel, int idActivo, int idUsuario, int idRolA)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idNivel", idNivel));
            parList.ToAdd(new SqlParameter("@idActivo", idActivo));
            parList.ToAdd(new SqlParameter("@idUsuario", idUsuario));
            parList.ToAdd(new SqlParameter("@idRolA", idRolA));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_NIVEL_ASIGNATURA_DOCENTE", parList));
        }
        public string ObtenerAsignaturaPreMatricula(int idPeriodo)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idPeriodo", idPeriodo));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_SELECT_ASIGNATURA_MATRICULA", parList));
        }
        public List<Asignatura> ObtenerAsignaturaPreMatriculaAlumnoPagos(int idUsuario, int idPeriodo)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idUsuario", idUsuario));
            parList.ToAdd(new SqlParameter("@idPeriodo", idPeriodo));
            IDataReader dt = (System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_SELECT_PREMATRICULA", parList);
            return Utility.LoadObjectsFromDataReader<Asignatura>(dt);
        }
        public string ObtenerMetodologia_0(int idEscuela, int idEspecialidad, int idOpcion)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idEscuela", idEscuela));
            parList.ToAdd(new SqlParameter("@idEspecialidad", idEspecialidad));
            parList.ToAdd(new SqlParameter("@idOpcion", idOpcion));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_SELECT_ASIGNATURA_PLANESTUDIO", parList));
        }
        public string ObtenerAreaHabitos(int idEscuela)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idEscuela", idEscuela));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_SELECT_AREA_HABITO_ADMIN", parList));
        }
        public string ObtenerArea_x_Habitos(int idEscuela, int idAreaHabitoActitud)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idEscuela", idEscuela));
            parList.ToAdd(new SqlParameter("@idAreaHabitoActitud", idAreaHabitoActitud));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_SELECT_AREA_X_HABITO_ADMIN", parList));
        }
        public string ObtenerArea_x_Habitos_X_Nivel(int idNivel)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idNivel", idNivel));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_SELECT_AREA_X_HABITO_X_NIVEL_ADMIN", parList));
        }
        public string ObtenerArea_x_Habitos_x_nivel(int idNivel)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idNivel", idNivel));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_SELECT_AREA_X_HABITO_X_NIVEL_ADMIN", parList));
        }
        public string ObtenerA(int idNivel, int idEscuela, int idUsuario, int idSubnivel)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idNivel", idNivel));
            parList.ToAdd(new SqlParameter("@idEscuela", idEscuela));
            parList.ToAdd(new SqlParameter("@idUsuario", idUsuario));
            parList.ToAdd(new SqlParameter("@idSubnivel", idSubnivel));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_SELECT_ASIGNATURA_DOCENTE", parList));
        }
        public string GuardarRevalida(int idEscuela, int idAlumnoRevalida, int idUsuario, int idSubnivel, int idAsignatura, decimal Nota, int Anio)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idEscuela", idEscuela));
            parList.ToAdd(new SqlParameter("@idAlumnoRevalida", idAlumnoRevalida));
            parList.ToAdd(new SqlParameter("@idUsuario", idUsuario));
            parList.ToAdd(new SqlParameter("@idSubnivel", idSubnivel));
            parList.ToAdd(new SqlParameter("@idAsignatura", idAsignatura));
            parList.ToAdd(new SqlParameter("@Nota", Nota));
            parList.ToAdd(new SqlParameter("@Anio", Anio));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_REVALIDA_GUARDAR", parList));
        }
        public string ObtenerMateriasNivel(int idEscuela, int idNivel)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idEscuela", idEscuela));
            parList.ToAdd(new SqlParameter("@idNivel", idNivel));
            parList.ToAdd(new SqlParameter("@idActivo", 1));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_SELECT_ASIGNATURA_NIVEL", parList));
        }
        public string ObtenerMateriasNivelAnio(int idEscuela, int idUsuario, int idSubnivel, int Anio)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idEscuela", idEscuela));
            parList.ToAdd(new SqlParameter("@idUsuario", idUsuario));
            parList.ToAdd(new SqlParameter("@idSubnivel", idSubnivel));
            parList.ToAdd(new SqlParameter("@idActivo", 1));
            parList.ToAdd(new SqlParameter("@Anio", Anio));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_SELECT_ASIGNATURA_NIVEL_ANIO", parList));
        }        
        public string ObtenerAsignatura(int idRol, int idUsuario, int idEscuela, int idSubnivel, int idPeriodo, FiltrarPor filtro)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idRol", idRol));
            parList.ToAdd(new SqlParameter("@idUsuario", idUsuario));
            parList.ToAdd(new SqlParameter("@idEscuela", idEscuela));
            parList.ToAdd(new SqlParameter("@idSubnivel", idSubnivel));
            parList.ToAdd(new SqlParameter("@idPeriodo", idPeriodo));
            parList.ToAdd(new SqlParameter("@filtrarPor", filtro));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_SELECT_ASIGNATURA_USUARIO_ROL", parList));
        }
        public List<Asignatura> ObtenerAsignaturaMatriculadas(int idUsuario)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            IDataReader dt = null;
            parList.ToAdd(new SqlParameter("@idUsuario", idUsuario));
            dt = (System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_SELECT_MATERIAS_MATRICULADAS", parList);
            return Utility.LoadObjectsFromDataReader<Asignatura>(dt);
        }
        public string Obtener_Asignaturas_Horario_Manual(int idUsuario, int idSubnivel, int idRol)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idUsuario", idUsuario));
            parList.ToAdd(new SqlParameter("@idSubnivel", idSubnivel));
            parList.ToAdd(new SqlParameter("@idRol", idRol));
            return Utility.jsonSql(Connection.Instance.ExecuteReader("PRC_SELECT_ASIGNATURA_HORARIOS", parList));
        }        
            public string EliminarPlanDeEstudio(int id)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@id", id));
            return Utility.jsonSql(Connection.Instance.ExecuteReader("PRC_UPDATE_PLANDEESTUDIO", parList));
        }
        public string ObtenerPlanEstudioDetalle(int idEspecialidad)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idEspecialidad", idEspecialidad));
            return Utility.jsonSql(Connection.Instance.ExecuteReader("PRC_SELECT_PLANESTUDIO_DETALLE", parList));
        }
        public string HISTORIAL_INSERT(int idEspecialidad, int idAsignatura, decimal Nota, DateTime FechaRegistro, int idUsuario, int idPeriodo)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idEspecialidad", idEspecialidad));
            parList.ToAdd(new SqlParameter("@idAsignatura", idAsignatura));
            parList.ToAdd(new SqlParameter("@Nota", Nota));
            parList.ToAdd(new SqlParameter("@FechaRegistro", FechaRegistro));
            parList.ToAdd(new SqlParameter("@idUsuario", idUsuario));
            parList.ToAdd(new SqlParameter("@idPeriodo", idPeriodo));
            return Utility.jsonSql(Connection.Instance.ExecuteReader("PRC_HISTORIAL_INSERT", parList));
        }
        public string Actualizar_Subnivel(int idSubnivel, int idPeriodo, int idEscuela, bool Activo)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idSubnivel", idSubnivel)).
            ToAdd(new SqlParameter("@idPeriodo", idPeriodo)).
            ToAdd(new SqlParameter("@idEscuela", idEscuela)).
            ToAdd(new SqlParameter("@Activo", Activo));
            return Utility.jsonSql(Connection.Instance.ExecuteReader("PRC_UPDATE_SUBNIVEL", parList));
        }
        public string Insert_Asignatura_PlanEstudio(int idEscuela, int idEspecialidad,int idOrdenAnio,  int idOrdenPeriodo, int idAsignatura, int idOpcion)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idEscuela", idEscuela)).
            ToAdd(new SqlParameter("@idEspecialidad", idEspecialidad)).
            ToAdd(new SqlParameter("@idOrdenAnio", idOrdenAnio)).
            ToAdd(new SqlParameter("@idOrdenPeriodo", idOrdenPeriodo)).
            ToAdd(new SqlParameter("@idOpcion", idOpcion)).
            ToAdd(new SqlParameter("@idAsignatura", idAsignatura));
            return Utility.jsonSql(Connection.Instance.ExecuteReader("PRC_ASIGNATURA_PLANESTUDIO", parList));
        }

        public string Select_Matricula(int idPeriodo)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.ToAdd(new SqlParameter("@idPeriodo", idPeriodo));
            return Utility.jsonSql(Connection.Instance.ExecuteReader("PRC_SELECT_MATRICULA", parList));
        }
    }
}