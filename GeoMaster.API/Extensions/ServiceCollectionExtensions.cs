using GeoMaster.API.Interfaces;
using GeoMaster.API.Repositories;
using GeoMaster.API.Services;

namespace GeoMaster.API.Extensions
{
    public static class ServiceCollectionExtensions
    {
        public static void AddCollections(this IServiceCollection services, IConfiguration configuration)
        {
            string apiKey = configuration["ApiKeys:MyApiKey"]!;

            services.AddHttpClient();

            services.AddScoped<ICountryRepository>(provider =>
            new CountryRepository(provider.GetRequiredService<HttpClient>(), apiKey));

            services.AddScoped<ICityRepository>(provider =>
            new CityRepository(provider.GetRequiredService<HttpClient>(), apiKey));

        }
    }
}
