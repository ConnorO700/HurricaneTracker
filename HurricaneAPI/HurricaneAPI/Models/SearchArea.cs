namespace HurricaneAPI.Models
{
    //Is a box shape for filtering out any Hurricanes that never enter
    public class SearchArea
    {
        public double NorthParallel { get; set; }
        public double SouthParallel { get; set; }
        public double WestMeridian { get; set; }
        public double EastMeridian { get; set; }
    }
}
