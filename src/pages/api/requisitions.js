import { ROOT_URL, REQUISITIONS_PATH } from "@/utils/constants";

export default async function handler(req, res) {
  try {
    const authToken = req.headers.authorization || ''; // Extract the Authorization header
    const response = await fetch(ROOT_URL + REQUISITIONS_PATH, {
      headers: {
        Authorization: authToken,
      },
    });
    
    if (!response.ok) {
      throw new Error('API request failed');
    }
    
    const data = await response.json();
    console.log(data)
    res.status(200).json(data);
    
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'An error occurred while fetching data' });
  }
}