import {useRef, useState} from "react";


export const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [value, setValue] = useState('');
    const [userName, setUserName] = useState('');
    const socket = useRef();
    const [connection, setConnection] = useState(false);


    const messageHandler = async () => {
        const message = {
            userName,
            message: value,
            id: Date.now(),
            event: 'message'
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
            console.log('opened')

            const message = {
                event: 'connection',
                userName,
                id: Date.now()
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
            <div>
                <input value={value} type='text' onChange={(e) => setValue(e.target.value)}/>
                <button type='button' onClick={messageHandler}>Send message</button>
            </div>
            <div>
                <h4 style={{color: 'red'}}>Chat zone:</h4>
                {messages.map(msg=> {
                    console.log(msg.event)
                    return (
                        <div key={msg.id}>
                            <div>{msg.event === 'connection'
                                ? <div style={{color: 'green'}}>user: {msg.userName} is connected to Chat zone!</div>
                                : <div style={{display: 'grid'}}>
                                    <span>{msg.userName}<span>: {msg.message}</span></span>
                                </div>
                            }</div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}