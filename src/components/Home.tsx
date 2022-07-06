import { Avatar, Badge, Box, Img } from '@chakra-ui/react';
import { Header } from './Header';
import { useUserAuth } from '../contexts/userAuthContext'
import { AddIssueForm } from './AddIssueForm';
import { MyTeam } from './MyTeam';
import { MyUserType } from '../types/myUserType';

export const Home = (): JSX.Element => {

  const { user } : {user: MyUserType} = useUserAuth();
  
  return (
  <Box>
    <Header />
    <Box className='status-buttons-container' justifyContent='space-between' display='flex' h='6vh' mt='2vh'>
        <Badge h='3vh' ml='2vh' p='5px' borderRadius='1vh' display='flex' alignSelf='center' alignItems='center'>
            Status: 
			{
			user ? ( 
				<Badge borderRadius='5px' ml='1vh' colorScheme='whatsapp'>ONLINE</Badge>
			) : (
				<Badge colorScheme='red'>OFFLINE</Badge>
			) 
			}
        </Badge>
        <Box display='flex' flexDirection='row' alignItems='center' justifyContent='center'>  
          <AddIssueForm user={user} />
          <MyTeam user={user} />
        </Box>
		<Badge className='email-badge' p='1vh' mr='2vh' borderRadius='1.5vh' display='flex' alignItems='center'>
			{user.email}
			<Avatar size='sm' name={user.displayName} src={user.photoURL} ml='1vh'/>
        </Badge>
    </Box>
  </Box>

  )
}


