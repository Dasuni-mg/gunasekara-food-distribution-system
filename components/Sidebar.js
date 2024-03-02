import React from "react";
import { Box, Button, Link,Heading } from "@chakra-ui/react";

const Sidebar = ({ isOpen }) => {
  return (
    <Box
      h="100%"
      w="19%"
      bg="gray.200"
      p={4}
      display={isOpen ? "block" : "none"}
      position="fixed"
      left={0}
      top={0}
      bottom={0}
      zIndex={10}
      justifyContent="center" // Align buttons to the center horizontally
      alignItems="center" // Align items vertically in the center
    >
        <Heading mb={4} size="lg" textAlign="center" >
        Dashboard
      </Heading>
      <Link href="/employee">
        <Button
          variant="ghost"
          size="lg"
          w="100%"
          mb={2}
          colorScheme="blue"
          textAlign="start" // Align text to the center
        >
          Employee
        </Button>
      </Link>
      <Link href="/cashbalance">
        <Button
          variant="ghost"
          size="lg"
          w="100%"
          mb={2}
          colorScheme="blue"
          textAlign="start"
        >
          Cash Balance
        </Button>
      </Link>
      <Link href="/vehicles">
        <Button
          variant="ghost"
          size="lg"
          w="100%"
          mb={2}
          colorScheme="blue"
          textAlign="start"
        >
          Vehicles
        </Button>
      </Link>
      <Link href="/purchase">
        <Button
          variant="ghost"
          size="lg"
          w="100%"
          mb={2}
          colorScheme="blue"
          textAlign="start" // Align text to the center
        >
         Purchase
        </Button>
      </Link>
      <Link href="/sales">
        <Button
          variant="ghost"
          size="lg"
          w="100%"
          mb={2}
          colorScheme="blue"
          textAlign="start"
        >
          Sales
        </Button>
      </Link>
      <Link href="/attendance">
        <Button
          variant="ghost"
          size="lg"
          w="100%"
          mb={2}
          colorScheme="blue"
          textAlign="start"
        >
         Attendance
        </Button>
      </Link>
      <Link href="/expences">
        <Button
          variant="ghost"
          size="lg"
          w="100%"
          mb={2}
          colorScheme="blue"
          textAlign="start" // Align text to the center
        >
         Expences
        </Button>
      </Link>
      <Link href="/customers">
        <Button
          variant="ghost"
          size="lg"
          w="100%"
          mb={2}
          colorScheme="blue"
          textAlign="start"
        >
          Customers
        </Button>
      </Link>
      <Link href="/suppliers">
        <Button
          variant="ghost"
          size="lg"
          w="100%"
          mb={2}
          colorScheme="blue"
          textAlign="start"
        >
         Suppliers
        </Button>
      </Link>
      <Link href="/reports">
        <Button
          variant="ghost"
          size="lg"
          w="100%"
          mb={2}
          colorScheme="blue"
          textAlign="start" // Align text to the center
        >
          Reports
        </Button>
      </Link>
     
    </Box>
  );
};

export default Sidebar;
