using GeoMaster.API.Interfaces;
using GeoMaster.API.Models.Scores;
using GeoMaster.API.Persistence;
using MongoDB.Driver;

namespace GeoMaster.API.Repositories
{
    public class GameScoreRepository : IGameScoreRepository
    {
        private readonly MongoDbContext _dbContext;

        public GameScoreRepository(MongoDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task DeleteAllDataAsync()
        {
            var filter = Builders<GameScore>.Filter.Empty;
            await _dbContext.GameScoresCollection.DeleteManyAsync(filter);
        }

        public async Task<List<GameScore>> GetGameScoresAsync(string gameType)
        {
            var filter = Builders<GameScore>.Filter.Eq(g => g.GameType, gameType);
            var sort = Builders<GameScore>.Sort.Descending(g => g.Score).Ascending(g => g.GameTime);
            return await _dbContext.GameScoresCollection.Find(filter).Sort(sort).ToListAsync();
        }

        public async Task SaveGameScoreAsync(GameScore gameScore)
        {
            gameScore.Date = DateTime.Today;
            await _dbContext.GameScoresCollection.InsertOneAsync(gameScore);
        }
    }
}
