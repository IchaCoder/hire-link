import React from 'react';
import { useState } from 'react';
import { useHireLinkContext } from '@/contexts';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import ApplicationForm from '@/components/ApplicationForm';
import { MapPin, ChevronRight } from 'lucide-react';

const JobListingsPage: React.FC = () => {
  const { jobs } = useHireLinkContext();
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);

  if (selectedJobId) {
    return <ApplicationForm jobId={selectedJobId} onBack={() => setSelectedJobId(null)} />;
  }

  return (
    <div className='space-y-6'>
      <div className='space-y-2'>
        <h2 className='text-3xl font-bold text-foreground'>Open Positions</h2>
        <p className='text-muted-foreground'>Explore our current job openings and apply today</p>
      </div>

      <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
        {jobs.map((job) => (
          <Card
            key={job.id}
            className='p-6 hover:border-primary transition-colors cursor-pointer'
            onClick={() => setSelectedJobId(job.id)}
          >
            <div className='flex flex-col h-full gap-4'>
              <div className='flex-1 space-y-3'>
                <div>
                  <h3 className='text-xl font-semibold text-foreground'>{job.title}</h3>
                  <div className='flex items-center gap-2 text-muted-foreground mt-1'>
                    <MapPin className='h-4 w-4' />
                    <span className='text-sm'>{job.location}</span>
                  </div>
                </div>
                <p className='text-muted-foreground text-sm leading-relaxed'>{job.description}</p>
                <div>
                  <span className='inline-block px-2 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground'>
                    {job.department}
                  </span>
                </div>
              </div>
              <Button
                variant='default'
                className='gap-2 w-full'
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedJobId(job.id);
                }}
              >
                Apply Now
                <ChevronRight className='h-4 w-4' />
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default JobListingsPage;
