using GeoMaster.API.Models.Country;

namespace GeoMaster.API.Interfaces
{
    public interface ICountryRepository
    {
        Task<CountryDetails> GetCountryDetailsAsync(string countryName);

        Task<CountryPopulation> GetRandomCountryWithPopulationByIndexAsync(int index);

        Task<CountrySurfaceArea> GetRandomCountryWithSurfaceAreaByIndexAsync(int index);

        Task<(CountryPopulation, CountryPopulation)> GetTwoDifferentRandomCountriesWithPopulationAsync();

        Task<(CountrySurfaceArea, CountrySurfaceArea)> GetTwoDifferentRandomCountriesWithSurfaceAreaAsync();
    }
}
