namespace HurricaneAPI.Models
{
    //Is a box shape for filtering out any Hurricanes that never enter
    public class SearchArea
    {
        public double NorthLatitude { get; set; }
        public double SouthLatitude { get; set; }
        public double WestLongitude { get; set; }
        public double EastLongitude { get; set; }
    }
}
