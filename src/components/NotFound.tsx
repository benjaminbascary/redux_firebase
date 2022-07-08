import { Box, Heading, Img, Spinner, Text } from '@chakra-ui/react';
import { useEffect } from 'react';
import { AssetsPaths } from '../utils/assets';
import { useNavigate } from 'react-router-dom';


export const NotFound = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const redirect = () => {
            setTimeout(() => navigate('/home'), 3000);
        }
        
        redirect();

    }, []);

    return (
        <Box display='flex' flexDirection='column' alignItems='center'>
            <Heading>404</Heading>
            <Text fontSize='2xl'>Oops! Looks like the page you are trying to find does not exists!</Text>
            <Text>Dont worry, we are redirecting you to another page.</Text>
            <Spinner speed='1.4s' />
			<Img maxH='70vh' src={AssetsPaths.NotFound} />
		</Box>
    )
}
