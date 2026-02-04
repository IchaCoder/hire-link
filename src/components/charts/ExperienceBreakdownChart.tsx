import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';
import type { Application } from '@/contexts';

interface ExperienceBreakdownChartProps {
  applications: Application[];
}

export default function ExperienceBreakdownChart({ applications }: ExperienceBreakdownChartProps) {
  // Categorize experience levels
  const experienceBreakdown = {
    'Entry (0-2y)': applications.filter((a) => a.yearsOfExperience >= 0 && a.yearsOfExperience <= 2).length,
    'Junior (2-5y)': applications.filter((a) => a.yearsOfExperience > 2 && a.yearsOfExperience <= 5).length,
    'Mid (5-10y)': applications.filter((a) => a.yearsOfExperience > 5 && a.yearsOfExperience <= 10).length,
    'Senior (10y+)': applications.filter((a) => a.yearsOfExperience > 10).length,
  };

  const chartData = [
    {
      name: 'Entry (0-2y)',
      value: experienceBreakdown['Entry (0-2y)'],
      fill: '#94a3b8',
    },
    {
      name: 'Junior (2-5y)',
      value: experienceBreakdown['Junior (2-5y)'],
      fill: '#64748b',
    },
    {
      name: 'Mid (5-10y)',
      value: experienceBreakdown['Mid (5-10y)'],
      fill: '#475569',
    },
    {
      name: 'Senior (10y+)',
      value: experienceBreakdown['Senior (10y+)'],
      fill: '#1e293b',
    },
  ].filter((item) => item.value > 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Experience Level Breakdown</CardTitle>
        <CardDescription>Distribution of candidate experience</CardDescription>
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
            <PieChart>
              <Tooltip content={<ChartTooltipContent />} />
              <Legend />
              <Pie
                data={chartData}
                cx='50%'
                cy='50%'
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={100}
                fill='#8884d8'
                dataKey='value'
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
