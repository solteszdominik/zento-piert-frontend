export const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface ApiRequestOptions extends RequestInit {
  authToken?: string;
}

export async function apiRequest<TResponse>(
  endpoint: string,
  options: ApiRequestOptions = {},
): Promise<TResponse> {
  if (!API_URL) {
    throw new Error("Hiányzik a NEXT_PUBLIC_API_URL környezeti változó.");
  }

  const { authToken, headers, ...fetchOptions } = options;

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...fetchOptions,
    headers: {
      "Content-Type": "application/json",
      ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
      ...headers,
    },
  });

  if (!response.ok) {
    throw new Error("A kérés sikertelen volt.");
  }

  return response.json() as Promise<TResponse>;
}