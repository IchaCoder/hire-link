'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import type { Application } from '@/contexts';

interface TopSkillsChartProps {
  applications: Application[];
}

export default function TopSkillsChart({ applications }: TopSkillsChartProps) {
  // Count skill frequencies
  const skillCounts: Record<string, number> = {};

  applications.forEach((app) => {
    app.skills.forEach((skill) => {
      skillCounts[skill] = (skillCounts[skill] || 0) + 1;
    });
  });

  // Get top 8 skills
  const topSkills = Object.entries(skillCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 8)
    .map(([skill, count]) => ({
      skill,
      count,
    }));

  if (topSkills.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Top Skills</CardTitle>
          <CardDescription>Most requested skills among candidates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className='h-[300px] flex items-center justify-center text-muted-foreground'>
            No skills data available yet
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Skills</CardTitle>
        <CardDescription>Most requested skills among candidates</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            count: {
              label: 'Count',
              color: 'hsl(var(--primary))',
            },
          }}
          className='h-[300px]'
        >
          <ResponsiveContainer width='100%' height='100%'>
            <BarChart data={topSkills} layout='vertical' margin={{ top: 5, right: 30, left: 150, bottom: 5 }}>
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis type='number' />
              <YAxis dataKey='skill' type='category' width={145} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey='count' fill='hsl(var(--primary))' radius={[0, 8, 8, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
