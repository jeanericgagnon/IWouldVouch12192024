import { Card, CardContent } from "../../ui/card";
import { Badge } from "../../ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Button } from "../../ui/button";
import { Mail, Phone, MapPin, Briefcase, Linkedin } from 'lucide-react';
import type { User } from '../../../types/user';

interface ProfileOverviewProps {
  user: User;
  isOwner?: boolean;
  onEditProfile?: () => void;
}

export function ProfileOverview({ user, isOwner, onEditProfile }: ProfileOverviewProps) {
  return (
    <div className="sticky top-[80px]">
      <Card>
        <CardContent className="p-6 space-y-6">
          <div className="flex flex-col items-center text-center">
            <Avatar className="w-24 h-24">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            
            <div className="space-y-2 mt-4">
              <h1 className="text-2xl font-bold">{user.name}</h1>
              {user.title && <p className="text-lg text-muted-foreground">{user.title}</p>}
              {user.availability?.isAvailable && (
                <Badge 
                  className="bg-green-500 text-white animate-pulse"
                  title="Open to opportunities"
                >
                  {user.availability.status === 'actively-looking' ? '🔍 Actively Looking' :
                   user.availability.status === 'open' ? '👋 Open to Opportunities' :
                   '🤝 Casually Looking'}
                </Badge>
              )}
            </div>

            <div className="flex flex-col gap-2 w-full mt-6">
              {user.linkedin && (
                <Button
                  className="w-full bg-[#0077b5] hover:bg-[#0077b5]/90"
                  onClick={() => window.open(user.linkedin, '_blank')}
                >
                  <Linkedin className="h-4 w-4 mr-2" />
                  LinkedIn
                </Button>
              )}
              {isOwner && (
                <Button variant="outline" onClick={onEditProfile} className="w-full">
                  Edit Profile
                </Button>
              )}
            </div>

            <div className="w-full space-y-4 mt-6 border-t pt-6">
              {user.currentCompany && (
                <div className="flex items-center text-sm text-muted-foreground">
                  <Briefcase className="h-4 w-4 mr-2" />
                  <span>{user.currentCompany}</span>
                </div>
              )}
              {user.showLocation && user.location && (
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span>{user.location}</span>
                </div>
              )}
              {user.showEmail && user.email && (
                <div className="flex items-center text-sm text-muted-foreground">
                  <Mail className="h-4 w-4 mr-2" />
                  <span>{user.email}</span>
                </div>
              )}
              {user.showPhone && user.phoneNumber && (
                <div className="flex items-center text-sm text-muted-foreground">
                  <Phone className="h-4 w-4 mr-2" />
                  <span>{user.phoneNumber}</span>
                </div>
              )}
            </div>

            {user.bio && (
              <div className="w-full mt-6 border-t pt-6">
                <p className="text-sm text-muted-foreground whitespace-pre-wrap">{user.bio}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}