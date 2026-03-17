import React from 'react'
import { Box, CheckboxCard } from "@chakra-ui/react"

const TodoCard = ({ todo }) => {
    return (
        <Box py={2} w="full">
            <CheckboxCard.Root w="full">
                <CheckboxCard.HiddenInput />
                <CheckboxCard.Control>
                    <CheckboxCard.Indicator />
                    <CheckboxCard.Label lineBreak="anywhere" fontSize={{ base: "sm", md: "md" }}>{todo}</CheckboxCard.Label>
                </CheckboxCard.Control>
            </CheckboxCard.Root>
        </Box>
    )
}

export default TodoCard