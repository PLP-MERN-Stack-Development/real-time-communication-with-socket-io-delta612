import React from 'react';


export default function ChatWindow({ messages, typingUsers }) {
return (
<div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
<ul className="messages">
{messages.map((m) => (
<li key={m.id} className={m.system ? 'system' : ''}>
{m.system ? m.message : `${m.sender}: ${m.message}`}
</li>
))}
</ul>
{typingUsers && typingUsers.length > 0 && (
<div style={{ paddingTop: 8 }}>
<small>{typingUsers.join(', ')} {typingUsers.length > 1 ? 'are' : 'is'} typing...</small>
</div>
)}
</div>
);
}