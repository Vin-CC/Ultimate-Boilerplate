export type ActionErrorType = "user_already_exist" | "unexpected_error";

export class ActionError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ActionError";
  }
}

export function getErrorMessage(error: unknown) {
  let message: string;

  if (error instanceof ActionError) {
    message = error.message;
  } else if (error instanceof Error) {
    message = error.message;
  } else if (error && error instanceof Object && "message" in error) {
    message = String(error.message);
  } else if (typeof error === "string") {
    message = error;
  } else {
    message = "something_went_wrong";
  }

  return message;
}
