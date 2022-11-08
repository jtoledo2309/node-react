const RadioButton = ({ className, forCheckbox, label, ...props }) => {
  return (
    <div className="radioButton">
      <label className="radioButton-label">
        <span>{label}</span>
        <input className="radioButton-input" autoComplete="off" {...props} />
      </label>
    </div>
  );
};

export default RadioButton;
