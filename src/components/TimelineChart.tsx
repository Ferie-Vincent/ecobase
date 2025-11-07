import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface TimelineChartProps {
  title: string;
  data: Array<{
    year: string;
    [key: string]: string | number;
  }>;
  lines: Array<{
    dataKey: string;
    name: string;
    color: string;
  }>;
}

export const TimelineChart = ({ title, data, lines }: TimelineChartProps) => {
  return (
    <Card className="p-6 bg-card/60 backdrop-blur-sm border-border/50 hover:shadow-xl transition-all duration-300">
      <h3 className="text-xl font-bold text-foreground mb-6">
        {title}
      </h3>
      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis 
            dataKey="year" 
            stroke="hsl(var(--muted-foreground))"
          />
          <YAxis stroke="hsl(var(--muted-foreground))" />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'hsl(var(--card) / 0.9)',
              backdropFilter: 'blur(8px)',
              border: '1px solid hsl(var(--border) / 0.5)',
              borderRadius: '8px'
            }}
            formatter={(value: number) => value.toLocaleString('fr-FR')}
            cursor={{ stroke: 'hsl(var(--primary))', strokeWidth: 1 }}
            separator=": "
            itemStyle={{ color: 'hsl(var(--foreground))' }}
            labelStyle={{ color: 'hsl(var(--muted-foreground))' }}
          />
          <Legend />
          {lines.map((line) => (
            <Line 
              key={line.dataKey}
              type="monotone" 
              dataKey={line.dataKey} 
              stroke={line.color}
              strokeWidth={2}
              name={line.name}
              dot={{ fill: line.color, r: 4 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
};
