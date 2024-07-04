using GeoMaster.API.Interfaces;
using GeoMaster.API.Models.City;
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
        [ProducesResponseType(typeof(CityDetails), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetCityDetails(string cityName)
        {
            if (string.IsNullOrWhiteSpace(cityName))
            {
                return BadRequest("Nazwa miasta nie może być pusta.");
            }

            var city = await _cityRepository.GetCityDetailsAsync(cityName);

            if (city is null)
            {
                return NotFound("Nie znaleziono szczegółów dotyczących miasta.");
            }

            return Ok(city);
        }

        [HttpGet("two-random-population")]
        [ProducesResponseType(typeof(TwoCitiesWithPopulationResult), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetTwoRandomCitiesWithPopulation()
        {
            var (city1, city2) = await _cityRepository.GetTwoDifferentRandomCitiesWithPopulationAsync();

            if (city1 is null || city2 is null)
            {
                return NotFound("Nie znaleziono dwóch miast z populacją.");
            }

            return Ok(new TwoCitiesWithPopulationResult { City1 = city1, City2 = city2 });
        }

    }
}
