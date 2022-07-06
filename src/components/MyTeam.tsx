import { Box, Button } from '@chakra-ui/react'
import React from 'react'
import { MyUserType } from '../types/myUserType'

export const MyTeam = ({user} : {user: MyUserType}) => {
    return (
        <Box>
			<Button colorScheme='pink'>My team</Button>
        </Box>
  )
}
