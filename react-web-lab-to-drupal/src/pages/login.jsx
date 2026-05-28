import { useState } from "react";

function Login({ setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    
    const userData = { username, password };

    
    localStorage.setItem("user", JSON.stringify(userData));

    setUser(userData);
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: "20px" }}>
      <h1>Вхід до системи</h1>
      <div>
        <input 
          placeholder="Ім'я користувача (Username)" 
          onChange={(e) => setUsername(e.target.value)} 
          required 
        />
      </div>
      <br />
      <div>
        <input 
          type="password" 
          placeholder="Пароль" 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
      </div>
      <br />
      <button type="submit">Увійти</button>
    </form>
  );
}

export default Login;