import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatTemperature(temp: number, unit: 'C' | 'F' = 'C'): string {
  if (unit === 'F') {
    return `${Math.round((temp * 9) / 5 + 32)}°F`;
  }
  return `${Math.round(temp)}°C`;
}

export function formatWindSpeed(speed: number, unit: 'kmh' | 'mph' = 'kmh'): string {
  if (unit === 'mph') {
    return `${Math.round(speed * 0.621371)} mph`;
  }
  return `${Math.round(speed)} km/h`;
}

export function formatPressure(pressure: number, unit: 'hPa' | 'inHg' = 'hPa'): string {
  if (unit === 'inHg') {
    return `${(pressure * 0.02953).toFixed(2)} inHg`;
  }
  return `${Math.round(pressure)} hPa`;
}

export function getWindDirection(degrees: number): string {
  const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  return directions[Math.round(degrees / 22.5) % 16];
}

export function getUVIndexLevel(uvIndex: number): { level: string; color: string } {
  if (uvIndex <= 2) return { level: 'Low', color: 'text-green-600' };
  if (uvIndex <= 5) return { level: 'Moderate', color: 'text-yellow-600' };
  if (uvIndex <= 7) return { level: 'High', color: 'text-orange-600' };
  if (uvIndex <= 10) return { level: 'Very High', color: 'text-red-600' };
  return { level: 'Extreme', color: 'text-purple-600' };
}

export function getAirQualityLevel(aqi: number): { level: string; color: string } {
  if (aqi <= 50) return { level: 'Good', color: 'text-green-600' };
  if (aqi <= 100) return { level: 'Moderate', color: 'text-yellow-600' };
  if (aqi <= 150) return { level: 'Unhealthy for Sensitive', color: 'text-orange-600' };
  if (aqi <= 200) return { level: 'Unhealthy', color: 'text-red-600' };
  if (aqi <= 300) return { level: 'Very Unhealthy', color: 'text-purple-600' };
  return { level: 'Hazardous', color: 'text-red-800' };
}

export function debounce<T extends (...args: never[]) => void>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export function throttle<T extends (...args: never[]) => void>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}