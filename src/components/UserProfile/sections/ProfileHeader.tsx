import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Button } from "../../ui/button";
import { Badge } from "../../ui/badge";
import { Card, CardContent, CardHeader } from "../../ui/card";
import { Mail, Phone, Linkedin, Briefcase, MapPin } from 'lucide-react';
import { User } from '../../../types/user';

interface ProfileHeaderSectionProps {
  user: User;
  isOwner?: boolean;
  onEditProfile?: () => void;
}

export function ProfileHeader({ user, isOwner, onEditProfile }: ProfileHeaderSectionProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16 ring-2 ring-primary/10">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-xl font-semibold truncate">{user.name}</h1>
              {user.availability?.isAvailable && (
                <Badge 
                  className="bg-green-500/90 text-white text-xs"
                  title="Open to opportunities"
                >
                  {user.availability.status === 'actively-looking' ? '🔍 Actively Looking' :
                   user.availability.status === 'open' ? '👋 Open to Opportunities' :
                   '🤝 Casually Looking'}
                </Badge>
              )}
            </div>
            {user.title && (
              <p className="text-sm text-muted-foreground mt-0.5">{user.title}</p>
            )}
            
            <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
              {user.currentCompany && (
                <div className="flex items-center text-xs text-muted-foreground">
                  <Briefcase className="h-3 w-3 mr-1" />
                  <span>{user.currentCompany}</span>
                </div>
              )}
              {user.location && (
                <div className="flex items-center text-xs text-muted-foreground">
                  <MapPin className="h-3 w-3 mr-1" />
                  <span>{user.location}</span>
                </div>
              )}
              {user.showEmail && user.email && (
                <div className="flex items-center text-xs text-muted-foreground">
                  <Mail className="h-3 w-3 mr-1" />
                  <span>{user.email}</span>
                </div>
              )}
              {user.showPhone && user.phoneNumber && (
                <div className="flex items-center text-xs text-muted-foreground">
                  <Phone className="h-3 w-3 mr-1" />
                  <span>{user.phoneNumber}</span>
                </div>
              )}
            </div>
          </div>
          <div className="flex gap-2">
            {user.linkedin && (
              <Button
                size="sm"
                className="bg-[#0077b5] hover:bg-[#0077b5]/90"
                onClick={() => window.open(user.linkedin, '_blank')}
              >
                <Linkedin className="h-4 w-4 mr-2" />
                LinkedIn
              </Button>
            )}
            {isOwner && (
              <Button 
                size="sm"
                variant="outline"
                onClick={onEditProfile}
              >
                Edit Profile
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {user.bio && (
          <p className="text-sm text-muted-foreground line-clamp-2">{user.bio}</p>
        )}
      </CardContent>
    </Card>
  );
}