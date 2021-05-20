using System.Collections.Generic;

namespace SapiensProject.Models
{
    public class AdminModel
    {


    }
    #region Entities & Extension
    public static class Extension
    {

        public static List<T> ToAdd<T>(this List<T> list, T item)
        {
            list.Add(item);
            return list;
        }
    }
    #endregion
}