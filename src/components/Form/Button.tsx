interface ButtonFormProps {
  text: string
  classString?: string
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
}
export default function ButtonForm({
  onClick,
  classString,
  text,
}: ButtonFormProps) {
  return (
    <button
      className={`${classString} text-white w-full h-11 rounded`}
      onClick={onClick}
    >
      {text}
    </button>
  )
}
