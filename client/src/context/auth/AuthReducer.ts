import { User } from "../../api";

type AuthAction = {
  errorMessage?: string;
  type: "LOGIN_ERROR" | "LOGIN_SUCCESS" | "LOGOUT" | "REQUEST_LOGIN" | "";
  user?: User;
};

interface InitialAuthState {
  errorMessage?: string;
  isError: boolean;
  isLoaded: boolean;
  isLoading: boolean;
  user: User;
}

export const initialAuthState: InitialAuthState = {
  isError: false,
  isLoaded: false,
  isLoading: false,
  user: { id: "", email: "" },
};
export const authReducer = (
  state: InitialAuthState,
  action: AuthAction
): InitialAuthState => {
  switch (action.type) {
    case "LOGIN_ERROR":
      return {
        ...state,
        isError: true,
        isLoaded: false,
        isLoading: false,
        user: { id: "", email: "" },
      };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        isError: false,
        isLoaded: true,
        isLoading: false,
        user: action.user ? action.user : { id: "", email: "" },
      };
    case "LOGOUT":
      return {
        ...state,
        isError: false,
        isLoaded: false,
        isLoading: false,
        user: { id: "", email: "" },
      };
    case "REQUEST_LOGIN":
      return {
        ...state,
        isError: false,
        isLoaded: false,
        isLoading: true,
        user: { id: "", email: "" },
      };
    default:
      throw new Error("An unhandled authentication exception has occurred.");
  }
};
