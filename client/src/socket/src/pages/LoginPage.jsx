import React, { useState } from 'react';
import { useUser } from '../context/UserContext';


export default function LoginPage({ onLogin }) {
const [name, setName] = useState('');
const { setUsername } = useUser();


const submit = (e) => {
e.preventDefault();
if (!name.trim()) return;
setUsername(name.trim());
onLogin(name.trim());
};


return (
<div style={{ maxWidth: 420, margin: '3rem auto' }}>
<h2>Join Chat</h2>
<form onSubmit={submit}>
<input
placeholder="Enter username"
value={name}
onChange={(e) => setName(e.target.value)}
/>
<button type="submit">Join</button>
</form>
</div>
);
}