using GeoMaster.API.Interfaces;
using GeoMaster.API.Models.Country;
using Newtonsoft.Json.Linq;
using System.Text.Json;

namespace GeoMaster.API.Services
{
    public class CountryRepository : ICountryRepository
    {
        private readonly string _apiKey;
        private readonly HttpClient _httpClient;
        private readonly Random _random = new();
        private readonly List<string> _countryNames;

        public CountryRepository(HttpClient httpClient, string apiKey)
        {
            _httpClient = httpClient;
            _apiKey = apiKey;
            _countryNames = LoadCountryNames().GetAwaiter().GetResult();
        }

        private static async Task<List<string>> LoadCountryNames()
        {
            using var stream = new FileStream("Models/Country/countryNames.json", FileMode.Open, FileAccess.Read);
            var countryNames = await JsonSerializer.DeserializeAsync<List<string>>(stream);
            return countryNames!;
        }

        public async Task<CountryDetails> GetCountryDetailsAsync(string countryName)
        {
            var url = $"https://api.api-ninjas.com/v1/country?name={countryName}";

            var request = new HttpRequestMessage(HttpMethod.Get, url);
            request.Headers.Add("accept", "application/json");
            request.Headers.Add("X-Api-Key", _apiKey);

            var response = await _httpClient.SendAsync(request);

            if (!response.IsSuccessStatusCode)
            {
                throw new HttpRequestException($"Request failed with status code {response.StatusCode}");
            }

            var content = await response.Content.ReadAsStringAsync();
            var countryData = JArray.Parse(content)[0].ToObject<CountryDetails>();

            return countryData!;
        }

        public async Task<CountryPopulation> GetRandomCountryWithPopulationByIndexAsync(int index)
        {
            var randomCountryName = _countryNames[index];
            var url = $"https://api.api-ninjas.com/v1/country?name={randomCountryName}";

            var request = new HttpRequestMessage(HttpMethod.Get, url);
            request.Headers.Add("accept", "application/json");
            request.Headers.Add("X-Api-Key", _apiKey);

            var response = await _httpClient.SendAsync(request);

            if (!response.IsSuccessStatusCode)
            {
                throw new HttpRequestException($"Request failed with status code {response.StatusCode}");
            }

            var content = await response.Content.ReadAsStringAsync();
            var countryData = JArray.Parse(content)[0].ToObject<CountryPopulation>();

            return countryData!;
        }

        public async Task<CountrySurfaceArea> GetRandomCountryWithSurfaceAreaByIndexAsync(int index)
        {
            var randomCountryName = _countryNames[index];
            var url = $"https://api.api-ninjas.com/v1/country?name={randomCountryName}";

            var request = new HttpRequestMessage(HttpMethod.Get, url);
            request.Headers.Add("accept", "application/json");
            request.Headers.Add("X-Api-Key", _apiKey);

            var response = await _httpClient.SendAsync(request);

            if (!response.IsSuccessStatusCode)
            {
                throw new HttpRequestException($"Request failed with status code {response.StatusCode}");
            }

            var content = await response.Content.ReadAsStringAsync();
            var countryData = JArray.Parse(content)[0].ToObject<CountrySurfaceArea>();

            return countryData!;
        }

        public async Task<(CountryPopulation, CountryPopulation)> GetTwoDifferentRandomCountriesWithPopulationAsync()
        {
            var index1 = _random.Next(_countryNames.Count);
            int index2;
            do
            {
                index2 = _random.Next(_countryNames.Count);
            } while (index1 == index2);

            var country1 = await GetRandomCountryWithPopulationByIndexAsync(index1);
            var country2 = await GetRandomCountryWithPopulationByIndexAsync(index2);

            return (country1, country2);
        }

        public async Task<(CountrySurfaceArea, CountrySurfaceArea)> GetTwoDifferentRandomCountriesWithSurfaceAreaAsync()
        {
            var index1 = _random.Next(_countryNames.Count);
            int index2;
            do
            {
                index2 = _random.Next(_countryNames.Count);
            } while (index1 == index2);

            var country1 = await GetRandomCountryWithSurfaceAreaByIndexAsync(index1);
            var country2 = await GetRandomCountryWithSurfaceAreaByIndexAsync(index2);

            return (country1, country2);
        }
    }
}
