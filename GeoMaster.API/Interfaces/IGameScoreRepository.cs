using GeoMaster.API.Models.Scores;

namespace GeoMaster.API.Interfaces
{
    public interface IGameScoreRepository
    {
        Task SaveGameScoreAsync(GameScore gameScore);

        Task<List<GameScore>> GetGameScoresAsync(string gameType);

        Task DeleteAllDataAsync();
    }
}
