// Database schema types for Rakshak

export interface User {
  id: number;
  email?: string;
  phone?: string;
  name?: string;
  preferred_language: string;
  location_lat?: number;
  location_lng?: number;
  created_at: string;
}

export interface Farm {
  id: number;
  user_id: number;
  name: string;
  size_acres: number;
  soil_type?: string;
  ph_level?: number;
  water_source?: string;
  location_lat?: number;
  location_lng?: number;
  created_at: string;
}

export interface Crop {
  id: number;
  name_en: string;
  name_hi?: string;
  name_ta?: string;
  name_te?: string;
  name_kn?: string;
  name_bn?: string;
  name_gu?: string;
  name_mr?: string;
  name_pa?: string;
  soil_types: string[];
  ph_min?: number;
  ph_max?: number;
  temp_min?: number;
  temp_max?: number;
  rainfall_min?: number;
  rainfall_max?: number;
  growing_days_min?: number;
  growing_days_max?: number;
  market_price?: number;
  profitability_score?: number;
}

export interface Recommendation {
  id: number;
  farm_id: number;
  crop_id: number;
  confidence_score: number;
  risk_level: 'low' | 'medium' | 'high';
  profit_projection: number;
  planting_date?: string;
  harvest_date?: string;
  weather_data?: Record<string, any>;
  created_at: string;
}

export interface WeatherData {
  temperature: number;
  humidity: number;
  precipitation: number;
  wind_speed: number;
  conditions: string;
  forecast: Array<{
    date: string;
    temp_high: number;
    temp_low: number;
    precipitation: number;
    conditions: string;
  }>;
}