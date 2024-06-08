using Newtonsoft.Json;

namespace GeoMaster.API.Models.Country
{
    public class CountrySurfaceArea
    {
        [JsonProperty("name")]
        public string Name { get; set; } = default!;

        [JsonProperty("iso2")]
        public string Iso2 { get; set; } = default!;

        [JsonProperty("surface_area")]
        public string SurfaceArea { get; set; } = default!;

    }
}
