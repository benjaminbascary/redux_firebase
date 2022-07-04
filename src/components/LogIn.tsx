import React, { useState } from 'react'
import GoogleButton from 'react-google-button';
import { useUserAuth } from '../contexts/userAuthContext';
import { LogInType } from '../types/logIn';
import { useNavigate } from 'react-router-dom';
import { 
    Alert,
    AlertIcon,
    Box, 
    Button, 
    FormControl, 
    FormHelperText, 
    FormLabel, 
    Heading, 
    Input, 
    Text 
} from '@chakra-ui/react';


export const Login = () => {

    const [userState, setUserState] = useState<LogInType>({email: '', password: ''});
    const [error, setError] = useState<any>();
    const { logIn } = useUserAuth();
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setError('');
        try {
            await logIn(userState.email, userState.password);
            navigate('/home')
        } catch (error) {
            setError(error);
        }
    }

    const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
        setUserState({...userState, [event.currentTarget.name]: event.currentTarget.value})
    }


    return (
        <>
            <Heading display='flex' justifyContent='center' m='2vh'>Log In</Heading>
            <Box display='flex' justifyContent='center' alignItems='center'>
                <Box>
                {error && <Alert 
                            status='error' 
                            mb='2vh' 
                            borderRadius='1vh'
                        >
                        <AlertIcon />
                        {error.message}
                        </Alert>}
                    <FormControl m='0vh 0vh 5vh 0vh'>
                        <FormLabel htmlFor='email'>Email address</FormLabel>
                        <Input id='email' type='email' name='email' value={userState.email} onChange={handleChange}/>
                        <FormHelperText>We'll never share your email.</FormHelperText>
                    </FormControl>
                    <FormControl m='2vh 0vh 2vh 0vh'>
                        <FormLabel htmlFor='email'>Password</FormLabel>
                        <Input id='password' type='password' name='password' value={userState.password} onChange={handleChange} />
                        <FormHelperText>Enter your password.</FormHelperText>
                    </FormControl>
                    <Box display='flex' justifyContent='center' mb='2vh'>
                        <Button colorScheme='blue' onClick={handleSubmit}>
                            Log In
                        </Button>
                    </Box>
                    <Box display='flex' flexDirection='column'>
                        <Box>
                        <GoogleButton
                            className="g-btn"
                            type="dark"
                            />
                        </Box>
                        <Box display='flex' flexDirection='row'>
                            <Text>
                                Don't have an account?   
                            </Text>
                            <Text cursor='pointer' color='blue' m='0vh 0vh 0vh 1vh' onClick={() => navigate('/signup')}>
                                Sign up
                            </Text>
                        </Box>
                        
                    </Box>
                </Box>
            </Box>
        </>
    )
}
