const AboutItem = (prop) => {
  return (
    <div className="about-item-container">
      <div className="about-item-icon">{prop.icon}</div>
      <h4 className="about-item-title">{prop.itemTitle}</h4>
      <p className="about-item-description">{prop.itemDescription}</p>
    </div>
  );
};
export default AboutItem;
