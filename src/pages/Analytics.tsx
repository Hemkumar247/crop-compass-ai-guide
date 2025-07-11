import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  BarChart3, 
  PieChart, 
  Calendar,
  Leaf,
  AlertTriangle,
  Target,
  Award
} from "lucide-react";

const Analytics = () => {
  const currentYear = new Date().getFullYear();
  
  const farmMetrics = {
    totalAcres: 250,
    plantedAcres: 235,
    profitPerAcre: 642,
    totalRevenue: 150870,
    totalCosts: 89250,
    netProfit: 61620,
    profitMargin: 40.8,
    yieldGoalProgress: 78
  };

  const cropPerformance = [
    {
      crop: "Corn",
      acres: 120,
      yield: 165,
      targetYield: 170,
      profit: 38400,
      profitPerAcre: 320,
      riskLevel: "Low"
    },
    {
      crop: "Soybeans",
      acres: 80,
      yield: 52,
      targetYield: 55,
      profit: 20800,
      profitPerAcre: 260,
      riskLevel: "Medium"
    },
    {
      crop: "Winter Wheat",
      acres: 35,
      yield: 68,
      targetYield: 65,
      profit: 2420,
      profitPerAcre: 69,
      riskLevel: "High"
    }
  ];

  const monthlyData = [
    { month: "Jan", revenue: 5200, costs: 3800, profit: 1400 },
    { month: "Feb", revenue: 4800, costs: 4200, profit: 600 },
    { month: "Mar", revenue: 8500, costs: 6200, profit: 2300 },
    { month: "Apr", revenue: 12200, costs: 9800, profit: 2400 },
    { month: "May", revenue: 15800, costs: 12200, profit: 3600 },
    { month: "Jun", revenue: 18500, costs: 14200, profit: 4300 },
  ];

  const weatherImpact = [
    {
      event: "Late Spring Frost",
      date: "April 15",
      impactedCrop: "Corn",
      acresAffected: 25,
      estimatedLoss: 3250,
      severity: "Medium"
    },
    {
      event: "July Drought",
      date: "July 10-25",
      impactedCrop: "Soybeans",
      acresAffected: 40,
      estimatedLoss: 4800,
      severity: "High"
    },
    {
      event: "Early Harvest Weather",
      date: "September 5",
      impactedCrop: "Wheat",
      acresAffected: 35,
      estimatedLoss: -1200, // Negative means gain
      severity: "Low"
    }
  ];

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "Low": return "text-success";
      case "Medium": return "text-warning";
      case "High": return "text-destructive";
      default: return "text-muted-foreground";
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "Low": return "border-success bg-success/10";
      case "Medium": return "border-warning bg-warning/10";
      case "High": return "border-destructive bg-destructive/10";
      default: return "border-muted bg-muted/10";
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-4">Farm Analytics</h1>
        <p className="text-xl text-muted-foreground">
          Comprehensive insights into your farm's performance and profitability
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="shadow-soft">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Revenue</p>
                <p className="text-2xl font-bold text-foreground">${farmMetrics.totalRevenue.toLocaleString()}</p>
                <div className="flex items-center space-x-1 mt-1">
                  <TrendingUp className="h-4 w-4 text-success" />
                  <span className="text-sm text-success">+12.3% vs last year</span>
                </div>
              </div>
              <DollarSign className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Net Profit</p>
                <p className="text-2xl font-bold text-foreground">${farmMetrics.netProfit.toLocaleString()}</p>
                <div className="flex items-center space-x-1 mt-1">
                  <TrendingUp className="h-4 w-4 text-success" />
                  <span className="text-sm text-success">{farmMetrics.profitMargin}% margin</span>
                </div>
              </div>
              <BarChart3 className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Profit per Acre</p>
                <p className="text-2xl font-bold text-foreground">${farmMetrics.profitPerAcre}</p>
                <div className="flex items-center space-x-1 mt-1">
                  <TrendingDown className="h-4 w-4 text-warning" />
                  <span className="text-sm text-warning">-3.2% vs target</span>
                </div>
              </div>
              <PieChart className="h-8 w-8 text-accent" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Yield Goal Progress</p>
                <p className="text-2xl font-bold text-foreground">{farmMetrics.yieldGoalProgress}%</p>
                <Progress value={farmMetrics.yieldGoalProgress} className="mt-2 h-2" />
              </div>
              <Target className="h-8 w-8 text-warning" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="performance" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="performance">Crop Performance</TabsTrigger>
          <TabsTrigger value="financial">Financial Trends</TabsTrigger>
          <TabsTrigger value="weather">Weather Impact</TabsTrigger>
          <TabsTrigger value="projections">Projections</TabsTrigger>
        </TabsList>

        <TabsContent value="performance" className="space-y-6">
          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Leaf className="h-5 w-5 text-primary" />
                <span>Crop Performance Analysis</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {cropPerformance.map((crop, index) => (
                  <div key={index} className="border border-border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-foreground">{crop.crop}</h3>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-muted-foreground">Risk Level:</span>
                        <span className={`font-semibold ${getRiskColor(crop.riskLevel)}`}>
                          {crop.riskLevel}
                        </span>
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Acres Planted</p>
                        <p className="text-xl font-bold text-foreground">{crop.acres}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Current Yield</p>
                        <p className="text-xl font-bold text-foreground">{crop.yield} bu/acre</p>
                        <div className="flex items-center space-x-1">
                          <span className="text-xs text-muted-foreground">Target: {crop.targetYield}</span>
                          {crop.yield >= crop.targetYield ? (
                            <TrendingUp className="h-3 w-3 text-success" />
                          ) : (
                            <TrendingDown className="h-3 w-3 text-warning" />
                          )}
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Total Profit</p>
                        <p className="text-xl font-bold text-success">${crop.profit.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Profit/Acre</p>
                        <p className="text-xl font-bold text-foreground">${crop.profitPerAcre}</p>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-muted-foreground">Yield Progress</span>
                        <span className="text-sm font-semibold">
                          {Math.round((crop.yield / crop.targetYield) * 100)}% of target
                        </span>
                      </div>
                      <Progress value={(crop.yield / crop.targetYield) * 100} className="h-2" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="financial" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            <Card className="shadow-medium">
              <CardHeader>
                <CardTitle>Monthly Financial Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {monthlyData.map((month, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg">
                      <span className="font-medium text-foreground">{month.month}</span>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">Revenue</p>
                          <p className="font-semibold text-success">${month.revenue.toLocaleString()}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">Costs</p>
                          <p className="font-semibold text-destructive">${month.costs.toLocaleString()}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">Profit</p>
                          <p className="font-semibold text-primary">${month.profit.toLocaleString()}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-medium">
              <CardHeader>
                <CardTitle>Cost Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { category: "Seeds & Planting", amount: 24500, percentage: 27 },
                    { category: "Fertilizers", amount: 21800, percentage: 24 },
                    { category: "Fuel & Equipment", amount: 18200, percentage: 20 },
                    { category: "Labor", amount: 13600, percentage: 15 },
                    { category: "Insurance", amount: 7800, percentage: 9 },
                    { category: "Other", amount: 3350, percentage: 5 }
                  ].map((item, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-foreground">{item.category}</span>
                        <div className="text-right">
                          <span className="font-semibold">${item.amount.toLocaleString()}</span>
                          <span className="text-sm text-muted-foreground ml-2">({item.percentage}%)</span>
                        </div>
                      </div>
                      <Progress value={item.percentage} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="weather" className="space-y-6">
          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5 text-warning" />
                <span>Weather Impact Analysis</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {weatherImpact.map((event, index) => (
                  <div key={index} className={`border-2 rounded-lg p-4 ${getSeverityColor(event.severity)}`}>
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-foreground">{event.event}</h3>
                        <p className="text-sm text-muted-foreground">{event.date}</p>
                      </div>
                      <span className="text-sm px-2 py-1 rounded-md bg-background">
                        {event.severity} Impact
                      </span>
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Affected Crop</p>
                        <p className="font-semibold text-foreground">{event.impactedCrop}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Acres Affected</p>
                        <p className="font-semibold text-foreground">{event.acresAffected} acres</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Financial Impact</p>
                        <p className={`font-semibold ${event.estimatedLoss > 0 ? 'text-destructive' : 'text-success'}`}>
                          {event.estimatedLoss > 0 ? '-' : '+'}${Math.abs(event.estimatedLoss).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="projections" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            <Card className="shadow-medium">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  <span>End of Season Projections</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border border-border rounded-lg">
                    <h3 className="font-semibold text-foreground mb-3">Conservative Estimate</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Total Revenue</span>
                        <span className="font-semibold">$165,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Total Costs</span>
                        <span className="font-semibold">$92,000</span>
                      </div>
                      <div className="flex justify-between text-lg">
                        <span className="text-foreground">Net Profit</span>
                        <span className="font-bold text-success">$73,000</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 border border-border rounded-lg bg-primary/5">
                    <h3 className="font-semibold text-foreground mb-3">Optimistic Estimate</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Total Revenue</span>
                        <span className="font-semibold">$180,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Total Costs</span>
                        <span className="font-semibold">$92,000</span>
                      </div>
                      <div className="flex justify-between text-lg">
                        <span className="text-foreground">Net Profit</span>
                        <span className="font-bold text-success">$88,000</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-medium">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Award className="h-5 w-5 text-success" />
                  <span>Performance Goals</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { goal: "Increase overall yield by 5%", progress: 78, target: "170 bu/acre avg" },
                    { goal: "Reduce input costs by 3%", progress: 45, target: "$85,000 total" },
                    { goal: "Improve profit margin to 45%", progress: 91, target: "Currently 40.8%" },
                    { goal: "Diversify crop rotation", progress: 33, target: "Add cover crops" }
                  ].map((goal, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-foreground">{goal.goal}</span>
                        <span className="text-sm text-muted-foreground">{goal.progress}%</span>
                      </div>
                      <Progress value={goal.progress} className="h-2" />
                      <p className="text-xs text-muted-foreground">{goal.target}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Analytics;