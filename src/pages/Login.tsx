// ----------------------- Components -----------------------
import { useEffect } from "react";
import { useAuthContext } from "../common/hooks/useAuthContext";
import LoginForm from "../containers/LoginForm";

function Login() {
  const { dispatch } = useAuthContext();

  useEffect(() => {
    if (dispatch)
      dispatch({
        type: "LOGOUT",
        payload: {
          accessToken: "",
          user: {} as any,
        },
      });
  }, [dispatch]);

  return (
    <section className=" min-h-screen min-w-full bg-gradient-to-r from-primary to-light-primary lg:bg-none lg:bg-white grid grid-rows-1 lg:grid-rows-1 lg:grid-cols-2">
      <div className="text-white text-center grid place-content-center lg:bg-gradient-to-r lg:from-primary lg:to-light-primary">
        <div className="text-3xl font-bold p-5">
          RETO ITM
        </div>
      </div>
      <div className="flex items-center">
        <LoginForm />
      </div>
    </section>
  );
}

export default Login;
