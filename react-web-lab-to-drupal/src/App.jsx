import { useState } from "react";
import Login from "./pages/login"; 
import Home from "./pages/homepage";  

function App() {
  // При завантаженні беремо дані з localStorage (якщо вони там є)
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });


  if (user) {
    return <Home user={user} setUser={setUser} />;
  }

  
  return <Login setUser={setUser} />;
}

export default App;