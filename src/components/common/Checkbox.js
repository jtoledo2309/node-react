import classNames from "classnames";

import "./FormField.css";

const CheckBox = ({ className, label, ...props }) => {
  return (
    <div className={classNames("formField", className)}>
      <input {...props} />
      <label> {label}</label>
    </div>
  );
};

export default CheckBox;
