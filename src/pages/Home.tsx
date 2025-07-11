import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { 
  MapPin, 
  CloudRain, 
  TrendingUp, 
  Shield, 
  Smartphone, 
  BarChart3,
  Leaf,
  Users,
  Award
} from "lucide-react";
import heroImage from "@/assets/hero-farming.jpg";
import dashboardImage from "@/assets/dashboard-preview.jpg";

const Home = () => {
  const features = [
    {
      icon: CloudRain,
      title: "Weather Intelligence",
      description: "Real-time weather data and 7-day forecasts with historical pattern analysis to optimize planting decisions."
    },
    {
      icon: MapPin,
      title: "Location Analysis",
      description: "Comprehensive geographical and soil analysis using your exact location to match optimal crops."
    },
    {
      icon: TrendingUp,
      title: "Profit Optimization",
      description: "AI-powered recommendations that factor in market prices, demand, and risk assessment for maximum ROI."
    },
    {
      icon: Shield,
      title: "Risk Management",
      description: "Advanced weather risk assessment and alerts to protect your crops from potential losses."
    },
    {
      icon: BarChart3,
      title: "Analytics Dashboard",
      description: "Track performance, compare yields, and monitor profitability with comprehensive farm analytics."
    },
    {
      icon: Smartphone,
      title: "Mobile Ready",
      description: "Access your farming insights anywhere with our fully responsive mobile-friendly interface."
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Corn & Soy Farmer",
      quote: "CropCompass helped me increase my profits by 23% last season by recommending the perfect crop rotation based on weather patterns.",
      rating: 5
    },
    {
      name: "Miguel Rodriguez",
      role: "Vegetable Grower",
      quote: "The weather alerts saved my tomato crop from unexpected frost. This app pays for itself with just one prevented loss.",
      rating: 5
    },
    {
      name: "David Chen",
      role: "Organic Farmer",
      quote: "Finally, a farming tool that speaks my language. Simple, powerful, and incredibly accurate recommendations.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-accent/60"></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Smart Farming for
              <span className="block text-accent-light">Maximum Profits</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
              Make data-driven crop decisions with AI-powered weather analysis, 
              geographical insights, and market intelligence to minimize losses and maximize your harvest.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/weather">
                <Button variant="hero" size="lg" className="text-lg px-8 py-6">
                  Start Analysis
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="text-lg px-8 py-6 bg-white/10 border-white/30 text-white hover:bg-white/20">
                Watch Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">How CropCompass Works</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Three simple steps to transform your farming decisions with AI-powered insights
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="text-center shadow-medium border-0 bg-gradient-earth">
              <CardHeader>
                <div className="mx-auto bg-primary w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  <MapPin className="h-8 w-8 text-primary-foreground" />
                </div>
                <CardTitle className="text-2xl">1. Enter Location</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Input your farm location for instant geographical and soil analysis
                </p>
              </CardContent>
            </Card>

            <Card className="text-center shadow-medium border-0 bg-gradient-sky">
              <CardHeader>
                <div className="mx-auto bg-accent w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  <CloudRain className="h-8 w-8 text-accent-foreground" />
                </div>
                <CardTitle className="text-2xl">2. AI Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Our AI analyzes weather patterns, soil conditions, and market data
                </p>
              </CardContent>
            </Card>

            <Card className="text-center shadow-medium border-0 bg-gradient-growth">
              <CardHeader>
                <div className="mx-auto bg-success w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  <TrendingUp className="h-8 w-8 text-success-foreground" />
                </div>
                <CardTitle className="text-2xl">3. Get Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Receive personalized crop recommendations for maximum profitability
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">Powerful Features</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to make informed farming decisions in one comprehensive platform
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="shadow-soft hover:shadow-medium transition-smooth">
                <CardHeader>
                  <feature.icon className="h-10 w-10 text-primary mb-4" />
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Dashboard Preview */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-foreground mb-6">
                Comprehensive Farm Analytics
              </h2>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Monitor your farm's performance with real-time dashboards, weather tracking, 
                and profitability analysis. Make informed decisions backed by data.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-center space-x-3">
                  <div className="bg-success w-6 h-6 rounded-full flex items-center justify-center">
                    <Leaf className="h-4 w-4 text-success-foreground" />
                  </div>
                  <span className="text-foreground">Real-time crop monitoring</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="bg-accent w-6 h-6 rounded-full flex items-center justify-center">
                    <BarChart3 className="h-4 w-4 text-accent-foreground" />
                  </div>
                  <span className="text-foreground">Detailed profit/loss tracking</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="bg-warning w-6 h-6 rounded-full flex items-center justify-center">
                    <Shield className="h-4 w-4 text-warning-foreground" />
                  </div>
                  <span className="text-foreground">Weather risk assessment</span>
                </div>
              </div>
              <Link to="/analytics">
                <Button variant="default" size="lg">
                  View Analytics Dashboard
                </Button>
              </Link>
            </div>
            <div className="relative">
              <img 
                src={dashboardImage} 
                alt="Analytics Dashboard" 
                className="rounded-lg shadow-strong"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent rounded-lg"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-primary/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">Trusted by Farmers</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              See how CropCompass is helping farmers across the country increase their profits
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="shadow-medium border-0">
                <CardHeader>
                  <div className="flex space-x-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Award key={i} className="h-5 w-5 text-warning fill-current" />
                    ))}
                  </div>
                  <p className="text-foreground italic">"{testimonial.quote}"</p>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-3">
                    <div className="bg-primary w-10 h-10 rounded-full flex items-center justify-center">
                      <Users className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your Farm?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of farmers who are already using CropCompass to make smarter decisions and increase their profits.
          </p>
          <Link to="/weather">
            <Button variant="outline" size="lg" className="text-lg px-8 py-6 bg-white text-primary hover:bg-white/90">
              Get Started Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;