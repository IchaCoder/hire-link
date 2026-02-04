'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Cell } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import type { Application } from '@/contexts';

interface ScoreDistributionChartProps {
  applications: Application[];
}

export default function ScoreDistributionChart({ applications }: ScoreDistributionChartProps) {
  // Count applications by score
  const scoreCounts = {
    1: applications.filter((a) => a.score === 1).length,
    2: applications.filter((a) => a.score === 2).length,
    3: applications.filter((a) => a.score === 3).length,
    4: applications.filter((a) => a.score === 4).length,
    5: applications.filter((a) => a.score === 5).length,
  };

  const chartData = [
    { score: '1 Star', count: scoreCounts[1], fill: '#ef4444' },
    { score: '2 Stars', count: scoreCounts[2], fill: '#f97316' },
    { score: '3 Stars', count: scoreCounts[3], fill: '#eab308' },
    { score: '4 Stars', count: scoreCounts[4], fill: '#84cc16' },
    { score: '5 Stars', count: scoreCounts[5], fill: '#22c55e' },
  ];

  const totalScored = applications.filter((a) => a.score !== undefined && a.score > 0).length;
  const avgScore =
    totalScored > 0 ? (applications.reduce((sum, a) => sum + (a.score || 0), 0) / totalScored).toFixed(1) : 'N/A';

  return (
    <Card>
      <CardHeader>
        <CardTitle>Candidate Score Distribution</CardTitle>
        <CardDescription>Average score: {avgScore} / 5.0</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            count: {
              label: 'Count',
            },
          }}
          className='h-[300px]'
        >
          <ResponsiveContainer width='100%' height='100%'>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis dataKey='score' />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey='count' radius={[8, 8, 0, 0]}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
