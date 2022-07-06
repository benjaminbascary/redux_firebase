import React, { useEffect, useState } from 'react'
import { IssueType } from '../types/issueType';
import { MyUserType } from '../types/myUserType';
import { 
    Box, 
    Button, 
    FormControl, 
    FormLabel, 
    Input, 
    Textarea 
} from '@chakra-ui/react'

export const AddIssueForm = ({ user }: { user: MyUserType }) => {

    const [ myUser, setMyUser ] = useState<MyUserType>();
    const [ showForm, setShowForm ] = useState<boolean>(false);
    const [ issue, setIssue ] = useState<IssueType>({
        addedBy: myUser?.displayName,
        issue: '',
        assignedTo: '',
        considerations: '',
        priority: 'low',
        completed: false
    });

    useEffect(() => {
        setMyUser(user);
    }, []);

    useEffect(() => {
        setIssue({...issue, ['addedBy'] : myUser?.displayName });
    }, [issue.issue])

    const handleShowForm = (): void => {
        setShowForm(prevValue => !prevValue);
    }

    const handleChange = (event: React.FormEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        event.preventDefault();
        setIssue({...issue, [event.currentTarget.name]: event.currentTarget.value });
    }

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        console.log(issue);
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
