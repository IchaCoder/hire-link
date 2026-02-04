import { useState } from 'react';
import { useHireLinkContext, type Application } from '@/contexts';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar, Clock, X } from 'lucide-react';

interface InterviewSchedulerProps {
  application: Application;
  onClose: () => void;
}

export default function InterviewScheduler({ application, onClose }: InterviewSchedulerProps) {
  const { scheduleInterview } = useHireLinkContext();
  const [date, setDate] = useState(application.interviewDate || '');
  const [time, setTime] = useState(application.interviewTime || '');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!date) {
      newErrors.date = 'Interview date is required';
    } else {
      const selectedDate = new Date(date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        newErrors.date = 'Interview date must be in the future';
      }
    }

    if (!time) {
      newErrors.time = 'Interview time is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSchedule = () => {
    if (!validateForm()) return;
    scheduleInterview(application.id, date, time);
    onClose();
  };

  const getTodayDate = (): string => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  return (
    <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4'>
      <Card className='w-full max-w-md p-6 space-y-4'>
        <div className='flex items-center justify-between'>
          <h3 className='text-lg font-bold text-foreground'>Schedule Interview</h3>
          <button onClick={onClose} className='p-1 hover:bg-secondary rounded'>
            <X className='h-5 w-5' />
          </button>
        </div>

        <div className='text-sm text-muted-foreground space-y-1'>
          <p className='font-medium text-foreground'>{application.candidateName}</p>
          <p>{application.email}</p>
        </div>

        <div className='space-y-4 py-2'>
          <div className='space-y-2'>
            <Label htmlFor='interview-date' className='flex items-center gap-2'>
              <Calendar className='h-4 w-4' />
              Interview Date <span className='text-destructive'>*</span>
            </Label>
            <Input
              id='interview-date'
              type='date'
              value={date}
              onChange={(e) => setDate(e.target.value)}
              min={getTodayDate()}
              className={errors.date ? 'border-destructive' : ''}
            />
            {errors.date && <p className='text-sm text-destructive'>{errors.date}</p>}
          </div>

          <div className='space-y-2'>
            <Label htmlFor='interview-time' className='flex items-center gap-2'>
              <Clock className='h-4 w-4' />
              Interview Time <span className='text-destructive'>*</span>
            </Label>
            <Input
              id='interview-time'
              type='time'
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className={errors.time ? 'border-destructive' : ''}
            />
            {errors.time && <p className='text-sm text-destructive'>{errors.time}</p>}
          </div>
        </div>

        <div className='bg-secondary/30 rounded p-3 text-xs text-muted-foreground'>
          <p className='font-medium text-foreground mb-1'>Interview Details</p>
          <ul className='space-y-1 list-disc list-inside'>
            <li>Candidate will receive notification at their email</li>
            <li>Status will update to "Interview Scheduled"</li>
            <li>You can edit the time anytime</li>
          </ul>
        </div>

        <div className='flex gap-2 pt-2'>
          <Button variant='outline' onClick={onClose} className='flex-1 bg-transparent'>
            Cancel
          </Button>
          <Button onClick={handleSchedule} className='flex-1 bg-accent hover:bg-accent/90'>
            Schedule Interview
          </Button>
        </div>
      </Card>
    </div>
  );
}
