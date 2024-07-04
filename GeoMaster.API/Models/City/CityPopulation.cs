using Newtonsoft.Json;

namespace GeoMaster.API.Models.City
{
    public class CityPopulation
    {
        [JsonProperty("name")]
        public string Name { get; set; } = default!;

        [JsonProperty("country")]
        public string CountryIso { get; set; } = default!;

        [JsonProperty("population")]
        public string Population { get; set; } = default!;
    }
}
