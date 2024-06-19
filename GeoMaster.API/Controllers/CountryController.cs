using GeoMaster.API.Interfaces;
using GeoMaster.API.Models.Country;
using Microsoft.AspNetCore.Mvc;

namespace GeoMaster.API.Controllers
{
    [ApiController]
    [Route("/api/country")]
    public class CountryController : Controller
    {
        private readonly ICountryRepository _countryRepository;

        public CountryController(ICountryRepository countryRepository)
        {
            _countryRepository = countryRepository;
        }

        [HttpGet("{countryName}")]
        [ProducesResponseType(typeof(CountryDetails), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetCountryDetails(string countryName)
        {
            if (string.IsNullOrWhiteSpace(countryName))
            {
                return BadRequest("Nazwa kraju nie może być pusta.");
            }

            var country = await _countryRepository.GetCountryDetailsAsync(countryName);

            if (country is null)
            {
                return NotFound("Nie znaleziono szczegółów dotyczących kraju.");
            }

            return Ok(country);
        }

        [HttpGet("two-random-population")]
        [ProducesResponseType(typeof(TwoCountriesWithPopulationResult), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetTwoRandomCountriesWithPopulation()
        {
            var (country1, country2) = await _countryRepository.GetTwoDifferentRandomCountriesWithPopulationAsync();

            if (country1 is null || country2 is null)
            {
                return NotFound("Nie znaleziono dwóch krajów z populacją.");
            }

            return Ok(new TwoCountriesWithPopulationResult { Country1 = country1, Country2 = country2 });
        }

        [HttpGet("two-random-surface-area")]
        [ProducesResponseType(typeof(TwoCountriesWithSurfaceAreaResult), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetTwoRandomCountriesWithSurfaceArea()
        {
            var (country1, country2) = await _countryRepository.GetTwoDifferentRandomCountriesWithSurfaceAreaAsync();

            if (country1 is null || country2 is null)
            {
                return NotFound("Nie znaleziono dwóch krajów z powierzchnią.");
            }

            return Ok(new TwoCountriesWithSurfaceAreaResult { Country1 = country1, Country2 = country2 });
        }
    }
}
