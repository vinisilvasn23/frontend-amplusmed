import { FieldValues, Path, UseFormRegister } from 'react-hook-form'

type ModalSelectProps<T extends FieldValues> =
  React.SelectHTMLAttributes<HTMLSelectElement> & {
    label?: Path<T>
    labelName?: string
    register?: UseFormRegister<T>
    classString?: string
    classStringLabel?: string
    id: string
  }

export function DataSelect<T extends FieldValues>({
  children,
  register,
  label,
  labelName,
  id,
  classStringLabel,
  classString,
  ...rest
}: ModalSelectProps<T>) {
  return (
    <div className="flex flex-col">
      <label
        htmlFor={id}
        className={`${classStringLabel} text-18 text-blue-dark-700 font-semibold dark:text-white mb-1 `}
      >
        {labelName}
      </label>
      <select
        id={id}
        className={`${classString} outline-none transition-all focus:ring-2 w-full h-11 p-2 rounded mt-1 border-[1px] dark:bg-transparent dark:text-white border-aditional-gray-600 text-customGray bg-white bg-opacity-50`}
        {...(register && label ? register(label) : {})}
        {...rest}
      >
        {children}
      </select>
    </div>
  )
}
