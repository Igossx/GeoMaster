using GeoMaster.API.Models.Currency;
using Newtonsoft.Json;

namespace GeoMaster.API.Models.Country
{
    public class CountryDetails
    {
        [JsonProperty("gdp")]
        public string Gdp { get; set; } = default!;

        [JsonProperty("sex_ratio")]
        public string SexRatio { get; set; } = default!;

        [JsonProperty("surface_area")]
        public string SurfaceArea { get; set; } = default!;

        [JsonProperty("currency")]
        public CurrencyDetails Currency { get; set; } = default!;

        [JsonProperty("life_expectancy_male")]
        public string LifeExpectancyMale { get; set; } = default!;

        [JsonProperty("unemployment")]
        public string Unemployment { get; set; } = default!;

        [JsonProperty("imports")]
        public string Imports { get; set; } = default!;

        [JsonProperty("homicide_rate")]
        public string HomicideRate { get; set; } = default!;

        [JsonProperty("iso2")]
        public string Iso2 { get; set; } = default!;

        [JsonProperty("gdp_growth")]
        public string GdpGrowth { get; set; } = default!;

        [JsonProperty("employment_services")]
        public string EmploymentServices { get; set; } = default!;

        [JsonProperty("urban_population_growth")]
        public string UrbanPopulationGrowth { get; set; } = default!;

        [JsonProperty("secondary_school_enrollment_female")]
        public string SecondarySchoolEnrollmentFemale { get; set; } = default!;

        [JsonProperty("employment_agriculture")]
        public string EmploymentAgriculture { get; set; } = default!;

        [JsonProperty("capital")]
        public string Capital { get; set; } = default!;

        [JsonProperty("co2_emissions")]
        public string Co2Emissions { get; set; } = default!;

        [JsonProperty("forested_area")]
        public string ForestedArea { get; set; } = default!;

        [JsonProperty("tourists")]
        public string Tourists { get; set; } = default!;

        [JsonProperty("exports")]
        public string Exports { get; set; } = default!;

        [JsonProperty("life_expectancy_female")]
        public string LifeExpectancyFemale { get; set; } = default!;

        [JsonProperty("post_secondary_enrollment_female")]
        public string PostSecondaryEnrollmentFemale { get; set; } = default!;

        [JsonProperty("post_secondary_enrollment_male")]
        public string PostSecondaryEnrollmentMale { get; set; } = default!;

        [JsonProperty("primary_school_enrollment_female")]
        public string PrimarySchoolEnrollmentFemale { get; set; } = default!;

        [JsonProperty("infant_mortality")]
        public string InfantMortality { get; set; } = default!;

        [JsonProperty("secondary_school_enrollment_male")]
        public string SecondarySchoolEnrollmentMale { get; set; } = default!;

        [JsonProperty("threatened_species")]
        public string ThreatenedSpecies { get; set; } = default!;

        [JsonProperty("population")]
        public string Population { get; set; } = default!;

        [JsonProperty("urban_population")]
        public string UrbanPopulation { get; set; } = default!;

        [JsonProperty("employment_industry")]
        public string EmploymentIndustry { get; set; } = default!;

        [JsonProperty("name")]
        public string Name { get; set; } = default!;

        [JsonProperty("pop_growth")]
        public string PopGrowth { get; set; } = default!;

        [JsonProperty("region")]
        public string Region { get; set; } = default!;

        [JsonProperty("pop_density")]
        public string PopDensity { get; set; } = default!;

        [JsonProperty("internet_users")]
        public string InternetUsers { get; set; } = default!;

        [JsonProperty("gdp_per_capita")]
        public string GdpPerCapita { get; set; } = default!;

        [JsonProperty("fertility")]
        public string Fertility { get; set; } = default!;

        [JsonProperty("refugees")]
        public string Refugees { get; set; } = default!;

        [JsonProperty("primary_school_enrollment_male")]
        public string PrimarySchoolEnrollmentMale { get; set; } = default!;
    }
}
