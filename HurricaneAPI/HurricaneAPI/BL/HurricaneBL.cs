using HurricaneAPI.Models;
using HurricaneAPI.Services;
using MongoDB.Driver;

namespace HurricaneAPI.BL
{
    public class HurricaneBL
    {
        private readonly HurricaneService _service;
        public HurricaneBL(HurricaneService service)
        {
            _service = service;
        }


        public async Task<IEnumerable<Hurricane>> GetAllInArea(SearchArea searchArea)
        {
            var filter = Builders<Hurricane>.Filter.Where(h => h.HurricaneDetails.Where(hd =>
                hd.Latitude <= searchArea.NorthLatitude
                && hd.Latitude >= searchArea.SouthLatitude
                && hd.Longitude >= searchArea.WestLongitude
                && hd.Longitude <= searchArea.EastLongitude
            ).Any());

            var projection = Builders<Hurricane>.Projection.Exclude(h => h.HurricaneDetails);

            var hurricanes = await _service.GetAsync(filter, projection);
            return hurricanes;
        }

        public async Task<Hurricane?> GetSingleIfAny(string id) =>
            await _service.GetAsync(id);


        public async Task Create(Hurricane hurrican) =>
            await _service.CreateAsync(hurrican);

        
        public async Task Update(string id, Hurricane updatedHurrican) =>
            await _service.UpdateAsync(id, updatedHurrican);

        public async Task Delete(string id) =>
            await _service.DeleteAsync(id);

    }
}
