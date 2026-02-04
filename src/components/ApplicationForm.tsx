import { useState } from 'react';
import { useHireLinkContext } from '@/contexts';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import PersonalInfoStep from './form-steps/PersonalInfoStep';
import ExperienceStep from './form-steps/ExperienceStep';
import ResumeUploadStep from './form-steps/ResumeUploadStep';
import ApplicationSuccess from './ApplicationSuccess';
import { ChevronLeft } from 'lucide-react';

export type FormData = {
  candidateName: string;
  email: string;
  phone: string;
  yearsOfExperience: number;
  skills: string[];
  portfolioLink: string;
  resumeFile: string;
  resumeFileName: string;
};

type Step = 'personal' | 'experience' | 'resume';

interface ValidationErrors {
  [key: string]: string;
}

const STEPS: { id: Step; label: string }[] = [
  { id: 'personal', label: 'Personal Information' },
  { id: 'experience', label: 'Experience & Skills' },
  { id: 'resume', label: 'Resume Upload' },
];

interface ApplicationFormProps {
  jobId: string;
  onBack: () => void;
}

export default function ApplicationForm({ jobId, onBack }: ApplicationFormProps) {
  const { addApplication, jobs } = useHireLinkContext();
  const [currentStep, setCurrentStep] = useState<Step>('personal');
  const [formData, setFormData] = useState<FormData>({
    candidateName: '',
    email: '',
    phone: '',
    yearsOfExperience: 0,
    skills: [],
    portfolioLink: '',
    resumeFile: '',
    resumeFileName: '',
  });
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [applicationId, setApplicationId] = useState<string | null>(null);

  const job = jobs.find((j) => j.id === jobId);
  const currentStepIndex = STEPS.findIndex((s) => s.id === currentStep);
  const progress = ((currentStepIndex + 1) / STEPS.length) * 100;

  const validatePersonalInfo = (): boolean => {
    const newErrors: ValidationErrors = {};

    if (!formData.candidateName.trim()) {
      newErrors.candidateName = 'Full name is required';
    } else if (formData.candidateName.length > 100) {
      newErrors.candidateName = 'Name must be less than 100 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[\d\s\-\(\)\+]+$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    } else if (formData.phone.replace(/[\s\-\(\)\+]/g, '').length < 10) {
      newErrors.phone = 'Phone number must be at least 10 digits';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateExperience = (): boolean => {
    const newErrors: ValidationErrors = {};

    if (formData.yearsOfExperience < 0) {
      newErrors.yearsOfExperience = 'Years of experience cannot be negative';
    } else if (formData.yearsOfExperience > 100) {
      newErrors.yearsOfExperience = 'Please enter a valid number';
    }

    if (formData.skills.length === 0) {
      newErrors.skills = 'Please add at least one skill';
    }

    if (formData.portfolioLink && !/^https?:\/\/.+/.test(formData.portfolioLink)) {
      newErrors.portfolioLink = 'Please enter a valid URL';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateResume = (): boolean => {
    const newErrors: ValidationErrors = {};

    if (!formData.resumeFile) {
      newErrors.resume = 'Resume file is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateCurrentStep = (): boolean => {
    switch (currentStep) {
      case 'personal':
        return validatePersonalInfo();
      case 'experience':
        return validateExperience();
      case 'resume':
        return validateResume();
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (!validateCurrentStep()) return;

    const nextStepIndex = currentStepIndex + 1;
    if (nextStepIndex < STEPS.length) {
      setCurrentStep(STEPS[nextStepIndex].id);
      setErrors({});
    }
  };

  const handlePrevious = () => {
    if (currentStepIndex > 0) {
      setCurrentStep(STEPS[currentStepIndex - 1].id);
      setErrors({});
    }
  };

  const handleSubmit = () => {
    if (!validateCurrentStep()) return;

    const id = addApplication({
      jobId,
      candidateName: formData.candidateName,
      email: formData.email,
      phone: formData.phone,
      yearsOfExperience: formData.yearsOfExperience,
      skills: formData.skills,
      portfolioLink: formData.portfolioLink,
      resumeFile: formData.resumeFile,
      resumeFileName: formData.resumeFileName,
    });

    setApplicationId(id);
  };

  if (applicationId) {
    return (
      <ApplicationSuccess applicationId={applicationId} jobTitle={job?.title || 'Position'} onBackToJobs={onBack} />
    );
  }

  return (
    <div className='max-w-2xl mx-auto space-y-6'>
      <Button variant='ghost' onClick={onBack} className='gap-2'>
        <ChevronLeft className='h-4 w-4' />
        Back to Jobs
      </Button>

      <Card className='p-6'>
        <div className='space-y-6'>
          <div>
            <h2 className='text-2xl font-bold text-foreground'>{job?.title}</h2>
            <p className='text-muted-foreground text-sm mt-1'>{job?.location}</p>
          </div>

          <div className='space-y-2'>
            <div className='flex justify-between items-center text-sm'>
              <span className='font-medium text-foreground'>
                Step {currentStepIndex + 1} of {STEPS.length}
              </span>
              <span className='text-muted-foreground'>{STEPS[currentStepIndex].label}</span>
            </div>
            <Progress value={progress} className='h-2' />
          </div>

          <div className='space-y-4'>
            {currentStep === 'personal' && <PersonalInfoStep data={formData} onChange={setFormData} errors={errors} />}

            {currentStep === 'experience' && <ExperienceStep data={formData} onChange={setFormData} errors={errors} />}

            {currentStep === 'resume' && <ResumeUploadStep data={formData} onChange={setFormData} errors={errors} />}
          </div>

          <div className='flex gap-3 justify-between pt-4'>
            <Button variant='outline' onClick={handlePrevious} disabled={currentStepIndex === 0}>
              Previous
            </Button>
            {currentStepIndex < STEPS.length - 1 ? (
              <Button onClick={handleNext}>Next</Button>
            ) : (
              <Button onClick={handleSubmit} className='bg-accent hover:bg-accent/90'>
                Submit Application
              </Button>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}
