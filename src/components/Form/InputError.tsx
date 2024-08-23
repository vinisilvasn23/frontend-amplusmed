interface InputErrorProps {
  message: string
}

export default function InputError({ message }: InputErrorProps) {
  return (
    <p className="bg-red-200 text-red-600 mt-2 pl-2 max-lg:text-white max-lg:bg-red-800 max-h-6">
      {message}
    </p>
  )
}
