export const formatImageURL = (imageKey: string) => {
  if (process.env.NEXT_PUBLIC_NODE_ENV === 'production') {
    return `https://amplusmed.s3.amazonaws.com/${imageKey}`
  } else {
    const baseUrl = 'http://localhost:3333/files/'
    return `${baseUrl}${imageKey}`
  }
}
