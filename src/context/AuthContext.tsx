// ----------------------- React -----------------------
import { createContext, useReducer, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { AuthApi } from "../api/auth.api";

interface AuthAction {
  type: "LOGIN" | "LOGOUT";
  payload: AuthPayload;
}

interface AuthPayload {
  user: User;
  accessToken: string;
}

interface AuthContext {
  user: User | null;
  accessToken: string | null;
  dispatch: ((payload: AuthAction) => void) | null;
}

interface User {
  name: string;
  role: Role;
  username: string;
}

export type Role = "administrator" | "logogenist";

export const AuthContext = createContext<AuthContext>({
  user: null,
  accessToken: null,
  dispatch: null,
});

export const authReducer = (state: any, action: AuthAction) => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem(
        "accessToken",
        JSON.stringify(action.payload.accessToken)
      );

      return action.payload;
    case "LOGOUT":
      localStorage.removeItem("user");
      localStorage.removeItem("accessToken");

      return { user: null, accessToken: null };
    default:
      return state;
  }
};

export const AuthContextProvider = () => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    accessToken: null,
  });

  const navigate = useNavigate();

  const isTokenValid = async (token: string) => {
    try {
      await AuthApi.profile(token);
      return true;
    } catch (error) {
      return false;
    }
  };

  const setUser = async () => {
    let user: any = undefined;
    let accessToken: any = undefined;

    try {
      user = JSON.parse(localStorage.getItem("user") || "");
      accessToken = JSON.parse(localStorage.getItem("accessToken") || "");
    } catch {}

    if (user && accessToken && (await isTokenValid(accessToken))) {
      dispatch({
        type: "LOGIN",
        payload: {
          user,
          accessToken,
        },
      });
    } else {
      navigate("/admin");
    }
  };

  useEffect(() => {
    setUser();
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      <Outlet />
    </AuthContext.Provider>
  );
};
