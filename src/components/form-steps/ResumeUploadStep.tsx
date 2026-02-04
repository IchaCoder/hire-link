import React from 'react';

import { useRef, useState } from 'react';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import type { FormData } from '../ApplicationForm';
import { Upload, FileText, X } from 'lucide-react';

interface ValidationErrors {
  [key: string]: string;
}

interface ResumeUploadStepProps {
  data: FormData;
  onChange: (data: FormData) => void;
  errors: ValidationErrors;
}

const ALLOWED_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export default function ResumeUploadStep({ data, onChange, errors }: ResumeUploadStepProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadError, setUploadError] = useState<string>('');

  const handleFileSelect = (file: File) => {
    setUploadError('');

    // Validate file type
    if (!ALLOWED_TYPES.includes(file.type)) {
      setUploadError('Only PDF and DOC files are allowed');
      return;
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      setUploadError('File size must be less than 5MB');
      return;
    }

    // Read file as base64
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      onChange({
        ...data,
        resumeFile: content,
        resumeFileName: file.name,
      });
    };
    reader.onerror = () => {
      setUploadError('Failed to read file');
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFileSelect(e.target.files[0]);
    }
  };

  const clearFile = () => {
    onChange({
      ...data,
      resumeFile: '',
      resumeFileName: '',
    });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className='space-y-4'>
      <div className='space-y-2'>
        <Label>
          Upload Resume <span className='text-destructive'>*</span>
        </Label>
        <p className='text-xs text-muted-foreground'>Upload a PDF or DOC file (Max 5MB)</p>
      </div>

      {data.resumeFile ? (
        <div className='space-y-3'>
          <div className='flex items-center gap-3 p-4 rounded-lg border border-border bg-card'>
            <FileText className='h-8 w-8 text-primary flex-shrink-0' />
            <div className='flex-1 min-w-0'>
              <p className='font-medium text-foreground truncate'>{data.resumeFileName}</p>
              <p className='text-xs text-muted-foreground'>File uploaded successfully</p>
            </div>
            <Button type='button' variant='ghost' size='sm' onClick={clearFile} className='flex-shrink-0'>
              <X className='h-4 w-4' />
            </Button>
          </div>
          <Button type='button' variant='outline' onClick={() => fileInputRef.current?.click()} className='w-full'>
            Choose Different File
          </Button>
        </div>
      ) : (
        <div
          onDrop={handleDrop}
          onDragOver={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
            errors.resume ? 'border-destructive bg-destructive/5' : 'border-border hover:border-primary'
          }`}
          onClick={() => fileInputRef.current?.click()}
        >
          <div className='flex flex-col items-center gap-2'>
            <Upload className='h-8 w-8 text-muted-foreground' />
            <div>
              <p className='font-medium text-foreground'>Drop your resume here</p>
              <p className='text-sm text-muted-foreground'>or click to browse</p>
            </div>
          </div>
        </div>
      )}

      {errors.resume && <p className='text-sm text-destructive'>{errors.resume}</p>}
      {uploadError && <p className='text-sm text-destructive'>{uploadError}</p>}

      <input ref={fileInputRef} type='file' accept='.pdf,.doc,.docx' onChange={handleInputChange} className='hidden' />
    </div>
  );
}
