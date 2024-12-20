import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Upload, Mail, Phone, MapPin, Linkedin, Eye, EyeOff } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface BasicInfoProps {
  data: {
    name: string;
    title: string;
    bio: string;
    currentCompany: string;
    avatar?: string;
    email: string;
    phoneNumber?: string;
    location?: string;
    linkedin?: string;
    showEmail?: boolean;
    showPhone?: boolean;
    showLocation?: boolean;
  };
  onChange: (field: string, value: any) => void;
}

export function BasicInfo({ data, onChange }: BasicInfoProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center space-x-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={data.avatar} alt={data.name} />
              <AvatarFallback>{data.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <Button className="bg-[#52789e] hover:bg-[#6b9cc3] text-white">
              <Upload className="mr-2 h-4 w-4" />
              Change Photo
            </Button>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={data.name}
                onChange={(e) => onChange('name', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={data.title}
                onChange={(e) => onChange('title', e.target.value)}
                placeholder="e.g., Software Engineer"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="currentCompany">Current Company</Label>
              <Input
                id="currentCompany"
                value={data.currentCompany}
                onChange={(e) => onChange('currentCompany', e.target.value)}
                placeholder="e.g., Acme Corp"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                value={data.bio}
                onChange={(e) => onChange('bio', e.target.value)}
                placeholder="Tell us about yourself..."
                className="min-h-[150px]"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="flex items-center">
                <Mail className="h-4 w-4 mr-2" />
                Email
              </Label>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => onChange('showEmail', !data.showEmail)}
                className="text-muted-foreground"
              >
                {data.showEmail ? (
                  <><Eye className="h-4 w-4 mr-2" /> Public</>
                ) : (
                  <><EyeOff className="h-4 w-4 mr-2" /> Private</>
                )}
              </Button>
            </div>
            <Input
              value={data.email}
              onChange={(e) => onChange('email', e.target.value)}
              type="email"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="flex items-center">
                <Phone className="h-4 w-4 mr-2" />
                Phone Number
              </Label>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => onChange('showPhone', !data.showPhone)}
                className="text-muted-foreground"
              >
                {data.showPhone ? (
                  <><Eye className="h-4 w-4 mr-2" /> Public</>
                ) : (
                  <><EyeOff className="h-4 w-4 mr-2" /> Private</>
                )}
              </Button>
            </div>
            <Input
              value={data.phoneNumber}
              onChange={(e) => onChange('phoneNumber', e.target.value)}
              type="tel"
              placeholder="(555) 123-4567"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="flex items-center">
                <MapPin className="h-4 w-4 mr-2" />
                Location
              </Label>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => onChange('showLocation', !data.showLocation)}
                className="text-muted-foreground"
              >
                {data.showLocation ? (
                  <><Eye className="h-4 w-4 mr-2" /> Public</>
                ) : (
                  <><EyeOff className="h-4 w-4 mr-2" /> Private</>
                )}
              </Button>
            </div>
            <Input
              value={data.location}
              onChange={(e) => onChange('location', e.target.value)}
              placeholder="e.g., San Francisco, CA"
            />
          </div>

          <div className="space-y-2">
            <Label className="flex items-center">
              <Linkedin className="h-4 w-4 mr-2" />
              LinkedIn Profile
            </Label>
            <Input
              value={data.linkedin}
              onChange={(e) => onChange('linkedin', e.target.value)}
              type="url"
              placeholder="https://linkedin.com/in/username"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}