import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  TrendingUp, 
  TrendingDown, 
  Shield, 
  DollarSign, 
  Calendar, 
  Droplets,
  Thermometer,
  MapPin,
  Award,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Leaf
} from "lucide-react";

interface CropRecommendation {
  id: string;
  name: string;
  scientificName: string;
  profitabilityScore: number;
  riskScore: number;
  suitabilityScore: number;
  estimatedProfit: number;
  plantingWindow: string;
  harvestWindow: string;
  growingDays: number;
  waterNeeds: 'Low' | 'Medium' | 'High';
  soilSuitability: number;
  climateMatch: number;
  marketDemand: 'Low' | 'Medium' | 'High';
  advantages: string[];
  considerations: string[];
  tips: string[];
}

const Recommendations = () => {
  const [selectedCrop, setSelectedCrop] = useState<string | null>(null);

  // Mock crop recommendations
  const recommendations: CropRecommendation[] = [
    {
      id: "corn",
      name: "Corn (Dent)",
      scientificName: "Zea mays",
      profitabilityScore: 92,
      riskScore: 15,
      suitabilityScore: 88,
      estimatedProfit: 850,
      plantingWindow: "April 15 - May 15",
      harvestWindow: "September 20 - October 15",
      growingDays: 120,
      waterNeeds: "Medium",
      soilSuitability: 95,
      climateMatch: 90,
      marketDemand: "High",
      advantages: [
        "Excellent soil and climate match",
        "Strong local market demand",
        "Proven track record in your region",
        "Good insurance coverage available"
      ],
      considerations: [
        "Monitor for corn borer during mid-season",
        "Ensure adequate nitrogen levels",
        "May need supplemental irrigation in July"
      ],
      tips: [
        "Plant when soil temperature reaches 50°F",
        "Consider split nitrogen application",
        "Monitor weather for optimal harvest timing"
      ]
    },
    {
      id: "soybeans",
      name: "Soybeans",
      scientificName: "Glycine max",
      profitabilityScore: 85,
      riskScore: 20,
      suitabilityScore: 82,
      estimatedProfit: 620,
      plantingWindow: "May 1 - June 1",
      harvestWindow: "September 15 - October 30",
      growingDays: 110,
      waterNeeds: "Medium",
      soilSuitability: 88,
      climateMatch: 85,
      marketDemand: "High",
      advantages: [
        "Nitrogen fixation benefits soil",
        "Good rotation crop with corn",
        "Lower input costs",
        "Stable market prices"
      ],
      considerations: [
        "Watch for soybean cyst nematode",
        "May need inoculation for nitrogen fixation",
        "Susceptible to late-season drought"
      ],
      tips: [
        "Test soil for SCN before planting",
        "Consider resistant varieties",
        "Monitor moisture levels during pod fill"
      ]
    },
    {
      id: "wheat",
      name: "Winter Wheat",
      scientificName: "Triticum aestivum",
      profitabilityScore: 78,
      riskScore: 25,
      suitabilityScore: 75,
      estimatedProfit: 480,
      plantingWindow: "September 15 - October 15",
      harvestWindow: "July 1 - July 30",
      growingDays: 240,
      waterNeeds: "Low",
      soilSuitability: 80,
      climateMatch: 78,
      marketDemand: "Medium",
      advantages: [
        "Lower water requirements",
        "Early harvest allows double cropping",
        "Good erosion control over winter",
        "Established local markets"
      ],
      considerations: [
        "Risk of freeze damage in harsh winters",
        "May compete with weeds in spring",
        "Storage facilities needed post-harvest"
      ],
      tips: [
        "Plant before first frost",
        "Apply phosphorus at planting",
        "Monitor for Hessian fly during emergence"
      ]
    },
    {
      id: "sunflower",
      name: "Sunflower",
      scientificName: "Helianthus annuus",
      profitabilityScore: 70,
      riskScore: 35,
      suitabilityScore: 68,
      estimatedProfit: 420,
      plantingWindow: "May 15 - June 15",
      harvestWindow: "September 1 - October 1",
      growingDays: 100,
      waterNeeds: "Low",
      soilSuitability: 75,
      climateMatch: 72,
      marketDemand: "Medium",
      advantages: [
        "Drought tolerant once established",
        "Attracts beneficial insects",
        "Good break crop in rotation",
        "Multiple market opportunities (oil, bird feed)"
      ],
      considerations: [
        "Susceptible to bird damage",
        "Requires specific harvest equipment",
        "Limited local processing facilities"
      ],
      tips: [
        "Plant after soil warms to 50°F",
        "Use bird deterrents near harvest",
        "Monitor head development for optimal harvest"
      ]
    },
    {
      id: "alfalfa",
      name: "Alfalfa",
      scientificName: "Medicago sativa",
      profitabilityScore: 65,
      riskScore: 30,
      suitabilityScore: 70,
      estimatedProfit: 380,
      plantingWindow: "August 15 - September 15",
      harvestWindow: "Multiple cuts per season",
      growingDays: 365,
      waterNeeds: "High",
      soilSuitability: 85,
      climateMatch: 65,
      marketDemand: "Medium",
      advantages: [
        "Perennial crop with multiple harvests",
        "Excellent for soil improvement",
        "Strong local dairy market",
        "Long-term profitability"
      ],
      considerations: [
        "High initial establishment costs",
        "Requires proper drainage",
        "3-4 year commitment",
        "Higher water requirements"
      ],
      tips: [
        "Test soil pH - needs 6.5 or higher",
        "Inoculate seeds before planting",
        "Time first cutting carefully"
      ]
    }
  ];

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-success";
    if (score >= 60) return "text-warning";
    return "text-destructive";
  };

  const getRiskColor = (risk: number) => {
    if (risk <= 20) return "text-success";
    if (risk <= 40) return "text-warning";
    return "text-destructive";
  };

  const getDemandBadgeVariant = (demand: string) => {
    switch (demand) {
      case "High": return "default";
      case "Medium": return "secondary";
      case "Low": return "outline";
      default: return "outline";
    }
  };

  const getWaterNeedsColor = (needs: string) => {
    switch (needs) {
      case "Low": return "text-success";
      case "Medium": return "text-warning";
      case "High": return "text-destructive";
      default: return "text-muted-foreground";
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-4">Crop Recommendations</h1>
        <p className="text-xl text-muted-foreground">
          AI-powered crop suggestions based on your location, weather patterns, and market conditions
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <Card className="shadow-soft">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-3">
              <div className="bg-success w-12 h-12 rounded-full flex items-center justify-center">
                <Award className="h-6 w-6 text-success-foreground" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Top Recommendation</p>
                <p className="text-xl font-bold text-foreground">Corn (Dent)</p>
                <p className="text-sm text-success">92% Profitability Score</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-3">
              <div className="bg-primary w-12 h-12 rounded-full flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Estimated Max Profit</p>
                <p className="text-xl font-bold text-foreground">$850/acre</p>
                <p className="text-sm text-primary">Based on current markets</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-3">
              <div className="bg-accent w-12 h-12 rounded-full flex items-center justify-center">
                <MapPin className="h-6 w-6 text-accent-foreground" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Location Match</p>
                <p className="text-xl font-bold text-foreground">Excellent</p>
                <p className="text-sm text-accent">Your region is optimal</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Crop Recommendations Grid */}
      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold text-foreground mb-4">Recommended Crops</h2>
          <div className="space-y-4">
            {recommendations.map((crop, index) => (
              <Card 
                key={crop.id} 
                className={`cursor-pointer shadow-soft hover:shadow-medium transition-smooth ${
                  selectedCrop === crop.id ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => setSelectedCrop(crop.id)}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="flex items-center space-x-2">
                        <span className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                          {index + 1}
                        </span>
                        <span>{crop.name}</span>
                      </CardTitle>
                      <p className="text-sm text-muted-foreground italic">{crop.scientificName}</p>
                    </div>
                    <Badge variant={getDemandBadgeVariant(crop.marketDemand)}>
                      {crop.marketDemand} Demand
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-muted-foreground">Profitability</span>
                        <span className={`font-semibold ${getScoreColor(crop.profitabilityScore)}`}>
                          {crop.profitabilityScore}%
                        </span>
                      </div>
                      <Progress value={crop.profitabilityScore} className="h-2" />
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-muted-foreground">Risk Level</span>
                        <span className={`font-semibold ${getRiskColor(crop.riskScore)}`}>
                          {crop.riskScore}%
                        </span>
                      </div>
                      <Progress value={100 - crop.riskScore} className="h-2" />
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-muted-foreground">Suitability</span>
                        <span className={`font-semibold ${getScoreColor(crop.suitabilityScore)}`}>
                          {crop.suitabilityScore}%
                        </span>
                      </div>
                      <Progress value={crop.suitabilityScore} className="h-2" />
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4 mt-4 pt-4 border-t border-border">
                    <div className="flex items-center space-x-2">
                      <DollarSign className="h-4 w-4 text-success" />
                      <span className="text-sm text-muted-foreground">Est. Profit:</span>
                      <span className="font-semibold text-success">${crop.estimatedProfit}/acre</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Droplets className={`h-4 w-4 ${getWaterNeedsColor(crop.waterNeeds)}`} />
                      <span className="text-sm text-muted-foreground">Water Needs:</span>
                      <span className="font-semibold">{crop.waterNeeds}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Detailed View */}
        <div>
          {selectedCrop ? (
            <div className="sticky top-4">
              {(() => {
                const crop = recommendations.find(c => c.id === selectedCrop);
                if (!crop) return null;

                return (
                  <Card className="shadow-medium">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Leaf className="h-5 w-5 text-primary" />
                        <span>{crop.name}</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Tabs defaultValue="overview" className="w-full">
                        <TabsList className="grid w-full grid-cols-3">
                          <TabsTrigger value="overview">Overview</TabsTrigger>
                          <TabsTrigger value="details">Details</TabsTrigger>
                          <TabsTrigger value="tips">Tips</TabsTrigger>
                        </TabsList>
                        
                        <TabsContent value="overview" className="space-y-4">
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-muted-foreground">Planting Window</span>
                              <span className="font-semibold">{crop.plantingWindow}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-muted-foreground">Harvest Window</span>
                              <span className="font-semibold">{crop.harvestWindow}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-muted-foreground">Growing Days</span>
                              <span className="font-semibold">{crop.growingDays} days</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-muted-foreground">Soil Suitability</span>
                              <span className={`font-semibold ${getScoreColor(crop.soilSuitability)}`}>
                                {crop.soilSuitability}%
                              </span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-muted-foreground">Climate Match</span>
                              <span className={`font-semibold ${getScoreColor(crop.climateMatch)}`}>
                                {crop.climateMatch}%
                              </span>
                            </div>
                          </div>
                        </TabsContent>
                        
                        <TabsContent value="details" className="space-y-4">
                          <div>
                            <h4 className="font-semibold text-foreground mb-2 flex items-center space-x-1">
                              <CheckCircle className="h-4 w-4 text-success" />
                              <span>Advantages</span>
                            </h4>
                            <ul className="space-y-1">
                              {crop.advantages.map((advantage, i) => (
                                <li key={i} className="text-sm text-muted-foreground flex items-start space-x-1">
                                  <span className="text-success">•</span>
                                  <span>{advantage}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          
                          <div>
                            <h4 className="font-semibold text-foreground mb-2 flex items-center space-x-1">
                              <AlertTriangle className="h-4 w-4 text-warning" />
                              <span>Considerations</span>
                            </h4>
                            <ul className="space-y-1">
                              {crop.considerations.map((consideration, i) => (
                                <li key={i} className="text-sm text-muted-foreground flex items-start space-x-1">
                                  <span className="text-warning">•</span>
                                  <span>{consideration}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </TabsContent>
                        
                        <TabsContent value="tips" className="space-y-4">
                          <div>
                            <h4 className="font-semibold text-foreground mb-2">Farming Tips</h4>
                            <ul className="space-y-2">
                              {crop.tips.map((tip, i) => (
                                <li key={i} className="text-sm text-muted-foreground flex items-start space-x-1">
                                  <span className="text-accent">💡</span>
                                  <span>{tip}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </TabsContent>
                      </Tabs>
                    </CardContent>
                  </Card>
                );
              })()}
            </div>
          ) : (
            <Card className="shadow-soft">
              <CardContent className="pt-6 text-center">
                <Leaf className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">
                  Select a crop recommendation to view detailed information
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Recommendations;