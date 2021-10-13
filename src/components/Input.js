const Input = (props) => {
  const handleValueChange = (event) => setValue((x) => event.target.value);
  const { value, setValue, type, placeholder } = props;
  return <input type={type} onChange={handleValueChange} placeholder={placeholder} value={value} />;
};
export default Input;
