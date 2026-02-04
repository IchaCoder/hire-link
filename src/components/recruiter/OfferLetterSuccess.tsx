import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Send } from 'lucide-react';
import { type Application } from '@/contexts';

interface OfferLetterSuccessProps {
  application: Application;
  onClose: () => void;
}

export function OfferLetterSuccess({ application, onClose }: OfferLetterSuccessProps) {
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className='max-w-md overflow-y-auto'>
        <DialogHeader>
          <DialogTitle>Offer Sent Successfully</DialogTitle>
        </DialogHeader>
        <div className='space-y-4 mt-4'>
          <div className='text-center space-y-3'>
            <div className='w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto'>
              <Send className='h-6 w-6 text-accent' />
            </div>
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
        </div>
      </DialogContent>
    </Dialog>
  );
}
