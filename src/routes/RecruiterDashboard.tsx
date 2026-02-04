import { useState } from 'react';
import { useHireLinkContext } from '@/contexts';
import { Card } from '@/components/ui/card';
import PipelineBoard from '@/components/recruiter/PipelineBoard';
import CandidateReviewPanel from '@/components/recruiter/CandidateReviewPanel';
import { ArrowRight, BarChart3 } from 'lucide-react';
import PipelineDistributionChart from '@/components/charts/PipelineDistributionChart';
import ScoreDistributionChart from '@/components/charts/ScoreDistributionChart';
import ExperienceBreakdownChart from '@/components/charts/ExperienceBreakdownChart';
import ApplicationTimelineChart from '@/components/charts/ApplicationTimelineChart';
import TopSkillsChart from '@/components/charts/TopSkillsChart';
import { Button } from '@/components/ui/button';

export default function RecruiterDashboard() {
  const { applications } = useHireLinkContext();
  const [selectedApplicationId, setSelectedApplicationId] = useState<string | null>(null);
  const [showAnalytics, setShowAnalytics] = useState(false);

  const selectedApplication = applications.find((app) => app.id === selectedApplicationId);

  const stageCounts = {
    Applied: applications.filter((a) => a.stage === 'Applied').length,
    Reviewed: applications.filter((a) => a.stage === 'Reviewed').length,
    'Interview Scheduled': applications.filter((a) => a.stage === 'Interview Scheduled').length,
    'Offer Sent': applications.filter((a) => a.stage === 'Offer Sent').length,
  };

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <div className='space-y-2'>
          <h2 className='text-3xl font-bold text-foreground'>Recruiter Dashboard</h2>
          <p className='text-muted-foreground'>Manage applications and track candidates through the hiring pipeline</p>
        </div>
        <Button
          onClick={() => setShowAnalytics(!showAnalytics)}
          variant={showAnalytics ? 'default' : 'outline'}
          className='gap-2'
        >
          <BarChart3 className='h-4 w-4' />
          {showAnalytics ? 'Hide Analytics' : 'Show Analytics'}
        </Button>
      </div>

      {/* Stats */}
      <div className='grid grid-cols-2 md:grid-cols-4 gap-3'>
        {Object.entries(stageCounts).map(([stage, count]) => (
          <Card key={stage} className='p-4'>
            <p className='text-sm text-muted-foreground'>{stage}</p>
            <p className='text-2xl font-bold text-foreground mt-1'>{count}</p>
          </Card>
        ))}
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
        {/* Pipeline Board */}
        <div className='lg:col-span-2'>
          <PipelineBoard
            applications={applications}
            selectedId={selectedApplicationId}
            onSelect={setSelectedApplicationId}
          />
        </div>

        {/* Review Panel */}
        {selectedApplication ? (
          <div>
            <CandidateReviewPanel application={selectedApplication} />
          </div>
        ) : (
          <Card className='p-6 flex items-center justify-center'>
            <div className='text-center space-y-2'>
              <ArrowRight className='h-8 w-8 text-muted-foreground mx-auto opacity-50' />
              <p className='text-muted-foreground'>Select a candidate to view details</p>
            </div>
          </Card>
        )}
      </div>

      {/* Analytics Section */}
      {showAnalytics && (
        <div className='space-y-6'>
          <div className='space-y-2'>
            <h3 className='text-xl font-semibold text-foreground'>Analytics & Insights</h3>
            <p className='text-sm text-muted-foreground'>
              Visualize your hiring pipeline, candidate scores, and recruitment trends
            </p>
          </div>

          {/* First Row */}
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
            <PipelineDistributionChart applications={applications} />
            <ScoreDistributionChart applications={applications} />
          </div>

          {/* Second Row */}
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
            <ExperienceBreakdownChart applications={applications} />
            <TopSkillsChart applications={applications} />
          </div>

          {/* Full Width */}
          <ApplicationTimelineChart applications={applications} />
        </div>
      )}
    </div>
  );
}
