import React, {useState} from "react";
import {useForm} from "react-hook-form";
import {createLogEntry} from "./API";

const LogEntryForm = ({location, onClose}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const {register, handleSubmit, errors} = useForm();

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      data.latitude = location.latitude;
      data.longitude = location.longitude;
      await createLogEntry(data);

      onClose();
    } catch (error) {
      console.error(error);
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <form className="entry-form" onSubmit={handleSubmit(onSubmit)}>
      {error && <span className="text-red">{error}</span>}
      <h3>Add new travel log entry</h3>

      <fieldset>
        <label htmlFor="title">Title <span className="text-red">*</span></label>
        <input type="text" name="title" id="title" ref={register({
          required: "This field is required",
          pattern: {
            value: /^[\w\s]{3,}$/i,
            message: "Minimum 3 characters are required"
          }
        })} />
        {errors.title && <small className="text-red">{errors.title.message}</small>}
      </fieldset>

      <fieldset>
        <label htmlFor="description">Description</label>
        <textarea name="description" id="description" ref={register} rows={3} />
      </fieldset>

      <fieldset>
        <label htmlFor="comments">Comments</label>
        <textarea name="comments" id="comments" ref={register} rows={3} />
      </fieldset>

      <fieldset>
        <label htmlFor="image">Image</label>
        <input type="text" name="image" id="image" ref={register} />
      </fieldset>

      <fieldset>
        <label htmlFor="visitDate">Visit Date <span className="text-red">*</span></label>
        <input type="date" name="visitDate" id="image" ref={register({
          required: "This field is required",
        })} />
        {errors.visitDate && <small className="text-red">{errors.visitDate.message}</small>}
      </fieldset>

      <fieldset>
        <button type="submit" disabled={loading}>{loading ? 'Creating Entry...' : 'Create Entry'}</button>
      </fieldset>
    </form>
  );
};

export default LogEntryForm;
