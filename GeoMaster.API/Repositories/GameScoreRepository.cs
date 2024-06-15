using GeoMaster.API.Interfaces;
using GeoMaster.API.Models.Scores;
using GeoMaster.API.Persistence;

namespace GeoMaster.API.Repositories
{
    public class GameScoreRepository : IGameScoreRepository
    {
        private readonly MongoDbContext _dbContext;

        public GameScoreRepository(MongoDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task SaveGameScoreAsync(GameScore gameScore)
        {
            gameScore.Date = DateTime.Today;
            await _dbContext.GameScoresCollection.InsertOneAsync(gameScore);
        }
    }
}
