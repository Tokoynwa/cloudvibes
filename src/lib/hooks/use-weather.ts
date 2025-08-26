import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useCallback } from 'react';
import { weatherAPI } from '@/lib/api/weather';
import { useWeatherStore } from '@/lib/store/weather-store';
import { Location, WeatherData } from '@/lib/types/weather';

export function useCurrentWeather(lat?: number, lon?: number) {
  const { setCurrentWeather, setError, setLoading } = useWeatherStore();
  
  return useQuery<WeatherData | undefined, Error>({
    queryKey: ['weather', 'current', lat, lon],
    queryFn: async () => {
      if (!lat || !lon) {
        throw new Error('Location coordinates are required');
      }
      
      setLoading(true);
      const response = await weatherAPI.getCurrentWeatherByCoords(lat, lon);
      
      if (!response.success) {
        setError(response.error?.message || 'Failed to fetch weather data');
        setLoading(false);
        throw new Error(response.error?.message || 'Failed to fetch weather data');
      }
      
      if (response.data) {
        setCurrentWeather(response.data);
        setError(null);
        setLoading(false);
      }
      
      return response.data;
    },
    enabled: Boolean(lat && lon),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: 2,
  });
}

export function useWeatherByCity(city: string) {
  const { setCurrentWeather, setError, setLoading } = useWeatherStore();
  
  return useQuery<WeatherData | undefined, Error>({
    queryKey: ['weather', 'city', city],
    queryFn: async () => {
      if (!city.trim()) {
        throw new Error('City name is required');
      }
      
      setLoading(true);
      const response = await weatherAPI.getCurrentWeatherByCity(city);
      
      if (!response.success) {
        setError(response.error?.message || 'Failed to fetch weather data');
        setLoading(false);
        throw new Error(response.error?.message || 'Failed to fetch weather data');
      }
      
      if (response.data) {
        setCurrentWeather(response.data);
        setError(null);
        setLoading(false);
      }
      
      return response.data;
    },
    enabled: Boolean(city.trim()),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: 2,
  });
}

export function useGeolocation() {
  const { 
    currentLocation, 
    locationPermission,
    setCurrentLocation, 
    setLocationPermission, 
    setError 
  } = useWeatherStore();
  
  const getCurrentLocation = async (): Promise<Location | null> => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by this browser');
      return null;
    }

    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          resolve,
          reject,
          {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 5 * 60 * 1000 // 5 minutes
          }
        );
      });

      const location: Location = {
        name: 'Current Location',
        country: '',
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        localTime: new Date().toISOString()
      };

      setCurrentLocation(location);
      setLocationPermission('granted');
      setError(null);
      
      return location;
    } catch (error) {
      const geolocationError = error as GeolocationPositionError;
      let errorMessage = 'Failed to get your location';
      
      switch (geolocationError.code) {
        case geolocationError.PERMISSION_DENIED:
          errorMessage = 'Location access denied. Please enable location services.';
          setLocationPermission('denied');
          break;
        case geolocationError.POSITION_UNAVAILABLE:
          errorMessage = 'Location information unavailable.';
          break;
        case geolocationError.TIMEOUT:
          errorMessage = 'Location request timed out.';
          break;
      }
      
      setError(errorMessage);
      return null;
    }
  };

  const requestLocationPermission = async () => {
    try {
      const result = await navigator.permissions.query({ name: 'geolocation' });
      setLocationPermission(result.state as 'granted' | 'denied' | 'prompt');
      
      if (result.state === 'granted') {
        return await getCurrentLocation();
      }
      
      return null;
    } catch {
      // Fallback for browsers that don't support permissions API
      return await getCurrentLocation();
    }
  };

  return {
    currentLocation,
    locationPermission,
    getCurrentLocation,
    requestLocationPermission
  };
}

export function useLocationSearch() {
  const { searchResults, isSearching, setSearchResults, setSearching } = useWeatherStore();
  
  const searchLocations = useCallback(async (query: string) => {
    if (!query.trim() || query.length < 2) {
      setSearchResults([]);
      return;
    }

    setSearching(true);
    
    try {
      const response = await weatherAPI.searchLocations(query);
      
      if (response.success && response.data) {
        setSearchResults(response.data);
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error('Location search error:', error);
      setSearchResults([]);
    } finally {
      setSearching(false);
    }
  }, [setSearchResults, setSearching]);

  const clearSearch = useCallback(() => {
    setSearchResults([]);
    setSearching(false);
  }, [setSearchResults, setSearching]);

  return {
    searchResults,
    isSearching,
    searchLocations,
    clearSearch
  };
}

export function useWeatherRefresh() {
  const queryClient = useQueryClient();
  const { currentLocation, setLoading, setError } = useWeatherStore();
  
  const refreshWeather = async () => {
    if (!currentLocation) {
      setError('No location available for refresh');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Invalidate and refetch current weather data
      await queryClient.invalidateQueries({
        queryKey: ['weather', 'current', currentLocation.latitude, currentLocation.longitude]
      });
      
      // Force refetch
      await queryClient.refetchQueries({
        queryKey: ['weather', 'current', currentLocation.latitude, currentLocation.longitude]
      });
      
    } catch {
      setError('Failed to refresh weather data');
    } finally {
      setLoading(false);
    }
  };

  return { refreshWeather };
}

export function useAutoRefresh(interval: number = 5 * 60 * 1000) {
  const { refreshWeather } = useWeatherRefresh();
  const { currentLocation } = useWeatherStore();

  useEffect(() => {
    if (!currentLocation) return;

    const intervalId = setInterval(() => {
      refreshWeather();
    }, interval);

    return () => clearInterval(intervalId);
  }, [currentLocation, interval, refreshWeather]);
}