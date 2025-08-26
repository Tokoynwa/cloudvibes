import { WeatherData, Location, SearchLocation, WeatherApiResponse, ForecastDay } from '@/lib/types/weather';
import { 
  OpenWeatherCurrentResponse, 
  OpenWeatherForecastResponse, 
  OpenWeatherGeocodingResponse, 
  OpenWeatherSearchResponse,
  OpenMeteoResponse,
  OpenWeatherForecastItem
} from '@/lib/types/api';
import { searchCities, getCountryFlag } from '@/lib/data/cities';

const OPENWEATHER_API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
const OPENWEATHER_BASE_URL = 'https://api.openweathermap.org/data/2.5';
const OPEN_METEO_BASE_URL = 'https://api.open-meteo.com/v1';

export class WeatherAPI {
  private static instance: WeatherAPI;
  
  static getInstance(): WeatherAPI {
    if (!WeatherAPI.instance) {
      WeatherAPI.instance = new WeatherAPI();
    }
    return WeatherAPI.instance;
  }

  async getCurrentWeatherByCoords(lat: number, lon: number): Promise<WeatherApiResponse> {
    try {
      // Primary: OpenWeatherMap (if valid API key available)
      if (OPENWEATHER_API_KEY && OPENWEATHER_API_KEY !== 'your_openweathermap_api_key_here') {
        try {
          return await this.getOpenWeatherDataByCoords(lat, lon);
        } catch (error) {
          console.warn('OpenWeatherMap API failed, falling back to Open-Meteo:', error);
          // Fall through to Open-Meteo fallback
        }
      }
      
      // Fallback: Open-Meteo (free, no API key required)
      return await this.getOpenMeteoDataByCoords(lat, lon);
    } catch (error) {
      console.error('Weather API Error:', error);
      return {
        success: false,
        error: {
          message: 'Failed to fetch weather data. Please try again.',
          code: 'API_ERROR'
        }
      };
    }
  }

  async getCurrentWeatherByCity(city: string): Promise<WeatherApiResponse> {
    try {
      // First, get coordinates for the city
      const geocodeResponse = await this.geocodeCity(city);
      if (!geocodeResponse.success || !geocodeResponse.data) {
        return {
          success: false,
          error: {
            message: 'City not found. Please check the spelling and try again.',
            code: 'CITY_NOT_FOUND'
          }
        };
      }

      const location = geocodeResponse.data[0];
      return await this.getCurrentWeatherByCoords(location.latitude, location.longitude);
    } catch (error) {
      console.error('Weather API Error:', error);
      return {
        success: false,
        error: {
          message: 'Failed to fetch weather data for this city.',
          code: 'API_ERROR'
        }
      };
    }
  }

  async searchLocations(query: string): Promise<{ success: boolean; data?: SearchLocation[]; error?: { message: string; code?: string } }> {
    if (!query.trim() || query.length < 2) {
      return {
        success: true,
        data: []
      };
    }

    try {
      // First try our local city database (always available)
      const localResults = searchCities(query, 8);
      
      const locations: SearchLocation[] = localResults.map((city) => ({
        name: city.name,
        country: city.country,
        region: city.region,
        latitude: city.latitude,
        longitude: city.longitude,
        population: city.population,
        flag: getCountryFlag(city.country)
      }));

      // If we have a valid OpenWeatherMap API key, try to get additional results
      if (OPENWEATHER_API_KEY && OPENWEATHER_API_KEY !== 'your_openweathermap_api_key_here' && locations.length < 5) {
        try {
          const response = await fetch(
            `${OPENWEATHER_BASE_URL}/find?q=${encodeURIComponent(query)}&limit=5&appid=${OPENWEATHER_API_KEY}`
          );

          if (response.ok) {
            const data: OpenWeatherSearchResponse = await response.json();
            
            const apiResults: SearchLocation[] = data.list?.map((item) => ({
              name: item.name,
              country: item.sys.country,
              region: item.state,
              latitude: item.coord.lat,
              longitude: item.coord.lon,
              population: item.population,
              flag: getCountryFlag(item.sys.country)
            })) || [];

            // Merge results, avoiding duplicates
            const existingNames = new Set(locations.map(loc => `${loc.name}-${loc.country}`));
            const uniqueApiResults = apiResults.filter(loc => 
              !existingNames.has(`${loc.name}-${loc.country}`)
            );
            
            locations.push(...uniqueApiResults.slice(0, 5 - locations.length));
          }
        } catch (apiError) {
          console.warn('OpenWeatherMap API failed, using local results only:', apiError);
        }
      }

      return {
        success: true,
        data: locations
      };
    } catch (error) {
      console.error('Location search error:', error);
      return {
        success: false,
        error: {
          message: 'Failed to search locations. Please try again.',
          code: 'SEARCH_ERROR'
        }
      };
    }
  }

  private async geocodeCity(city: string): Promise<{ success: boolean; data?: SearchLocation[]; error?: { message: string; code?: string } }> {
    try {
      if (OPENWEATHER_API_KEY && OPENWEATHER_API_KEY !== 'your_openweathermap_api_key_here') {
        try {
          const response = await fetch(
            `http://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(city)}&limit=1&appid=${OPENWEATHER_API_KEY}`
          );

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const data: OpenWeatherGeocodingResponse[] = await response.json();
          
          if (data.length === 0) {
            return {
              success: false,
              error: {
                message: 'City not found',
                code: 'CITY_NOT_FOUND'
              }
            };
          }

          const locations: SearchLocation[] = data.map((item) => ({
            name: item.name,
            country: item.country,
            region: item.state,
            latitude: item.lat,
            longitude: item.lon
          }));

          return {
            success: true,
            data: locations
          };
        } catch (error) {
          console.warn('OpenWeatherMap geocoding failed:', error);
          // Fall through to error response
        }
      }

      // Fallback: Use a simple geocoding service or return error
      return {
        success: false,
        error: {
          message: 'Geocoding service not available',
          code: 'NO_GEOCODING'
        }
      };
    } catch (error) {
      console.error('Geocoding error:', error);
      return {
        success: false,
        error: {
          message: 'Failed to geocode city',
          code: 'GEOCODING_ERROR'
        }
      };
    }
  }

  private async getOpenWeatherDataByCoords(lat: number, lon: number): Promise<WeatherApiResponse> {
    try {
      const [currentResponse, forecastResponse] = await Promise.all([
        fetch(`${OPENWEATHER_BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}&units=metric`),
        fetch(`${OPENWEATHER_BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}&units=metric`)
      ]);

      if (!currentResponse.ok || !forecastResponse.ok) {
        throw new Error('Failed to fetch weather data');
      }

      const [currentData, forecastData]: [OpenWeatherCurrentResponse, OpenWeatherForecastResponse] = await Promise.all([
        currentResponse.json(),
        forecastResponse.json()
      ]);

      const weatherData = this.transformOpenWeatherData(currentData, forecastData);
      
      return {
        success: true,
        data: weatherData
      };
    } catch (error) {
      console.error('OpenWeather API Error:', error);
      throw error;
    }
  }

  private async getOpenMeteoDataByCoords(lat: number, lon: number): Promise<WeatherApiResponse> {
    try {
      const url = new URL(`${OPEN_METEO_BASE_URL}/forecast`);
      url.searchParams.set('latitude', lat.toString());
      url.searchParams.set('longitude', lon.toString());
      url.searchParams.set('current', 'temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,showers,snowfall,weather_code,cloud_cover,pressure_msl,surface_pressure,wind_speed_10m,wind_direction_10m,wind_gusts_10m');
      url.searchParams.set('hourly', 'temperature_2m,relative_humidity_2m,apparent_temperature,precipitation_probability,precipitation,rain,showers,snowfall,snow_depth,weather_code,pressure_msl,surface_pressure,cloud_cover,visibility,evapotranspiration,et0_fao_evapotranspiration,vapour_pressure_deficit,wind_speed_10m,wind_direction_10m,wind_gusts_10m,temperature_80m,temperature_120m,temperature_180m,soil_temperature_0cm,soil_temperature_6cm,soil_temperature_18cm,soil_temperature_54cm,soil_moisture_0_1cm,soil_moisture_1_3cm,soil_moisture_3_9cm,soil_moisture_9_27cm,soil_moisture_27_81cm');
      url.searchParams.set('daily', 'weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,daylight_duration,sunshine_duration,uv_index_max,uv_index_clear_sky_max,precipitation_sum,rain_sum,showers_sum,snowfall_sum,precipitation_hours,precipitation_probability_max,wind_speed_10m_max,wind_gusts_10m_max,wind_direction_10m_dominant,shortwave_radiation_sum,et0_fao_evapotranspiration');
      url.searchParams.set('timezone', 'auto');
      url.searchParams.set('forecast_days', '14');

      const response = await fetch(url.toString());

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: OpenMeteoResponse = await response.json();
      const weatherData = this.transformOpenMeteoData(data, lat, lon);
      
      return {
        success: true,
        data: weatherData
      };
    } catch (error) {
      console.error('Open-Meteo API Error:', error);
      throw error;
    }
  }

  private transformOpenWeatherData(current: OpenWeatherCurrentResponse, forecast: OpenWeatherForecastResponse): WeatherData {
    const location: Location = {
      name: current.name,
      country: current.sys.country,
      latitude: current.coord.lat,
      longitude: current.coord.lon,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      localTime: new Date().toISOString()
    };

    const currentWeather = {
      temperature: current.main.temp,
      feelsLike: current.main.feels_like,
      condition: current.weather[0].main,
      description: current.weather[0].description,
      icon: current.weather[0].icon,
      humidity: current.main.humidity,
      pressure: current.main.pressure,
      windSpeed: current.wind.speed * 3.6, // Convert m/s to km/h
      windDirection: current.wind.deg,
      windGust: current.wind.gust ? current.wind.gust * 3.6 : undefined,
      visibility: current.visibility ? current.visibility / 1000 : 10, // Convert to km
      uvIndex: 0, // OpenWeather doesn't provide UV in free tier
      cloudCover: current.clouds.all,
      dewPoint: 0, // Calculate or estimate
      timestamp: new Date().toISOString()
    };

    // Process forecast data
    const forecastDays = this.groupForecastByDay(forecast.list);

    return {
      current: currentWeather,
      forecast: forecastDays,
      location
    };
  }

  private transformOpenMeteoData(data: OpenMeteoResponse, lat: number, lon: number): WeatherData {
    const location: Location = {
      name: 'Current Location',
      country: '',
      latitude: lat,
      longitude: lon,
      timezone: data.timezone || 'UTC',
      localTime: new Date().toISOString()
    };

    const current = data.current;
    const currentWeather = {
      temperature: current.temperature_2m,
      feelsLike: current.apparent_temperature,
      condition: this.getWeatherCondition(current.weather_code),
      description: this.getWeatherDescription(current.weather_code),
      icon: this.getWeatherIcon(current.weather_code, current.is_day === 1),
      humidity: current.relative_humidity_2m,
      pressure: current.pressure_msl,
      windSpeed: current.wind_speed_10m,
      windDirection: current.wind_direction_10m,
      windGust: current.wind_gusts_10m,
      visibility: 10, // Default value
      uvIndex: 0, // Will be available in daily data
      cloudCover: current.cloud_cover,
      dewPoint: 0, // Calculate based on temp and humidity
      timestamp: new Date().toISOString()
    };

    // Process daily forecast
    const forecastDays = data.daily?.time.map((date: string, index: number) => ({
      date,
      temperature: {
        min: data.daily!.temperature_2m_min[index],
        max: data.daily!.temperature_2m_max[index]
      },
      condition: this.getWeatherCondition(data.daily!.weather_code[index]),
      description: this.getWeatherDescription(data.daily!.weather_code[index]),
      icon: this.getWeatherIcon(data.daily!.weather_code[index], true),
      humidity: 0, // Not available in daily
      windSpeed: data.daily!.wind_speed_10m_max[index],
      windDirection: data.daily!.wind_direction_10m_dominant[index],
      precipitation: {
        probability: data.daily!.precipitation_probability_max[index] || 0,
        amount: data.daily!.precipitation_sum[index] || 0
      },
      uvIndex: data.daily!.uv_index_max[index] || 0,
      sunrise: data.daily!.sunrise[index],
      sunset: data.daily!.sunset[index]
    })) || [];

    return {
      current: currentWeather,
      forecast: forecastDays,
      location
    };
  }

  private groupForecastByDay(forecastList: OpenWeatherForecastItem[]): ForecastDay[] {
    const days: { [key: string]: OpenWeatherForecastItem[] } = {};
    
    forecastList.forEach(item => {
      const date = new Date(item.dt * 1000).toDateString();
      if (!days[date]) {
        days[date] = [];
      }
      days[date].push(item);
    });

    return Object.entries(days).slice(0, 5).map(([date, items]) => {
      const temps = items.map(item => item.main.temp);
      const firstItem = items[0];
      
      return {
        date: new Date(date).toISOString().split('T')[0],
        temperature: {
          min: Math.min(...temps),
          max: Math.max(...temps)
        },
        condition: firstItem.weather[0].main,
        description: firstItem.weather[0].description,
        icon: firstItem.weather[0].icon,
        humidity: firstItem.main.humidity,
        windSpeed: firstItem.wind.speed * 3.6,
        windDirection: firstItem.wind.deg,
        precipitation: {
          probability: Math.max(...items.map(item => (item.pop || 0) * 100)),
          amount: items.reduce((sum, item) => sum + (item.rain?.['3h'] || 0), 0)
        },
        uvIndex: 0,
        sunrise: '',
        sunset: ''
      };
    });
  }

  private getWeatherCondition(code: number): string {
    // WMO Weather interpretation codes
    if (code === 0) return 'Clear';
    if (code <= 3) return 'Partly Cloudy';
    if (code <= 48) return 'Foggy';
    if (code <= 57) return 'Drizzle';
    if (code <= 67) return 'Rain';
    if (code <= 77) return 'Snow';
    if (code <= 82) return 'Showers';
    if (code <= 86) return 'Snow Showers';
    if (code <= 99) return 'Thunderstorm';
    return 'Unknown';
  }

  private getWeatherDescription(code: number): string {
    // More detailed descriptions
    const descriptions: { [key: number]: string } = {
      0: 'Clear sky',
      1: 'Mainly clear',
      2: 'Partly cloudy',
      3: 'Overcast',
      45: 'Fog',
      48: 'Depositing rime fog',
      51: 'Light drizzle',
      53: 'Moderate drizzle',
      55: 'Dense drizzle',
      56: 'Light freezing drizzle',
      57: 'Dense freezing drizzle',
      61: 'Slight rain',
      63: 'Moderate rain',
      65: 'Heavy rain',
      66: 'Light freezing rain',
      67: 'Heavy freezing rain',
      71: 'Slight snow fall',
      73: 'Moderate snow fall',
      75: 'Heavy snow fall',
      77: 'Snow grains',
      80: 'Slight rain showers',
      81: 'Moderate rain showers',
      82: 'Violent rain showers',
      85: 'Slight snow showers',
      86: 'Heavy snow showers',
      95: 'Thunderstorm',
      96: 'Thunderstorm with slight hail',
      99: 'Thunderstorm with heavy hail'
    };
    
    return descriptions[code] || 'Unknown weather condition';
  }

  private getWeatherIcon(code: number, isDay: boolean): string {
    // Map WMO codes to icon identifiers
    const iconMap: { [key: number]: string } = {
      0: isDay ? '01d' : '01n', // Clear
      1: isDay ? '02d' : '02n', // Mainly clear
      2: isDay ? '03d' : '03n', // Partly cloudy
      3: '04d', // Overcast
      45: '50d', // Fog
      48: '50d', // Depositing rime fog
      51: '09d', // Light drizzle
      53: '09d', // Moderate drizzle
      55: '09d', // Dense drizzle
      56: '09d', // Light freezing drizzle
      57: '09d', // Dense freezing drizzle
      61: '10d', // Slight rain
      63: '10d', // Moderate rain
      65: '10d', // Heavy rain
      66: '10d', // Light freezing rain
      67: '10d', // Heavy freezing rain
      71: '13d', // Slight snow
      73: '13d', // Moderate snow
      75: '13d', // Heavy snow
      77: '13d', // Snow grains
      80: '09d', // Slight rain showers
      81: '09d', // Moderate rain showers
      82: '09d', // Violent rain showers
      85: '13d', // Slight snow showers
      86: '13d', // Heavy snow showers
      95: '11d', // Thunderstorm
      96: '11d', // Thunderstorm with slight hail
      99: '11d'  // Thunderstorm with heavy hail
    };
    
    return iconMap[code] || '01d';
  }
}

export const weatherAPI = WeatherAPI.getInstance();