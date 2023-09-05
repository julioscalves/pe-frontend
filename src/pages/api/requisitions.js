/* API Route for Fetching Requisitions
 *
 * This Next.js API route is responsible for fetching requisition data from a remote server
 * based on the provided authorization token.
 */

import { ROOT_URL, REQUISITIONS_PATH } from "@/utils/constants";

export default async function handler(req, res) {
  try {
    const authToken = req.headers.authorization || "";
    const response = await fetch(ROOT_URL + REQUISITIONS_PATH, {
      headers: {
        Authorization: authToken,
      },
    });

    if (!response.ok) {
      throw new Error("API request failed");
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching data" });
  }
}
