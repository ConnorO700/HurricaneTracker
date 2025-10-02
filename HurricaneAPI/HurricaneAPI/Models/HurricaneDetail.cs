namespace HurricaneAPI.Models
{
    public class HurricaneDetail
    {
        public string Date { get; set; }

        public string RecordIdentifier { get; set; }

        public string SystemStatus { get; set; }

        public double Latitude { get; set; }
        public double Longitude { get; set; }

        public int WindSpeed_Knots { get; set; }

        public int MinimumPressure_Millibars { get; set; }

        public int MaximumWindRadius_NM { get; set; }

        public int WindRadii_NE_34Knots { get; set; }
        public int WindRadii_SE_34Knots { get; set; }
        public int WindRadii_SW_34Knots { get; set; }
        public int WindRadii_NW_34Knots { get; set; }

        public int WindRadii_NE_50Knots { get; set; }
        public int WindRadii_SE_50Knots { get; set; }
        public int WindRadii_SW_50Knots { get; set; }
        public int WindRadii_NW_50Knots { get; set; }

        public int WindRadii_NE_64Knots { get; set; }
        public int WindRadii_SE_64Knots { get; set; }
        public int WindRadii_SW_64Knots { get; set; }
        public int WindRadii_NW_64Knots { get; set; }

    }
}
