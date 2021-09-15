const Marker = (props) => {
  return (
    <div
      style={{
        position: "absolute",
        transform: "translate(-50%, -50%)",
      }}
      longitude={props.longitude}
      latidude={props.latitude}
    >
      {props.text}
    </div>
  );
};
export default Marker;
