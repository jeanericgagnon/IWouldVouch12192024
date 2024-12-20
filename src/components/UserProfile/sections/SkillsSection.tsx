import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../../ui/card";
import { SkillsManager } from '../SkillsManager';
import type { Skill } from '../SkillsManager/types';

interface SkillsSectionProps {
  skills: Skill[];
  onSkillsChange: (skills: Skill[]) => void;
}

export function SkillsSection({ skills, onSkillsChange }: SkillsSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Skills</CardTitle>
        <CardDescription>Add and manage your professional skills</CardDescription>
      </CardHeader>
      <CardContent>
        <SkillsManager
          skills={skills}
          onSkillsChange={onSkillsChange}
        />
      </CardContent>
    </Card>
  );
}