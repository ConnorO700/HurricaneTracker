using HurricaneAPI.Models;
using MongoDB.Driver;
using Microsoft.Extensions.Options;

namespace HurricaneAPI.Services
{
    public class HurricaneService
    {

        private readonly IMongoCollection<Hurricane> _hurricaneCollection;
        public HurricaneService(IOptions<HurricaneDatabaseSettings> hurricaneDatabaseSettings)
        {
            var mongoClient = new MongoClient(hurricaneDatabaseSettings.Value.ConnectionString);
            var mongoDatabase = mongoClient.GetDatabase(hurricaneDatabaseSettings.Value.DatabaseName);
            _hurricaneCollection = mongoDatabase.GetCollection<Hurricane>(hurricaneDatabaseSettings.Value.CollectionName);
        }

        public async Task<List<Hurricane>> GetAsync(FilterDefinition<Hurricane> filter, ProjectionDefinition<Hurricane> projection) =>
            await _hurricaneCollection.Find(filter).Project<Hurricane>(projection).ToListAsync();
            
        
        public async Task<Hurricane?> GetAsync(string id) =>
            await _hurricaneCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

        public async Task CreateAsync(Hurricane newHurricane) =>
            await _hurricaneCollection.InsertOneAsync(newHurricane);

        public async Task UpdateAsync(string id, Hurricane updatedHurricane) => 
            await _hurricaneCollection.ReplaceOneAsync(x => x.Id == id, updatedHurricane);

        public async Task DeleteAsync(string id) =>
            await _hurricaneCollection.DeleteOneAsync(x => x.Id == id);
    }
}
