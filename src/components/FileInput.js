import { useEffect, useRef, useState } from "react";

function FileInput({ name, value, onChange, initialPreview }) {
  const inputRef = useRef();
  const [preview, setPreview] = useState(initialPreview);
  const handleChange = (e) => {
    const nextValue = e.target.files[0];
    onChange(name, nextValue);
  };
  const handleClearClick = () => {
    const inputNode = inputRef.current;
    if (!inputNode) return;

    inputNode.value = "";
    onChange(name, null);
  };
  useEffect(() => {
    if (!value) return;
    const nextPreview = URL.createObjectURL(value);
    setPreview(nextPreview);

    return () => {
      setPreview(initialPreview);
      URL.revokeObjectURL(nextPreview);
    };
  }, [value, initialPreview]);
  return (
    <div>
      <img accept="image/*" src={preview} alt="미리보기" />
      <input onChange={handleChange} type="file" ref={inputRef} />
      {value && <button onClick={handleClearClick}>X</button>}
    </div>
  );
}
export default FileInput;
