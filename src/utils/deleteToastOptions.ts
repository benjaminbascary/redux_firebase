import { UseToastOptions } from "@chakra-ui/react";

export const deleteToastOptions: UseToastOptions = {
    title: 'Ticket Deleted!',
    description: "We've deleted the issue.",
    status: 'info',
    duration: 9000,
    isClosable: true,
}