import { useEffect, useState } from 'react'
import { useUserAuth } from '../contexts/userAuthContext';
import { MyUserType } from '../types/myUserType';
import { collection, DocumentData, onSnapshot, orderBy, query} from 'firebase/firestore';
import { db } from '../firestore/firestore';
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
    PopoverArrow,
    PopoverBody,
    PopoverCloseButton,
    PopoverContent,
    Popover,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    useDisclosure,
    useToast,
} from '@chakra-ui/react'
import { priorityBadgeColorSetter } from '../utils/priorityBadgeColor';
import { deleteItem } from '../api/firestore-api';
import { dateFormatter } from '../utils/dateFormater';
import { deleteToastOptions } from '../utils/deleteToastOptions';

export const IssuesTable = () => {

    const { user } : { user: MyUserType } = useUserAuth();
    const [ allIssues, setAllIssues ] = useState<{ id: string; data: DocumentData | Data; }[]>([]);
    const [ loading, setLoading ] = useState<boolean>(true);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();
    
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
            setLoading(false);
            loadAllIssues();
        }   
    }, [])

    const handleDelete = (id: string, issue: DocumentData | Data ) => {
        setTimeout(() => toast(deleteToastOptions), 1000);
        setTimeout(() => deleteItem(id, issue ), 1000)
        onClose();
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
                        <TableCaption>Active issues</TableCaption>
                        <Thead>
                        <Tr>
                            <Th>ID</Th>
                            <Th>Added By</Th>
                            <Th>Assigned to</Th>
                            <Th>Status</Th>
                            <Th isNumeric>Actions</Th>
                        </Tr>
                        </Thead>
                        <Tbody>
                            {
                            allIssues.map(eachIssue => {
                                return (
                                    <>
                                    <Tr>
                                        <Td fontWeight='extrabold'>{eachIssue.id}</Td>
                                        <Td fontWeight='extrabold'>{eachIssue.data.addedBy}</Td>
                                        <Td fontWeight='extrabold'>{eachIssue.data.assignedTo}</Td>
                                        <Td>
                                            {
                                            eachIssue.data.completed ? (
                                                <Badge colorScheme='green' fontWeight='extrabold'>COMPLETED</Badge>
                                            ) : (
                                                <Badge colorScheme='red' fontWeight='extrabold'>NOT COMPLETED</Badge>
                                            )
                                            }
                                        </Td>
                                        <Td isNumeric>
                                            <Popover>
                                                <PopoverTrigger>
                                                    <Button colorScheme='pink' m='2px'>Details</Button>
                                                </PopoverTrigger>
                                                <PopoverContent width='100vh'>
                                                    <PopoverArrow />
                                                    <PopoverCloseButton />
                                                    
                                                    <PopoverBody display='flex' flexDirection='column' alignItems='baseline'>
                                                        <Text fontWeight='extrabold'>ID: {eachIssue.id}</Text>
                                                        <Text fontWeight='extrabold'>Created: {dateFormatter(eachIssue.data.created)}</Text>
                                                        <Text fontWeight='extrabold'>Priority:</Text>
                                                        <Badge
                                                            backgroundColor='black' 
                                                            color={priorityBadgeColorSetter(eachIssue.data.priority)}
                                                            ml='1vh'
                                                            >
                                                            {eachIssue.data.priority}
                                                        </Badge>
                                                    </PopoverBody>
                                                </PopoverContent>
                                            </Popover>
                                            
                                            <Button
                                                onClick={onOpen}
                                                colorScheme='red' 
                                                m='2px'
                                                >
                                                Delete
                                            </Button>
                                            <Modal isOpen={isOpen} onClose={onClose}>
                                                <ModalOverlay />
                                                <ModalContent>
                                                <ModalHeader>Modal Title</ModalHeader>
                                                <ModalCloseButton />
                                                <ModalBody>
                                                    Delete modal
                                                </ModalBody>

                                                <ModalFooter>
                                                    <Button variant='red' onClick={() => handleDelete(eachIssue.id, eachIssue)}>
                                                        Delete
                                                    </Button>
                                                    <Button colorScheme='blue' mr={3} onClick={onClose}>
                                                        Close
                                                    </Button>
                                                </ModalFooter>
                                                </ModalContent>
                                            </Modal>
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
