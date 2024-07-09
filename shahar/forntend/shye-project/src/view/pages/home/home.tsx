import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';

interface User {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    birthday: string;
    password: string;
}

const Home: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { email } = (location.state as any) || {};
    const [user, setUser] = useState<User | null>(null);
    const [error, setError] = useState('');
    const [showConfirm, setShowConfirm] = useState(false);

    const fetchUserData = async () => {
        try {
            const response = await axios.get('http://localhost:3001/api/user', {
                params: { email }
            });

            if (response.status === 200) {
                setUser(response.data);
            } else {
                setError(response.data.message || 'An error occurred');
            }
        } catch (error: unknown) {
            const axiosError = error as AxiosError;
            if (axiosError.response && axiosError.response.data && (axiosError.response.data as any).message) {
                setError((axiosError.response.data as any).message);
            } else {
                setError('An error occurred');
            }
        }
    };

    const handleDeleteAccount = async () => {
        if (!user) return;

        try {
            const response = await axios.delete(`http://localhost:3001/api/user`, {
                params: { email: user.email }
            });

            if (response.status === 200) {
                alert('Account deleted successfully');
                navigate('/');
            } else {
                setError(response.data.message || 'An error occurred');
            }
        } catch (error: unknown) {
            const axiosError = error as AxiosError;
            if (axiosError.response && axiosError.response.data && (axiosError.response.data as any).message) {
                setError((axiosError.response.data as any).message);
            } else {
                setError('An error occurred');
            }
        }
    };

    useEffect(() => {
        if (email) {
            fetchUserData();
        }
    }, [email]);

    return (
        <div>
            <h1>היוש {user && user.first_name + " " + user.last_name}</h1>
            <div>
                <button type="button">Edit Account</button>
            </div>
            <div>
                <button type="button" onClick={() => setShowConfirm(true)}>Delete This Account</button>
            </div>
            {showConfirm && (
                <div>
                    <p>Are you sure you want to delete this account?</p>
                    <button type="button" onClick={handleDeleteAccount}>Yes</button>
                    <button type="button" onClick={() => setShowConfirm(false)}>Cancel</button>
                </div>
            )}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default Home;