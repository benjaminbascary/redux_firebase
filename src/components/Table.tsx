import React, { LegacyRef, RefObject, useEffect, useRef, useState } from 'react'
import { useUserAuth } from '../contexts/userAuthContext';
import { MyUserType } from '../types/myUserType';
import { getAllIssues } from '../api/firestore-api';
import {collection, DocumentData, onSnapshot, orderBy, query} from 'firebase/firestore';
import { db } from '../firestore/firestore';
import { TableIssueType } from '../types/tableIssueType';
import { Data } from '../types/tableIssueType';
import { AssetsPaths } from '../utils/assets';
import { 
    Box, 
    Spinner, 
    TableCaption, 
    TableContainer, 
    Tbody, 
    Td, 
    Tfoot, 
    Th, 
    Thead, 
    Tr, 
    Table, 
    Badge, 
    Text, 
    Image,
    Button,
    PopoverTrigger,
    ButtonGroup,
    PopoverArrow,
    PopoverBody,
    PopoverCloseButton,
    PopoverContent,
    PopoverFooter,
    PopoverHeader,
    Popover,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    useDisclosure
} from '@chakra-ui/react'
import { priorityBadgeColorSetter } from '../utils/priorityBadgeColor';
import { IssueType } from '../types/issueType';

export const IssuesTable = () => {

    const { user } : { user: MyUserType } = useUserAuth();
    const [ allIssues, setAllIssues ] = useState<{ id: string; data: DocumentData | Data; }[]>([]);
    const [ loading, setLoading ] = useState<boolean>(true);
    const { isOpen, onOpen, onClose } = useDisclosure()

    useEffect(() => {
        const loadAllIssues = () => {
            const q = query(collection(db, 'issues'), orderBy('created', 'desc'))
            onSnapshot(q, (querySnapshot) => {
            setAllIssues(querySnapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            })))
            })
        }
        if (user) {
            setLoading(false)
            loadAllIssues()
        }   
    }, [])

    const handleShow = (issue: { id: string; data: DocumentData | Data; }) => {
        console.log(issue)
    }

    return (
        <Box>
            {
            loading ? (
                <Box display='flex' justifyContent='center' alignItems='center'>
                    <Spinner color='pink' mt='5vh' size='xl'></Spinner>
                </Box>
            ) : (
                (allIssues.length > 0) ? (
                <TableContainer>
                    <Table variant='striped' colorScheme='teal'>
                        <TableCaption>Latest issues</TableCaption>
                        <Thead>
                        <Tr>
                            <Th>ID</Th>
                            <Th>Added By</Th>
                            <Th>Assigned to</Th>
                            <Th>Status</Th>
                        </Tr>
                        </Thead>
                        <Tbody>
                            {
                            allIssues.map(eachIssue => {
                                return (
                                    <>
                                    <Tr>
                                        <Td>{eachIssue.id}</Td>
                                        <Td>{eachIssue.data.addedBy}</Td>
                                        <Td>{eachIssue.data.assignedTo}</Td>
                                        <Td>
                                            {
                                            eachIssue.data.completed ? (
                                                <Badge colorScheme='green'>COMPLETED</Badge>
                                            ) : (
                                                <Badge colorScheme='red'>NOT COMPLETED</Badge>
                                            )
                                            }
                                        </Td>
                                        <Td>
                                            <Popover>
                                                <PopoverTrigger>
                                                    <Button colorScheme='pink' m='2px'>Details</Button>
                                                </PopoverTrigger>
                                                <PopoverContent width='100vh'>
                                                    <PopoverArrow />
                                                    <PopoverCloseButton />
                                                    <PopoverHeader>{eachIssue.id}</PopoverHeader>
                                                    <PopoverBody>
                                                        <Box>
                                                            <Text>Priority:</Text>
                                                            <Badge 
                                                                backgroundColor='black' 
                                                                color={priorityBadgeColorSetter(eachIssue.data.priority)}

                                                                >
                                                                {eachIssue.data.priority}
                                                            </Badge>
                                                        </Box>
                                                    </PopoverBody>
                                                </PopoverContent>
                                            </Popover>
                                            
                                            
                                            <Button colorScheme='red' m='2px'>Delete</Button>
                                        </Td>
                                    </Tr>
                                    </>
                                    
                                    
                                )
                            })
                            }
                        </Tbody>
                        <Tfoot>
                            
                        </Tfoot>
                    </Table>
                </TableContainer>
                ) : (
                <Box flexDirection='column' display='flex' alignItems='center'>
                    <Image src={AssetsPaths.NoIssues} maxH='70vh' />
                    <Text fontSize='2xl'>Looks like there is no issues for today!</Text>
                </Box>
                )   
            )
            }
        </Box>
    )
}
