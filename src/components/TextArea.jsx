import PropTypes from 'prop-types';
import { CircleX, CircleCheck } from 'lucide-react';

const TextArea = ({
  id,
  name,
  placeholder,
  value,
  onChange,
  error,
  touched,
  rows = 3,
  disabled = false
}) => {
  return (
    <div>
      <label htmlFor={id} className="text-slate-700 dark:text-slate-100 block mb-1">
        {placeholder}
      </label>
      <div className="relative text-white-dark">
        <textarea
          name={name}
          id={id}
          value={value}
          onChange={onChange}
          disabled={disabled}
          rows={rows}
          className="w-full rounded-md border border-slate-400 bg-white px-4 py-2 text-sm font-normal text-slate-700 !outline-none focus:border-primary focus:ring-transparent dark:border-slate-700 dark:bg-slate-800 dark:text-slate-50 dark:focus:border-primary placeholder:text-slate-700 dark:placeholder:text-slate-400"
          placeholder={placeholder}
        />
        {touched && (
          <span className="absolute end-4 top-4">
            {error ? <CircleX size={20} color="red" /> : <CircleCheck size={20} color="green" />}
          </span>
        )}
      </div>
      {error && (
        <p className="text-red-500 text-xs mt-1">
          {error}
        </p>
      )}
    </div>
  );
};

TextArea.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  touched: PropTypes.bool,
  rows: PropTypes.number,
  disabled: PropTypes.bool
};

export default TextArea;