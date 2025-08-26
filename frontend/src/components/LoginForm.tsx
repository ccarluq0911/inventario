import { useState } from "react";
import { login } from "../api";

type Props = {
  onLogin: (token: string) => void;
};

export default function LoginForm({ onLogin }: Props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const token = await login(username, password);
      onLogin(token);
    } catch (e: any) {
      setError(e.message);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div>
        <label>Usuario:</label>
        <input value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div>
        <label>Contraseña:</label>
        <input
          type="password" value={password} onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );
}
