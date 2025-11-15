import React, { useState } from 'react';


export default function MessageInput({ sendMessage, setTyping }) {
const [value, setValue] = useState('');


const onChange = (e) => {
setValue(e.target.value);
setTyping(true);
};


const onSubmit = (e) => {
e.preventDefault();
if (!value.trim()) return;
sendMessage(value.trim());
setValue('');
setTyping(false);
};


return (
<form onSubmit={onSubmit} className="message-input">
<input
value={value}
onChange={onChange}
onBlur={() => setTyping(false)}
placeholder="Type your message..."
/>
<button type="submit">Send</button>
</form>
);
}