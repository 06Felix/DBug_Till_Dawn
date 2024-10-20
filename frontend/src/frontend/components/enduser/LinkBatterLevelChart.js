import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  BarElement,
  PointElement,
  Title,
  Tooltip,
  TimeScale,
  ArcElement,
  RadialLinearScale,
} from 'chart.js';
import 'chartjs-adapter-date-fns';
import zoomPlugin from 'chartjs-plugin-zoom';
import React from 'react';
import { Line, Bar, Pie, Radar, Doughnut, PolarArea } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
  ArcElement,
  RadialLinearScale,
  zoomPlugin
);

const MetricChart = ({ metricLabel, data, chartType }) => {
  const chartData = {
    labels: data.map((d) => (d.x instanceof Date && !isNaN(d.x) ? d.x.toLocaleDateString() : 'Invalid Date')),
    datasets: [
      {
        label: `${metricLabel}`,
        data: data.map((d) => d.y),
        backgroundColor: 'rgba(0, 102, 204, 0.6)',
        borderColor: 'rgba(0, 102, 204, 1)',
        borderWidth: 2,
        fill: false,
      },
    ],
  };
  

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: `${metricLabel} Over Time`,
      },
      zoom: {
        pan: {
          enabled: true,
          mode: 'xy',
        },
        zoom: {
          enabled: true,
          mode: 'xy',
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date',
        },
      },
      y: {
        title: {
          display: true,
          text: `${metricLabel}`,
        },
        min: 0,
        max: Math.max(...data.map((d) => d.y)) + 500, // Adjust this as needed
        ticks: {
          stepSize: 500, // Ensures points at 500, 1000, 1500, etc.
        },
      },
    },
  };

  switch (chartType) {
    case 'bar':
      return <Bar data={chartData} options={options} />;
    case 'pie':
      return <Pie data={chartData} options={options} />;
    case 'radar':
      return <Radar data={chartData} options={options} />;
    case 'doughnut':
      return <Doughnut data={chartData} options={options} />;
    case 'polarArea':
      return <PolarArea data={chartData} options={options} />;
    default:
      return <Line data={chartData} options={options} />;
  }
};

const LinkBatteryLevelChart = ({ metricData, onBackClick }) => {
  const metrics = ['Likes', 'Comments', 'Empathy', 'Praise', 'Reaction', 'Views'];

  return (
    <div style={{ marginLeft: '10%' }}>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div style={{ marginLeft: '-9%', cursor: 'pointer' }} onClick={onBackClick}>
          <box-icon name='arrow-back' color='black'></box-icon>
        </div>
        <h2>Metrics Dashboard</h2>
      </div>

      {metrics.map((metric) => {
        // Extract the metric-specific data from metricData
        const data = metricData.map((metricObj) => ({
          x: metricObj[metric.toLowerCase()], // e.g. likes, comments, etc.
          y: metricObj[metric.toLowerCase()].y,
        }));

        return (
          <div key={metric} style={{ marginBottom: '30px', width: '95%', height: '30%' }}>
            <MetricChart
              metricLabel={metric}
              data={data} // Pass the extracted metric data
              chartType={
                metric === 'Likes'
                  ? 'line'
                  : metric === 'Views'
                  ? 'bar'
                  : metric === 'Comments'
                  ? 'radar'
                  : 'line' // Default type
              }
            />
          </div>
        );
      })}
    </div>
  );

};

export default LinkBatteryLevelChart;
