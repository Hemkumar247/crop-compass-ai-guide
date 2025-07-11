import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar as CalendarIcon, Clock, MapPin, AlertTriangle, CheckCircle, Sprout, Tractor } from "lucide-react";

interface FarmEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  type: 'planting' | 'harvest' | 'maintenance' | 'weather' | 'market';
  priority: 'low' | 'medium' | 'high';
  crop?: string;
  location?: string;
  description: string;
  completed?: boolean;
}

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // Mock farm events
  const farmEvents: FarmEvent[] = [
    {
      id: "1",
      title: "Plant Corn - North Field",
      date: "2024-04-15",
      time: "07:00 AM",
      type: "planting",
      priority: "high",
      crop: "Corn",
      location: "North Field (80 acres)",
      description: "Begin corn planting when soil temperature reaches 50°F consistently",
      completed: true
    },
    {
      id: "2",
      title: "Soil Testing - South Field",
      date: "2024-07-20",
      time: "09:00 AM",
      type: "maintenance",
      priority: "medium",
      location: "South Field",
      description: "Test soil pH and nutrient levels before fertilizer application"
    },
    {
      id: "3",
      title: "Soybean Harvest",
      date: "2024-09-25",
      time: "06:00 AM",
      type: "harvest",
      priority: "high",
      crop: "Soybeans",
      location: "East Field (120 acres)",
      description: "Begin soybean harvest when moisture content is 13-15%"
    },
    {
      id: "4",
      title: "Equipment Maintenance",
      date: "2024-07-22",
      time: "10:00 AM",
      type: "maintenance",
      priority: "medium",
      description: "Service combine harvester and check belts, filters, and fluids"
    },
    {
      id: "5",
      title: "Weather Alert - Frost Warning",
      date: "2024-07-25",
      time: "11:00 PM",
      type: "weather",
      priority: "high",
      description: "Temperatures may drop to 32°F. Protect sensitive crops if needed"
    },
    {
      id: "6",
      title: "Fertilizer Application",
      date: "2024-07-18",
      time: "08:00 AM",
      type: "maintenance",
      priority: "medium",
      crop: "Corn",
      location: "North Field",
      description: "Apply nitrogen fertilizer at V6 growth stage"
    },
    {
      id: "7",
      title: "Market Price Review",
      date: "2024-07-19",
      time: "02:00 PM",
      type: "market",
      priority: "low",
      description: "Review corn and soybean futures prices for fall contracts"
    }
  ];

  // Filter events for current month/year
  const currentMonthEvents = farmEvents.filter(event => {
    const eventDate = new Date(event.date);
    return eventDate.getMonth() === currentMonth && eventDate.getFullYear() === currentYear;
  });

  // Generate calendar days
  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay();
  };

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
    const days = [];

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-24 p-1"></div>);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const dayEvents = farmEvents.filter(event => event.date === dateStr);
      const isToday = new Date().toDateString() === new Date(currentYear, currentMonth, day).toDateString();

      days.push(
        <div
          key={day}
          className={`h-24 p-1 border border-border cursor-pointer hover:bg-accent/50 transition-smooth ${
            isToday ? 'bg-primary/10 border-primary' : ''
          }`}
          onClick={() => setSelectedDate(new Date(currentYear, currentMonth, day))}
        >
          <div className={`text-sm font-medium ${isToday ? 'text-primary' : 'text-foreground'}`}>
            {day}
          </div>
          <div className="mt-1 space-y-1">
            {dayEvents.slice(0, 2).map(event => (
              <div
                key={event.id}
                className={`text-xs px-1 py-0.5 rounded text-white truncate ${
                  event.type === 'planting' ? 'bg-success' :
                  event.type === 'harvest' ? 'bg-warning' :
                  event.type === 'maintenance' ? 'bg-primary' :
                  event.type === 'weather' ? 'bg-destructive' :
                  'bg-accent'
                }`}
              >
                {event.title}
              </div>
            ))}
            {dayEvents.length > 2 && (
              <div className="text-xs text-muted-foreground">
                +{dayEvents.length - 2} more
              </div>
            )}
          </div>
        </div>
      );
    }

    return days;
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'planting':
        return <Sprout className="h-4 w-4" />;
      case 'harvest':
        return <Tractor className="h-4 w-4" />;
      case 'maintenance':
        return <Clock className="h-4 w-4" />;
      case 'weather':
        return <AlertTriangle className="h-4 w-4" />;
      case 'market':
        return <CalendarIcon className="h-4 w-4" />;
      default:
        return <CalendarIcon className="h-4 w-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-destructive text-destructive-foreground';
      case 'medium':
        return 'bg-warning text-warning-foreground';
      case 'low':
        return 'bg-success text-success-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'planting':
        return 'border-success bg-success/10';
      case 'harvest':
        return 'border-warning bg-warning/10';
      case 'maintenance':
        return 'border-primary bg-primary/10';
      case 'weather':
        return 'border-destructive bg-destructive/10';
      case 'market':
        return 'border-accent bg-accent/10';
      default:
        return 'border-muted bg-muted/10';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-4">Farm Calendar</h1>
        <p className="text-xl text-muted-foreground">
          Track planting schedules, harvesting times, and important farm activities
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Calendar View */}
        <div className="lg:col-span-2">
          <Card className="shadow-medium">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  <CalendarIcon className="h-5 w-5" />
                  <span>{months[currentMonth]} {currentYear}</span>
                </CardTitle>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      if (currentMonth === 0) {
                        setCurrentMonth(11);
                        setCurrentYear(currentYear - 1);
                      } else {
                        setCurrentMonth(currentMonth - 1);
                      }
                    }}
                  >
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const today = new Date();
                      setCurrentMonth(today.getMonth());
                      setCurrentYear(today.getFullYear());
                    }}
                  >
                    Today
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      if (currentMonth === 11) {
                        setCurrentMonth(0);
                        setCurrentYear(currentYear + 1);
                      } else {
                        setCurrentMonth(currentMonth + 1);
                      }
                    }}
                  >
                    Next
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* Calendar Header */}
              <div className="grid grid-cols-7 gap-0 mb-2">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} className="h-8 flex items-center justify-center text-sm font-medium text-muted-foreground border-b border-border">
                    {day}
                  </div>
                ))}
              </div>
              
              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-0 border border-border">
                {renderCalendarDays()}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Events Sidebar */}
        <div className="space-y-6">
          {/* Upcoming Events */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle>Upcoming Events</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {currentMonthEvents
                  .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                  .slice(0, 5)
                  .map(event => (
                    <div key={event.id} className={`border-2 rounded-lg p-3 ${getTypeColor(event.type)}`}>
                      <div className="flex items-start space-x-2">
                        <div className="mt-1">
                          {getEventIcon(event.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <h4 className="font-semibold text-foreground text-sm leading-tight">
                              {event.title}
                            </h4>
                            {event.completed && (
                              <CheckCircle className="h-4 w-4 text-success flex-shrink-0 ml-1" />
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">
                            {new Date(event.date).toLocaleDateString()} at {event.time}
                          </p>
                          {event.location && (
                            <div className="flex items-center space-x-1 mt-1">
                              <MapPin className="h-3 w-3 text-muted-foreground" />
                              <span className="text-xs text-muted-foreground">{event.location}</span>
                            </div>
                          )}
                          <div className="flex items-center justify-between mt-2">
                            <Badge className={`text-xs ${getPriorityColor(event.priority)}`}>
                              {event.priority.charAt(0).toUpperCase() + event.priority.slice(1)}
                            </Badge>
                            {event.crop && (
                              <span className="text-xs text-muted-foreground">{event.crop}</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>

          {/* Event Types Legend */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle>Event Types</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {[
                  { type: 'planting', label: 'Planting', color: 'bg-success' },
                  { type: 'harvest', label: 'Harvest', color: 'bg-warning' },
                  { type: 'maintenance', label: 'Maintenance', color: 'bg-primary' },
                  { type: 'weather', label: 'Weather Alert', color: 'bg-destructive' },
                  { type: 'market', label: 'Market Event', color: 'bg-accent' }
                ].map(item => (
                  <div key={item.type} className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded ${item.color}`}></div>
                    <span className="text-sm text-foreground">{item.label}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle>This Month</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Total Events</span>
                  <span className="font-semibold text-foreground">{currentMonthEvents.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Completed</span>
                  <span className="font-semibold text-success">
                    {currentMonthEvents.filter(e => e.completed).length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">High Priority</span>
                  <span className="font-semibold text-destructive">
                    {currentMonthEvents.filter(e => e.priority === 'high').length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Weather Alerts</span>
                  <span className="font-semibold text-warning">
                    {currentMonthEvents.filter(e => e.type === 'weather').length}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Calendar;