
import { CalendarDays, MapPin, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface EventCardProps {
  title: string;
  date: string;
  location: string;
  image: string;
  description: string;
  onGetTickets: () => void;
}

export const EventCard = ({
  title,
  date,
  location,
  image,
  description,
  onGetTickets,
}: EventCardProps) => {
  return (
    <Card className="event-card overflow-hidden h-full">
      <div className="aspect-[16/9] relative overflow-hidden">
        <img
          src={image || "/placeholder.svg"}
          alt={title}
          className="object-cover w-full h-full transition-transform hover:scale-105"
        />
      </div>
      <CardHeader>
        <CardTitle className="line-clamp-2 text-xl">{title}</CardTitle>
        <CardDescription className="flex items-center gap-2">
          <CalendarDays className="w-4 h-4" />
          {date}
        </CardDescription>
        <CardDescription className="flex items-center gap-2">
          <MapPin className="w-4 h-4" />
          {location}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground line-clamp-3">{description}</p>
      </CardContent>
      <CardFooter>
        <Button onClick={onGetTickets} className="w-full group">
          Get Tickets
          <ExternalLink className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </CardFooter>
    </Card>
  );
};
