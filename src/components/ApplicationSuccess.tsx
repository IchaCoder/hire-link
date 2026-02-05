import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CheckCircle2, Copy } from 'lucide-react';
import { useState } from 'react';

interface ApplicationSuccessProps {
  applicationId: string;
  jobTitle: string;
  onBackToJobs: () => void;
}

export default function ApplicationSuccess({ applicationId, jobTitle, onBackToJobs }: ApplicationSuccessProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(applicationId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className='max-w-2xl mx-auto space-y-6'>
      <Card className='p-8 text-center space-y-6'>
        <div className='flex justify-center'>
          <div className='rounded-full bg-accent/10 p-3'>
            <CheckCircle2 className='h-12 w-12 text-accent' />
          </div>
        </div>

        <div className='space-y-2'>
          <h2 className='text-3xl font-bold text-foreground'>Application Submitted!</h2>
          <p className='text-muted-foreground'>Thank you for applying to the {jobTitle} position.</p>
        </div>

        <div className='space-y-2 bg-secondary/50 rounded-lg p-4'>
          <p className='text-sm text-muted-foreground'>Your Application ID</p>
          <div className='flex items-center gap-2 p-3 bg-background rounded border border-border'>
            <code className='font-mono font-semibold text-foreground text-lg flex-1 min-w-0 break-all'>
              {applicationId}
            </code>
            <Button type='button' variant='ghost' size='sm' onClick={copyToClipboard} className='gap-2 flex-shrink-0'>
              <Copy className='h-4 w-4' />
              {copied ? 'Copied!' : 'Copy'}
            </Button>
          </div>
        </div>

        <div className='bg-secondary/20 rounded-lg p-4 text-left space-y-2 text-sm'>
          <p className='font-medium text-foreground'>What happens next?</p>
          <ul className='space-y-1 text-muted-foreground list-disc list-inside'>
            <li>Our team will review your application</li>
            <li>We'll contact you if your qualifications match our needs</li>
            <li>Keep your application ID for reference</li>
          </ul>
        </div>

        <Button onClick={onBackToJobs} className='w-full bg-accent hover:bg-accent/90'>
          Back to Job Listings
        </Button>
      </Card>
    </div>
  );
}
