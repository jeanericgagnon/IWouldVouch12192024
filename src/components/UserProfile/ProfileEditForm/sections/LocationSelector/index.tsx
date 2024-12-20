import { useState } from 'react';
import { Button } from "../../../../ui/button";
import { Label } from "../../../../ui/label";
import { LocationInput } from './LocationInput';
import { LocationList } from './LocationList';
import { X } from 'lucide-react';
import { toast } from 'react-hot-toast';
import type { Location } from './types';

interface LocationSelectorProps {
  workStyle: 'remote' | 'hybrid' | 'inPerson';
  locations: Location[];
  onLocationsChange: (locations: Location[]) => void;
}

export function LocationSelector({ 
  workStyle, 
  locations, 
  onLocationsChange 
}: LocationSelectorProps) {
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleAddLocation = () => {
    if (locations.length >= 3) {
      setError('Maximum of 3 locations allowed');
      return;
    }

    if (!inputValue.trim()) {
      setError('Please enter a location');
      return;
    }

    const [city, state, country] = inputValue.split(',').map(s => s.trim());
    
    if (!city || !state || !country) {
      setError('Please enter location in format: City, State, Country');
      return;
    }

    const newLocation = {
      city,
      state,
      country,
      formatted: inputValue.trim()
    };

    if (locations.some(loc => loc.formatted.toLowerCase() === newLocation.formatted.toLowerCase())) {
      setError('This location has already been added');
      return;
    }

    onLocationsChange([...locations, newLocation]);
    setInputValue('');
    setError(null);
  };

  const handleRemoveLocation = (index: number) => {
    const newLocations = [...locations];
    newLocations.splice(index, 1);
    onLocationsChange(newLocations);
    setError(null);
  };

  const handleClearAll = () => {
    onLocationsChange([]);
    setInputValue('');
    setError(null);
  };

  if (workStyle === 'remote') {
    return (
      <div className="text-sm text-muted-foreground">
        Available to work from anywhere
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Label className="text-base">
          Preferred Locations ({locations.length}/3)
        </Label>
        {locations.length > 0 && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleClearAll}
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4 mr-2" />
            Clear All
          </Button>
        )}
      </div>

      {workStyle === 'hybrid' && locations.length === 0 && (
        <p className="text-sm text-muted-foreground">
          Please specify at least one location for hybrid work
        </p>
      )}

      <LocationList 
        locations={locations}
        onRemove={handleRemoveLocation}
      />

      {locations.length < 3 && (
        <LocationInput
          value={inputValue}
          onChange={setInputValue}
          onAdd={handleAddLocation}
          error={error}
        />
      )}
    </div>
  );
}