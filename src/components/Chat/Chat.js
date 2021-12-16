import {useRef, useState} from "react";
import './chat.css';

export const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [value, setValue] = useState('');
    const [userName, setUserName] = useState('');
    const socket = useRef();
    const [connection, setConnection] = useState(false);


    const messageHandler = async () => {
        const time = new Date();
        const message = {
            userName,
            message: value,
            id: Date.now(),
            event: 'message',
            time: time.toLocaleString(),
        }
        try {
            socket.current.send(JSON.stringify(message))
            setValue('');
        } catch (error) {
            console.error(error);
        }
    }

    const connect = () => {
        socket.current = new WebSocket(`wss://talk-a-lot.glitch.me/`)

        socket.current.onopen = () => {
            setConnection(true);

            const time = new Date();

            const message = {
                event: 'connection',
                userName,
                id: Date.now(),
                time: time.toLocaleString(),
            }
            socket.current.send(JSON.stringify(message))
        }
        socket.current.onmessage = event => {
            const message = JSON.parse(event.data)
            setMessages(prevState => [message, ...prevState])
        }
        socket.current.onclose = () => {
            console.log('closed')
        }
        socket.current.onerror = () => {
            console.log('error')
        }
    }

    // const disconnect = () => {
    //     setConnection(false)
    // }

    if (!connection) {
        return (
            <div>
                <div>
                    <h4>Login page</h4>
                    <input type='text' value={userName} onChange={(e) => {
                        setUserName(e.target.value);
                    }}/>
                    <button type='button' onClick={connect}>Login</button>
                </div>
            </div>
        )
    }
    console.log(messages)
    return (
        <div>
            <h4>Chat log</h4>
            <div className='chat__chat-zone'>
                <h4 style={{color: 'red'}}>Chat zone:</h4>
                {messages.map(msg => {
                    return (
                        <div className='chat__msg' key={msg.id}>
                            <div className='chat__msg' style={{display: 'block'}}>
                                <span><span>{msg.time}</span>{msg.userName}<span>: {msg.message}</span></span>
                            </div>
                            {msg.event === 'connection' && <div style={{color: 'green'}}>{msg.userName} is connected to Chat zone!</div>}
                        </div>
                    )
                })}
            </div>
            <div className='chat__typing-zone'>
                <input className='chat__message-input' value={value} type='text' onChange={(e) => setValue(e.target.value)}/>
                <button type='button' onClick={messageHandler}>Send message</button>
            </div>

            {/*<div>*/}
            {/*    <button type='button' onClick={disconnect}>Log out</button>*/}
            {/*</div>*/}
        </div>
    )
}