import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import type { Application } from '@/contexts';

interface PipelineDistributionChartProps {
  applications: Application[];
}

export default function PipelineDistributionChart({ applications }: PipelineDistributionChartProps) {
  const stageCounts = {
    Applied: applications.filter((a) => a.stage === 'Applied').length,
    Reviewed: applications.filter((a) => a.stage === 'Reviewed').length,
    'Interview Scheduled': applications.filter((a) => a.stage === 'Interview Scheduled').length,
    'Offer Sent': applications.filter((a) => a.stage === 'Offer Sent').length,
  };

  const chartData = [
    { stage: 'Applied', count: stageCounts.Applied },
    { stage: 'Reviewed', count: stageCounts.Reviewed },
    { stage: 'Interview', count: stageCounts['Interview Scheduled'] },
    { stage: 'Offer', count: stageCounts['Offer Sent'] },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pipeline Distribution</CardTitle>
        <CardDescription>Candidates by hiring stage</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            count: {
              label: 'Candidates',
              color: 'hsl(var(--primary))',
            },
          }}
          className='h-[300px]'
        >
          <ResponsiveContainer width='100%' height='100%'>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis dataKey='stage' />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey='count' fill='hsl(var(--primary))' radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
