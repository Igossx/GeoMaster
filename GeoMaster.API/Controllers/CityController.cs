using GeoMaster.API.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace GeoMaster.API.Controllers
{
    [ApiController]
    [Route("/api/city")]
    public class CityController : Controller
    {
        private readonly ICityRepository _cityRepository;

        public CityController(ICityRepository cityRepository)
        {
            _cityRepository = cityRepository;
        }

        [HttpGet("{cityName}")]
        public async Task<IActionResult> GetCityDetails(string cityName)
        {
            var city = await _cityRepository.GetCityDetailsAsync(cityName);
            return Ok(city);
        }

        [HttpGet("randomWithPopulation")]
        public async Task<IActionResult> GetRandomCityPopulation()
        {
            var randomCity = await _cityRepository.GetRandomCityWithPopulationAsync();
            return Ok(randomCity);
        }
    }
}
