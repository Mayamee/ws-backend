import { ApiError } from "@/utils";

export const getLogErrorMessage = (err: Error | ApiError) => {
  let errorMessage = "";
  if (err instanceof ApiError) {
    errorMessage = `${JSON.stringify({
      err,
      type: "api-error",
    })} ${new Date().toLocaleString()}`;
  } else {
    errorMessage = `${JSON.stringify({
      err,
      type: "Unexpected error",
    })} ${new Date().toLocaleString()}`;
  }
  return errorMessage;
};
