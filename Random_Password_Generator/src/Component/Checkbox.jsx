// Checkbox.js
const Checkbox = ({ label, checked, onChange }) => {
  return (
    <div className="flex justify-between px-2 my-2">
      <label className="text-lg">{label}</label>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="w-4 h-4 border-2 border-gray-500 rounded-md my-2"
      />
    </div>
  );
};

export default Checkbox;
