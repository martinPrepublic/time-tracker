export const getUsers = async () => {
  let response = await fetch(
    ` https://prepublicgmbh.mocoapp.com/api/v1/users`,
    {
      method: "GET",
      headers: {
        Authorization: "Token token=d076ad40c02eba73d1b35f3bc6144333",
        "Content-Type": "application/json"
      }
    }
  )
  let data = await response.json()

  return data
}

export const getActivities = async () => {
  const fromDate = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
    .toISOString()
    .slice(0, 10)
  const toDate = new Date().toISOString().slice(0, 10)
  const url = `https://prepublicgmbh.mocoapp.com/api/v1/activities?from=${fromDate}&to=${toDate}`

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: "Token token=d076ad40c02eba73d1b35f3bc6144333",
      "Content-Type": "application/json"
    }
  })

  const data = await response.json()

  return data
}
