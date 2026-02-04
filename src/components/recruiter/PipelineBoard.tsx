'use client';
import { type Application } from '@/contexts';
import CandidateCard from './CandidateCard';

interface PipelineBoardProps {
  applications: Application[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

const STAGES: Application['stage'][] = ['Applied', 'Reviewed', 'Interview Scheduled', 'Offer Sent'];

export default function PipelineBoard({ applications, selectedId, onSelect }: PipelineBoardProps) {
  return (
    <div className='space-y-4'>
      <h3 className='font-semibold text-foreground'>Hiring Pipeline</h3>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
        {STAGES.map((stage) => {
          const stageApplications = applications.filter((app) => app.stage === stage);

          return (
            <div key={stage} className='space-y-3'>
              <div className='flex items-center justify-between'>
                <h4 className='font-medium text-foreground text-sm'>{stage}</h4>
                <span className='inline-flex items-center justify-center w-6 h-6 rounded-full bg-secondary text-xs font-semibold text-secondary-foreground'>
                  {stageApplications.length}
                </span>
              </div>

              <div className='space-y-2 min-h-96 bg-muted/30 rounded-lg p-3'>
                {stageApplications.length === 0 ? (
                  <div className='h-full flex items-center justify-center'>
                    <p className='text-xs text-muted-foreground text-center'>No candidates</p>
                  </div>
                ) : (
                  stageApplications.map((app) => (
                    <div key={app.id} onClick={() => onSelect(app.id)} className='cursor-pointer'>
                      <CandidateCard application={app} isSelected={app.id === selectedId} />
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
