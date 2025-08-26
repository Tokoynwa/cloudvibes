export interface WeatherData {
  current: CurrentWeather;
  forecast: ForecastDay[];
  location: Location;
  alerts?: WeatherAlert[];
}

export interface CurrentWeather {
  temperature: number;
  feelsLike: number;
  condition: string;
  description: string;
  icon: string;
  humidity: number;
  pressure: number;
  windSpeed: number;
  windDirection: number;
  windGust?: number;
  visibility: number;
  uvIndex: number;
  cloudCover: number;
  dewPoint: number;
  timestamp: string;
}

export interface ForecastDay {
  date: string;
  temperature: {
    min: number;
    max: number;
  };
  condition: string;
  description: string;
  icon: string;
  humidity: number;
  windSpeed: number;
  windDirection: number;
  precipitation: {
    probability: number;
    amount: number;
  };
  uvIndex: number;
  sunrise: string;
  sunset: string;
  hourly?: HourlyForecast[];
}

export interface HourlyForecast {
  time: string;
  temperature: number;
  feelsLike: number;
  condition: string;
  icon: string;
  precipitation: {
    probability: number;
    amount: number;
  };
  windSpeed: number;
  windDirection: number;
  humidity: number;
  cloudCover: number;
  pressure: number;
}

export interface Location {
  name: string;
  country: string;
  region?: string;
  latitude: number;
  longitude: number;
  timezone: string;
  localTime: string;
}

export interface WeatherAlert {
  id: string;
  title: string;
  description: string;
  severity: 'minor' | 'moderate' | 'severe' | 'extreme';
  start: string;
  end: string;
  areas: string[];
}

export interface SearchLocation {
  name: string;
  country: string;
  region?: string;
  latitude: number;
  longitude: number;
  population?: number;
  flag?: string;
}

export interface WeatherApiResponse {
  success: boolean;
  data?: WeatherData;
  error?: {
    message: string;
    code?: string;
  };
}