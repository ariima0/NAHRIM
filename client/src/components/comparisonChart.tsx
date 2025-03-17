import { useEffect, useState } from 'react';
import axios from 'axios';
import { WindyData } from './types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardBody, useColorModeValue } from '@chakra-ui/react';

const ComparisonChart = () => {
  const [data, setData] = useState<WindyData[]>([]);
  const bgColor = useColorModeValue("white", "gray.800");
  const gridColor = useColorModeValue('#e2e8f0', '#2d3748');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/windyDailyData');
        const windyData = response.data.data;

        if (windyData.length > 0) {       // check if data is available for today
          const todayData = windyData[0]; // today's data is the first item in the array
          const chartData = [
            {
              name: 'Windy.com',
              temperature: todayData.Win_Current,
              ...todayData, // include all other properties from todayData
            },
          ];

          setData(chartData);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Card bg={bgColor} p={6} boxShadow="md" borderRadius="2xl" maxWidth="700" height="319">
      <CardBody>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={data}>
            <CartesianGrid stroke={gridColor} strokeDasharray="3 3" />
            <XAxis dataKey="name" tickLine={false} axisLine={false} />
            <YAxis tickLine={false} axisLine={false} domain={[0, 40]} />
            <Tooltip
              wrapperStyle={{ fontSize: '14px' }}
              contentStyle={{
                backgroundColor: "#2D2D2D",
                border: "none",
                borderRadius: "5px",
                color: '#E0E0E0',
              }}
            />
            <Bar dataKey="temperature" fill="#79c0ea" name="Today" />
          </BarChart>
        </ResponsiveContainer>
      </CardBody>
    </Card>
  );
};

export default ComparisonChart;