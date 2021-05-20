using SapiensProject.Models.Entities;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;

namespace SapiensProject.Models
{
    public class NotaModel
    {
        Connection cnn;
        public IDataReader obtenerTablaNotasPorEducador(int idEscuela, int idEducador, int idAsignatura, int idSubnivel, int idPeriodo)
        {
            cnn = new Connection();
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.Add(new SqlParameter("@idEscuela", idEscuela));
            parList.Add(new SqlParameter("@idEducador", idEducador));
            parList.Add(new SqlParameter("@idAsignatura", idAsignatura));
            parList.Add(new SqlParameter("@idSubnivel", idSubnivel));
            parList.Add(new SqlParameter("@idPeriodo", idPeriodo));
            return cnn.ExecuteReaderDataSet("PRC_SELECT_TABLA_NOTAS_EDUCADOR_NEW", parList);
        }
        public IDataReader obtenerTablaNotasPorAlumno_(int idUsuario, int idPeriodo)
        {
            cnn = new Connection();
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.Add(new SqlParameter("@idUsuario", idUsuario));
            parList.Add(new SqlParameter("@idPeriodo", idPeriodo));
            return cnn.ExecuteReaderDataSet("PRC_SELECT_TABLA_NOTAS_ESTUDIANTE_V2", parList);
        }
        public string PRC_LIBRETA_SELECT_ACTIVIDADES_ELIMINADO(int idEscuela, int idAsignatura, int idSubnivel, int idPeriodo, int idOpcion, int idUsuario, int Estatus, int idRolA, int PermitirFormativa)
        {
            cnn = new Connection();
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.Add(new SqlParameter("@idEscuela", idEscuela));
            parList.Add(new SqlParameter("@idAsignatura", idAsignatura));
            parList.Add(new SqlParameter("@idSubnivel", idSubnivel));
            parList.Add(new SqlParameter("@idPeriodo", idPeriodo));
            parList.Add(new SqlParameter("@idOpcion", idOpcion));
            parList.Add(new SqlParameter("@idUsuario", idUsuario));
            parList.Add(new SqlParameter("@Estatus", Estatus));
            parList.Add(new SqlParameter("@idRolA", idRolA));
            parList.Add(new SqlParameter("@PermitirFormativa", PermitirFormativa));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_LIBRETA_SELECT_ACTIVIDADES_ELIMINADO", parList));
        }
        public string PRC_LIBRETA_SELECT_ACTIVIDADES(int idEscuela, int idAsignatura, int idSubnivel, int idPeriodo, int idOpcion, int idUsuario, int Estatus, int idRolA, int PermitirFormativa)
        {
            cnn = new Connection();
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.Add(new SqlParameter("@idEscuela", idEscuela));
            parList.Add(new SqlParameter("@idAsignatura", idAsignatura));
            parList.Add(new SqlParameter("@idSubnivel", idSubnivel));
            parList.Add(new SqlParameter("@idPeriodo", idPeriodo));
            parList.Add(new SqlParameter("@idOpcion", idOpcion));
            parList.Add(new SqlParameter("@idUsuario", idUsuario));
            parList.Add(new SqlParameter("@Estatus", Estatus));
            parList.Add(new SqlParameter("@idRolA", idRolA));
            parList.Add(new SqlParameter("@PermitirFormativa", PermitirFormativa));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_LIBRETA_SELECT_ACTIVIDADES", parList));
        }
        public void actualizarNotasHistorial(int idUsuario, string xml, int idEspecialidad)
        {
            cnn = new Connection();
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.Add(new SqlParameter("@idUsuario", idUsuario));
            parList.Add(new SqlParameter("@xmlData", xml));
            parList.Add(new SqlParameter("@idEspecialidad", idEspecialidad));
            cnn.ExecuteReader("PRC_UPDATE_TABLA_HISTORIAL_NOTAS_XML", parList);
        }
    
    public void actualizarNotasTablaTask(int idEscuela, int idUsuario, int idTask, string xml, DateTime FechaAccion)
        {
            cnn = new Connection();
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.Add(new SqlParameter("@idEscuela", idEscuela));
            parList.Add(new SqlParameter("@idEducador", idUsuario));
            parList.Add(new SqlParameter("@idTask", idTask));
            parList.Add(new SqlParameter("@xmlData", xml));
            parList.Add(new SqlParameter("@FechaAccion", FechaAccion));
            cnn.ExecuteReader("PRC_UPDATE_TABLA_NOTAS_TASK_XML", parList);
        }
        public void actualizarNotasTabla(int idEscuela, int idEducador, int idAsignatura, int idPeriodo, int idAgenda, string xml, int idSubnivel, DateTime FechaAccion)
        {
            cnn = new Connection();
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.Add(new SqlParameter("@idEscuela", idEscuela));
            parList.Add(new SqlParameter("@idEducador", idEducador));
            parList.Add(new SqlParameter("@idAsignatura", idAsignatura));
            parList.Add(new SqlParameter("@idSubnivel", idSubnivel));
            parList.Add(new SqlParameter("@idPeriodo", idPeriodo));
            parList.Add(new SqlParameter("@idAgenda", idAgenda));
            parList.Add(new SqlParameter("@xmlData", xml));
            parList.Add(new SqlParameter("@FechaAccion", FechaAccion));
            cnn.ExecuteReader("PRC_UPDATE_TABLA_NOTAS_XML", parList);
        }
        public void actualizarNotas_final(int idEducador, int idAsignatura, int idPeriodo, int idSubnivel, int idAgenda, string xml)
        {
            cnn = new Connection();
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.Add(new SqlParameter("@idEducador", idEducador));
            parList.Add(new SqlParameter("@idAsignatura", idAsignatura));
            parList.Add(new SqlParameter("@idPeriodo", idPeriodo));
            parList.Add(new SqlParameter("@idSubnivel", idSubnivel));
            parList.Add(new SqlParameter("@idAgenda", idAgenda));
            parList.Add(new SqlParameter("@xmlData", xml));
            cnn.ExecuteReader("PRC_UPDATE_TABLE_NOTAS_XML_PROMFINAL", parList);
        }
        public void actualizarNotas(int idSubnivel, int idUsuarioResponsable, int idEscuela, int idUsuarioAlumno, int idAgenda, int idAsignatura, int idPeriodo, decimal nota, decimal notaAnterior, string justificacion, DateTime FechaAccion, string NotaText)
        {
            cnn = new Connection();
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.Add(new SqlParameter("@idUsuarioResponsable", idUsuarioResponsable));
            parList.Add(new SqlParameter("@idEscuela", idEscuela));
            parList.Add(new SqlParameter("@idSubnivel", idSubnivel));
            parList.Add(new SqlParameter("@idUsuarioAlumno", idUsuarioAlumno));
            parList.Add(new SqlParameter("@idAgenda", idAgenda));
            parList.Add(new SqlParameter("@idAsignatura", idAsignatura));
            parList.Add(new SqlParameter("@idPeriodo", idPeriodo));
            parList.Add(new SqlParameter("@nota", nota));
            parList.Add(new SqlParameter("@notaAnterior", notaAnterior));
            parList.Add(new SqlParameter("@justificacion", justificacion));
            parList.Add(new SqlParameter("@FechaAccion", FechaAccion));
            parList.Add(new SqlParameter("@NotaText", NotaText));
            cnn.ExecuteReader("PRC_UPDATE_NOTAS_ALUMNO", parList);
        }
        public string eliminarNota(int idEducador, int idEscuela, int idAgenda, string justificacion, int Opcion, DateTime FechaAccion)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.Add(new SqlParameter("@idEducador", idEducador));
            parList.Add(new SqlParameter("@idEscuela", idEscuela));
            parList.Add(new SqlParameter("@idAgenda", idAgenda));
            parList.Add(new SqlParameter("@justificacion", justificacion));
            parList.Add(new SqlParameter("@Opcion", Opcion));
            parList.Add(new SqlParameter("@FechaAccion", FechaAccion));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_DELETE_NOTA_AGENDA", parList));
        }
        public void asignarNomenclaturaPromedio(int idEducador, int idUsuario, int idAsignatura, int idPeriodo, string nomenclatura, int idSubnivel)
        {
            cnn = new Connection();
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.Add(new SqlParameter("@idEducador", idEducador));
            parList.Add(new SqlParameter("@idUsuario", idUsuario));
            parList.Add(new SqlParameter("@idAsignatura", idAsignatura));
            parList.Add(new SqlParameter("@idPeriodo", idPeriodo));
            parList.Add(new SqlParameter("@idSubnivel", idSubnivel));
            parList.Add(new SqlParameter("@Nomenclatura", nomenclatura));
            cnn.ExecuteReader("PRC_UPDATE_ALUMNO_PROMEDIO_NOMENCLATURA", parList);
        }
        public string BorrarRevalida(int idEscuela, int idAlumnoRevalida)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.Add(new SqlParameter("@idEscuela", idEscuela));
            parList.Add(new SqlParameter("@idAlumnoRevalida", idAlumnoRevalida));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_REVALIDA_DELETE", parList));
        }
        public string obtenerCambioNotas(int idEscuela, int idUsuario)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.Add(new SqlParameter("@idEscuela", idEscuela));
            parList.Add(new SqlParameter("@idUsuario", idUsuario));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_REPORTE_CAMBIO_NOTAS", parList));
        }
        public string obtenerEximidos(int idEscuela, int idAsignatura, int idNivel, int idSubnivel, int tipo, int idEspecialidad)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.Add(new SqlParameter("@idEscuela", idEscuela));
            parList.Add(new SqlParameter("@idAsignatura", idAsignatura));
            parList.Add(new SqlParameter("@idNivel", idNivel));
            parList.Add(new SqlParameter("@idSubnivel", idSubnivel));
            parList.Add(new SqlParameter("@tipo", tipo));
            parList.Add(new SqlParameter("@idEspecialidad", idEspecialidad));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_REPORTE_EXIMIDO", parList));
        }
        public string obtenerRankingAcademico(int idEscuela, int idNivel, int idSubnivel, int idPeriodo, float minimo, float maximo, int idEspecialidad)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.Add(new SqlParameter("@idEscuela", idEscuela));
            parList.Add(new SqlParameter("@idNivel", idNivel));
            parList.Add(new SqlParameter("@idSubnivel", idSubnivel));
            parList.Add(new SqlParameter("@idPeriodo", idPeriodo));
            parList.Add(new SqlParameter("@minimo", minimo));
            parList.Add(new SqlParameter("@maximo", maximo));
            parList.Add(new SqlParameter("@idEspecialidad", idEspecialidad));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_SELECT_RANKING", parList));
        }
        public string obtenerPromediosGeneralesSubNivel(int idEscuela, int idNivel, int idSubnivel, int idPeriodo, int idAsignatura, int tipo, int idEspecialidad)
        {
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.Add(new SqlParameter("@idEscuela", idEscuela));
            parList.Add(new SqlParameter("@idNivel", idNivel));
            parList.Add(new SqlParameter("@idSubnivel", idSubnivel));
            parList.Add(new SqlParameter("@idPeriodo", idPeriodo));
            parList.Add(new SqlParameter("@idAsignatura", idAsignatura));
            parList.Add(new SqlParameter("@tipo", tipo));
            parList.Add(new SqlParameter("@idEspecialidad", idEspecialidad));
            return Utility.jsonSql((System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_SELECT_PROMEDIO_GENERAL_SUBNIVEL", parList));
        }
        public List<Nivel> PromediosPrint(int idSubnivel, int idPeriodo, int tipo)
        {
            cnn = new Connection();
            List<SqlParameter> parList = new List<SqlParameter>();
            parList.Add(new SqlParameter("@idSubnivel", idSubnivel));
            parList.Add(new SqlParameter("@idPeriodo", idPeriodo));
            parList.Add(new SqlParameter("@tipo", tipo));
            IDataReader dt = (System.Data.IDataReader)Connection.Instance.ExecuteReader("PRC_SELECT_PROMEDIO_GENERAL_SUBNIVEL", parList);
            return Utility.LoadObjectsFromDataReader<Nivel>(dt);
        }
    }
}