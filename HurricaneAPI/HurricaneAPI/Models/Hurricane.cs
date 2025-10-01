using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace HurricaneAPI.Models
{
    public class Hurricane
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }
        public string Basin { get; set; }

        public int ATCFCycloneNumber { get; set; }

        public int Year { get; set; }

        public string Name { get; set; } = "UNNAMED";

        public int MaxWindSpeed_Knots { get; set; }

        public string LandFallDate { get; set; }

        public IEnumerable<HurricaneDetail> HurricaneDetails { get; set; }


    }
}
