
import { baseUrl } from "../config";
import { setToken } from "../redux/Slice/authSlice";
import { store } from "../redux/store";

const clientId = `${process.env.REACT_APP_PUBLIC_CLIENT_ID}`;
const secretId = `${process.env.REACT_APP_SECRET_CLIETN_ID}`;

export const DEFAULT_DATE_FORMAT = "MM/DD/YYYY";
export const generateAccessToken = async (data) => {
  const url = `${baseUrl}/oauth/token`;
  const requestBody = new URLSearchParams({
    grant_type: "client_credentials",
    client_id: clientId,
    client_secret: secretId,
    scope: "deals.read deals.write companies.read companies.write deals.investors.write"
  }).toString();

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: requestBody,
    });

    if (!response.ok) {
      throw new Error("Failed to generate access token");
    }

    const responseData = await response.json();
    store.dispatch(setToken(responseData.access_token));
    window.location.reload()
    return responseData;
  } catch (error) {
    console.error("Error generating access token:", error);
    throw error;
  }
};

export function formatNumber(num) {
  const number = parseInt(num)
  if (number >= 1e6) {
    return (number / 1e6)?.toFixed(1) + 'M';
  }
  if (number >= 1e3) {
    return (number / 1e3)?.toFixed(0) + 'k';
  }
  return number?.toFixed(0) ?? 0;
}

