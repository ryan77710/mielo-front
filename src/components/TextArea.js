const TextArea = (props) => {
  const { value, onChange, placeholder } = props;
  return (
    <textarea
      onChange={onChange}
      placeholder={placeholder}
      value={value}
    ></textarea>
  );
};
export default TextArea;
