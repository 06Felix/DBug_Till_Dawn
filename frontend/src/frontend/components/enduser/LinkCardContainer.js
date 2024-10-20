import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from './Card';
import InstaBatteryLevelChart from './InstaBatteryLevelChart';
import LinkBatteryLevelChart from './LinkBatterLevelChart';
import LinkCard from './LinkCard';

const LinkCardContainer = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPostData, setSelectedPostData] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/getAllLinkPosts');
        if (Array.isArray(response.data)) {
          setPosts(response.data);
          console.log(response.data);
        } else {
          console.error('Expected array but got:', typeof response.data);
          setError('Unexpected data format');
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
        setError('Failed to fetch posts');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleCardClick = (post) => {
    const metricData = post.analyticsData.map(data => {
      const date = new Date(data.timestamp);
      console.log("Parsed date:", date); // Check if the date is valid
      return {
        likes: { x: date, y: data.likesCount },
        comments: { x: date, y: data.commentsCount },
        empathy: { x: date, y: data.empathyCount },
        praise: { x: date, y: data.praiseCount },
        reaction: { x: date, y: data.reactionCount },
        views: { x: date, y: data.viewsCount },
      };
    });
  
    console.log(metricData);
    setSelectedPostData(metricData); // Store all metric data with timestamps
  };
  
  const handleBackClick = () => {
    setSelectedPostData(null); // Reset the selected post data
  };

  if (loading) {
    return <p>Loading posts...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <>
      {selectedPostData ? (
        <LinkBatteryLevelChart
          metricData={selectedPostData} 
          onBackClick={handleBackClick} // Pass the back click handler
        />
      ) : (
        <div className="card-container">
          {posts.map(post => (
            <LinkCard
              key={post.id}
              backgroundColor="#f9f9f9" 
              textColor="#1976d2" 
              borderColor="#1976d2"
              imageSrc={`http://localhost:8080/api/proxy-image?url=${encodeURIComponent(post.analyticsData[0]?.imageUrl || '')}`} 
              description={post.analyticsData[post.analyticsData.length - 1]?.caption.substring(0, 100) + "..." || "No description available"}
              commentCount={post.analyticsData[post.analyticsData.length - 1]?.commentsCount || 0}
              empathyCount={post.analyticsData[post.analyticsData.length - 1]?.empathyCount || 0}
              praiseCount={post.analyticsData[post.analyticsData.length - 1]?.praiseCount || 0}
              reactionCount={post.analyticsData[post.analyticsData.length - 1]?.reactionCount || 0}
              onClick={() => handleCardClick(post)} 
            />
          ))}
        </div>
      )}
    </>
  );
};

export default LinkCardContainer;
