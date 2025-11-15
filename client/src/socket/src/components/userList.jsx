import React from 'react';


export default function UserList({ users }) {
return (
<aside className="user-list">
<h4>Online Users ({users.length})</h4>
<ul>
{users.map((u) => (
<li key={u.id}>{u.username}</li>
))}
</ul>
</aside>
);
}