/* API Route for Token Verification
 *
 * This Next.js API route is designed to handle token verification requests. It verifies the
 * validity of a provided authorization token by making a POST request to a remote server.
 */
import { ROOT_URL, TOKEN_VERIFICATION_PATH } from "@/utils/constants";

export default async function handler(req, res) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ is_token_valid: false });
  }

  const token = authorization.replace("Token ", "");

  try {
    const response = await fetch(ROOT_URL + TOKEN_VERIFICATION_PATH, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    });

    if (response.ok) {
      const { is_token_valid, token } = await response.json();
      return res.status(200).json({ is_token_valid, token });
    } else {
      if (response.status === 401) {
        return res.status(401).json({ is_token_valid: false });
      } else if (response.status === 500) {
        return res.status(500).json({ is_token_valid: false });
      } else {
        return res.status(500).json({ is_token_valid: false });
      }
    }
  } catch (error) {
    return res.status(500).json({ is_token_valid: false });
  }
}
