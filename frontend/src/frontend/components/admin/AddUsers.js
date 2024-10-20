import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AddUsers.css';
const AddUsers = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user'); 
    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();
        if (!validateEmail(email)) {
            alert('Please enter a valid email address.');
            return;
        }
        try {
            const response = await axios.post(`http://localhost:8080/api/user/registerfromdash/${role}`, {
                email,
                password,
            });
            console.log(response);
            if (response.data === 1) {
                alert('User already Registered.');
                window.location.reload();
                return;
            } else {
                setEmail('');
                setPassword('');
                setRole('user');
                alert('Registered Successfully');
                return;
            }
        } catch (error) {
            console.error('There was an error registering the user!', error);
        }
    
      

        
    };
    function validateEmail(email) {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
    }
    return (

        <div className="admin-dashboard-container">
            <h1>LOGIN CREDENTIALS</h1>
            <form className="admin-form" onSubmit={handleSubmit}>
            <div className="admin-form-group">
                <label>Email:</label>
                <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                />
            </div>
            <div className="admin-form-group">
                <label>Password:</label>
                <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                />
            </div>
            <div className="admin-form-group">
                <label>Role:</label>
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="user">User</option>
                <option value="marketing">Marketer</option>
                <option value="analyst">Social Analyzer</option>
                </select>
            </div>
            <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default AddUsers
