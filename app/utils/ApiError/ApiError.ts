import { ResponseStatus } from '@/constants'

class ApiError extends Error {
  constructor(
    public message: string,
    public status: ResponseStatus
  ) {
    super(message)
    this.status = status
  }

  public static BadRequest(message: string) {
    return new ApiError(message, ResponseStatus.BAD_REQUEST)
  }

  public static NotFound(message: string) {
    return new ApiError(message, ResponseStatus.NOT_FOUND)
  }
}

export { ApiError }
