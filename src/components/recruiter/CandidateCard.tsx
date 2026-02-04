import { type Application } from '@/contexts';
import { Card } from '@/components/ui/card';
import { Star } from 'lucide-react';

interface CandidateCardProps {
  application: Application;
  isSelected: boolean;
}

export default function CandidateCard({ application, isSelected }: CandidateCardProps) {
  return (
    <Card
      className={`p-3 transition-all cursor-pointer ${
        isSelected ? 'ring-2 ring-primary border-primary' : 'hover:border-primary'
      }`}
    >
      <div className='space-y-2'>
        <div className='flex items-start justify-between gap-2'>
          <div className='min-w-0 flex-1'>
            <p className='font-medium text-foreground text-sm truncate'>{application.candidateName}</p>
            <p className='text-xs text-muted-foreground truncate'>{application.email}</p>
          </div>
          {application.score && (
            <div className='flex items-center gap-1 bg-accent/10 rounded px-2 py-1 flex-shrink-0'>
              <Star className='h-3 w-3 fill-accent text-accent' />
              <span className='text-xs font-semibold text-accent'>{application.score}/5</span>
            </div>
          )}
        </div>

        {application.skills && application.skills.length > 0 && (
          <div className='flex flex-wrap gap-1'>
            {application.skills.slice(0, 2).map((skill) => (
              <span
                key={skill}
                className='inline-block px-2 py-0.5 rounded text-xs bg-secondary/50 text-secondary-foreground'
              >
                {skill}
              </span>
            ))}
            {application.skills.length > 2 && (
              <span className='inline-block px-2 py-0.5 rounded text-xs bg-secondary/50 text-secondary-foreground'>
                +{application.skills.length - 2}
              </span>
            )}
          </div>
        )}
      </div>
    </Card>
  );
}
