import React, { InputHTMLAttributes, useState } from 'react'
import { UseFormRegister } from 'react-hook-form'
import './style.css'
import { IoMdEye, IoMdEyeOff } from 'react-icons/io'
import InputMask from 'react-input-mask'

interface InputFormProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  classString?: string
  classStringDiv?: string
  classStringLabel?: string
  isPassword?: boolean
  register?: UseFormRegister<any>
  mask?: string
}

export const applyMaskCpf = (value: string | number) => {
  const cleaned = value.toString().replace(/\D+/g, '')

  const formatted = cleaned.replace(
    /(\d{3})(\d{3})(\d{3})(\d{2})/,
    '$1.$2.$3-$4',
  )

  return formatted
}

export const applyMaskPhone = (value: string | number) => {
  const cleaned = value.toString().replace(/\D+/g, '')
  const formatted = cleaned.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
  return formatted
}

export const applyMaskCnpj = (value: string | number) => {
  const cleaned = value.toString().replace(/\D+/g, '')
  const formatted = cleaned.replace(
    /(\d{2})(\d{3})(\d{4})(\d{2})/,
    '$1.$2.$3/$4',
  )
  return formatted
}

export default function InputForm({
  label,
  classString,
  classStringDiv,
  classStringLabel,
  isPassword,
  register,
  mask,
  ...props
}: InputFormProps) {
  const [showPassword, setShowPassword] = useState(false)

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div className={`flex flex-col`}>
      <label
        htmlFor={props.id}
        className={`${classStringLabel} text-18 text-blue-dark-700 dark:text-white font-semibold mb-1`}
      >
        {label}
      </label>
      {isPassword ? (
        <div className={` ${classStringDiv} relative w-full`}>
          <input
            {...(register && register(props.name || ''))}
            {...props}
            type={isPassword && showPassword === true ? 'text' : 'password'}
            className={`${classString} outline-none transition-all focus:ring-2 h-11 border-[1px] dark:bg-transparent dark:text-white border-aditional-gray-600 text-customGray pl-4 rounded mt-1 w-full`}
          />
          {isPassword ? (
            <span
              onClick={togglePasswordVisibility}
              className="text-2xl absolute top-[34%] right-2 transform-[translateY(-50%)] cursor-pointer"
            >
              {showPassword ? (
                <IoMdEyeOff className="text-blue-dark-700" />
              ) : (
                <IoMdEye className="text-blue-dark-700" />
              )}
            </span>
          ) : null}
        </div>
      ) : mask ? (
        <InputMask
          mask={mask}
          {...(register && register(props.name || ''))}
          {...props}
          className={`${classString} outline-none transition-all h-11 focus:ring-2 border-[1px] dark:bg-transparent dark:text-white border-aditional-gray-600 text-customGray pl-4 rounded mt-1 w-full`}
        />
      ) : (
        <input
          {...(register && register(props.name || ''))}
          {...props}
          className={`${classString} outline-none transition-all h-11 focus:ring-2 border-[1px] dark:bg-transparent dark:text-white border-aditional-gray-600 text-customGray pl-4 rounded mt-1 w-full`}
        />
      )}
    </div>
  )
}
