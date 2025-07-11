import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { 
  MapPin, 
  Cloud, 
  Sun, 
  CloudRain, 
  Wind, 
  Thermometer, 
  Droplets,
  Eye,
  TrendingUp,
  TrendingDown,
  AlertTriangle
} from "lucide-react";

interface WeatherData {
  current: {
    temperature: number;
    humidity: number;
    windSpeed: number;
    visibility: number;
    condition: string;
    icon: string;
  };
  forecast: Array<{
    date: string;
    high: number;
    low: number;
    humidity: number;
    precipitation: number;
    condition: string;
    farmingTip: string;
  }>;
  alerts: Array<{
    title: string;
    description: string;
    severity: 'low' | 'medium' | 'high';
  }>;
}

const Weather = () => {
  const [location, setLocation] = useState("");
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Mock weather data for demonstration
  const mockWeatherData: WeatherData = {
    current: {
      temperature: 72,
      humidity: 65,
      windSpeed: 8,
      visibility: 10,
      condition: "Partly Cloudy",
      icon: "partly-cloudy"
    },
    forecast: [
      {
        date: "Today",
        high: 75,
        low: 58,
        humidity: 65,
        precipitation: 0,
        condition: "Partly Cloudy",
        farmingTip: "Ideal conditions for field work and spraying"
      },
      {
        date: "Tomorrow",
        high: 78,
        low: 62,
        humidity: 70,
        precipitation: 20,
        condition: "Scattered Showers",
        farmingTip: "Light irrigation may be sufficient"
      },
      {
        date: "Wednesday",
        high: 73,
        low: 55,
        humidity: 80,
        precipitation: 60,
        condition: "Rain",
        farmingTip: "Avoid field operations, good for crop growth"
      },
      {
        date: "Thursday",
        high: 69,
        low: 52,
        humidity: 75,
        precipitation: 10,
        condition: "Cloudy",
        farmingTip: "Cool conditions, monitor for fungal diseases"
      },
      {
        date: "Friday",
        high: 76,
        low: 59,
        humidity: 60,
        precipitation: 0,
        condition: "Sunny",
        farmingTip: "Perfect for harvesting and drying crops"
      },
      {
        date: "Saturday",
        high: 81,
        low: 64,
        humidity: 55,
        precipitation: 0,
        condition: "Sunny",
        farmingTip: "Excellent for most farm operations"
      },
      {
        date: "Sunday",
        high: 79,
        low: 63,
        humidity: 70,
        precipitation: 30,
        condition: "Partly Cloudy",
        farmingTip: "Good day for maintenance and planning"
      }
    ],
    alerts: [
      {
        title: "Frost Warning",
        description: "Temperatures may drop below freezing late Thursday night",
        severity: 'high'
      },
      {
        title: "High Humidity",
        description: "Increased risk of fungal diseases midweek",
        severity: 'medium'
      }
    ]
  };

  const handleLocationSearch = async () => {
    if (!location.trim()) {
      toast({
        title: "Location Required",
        description: "Please enter a location to get weather data",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setWeatherData(mockWeatherData);
      setIsLoading(false);
      toast({
        title: "Weather Data Loaded",
        description: `Weather information for ${location} has been updated`,
      });
    }, 1500);
  };

  const getLocationAutomatically = () => {
    if (navigator.geolocation) {
      setIsLoading(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation(`${latitude.toFixed(2)}, ${longitude.toFixed(2)}`);
          setTimeout(() => {
            setWeatherData(mockWeatherData);
            setIsLoading(false);
            toast({
              title: "Location Detected",
              description: "Weather data loaded for your current location",
            });
          }, 1000);
        },
        (error) => {
          setIsLoading(false);
          toast({
            title: "Location Error",
            description: "Unable to get your location. Please enter manually.",
            variant: "destructive"
          });
        }
      );
    }
  };

  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'sunny':
        return <Sun className="h-6 w-6 text-warning" />;
      case 'partly cloudy':
        return <Cloud className="h-6 w-6 text-muted-foreground" />;
      case 'rain':
      case 'scattered showers':
        return <CloudRain className="h-6 w-6 text-accent" />;
      default:
        return <Cloud className="h-6 w-6 text-muted-foreground" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'border-destructive bg-destructive/10';
      case 'medium':
        return 'border-warning bg-warning/10';
      case 'low':
        return 'border-success bg-success/10';
      default:
        return 'border-muted bg-muted/10';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-4">Weather Intelligence</h1>
        <p className="text-xl text-muted-foreground">
          Get real-time weather data and forecasts optimized for farming decisions
        </p>
      </div>

      {/* Location Input */}
      <Card className="mb-8 shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MapPin className="h-5 w-5" />
            <span>Farm Location</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Label htmlFor="location">Enter your farm location</Label>
              <Input
                id="location"
                placeholder="City, State or ZIP code"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="mt-2"
              />
            </div>
            <div className="flex gap-2 sm:items-end">
              <Button 
                onClick={handleLocationSearch}
                disabled={isLoading}
                className="min-w-fit"
              >
                {isLoading ? "Loading..." : "Get Weather"}
              </Button>
              <Button 
                variant="outline"
                onClick={getLocationAutomatically}
                disabled={isLoading}
              >
                Use GPS
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {weatherData && (
        <>
          {/* Weather Alerts */}
          {weatherData.alerts.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">Weather Alerts</h2>
              <div className="grid gap-4">
                {weatherData.alerts.map((alert, index) => (
                  <Card key={index} className={`border-2 ${getSeverityColor(alert.severity)}`}>
                    <CardContent className="pt-6">
                      <div className="flex items-start space-x-3">
                        <AlertTriangle className="h-5 w-5 text-destructive mt-1" />
                        <div>
                          <h3 className="font-semibold text-foreground">{alert.title}</h3>
                          <p className="text-muted-foreground">{alert.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Current Weather */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">Current Conditions</h2>
            <Card className="shadow-medium">
              <CardContent className="pt-6">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="flex items-center space-x-3">
                    <Thermometer className="h-8 w-8 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Temperature</p>
                      <p className="text-2xl font-bold text-foreground">{weatherData.current.temperature}°F</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Droplets className="h-8 w-8 text-accent" />
                    <div>
                      <p className="text-sm text-muted-foreground">Humidity</p>
                      <p className="text-2xl font-bold text-foreground">{weatherData.current.humidity}%</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Wind className="h-8 w-8 text-secondary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Wind Speed</p>
                      <p className="text-2xl font-bold text-foreground">{weatherData.current.windSpeed} mph</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Eye className="h-8 w-8 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Visibility</p>
                      <p className="text-2xl font-bold text-foreground">{weatherData.current.visibility} mi</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 7-Day Forecast */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">7-Day Farming Forecast</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {weatherData.forecast.map((day, index) => (
                <Card key={index} className="shadow-soft hover:shadow-medium transition-smooth">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-foreground">{day.date}</h3>
                      {getWeatherIcon(day.condition)}
                    </div>
                    <p className="text-sm text-muted-foreground">{day.condition}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">High/Low</span>
                        <span className="font-semibold text-foreground">{day.high}°/{day.low}°</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Humidity</span>
                        <span className="font-semibold text-foreground">{day.humidity}%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Rain Chance</span>
                        <span className="font-semibold text-foreground">{day.precipitation}%</span>
                      </div>
                      <div className="pt-2 border-t border-border">
                        <p className="text-xs text-success font-medium">
                          💡 {day.farmingTip}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Historical Trends */}
          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle>Historical Weather Patterns</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold text-foreground mb-3">Last 30 Days</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Avg Temperature</span>
                      <div className="flex items-center space-x-1">
                        <span className="font-semibold">71°F</span>
                        <TrendingUp className="h-4 w-4 text-success" />
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Total Rainfall</span>
                      <div className="flex items-center space-x-1">
                        <span className="font-semibold">2.3"</span>
                        <TrendingDown className="h-4 w-4 text-warning" />
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Avg Humidity</span>
                      <span className="font-semibold">68%</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-3">Same Period Last Year</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Avg Temperature</span>
                      <span className="font-semibold">68°F</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Total Rainfall</span>
                      <span className="font-semibold">3.1"</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Avg Humidity</span>
                      <span className="font-semibold">72%</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

export default Weather;