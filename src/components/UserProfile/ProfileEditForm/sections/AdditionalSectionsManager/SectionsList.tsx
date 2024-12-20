import { Card, CardContent, CardHeader } from "../../../../ui/card";
import { Button } from "../../../../ui/button";
import { Textarea } from "../../../../ui/textarea";
import { X, Link } from 'lucide-react';
import { Input } from "../../../../ui/input";
import { SECTION_PLACEHOLDERS } from './constants';
import type { Section } from './types';

interface SectionsListProps {
  sections: Section[];
  onRemoveSection: (section: Section) => void;
  onUpdateSection: (section: Section) => void;
}

export function SectionsList({ sections, onRemoveSection, onUpdateSection }: SectionsListProps) {
  return (
    <div className="space-y-4">
      {sections.map((section) => (
        <Card key={section.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h4 className="text-sm font-semibold">{section.title}</h4>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => onRemoveSection(section)}
            >
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            {section.title === 'Personal Website' ? (
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Link className="h-4 w-4 text-muted-foreground" />
                  <Input
                    value={section.content}
                    onChange={(e) => onUpdateSection({ ...section, content: e.target.value })}
                    placeholder="https://your-website.com"
                    type="url"
                  />
                </div>
                <Textarea
                  value={section.description || ''}
                  onChange={(e) => onUpdateSection({ 
                    ...section, 
                    description: e.target.value 
                  })}
                  placeholder="Add a brief description of your website..."
                  className="min-h-[100px]"
                />
              </div>
            ) : (
              <Textarea
                value={section.content}
                onChange={(e) => onUpdateSection({ ...section, content: e.target.value })}
                placeholder={SECTION_PLACEHOLDERS[section.title] || `Provide details about ${section.title.toLowerCase()}...`}
                className="min-h-[150px]"
              />
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}