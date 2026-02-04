import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface FormData {
  jobTitle: string;
  department: string;
  salary: string;
  startDate: string;
  benefits: string;
}

interface Errors {
  jobTitle: string;
  salary: string;
  startDate: string;
}

interface OfferLetterFormProps {
  formData: FormData;
  setFormData: (data: FormData) => void;
  errors: Errors;
  setErrors: (errors: Errors) => void;
}

export function OfferLetterForm({ formData, setFormData, errors, setErrors }: OfferLetterFormProps) {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 py-2'>
      <div className='space-y-2'>
        <Label htmlFor='job-title'>
          Job Title <span className='text-destructive'>*</span>
        </Label>
        <Input
          id='job-title'
          placeholder='e.g., Senior Frontend Engineer'
          value={formData.jobTitle}
          onChange={(e) => {
            setFormData({ ...formData, jobTitle: e.target.value });
            if (errors.jobTitle) setErrors({ ...errors, jobTitle: '' });
          }}
          className={errors.jobTitle ? 'border-destructive focus-visible:ring-destructive' : ''}
        />
        {errors.jobTitle && <p className='text-xs text-destructive mt-1'>{errors.jobTitle}</p>}
      </div>

      <div className='space-y-2'>
        <Label htmlFor='salary'>
          Annual Salary <span className='text-destructive'>*</span>
        </Label>
        <Input
          id='salary'
          type='number'
          placeholder='e.g., 120000'
          value={formData.salary}
          onChange={(e) => {
            setFormData({ ...formData, salary: e.target.value });
            if (errors.salary) setErrors({ ...errors, salary: '' });
          }}
          className={errors.salary ? 'border-destructive focus-visible:ring-destructive' : ''}
        />
        {errors.salary && <p className='text-xs text-destructive mt-1'>{errors.salary}</p>}
      </div>

      <div className='space-y-2 sm:col-span-2'>
        <Label htmlFor='start-date'>
          Start Date <span className='text-destructive'>*</span>
        </Label>
        <Input
          id='start-date'
          type='date'
          value={formData.startDate}
          onChange={(e) => {
            setFormData({ ...formData, startDate: e.target.value });
            if (errors.startDate) setErrors({ ...errors, startDate: '' });
          }}
          min={new Date().toISOString().split('T')[0]}
          className={errors.startDate ? 'border-destructive focus-visible:ring-destructive' : ''}
        />
        {errors.startDate && <p className='text-xs text-destructive mt-1'>{errors.startDate}</p>}
      </div>

      <div className='space-y-2 sm:col-span-2'>
        <Label htmlFor='benefits'>Benefits</Label>
        <Textarea
          id='benefits'
          value={formData.benefits}
          onChange={(e) => setFormData({ ...formData, benefits: e.target.value })}
          className='min-h-20 text-sm'
          placeholder='List benefits separated by commas'
        />
      </div>
    </div>
  );
}
