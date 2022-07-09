import { query, collection, onSnapshot, DocumentData } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserAuth } from '../contexts/userAuthContext';
import { db } from '../firestore/firestore';
import { Data } from '../types/tableIssueType';
import { Header } from './Header';
import { 
    Badge,
    Box, 
    Button, 
    Heading, 
    Table, 
    TableCaption, 
    TableContainer, 
    Tbody, 
    Td, 
    Tfoot, 
    Th, 
    Thead, 
    Tr 
} from '@chakra-ui/react';

export const DeletedIssues = () => {

    const [ deletedHistory, setDeletedHistory ] = useState<{ id: string; data: DocumentData | Data; }[]>([]);
    const navigate = useNavigate();
    const {user} = useUserAuth();

    useEffect(() => {
        const loadAllDeletedIssues = () => {
            const q = query(collection(db, 'deletedissues'))
            onSnapshot(q, (querySnapshot) => {
            setDeletedHistory(querySnapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            })))
            })
        }
        if (user) {
            loadAllDeletedIssues();
        }

    }, [])

    const navigateHome = () => {
        navigate('/home');
    };

    return (
        <>
            <Header />
            <Box p='2vh' display='flex' justifyContent='space-between'>    
                <Heading>Deleted Issues</Heading> 
                <Button colorScheme='pink' onClick={navigateHome}>Back to dashboard</Button>
            </Box>
            {
                deletedHistory && 
                    <TableContainer>
                        <Table variant='simple'>
                            <TableCaption>Deleted Issues</TableCaption>
                            <Thead>
                            <Tr>
                                <Th>ID</Th>
                                <Th>Completed?</Th>
                                <Th>Issue</Th>
                            </Tr>
                            </Thead>
                            <Tbody>
                                {
                                    deletedHistory.map(eachIssue => {
                                        return (
                                            <Tr key={eachIssue.id}>
                                                <Td fontWeight='extrabold'>{eachIssue.id}</Td>
                                                <Td>
                                                    <Badge colorScheme={eachIssue.data.completed ? 'green' : 'red'}>{eachIssue.data.completed ? 'COMPLETED' : 'NOT COMPLETED'}</Badge>
                                                </Td>
                                                <Td>{eachIssue.data.created}</Td>
                                            </Tr>
                                        )
                                    })
                                }
                            </Tbody>
                            <Tfoot>
                            
                            
                            </Tfoot>
                        </Table>
                    </TableContainer>
            }
            
        </>
  )
}
