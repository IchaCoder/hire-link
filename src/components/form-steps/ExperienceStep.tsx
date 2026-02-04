import React from 'react';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { FormData } from '../ApplicationForm';
import { X, Plus } from 'lucide-react';

interface ValidationErrors {
  [key: string]: string;
}

interface ExperienceStepProps {
  data: FormData;
  onChange: (data: FormData) => void;
  errors: ValidationErrors;
}

export default function ExperienceStep({ data, onChange, errors }: ExperienceStepProps) {
  const [skillInput, setSkillInput] = useState('');

  const addSkill = () => {
    const skill = skillInput.trim().toLowerCase();
    if (skill && !data.skills.includes(skill) && data.skills.length < 15) {
      onChange({ ...data, skills: [...data.skills, skill] });
      setSkillInput('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    onChange({
      ...data,
      skills: data.skills.filter((s) => s !== skillToRemove),
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSkill();
    }
  };

  return (
    <div className='space-y-4'>
      <div className='space-y-2'>
        <Label htmlFor='experience'>
          Years of Experience <span className='text-destructive'>*</span>
        </Label>
        <Input
          id='experience'
          type='number'
          min='0'
          max='100'
          placeholder='5'
          value={data.yearsOfExperience || ''}
          onChange={(e) =>
            onChange({
              ...data,
              yearsOfExperience: parseInt(e.target.value) || 0,
            })
          }
          className={errors.yearsOfExperience ? 'border-destructive' : ''}
        />
        {errors.yearsOfExperience && <p className='text-sm text-destructive'>{errors.yearsOfExperience}</p>}
      </div>

      <div className='space-y-2'>
        <Label htmlFor='skills'>
          Skills <span className='text-destructive'>*</span>
        </Label>
        <p className='text-xs text-muted-foreground'>Add up to 15 skills. Press Enter or click Add to add a skill.</p>
        <div className='flex gap-2'>
          <Input
            id='skills'
            placeholder='e.g., React, TypeScript, Node.js'
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            onKeyPress={handleKeyPress}
            className={errors.skills ? 'border-destructive' : ''}
          />
          <Button
            type='button'
            variant='outline'
            size='sm'
            onClick={addSkill}
            disabled={data.skills.length >= 15}
            className='gap-2'
          >
            <Plus className='h-4 w-4' />
            Add
          </Button>
        </div>
        {errors.skills && <p className='text-sm text-destructive'>{errors.skills}</p>}

        {data.skills.length > 0 && (
          <div className='flex flex-wrap gap-2 pt-2'>
            {data.skills.map((skill) => (
              <Badge key={skill} variant='secondary' className='gap-1 px-2 py-1'>
                {skill}
                <button onClick={() => removeSkill(skill)} className='ml-1 hover:opacity-70' type='button'>
                  <X className='h-3 w-3' />
                </button>
              </Badge>
            ))}
          </div>
        )}
      </div>

      <div className='space-y-2'>
        <Label htmlFor='portfolio'>Portfolio Link (Optional)</Label>
        <Input
          id='portfolio'
          type='url'
          placeholder='https://myportfolio.com'
          value={data.portfolioLink}
          onChange={(e) => onChange({ ...data, portfolioLink: e.target.value })}
          className={errors.portfolioLink ? 'border-destructive' : ''}
        />
        {errors.portfolioLink && <p className='text-sm text-destructive'>{errors.portfolioLink}</p>}
      </div>
    </div>
  );
}
