import { useAuth } from "@/context";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

interface CustomFetchOptions extends RequestInit {
  token?: string;
}

const useFetch = () => {
  const { token: userToken } = useAuth();

  const fetcher = async <T>(
    url: string,
    options?: CustomFetchOptions,
    arg?: undefined
  ): Promise<T> => {
    const token = options?.token || userToken;
    const headers: { [key: string]: string } = token
      ? { Authorization: `Bearer ${token}` }
      : {};
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          "Content-Type": "application/json",
          ...headers,
          ...(options?.headers || {}),
        },
        body: JSON.stringify(arg),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return await response.json();
    } catch (error) {
      throw error;
    }
  };
  return fetcher;
};
const useCustomSWR = <T = any>(
  key: string,
  fetchOptions?: CustomFetchOptions
) => {
  const fetcher = useFetch();

  return useSWR<T>(key, (url: string) => fetcher<T>(url, fetchOptions));
};

const useCustomSWRMutation = <T>(
  key: string,
  fetchOptions?: CustomFetchOptions
) => {
  const fetcher = useFetch();

  return useSWRMutation(key, (url: string, { arg }: { arg: any }) => {
    return fetcher<T>(url, fetchOptions, arg);
  });
};
export { useCustomSWR as useSWR, useCustomSWRMutation as useSWRMutation };
