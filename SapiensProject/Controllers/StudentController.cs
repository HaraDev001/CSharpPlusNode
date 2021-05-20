using System;

namespace SapiensProject.Controllers
{
    public class StudentController
    {
        private string formatearPuntos(string puntos)
        {
            if (puntos.EndsWith(".0"))
                return puntos.Substring(0, puntos.Length - 2);
            else if (puntos.EndsWith(".00"))
                return puntos.Substring(0, puntos.Length - 3);
            else
                return puntos;
        }
        private string convertirSegundosAHoras(double seconds)
        {
            TimeSpan time = TimeSpan.FromSeconds(seconds);
            return time.ToString(@"h\:mm\:ss");
        }
    }
}