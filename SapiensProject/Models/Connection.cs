using SapiensProject.Models.Entities;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Globalization;
using System.IO;
using System.Text;
using System.Web;

namespace SapiensProject.Models
{
    public class Connection
    {
        #region
        private static volatile Connection instance;
        private string ValorParametro;
        private static object syncRoot = new Object();
        public string connectionString = System.Configuration.ConfigurationManager.ConnectionStrings["conex"].ToString();
        #endregion
        /// <summary>
        /// 
        /// </summary>

        /// <summary>
        /// 
        /// </summary>
        public static Connection Instance
        {
            get
            {
                if (instance == null)
                {
                    lock (syncRoot)
                    {
                        if (instance == null)
                            instance = new Connection();
                    }
                }

                return instance;
            }
        }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2202:Do not dispose objects multiple times"), System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Security", "CA2100:Review SQL queries for security vulnerabilities")]
        public void ExecuteNonQuery(string storedProcedureName, List<SqlParameter> arrParam)
        {
            try
            {
                using (SqlConnection cnn = new SqlConnection(connectionString))
                {
                    cnn.Open();
                    using (SqlCommand cmd = new SqlCommand())
                    {
                        ValorParametro = "";
                        cmd.Connection = cnn;
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.CommandText = storedProcedureName;
                        cmd.CommandTimeout = 540000;
                        cmd.Prepare();
                        if (arrParam != null)
                        {
                            foreach (SqlParameter param in arrParam)
                            {
                                cmd.Parameters.Add(param);
                                ValorParametro += param.Value.ToString() + ";";
                            }
                        }
                        cmd.ExecuteNonQuery();
                        cnn.Close();
                        cnn.Dispose();
                    }
                }
            }
            catch (Exception e)
            {
                string parametros = String.Join(" ", arrParam);
                string valores = ValorParametro;
                WriteErrorLog("Clase Connection: " + e.Message, storedProcedureName, parametros, valores);
                throw new Exception("Error de conexión contra la base de datos");
            }

        }
        /// <summary>
        /// Devuelve información de la base de datos
        /// </summary>
        /// <param name="storedProcedureName"></param>
        /// <param name="arrParam"></param>
        /// <returns></returns>
        public IDataReader ExecuteReader(string storedProcedureName, List<SqlParameter> arrParam)
        {
            try
            {

                using (SqlConnection cnn = new SqlConnection(connectionString))
                {
                    cnn.Open();
                    using (SqlCommand cmd = new SqlCommand())
                    {
                        ValorParametro = "";
                        cmd.Connection = cnn;
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.CommandText = storedProcedureName;
                        cmd.CommandTimeout = 540000;
                        cmd.Prepare();
                        if (arrParam != null)
                        {
                            foreach (SqlParameter param in arrParam)
                            {
                                cmd.Parameters.Add(param);
                                ValorParametro += param.Value.ToString() + ";";
                            }
                        }

                        DataTable datos = new DataTable();
                        using (SqlDataAdapter adapter = new SqlDataAdapter(cmd))
                        {
                            adapter.Fill(datos);
                            adapter.Dispose();
                        }
                        cmd.Dispose();
                        cnn.Close();
                        cnn.Dispose();
                        return datos.CreateDataReader();
                    }
                }
            }
            catch (Exception e)
            {
                string parametros = String.Join(" ", arrParam);
                string valores = ValorParametro;
                WriteErrorLog("Clase Connection: " + e.Message, storedProcedureName, parametros, valores);
                throw new Exception(e.Message.ToString());
            }
        }
        public IDataReader ExecuteReaderProcesos(string storedProcedureName, List<SqlParameter> arrParam)
        {
            try
            {

                using (SqlConnection cnn = new SqlConnection(connectionString))
                {
                    cnn.Open();
                    using (SqlCommand cmd = new SqlCommand())
                    {
                        ValorParametro = "";
                        cmd.Connection = cnn;
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.CommandText = storedProcedureName;
                        cmd.CommandTimeout = 0;
                        cmd.Prepare();
                        if (arrParam != null)
                        {
                            foreach (SqlParameter param in arrParam)
                            {
                                cmd.Parameters.Add(param);
                                ValorParametro += param.Value.ToString() + ";";
                            }
                        }

                        DataTable datos = new DataTable();
                        using (SqlDataAdapter adapter = new SqlDataAdapter(cmd))
                        {
                            adapter.Fill(datos);
                            adapter.Dispose();
                        }
                        cmd.Dispose();
                        cnn.Close();
                        cnn.Dispose();
                        return datos.CreateDataReader();
                    }
                }
            }
            catch (Exception e)
            {
                string parametros = String.Join(" ", arrParam);
                string valores = ValorParametro;
                WriteErrorLog("Clase Connection: " + e.Message, storedProcedureName, parametros, valores);
                throw new Exception("Error de conexión contra la base de datos");
            }
        }
        public IDataReader ExecuteReaderDataSet(string storedProcedureName, List<SqlParameter> arrParam)
        {
            try
            {
                using (SqlConnection cnn = new SqlConnection(connectionString))
                {
                    cnn.Open();
                    using (SqlCommand cmd = new SqlCommand())
                    {
                        ValorParametro = "";
                        cmd.Connection = cnn;
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.CommandText = storedProcedureName;
                        cmd.CommandTimeout = 540000;
                        cmd.Prepare();
                        if (arrParam != null)
                        {
                            foreach (SqlParameter param in arrParam)
                            {
                                cmd.Parameters.Add(param);
                                ValorParametro += param.Value.ToString() + ";";
                            }
                        }
                        DataSet datos = new DataSet();
                        using (SqlDataAdapter adapter = new SqlDataAdapter(cmd))
                        {
                            adapter.Fill(datos);
                            adapter.Dispose();
                        }
                        cmd.Dispose();
                        cnn.Close();
                        cnn.Dispose();
                        return datos.CreateDataReader();
                    }
                }
            }
            catch (Exception e)
            {
                string parametros = String.Join(" ", arrParam);
                string valores = ValorParametro;
                WriteErrorLog("Clase Connection: " + e.Message, storedProcedureName, parametros, valores);
                throw new Exception("Error de conexión contra la base de datos");
            }
        }
        public void WriteErrorLog(string Message, string StoreProcedure, string parametros, string valores)
        {
            StreamWriter sw = null;
            try
            {
                string FileName = "ErrorLog_" + DateTime.Now.ToString("Mdyyyy");
                sw = new StreamWriter(HttpContext.Current.Server.MapPath("~/" + FileName + ".txt"), true);
                sw.WriteLine(DateTime.Now.ToString() + ": " + Message);
                sw.WriteLine("SP: " + StoreProcedure);
                sw.WriteLine("Parametros: " + parametros);
                sw.WriteLine("Valores: " + valores);
                sw.Flush();
                sw.Close();
                StringBuilder msg = new StringBuilder();
                msg.Append("Fecha: " + DateTime.Now.ToString() + "<br/>");
                msg.Append("Message: " + Message + "<br/>");
                msg.Append("SP: " + StoreProcedure + "<br/>");
                msg.Append("Parametros: " + parametros + "<br/>");
                msg.Append("Valores: " + valores + "<br/>");
                Mensajes msj = new Mensajes();
                msj.enviarCorreo("ERROR LOG - " + DateTime.Now.ToString("dd/MM/yyyy HH:mm:ss.fff", CultureInfo.InvariantCulture), "ERROR_LOG", -1, msg.ToString(), "");
            }
            catch (Exception)
            {
            }
        }

    }


}

