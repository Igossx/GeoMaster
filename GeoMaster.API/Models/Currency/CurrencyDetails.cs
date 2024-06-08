using Newtonsoft.Json;

namespace GeoMaster.API.Models.Currency
{
    public class CurrencyDetails
    {
        [JsonProperty("code")]
        public string Code { get; set; } = default!;

        [JsonProperty("name")]
        public string Name { get; set; } = default!;
    }
}
