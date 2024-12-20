import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Badge } from "../../ui/badge";
import { Briefcase, MapPin } from 'lucide-react';
import type { User } from '../../../types/user';

interface JobSearchSectionProps {
  user: User;
}

export function JobSearchSection({ user }: JobSearchSectionProps) {
  if (!user.availability || user.availability.status === 'not-looking') {
    return null;
  }

  return (
    <Card className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-800">
      <CardHeader>
        <CardTitle>Job Search Preferences</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Status Badge */}
        <div>
          <Badge className={`
            ${user.availability.status === 'actively-looking' ? 'bg-green-500' :
              user.availability.status === 'open' ? 'bg-blue-500' :
              'bg-yellow-500'} text-white px-3 py-1
          `}>
            {user.availability.status === 'actively-looking' ? '🔍 Actively Looking' :
             user.availability.status === 'open' ? '👋 Open to Opportunities' :
             '🤝 Casually Looking'}
          </Badge>
        </div>

        {/* Pursuing Roles */}
        {user.availability.positionsInterestedIn && user.availability.positionsInterestedIn.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Pursuing Roles</h3>
            <div className="flex flex-wrap gap-2">
              {user.availability.positionsInterestedIn.map((position, index) => (
                <Badge key={index} variant="outline" className="flex items-center gap-1">
                  <Briefcase className="h-3 w-3" />
                  {position}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Work Style Preferences */}
        {user.availability.workStyles && user.availability.workStyles.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Work Style Preferences</h3>
            <div className="flex flex-wrap gap-2">
              {user.availability.workStyles.map((style, index) => (
                <Badge key={index} variant="outline">
                  {style === 'inPerson' ? 'In Person' :
                   style === 'hybrid' ? 'Hybrid' : 'Remote'}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Preferred Locations */}
        {user.availability.locations && user.availability.locations.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Preferred Locations</h3>
            <div className="flex flex-wrap gap-2">
              {user.availability.locations.map((location, index) => (
                <Badge key={index} variant="outline" className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {location.formatted}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}