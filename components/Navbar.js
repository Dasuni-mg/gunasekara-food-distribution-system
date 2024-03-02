import {
  VStack,
  Heading,
  Text,
  HStack,
  Box,
  Button,
  Stack,
} from "@chakra-ui/react";
import React, { Fragment, useState } from "react";
import { BiArrowBack, BiMenu } from "react-icons/bi"; // Import BiMenu
import Link from "next/link";
import Sidebar from "./Sidebar";

function Navbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Fragment>
      <Sidebar isOpen={isSidebarOpen} />
      <Stack
        direction="row"
        alignItems="center"
        bgGradient="linear(to-r, #050c2b, #0c1153)"
        p={4}
        width="100%"
        justifyContent="space-between"
      >
        <VStack align="start" spacing={2}>
          <Heading as="h1" size="md" color="white">
            Gunasekara Food Suppliers (PVT) Ltd.
          </Heading>
          <Text fontWeight="normal" color="white" fontSize="sm">
            No.414, D16 Cannel, Kuttigala, Padalangala.
          </Text>
          <Text fontWeight="normal" fontSize="sm" color="white">
            Tel: 077-9338165 / 071-7722435
          </Text>
          <Text fontWeight="normal" fontSize="sm" color="white">
            Email: gunasekarafoodssuppliers@gmail.com
          </Text>
        </VStack>

        {/* Move the navigation buttons to the rightmost corner */}
        <HStack>
          <Button
            bg="transparent"
            _hover={{ bg: "transparent" }}
            onClick={toggleSidebar}
          >
            <BiMenu color="white" />
          </Button>
          <Link href="/">
            <Button
              bg="white"
              color="blue.500"
              _hover={{ bg: "blue.100" }}
              size="sm"
              fontWeight="normal"
              fontSize="sm"
              borderRadius="md"
              px={4}
              py={2}
              ml={4} // Add left margin to separate from the menu icon
            >
              <BiArrowBack />
            </Button>
          </Link>
        </HStack>
      </Stack>
    </Fragment>
  );
}

export default Navbar;
