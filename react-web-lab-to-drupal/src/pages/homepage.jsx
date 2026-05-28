import { useState } from "react";

function Home({ user, setUser }) {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState(""); 
  
  const [addingStudent, setAddingStudent] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [editName, setEditName] = useState("");
  const [editSurname, setEditSurname] = useState("");
  const [editClassId, setEditClassId] = useState(""); 
  const [editPhone, setEditPhone] = useState("");
  const [editEmail, setEditEmail] = useState("");     

  const fetchStudents = async () => {
    setError(""); 
    try {
      const response = await fetch('http://127.0.0.1:8000/main/student', {
        method: 'GET',
        headers: { 
          'Authorization': `Basic ${btoa(user.username + ':' + user.password)}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`Помилка сервера: ${response.status}`);
      }

      const data = await response.json();
      setStudents(data);

    } catch (err) {
      console.error("Помилка при отриманні студентів:", err);
      setError("Не вдалося завантажити список студентів.");
    }
  };

  const openEditPage = (student) => {
    setEditingStudent(student);
    setEditName(student.name);
    setEditSurname(student.surname);
    setEditClassId(student.class_id); 
    setEditPhone(student.phone);
    setEditEmail(student.email);
  };

  const saveStudentChanges = async (e) => {
    e.preventDefault();
    setError("");

  
    const updatedData = { 
      name: editName, 
      surname: editSurname,
      class_id: editClassId ? Number(editClassId) : null, 
      phone: editPhone || null,
      email: editEmail
    };

    try {
      const response = await fetch(`http://127.0.0.1:8000/main/student/${editingStudent.id}`, {
        method: 'PUT',
        headers: { 
          'Authorization': `Basic ${btoa(user.username + ':' + user.password)}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedData)
      });

      if (!response.ok) {
        
        const errorData = await response.json().catch(() => ({}));
        
        throw new Error(`Помилка збереження: ${response.status}`);
      }

      setStudents(students.map(s => 
        s.id === editingStudent.id ? { ...s, ...updatedData } : s
      ));

      setEditingStudent(null);

    } catch (err) {
      console.error("Помилка при збереженні:", err);
      setError(err.message || "Не вдалося зберегти зміни.");
    }
  };

const deleteStudent = async (id) => {
    setError("");
    try {
      const response = await fetch(`http://127.0.0.1:8000/main/student/${id}`, {
        method: 'DELETE',
        headers: { 
          'Authorization': `Basic ${btoa(user.username + ':' + user.password)}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
  
        const errorData = await response.json().catch(() => ({}));
        
        throw new Error(`Помилка видалення: ${response.status}`);
      }
      setStudents(students.filter(student => student.id !== id));

    } catch (err) {
      
      setError(err.message || "Не вдалося видалити.");
    }

    
  };

    const resetForm = () => {
    setEditName("");
    setEditSurname("");
    setEditClassId("");
    setEditPhone("");
    setEditEmail("");
    };

const openCreatePage = () => {
    resetForm();
    setAddingStudent(true);
    setEditingStudent(null);
  };


  const creatingStudent = async () => {
    setError("");




  
    const updatedData = { 
      name: editName, 
      surname: editSurname,
      class_id: editClassId ? Number(editClassId) : null, 
      phone: editPhone || null,
      email: editEmail
    };

    try {
      const response = await fetch(`http://127.0.0.1:8000/main/student`, {
        method: 'POST',
        headers: { 
          'Authorization': `Basic ${btoa(user.username + ':' + user.password)}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedData)
      });

      if (!response.ok) {
        
        const errorData = await response.json().catch(() => ({}));
        
        throw new Error(`Помилка створення: ${response.status}`);
      }

      setStudents(students.map(s => 
        s.id === editingStudent.id ? { ...s, ...updatedData } : s
      ));

      setAddingStudent(false);

    } catch (err) {
      console.error("Помилка при створенні:", err);
      setError(err.message || "Не вдалося створити.");
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  if (addingStudent) {
    return(
      <div>
        <h2>Додавання студента</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}

        <form onSubmit={creatingStudent}>
          <div>
            <label>Ім'я: </label>
            <input type="text" onChange={(e) => setEditName(e.target.value)} required />
          </div>
          
          <div>
            <label>Прізвище: </label>
            <input type="text" onChange={(e) => setEditSurname(e.target.value)} required />
          </div>

          <div>
            <label>ID Класу (Цифра): </label>
            <input type="number" onChange={(e) => setEditClassId(e.target.value)} />
          </div>

          <div>
            <label>Телефон: </label>
            <input type="tel" onChange={(e) => setEditPhone(e.target.value)} />
          </div>

          <div>
            <label>Email: </label>
            <input type="email" onChange={(e) => setEditEmail(e.target.value)} required/>
          </div>
          
          <br />
          <button type="submit">Створити</button>
          <button type="button" onClick={() => setAddingStudent(null)}>Назад до списку</button>
        </form>
      </div>
    );
  } else if (editingStudent) {
    return (
      <div>
        <h2>Редагування студента (ID: {editingStudent.id})</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}

        <form onSubmit={saveStudentChanges}>
          <div>
            <label>Ім'я: </label>
            <input type="text" value={editName} onChange={(e) => setEditName(e.target.value)} required />
          </div>
          
          <div>
            <label>Прізвище: </label>
            <input type="text" value={editSurname} onChange={(e) => setEditSurname(e.target.value)} required />
          </div>

          <div>
            <label>ID Класу (Цифра): </label>
            <input type="number" value={editClassId} onChange={(e) => setEditClassId(e.target.value)} />
          </div>

          <div>
            <label>Телефон: </label>
            <input type="tel" value={editPhone} onChange={(e) => setEditPhone(e.target.value)} />
          </div>

          <div>
            <label>Email: </label>
            <input type="email" value={editEmail} onChange={(e) => setEditEmail(e.target.value)} required />
          </div>
          
          <br />
          <button type="submit">Зберегти</button>
          <button type="button" onClick={() => setEditingStudent(null)}>Назад до списку</button>
        </form>
      </div>
    );
  }

  
  return (
    <div>
      <h1>Головна сторінка</h1>
      <p>Вітаємо, {user.username}!</p>
      
      <button onClick={fetchStudents}>Показати студентів</button>
      <button onClick={openCreatePage}>Створити</button>
      <button onClick={handleLogout}>Вийти</button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <h3>Список студентів:</h3>
      {students.length === 0 ? (
        <p>Список порожній. Натисніть кнопку вище.</p>
      ) : (
        <ul>
          {students.map((student, index) => (
            <li key={student.id || index} style={{ marginBottom: "10px" }}>
              {student.name} {student.surname} | ID Класу: {student.class_id || "немає"} | Тел: {student.phone || "немає"} | Email: {student.email} {" "}
              <button onClick={() => openEditPage(student)}>Змінити</button>
              <button onClick={() => deleteStudent(student.id)}>Видалити</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Home;