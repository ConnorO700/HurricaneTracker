using HurricaneAPI.Models;
using HurricaneAPI.Services;
using MongoDB.Driver;

namespace HurricaneAPI.BL
{
    public class HurricaneBL : IHurricaneBL
    {
        private readonly HurricaneService _service;
        public HurricaneBL(HurricaneService service)
        {
            _service = service;
        }


        public async Task<IEnumerable<Hurricane>> GetAllInArea(SearchArea searchArea)
        {
            //adding a filter to bring back only hurricanes that have at least one detail in search area
            var filter = Builders<Hurricane>.Filter.Where(h => h.LandFallDate != "0001-01-01T01:00:00Z" && h.HurricaneDetails.Where(hd =>
                hd.Latitude <= searchArea.NorthLatitude
                && hd.Latitude >= searchArea.SouthLatitude
                && hd.Longitude >= searchArea.WestLongitude
                && hd.Longitude <= searchArea.EastLongitude
            ).Any());

            //add exclusion filter for details to reduce data load
            var projection = Builders<Hurricane>.Projection.Exclude(h => h.HurricaneDetails);

            var hurricanes = await _service.GetAsync(filter, projection);
            return hurricanes;
        }

        public async Task<Hurricane?> GetSingleIfAny(string id) =>
            await _service.GetAsync(id);


        //added CRUD operations but these are not used
        public async Task Create(Hurricane hurrican) =>
            await _service.CreateAsync(hurrican);


        public async Task Update(string id, Hurricane updatedHurrican) =>
            await _service.UpdateAsync(id, updatedHurrican);

        public async Task Delete(string id) =>
            await _service.DeleteAsync(id);

    }
}
