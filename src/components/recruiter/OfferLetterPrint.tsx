import { forwardRef } from 'react';

interface OfferLetterPrintProps {
  generateOfferLetterHTML: () => JSX.Element;
}

export const OfferLetterPrint = forwardRef<HTMLDivElement, OfferLetterPrintProps>(
  ({ generateOfferLetterHTML }, ref) => {
    return (
      <div style={{ display: 'none' }}>
        <div ref={ref} style={{ padding: '40px', fontFamily: 'Arial, sans-serif' }}>
          <style type='text/css' media='print'>{`
            @page {
              margin: 20mm;
            }
            @media print {
              body {
                -webkit-print-color-adjust: exact;
                print-color-adjust: exact;
              }
            }
          `}</style>
          {generateOfferLetterHTML()}
        </div>
      </div>
    );
  },
);

OfferLetterPrint.displayName = 'OfferLetterPrint';
