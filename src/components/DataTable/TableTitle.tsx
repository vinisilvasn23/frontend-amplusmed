interface TableTitleProps {
  message: string
}

export default function TableTitle({ message }: TableTitleProps) {
  return (
    <h1 className="text-blue-dark-700 dark:text-white font-bold text-24">
      {message}
    </h1>
  )
}
