import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

interface SpectrumChartProps {
  data: Array<{ wavenumber: number; absorbance: number }>;
  title?: string;
}

export function SpectrumChart({ data, title = 'Spectrum Visualization' }: SpectrumChartProps) {
  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>
          High-resolution infrared molecular spectrum
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] w-full rounded-lg border border-border/50 bg-background/30 p-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <defs>
                <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#6366f1" />
                  <stop offset="50%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#a855f7" />
                </linearGradient>
              </defs>
              <CartesianGrid 
                strokeDasharray="3 3" 
                stroke="hsl(var(--border))" 
                opacity={0.3}
              />
              <XAxis
                dataKey="wavenumber"
                className="text-xs"
                tick={{ fill: 'hsl(var(--muted-foreground))' }}
                stroke="hsl(var(--border))"
                label={{
                  value: 'Wavenumber (cm⁻¹)',
                  position: 'insideBottom',
                  offset: -5,
                  style: { fill: 'hsl(var(--foreground))' },
                }}
              />
              <YAxis
                className="text-xs"
                tick={{ fill: 'hsl(var(--muted-foreground))' }}
                stroke="hsl(var(--border))"
                label={{
                  value: 'Absorbance',
                  angle: -90,
                  position: 'insideLeft',
                  style: { fill: 'hsl(var(--foreground))' },
                }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--popover))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: 'var(--radius)',
                  backdropFilter: 'blur(8px)',
                }}
                labelStyle={{ color: 'hsl(var(--foreground))' }}
                itemStyle={{ color: 'hsl(var(--foreground))' }}
              />
              <Legend 
                wrapperStyle={{ paddingTop: '20px' }}
                iconType="line"
              />
              <Line
                type="monotone"
                dataKey="absorbance"
                stroke="url(#lineGradient)"
                strokeWidth={2}
                dot={false}
                activeDot={{ 
                  r: 4, 
                  fill: '#6366f1',
                  stroke: '#fff',
                  strokeWidth: 2 
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
