type textFieldProps = {
    value: string;
    id:string;
    type:string;
    placeHolder:string;
    onChange: Function;
  };
  
  
export function TextField(props: textFieldProps) {
    const { value, id, placeHolder, onChange,type } = props;
    return (
      <><label className="block mb-2 text-base font-medium text-gray-900 dark:text-white">
      {value}
    </label>
    <input
      type={type}
      id={id}
      className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      placeholder={placeHolder}
      required
      onChange={(e) => {
        onChange(e)
      }}
    /></>
    );
  }
  
  
  
  
  