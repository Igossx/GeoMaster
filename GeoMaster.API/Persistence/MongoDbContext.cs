using GeoMaster.API.Models.DbSettings;
using GeoMaster.API.Models.Scores;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace GeoMaster.API.Persistence
{
    public class MongoDbContext
    {
        public IMongoCollection<GameScore> GameScoresCollection { get; }

        public MongoDbContext(IOptions<MongoDbSettings> mongoDbSettings)
        {
            var mongoClient = new MongoClient(mongoDbSettings.Value.ConnectionURI);
            var mongoDatabase = mongoClient.GetDatabase(mongoDbSettings.Value.DatabaseName);
            GameScoresCollection = mongoDatabase.GetCollection<GameScore>(mongoDbSettings.Value.CollectionName);
        }
    }
}
