import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { FormData } from '../ApplicationForm';

interface ValidationErrors {
  [key: string]: string;
}

interface PersonalInfoStepProps {
  data: FormData;
  onChange: (data: FormData) => void;
  errors: ValidationErrors;
}

export default function PersonalInfoStep({ data, onChange, errors }: PersonalInfoStepProps) {
  return (
    <div className='space-y-4'>
      <div className='space-y-2'>
        <Label htmlFor='name'>
          Full Name <span className='text-destructive'>*</span>
        </Label>
        <Input
          id='name'
          placeholder='John Doe'
          value={data.candidateName}
          onChange={(e) => onChange({ ...data, candidateName: e.target.value })}
          className={errors.candidateName ? 'border-destructive' : ''}
          maxLength={100}
        />
        {errors.candidateName && <p className='text-sm text-destructive'>{errors.candidateName}</p>}
      </div>

      <div className='space-y-2'>
        <Label htmlFor='email'>
          Email <span className='text-destructive'>*</span>
        </Label>
        <Input
          id='email'
          type='email'
          placeholder='john@example.com'
          value={data.email}
          onChange={(e) => onChange({ ...data, email: e.target.value })}
          className={errors.email ? 'border-destructive' : ''}
        />
        {errors.email && <p className='text-sm text-destructive'>{errors.email}</p>}
      </div>

      <div className='space-y-2'>
        <Label htmlFor='phone'>
          Phone Number <span className='text-destructive'>*</span>
        </Label>
        <Input
          id='phone'
          placeholder='+1 (555) 000-0000'
          value={data.phone}
          onChange={(e) => onChange({ ...data, phone: e.target.value })}
          className={errors.phone ? 'border-destructive' : ''}
        />
        {errors.phone && <p className='text-sm text-destructive'>{errors.phone}</p>}
      </div>
    </div>
  );
}
