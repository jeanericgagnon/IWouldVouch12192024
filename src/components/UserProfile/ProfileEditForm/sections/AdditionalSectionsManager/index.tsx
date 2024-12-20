import { useState } from 'react';
import { Button } from "../../../../ui/button";
import { SectionsList } from './SectionsList';
import { AddSectionDialog } from './AddSectionDialog';
import type { Section } from './types';
import { Card, CardContent, CardHeader, CardTitle } from "../../../../ui/card";

interface AdditionalSectionsManagerProps {
  sections: Section[];
  onSectionsChange: (sections: Section[]) => void;
}

export function AdditionalSectionsManager({ sections, onSectionsChange }: AdditionalSectionsManagerProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleOpenDialog = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDialogOpen(true);
  };

  const handleRemoveSection = (sectionToRemove: Section) => {
    onSectionsChange(sections.filter(section => section.title !== sectionToRemove.title));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Additional Sections</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <SectionsList
          sections={sections}
          onRemoveSection={handleRemoveSection}
          onUpdateSection={(updatedSection) => {
            onSectionsChange(sections.map(section =>
              section.title === updatedSection.title ? updatedSection : section
            ));
          }}
        />
        
        {sections.length < 5 && (
          <Button
            type="button"
            className="w-full bg-[#52789e] hover:bg-[#6b9cc3] text-white"
            onClick={handleOpenDialog}
          >
            Add Section
          </Button>
        )}

        <AddSectionDialog
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          currentSections={sections}
          onAddSection={(newSection) => {
            onSectionsChange([...sections, newSection]);
          }}
        />
      </CardContent>
    </Card>
  );
}