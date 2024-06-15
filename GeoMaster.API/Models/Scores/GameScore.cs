using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace GeoMaster.API.Models.Scores
{
    public class GameScore
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; } = default!;

        [BsonElement("score")]
        public int Score { get; set; }

        [BsonElement("gameTime")]
        public int GameTime { get; set; }

        [BsonElement("username")]
        public string Username { get; set; } = default!;

        [BsonElement("gameType")]
        public string GameType { get; set; } = default!;

        [BsonElement("date")]
        [BsonDateTimeOptions(Kind = DateTimeKind.Local)]
        public DateTime? Date { get; set; }
    }
}
