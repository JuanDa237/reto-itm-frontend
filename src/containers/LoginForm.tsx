// ----------------------- React -----------------------
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// ----------------------- Api -----------------------
import { AuthApi } from "../api/auth.api";
// ----------------------- Hooks -----------------------
import { useAuthContext } from "../common/hooks/useAuthContext";
import { useField } from "../common/hooks/useField";
// ----------------------- Components -----------------------
import Alert from "../components/Alert";
import Button from "../components/Button";
import Input from "../components/Input";

function LoginForm() {
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [loginState, setLoginState] = useState({
    triedToSend: false,
    message: "",
    error: false,
  });

  const onEnterPassword = (event: any) => {
    if (event.key === "Enter") {
      save();
    }
  };

  const [username] = useField({ name: "username", type: "text" });
  const [password] = useField({
    name: "password",
    type: "password",
    onKeyDown: onEnterPassword,
  });

  const save = async () => {
    setIsLoading(true);
    setLoginState({
      ...loginState,
      triedToSend: false,
    });

    try {
      const payload = await AuthApi.login(username.value, password.value);

      if (dispatch) dispatch({ type: "LOGIN", payload });

      navigate("/admin");
    } catch (error) {
      setLoginState({
        triedToSend: true,
        message: "El usuario o la contraseña son incorrectos",
        error: true,
      });
    }

    setIsLoading(false);
  };

  return (
    <form className="w-full mx-5">
      <div className="mb-3">
        <Input
          label="Usuario"
          id="username"
          placeholder="jhon-doe"
          labelClass="text-white lg:text-black"
          inputProps={username}
        ></Input>
      </div>
      <div className="mb-3">
        <Input
          label="Contraseña"
          id={password.id}
          placeholder="****"
          labelClass="text-white lg:text-black"
          inputProps={password}
        ></Input>
      </div>
      <div className="mb-3">
        {loginState.triedToSend && (
          <Alert
            type={loginState.error ? "error" : "success"}
            message={loginState.message}
          />
        )}
      </div>
      <div className="mb-3">
        <Button
          text="Ingresar"
          onClick={() => {
            save();
          }}
          isLoading={isLoading}
        />
      </div>
    </form>
  );
}

export default LoginForm;
