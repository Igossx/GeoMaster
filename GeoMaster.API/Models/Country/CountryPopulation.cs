using Newtonsoft.Json;

namespace GeoMaster.API.Models.Country
{
    public class CountryPopulation
    {
        [JsonProperty("name")]
        public string Name { get; set; } = default!;

        [JsonProperty("iso2")]
        public string Iso2 { get; set; } = default!;

        [JsonProperty("population")]
        public string Population { get; set; } = default!;

    }
}
