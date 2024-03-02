import React from "react";
import Navbar from "../../components/Navbar";
import Link from "next/link";
import { VStack, Button, Center } from "@chakra-ui/react";

function CashBalance() {
  return (
    <div>
      <Navbar />
      <Center mt={20}>
        <VStack spacing={8} align="center" p={10} bgColor="blue.50">
          <Link href="/cashbalance/sellercashbalance">
            <Button colorScheme="blue" width={80} variant="solid">
              Seller Cash Balance
            </Button>
          </Link>
          <Link href="/cashbalance/buyercashbalance">
            <Button colorScheme="blue" width={80} variant="outline">
              Buyer Cash Balance
            </Button>
          </Link>
          <Link href="/cashbalance/employeecashbalance">
            <Button colorScheme="blue" width={80} variant="outline">
              Employee Cash Balance
            </Button>
          </Link>
        </VStack>
      </Center>
    </div>
  );
}

export default CashBalance;
