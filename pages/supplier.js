import { ChakraProvider, theme } from "@chakra-ui/react";
import {
  Table,
  Heading,
  Stack,
  Thead,
  Tbody,
  Button,
  Tr,
  Th,
  Box,
  VStack,
  InputGroup,
  Input,
} from "@chakra-ui/react";
import { FaPrint } from "react-icons/fa";
import Axios from "axios";
import { Fragment, useState, useEffect } from "react";
import ReadOnlyRowSupplier from "../components/ReadOnlyRowSupplier";
import EditTableRowSupplier from "../components/EditTableRowSupplier";
import Navbar from "../components/Navbar";
import swal from "sweetalert";
import jsPDF from "jspdf";
import "jspdf-autotable";

export default function Supplier() {
  const [suppliers, setSuppliers] = useState([]);
  const [addFormData, setAddFormData] = useState({
    id: "",
    name: "",
    tp: "",
    whatsapp: "",
    address: "",
    email: "",
  });
  const [editFormData, setEditFormData] = useState({
    id: "",
    name: "",
    tp: "",
    whatsapp: "",
    address: "",
    email: "",
  });
  const [editSupplierId, setEditSupplierId] = useState(null);

  useEffect(() => {
    Axios.get("http://localhost:8080/supplier")
      .then((response) => {
        console.log("Getting from::::", response.data);
        setSuppliers(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  // Print table
  const handlePrint = (event) => {
    event.preventDefault();
    const doc = new jsPDF();
    doc.autoTable({ html: "#supplierTable" });
    doc.text("Supplier History", 10, 10);
    doc.save("Supplier-History.pdf");
  };

  // Print row
  const handlePrintRow = (event, supplier) => {
    event.preventDefault();
    const doc = new jsPDF();
    doc.autoTable({
      margin: [20],
      head: [["Name", "Mobile No", "Whatsapp No", "Address", "Email"]],
      body: [
        [
          supplier.name,
          supplier.tp,
          supplier.whatsapp,
          supplier.address,
          supplier.email,
        ],
      ],
    });
    doc.text("Details of a supplier", 10, 10);
    doc.save("Supplier.pdf");
  };

  // Handle form changes
  const handleAddFormChange = (event) => {
    event.preventDefault();
    const fieldName = event.target.name;
    const fieldValue = event.target.value;
    setAddFormData({ ...addFormData, [fieldName]: fieldValue });
  };

  const handleEditFormChange = (event) => {
    event.preventDefault();
    const fieldName = event.target.name;
    const fieldValue = event.target.value;
    setEditFormData({ ...editFormData, [fieldName]: fieldValue });
  };

  // Handle form submissions
  const handleAddFormSubmit = (event) => {
    event.preventDefault();
    const newSupplier = { ...addFormData };
    Axios.post("http://localhost:8080/supplier", newSupplier)
      .then((response) => {
        if (response.status === 200) {
          setSuppliers([...suppliers, newSupplier]);
          swal({
            title: "Successfully added a Supplier!",
            icon: "success",
            dangerMode: true,
          });
        } else {
          swal({
            title: "Something went wrong!",
            icon: "warning",
            dangerMode: true,
          });
        }
      })
      .catch((error) => console.log(error));
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();
    const editedSupplier = { ...editFormData };
    Axios.put(`http://localhost:8080/supplier/${editSupplierId}`, editedSupplier)
      .then((response) => {
        if (response.status === 200) {
          const updatedSuppliers = suppliers.map((supplier) =>
            supplier.id === editSupplierId ? editedSupplier : supplier
          );
          setSuppliers(updatedSuppliers);
          setEditSupplierId(null);
          swal({
            title: "Successfully updated a supplier!",
            icon: "success",
            dangerMode: true,
          });
        } else {
          swal({
            title: "Something went wrong!",
            icon: "warning",
            dangerMode: true,
          });
        }
      })
      .catch((error) => console.log(error));
  };

  const handleCancelClick = () => {
    setEditSupplierId(null);
  };

  const handleDeleteClick = (supplierId) => {
    Axios.delete(`http://localhost:8080/supplier/${supplierId}`)
      .then((response) => {
        if (response.status === 200) {
          const updatedSuppliers = suppliers.filter(
            (supplier) => supplier.id !== supplierId
          );
          setSuppliers(updatedSuppliers);
          swal({
            title: "Successfully deleted a supplier!",
            icon: "success",
            dangerMode: true,
          });
        } else {
          swal({
            title: "Something went wrong!",
            icon: "warning",
            dangerMode: true,
          });
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <ChakraProvider theme={theme}>
      <div className="App">
        <Navbar />
        <Box p={10} bgColor="blue.50">
          <VStack spacing={5}>
            <InputGroup>
              <Input
                type="text"
                name="id"
                placeholder="ID"
                onChange={handleAddFormChange}
              />
              <Input
                type="text"
                name="name"
                placeholder="Name"
                onChange={handleAddFormChange}
              />
              <Input
                type="number"
                name="tp"
                placeholder="Telephone No"
                maxLength="9"
                onChange={handleAddFormChange}
              />
              <Input
                type="number"
                name="whatsapp"
                placeholder="Whatsapp No"
                maxLength="9"
                onChange={handleAddFormChange}
              />
              <Input
                type="text"
                name="address"
                placeholder="Address"
                onChange={handleAddFormChange}
              />
              <Input
                type="email"
                name="email"
                placeholder="Email"
                onChange={handleAddFormChange}
              />
            </InputGroup>
            <Button
              size="md"
              height="48px"
              width="200px"
              alignSelf="flex-end"
              colorScheme="telegram"
              onClick={handleAddFormSubmit}
            >
              Add
            </Button>
          </VStack>
        </Box>
        <Box p={10}>
          <Heading my={3}>Supplier Table</Heading>
          <Button
            colorScheme="telegram"
            leftIcon={<FaPrint />}
            onClick={handlePrint}
          >
            Print
          </Button>
          <VStack>
            <Stack direction="row" alignSelf="flex-end" spacing={4}></Stack>
            <form onSubmit={handleEditFormSubmit}>
              <Table size="sm" id="supplierTable">
                <Thead>
                  <Tr>
                    <Th>ID</Th>
                    <Th>Name</Th>
                    <Th>Telephone No</Th>
                    <Th>Whatsapp No</Th>
                    <Th>Address</Th>
                    <Th>Email</Th>
                    <Th>Action</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {suppliers.map((supplier) => (
                    <Fragment key={supplier.id}>
                      {editSupplierId === supplier.id ? (
                        <EditTableRowSupplier
                          editFormData={editFormData}
                          handleEditFormSubmit={handleEditFormSubmit}
                          handleEditFormChange={handleEditFormChange}
                          handleCancelClick={handleCancelClick}
                        />
                      ) : (
                        <ReadOnlyRowSupplier
                          supplier={supplier}
                          handleEditClick={handleEditClick}
                          handleDeleteClick={handleDeleteClick}
                          handlePrintRow={handlePrintRow}
                        />
                      )}
                    </Fragment>
                  ))}
                </Tbody>
              </Table>
            </form>
          </VStack>
        </Box>
      </div>
    </ChakraProvider>
  );
}
