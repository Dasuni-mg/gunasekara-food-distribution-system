import React from 'react'
import {
    Box,
    Heading,
    VStack,
    Text,
    FormControl,
    FormLabel,
    Input,
    Link,
    IconButton,
    Button,
    HStack,
    Checkbox,
    Avatar,
    Wrap,
    WrapItem,
  
} from "@chakra-ui/react";


function Login() {

    return (
        <Box bg="#050c2b" w="full" h="100vh"> {/* Added background color */}
            <VStack >
                <Box w={['full', 'md']}
                    p={[10, 10]}
                    mt={[20, '10vh']}
                    mx='auto'
                    border={['none', '2px']}
                    borderColor={['', 'linkedin.300']}
                    borderRadius={10}
                    bgGradient="linear(to-r, #050c2b, #0c1153)" // Background gradient
                >
                    <VStack >
                        <Wrap>
                            <WrapItem>
                                <Avatar size='xl' name='Gunasekara Food Suppliers' src='https://bit.ly/dan-abramov' />
                            </WrapItem>
                        </Wrap>
                        <VStack>
                            <Heading color="white" >
                                Login
                            </Heading >
                            <Text color="white" >Enter your username and password</Text>
                        </VStack>
                        <FormControl>
                            <FormLabel color="white" >User Name</FormLabel>
                            <Input type='text' variant='filled' bgColor="blue.50"/>

                            <FormLabel color="white" >Password</FormLabel>
                            <Input type='password' variant='filled' bgColor="blue.50"/>
                            <HStack justify='space-between'>
                                <Checkbox color="white" >Remember me</Checkbox>
                                <Link color='blue.500' href='#'>Forgot password? </Link>
                            </HStack>
                            <Button w='full'
                                mt={4}
                                type='login'
                                colorScheme='linkedin'
                            >
                                Login
                            </Button>
                        </FormControl>

                    </VStack>
                </Box>
            </VStack>
        </Box>
    )
}

export default Login
