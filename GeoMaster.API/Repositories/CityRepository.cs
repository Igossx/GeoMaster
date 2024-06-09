using GeoMaster.API.Interfaces;
using GeoMaster.API.Models.City;
using Newtonsoft.Json.Linq;
using System.Text.Json;

namespace GeoMaster.API.Repositories
{
    public class CityRepository : ICityRepository
    {
        private readonly string _apiKey;
        private readonly HttpClient _httpClient;
        private readonly Random _random = new();
        private readonly List<string> _cityNames;

        public CityRepository(HttpClient httpClient, string apiKey)
        {
            _httpClient = httpClient;
            _apiKey = apiKey;
            _cityNames = LoadCityNames().Result;
        }

        private static async Task<List<string>> LoadCityNames()
        {
            using var stream = new FileStream("Models/City/cityNames.json", FileMode.Open, FileAccess.Read);
            var cityNames = await JsonSerializer.DeserializeAsync<List<string>>(stream);
            return cityNames!;
        }

        public async Task<CityDetails> GetCityDetailsAsync(string cityName)
        {
            var url = $"https://api.api-ninjas.com/v1/city?name={cityName}";

            var request = new HttpRequestMessage(HttpMethod.Get, url);
            request.Headers.Add("accept", "application/json");
            request.Headers.Add("X-Api-Key", _apiKey);

            var response = await _httpClient.SendAsync(request);

            if (!response.IsSuccessStatusCode)
            {
                throw new HttpRequestException($"Request failed with status code {response.StatusCode}");
            }

            var content = await response.Content.ReadAsStringAsync();

            var cityData = JArray.Parse(content)[0].ToObject<CityDetails>();

            return cityData!;
        }

        public async Task<CityPopulation> GetRandomCityWithPopulationAsync()
        {
            var randomCityName = _cityNames[_random.Next(_cityNames.Count)];
            var url = $"https://api.api-ninjas.com/v1/city?name={randomCityName}";

            var request = new HttpRequestMessage(HttpMethod.Get, url);
            request.Headers.Add("accept", "application/json");
            request.Headers.Add("X-Api-Key", _apiKey);

            var response = await _httpClient.SendAsync(request);

            if (!response.IsSuccessStatusCode)
            {
                throw new HttpRequestException($"Request failed with status code {response.StatusCode}");
            }

            var content = await response.Content.ReadAsStringAsync();

            var countryDataArray = JArray.Parse(content);

            //if (countryDataArray.Count == 0)
            //{
            //    return new CityPopulation
            //    {
            //        Name = randomCityName,
            //        Population = "Błąd" // Możesz ustawić dowolną populację lub pozostawić ją pustą
            //    };
            //}

            var cityData = JArray.Parse(content)[0].ToObject<CityPopulation>();

            return cityData!;
        }
    }
}
