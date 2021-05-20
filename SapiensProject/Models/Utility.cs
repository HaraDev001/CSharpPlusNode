using OfficeOpenXml;
using SapiensProject.Controllers;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Net;
using System.Reflection;
using System.Text;
using System.Web;
using System.Web.Configuration;
using System.Web.UI;
using System.Xml;

namespace SapiensProject.Models
{
    public class Utility
    {
        public static void WriteErrorLog(string Message)
        {
            StreamWriter sw = null;
            try
            {
                sw = new StreamWriter(HttpContext.Current.Server.MapPath("~/LoginLog.txt"), true);
                sw.WriteLine(DateTime.Now.ToString() + ": " + Message);
                sw.Flush();
                sw.Close();
                ////////////////////////SapiensProject.Controllers.RestServiceController service = new SapiensProject.Controllers.RestServiceController();
                ////////////////////////service.enviarNotificacionCorreo("ERROR_LOG", -1, Message);
            }
            catch (Exception)
            {

            }
        }
        public string GetIP4Address()
        {
            string IP4Address = String.Empty;

            foreach (IPAddress IPA in Dns.GetHostAddresses(HttpContext.Current.Request.UserHostAddress))
            {
                if (IPA.AddressFamily.ToString() == "InterNetwork")
                {
                    IP4Address = IPA.ToString();
                    break;
                }
            }

            if (IP4Address != String.Empty)
            {
                return IP4Address;
            }

            foreach (IPAddress IPA in Dns.GetHostAddresses(Dns.GetHostName()))
            {
                if (IPA.AddressFamily.ToString() == "InterNetwork")
                {
                    IP4Address = IPA.ToString();
                    break;
                }
            }

            return IP4Address;
        }
        static string strConnString = ConfigurationManager.ConnectionStrings["conex"].ConnectionString;
        public static List<T> LoadObjectsFromDataReader<T>(IDataReader dr) where T : new()
        {
            Type type = typeof(T);
            List<T> retval = new List<T>();

            List<PropertyInfo> itemProperties = new List<PropertyInfo>();
            for (int i = 0; i < dr.FieldCount; i++)
            {
                string s = dr.GetName(i);
                var pi = type.GetProperty(s, BindingFlags.Instance |
                BindingFlags.Public | BindingFlags.SetProperty);
                itemProperties.Add(pi);
            }

            object[] oo = new object[itemProperties.Count];
            while (dr.Read())
            {
                dr.GetValues(oo);
                T item = new T();
                int fieldIndex = -1;
                foreach (var pi in itemProperties)
                {
                    fieldIndex++;
                    if (pi != null)
                    {
                        object o = oo[fieldIndex];
                        if (DBNull.Value.Equals(o))
                        {
                            o = null;
                        }
                        try
                        {
                            pi.SetValue(item, o, null);
                        }
                        catch (Exception)
                        {
                        }
                    }
                }
                retval.Add(item);
            }
            dr.Close();
            dr.Dispose();
            return retval;
        }
        public DataSet GetData(SqlCommand cmd, int pageIndex, int PageSize)
        {

            using (SqlConnection con = new SqlConnection(strConnString))
            {
                using (SqlDataAdapter sda = new SqlDataAdapter())
                {
                    cmd.Connection = con;
                    sda.SelectCommand = cmd;
                    using (DataSet ds = new DataSet())
                    {
                        sda.Fill(ds, "Customers");
                        DataTable dt = new DataTable("Pager");
                        dt.Columns.Add("PageIndex");
                        dt.Columns.Add("PageSize");
                        dt.Columns.Add("RecordCount");
                        dt.Rows.Add();
                        dt.Rows[0]["PageIndex"] = pageIndex;
                        dt.Rows[0]["PageSize"] = PageSize;
                        dt.Rows[0]["RecordCount"] = 0;
                        foreach (DataRow dtRow in ds.Tables[0].Rows)
                        {
                            dt.Rows[0]["RecordCount"] = dtRow[1].ToString();
                        }
                        ds.Tables.Add(dt);
                        return ds;
                    }
                }
            }
        }
        public static string formatearNotaDecimales(string nota)
        {
            int letrasCounter = System.Text.RegularExpressions.Regex.Matches(nota, @"[a-zA-Z]").Count;
            if (letrasCounter > 0) return nota;
            if (nota != "")
            {
                if (nota.LastIndexOf(".") == -1)
                {
                    nota = nota + ".0";
                }
                else
                {
                    nota = nota.Substring(0, nota.LastIndexOf(".") + 2);
                }
            }
            else
            {
                nota = "&nbsp;";
            }
            return nota;
        }
        public DataSet GetData_metodologia(SqlCommand cmd, int pageIndex, int PageSize)
        {

            using (SqlConnection con = new SqlConnection(strConnString))
            {
                using (SqlDataAdapter sda = new SqlDataAdapter())
                {
                    cmd.Connection = con;
                    sda.SelectCommand = cmd;
                    using (DataSet ds = new DataSet())
                    {
                        sda.Fill(ds, "Customers");
                        DataTable dt = new DataTable("Pager");
                        dt.Columns.Add("PageIndex");
                        dt.Columns.Add("PageSize");
                        dt.Columns.Add("RecordCount");
                        dt.Rows.Add();
                        dt.Rows[0]["PageIndex"] = pageIndex;
                        dt.Rows[0]["PageSize"] = PageSize;
                        dt.Rows[0]["RecordCount"] = 0;
                        foreach (DataRow dtRow in ds.Tables[0].Rows)
                        {
                            dt.Rows[0]["RecordCount"] = dtRow[1].ToString();
                        }
                        dt.Rows[0]["PageSize"] = cmd.Parameters["@PageSize_res"].Value;
                        ds.Tables.Add(dt);
                        return ds;
                    }
                }
            }
        }
        public static DataTable ToDataTable<T>(List<T> items)
        {
            DataTable dataTable = new DataTable(typeof(T).Name);
            //Get all the properties
            PropertyInfo[] Props = typeof(T).GetProperties(BindingFlags.Public | BindingFlags.Instance);
            foreach (PropertyInfo prop in Props)
            {
                //Setting column names as Property names
                dataTable.Columns.Add(prop.Name);
            }
            foreach (T item in items)
            {
                var values = new object[Props.Length];
                for (int i = 0; i < Props.Length; i++)
                {
                    //inserting property values to datatable rows
                    values[i] = Props[i].GetValue(item, null);
                }
                dataTable.Rows.Add(values);
            }
            return dataTable;
        }
        public DataSet GetData_sinPaginacion(SqlCommand cmd)
        {

            using (SqlConnection con = new SqlConnection(strConnString))
            {
                using (SqlDataAdapter sda = new SqlDataAdapter())
                {
                    cmd.Connection = con;
                    sda.SelectCommand = cmd;
                    using (DataSet ds = new DataSet())
                    {
                        sda.Fill(ds, "Customers");
                        return ds;
                    }
                }
            }
        }
        public static string jsonSql(IDataReader dt)
        {
            StringBuilder jsonResult = new StringBuilder();
            while (dt.Read())
            {
                jsonResult.Append(dt.GetValue(0).ToString());
            }
            return jsonResult.ToString();
        }
        public static bool IsEmptyString(string str)
        {
            if (str == null || str == String.Empty)
                return true;
            return false;
        }
        public static bool IsEmptyString(object obj)
        {
            if (obj == null || obj == DBNull.Value)
                return true;
            if (obj.ToString() == String.Empty)
                return true;
            return false;
        }
        public static bool IsEmptyGuid(Guid g)
        {
            if (g == Guid.Empty)
                return true;
            return false;
        }
        public static bool IsEmptyGuid(object obj)
        {
            if (obj == null || obj == DBNull.Value)
                return true;
            string str = obj.ToString();
            if (str == String.Empty)
                return true;
            Guid g = XmlConvert.ToGuid(str);
            if (g == Guid.Empty)
                return true;
            return false;
        }
        public string perfilbloqueado(int idUsuario, bool DesactivarUsuarioPorPeriodo, int Activo)
        {
            StringBuilder script = new StringBuilder();
            //Promedio_Diurno
            //Promedio_Laboral
            //Promedio_Preescolar
            if (Activo == 2)
            {
                //string html = ModalGenerico("Comunicado de la Administración.", "Por motivo de saldos vencidos a la fecha su usuario esta bloqueado. Les exhortamos acercarse a la administraci&oacute;n para realizar los pagos pendientes.", "La Administración.");
                string html = ModalGenerico("Comunicado de la Administración.", "Su Usuario ha sido bloqueado", "La Administración.");
                script.Append(" $('#DivGenericMsj').append('" + html + "'); ");
                script.Append(" $('.b1').removeAttr('href');  $('.b1').attr('href', '#'); $('#ModalGenerico').modal('show');");
            }
            else if (Activo == 1)
            {
                script.Append("$('#DivGenericMsj').append('')");
            }
            return script.ToString();
        }
        public string perfilStudents(int idEscuela, int idUsuario, bool DesactivarUsuarioPorPeriodo, int Activo, bool encuesta)
        {
            StringBuilder script = new StringBuilder();
            script.Append("<script>");
            if (DesactivarUsuarioPorPeriodo == true)
            {
                script.Append("$(\"#Promedio_Laboral\").show();");
            }
            else if (DesactivarUsuarioPorPeriodo == false)
            {
                StudentModel stModel = new StudentModel();
                var dt = stModel.esEstudiantePreescolar(idUsuario, idEscuela);
                bool EsPreescolar = false;
                string html = string.Empty;
                bool WebBoletinView = false;
                while (dt.Read())
                {
                    EsPreescolar = Convert.ToBoolean(dt["EsPreescolar"]);
                    WebBoletinView = Convert.ToBoolean(dt["WebBoletinView"]);
                }
                if (EsPreescolar)
                {
                    script.Append("$(\"#Promedio_Preescolar\").show();");
                }
                else
                {
                    script.Append("$(\"#Promedio_Diurno\").show();");
                }
                if(WebBoletinView)
                    script.Append("$(\"#Boletin_Menu\").show();");
                //Para los estudiantes activos
                if (Activo == 2)
                {
                    var dtb = stModel.GetMensajeBloqueo(idEscuela);
                    string MensajeBloqueo = string.Empty;
                    while (dtb.Read())
                    {
                        MensajeBloqueo = dtb["MensajeBloqueo"].ToString().Replace("'", " ");
                    }
                    script.Append(" $(\"#DivGenericMsj\").append('<div id=\"ModalGenerico\" class=\"modal fade\"  " +
                        "tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"true\" data-backdrop=\"static\">" +
                        "<div  class=\"modal-dialog\" >" +
                        "<div class=\"modal-content\" >" +
                        "<div class=\"modal-header\" >" +
                        "<h4 class=\"modal-title\"><span data-i18n=\"header.t52\"> Comunicado de la Administración.</span></h4>" +
                        "<button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span aria-hidden=\"true\">×</span></button>" +
                        "</div><div class=\"modal-body\">" +
                        "<p align=\"justify\">" + MensajeBloqueo.ToString().Replace("\"", " ") + "</p>" +
                        "<p class=\"pull-right\" >La Administración.</p>" +
                        "</div><div class=\"modal-footer\">" +
                        "<button type=\"button\" class=\"btn btn-default float-right\" data-dismiss=\"modal\"><span data-i18n=\"cerrar\"> Cerrar</span></button>" +
                        "</div></div></div></div>');");
                    script.Append(" $(\"#ModalGenerico\").modal(\"show\"); ");
                }
                else if (Activo == 1)
                {
                    if (encuesta == false)
                    {
                        script.Append(" $('#modenc').modal('show');");
                    }
                }
            }
            script.Append("</script>");
            return script.ToString();
        }
        public string perfilStudentsAlerta(int idEscuela, int idUsuario, bool DesactivarUsuarioPorPeriodo, int Activo, bool encuesta)
        {
            StringBuilder script = new StringBuilder();
            script.Append("<script>");         
                StudentModel stModel = new StudentModel();                
                  string html = ModalGenerico("Comunicado de la Administración.", "<p>Se les pide a los Padres de Familias o Acudientes(SOLO PADRES DE FAMILIA O ACUDIENTE) del Centro Educativo Colinas de las cumbres que llenen la siguiente ENCUESTA,PARA IDENTIFICAR LA APROBACIÓN DE LA EDUCACIÓN VIRTUAL, en el siguiente link:</p><p> <a target=\"_blank\" class=\"text-aqua\" href=\"https://es.surveymonkey.com/r/F6QPLVK\">https://es.surveymonkey.com/r/F6QPLVK</a> </p>", "La Administración.");
                    script.Append(" $('#DivGenericMsj').append('" + html + "'); ");                 
                    script.Append(" $('#ModalGenerico').modal('show'); ");
            script.Append("</script>");
            return script.ToString();
        }
        public dynamic cargarFaceBook(string FacebooPageId)
        {
            return "";
        }
        public string SaveImage(string Based64BinaryString, int tipo, string nomenclatura)
        {
            string format = "";
            string name = "";
            try
            {
                string path = HttpContext.Current.Server.MapPath("~/Documents/");
                if (tipo == 1)
                {
                    if (Based64BinaryString.Contains("data:image/jpeg;base64,"))
                    {
                        format = "jpg";
                    }
                    if (Based64BinaryString.Contains("data:image/png;base64,"))
                    {
                        format = "png";
                    }
                    string str = Based64BinaryString.Replace("data:image/jpeg;base64,", " ");//jpg check
                    str = str.Replace("data:image/png;base64,", " ");//png check
                    byte[] data = Convert.FromBase64String(str);
                    MemoryStream ms = new MemoryStream(data, 0, data.Length);
                    ms.Write(data, 0, data.Length);
                    System.Drawing.Image image = System.Drawing.Image.FromStream(ms, true);
                    name = DateTime.Now.ToString("hhmmss");
                    name = nomenclatura + name + "." + format;
                    image.Save(path + "/" + name);
                }
            }
            catch (Exception)
            {
            }
            return name;
        }
        public string SaveProfilePhoto(string Based64BinaryString, int tipo, string nomenclatura)
        {
            string format = "";
            string name = "";
            try
            {
                string path = HttpContext.Current.Server.MapPath("~/Documents/ProfilePhotos/");
                if (tipo == 1)
                {
                    if (Based64BinaryString.Contains("data:image/jpeg;base64,"))
                    {
                        format = "jpg";
                    }
                    if (Based64BinaryString.Contains("data:image/png;base64,"))
                    {
                        format = "png";
                    }
                    string str = Based64BinaryString.Replace("data:image/jpeg;base64,", " ");//jpg check
                    str = str.Replace("data:image/png;base64,", " ");//png check
                    byte[] data = Convert.FromBase64String(str);
                    MemoryStream ms = new MemoryStream(data, 0, data.Length);
                    ms.Write(data, 0, data.Length);
                    System.Drawing.Image image = System.Drawing.Image.FromStream(ms, true);
                    name = DateTime.Now.ToString("yyyyMMddHHmmss");
                    name = nomenclatura + name + "." + format;
                    image.Save(path + "/" + name);
                }
            }
            catch (Exception)
            {
            }
            return name;
        }
        public string SaveFileOfWebPage(string stream, int tipo, string nomenclatura)
        {
            string format = "";
            string name = "";
            //tipo 1= imagenes (jpg, png) tipo 2= documentos *
            try
            {
                string path = HttpContext.Current.Server.MapPath("~/Documents/" + nomenclatura + "/");
                if (tipo == 1)
                {
                    if (stream.Contains("data:image/jpeg;base64,"))
                    {
                        format = "jpg";
                    }
                    if (stream.Contains("data:image/png;base64,"))
                    {
                        format = "png";
                    }
                    string str = stream.Replace("data:image/jpeg;base64,", " ");//jpg check
                    str = str.Replace("data:image/png;base64,", " ");//png check
                    byte[] data = Convert.FromBase64String(str);
                    MemoryStream ms = new MemoryStream(data, 0, data.Length);
                    ms.Write(data, 0, data.Length);
                    System.Drawing.Image image = System.Drawing.Image.FromStream(ms, true);
                    name = DateTime.Now.ToString("hhmmss");
                    name = nomenclatura + name + "." + format;
                    image.Save(path + "/" + name);
                }
                if (tipo == 2)
                {
                    string memString = stream;
                    // convert string to stream
                    byte[] buffer = Encoding.ASCII.GetBytes(memString);
                    MemoryStream ms = new MemoryStream(buffer);
                    //write to file
                    FileStream file = new FileStream(path, FileMode.Create, FileAccess.Write);
                    ms.WriteTo(file);
                    file.Close();
                    ms.Close();
                }
            }
            catch (Exception)
            {
            }
            return name;
        }
        public void DeleteProfilePhoto(string NamePhoto, string nomenclatura)
        {
            string path = HttpContext.Current.Server.MapPath("~/Documents/" + nomenclatura + "/");
            if (File.Exists(path + "" + NamePhoto))
            {
                File.Delete(path + "" + NamePhoto);
            }
        }
        public static string ModalGenerico(string titulo, string mensaje, string firma)
        {
            StringBuilder script = new StringBuilder();
            script.Append("<div id=ModalGenerico class=\"modal fade\"  tabindex=-1 role=dialog aria-labelledby=myModalLabel aria-hidden=true data-backdrop=static>" +
                        "<div  class=modal-dialog >" +
                        "<div class=modal-content >" +
                        "<div class=modal-header >" +
                        "<h4 class=modal-title>" + titulo + "</h4>" +
                        "<button type=button class=close data-dismiss=modal aria-label=Close><span aria-hidden=true>×</span></button>" +
                        "</div><div class=modal-body>" +
                        "<p align=justify>" + mensaje + "</p>" +
                        "<p class=pull-right >" + firma + "</p>" +
                        "</div><div class=modal-footer>" +
                        "<button type=button class=\"btn btn-default float-right\" data-dismiss=modal>Cerrar</button>" +
                        "</div></div></div></div>");
            return script.ToString();
        }
        public static void executeJavaScript(Page page, string scriptKey, string script)
        {
            page.ClientScript.RegisterStartupScript(page.GetType(), scriptKey, script, true);
        }
        public static string JavaScriptStringLiteral(string str)
        {
            var sb = new StringBuilder();
            foreach (char c in str)
            {
                switch (c)
                {
                    case '\"':
                        //sb.Append("\\\"");
                        sb.Append("\\'\\'");
                        break;
                    case '\'':
                        //sb.Append("\\\"");
                        sb.Append("\\'");
                        break;
                    case '\\':
                        sb.Append("\\\\");
                        break;
                    case '\b':
                        sb.Append("\\b");
                        break;
                    case '\f':
                        sb.Append("\\f");
                        break;
                    case '\n':
                        sb.Append("\\n");
                        break;
                    case '\r':
                        sb.Append("\\r");
                        break;
                    case '\t':
                        sb.Append("\\t");
                        break;
                    default:
                        int i = (int)c;
                        if (i < 32 || i > 127)
                        {
                            sb.AppendFormat("\\u{0:X04}", i);
                        }
                        else
                        {
                            sb.Append(c);
                        }
                        break;
                }
            }
            return sb.ToString();
        }
        public static DataTable ExcelToDataTable(ExcelPackage package)
        {
            ExcelWorksheet workSheet = package.Workbook.Worksheets.First();
            DataTable table = new DataTable();
            foreach (var firstRowCell in workSheet.Cells[1, 1, 1, workSheet.Dimension.End.Column])
            {
                table.Columns.Add(firstRowCell.Text);
            }

            for (var rowNumber = 2; rowNumber <= workSheet.Dimension.End.Row; rowNumber++)
            {
                var row = workSheet.Cells[rowNumber, 1, rowNumber, workSheet.Dimension.End.Column];
                var newRow = table.NewRow();
                foreach (var cell in row)
                {
                    if (cell.Start.Column == 1 || cell.Start.Column == 3 || cell.Start.Column == 4 || cell.Start.Column == 6)
                    {
                        newRow[cell.Start.Column - 1] = cell.Text;
                    }
                }

                //Solo se agrega a la fila si tiene Credit Amnt
                if (newRow.ItemArray[5].ToString() != "")
                {
                    table.Rows.Add(newRow);
                }
            }
            table.Columns.Remove("Receipt Number");
            table.Columns.Remove("Debit Amnt");
            table.Columns.Remove("Name");
            table.Columns.Remove("Amt Recvd");
            table.Columns.Remove("Payment Method");
            int _rowsCount = table.Rows.Count - 1;
            table.Rows.RemoveAt(_rowsCount);
            return table;
        }
        public static string getFileIconByExtension(string extension)
        {
            string icon = "";
            switch (extension)
            {
                case ".doc":
                case ".docx":
                    icon = "fa-file-word-o";
                    break;
                case ".xls":
                case ".xlsx":
                    icon = "fa-file-excel-o";
                    break;
                case ".pdf":
                    icon = "fa-file-pdf-o";
                    break;
                case ".ppt":
                case ".pptx":
                    icon = "fa-file-powerpoint-o";
                    break;
                case ".txt":
                    icon = "fa-file-text-o";
                    break;
                case ".jpg":
                case ".jpeg":
                case ".bmp":
                case ".gif":
                case ".png":
                    icon = "fa-file-image-o";
                    break;
                default:
                    icon = "fa-file-o";
                    break;
            }
            return icon;
        }
        public static string ToAbsoluteUrl(string relativeUrl)
        {
            if (string.IsNullOrEmpty(relativeUrl))
                return relativeUrl;

            if (HttpContext.Current == null)
                return relativeUrl;

            if (relativeUrl.StartsWith("/"))
                relativeUrl = relativeUrl.Insert(0, "~");
            if (!relativeUrl.StartsWith("~/"))
                relativeUrl = relativeUrl.Insert(0, "~/");

            var url = HttpContext.Current.Request.Url;
            var port = url.Port != 80 ? (":" + url.Port) : String.Empty;

            return String.Format("{0}://{1}{2}{3}",
                url.Scheme, url.Host, port, VirtualPathUtility.ToAbsolute(relativeUrl));
        }        
    }
}