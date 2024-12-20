import { Button } from "../../../../ui/button";
import { Badge } from "../../../../ui/badge";
import { MapPin, X } from 'lucide-react';
import type { Location } from './types';

interface LocationListProps {
  locations: Location[];
  onRemove: (index: number) => void;
}

export function LocationList({ locations, onRemove }: LocationListProps) {
  if (locations.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-2">
      {locations.map((location, index) => (
        <Badge
          key={index}
          variant="secondary"
          className="pl-2 pr-1 py-1 flex items-center space-x-1"
        >
          <MapPin className="h-3 w-3 mr-1" />
          <span>{location.formatted}</span>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => onRemove(index)}
            className="h-4 w-4 p-0 hover:bg-transparent"
          >
            <X className="h-3 w-3" />
          </Button>
        </Badge>
      ))}
    </div>
  );
}