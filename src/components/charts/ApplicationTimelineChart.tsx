'use client';

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import type { Application } from '@/contexts';

interface ApplicationTimelineChartProps {
  applications: Application[];
}

export default function ApplicationTimelineChart({ applications }: ApplicationTimelineChartProps) {
  // Group applications by creation date
  const dateGroups: Record<string, number> = {};

  applications.forEach((app) => {
    const date = new Date(app.appliedAt).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
    dateGroups[date] = (dateGroups[date] || 0) + 1;
  });

  // Sort dates and create cumulative data
  const sortedDates = Object.keys(dateGroups).sort((a, b) => new Date(a).getTime() - new Date(b).getTime());

  const chartData = sortedDates.reduce(
    (acc, date) => {
      const cumulativeCount = (acc.length > 0 ? acc[acc.length - 1].cumulative : 0) + dateGroups[date];
      acc.push({
        date,
        applications: dateGroups[date],
        cumulative: cumulativeCount,
      });
      return acc;
    },
    [] as Array<{ date: string; applications: number; cumulative: number }>,
  );

  // If no data, show last 7 days with zeros
  if (chartData.length === 0) {
    const today = new Date();
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const formattedDate = date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      });
      chartData.push({
        date: formattedDate,
        applications: 0,
        cumulative: 0,
      });
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Application Trends</CardTitle>
        <CardDescription>Daily applications and cumulative total</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            applications: {
              label: 'Daily Applications',
              color: 'hsl(var(--accent))',
            },
            cumulative: {
              label: 'Cumulative',
              color: 'hsl(var(--primary))',
            },
          }}
          className='h-[300px]'
        >
          <ResponsiveContainer width='100%' height='100%'>
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id='colorApplications' x1='0' y1='0' x2='0' y2='1'>
                  <stop offset='5%' stopColor='hsl(var(--accent))' stopOpacity={0.3} />
                  <stop offset='95%' stopColor='hsl(var(--accent))' stopOpacity={0} />
                </linearGradient>
                <linearGradient id='colorCumulative' x1='0' y1='0' x2='0' y2='1'>
                  <stop offset='5%' stopColor='hsl(var(--primary))' stopOpacity={0.3} />
                  <stop offset='95%' stopColor='hsl(var(--primary))' stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis dataKey='date' />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Legend />
              <Area
                type='monotone'
                dataKey='applications'
                stroke='hsl(var(--accent))'
                fillOpacity={1}
                fill='url(#colorApplications)'
                name='Daily Applications'
              />
              <Area
                type='monotone'
                dataKey='cumulative'
                stroke='hsl(var(--primary))'
                fillOpacity={1}
                fill='url(#colorCumulative)'
                name='Cumulative Total'
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
