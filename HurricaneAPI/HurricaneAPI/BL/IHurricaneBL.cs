using HurricaneAPI.Models;

namespace HurricaneAPI.BL
{
    public interface IHurricaneBL
    {
        Task Create(Hurricane hurrican);
        Task Delete(string id);
        Task<IEnumerable<Hurricane>> GetAllInArea(SearchArea searchArea);
        Task<Hurricane?> GetSingleIfAny(string id);

        Task<List<Hurricane>> GetNamed();
        Task Update(string id, Hurricane updatedHurrican);
    }
}