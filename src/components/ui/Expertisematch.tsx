import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

const data = [
  { name: 'Dr. Smith', 'Machine Learning': 85, 'Data Analysis': 92, 'Cloud Computing': 78 },
  { name: 'Prof. Johnson', 'Machine Learning': 92, 'Data Analysis': 88, 'Cloud Computing': 75 },
  { name: 'Dr. Williams', 'Machine Learning': 78, 'Data Analysis': 95, 'Cloud Computing': 88 },
  { name: 'Prof. Brown', 'Machine Learning': 90, 'Data Analysis': 85, 'Cloud Computing': 93 },
  { name: 'Dr. Davis', 'Machine Learning': 86, 'Data Analysis': 90, 'Cloud Computing': 82 },
];

export const  ExpertExpertiseChart = () => {
  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Expert-Expertise Score Matching</CardTitle>
        <CardDescription>Comparison of expertise scores across different domains for various experts</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Machine Learning" fill="hsl(var(--primary))" />
            <Bar dataKey="Data Analysis" fill="hsl(var(--secondary))" />
            <Bar dataKey="Cloud Computing" fill="hsl(var(--accent))" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}