import { useState, useCallback } from "react";
import useTranslate from "../hooks/useTranslate";
import "../style/ReviewForm.css";
import FileInput from "./FileInput";
import RatingInput from "./RatingInput";
import useAsync from "../hooks/useAsync";
const INITIAL_VALUES = { title: "", rating: 0, content: "", imgFile: null };

function ReviewForm({
  initialValues = INITIAL_VALUES,
  onSubmitSuccess,
  onCancel,
  initialPreview,
  onSubmit,
}) {
  const t = useTranslate();
  const [values, setValues] = useState(initialValues);
  const [isSubmitting, submittingError, onSubmitAsync] = useAsync(onSubmit);

  const handleChange = (name, value) => {
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    handleChange(name, value);
  };
  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("rating", values.rating);
      formData.append("content", values.content);
      formData.append("imgFile", values.imgFile);
      const result = await onSubmitAsync(formData);
      if (!result) return;

      const { review } = result;
      onSubmitSuccess(review);
      setValues(INITIAL_VALUES);
    },
    [onSubmitAsync]
  );

  return (
    <form className="ReviewForm" onSubmit={handleSubmit}>
      <FileInput
        name="imgFile"
        value={values.imgFile}
        onChange={handleChange}
        initialPreview={initialPreview}
      />
      <input name="title" value={values.title} onChange={handleInputChange} />
      <RatingInput
        name="rating"
        type="number"
        value={values.rating}
        onChange={handleChange}
      />
      <textarea
        name="content"
        value={values.content}
        onChange={handleInputChange}
      />

      <button disabled={isSubmitting} type="submit">
        {t("confirm button")}
      </button>
      {onCancel && <button onClick={onCancel}>{t("cancle button")}</button>}
      {submittingError?.message && <div>{submittingError.message}</div>}
    </form>
  );
}

export default ReviewForm;
