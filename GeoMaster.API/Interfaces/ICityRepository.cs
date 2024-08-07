﻿using GeoMaster.API.Models.City;

namespace GeoMaster.API.Interfaces
{
    public interface ICityRepository
    {
        Task<CityDetails> GetCityDetailsAsync(string cityName);

        Task<CityPopulation> GetRandomCityWithPopulationByIndexAsync(int index);

        Task<(CityPopulation, CityPopulation)> GetTwoDifferentRandomCitiesWithPopulationAsync();
    }
}
