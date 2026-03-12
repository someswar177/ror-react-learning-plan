import { useState, useEffect } from "react";

export default function UserForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    console.log("Users list updated", users);
  }, [users]);

  function handleSubmit(e) {
    e.preventDefault();

    if (!name || !email) {
      alert("All fields are required");
      return;
    }

    const newUser = { name, email };

    setUsers([...users, newUser]);

    setName("");
    setEmail("");
    setSubmitted(true);
  }

  return (
    <div>
      <h2>User Registration</h2>

      <form onSubmit={handleSubmit}>
        <div>
            <input
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        </div>

        <div>
            <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        </div>

        <button type="submit">Submit</button>
      </form>

      {submitted && <p>Form submitted successfully!</p>}

      <h3>Registered Users</h3>

      <ul>
        {users.map((user, index) => (
          <li key={index}>
            {user.name} - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
}