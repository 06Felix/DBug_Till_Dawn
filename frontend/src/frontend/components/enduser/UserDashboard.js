import { useState, useContext, useEffect } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import '../marketing/dashboard.css';
import { UserContext } from '../../../UserContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import InstaBatteryLevelChart from './InstaBatteryLevelChart';
import TwitBatteryLevelChart from './TwitBatterLevelChart';
import LinkBatteryLevelChart from './LinkBatterLevelChart';
import MetricsDashboard from './MetricsDashboard';
import CardContainer from './CardContainer';
import LinkCardContainer from './LinkCardContainer';

function UserDashboard() {
  const { auth, user } = useContext(UserContext);
  const [openSidebarToggle, setOpenSidebarToggle] = useState(true);
  const [activeItem, setActiveItem] = useState('Instagram');
  const navigate = useNavigate();

  const [jwtToken, setJwtToken] = useState(localStorage.getItem('jwtToken'));
  const [tokenExpiration, setTokenExpiration] = useState(localStorage.getItem('tokenExpiration'));
  const [userRole, setUserRole] = useState(localStorage.getItem('userRole'));
  const [userEmail, setUserEmail] = useState(localStorage.getItem('userEmail'));

  useEffect(() => {
      const checkAuth = () => {
          if (userRole !== 'user' || !jwtToken || Date.now() > tokenExpiration) {
              navigate('/login');
            }
        };
        checkAuth();
        const intervalId = setInterval(checkAuth, 20000);
        return () => clearInterval(intervalId);
    }, [userRole, jwtToken, tokenExpiration, navigate]);
    
//   useEffect(() => {
//     console.log("Component mounted");
  
    const fetchInstagramData = async () => {
        const options = {
                method: 'GET',
                url: 'https://instagram-api-20231.p.rapidapi.com/api/user_posts_from_username/puma',
                headers: {
                    'x-rapidapi-key': '9ffd119c51msh65b8813de7641b1p160c63jsna3e8bc120482',
                    'x-rapidapi-host': 'instagram-api-20231.p.rapidapi.com'
                }
            };
            
            try {
                const response = await axios.request(options);
                const posts = response.data.data.items;
                console.log(posts);
                const analyticsData = posts.map(post => ({
                    likeCount: post.like_count,
                    caption: post.caption.text,
                    commentCount: post.comment_count,
                    playCount: post.play_count,
                    timestamp: new Date().toISOString(),
                    imageUrl: post.image_versions2.candidates[0].url
                
                }));
                await Promise.all(analyticsData.map(async (data) => {
                    try {
                        const response = await axios.post('http://localhost:8080/api/postAnalytics', null, {
                            params: {
                                likeCount: data.likeCount,
                                caption: data.caption,
                                commentCount: data.commentCount,
                                playCount: data.playCount || 0,
                                timestamp: data.timestamp,
                                imageUrl: data.imageUrl
                            }
                        });                        
                        console.log('Successfully posted analytics data:', response.data);
                    } catch (postError) {
                        console.error('Error posting analytics data:', postError);
                    }
                }));
                
                console.log(analyticsData);
                    
            } 
            catch (error) {
                console.error(error);
            }
    };
    const fetchLinkedInData = async () =>{
        const options = {
            method: 'GET',
            url: 'https://li-data-scraper.p.rapidapi.com/get-profile-posts',
            params: {
              username: 'prateek7248'
            },
            headers: {
              'x-rapidapi-key': 'e12c0f0426msh4b4df90073d9116p1eb601jsn3e61d27169ca',
              'x-rapidapi-host': 'li-data-scraper.p.rapidapi.com'
            }
          };
          
          try {
              const response = await axios.request(options);
              const data = response.data.data;
              console.log(data[0].likeCount);
              const transformedData = data.map(post => ({
                  caption: post.text,
                  reactionCount: post.totalReactionCount || 0,
                  likeCount: post.likeCount || 0,
                  praiseCount: post.praiseCount || 0,
                  commentCount: post.commentsCount || 0,
                  empathyCount: post.empathyCount || 0, 
                  timestamp: new Date().toISOString(),
                  imageUrl: post.image? post.image[0].url : "https://www.socialchamp.io/wp-content/uploads/2023/12/Content-Blog-Banner_Q4-2023_1125x600_30_What-to-Post-on-LinkedIn.png"
                }));
                console.log(transformedData);
              await Promise.all(transformedData.map(async (data) => {
                try {
                    // console.log(data.commentCount);
                    const response = await axios.post('http://localhost:8080/api/linkedPostAnalytics', null, {
        
                        params: {
                            caption: data.caption,
                            reactionCount: data.reactionCount || 0,
                            likeCount: data.likeCount || 0,
                            praiseCount: data.praiseCount || 0,
                            commentCount: data.commentCount || 0,
                            empathyCount: data.empathyCount, 
                            timestamp: data.timestamp,
                            imageUrl: data.imageUrl
                        }
                    });                        
                    console.log('Successfully posted analytics data:', response.data);
                } catch (postError) {
                    console.error('Error posting analytics data:', postError);
                }
            }));
          } catch (error) {
              console.error(error);
          }
    }
        
    //     fetchInstagramData();
    //     const intervalId = setInterval(fetchInstagramData, 1800000);
    //     return () => clearInterval(intervalId);

    // }, [user]);
        
        
    const OpenSidebar = async () => {
        setOpenSidebarToggle(!openSidebarToggle);
        // fetchInstagramData();
        fetchLinkedInData();
    };

    return (
        <div className={`combinelay ${openSidebarToggle ? 'sidebar-open' : 'sidebar-closed'}`}>
        <div className='grid-container'>
            <Sidebar
            openSidebarToggle={openSidebarToggle}
            setActiveItem={setActiveItem}
            activeItem={activeItem}
            />
            <div className='main-content'>
            <Header OpenSidebar={OpenSidebar} openSidebarToggle={openSidebarToggle} />
            {/* {activeItem === 'Instagram' && <InstaBatteryLevelChart />} */}
            {activeItem === 'Instagram' && <CardContainer />}
            {activeItem === 'LinkedIn' && <LinkCardContainer/>}
            {activeItem === 'Twitter' && <TwitBatteryLevelChart />}
            {activeItem === 'Comparision' && <MetricsDashboard />}
            {/* {activeItem === 'Reports' && <></>} */}
            </div>
        </div>
        </div>
    );
}

export default UserDashboard;
