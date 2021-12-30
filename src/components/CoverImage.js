const CoverImage = ({ thumbnail, title, className }) => {
  return (
    <div className={`coverImage ${className}`}>
      {thumbnail && <img src={thumbnail} alt={title} />}
      {!thumbnail && (
        <div className="coverPlaceholder">
          <i className="fas fa-book fa-6x"></i>
        </div>
      )}
    </div>
  );
};

export default CoverImage;
