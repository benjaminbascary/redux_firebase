import React, { useEffect, useState } from 'react'
import { IssueType } from '../types/issueType';
import { MyUserType } from '../types/myUserType';
import { 
    Box, 
    Button, 
    FormControl, 
    FormLabel, 
    Input, 
    Select, 
    Textarea 
} from '@chakra-ui/react'
import { createIssue } from '../api/firestore-api';
import { Timestamp } from 'firebase/firestore/lite';
import { priorityOptions } from '../utils/priorityOptions';
import { OptionsType } from '../types/optionsType';

export const AddIssueForm = ({ user }: { user: MyUserType }) => {

    const [ myUser, setMyUser ] = useState<MyUserType>();
    const [ showForm, setShowForm ] = useState<boolean>(false);
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
        console.log(Timestamp.now())
    }, []);

    useEffect(() => {
        setIssue({...issue, ['addedBy'] : myUser?.displayName });
    }, [issue.issue])

    const handleShowForm = (): void => {
        setShowForm(prevValue => !prevValue);
    }

    const handleChange = (event: React.FormEvent<HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement>) => {
        event.preventDefault();
        setIssue({...issue, [event.currentTarget.name]: event.currentTarget.value });
    }

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        console.log(issue);
        createIssue(issue);
    }
    
    return (
        <Box>
            <Button
                m='2vh' 
                colorScheme='green' 
                color='white'
                onClick={handleShowForm}
            >
            {showForm ? '- Add new issue' : '+ Add new issue'}
            </Button>
            {
                showForm && 
                <Box m='2vh' width='100vh'>
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
                        <FormLabel htmlFor='country'>Priority</FormLabel>
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
                        type='submit' 
                        mt='2vh'
                        onClick={handleSubmit}
                    >Add to workspace
                    </Button>
                </Box>
            }
        </Box>
    )
}
