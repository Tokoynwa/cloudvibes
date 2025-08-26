import { 
  Sun, 
  Moon, 
  Cloud, 
  CloudRain, 
  CloudSnow, 
  CloudLightning, 
  CloudDrizzle,
  EyeOff
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface WeatherIconProps {
  condition: string;
  icon?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export function WeatherIcon({ condition, icon, size = 'md', className }: WeatherIconProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12'
  };

  const getIcon = () => {
    const conditionLower = condition.toLowerCase();
    const isNight = icon?.includes('n');
    
    if (conditionLower.includes('clear')) {
      return isNight ? <Moon className="text-blue-300" /> : <Sun className="text-yellow-500" />;
    }
    
    if (conditionLower.includes('cloud') && !conditionLower.includes('rain') && !conditionLower.includes('storm')) {
      return <Cloud className="text-gray-500" />;
    }
    
    if (conditionLower.includes('rain') || conditionLower.includes('shower')) {
      return <CloudRain className="text-blue-500" />;
    }
    
    if (conditionLower.includes('drizzle')) {
      return <CloudDrizzle className="text-blue-400" />;
    }
    
    if (conditionLower.includes('snow')) {
      return <CloudSnow className="text-blue-200" />;
    }
    
    if (conditionLower.includes('thunder') || conditionLower.includes('storm')) {
      return <CloudLightning className="text-purple-500" />;
    }
    
    if (conditionLower.includes('fog') || conditionLower.includes('mist')) {
      return <EyeOff className="text-gray-400" />;
    }
    
    // Default fallback
    return isNight ? <Moon className="text-blue-300" /> : <Sun className="text-yellow-500" />;
  };

  return (
    <div className={cn(sizeClasses[size], className)}>
      {getIcon()}
    </div>
  );
}