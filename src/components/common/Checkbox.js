const CheckBox = ({ label, ...props }) => {
  return (
    <div className="checkbox-general">
      <input {...props} />
      <label> {label}</label>
    </div>
  );
};

export default CheckBox;
