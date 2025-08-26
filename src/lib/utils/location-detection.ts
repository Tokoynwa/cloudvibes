// Enhanced location detection and temperature unit preferences
import { searchCities } from '@/lib/data/cities';

export interface LocationInfo {
  country: string;
  countryCode: string;
  region: string;
  city: string;
  usesFahrenheit: boolean;
  timezone: string;
  latitude?: number;
  longitude?: number;
}

// Countries that primarily use Fahrenheit
const FAHRENHEIT_COUNTRIES = new Set([
  'US', 'USA', 'United States',
  'BS', 'Bahamas', 
  'BZ', 'Belize',
  'KY', 'Cayman Islands',
  'PW', 'Palau'
]);

// US states/territories
const US_STATES = new Set([
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
  'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
  'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
  'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
  'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY',
  'PR', 'VI', 'GU', 'AS'
]);

export async function detectUserLocation(): Promise<LocationInfo | null> {
  try {
    // Try multiple detection methods
    const locationInfo = await Promise.race([
      detectByGeolocation(),
      detectByIP(),
      detectByTimezone(),
      detectByBrowser()
    ]);

    return locationInfo;
  } catch (error) {
    console.warn('Location detection failed:', error);
    return getDefaultLocation();
  }
}

async function detectByGeolocation(): Promise<LocationInfo | null> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation not supported'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          
          // Try to get location info from reverse geocoding
          const locationInfo = await reverseGeocode(latitude, longitude);
          resolve(locationInfo);
        } catch (error) {
          reject(error);
        }
      },
      (error) => reject(error),
      { 
        enableHighAccuracy: true, 
        timeout: 10000, 
        maximumAge: 300000 // 5 minutes
      }
    );
  });
}

async function detectByIP(): Promise<LocationInfo | null> {
  try {
    // Use a free IP geolocation service
    const response = await fetch('https://ipapi.co/json/', {
      timeout: 5000
    });
    
    if (!response.ok) throw new Error('IP detection failed');
    
    const data = await response.json();
    
    return {
      country: data.country_name || 'Unknown',
      countryCode: data.country_code || '',
      region: data.region || '',
      city: data.city || '',
      usesFahrenheit: shouldUseFahrenheit(data.country_code, data.region),
      timezone: data.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone,
      latitude: data.latitude,
      longitude: data.longitude
    };
  } catch (error) {
    throw new Error('IP detection failed');
  }
}

async function detectByTimezone(): Promise<LocationInfo | null> {
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  
  // Map common timezones to locations
  const timezoneMap: Record<string, Partial<LocationInfo>> = {
    'America/New_York': { country: 'United States', countryCode: 'US', region: 'New York', usesFahrenheit: true },
    'America/Los_Angeles': { country: 'United States', countryCode: 'US', region: 'California', usesFahrenheit: true },
    'America/Chicago': { country: 'United States', countryCode: 'US', region: 'Illinois', usesFahrenheit: true },
    'America/Denver': { country: 'United States', countryCode: 'US', region: 'Colorado', usesFahrenheit: true },
    'America/Toronto': { country: 'Canada', countryCode: 'CA', region: 'Ontario', usesFahrenheit: false },
    'Europe/London': { country: 'United Kingdom', countryCode: 'GB', region: 'England', usesFahrenheit: false },
    'Europe/Paris': { country: 'France', countryCode: 'FR', region: 'Île-de-France', usesFahrenheit: false },
    'Europe/Berlin': { country: 'Germany', countryCode: 'DE', region: 'Berlin', usesFahrenheit: false },
    'Asia/Tokyo': { country: 'Japan', countryCode: 'JP', region: 'Tokyo', usesFahrenheit: false },
    'Asia/Shanghai': { country: 'China', countryCode: 'CN', region: 'Shanghai', usesFahrenheit: false },
    'Australia/Sydney': { country: 'Australia', countryCode: 'AU', region: 'New South Wales', usesFahrenheit: false },
  };
  
  const info = timezoneMap[timezone];
  if (!info) throw new Error('Timezone not recognized');
  
  return {
    country: info.country || 'Unknown',
    countryCode: info.countryCode || '',
    region: info.region || '',
    city: '',
    usesFahrenheit: info.usesFahrenheit || false,
    timezone
  };
}

async function detectByBrowser(): Promise<LocationInfo | null> {
  // Use browser language and other hints
  const language = navigator.language || navigator.languages[0];
  const locale = Intl.DateTimeFormat().resolvedOptions().locale;
  
  // US English speakers likely use Fahrenheit
  const usesFahrenheit = language.startsWith('en-US') || locale.includes('US');
  
  return {
    country: usesFahrenheit ? 'United States' : 'Unknown',
    countryCode: usesFahrenheit ? 'US' : '',
    region: '',
    city: '',
    usesFahrenheit,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
  };
}

async function reverseGeocode(lat: number, lon: number): Promise<LocationInfo> {
  try {
    // Try Open-Meteo geocoding (free)
    const response = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?latitude=${lat}&longitude=${lon}&count=1&language=en&format=json`
    );
    
    if (!response.ok) throw new Error('Reverse geocoding failed');
    
    const data = await response.json();
    const result = data.results?.[0];
    
    if (!result) throw new Error('No results from geocoding');
    
    return {
      country: result.country || 'Unknown',
      countryCode: result.country_code?.toUpperCase() || '',
      region: result.admin1 || '',
      city: result.name || '',
      usesFahrenheit: shouldUseFahrenheit(result.country_code, result.admin1),
      timezone: result.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone,
      latitude: lat,
      longitude: lon
    };
  } catch (error) {
    // Fallback based on coordinates
    return {
      country: 'Unknown',
      countryCode: '',
      region: '',
      city: 'Current Location',
      usesFahrenheit: isUSCoordinates(lat, lon),
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      latitude: lat,
      longitude: lon
    };
  }
}

function shouldUseFahrenheit(countryCode: string, region?: string): boolean {
  if (!countryCode) return false;
  
  const code = countryCode.toUpperCase();
  
  // Check if it's a Fahrenheit country
  if (FAHRENHEIT_COUNTRIES.has(code)) return true;
  
  // Special check for US states
  if (code === 'US' || US_STATES.has(region?.toUpperCase() || '')) return true;
  
  return false;
}

function isUSCoordinates(lat: number, lon: number): boolean {
  // Rough US boundaries including Alaska and Hawaii
  return (
    // Continental US
    (lat >= 25 && lat <= 49 && lon >= -125 && lon <= -66) ||
    // Alaska
    (lat >= 54 && lat <= 71 && lon >= -179 && lon <= -129) ||
    // Hawaii
    (lat >= 18 && lat <= 29 && lon >= -179 && lon <= -154)
  );
}

function getDefaultLocation(): LocationInfo {
  // Default to user's browser locale
  const language = navigator.language || navigator.languages[0];
  const usesFahrenheit = language.startsWith('en-US');
  
  return {
    country: usesFahrenheit ? 'United States' : 'International',
    countryCode: usesFahrenheit ? 'US' : '',
    region: '',
    city: '',
    usesFahrenheit,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
  };
}

export function getTemperatureUnit(locationInfo?: LocationInfo | null): 'celsius' | 'fahrenheit' {
  return locationInfo?.usesFahrenheit ? 'fahrenheit' : 'celsius';
}

export function formatTemperatureWithUnit(temp: number, unit: 'celsius' | 'fahrenheit'): string {
  return unit === 'fahrenheit' ? `${Math.round(temp)}°F` : `${Math.round(temp)}°C`;
}

export function convertTemperature(temp: number, from: 'celsius' | 'fahrenheit', to: 'celsius' | 'fahrenheit'): number {
  if (from === to) return temp;
  
  if (from === 'celsius' && to === 'fahrenheit') {
    return (temp * 9/5) + 32;
  } else if (from === 'fahrenheit' && to === 'celsius') {
    return (temp - 32) * 5/9;
  }
  
  return temp;
}

// Enhanced search with better matching
export function searchLocationsEnhanced(query: string, limit: number = 8) {
  if (!query || query.length < 1) return [];
  
  const normalizedQuery = query.toLowerCase().trim();
  const results = searchCities(normalizedQuery, limit * 2); // Get more results for filtering
  
  // Enhanced scoring system
  const scoredResults = results.map(city => {
    let score = 0;
    const nameMatch = city.name.toLowerCase();
    const countryMatch = city.country.toLowerCase();
    const regionMatch = (city.region || '').toLowerCase();
    
    // Exact name match (highest priority)
    if (nameMatch === normalizedQuery) score += 1000;
    
    // Name starts with query
    if (nameMatch.startsWith(normalizedQuery)) score += 100;
    
    // Name contains query
    if (nameMatch.includes(normalizedQuery)) score += 50;
    
    // Country/region matches
    if (countryMatch.includes(normalizedQuery)) score += 30;
    if (regionMatch.includes(normalizedQuery)) score += 20;
    
    // Population bonus (larger cities get slight preference)
    if (city.population) {
      score += Math.log10(city.population) * 2;
    }
    
    return { ...city, score };
  });
  
  // Sort by score and return top results
  return scoredResults
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ score, ...city }) => city);
}