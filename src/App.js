import './App.css';
import {Navigate, Route, Routes} from "react-router-dom";
import Login from "./pages/login/Login";
import Dashboard from "./pages/dashboard/Dashboard";
import {useDispatch, useSelector} from "react-redux";
import UserList from "./pages/users/UserList/UserList";
import AdminLayout from "./components/Layout/AdminLayout";
import {useEffect} from "react";
import {setAuth} from "./feature/auth/authSlice";

function App() {
    const auth = useSelector(state => state.auth)
    const dispatch = useDispatch();

    useEffect(() => {
        let token = localStorage.getItem('token');
        console.log(token)
        if (token) {
          dispatch(setAuth())
        }
    }, [])

    return (
        <>
            <Routes>
                <Route path="/login" element={ !auth.isAuth ? <Login/> : <Navigate to="/dashboard" replace/>}/>
                {auth.isAuth ? (
                    <>
                        <Route path="/" element={<AdminLayout/>}>
                            <Route path="/dashboard" element={<Dashboard/>}/>
                            <Route path="/users" element={<UserList/>}/>
                        </Route>
                    </>
                ) : <Route path="*" element={<Navigate to="/login" replace/>}/>}
            </Routes>
        </>
    );
}

export default App;
