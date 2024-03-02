import React, { useState, useEffect, Fragment } from "react";
import { ChakraProvider,HStack,Heading, Table, Thead, Tbody, Tr, Th, Box, Button, VStack, InputGroup, Input } from "@chakra-ui/react";
import { FaPrint } from "react-icons/fa";
import jsPDF from "jspdf";
import "jspdf-autotable";

// Component imports
import Navbar from "../components/Navbar";
import ReadOnlyRow from "../components/ReadOnlyRow";
import EditTableRow from "../components/EditTableRow";

export default function Employee() {
  const [editFormData, setEditFormData] = useState({
    code: "",
    name: "",
    nic: "",
    tp: "",
    address: "",
    date: "",
  });
  const [editEmployeeId, setEditEmployeeId] = useState(null);

  
  const initialEmployees = [
    {
      code: "EMP001",
      name: "John Doe",
      nic: "123456789V",
      tp: "0712345678",
      address: "123, Main Street, City",
      date: "2024-03-01",
    },
    {
      code: "EMP002",
      name: "Jane Doe",
      nic: "987654321V",
      tp: "0776543210",
      address: "456, Side Street, Town",
      date: "2024-03-02",
    },
    // Add more employees as needed
  ];
 
  //print table
  const handlePrint = (event) => {
    event.preventDefault();
    const doc = new jsPDF();
    doc.autoTable({ html: "#empTable" });
    doc.text("Employee History", 10, 10);
    doc.save("Employee-History.pdf");
  };

  //print row
  const handlePrintRow = (event, employees) => {
    event.preventDefault();
    const doc = new jsPDF();
    doc.autoTable({
      margin: [20],
      head: [["Name", "NIC", "MOBILE NO", "ADDRESS", "CODE"]],
      body: [
        [
          employees.code,
          employees.name,
          employees.nic,
          employees.tp,
          employees.address,
          employees.date,
        ],
      ],
    });
    doc.text("Details of a Employee ", 10, 10);
    doc.save("Employee.pdf");
  };

  //GET- data
  //initialize employees array from getting data from useEffect hook
  const [employees, setEmployees] = useState(initialEmployees); // Corrected initialization

  useEffect(() => {
    // Axios.get("http://localhost:8080/")
    //   .then((employees) => {
    //     console.log("Getting from::::", employees.data);
    //     setEmployees(employees.data);
    //   })
    //   .catch((err) => console.log(err));
  }, []);

  //data for add employee form
  const [addFormData, setAddFormData] = useState({
    code: "",
    name: "",
    nic: "",
    address: "",
    tp: "",
    date: "",
  });

  //get the value that enter to the text field
  const handleAddFormChange = (event) => {
    event.preventDefault();
    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);
  };
  const handleEditClick = (event, employee) => {
    event.preventDefault();
  
    setEditEmployeeId(employee.code);
  
    const formValues = {
      code: employee.code,
      name: employee.name,
      nic: employee.nic,
      tp: employee.tp,
      address: employee.address,
      date: employee.date,
    };
  
    setEditFormData(formValues);
  };
  

  const handleEditFormChange = (event) => {
    const { name, value } = event.target;
    setEditFormData({
      ...editFormData,
      [name]: value,
    });
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();
    Axios.put(`http://localhost:8080/employee/${editFormData.code}`, editFormData)
      .then((res) => {
        if (res.status === 200) {
          const updatedEmployees = employees.map((employee) =>
            employee.code === editFormData.code ? editFormData : employee
          );
          setEmployees(updatedEmployees);
          setEditEmployeeId(null);
          setEditFormData({
            code: "",
            name: "",
            nic: "",
            tp: "",
            address: "",
            date: "",
          });
        }
      })
      .catch((err) => console.error(err));
  };

  const handleCancelClick = () => {
    setEditEmployeeId(null);
    setEditFormData({
      code: "",
      name: "",
      nic: "",
      tp: "",
      address: "",
      date: "",
    });
  };
  const handleDeleteClick = (code) => {
    // Filter out the employee with the given code
    const updatedEmployees = employees.filter((employee) => employee.code !== code);
  
    // Update the state with the filtered employees array
    setEmployees(updatedEmployees);
  
    // Display success message
    alert("Employee deleted successfully!");
  };
  
  
  //POST-data
  const handleAddFormSubmit = (event) => {
    event.preventDefault();

    const newEmployee = {
      code: addFormData.code,
      name: addFormData.name,
      nic: addFormData.nic,
      tp: addFormData.tp,
      address: addFormData.address,
      date: addFormData.date,
    };

    // Simulating addition of a new employee to the existing array
    const newEmployees = [...employees, newEmployee];
    setEmployees(newEmployees);

    // Clearing form data after submission
    setAddFormData({
      code: "",
      name: "",
      nic: "",
      address: "",
      tp: "",
      date: "",
    });

    // Displaying success message
    alert("Employee added successfully!");
  };


  // Remaining functions...

  return (
    <ChakraProvider>
      <Box className="App">
        <Navbar />
        <Box p={10} bgColor="blue.50">
  <form onSubmit={handleAddFormSubmit}>
    <HStack spacing={5}>
      <InputGroup>
        <Input
          type="text"
          name="code"
          placeholder="Code"
          maxLength="6"
          value={addFormData.code}
          onChange={handleAddFormChange}
        />
      </InputGroup>
      <InputGroup>
        <Input
          type="text"
          name="name"
          placeholder="Name"
          value={addFormData.name}
          onChange={handleAddFormChange}
        />
      </InputGroup>
      <InputGroup>
        <Input
          type="text"
          name="nic"
          placeholder="NIC"
          value={addFormData.nic}
          onChange={handleAddFormChange}
        />
      </InputGroup>
      <InputGroup>
        <Input
          type="Integer"
          name="tp"
          placeholder="TP-711436578"
          maxLength="9"
          value={addFormData.tp}
          onChange={handleAddFormChange}
        />
      </InputGroup>
      <InputGroup>
        <Input
          type="text"
          name="address"
          placeholder="Address"
          value={addFormData.address}
          onChange={handleAddFormChange}
        />
      </InputGroup>
      <InputGroup>
        <Input
          type="date"
          name="date"
          placeholder="Date"
          value={addFormData.date}
          onChange={handleAddFormChange}
        />
      </InputGroup>
      <Button
        type="submit"
        size="md"
        height="48px"
        width="200px"
        alignSelf="flex-end"
        colorScheme="telegram"
      >
        Add
      </Button>
    </HStack>
  </form>
</Box>

        <Box p={10}>
          <Heading my={3}>Employee Table</Heading>
          <Button
            colorScheme="telegram"
            leftIcon={<FaPrint />}
            onClick={handlePrint}
          >
            Print
          </Button>
          <VStack padding={5}>
            <Table size="sm" id="empTable">
              <Thead>
                <Tr>
                  <Th>Code</Th>
                  <Th>Name</Th>
                  <Th>NIC</Th>
                  <Th>Mobile No</Th>
                  <Th>Address</Th>
                  <Th>Date</Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
             {employees.map((employee, index) => (
  <Fragment key={index}>
    {editEmployeeId === employee.code ? (
      <EditTableRow
        editFormData={editFormData}
        handleEditFormSubmit={handleEditFormSubmit}
        handleEditFormChange={handleEditFormChange}
        handleCancelClick={handleCancelClick}
      />
    ) : (
      <ReadOnlyRow
        employee={employee}
        handlePrintRow={handlePrintRow}
        handleEditClick={handleEditClick}
        handleDeleteClick={handleDeleteClick}
      />
    )}
  </Fragment>
))}

              </Tbody>
            </Table>
          </VStack>
        </Box>
      </Box>
    </ChakraProvider>
  );
}
