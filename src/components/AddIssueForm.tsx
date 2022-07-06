import React, { useEffect, useState } from 'react';
import { IssueType } from '../types/issueType';
import { MyUserType } from '../types/myUserType';
import { createIssue } from '../api/firestore-api';
import { Timestamp } from 'firebase/firestore/lite';
import { priorityOptions } from '../utils/priorityOptions';
import { OptionsType } from '../types/optionsType';
import { 
    Box, 
    Button, 
    FormControl, 
    FormLabel, 
    Input, 
    Modal, 
    ModalBody, 
    ModalCloseButton, 
    ModalContent, 
    ModalFooter, 
    ModalHeader, 
    ModalOverlay, 
    Select, 
    Textarea, 
    useDisclosure
} from '@chakra-ui/react';

export const AddIssueForm = ({ user }: { user: MyUserType }) => {

    const [ myUser, setMyUser ] = useState<MyUserType>();
    const [ showForm, setShowForm ] = useState<boolean>(false);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [ myOptions, setMyOptions] = useState<OptionsType[]>(priorityOptions);
    const [ issue, setIssue ] = useState<IssueType>({
        addedBy: myUser?.displayName,
        issue: '',
        assignedTo: '',
        considerations: '',
        priority: 'Low',
        created: Timestamp.now(),
        completed: false
    });

    useEffect(() => {
        setMyUser(user);
    }, []);

    useEffect(() => {
        setIssue({...issue, ['addedBy'] : myUser?.displayName });
    }, [issue.priority])

    const handleShowForm = (): void => {
        setShowForm(prevValue => !prevValue);
    }

    const handleChange = (event: React.FormEvent<HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement>) => {
        event.preventDefault();
        setIssue({...issue, [event.currentTarget.name]: event.currentTarget.value });
    }

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        console.log(issue)
        createIssue(issue);
    }
    
    return (
        <Box>
            <Button
                m='2vh' 
                colorScheme='green' 
                color='white'
                onClick={onOpen}
            >
            {showForm ? '- Add new issue' : '+ Add new issue'}
            </Button>
            
                <Modal size='4xl' onClose={onClose} isOpen={isOpen} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Adding new issue</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        
                    <Box m='2vh'>
                        <FormControl isRequired>
                            <FormLabel htmlFor='addedBy'>Added by:</FormLabel>
                            <Input 
                                name='addedBy' 
                                value={myUser?.displayName} 
                                isReadOnly
                            />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel htmlFor='issue'>Description</FormLabel>
                            <Textarea 
                                h='10vh' 
                                name='issue' 
                                value={issue.issue}
                                onChange={handleChange}
                            />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel htmlFor='assignedTo'>Assigned to:</FormLabel>
                            <Input 
                                name='assignedTo' 
                                value={issue.assignedTo}
                                onChange={handleChange}
                            />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel htmlFor='considerations'>Considerations:</FormLabel>
                            <Input 
                                name='considerations' 
                                value={issue.considerations}
                                onChange={handleChange}
                            />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel htmlFor='priority'>Priority</FormLabel>
                            <Select value={issue.priority} name='priority' onChange={handleChange} placeholder='Select priority'>
                                {
                                    myOptions.map(eachOption => {
                                        return (
                                            <option key={eachOption.value} value={eachOption.value}>
                                                {eachOption.text}
                                            </option>
                                        )
                                    })
                                }
                            </Select>
                        </FormControl>
                        <Button
                            colorScheme='linkedin'
                            type='submit' 
                            mt='2vh'
                            onClick={handleSubmit}
                        >Add to workspace
                        </Button>
                    </Box>
                    
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={onClose}>Close</Button>
                    </ModalFooter>
                </ModalContent>
                </Modal>
                 
                
            
        </Box>
    )
}
