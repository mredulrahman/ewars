import * as React from 'react'
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router-dom';


export default function Sidebar({ open, onClose }) {
    const [username, setUsername] = React.useState('admin');
    const [password, setPassword] = React.useState('password123');
    const [isLoading, setIsLoading] = React.useState(false);
    const navigate = useNavigate();
    const toggleDrawer = (newOpen) => () => {
        onClose();
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Logging in with:', username, password);
        // Add authentication logic here

        // Return/navigate to another page
    };
    const handleSignIn = () => {
        setIsLoading(true); // Change state to true when the button is clicked

        // Simulate an asynchronous action, like an API call
        setTimeout(() => {
            console.log('Signed in!');
            setIsLoading(false); // Change state back to false after the action is complete
        }, 2000); // Simulate a 2-second delay
        navigate('/ewars-dashboard');
    };

    const DrawerContent = (
        <Box
            sx={{ width: 450, marginY: '80px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', fontFamily: 'inter' }}
            role="presentation"
            onClick={(event) => event.stopPropagation()}
            component="form"
            onSubmit={handleSubmit}>
            <div className='w-xs'>
                <div>
                    <Typography
                        variant="h6"
                        sx={{ fontFamily: 'inter', fontWeight: '700' }}>
                        Welcome back
                    </Typography>
                    <Typography
                        sx={{ color: 'rgb(60,93,170)', marginY: '20px', fontFamily: 'inter', fontSize: '16px', fontWeight: '400' }}>
                        Enter your credentials to access the dashboard
                    </Typography>
                </div>
                <div className="flex flex-col gap-2">
                    <Typography sx={{ fontFamily: 'inter', fontSize: '14px', fontWeight: '500' }}>
                        Username
                    </Typography>
                    <TextField
                        placeholder="Enter your username"
                        variant="outlined"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        size="small"
                        sx={{
                            width: '280px', background: '#F5F5F5',
                            '& .MuiInputBase-input::placeholder': {
                                opacity: 1,
                                fontSize: '14px',
                                fontWeight: 500,
                                fontFamily: 'inter',
                                color: 'rgb(60,93,170)'
                            }
                        }} />
                </div>
                <div className='flex flex-col gap-2'>
                    <Typography sx={{ pt: 2, fontFamily: 'inter', fontSize: '14px', fontWeight: '500' }}>
                        Password
                    </Typography>
                    <TextField
                        placeholder="Enter your password"
                        variant="outlined"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="current-password"
                        size="small"
                        sx={{
                            width: '280px', background: '#F5F5F5',
                            '& .MuiInputBase-input::placeholder': {
                                opacity: 1,
                                fontSize: '14px',
                                fontWeight: 500,
                                fontFamily: 'inter',
                                color: 'rgb(60,93,170)'
                            }
                        }} />
                </div>

                <Button
                    type='submit'
                    sx={{ width: '280px', textTransform: 'none', color: 'white', fontWeight: '600', backgroundColor: 'black', '&:hover': { opacity: 1 }, marginY: '20px' }}
                    onClick={handleSignIn}>
                    {isLoading ? (
                        <>
                            {/* Signing in... */}
                            <CircularProgress size="24px" color='inherit' />
                        </>
                    ) : (
                        "Sign in"
                    )}
                </Button>

                <Button
                    sx={{ width: '280px', textTransform: 'none', color: 'black', fontWeight: '600', backgroundColor: '#FFB042' }}
                    onClick={toggleDrawer(false)}>
                    ← Back
                </Button>
            </div>
        </Box>
    );
    return (
        <>
            <Drawer
                variant='persistent'
                open={open}
                transitionDuration={{ enter: 400, exit: 300 }}
                anchor="right"
                onClose={onClose}>
                {DrawerContent}
            </Drawer>
        </>
    )
}
