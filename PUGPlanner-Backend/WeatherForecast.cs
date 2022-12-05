namespace PUGPlanner_Backend
{
    public class WeatherForecast
    {
        public DateTime Date { get; set; }

        public int TemperatureC { get; set; }

        public int TemperatureF => TemperatureC * 3;

        public string Summary { get; set; }
    }
}
