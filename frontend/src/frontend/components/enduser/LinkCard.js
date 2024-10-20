import React from 'react';
import './Card.css';
import CommentIcon from '@mui/icons-material/Comment';
import FavoriteIcon from '@mui/icons-material/Favorite';
import VisibilityIcon from '@mui/icons-material/Visibility';
import StarIcon from '@mui/icons-material/Star';

const LinkCard = ({ onClick, backgroundColor, textColor, borderColor, imageSrc, description, commentCount, reactionCount, praiseCount }) => {

  const cardStyle = {
    backgroundColor: backgroundColor,
    border: `2px solid ${borderColor}`,
  };

  const textStyle = {
    color: textColor,
  };

  // Limit the caption length
  const truncateText = (text, limit) => {
    if (text.length > limit) {
      return text.substring(0, limit) + '...';
    }
    return text;
  };

  const handleClick = (event) => {
    event.stopPropagation();
    onClick();
  };

  return (
    <div className="card" style={cardStyle} onClick={handleClick}>
      <div className="cardbody">
        {imageSrc ? (
          <img src={imageSrc} alt="No photo" />
        ) : (
          <div className="no-photo">No photo available</div>
        )}
      </div>
      <p className="cardtext" style={textStyle}>
        {description.substring(0, 30)}
      </p>
      <div className="cardfooter">
        <div className="cardicon" style={textStyle}>
          <CommentIcon />
          <span>{commentCount}</span>
        </div>
        <div className="cardicon" style={textStyle}>
          <FavoriteIcon />
          <span>{reactionCount}</span>
        </div>
        <div className="cardicon" style={textStyle}>
          <StarIcon/>
          <span>{praiseCount}</span>
        </div>
      </div>
    </div>
  );
};

export default LinkCard;
