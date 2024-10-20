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
  } from 'chart.js';
  import 'chartjs-adapter-date-fns';
  import React, { useState } from 'react';
  import { Bar } from 'react-chartjs-2';
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    TimeScale
  );
  
  // Function to generate random data for demonstration (mock data)
  const generateRandomData = () => {
    const data = [];
    const startDate = new Date('2023-01-01');
    const totalPoints = 10; // Total number of data points
  
    for (let i = 0; i < totalPoints; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i * 7); // Increment by weeks for variety
      const value = Math.floor(Math.random() * 100); // Random value between 0 and 100
      data.push({ date: date.toLocaleDateString(), value });
    }
    return data;
  };
  
  // Predefined mock data for social media apps
  const mockData = {
    instagram: {
      views: generateRandomData(),
      likes: generateRandomData(),
      shares: generateRandomData(),
    },
    twitter: {
      views: generateRandomData(),
      likes: generateRandomData(),
      shares: generateRandomData(),
    },
    linkedin: {
      views: generateRandomData(),
      likes: generateRandomData(),
      shares: generateRandomData(),
    },
    facebook: {
      views: generateRandomData(),
      likes: generateRandomData(),
      shares: generateRandomData(),
    },
  };
  
  // A reusable component to display the chart
  const SocialMediaComparisonChart = ({ selectedPlatforms, metric }) => {
    const labels = mockData.instagram.views.map((d) => d.date);
  
    // Create datasets based on the selected platforms
    const datasets = selectedPlatforms.map((platform) => ({
      label: `${platform.charAt(0).toUpperCase() + platform.slice(1)} ${metric}`,
      data: mockData[platform][metric].map((d) => d.value),
      backgroundColor:
        platform === 'instagram'
          ? 'rgba(255, 99, 132, 0.6)'
          : platform === 'twitter'
          ? 'rgba(54, 162, 235, 0.6)'
          : platform === 'linkedin'
          ? 'rgba(75, 192, 192, 0.6)'
          : 'rgba(153, 102, 255, 0.6)',
      borderColor:
        platform === 'instagram'
          ? 'rgba(255, 99, 132, 1)'
          : platform === 'twitter'
          ? 'rgba(54, 162, 235, 1)'
          : platform === 'linkedin'
          ? 'rgba(75, 192, 192, 1)'
          : 'rgba(153, 102, 255, 1)',
      borderWidth: 2,
    }));
  
    const data = {
      labels,
      datasets,
    };
  
    const options = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: `${metric.charAt(0).toUpperCase() + metric.slice(1)} Comparison`,
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
            text: metric.charAt(0).toUpperCase() + metric.slice(1),
          },
          min: 0,
          max: 100,
        },
      },
    };
  
    return <Bar data={data} options={options} />;
  };
  
  const MetricsDashboard = () => {
    const [selectedPlatforms, setSelectedPlatforms] = useState([
      'instagram',
      'twitter',
      'linkedin',
      'facebook',
    ]);
    const [metric, setMetric] = useState('views');
  
    // Handle checkbox changes
    const handleCheckboxChange = (e) => {
      const { name, checked } = e.target;
      setSelectedPlatforms((prevPlatforms) =>
        checked
          ? [...prevPlatforms, name]
          : prevPlatforms.filter((platform) => platform !== name)
      );
    };
  
    return (
      <div>
        <h2>Social Media Metrics Dashboard</h2>
        <div>
          <h3>Select Social Media Platforms:</h3>
          <label>
            <input
              type="checkbox"
              name="instagram"
              checked={selectedPlatforms.includes('instagram')}
              onChange={handleCheckboxChange}
            />
            Instagram
          </label>
          <label>
            <input
              type="checkbox"
              name="twitter"
              checked={selectedPlatforms.includes('twitter')}
              onChange={handleCheckboxChange}
            />
            Twitter
          </label>
          <label>
            <input
              type="checkbox"
              name="linkedin"
              checked={selectedPlatforms.includes('linkedin')}
              onChange={handleCheckboxChange}
            />
            LinkedIn
          </label>
          <label>
            <input
              type="checkbox"
              name="facebook"
              checked={selectedPlatforms.includes('facebook')}
              onChange={handleCheckboxChange}
            />
            Facebook
          </label>
        </div>
  
        <div>
          <h3>Select Metric:</h3>
          <select value={metric} onChange={(e) => setMetric(e.target.value)}>
            <option value="views">Views</option>
            <option value="likes">Likes</option>
            <option value="shares">Shares</option>
          </select>
        </div>
  
        <div style={{ marginTop: '30px' , width: "95%"}} >
          <SocialMediaComparisonChart
            selectedPlatforms={selectedPlatforms}
            metric={metric}
          />
        </div>
      </div>
    );
  };
  
  export default MetricsDashboard;
  