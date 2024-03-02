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
import ReadOnlyRowAttendence from "../components/ReadOnlyRowAttendence";
import Navbar from "../components/Navbar";
import jsPDF from "jspdf";
import "jspdf-autotable";
import swal from "sweetalert";

export default function Attendence() {
  //print table
  const handlePrint = (event) => {
    event.preventDefault();
    const doc = new jsPDF();
    doc.autoTable({ html: "#attendenceTable" });
    doc.text("Attendence History", 10, 10);
    doc.save("Attendence-History.pdf");
  };

  //print row
  const handlePrintRow = (event, attendences) => {
    event.preventDefault();
    const doc = new jsPDF();
    doc.autoTable({
      margin: [20],
      head: [["INDEX", "DATE", "TIME"]],
      body: [[attendences.id, attendences.date, attendences.time]],
    });
    doc.text("Details of a Attendence", 10, 10);
    doc.save("Attendence.pdf");
  };

  const [attendences, setAttendences] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:8080/attendence")
      .then((response) => {
        console.log("Getting from::::", response.data);
        setAttendences(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const [addFormData, setAddFormData] = useState({
    id: "",
    date: "",
    time: "",
  });

  const handleAddFormChange = (event) => {
    event.preventDefault();
    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);
  };

  const handleAddFormSubmit = (event) => {
    event.preventDefault();

    const newAttendence = {
      id: addFormData.id,
      date: addFormData.date,
      time: addFormData.time,
    };

    Axios.post("http://localhost:8080/attendence", newAttendence)
      .then((response) => {
        if (response.status === 200) {
          console.log("Posting data", response);
          swal({
            title: "Successfully added an Attendence!",
            icon: "success",
            dangerMode: true,
          });
          const newAttendences = [...attendences, newAttendence];
          setAttendences(newAttendences);
        } else {
          swal({
            title: "Something went wrong!",
            icon: "Warning",
            dangerMode: true,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <ChakraProvider theme={theme}>
      <div className="App">
        <Navbar />
        <Box p={10} bgColor="blue.50">
          <VStack spacing={5}>
            <InputGroup>
              <Input
                type="integer"
                name="id"
                bgColor="blue.50"
                placeholder="ID"
                onChange={handleAddFormChange}
              />
            </InputGroup>
            <InputGroup>
              <Input
                type="date"
                name="date"
                bgColor="blue.50"
                placeholder="Date"
                onChange={handleAddFormChange}
              />
            </InputGroup>
            <InputGroup>
              <Input
                type="integer"
                name="time"
                bgColor="blue.50"
                placeholder="Time"
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
          <Heading my={3}>Attendence Table</Heading>
          <Button
            colorScheme="telegram"
            leftIcon={<FaPrint />}
            onClick={handlePrint}
          >
            Print
          </Button>
          <VStack>
            <Stack direction="row" alignSelf="flex-end" spacing={4}></Stack>
            <form>
              <Table size="sm" id="attendenceTable">
                <Thead>
                  <Tr>
                    <Th>ID</Th>
                    <Th>Date</Th>
                    <Th>Time</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {attendences.map((attendence, index) => (
                    <Fragment key={index}>
                      <ReadOnlyRowAttendence
                        attendence={attendence}
                        handlePrintRow={handlePrintRow}
                      />
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
