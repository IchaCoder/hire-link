import { useState, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { useHireLinkContext, type Application } from '@/contexts';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Download, Send } from 'lucide-react';
import { OfferLetterForm } from './OfferLetterForm';
import { OfferLetterPreview } from './OfferLetterPreview';
import { OfferLetterPrint } from './OfferLetterPrint';
import { OfferLetterSuccess } from './OfferLetterSuccess';

interface OfferLetterProps {
  application: Application;
  onClose: () => void;
}

export default function OfferLetter({ application, onClose }: OfferLetterProps) {
  const { moveApplicationStage } = useHireLinkContext();
  const contentRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    jobTitle: '',
    department: 'Engineering',
    salary: '',
    startDate: '',
    benefits: 'Health Insurance, 401(k), Remote Work Options, Professional Development',
  });
  const [errors, setErrors] = useState({
    jobTitle: '',
    salary: '',
    startDate: '',
  });
  const [sent, setSent] = useState(false);

  const handlePrint = useReactToPrint({
    contentRef,
    documentTitle: `offer_${application.candidateName}`,
  });

  const handleSendOffer = () => {
    const newErrors = {
      jobTitle: '',
      salary: '',
      startDate: '',
    };

    if (!formData.jobTitle.trim()) {
      newErrors.jobTitle = 'Job title is required';
    }

    if (!formData.salary.trim()) {
      newErrors.salary = 'Salary is required';
    } else if (parseFloat(formData.salary) <= 0) {
      newErrors.salary = 'Salary must be greater than 0';
    }

    if (!formData.startDate) {
      newErrors.startDate = 'Start date is required';
    }

    setErrors(newErrors);

    if (newErrors.jobTitle || newErrors.salary || newErrors.startDate) {
      return;
    }

    moveApplicationStage(application.id, 'Offer Sent');
    setSent(true);
  };

  const handleDownload = () => {
    handlePrint();
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

  const generateOfferLetterHTML = () => {
    const today = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    return (
      <div style={{ lineHeight: '1.6', color: '#000' }}>
        <h1 style={{ fontSize: '24px', marginBottom: '20px', textAlign: 'center' }}>OFFER LETTER</h1>

        <p style={{ marginBottom: '20px' }}>
          <strong>Date:</strong> {today}
        </p>

        <p style={{ marginBottom: '20px' }}>Dear {application.candidateName},</p>

        <p style={{ marginBottom: '20px' }}>
          We are pleased to extend an offer for the position of <strong>{formData.jobTitle}</strong> at our
          organization.
        </p>

        <div style={{ marginBottom: '20px' }}>
          <h2 style={{ fontSize: '18px', marginBottom: '10px' }}>POSITION DETAILS:</h2>
          <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
            <li style={{ marginBottom: '5px' }}>• Position: {formData.jobTitle}</li>
            <li style={{ marginBottom: '5px' }}>• Department: {formData.department}</li>
            <li style={{ marginBottom: '5px' }}>• Start Date: {formData.startDate}</li>
            <li style={{ marginBottom: '5px' }}>• Compensation: ${formData.salary} per year</li>
          </ul>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <h2 style={{ fontSize: '18px', marginBottom: '10px' }}>BENEFITS:</h2>
          <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
            {formData.benefits.split(',').map((benefit, index) => (
              <li key={index} style={{ marginBottom: '5px' }}>
                • {benefit.trim()}
              </li>
            ))}
          </ul>
        </div>

        <p style={{ marginBottom: '20px' }}>
          We are excited about the possibility of you joining our team. Your qualifications and experience make you an
          ideal candidate for this role.
        </p>

        <div style={{ marginBottom: '20px' }}>
          <p style={{ marginBottom: '10px' }}>This offer is contingent upon:</p>
          <ol style={{ paddingLeft: '20px' }}>
            <li style={{ marginBottom: '5px' }}>Successful background check</li>
            <li style={{ marginBottom: '5px' }}>Verification of educational credentials</li>
            <li style={{ marginBottom: '5px' }}>Reference checks</li>
          </ol>
        </div>

        <p style={{ marginBottom: '20px' }}>
          Please confirm your acceptance of this offer by replying to this email within 5 business days.
        </p>

        <p style={{ marginBottom: '20px' }}>
          If you have any questions or require clarification, please do not hesitate to contact us.
        </p>

        <p style={{ marginTop: '40px' }}>
          Sincerely,
          <br />
          Human Resources Department
        </p>
      </div>
    );
  };

  if (sent) {
    return <OfferLetterSuccess application={application} onClose={onClose} />;
  }

  return (
    <Sheet open={true} onOpenChange={onClose}>
      <SheetContent side='right' className='w-full sm:w-[540px] md:w-[700px] sm:max-w-none overflow-y-auto'>
        <SheetHeader>
          <SheetTitle>Draft Offer Letter</SheetTitle>
        </SheetHeader>

        <div className='space-y-4 mt-4 mx-2 sm:mx-4'>
          <div className='text-sm text-muted-foreground space-y-1'>
            <p className='font-medium text-foreground'>{application.candidateName}</p>
            <p>{application.email}</p>
          </div>

          <OfferLetterForm formData={formData} setFormData={setFormData} errors={errors} setErrors={setErrors} />

          <OfferLetterPreview generateOfferLetterText={generateOfferLetterText} />

          <OfferLetterPrint ref={contentRef} generateOfferLetterHTML={generateOfferLetterHTML} />

          <div className='flex flex-col sm:flex-row gap-2 pt-2'>
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
        </div>
      </SheetContent>
    </Sheet>
  );
}
