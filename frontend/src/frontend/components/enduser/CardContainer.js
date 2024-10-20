import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from './Card';
import InstaBatteryLevelChart from './InstaBatteryLevelChart';

const CardContainer = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPostData, setSelectedPostData] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/getAllPosts');
        if (Array.isArray(response.data)) {
          setPosts(response.data);
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
    console.log(post.analyticsData[0]);
    const metricData = post.analyticsData.map(data => {
        
      const date = new Date(data.timestamp);
      console.log("Parsed date:", date);
      return {
        likes: { x: date, y: data.likesCount },
        comments: { x: date, y: data.commentsCount },
        views: { x: date, y: data.viewsCount },
      };
    });
  
    console.log(metricData);
    setSelectedPostData(metricData);
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
        <InstaBatteryLevelChart 
          metricData={selectedPostData} 
          onBackClick={handleBackClick} // Pass the back click handler
        />
      ) : (
        <div className="card-container">
          {posts.map(post => (
            <Card 
              key={post.id}
              backgroundColor="#f9f9f9" 
              textColor="#1976d2" 
              borderColor="#1976d2"
              imageSrc={`http://localhost:8080/api/proxy-image?url=${encodeURIComponent(post.analyticsData[0]?.imageUrl || '')}`}
              description={post.analyticsData[post.analyticsData.length - 1]?.caption || "No description available"}
              commentCount={post.analyticsData[post.analyticsData.length - 1]?.commentsCount || 0}
              likeCount={post.analyticsData[post.analyticsData.length - 1]?.likesCount || 0}
              viewCount={post.analyticsData[post.analyticsData.length - 1]?.viewsCount || 0}
              onClick={() => handleCardClick(post)} 
            />
          ))}
        </div>
      )}
    </>
  );
};

export default CardContainer;
