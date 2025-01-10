const InputLabel: React.FC<{ label: string; inputProps: React.InputHTMLAttributes<HTMLInputElement> }> = ({ label, inputProps }) => {
    return (
      <div className="input-wrapper">
        <label htmlFor={inputProps.id} className="block text-sm font-medium text-gray-700">{label}</label>
        <input {...inputProps} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
      </div>
    );
  };
  
  export default InputLabel;
  