import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useFormik} from "formik";
import * as Yup from 'yup';
import {LoginOutlined} from "@mui/icons-material";
import AuthService from "../../services/auth.service";
import {useState} from "react";
import {Alert} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {setAuth} from "../../feature/auth/authSlice";
function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const defaultTheme = createTheme();

const LoginSchema = Yup.object().shape({
    password: Yup.string()
        .required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
});
export default function Login() {
    const [errMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const formLogin = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: LoginSchema,
        onSubmit: values => {
            let data = {
                username: values.email,
                password: values.password
            }
            AuthService.login(data).then(res => {
                if (res.data.status == 'error') {
                    setErrorMessage(res.data.message)
                } else {
                    let token = res.data.accessToken;
                    localStorage.setItem('token', token);
                    dispatch(setAuth())
                    navigate('/dashboard')
                }
            }).catch(err => {

            })
        }
    })

    return (
        <ThemeProvider theme={defaultTheme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        { errMessage && <Alert severity="error">{errMessage}</Alert>}
                        <Box component="form" noValidate onSubmit={formLogin.handleSubmit} sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                onChange={formLogin.handleChange}
                                value={formLogin.values.email}
                                autoFocus
                                error={formLogin.errors.email && formLogin.touched.email}
                                helperText= {formLogin.errors.email && formLogin.touched.email ? formLogin.errors.email : null }
                            />

                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                onChange={formLogin.handleChange}
                                value={formLogin.values.password}
                                autoComplete="current-password"
                            />
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Remember me"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Sign In
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Link href="#" variant="body2">
                                        Forgot password?
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link href="#" variant="body2">
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid>
                            </Grid>
                            <Copyright sx={{ mt: 5 }} />
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}
