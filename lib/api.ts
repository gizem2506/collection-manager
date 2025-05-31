import axios from "axios"

export const getCollections = async (token: string, page: number = 1, pageSize: number = 10) => {
  const response = await axios.get(`${process.env.API_BASE_URL}/Collection/GetAll`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    params: {
      page: page,
      pageSize: pageSize
    }
  })

  return response.data
}
