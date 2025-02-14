
import { useState } from "react";
import { EventCard } from "@/components/EventCard";
import { EmailModal } from "@/components/EmailModal";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Search } from "lucide-react";

// Temporary mock data - will be replaced with actual scraped data
const mockEvents = [
  {
    id: "1",
    title: "Sydney Opera House Concert Series",
    date: "2024-03-15",
    location: "Sydney Opera House",
    image: "/placeholder.svg",
    description: "An evening of classical music featuring Sydney Symphony Orchestra.",
    ticketUrl: "https://example.com",
  },
  {
    id: "2",
    title: "Vivid Sydney Light Festival",
    date: "2024-05-20",
    location: "Circular Quay",
    image: "/placeholder.svg",
    description: "Annual light, music and ideas festival illuminating Sydney.",
    ticketUrl: "https://example.com",
  },
  {
    id: "3",
    title: "Sydney Food Festival",
    date: "2024-04-10",
    location: "Darling Harbour",
    image: "/placeholder.svg",
    description: "Celebrate Sydney's diverse culinary scene with top chefs.",
    ticketUrl: "https://example.com",
  },
];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEvent, setSelectedEvent] = useState<(typeof mockEvents)[0] | null>(
    null
  );
  const { toast } = useToast();

  const handleGetTickets = (event: (typeof mockEvents)[0]) => {
    setSelectedEvent(event);
  };

  const handleEmailSubmit = (email: string) => {
    // Here we'll add email collection logic
    toast({
      title: "Success!",
      description: "You'll be redirected to the ticket page.",
    });
    
    // Redirect to original ticket URL
    if (selectedEvent) {
      window.open(selectedEvent.ticketUrl, "_blank");
    }
    
    setSelectedEvent(null);
  };

  const filteredEvents = mockEvents.filter((event) =>
    event.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[40vh] bg-gradient-to-r from-primary/90 to-primary flex items-center justify-center text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 slide-up">
            Discover Sydney Events
          </h1>
          <p className="text-lg md:text-xl opacity-90 mb-8 slide-up">
            Find and book the best events happening in Sydney
          </p>
          <div className="relative max-w-xl mx-auto fade-in">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="search"
              placeholder="Search events..."
              className="w-full pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/60"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <EventCard
              key={event.id}
              title={event.title}
              date={event.date}
              location={event.location}
              image={event.image}
              description={event.description}
              onGetTickets={() => handleGetTickets(event)}
            />
          ))}
        </div>
      </section>

      <EmailModal
        isOpen={!!selectedEvent}
        onClose={() => setSelectedEvent(null)}
        onSubmit={handleEmailSubmit}
        eventTitle={selectedEvent?.title || ""}
      />
    </div>
  );
};

export default Index;
