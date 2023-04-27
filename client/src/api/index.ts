interface Options {
  method: string;
  headers: Headers;
  body: string;
  signal: AbortSignal;
}

/**
 * Defines the base URL for the API.
 * The default values is overridden by the `API_BASE_URL` environment variable.
 */
const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

/**
 * Defines the default headers for these functions to work with `json-server`
 */
const headers = new Headers();
headers.append("Content-Type", "application/json");

/**
 * Fetch `json` from the specified URL and handle error status codes and ignore `AbortError`s
 *
 * This function is NOT exported because it is not needed outside of this file.
 *
 * @param url
 *  the url for the requst.
 * @param options
 *  any options for fetch
 * @param onCancel
 *  value to return if fetch call is aborted. Default value is undefined.
 * @returns {Promise<Error|any>}
 *  a promise that resolves to the `json` data or an error.
 *  If the response is not in the 200 - 399 range the promise is rejected.
 */
async function fetchJson(url: string, options: Options): Promise<Error | any> {
  try {
    const response = await fetch(url, options);

    if (response.status === 204) {
      return null;
    }

    const payload = await response.json();

    if (payload.error) {
      return Promise.reject({ message: payload.error });
    }
    return payload.data;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }
}

interface User {
  id?: string;
  email: string;
  password: string;
}

/** POST a new reservation to the database
 *
 * @param user
 *  the new user data
 * @param signal
 *  optional AbortController.signal
 * @returns {Promise<User>}
 *  a promise that resolves the saved user
 */
export async function createUser(
  data: User,
  signal: AbortSignal
): Promise<User> {
  const url = `${API_BASE_URL}/register`;
  const options = {
    method: "POST",
    headers,
    body: JSON.stringify({ data }),
    signal,
  };
  return await fetchJson(url, options);
}

export async function loginUser(
  data: User,
  signal: AbortSignal
): Promise<User> {
  const url = `${API_BASE_URL}/auth`;
  const options = {
    method: "POST",
    headers,
    body: JSON.stringify({ data }),
    signal,
  };
  return await fetchJson(url, options);
}
