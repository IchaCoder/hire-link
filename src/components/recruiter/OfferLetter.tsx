'use client';

import { useState } from 'react';
import { useHireLinkContext, type Application } from '@/contexts';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { X, Download, Send } from 'lucide-react';

interface OfferLetterProps {
  application: Application;
  onClose: () => void;
}

export default function OfferLetter({ application, onClose }: OfferLetterProps) {
  const { moveApplicationStage } = useHireLinkContext();
  const [formData, setFormData] = useState({
    jobTitle: '',
    department: 'Engineering',
    salary: '',
    startDate: '',
    benefits: 'Health Insurance, 401(k), Remote Work Options, Professional Development',
  });
  const [sent, setSent] = useState(false);

  const handleSendOffer = () => {
    if (!formData.jobTitle || !formData.salary || !formData.startDate) {
      alert('Please fill in all required fields');
      return;
    }
    moveApplicationStage(application.id, 'Offer Sent');
    setSent(true);
  };

  const handleDownload = () => {
    const letterContent = generateOfferLetterText();
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(letterContent));
    element.setAttribute('download', `offer_${application.candidateName}.txt`);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const generateOfferLetterText = (): string => {
    const today = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    return `OFFER LETTER

Date: ${today}

Dear ${application.candidateName},

We are pleased to extend an offer for the position of ${formData.jobTitle} at our organization.

POSITION DETAILS:
- Position: ${formData.jobTitle}
- Department: ${formData.department}
- Start Date: ${formData.startDate}
- Compensation: $${formData.salary} per year

BENEFITS:
${formData.benefits
  .split(',')
  .map((b) => `- ${b.trim()}`)
  .join('\n')}

We are excited about the possibility of you joining our team. Your qualifications and experience make you an ideal candidate for this role.

This offer is contingent upon:
1. Successful background check
2. Verification of educational credentials
3. Reference checks

Please confirm your acceptance of this offer by replying to this email within 5 business days.

If you have any questions or require clarification, please do not hesitate to contact us.

Sincerely,
Human Resources Department`;
  };

  if (sent) {
    return (
      <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4'>
        <Card className='w-full max-w-md p-6 space-y-4'>
          <div className='text-center space-y-3'>
            <div className='w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto'>
              <Send className='h-6 w-6 text-accent' />
            </div>
            <h3 className='text-lg font-bold text-foreground'>Offer Sent Successfully</h3>
            <p className='text-sm text-muted-foreground'>
              The offer letter has been sent to {application.email}. The candidate's status has been updated to "Offer
              Sent".
            </p>
          </div>

          <div className='bg-secondary/30 rounded p-3 text-xs text-muted-foreground space-y-1'>
            <p className='font-medium text-foreground'>Next Steps:</p>
            <ul className='list-disc list-inside space-y-1'>
              <li>Candidate will review the offer</li>
              <li>Follow up within 5 business days</li>
              <li>Coordinate onboarding once accepted</li>
            </ul>
          </div>

          <Button onClick={onClose} className='w-full'>
            Close
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto'>
      <Card className='w-full max-w-2xl p-6 space-y-4 my-8'>
        <div className='flex items-center justify-between'>
          <h3 className='text-lg font-bold text-foreground'>Draft Offer Letter</h3>
          <button onClick={onClose} className='p-1 hover:bg-secondary rounded'>
            <X className='h-5 w-5' />
          </button>
        </div>

        <div className='text-sm text-muted-foreground space-y-1'>
          <p className='font-medium text-foreground'>{application.candidateName}</p>
          <p>{application.email}</p>
        </div>

        <div className='grid grid-cols-2 gap-3 py-2'>
          <div className='space-y-2'>
            <Label htmlFor='job-title'>
              Job Title <span className='text-destructive'>*</span>
            </Label>
            <Input
              id='job-title'
              placeholder='e.g., Senior Frontend Engineer'
              value={formData.jobTitle}
              onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
            />
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
              onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
            />
          </div>

          <div className='space-y-2 col-span-2'>
            <Label htmlFor='start-date'>
              Start Date <span className='text-destructive'>*</span>
            </Label>
            <Input
              id='start-date'
              type='date'
              value={formData.startDate}
              onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
              min={new Date().toISOString().split('T')[0]}
            />
          </div>

          <div className='space-y-2 col-span-2'>
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

        <div className='space-y-2 pt-2 border-t border-border'>
          <p className='text-sm font-semibold text-foreground'>Preview</p>
          <div className='bg-muted/50 rounded p-4 text-xs text-muted-foreground whitespace-pre-wrap font-mono max-h-48 overflow-y-auto leading-relaxed'>
            {generateOfferLetterText()}
          </div>
        </div>

        <div className='flex gap-2 pt-2'>
          <Button variant='outline' onClick={handleDownload} className='flex-1 gap-2 bg-transparent'>
            <Download className='h-4 w-4' />
            Download
          </Button>
          <Button variant='outline' onClick={onClose} className='flex-1 bg-transparent'>
            Cancel
          </Button>
          <Button onClick={handleSendOffer} className='flex-1 gap-2 bg-accent hover:bg-accent/90'>
            <Send className='h-4 w-4' />
            Send Offer
          </Button>
        </div>
      </Card>
    </div>
  );
}
