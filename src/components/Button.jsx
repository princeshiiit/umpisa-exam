import './Button.css';

const Button = ({ 
  children, 
  type = 'button', 
  variant = 'primary', 
  size = 'medium',
  onClick, 
  disabled = false,
  fullWidth = false,
  className = ''
}) => {
  const classes = `btn btn-${variant} btn-${size} ${fullWidth ? 'btn-full' : ''} ${className}`.trim();
  
  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
