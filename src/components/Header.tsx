import React, { useState } from 'react'
import { useUserAuth } from '../contexts/userAuthContext'
import {ChevronDownIcon} from '@chakra-ui/icons';
import { 
    Box, 
    Button, 
    Heading, 
    Menu, 
    MenuButton, 
    MenuItem, 
    MenuList, 
    Modal, 
    ModalBody, 
    ModalCloseButton, 
    ModalContent, 
    ModalFooter, 
    ModalHeader, 
    ModalOverlay, 
    Spinner,
    useDisclosure
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';



export const Header = () => {
    const [ loading, setLoading ] = useState<boolean>(false);
    const { logOut } = useUserAuth();
    const { isOpen, onOpen, onClose } = useDisclosure()
    const navigate = useNavigate();

    const handleLogOut = async () => {
        try {
            setLoading(prevValue => !prevValue);
            setTimeout(() => setLoading(prevValue => !prevValue), 2000);
            await logOut();
            setTimeout(() => navigate('/'), 2100);
        } catch (error: any) {
            console.log(error.message);
        }
    }

    return (
        <Box display='flex' flexDirection='row' justifyContent='space-between' p='2vh' boxShadow="0px 0px 4px rgba(0,0,0,.2)">
            <Heading>Issue Tracker</Heading>
            <Spinner visibility={loading ? 'visible' : 'hidden'} mr='1vh' />
            <Menu>
                <MenuButton 
                    px={4}
                    py={2}
                    transition='all 0.2s'
                    borderRadius='md'
                    _hover={{ bg: 'gray.400' }}
                    _expanded={{ bg: 'blue.400' }}
                    _focus={{ boxShadow: 'outline' }}
                    as={Button} 
                    rightIcon={<ChevronDownIcon />}
                >
                    Actions
                </MenuButton>
                <MenuList>
                    <MenuItem onClick={onOpen}>Log Out</MenuItem>
                </MenuList>
            </Menu>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                <ModalHeader>Exit</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    Don't forget to save your changes before quitting!
                </ModalBody>

                <ModalFooter display='flex'>
                    <Button colorScheme='red' mr={3} onClick={handleLogOut}>
                        Log Out
                    </Button>
                </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    )
}
