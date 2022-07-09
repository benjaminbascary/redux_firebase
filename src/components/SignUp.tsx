import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserAuth } from '../contexts/userAuthContext';
import { 
    FormControl, 
    FormHelperText, 
    FormLabel, 
    Input,
    Box,
    Button,
    Heading,
    Text,
    Alert,
    AlertIcon,
    HStack,
    Spinner,
    Img
} from '@chakra-ui/react';
import { AssetsPaths } from '../utils/assets';

type UserState = {
    email: string;
    password: string;
}

export const SignUp = (): JSX.Element => {

    const [userState, setUserState] = useState<UserState>({email: '', password: ''})
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<any>();
    const { signUp } = useUserAuth();
    const navigate = useNavigate();

    const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
        setUserState({...userState, [event.currentTarget.name]: event.currentTarget.value})
    }
    
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setLoading(true)
        setTimeout(() => setLoading(false), 500)
        setError('')
        try {
            await signUp(userState.email, userState.password);
            navigate('/');
        } catch(error) {
            setError(error);
            setTimeout(() => setError(''), 5000)
        }
    };

    return (
        <HStack>
            <Box className='login-logout-left-container' width='70vh' height='100vh' backgroundColor='green.100'>
                <Img className='login-logout-left-container' src={AssetsPaths.SignUp} />
            </Box>
            <Box display='flex' flexDirection='column' height='100vh' width='110vh' justifyContent='center'>
                <Heading display='flex' justifyContent='center' m='2vh'>Sing Up</Heading>
                <Box display='flex' justifyContent='center' alignItems='center' flexDirection='column'>
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
                        <FormControl m='5vh 0vh 5vh 0vh'>
                            <FormLabel htmlFor='email'>Password</FormLabel>
                            <Input id='password' type='password' name='password' value={userState.password} onChange={handleChange} />
                            <FormHelperText>Enter your password.</FormHelperText>
                        </FormControl>
                        <Box display='flex' justifyContent='center'>
                            <Button colorScheme='teal' onClick={handleSubmit}>
                                Sign Up
                            </Button>
                        </Box>
                        <Box display='flex'>
                            <Text>
                                Already have an account?    
                            </Text>
                            <Text cursor='pointer' color='blue' m='0vh 0vh 0vh 1vh' onClick={() => navigate('/')}>
                                Log In
                            </Text>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </HStack>
    )
}
