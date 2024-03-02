import React from "react";
import Navbar from "../../components/Navbar";
import Link from "next/link";
import { VStack, Button, Center } from "@chakra-ui/react";

function Vehicles() {
  return (
    <div>
      <Navbar />
      <Center mt={20}>
        <VStack spacing={8} align="center" p={10} bgColor="blue.50">
          <Link href="/vehicles/service">
            <Button colorScheme="blue" width={80} variant="solid">
              Service
            </Button>
          </Link>
          <Link href="/vehicles/repair">
            <Button colorScheme="blue" width={80} variant="outline">
              Repair
            </Button>
          </Link>
          <Link href="/vehicles/renew">
            <Button colorScheme="blue" width={80} variant="outline">
              Licence
            </Button>
          </Link>
          <Link href="/vehicles/insuarence">
            <Button colorScheme="blue" width={80} variant="outline">
              Insurance
            </Button>
          </Link>
          <Link href="/vehicles/fuel">
            <Button colorScheme="blue" width={80} variant="outline">
              Fuel
            </Button>
          </Link>
        </VStack>
      </Center>
    </div>
  );
}

export default Vehicles;
