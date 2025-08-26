// Major cities database for search functionality
export interface CityData {
  name: string;
  country: string;
  region: string;
  latitude: number;
  longitude: number;
  population?: number;
  timezone?: string;
}

export const MAJOR_CITIES: CityData[] = [
  // United States
  { name: "New York", country: "US", region: "New York", latitude: 40.7128, longitude: -74.0060, population: 8336817 },
  { name: "Los Angeles", country: "US", region: "California", latitude: 34.0522, longitude: -118.2437, population: 3979576 },
  { name: "Chicago", country: "US", region: "Illinois", latitude: 41.8781, longitude: -87.6298, population: 2693976 },
  { name: "Houston", country: "US", region: "Texas", latitude: 29.7604, longitude: -95.3698, population: 2320268 },
  { name: "Miami", country: "US", region: "Florida", latitude: 25.7617, longitude: -80.1918, population: 467963 },
  { name: "San Francisco", country: "US", region: "California", latitude: 37.7749, longitude: -122.4194, population: 881549 },
  { name: "Seattle", country: "US", region: "Washington", latitude: 47.6062, longitude: -122.3321, population: 753675 },
  { name: "Las Vegas", country: "US", region: "Nevada", latitude: 36.1699, longitude: -115.1398, population: 651319 },
  
  // Canada
  { name: "Toronto", country: "CA", region: "Ontario", latitude: 43.6532, longitude: -79.3832, population: 2731571 },
  { name: "Vancouver", country: "CA", region: "British Columbia", latitude: 49.2827, longitude: -123.1207, population: 675218 },
  { name: "Montreal", country: "CA", region: "Quebec", latitude: 45.5017, longitude: -73.5673, population: 1780000 },
  { name: "Calgary", country: "CA", region: "Alberta", latitude: 51.0447, longitude: -114.0719, population: 1336000 },
  
  // United Kingdom
  { name: "London", country: "GB", region: "England", latitude: 51.5074, longitude: -0.1278, population: 8982000 },
  { name: "Birmingham", country: "GB", region: "England", latitude: 52.4862, longitude: -1.8904, population: 1141816 },
  { name: "Manchester", country: "GB", region: "England", latitude: 53.4808, longitude: -2.2426, population: 547000 },
  { name: "Edinburgh", country: "GB", region: "Scotland", latitude: 55.9533, longitude: -3.1883, population: 518500 },
  
  // Germany
  { name: "Berlin", country: "DE", region: "Berlin", latitude: 52.5200, longitude: 13.4050, population: 3669491 },
  { name: "Munich", country: "DE", region: "Bavaria", latitude: 48.1351, longitude: 11.5820, population: 1488202 },
  { name: "Hamburg", country: "DE", region: "Hamburg", latitude: 53.5511, longitude: 9.9937, population: 1899160 },
  { name: "Frankfurt", country: "DE", region: "Hesse", latitude: 50.1109, longitude: 8.6821, population: 753056 },
  
  // France
  { name: "Paris", country: "FR", region: "Île-de-France", latitude: 48.8566, longitude: 2.3522, population: 2161000 },
  { name: "Lyon", country: "FR", region: "Auvergne-Rhône-Alpes", latitude: 45.7640, longitude: 4.8357, population: 518635 },
  { name: "Marseille", country: "FR", region: "Provence-Alpes-Côte d'Azur", latitude: 43.2965, longitude: 5.3698, population: 870731 },
  { name: "Nice", country: "FR", region: "Provence-Alpes-Côte d'Azur", latitude: 43.7102, longitude: 7.2620, population: 342637 },
  
  // Italy
  { name: "Rome", country: "IT", region: "Lazio", latitude: 41.9028, longitude: 12.4964, population: 2872800 },
  { name: "Milan", country: "IT", region: "Lombardy", latitude: 45.4642, longitude: 9.1900, population: 1396059 },
  { name: "Naples", country: "IT", region: "Campania", latitude: 40.8518, longitude: 14.2681, population: 967069 },
  { name: "Florence", country: "IT", region: "Tuscany", latitude: 43.7696, longitude: 11.2558, population: 382258 },
  
  // Spain
  { name: "Madrid", country: "ES", region: "Madrid", latitude: 40.4168, longitude: -3.7038, population: 6642000 },
  { name: "Barcelona", country: "ES", region: "Catalonia", latitude: 41.3851, longitude: 2.1734, population: 1620343 },
  { name: "Valencia", country: "ES", region: "Valencia", latitude: 39.4699, longitude: -0.3763, population: 794288 },
  { name: "Seville", country: "ES", region: "Andalusia", latitude: 37.3891, longitude: -5.9845, population: 688711 },
  
  // Japan
  { name: "Tokyo", country: "JP", region: "Tokyo", latitude: 35.6762, longitude: 139.6503, population: 37400068 },
  { name: "Osaka", country: "JP", region: "Osaka", latitude: 34.6937, longitude: 135.5023, population: 19281000 },
  { name: "Kyoto", country: "JP", region: "Kyoto", latitude: 35.0116, longitude: 135.7681, population: 1475183 },
  { name: "Yokohama", country: "JP", region: "Kanagawa", latitude: 35.4437, longitude: 139.6380, population: 3777491 },
  
  // China
  { name: "Beijing", country: "CN", region: "Beijing", latitude: 39.9042, longitude: 116.4074, population: 21540000 },
  { name: "Shanghai", country: "CN", region: "Shanghai", latitude: 31.2304, longitude: 121.4737, population: 27058480 },
  { name: "Guangzhou", country: "CN", region: "Guangdong", latitude: 23.1291, longitude: 113.2644, population: 15300000 },
  { name: "Shenzhen", country: "CN", region: "Guangdong", latitude: 22.5431, longitude: 114.0579, population: 17560061 },
  
  // India
  { name: "Mumbai", country: "IN", region: "Maharashtra", latitude: 19.0760, longitude: 72.8777, population: 20411274 },
  { name: "Delhi", country: "IN", region: "Delhi", latitude: 28.7041, longitude: 77.1025, population: 32900000 },
  { name: "Bangalore", country: "IN", region: "Karnataka", latitude: 12.9716, longitude: 77.5946, population: 12300000 },
  { name: "Chennai", country: "IN", region: "Tamil Nadu", latitude: 13.0827, longitude: 80.2707, population: 10971108 },
  
  // Australia
  { name: "Sydney", country: "AU", region: "New South Wales", latitude: -33.8688, longitude: 151.2093, population: 5312163 },
  { name: "Melbourne", country: "AU", region: "Victoria", latitude: -37.8136, longitude: 144.9631, population: 5078193 },
  { name: "Brisbane", country: "AU", region: "Queensland", latitude: -27.4698, longitude: 153.0251, population: 2560720 },
  { name: "Perth", country: "AU", region: "Western Australia", latitude: -31.9505, longitude: 115.8605, population: 2125114 },
  
  // Brazil
  { name: "São Paulo", country: "BR", region: "São Paulo", latitude: -23.5558, longitude: -46.6396, population: 22430000 },
  { name: "Rio de Janeiro", country: "BR", region: "Rio de Janeiro", latitude: -22.9068, longitude: -43.1729, population: 13458075 },
  { name: "Salvador", country: "BR", region: "Bahia", latitude: -12.9714, longitude: -38.5014, population: 2886698 },
  { name: "Brasília", country: "BR", region: "Federal District", latitude: -15.8267, longitude: -47.9218, population: 3055149 },
  
  // Russia
  { name: "Moscow", country: "RU", region: "Moscow", latitude: 55.7558, longitude: 37.6176, population: 12506468 },
  { name: "Saint Petersburg", country: "RU", region: "Saint Petersburg", latitude: 59.9311, longitude: 30.3609, population: 5383890 },
  { name: "Novosibirsk", country: "RU", region: "Novosibirsk Oblast", latitude: 55.0084, longitude: 82.9357, population: 1625631 },
  { name: "Yekaterinburg", country: "RU", region: "Sverdlovsk Oblast", latitude: 56.8431, longitude: 60.6454, population: 1495066 },
  
  // South Korea
  { name: "Seoul", country: "KR", region: "Seoul", latitude: 37.5665, longitude: 126.9780, population: 9720846 },
  { name: "Busan", country: "KR", region: "Busan", latitude: 35.1796, longitude: 129.0756, population: 3413841 },
  { name: "Incheon", country: "KR", region: "Incheon", latitude: 37.4563, longitude: 126.7052, population: 2963645 },
  
  // Mexico
  { name: "Mexico City", country: "MX", region: "Mexico City", latitude: 19.4326, longitude: -99.1332, population: 21804515 },
  { name: "Guadalajara", country: "MX", region: "Jalisco", latitude: 20.6597, longitude: -103.3496, population: 5268642 },
  { name: "Monterrey", country: "MX", region: "Nuevo León", latitude: 25.6866, longitude: -100.3161, population: 5341171 },
  
  // Argentina
  { name: "Buenos Aires", country: "AR", region: "Buenos Aires", latitude: -34.6118, longitude: -58.3960, population: 15364000 },
  { name: "Córdoba", country: "AR", region: "Córdoba", latitude: -31.4201, longitude: -64.1888, population: 1454536 },
  { name: "Rosario", country: "AR", region: "Santa Fe", latitude: -32.9442, longitude: -60.6505, population: 1276000 },
  
  // Middle East
  { name: "Dubai", country: "AE", region: "Dubai", latitude: 25.2048, longitude: 55.2708, population: 3411200 },
  { name: "Istanbul", country: "TR", region: "Istanbul", latitude: 41.0082, longitude: 28.9784, population: 15519267 },
  { name: "Tehran", country: "IR", region: "Tehran", latitude: 35.6892, longitude: 51.3890, population: 9259009 },
  { name: "Riyadh", country: "SA", region: "Riyadh", latitude: 24.7136, longitude: 46.6753, population: 7676654 },
  
  // Africa
  { name: "Cairo", country: "EG", region: "Cairo", latitude: 30.0444, longitude: 31.2357, population: 20901000 },
  { name: "Lagos", country: "NG", region: "Lagos", latitude: 6.5244, longitude: 3.3792, population: 15388000 },
  { name: "Cape Town", country: "ZA", region: "Western Cape", latitude: -33.9249, longitude: 18.4241, population: 4618000 },
  { name: "Johannesburg", country: "ZA", region: "Gauteng", latitude: -26.2041, longitude: 28.0473, population: 5635127 },
  
  // Southeast Asia
  { name: "Singapore", country: "SG", region: "Singapore", latitude: 1.3521, longitude: 103.8198, population: 5685807 },
  { name: "Bangkok", country: "TH", region: "Bangkok", latitude: 13.7563, longitude: 100.5018, population: 10156000 },
  { name: "Jakarta", country: "ID", region: "Jakarta", latitude: -6.2088, longitude: 106.8456, population: 10770487 },
  { name: "Manila", country: "PH", region: "Metro Manila", latitude: 14.5995, longitude: 120.9842, population: 13484462 },
  { name: "Ho Chi Minh City", country: "VN", region: "Ho Chi Minh City", latitude: 10.8231, longitude: 106.6297, population: 9000000 },
  { name: "Kuala Lumpur", country: "MY", region: "Kuala Lumpur", latitude: 3.1390, longitude: 101.6869, population: 1768000 },
];

export function searchCities(query: string, limit: number = 10): CityData[] {
  if (!query || query.length < 2) return [];
  
  const normalizedQuery = query.toLowerCase().trim();
  
  return MAJOR_CITIES
    .filter(city => 
      city.name.toLowerCase().includes(normalizedQuery) ||
      city.country.toLowerCase().includes(normalizedQuery) ||
      city.region.toLowerCase().includes(normalizedQuery)
    )
    .sort((a, b) => {
      // Prioritize exact matches
      const aExact = a.name.toLowerCase().startsWith(normalizedQuery);
      const bExact = b.name.toLowerCase().startsWith(normalizedQuery);
      
      if (aExact && !bExact) return -1;
      if (!aExact && bExact) return 1;
      
      // Then sort by population
      return (b.population || 0) - (a.population || 0);
    })
    .slice(0, limit);
}

export function getCountryFlag(countryCode: string): string {
  const flags: { [key: string]: string } = {
    'US': '🇺🇸', 'CA': '🇨🇦', 'GB': '🇬🇧', 'DE': '🇩🇪', 'FR': '🇫🇷',
    'IT': '🇮🇹', 'ES': '🇪🇸', 'JP': '🇯🇵', 'CN': '🇨🇳', 'IN': '🇮🇳',
    'AU': '🇦🇺', 'BR': '🇧🇷', 'RU': '🇷🇺', 'KR': '🇰🇷', 'MX': '🇲🇽',
    'AR': '🇦🇷', 'AE': '🇦🇪', 'TR': '🇹🇷', 'IR': '🇮🇷', 'SA': '🇸🇦',
    'EG': '🇪🇬', 'NG': '🇳🇬', 'ZA': '🇿🇦', 'SG': '🇸🇬', 'TH': '🇹🇭',
    'ID': '🇮🇩', 'PH': '🇵🇭', 'VN': '🇻🇳', 'MY': '🇲🇾'
  };
  
  return flags[countryCode.toUpperCase()] || '🌍';
}