namespace GeoMaster.API.Models.DbSettings
{
    public class MongoDbSettings
    {
        public string ConnectionURI { get; set; } = default!;
        public string DatabaseName { get; set; } = default!;
        public string CollectionName { get; set; } = default!;
    }
}
