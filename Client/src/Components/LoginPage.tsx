import React, { useState } from "react";
import { Toaster, toast } from "react-hot-toast";

interface LoginProps {
  onLogin: (email: string, pass: string) => void;
  onRegister: (login: string, email: string, pass: string) => void;
}

export const LoginPage = ({ onLogin, onRegister }: LoginProps) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const validate = () => {
    if (!email) {
      toast.error("Email jest wymagany");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Niepoprawny format emaila");
      return false;
    }

    if (!password) {
      toast.error("Hasło jest wymagane");
      return false;
    }

    if (isRegistering) {
      if (!login) {
        toast.error("Login jest wymagany");
        return false;
      }
      if (login.length > 15) {
        toast.error("Login max 15 znaków");
        return false;
      }
      if (password.length < 5) {
        toast.error("Hasło musi mieć min. 5 znaków");
        return false;
      }

      const passRegex = /^(?=.*\d)(?=.*[\W_])[A-Z].*$/;
      if (!passRegex.test(password)) {
        toast.error("Hasło: wielka litera, cyfra i znak specjalny");
        return false;
      }
    }

    return true;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    if (isRegistering) {
      onRegister(login, email, password);
      setIsRegistering(false);
      setPassword("");
    } else {
      onLogin(email, password);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <Toaster position="top-center" />
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center mb-4 text-2xl">
            {isRegistering ? "Rejestracja" : "Logowanie"}
          </h2>

          {isRegistering && (
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Login</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
              />
            </div>
          )}

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              className="input input-bordered w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-control w-full mb-4">
            <label className="label">
              <span className="label-text">Hasło</span>
            </label>
            <input
              type="password"
              className="input input-bordered w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            />
          </div>

          <div className="card-actions justify-end mt-4">
            <button className="btn btn-primary w-full" onClick={handleSubmit}>
              {isRegistering ? "Zarejestruj się" : "Zaloguj się"}
            </button>
          </div>

          <div className="divider">LUB</div>

          <button
            className="btn btn-ghost w-full btn-sm"
            onClick={() => setIsRegistering(!isRegistering)}
          >
            {isRegistering
              ? "Masz już konto? Zaloguj się"
              : "Nie masz konta? Utwórz je"}
          </button>
        </div>
      </div>
    </div>
  );
};
