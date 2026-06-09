import { AxiosError, AxiosResponse } from "axios";

type BaseRequest<T, V> = (params?: T) => Promise<AxiosResponse<V>>;

type SuccessResponse<V> = {
  code: "success";
  data: V;
};

type ErrorResponse<E = AxiosError> = {
  code: "error";
  error: E;
  /** Server-returned error message, extracted from response body if available */
  message?: string;
  /** HTTP status code, extracted from response if available */
  status?: number;
};

type BaseResponse<V, E> =
  | Promise<SuccessResponse<V>>
  | Promise<ErrorResponse<E>>;

export const requestHandler =
  <T, V, E = AxiosError>(request: BaseRequest<T, V>) =>
  async (params?: T): Promise<BaseResponse<V, E>> => {
    try {
      const response = await request(params);
      return { code: "success", data: response.data };
    } catch (error) {
      const axiosError = error as AxiosError<{
        message?: string;
        error?: string;
        err?: string;
      }>;

      // Extract the most meaningful server error message
      const serverMessage =
        axiosError.response?.data?.message ??
        axiosError.response?.data?.error ??
        axiosError.response?.data?.err ??
        axiosError.message;

      return {
        code: "error",
        error: error as E,
        message: serverMessage,
        status: axiosError.response?.status,
      };
    }
  };
