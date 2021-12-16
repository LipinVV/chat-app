import React, {useState} from "react";
import {useMutation} from '@apollo/client';
import {ADD_USER_MUTATION, UPDATE_USERNAME_MUTATION} from "../graphql/Mutations";


export const UserManager = () => {

    const [name, setName] = useState('');
    const [mail, setMail] = useState('');
    const [userId, setUserId] = useState(0);

    const [createUser, {error}] = useMutation(ADD_USER_MUTATION);
    const addUser = () => {
            createUser({
                variables: {
                    username: name,
                    email: mail,
                }
            })
        if(error) {
            console.error(error)
        }
    }

    const [updateUser] = useMutation(UPDATE_USERNAME_MUTATION);
    const changeUserName = () => {
        updateUser({
            variables: {
                id: userId,
                username: name,
                email: mail,
            }
        })
        if(error) {
            console.error(error)
        }
    }

    return (
        <div>
            <div style={{display: 'grid', gridGap: '10px', width: '300px', margin: '0 auto'}}>
                Name<input type='text' value={name} onChange={(evt) => setName(evt.target.value)}/>
                Email<input type='text' value={mail} onChange={(evt) => setMail(evt.target.value)}/>
                ID<input type='number' value={userId} onChange={(evt) => setUserId(evt.target.value)}/>
                <button
                    type='button'
                    onClick={() => {
                        addUser();
                    }}
                >
                    Add user
                </button>
                <button
                    type='button'
                    onClick={() => {
                        changeUserName();
                    }}
                >
                    Update username
                </button>
            </div>
        </div>
    )
}