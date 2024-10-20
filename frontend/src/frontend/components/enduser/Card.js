import React from 'react';
import './Card.css';
import CommentIcon from '@mui/icons-material/Comment';
import FavoriteIcon from '@mui/icons-material/Favorite';
import VisibilityIcon from '@mui/icons-material/Visibility';

const Card = ({ onClick, backgroundColor, textColor, borderColor, imageSrc, description, commentCount, likeCount, viewCount }) => {
  
  const cardStyle = {
    backgroundColor: backgroundColor,
    border: `2px solid ${borderColor}`,
  };

  const textStyle = {
    color: textColor,
  };
  
  const handleClick = (event) => {
    event.stopPropagation();
    onClick();
  };

  return (
    <div className="card" style={cardStyle} onClick={handleClick}>
      <div className="cardbody">
        <img src={imageSrc} alt="sample" />
      </div>
      <p className="cardtext" style={textStyle}>
        {description}
      </p>
      <div className="cardfooter">
        <div className="cardicon" style={textStyle}>
          <CommentIcon/>
          <span>{commentCount}</span>
        </div>
        <div className="cardicon" style={textStyle}>
          <FavoriteIcon/>
          <span>{likeCount}</span>
        </div>
        <div className="cardicon" style={textStyle}>
          <VisibilityIcon/>
          <span>{viewCount}</span>
        </div>
      </div>
    </div>
  );
};

export default Card;
