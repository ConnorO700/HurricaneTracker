namespace HurricaneAPI.Models
{
    public class HurricaneDatabaseSettings
    {
        public string ConnectionString { get; set; } = null!;

        public string DatabaseName { get; set; } = null!;

        public string CollectionName { get; set; } = null!;
    }
}
