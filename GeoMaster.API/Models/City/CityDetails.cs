using Newtonsoft.Json;

namespace GeoMaster.API.Models.City
{
    public class CityDetails
    {
        [JsonProperty("name")]
        public string Name { get; set; } = default!;

        [JsonProperty("country")]
        public string Country { get; set; } = default!;

        [JsonProperty("population")]
        public string Population { get; set; } = default!;

        [JsonProperty("is_capital")]
        public bool IsCapital { get; set; }
    }
}
