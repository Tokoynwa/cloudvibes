import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { WeatherData, Location, SearchLocation } from '@/lib/types/weather';

interface WeatherStore {
  // Current weather data
  currentWeather: WeatherData | null;
  
  // User settings
  units: {
    temperature: 'C' | 'F';
    wind: 'kmh' | 'mph';
    pressure: 'hPa' | 'inHg';
  };
  
  // Location management
  currentLocation: Location | null;
  savedLocations: Location[];
  locationPermission: 'granted' | 'denied' | 'prompt';
  
  // UI state
  isLoading: boolean;
  error: string | null;
  lastUpdated: string | null;
  
  // Search
  searchResults: SearchLocation[];
  isSearching: boolean;
  
  // Actions
  setCurrentWeather: (weather: WeatherData) => void;
  setCurrentLocation: (location: Location) => void;
  addSavedLocation: (location: Location) => void;
  removeSavedLocation: (locationId: string) => void;
  setUnits: (units: Partial<WeatherStore['units']>) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setLocationPermission: (permission: 'granted' | 'denied' | 'prompt') => void;
  setSearchResults: (results: SearchLocation[]) => void;
  setSearching: (searching: boolean) => void;
  clearError: () => void;
  refreshWeather: () => void;
}

export const useWeatherStore = create<WeatherStore>()(
  persist(
    (set, get) => ({
      // Initial state
      currentWeather: null,
      units: {
        temperature: 'C',
        wind: 'kmh',
        pressure: 'hPa',
      },
      currentLocation: null,
      savedLocations: [],
      locationPermission: 'prompt',
      isLoading: false,
      error: null,
      lastUpdated: null,
      searchResults: [],
      isSearching: false,
      
      // Actions
      setCurrentWeather: (weather) =>
        set({
          currentWeather: weather,
          lastUpdated: new Date().toISOString(),
          error: null,
        }),
        
      setCurrentLocation: (location) =>
        set({ currentLocation: location }),
        
      addSavedLocation: (location) =>
        set((state) => {
          const exists = state.savedLocations.some(
            (loc) => loc.latitude === location.latitude && loc.longitude === location.longitude
          );
          if (!exists) {
            return {
              savedLocations: [...state.savedLocations, location],
            };
          }
          return state;
        }),
        
      removeSavedLocation: (locationId) =>
        set((state) => ({
          savedLocations: state.savedLocations.filter(
            (loc) => `${loc.latitude}-${loc.longitude}` !== locationId
          ),
        })),
        
      setUnits: (units) =>
        set((state) => ({
          units: { ...state.units, ...units },
        })),
        
      setLoading: (loading) => set({ isLoading: loading }),
      
      setError: (error) => set({ error, isLoading: false }),
      
      setLocationPermission: (permission) =>
        set({ locationPermission: permission }),
        
      setSearchResults: (results) => set({ searchResults: results }),
      
      setSearching: (searching) => set({ isSearching: searching }),
      
      clearError: () => set({ error: null }),
      
      refreshWeather: () => {
        const { currentLocation } = get();
        if (currentLocation) {
          set({ isLoading: true, error: null });
          // This will be handled by the component using the store
        }
      },
    }),
    {
      name: 'weather-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        units: state.units,
        savedLocations: state.savedLocations,
        locationPermission: state.locationPermission,
      }),
    }
  )
);