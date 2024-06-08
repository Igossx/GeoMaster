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
        public async Task<IActionResult> GetCountryDetails(string countryName)
        {
            var country = await _countryRepository.GetCountryDetailsAsync(countryName);
            return Ok(country);
        }

        [HttpGet("twoRandomWithPopulation")]
        [ProducesResponseType(typeof(TwoCountriesWithPopulationResult), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetTwoRandomCountriesWithPopulation()
        {
            var (country1, country2) = await _countryRepository.GetTwoDifferentRandomCountriesWithPopulationAsync();
            return Ok(new TwoCountriesWithPopulationResult { Country1 = country1, Country2 = country2 });
        }

        [HttpGet("twoRandomWithSurfaceArea")]
        [ProducesResponseType(typeof(TwoCountriesWithSurfaceAreaResult), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetTwoRandomCountriesWithSurfaceArea()
        {
            var (country1, country2) = await _countryRepository.GetTwoDifferentRandomCountriesWithSurfaceAreaAsync();
            return Ok(new TwoCountriesWithSurfaceAreaResult { Country1 = country1, Country2 = country2 });
        }
    }
}
