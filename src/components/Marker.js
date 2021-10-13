const Marker = (props) => {
  const { longitude, latitude, text, isUser, url } = props;
  return (
    <div
      className={isUser ? "isUser-marker" : "marker"}
      style={{
        position: "absolute",
        transform: "translate(-50%, -50%)",
      }}
      longitude={longitude}
      latidude={latitude}
    >
      {isUser ? "" : <img src={url} alt={text} />}
    </div>
  );
};
export default Marker;
