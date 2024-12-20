import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../../../ui/dialog";
import { Button } from "../../../../ui/button";
import { Input } from "../../../../ui/input";
import { Label } from "../../../../ui/label";
import { ScrollArea } from "../../../../ui/scroll-area";
import { Badge } from "../../../../ui/badge";
import { SECTION_OPTIONS, SECTION_PLACEHOLDERS } from './constants';
import type { Section } from './types';
import { toast } from 'react-hot-toast';

interface AddSectionDialogProps {
  isOpen: boolean;
  onClose: () => void;
  currentSections: Section[];
  onAddSection: (section: Section) => void;
}

export function AddSectionDialog({
  isOpen,
  onClose,
  currentSections,
  onAddSection
}: AddSectionDialogProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [customTitle, setCustomTitle] = useState('');

  const filteredOptions = SECTION_OPTIONS.filter(option =>
    option.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    !currentSections.some(section => section.title === option.title)
  );

  const handleAddSection = (title: string) => {
    if (currentSections.length >= 5) {
      toast.error('You can only add up to 5 additional sections');
      return;
    }

    if (currentSections.some(section => section.title === title)) {
      toast.error('This section already exists');
      return;
    }

    onAddSection({
      title,
      content: '',
      description: SECTION_PLACEHOLDERS[title]
    });
    
    // Close dialog immediately after adding section
    onClose();
    
    // Reset form state
    setSearchTerm('');
    setCustomTitle('');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add Additional Section</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Search Sections</Label>
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search for a section..."
            />
          </div>

          <ScrollArea className="h-[300px] w-full rounded-md border p-4">
            <div className="space-y-4">
              {filteredOptions.map((option) => (
                <div key={option.title} className="space-y-2">
                  <Badge
                    variant="outline"
                    className="cursor-pointer hover:bg-accent px-3 py-1 text-sm font-medium rounded-full"
                    onClick={() => handleAddSection(option.title)}
                  >
                    {option.title}
                  </Badge>
                  <p className="text-sm text-muted-foreground pl-2">
                    {option.description}
                  </p>
                </div>
              ))}
            </div>
          </ScrollArea>

          <div className="space-y-2">
            <Label>Custom Section Title</Label>
            <div className="flex space-x-2">
              <Input
                value={customTitle}
                onChange={(e) => setCustomTitle(e.target.value)}
                placeholder="Enter custom section title..."
              />
              <Button
                type="button"
                onClick={() => {
                  if (customTitle.trim()) {
                    handleAddSection(customTitle.trim());
                  }
                }}
                className="bg-[#52789e] hover:bg-[#6b9cc3] text-white"
                disabled={!customTitle.trim()}
              >
                Add
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}