import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { refreshToken } from '../redux/Action/authAction';
import { Navigate, Route, Routes } from 'react-router-dom';
import Login from '../pages/Login';
import Register from '../pages/Register';
import LandingPage from '../pages/LandingPage';
import TodosLayouts from '../layouts/TodosLayouts';
import TodosDetailLayouts from '../layouts/TodosDetailLayouts';
import TodosCreateLayouts from '../layouts/TodosCreateLayouts';
import TodosUpdateLayouts from '../layouts/TodosUpdateLayouts';

const PrivateRoute = ({ children }) => {
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.auth);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const refresh = async () => {
            try {
                await dispatch(refreshToken()).unwrap();
            } catch (error) {
                console.error("Failed to refresh token");
            } finally {
                setLoading(false);
            }
        };

        refresh();
    }, [dispatch]);

    if (loading) {
        return <div></div>; // You can replace this with a spinner or loader component
    }

    const isAuthenticated = user.token !== null;

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    return children;
};

const Routers = () => {
    return (
        <div>
            <Routes>
                <Route path='/' element={<LandingPage />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/todos' element={<PrivateRoute><TodosLayouts /></PrivateRoute>} />
                <Route path='/todos/create' element={<PrivateRoute><TodosCreateLayouts /></PrivateRoute>} />
                <Route path='/todos/update/:id' element={<PrivateRoute><TodosUpdateLayouts /></PrivateRoute>} />
                <Route path='/todos/:id' element={<PrivateRoute><TodosDetailLayouts /></PrivateRoute>} />
            </Routes>
        </div>
    )
}

export default Routers
