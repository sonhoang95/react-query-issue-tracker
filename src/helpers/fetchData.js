export const fetchData = async (url) => {
  const res = await fetch(url)
  const data = await res.json()
  console.log(data)
  return data
}
