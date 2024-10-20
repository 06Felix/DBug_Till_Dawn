import {CategoryScale,Chart as ChartJS,Legend,LinearScale,LineElement, BarElement,PointElement, Title, Tooltip, TimeScale, ArcElement, RadialLinearScale} from 'chart.js';
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
  
  const MetricChart = ({ metricLabel, generateMetricData, chartType }) => {
    const data = {
      labels: generateMetricData().map((d) => d.x.toLocaleDateString()),
      datasets: [
        {
          label: `${metricLabel}`,
          data: generateMetricData().map((d) => d.y),
          backgroundColor: [
            'rgba(0, 102, 204, 0.6)', 
            'rgba(255, 159, 64, 0.6)',
            'rgba(75, 192, 192, 0.6)',
            'rgba(153, 102, 255, 0.6)',
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)',
          ],
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
          max: 100, 
        },
      },
      hover: {
        mode: 'nearest',
        intersect: true,
        animationDuration: 200,
      },
      animation: {
        duration: 1000,
        easing: 'easeOutQuart',
      },
    };
  
    switch (chartType) {
      case 'bar':
        return <Bar data={data} options={options} />;
      case 'pie':
        return <Pie data={data} options={options} />;
      case 'radar':
        return <Radar data={data} options={options} />;
      case 'doughnut':
        return <Doughnut data={data} options={options} />;
      case 'polarArea':
        return <PolarArea data={data} options={options} />;
      default:
        return <Line data={data} options={options} />;
    }
  };
  
  const generateDataForMetric = () => {
    const data = [];
    const startDate = new Date('2023-01-01');
    const totalPoints = 50; 
  
    for (let i = 0; i < totalPoints; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i * 7); 
      const value = Math.floor(Math.random() * 100); 
      data.push({ x: date, y: value });
    }
  
    return data;
  };
  const generateDataForMetricPie = () => {
    const data = [];
    const startDate = new Date('2023-01-01');
    const totalPoints = 4; 
  
    for (let i = 0; i < totalPoints; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i * 7); 
      const value = Math.floor(Math.random() * 100); 
      data.push({ x: date, y: value });
    }
  
    return data;
  };
  
  const InstaBatteryLevelChart = () => {
    return (
      <div style={{marginLeft: '10%'}}>
        <h2 style={{marginLeft: "-10%"}}>Metrics Dashboard</h2>
        <div style={{ marginBottom: '30px', width: "95%" , height: "30%"}}>
          <MetricChart
            metricLabel="Likes"
            generateMetricData={generateDataForMetric}
            chartType="line" 
          />
        </div>
        <br></br><br></br><br></br><br></br>
        <div style={{ marginBottom: '30px', width: "95%" , height: "30%" }}>
          <MetricChart
            metricLabel="Views"
            generateMetricData={generateDataForMetric}
            chartType="bar" // Bar chart for Views
          />
        </div>
        <br></br><br></br><br></br><br></br>

        <div style={{ marginBottom: '30px', width: "95%" , height: "30%" }}>
          <MetricChart
            metricLabel="Shares"
            generateMetricData={generateDataForMetricPie}
            chartType="pie" // Pie chart for Shares
          />
        </div>
        <br></br><br></br><br></br><br></br>

        <div style={{ marginBottom: '30px', width: "95%" , height: "30%" }}>
          <MetricChart
            metricLabel="Comments"
            generateMetricData={generateDataForMetric}
            chartType="radar" // Radar chart for Comments
          />
        </div>
        <br></br><br></br><br></br><br></br>

        <div style={{ marginBottom: '30px' , width: "95%" , height: "30%"}}>
          <MetricChart
            metricLabel="Profile Views"
            generateMetricData={generateDataForMetric}
            chartType="doughnut" // Doughnut chart for Profile Views
          />
        </div>
        <br></br><br></br><br></br><br></br>

        <div style={{ marginBottom: '30px', width: "95%" , height: "30%" }}>
          <MetricChart
            metricLabel="Website Visits"
            generateMetricData={generateDataForMetric}
            chartType="polarArea" // Polar Area chart for Website Visits
          />
        </div>
      </div>
    );
  };
  
  export default InstaBatteryLevelChart;
  