interface OfferLetterPreviewProps {
  generateOfferLetterText: () => string;
}

export function OfferLetterPreview({ generateOfferLetterText }: OfferLetterPreviewProps) {
  return (
    <div className='space-y-2 pt-2 border-t border-border'>
      <p className='text-sm font-semibold text-foreground'>Preview</p>
      <div className='bg-muted/50 rounded p-4 text-xs text-muted-foreground whitespace-pre-wrap font-mono max-h-48 overflow-y-auto leading-relaxed'>
        {generateOfferLetterText()}
      </div>
    </div>
  );
}
