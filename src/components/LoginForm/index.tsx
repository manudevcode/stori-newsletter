import { useState } from "react";
import { Input } from "../Input";
import { ArrowRightCircleIcon } from "@heroicons/react/20/solid";
import api from "../../services/api";
import { TOKEN, USER } from "../../constants/local-storage";
import { useAuth } from "../../hooks/useAuth";
import { AUTH } from "../../services/api/routes";

const LoginForm = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const { setUser } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const { data } = await api.post(AUTH, credentials);

    if (data?.token) {
      localStorage.setItem(TOKEN, data.token);
      localStorage.setItem(USER, JSON.stringify(data.userData));
      setUser(data?.userData);
      window.location.href = "/";
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({
      ...credentials,
      [e.target.id]: e.target.value,
    });
  };

  return (
    <div className="my-6">
      <h1 className="text-5xl font-bold text-primary mb-3">Sign in</h1>
      <h2 className="text-3xl font-medium text-primary mb-3">
        Please enter your credentials
      </h2>
      <form onSubmit={handleSubmit}>
        <Input
          id="email"
          value={credentials.email}
          type="email"
          placeHolder="E-mail"
          onChange={handleChange}
        />
        <Input
          id="password"
          value={credentials.password}
          type="password"
          placeHolder="Password"
          onChange={handleChange}
        />
        <button
          className="button large rounded-full w-full mt-3 text-secondary flex items-center hover:shadow-md justify-between"
          disabled={loading}
          type="submit"
        >
          <span className="flex justify-center  w-full">
            <span>{loading ? "Loading..." : "Sign in"}</span>
          </span>
          <ArrowRightCircleIcon className="h-10 text-white" />
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
