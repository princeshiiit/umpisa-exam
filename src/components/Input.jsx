import './Input.css';

const Input = ({
  label,
  name,
  type = 'text',
  value,
  onChange,
  onBlur,
  error,
  touched,
  placeholder,
  disabled = false,
  required = false,
  className = ''
}) => {
  const showError = touched && error;

  return (
    <div className={`input-group ${className}`.trim()}>
      {label && (
        <label htmlFor={name} className="input-label">
          {label}
          {required && <span className="input-required">*</span>}
        </label>
      )}
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        disabled={disabled}
        className={`input-field ${showError ? 'input-error' : ''}`}
        aria-invalid={showError ? 'true' : 'false'}
        aria-describedby={showError ? `${name}-error` : undefined}
      />
      {showError && (
        <span id={`${name}-error`} className="error-message">
          {error}
        </span>
      )}
    </div>
  );
};

export default Input;
