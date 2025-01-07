function FileInput({ name, value, onChange }) {
  const handleChange = (e) => {
    const nextValue = e.target.files[0];
    onChange(name, nextValue);
  };
  return <input onChange={handleChange} type="file" />;
}

export default FileInput;
