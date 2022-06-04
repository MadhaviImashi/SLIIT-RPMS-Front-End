import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import { Col, Card, InputGroup, Row, FormControl } from "react-bootstrap";
import SideNav from "../../shared/SideNav/SideNav";
import UserTableRow from "./UserTableRow";
import DeleteUserModal from "./DeleteUserModal";
import UpdateStudentModal from "./UpdateStudentModal";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

const ManageStudents = () => {
  const [deleteModalShow, setDeleteModalShow] = React.useState(false);
  const [deleteID, setDeleteID] = React.useState("");
  const [userDeleted, setUserDeleted] = React.useState(false);

  const [updateModalShow, setupdateModalShow] = React.useState(false);
  const [updateID, setUpdateID] = React.useState("");
  const [userUpdated, setUserUpdated] = React.useState(false);
  const [isLoading, setIsLoading] = useState(null);

  const [error, setError] = useState(null);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState(null);

  const [searchKey, setSearchKey] = useState("");
  const [dataList, setDataList] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    fetch("http://localhost:4000/api/admin/get-students", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.status !== 500) {
          return response.json();
        } else {
          throw new Error("");
        }
      })
      .then((result) => {
        setIsError(true);
        setData(result.students);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setIsError(true);
        setIsLoading(false);
      });
  }, [userDeleted, userUpdated]);

  useEffect(() => {
    setIsLoading(true)
    setDataList((previous) => {
      if (data) {
        setIsLoading(false);
        return data.filter((student) =>
          student.name.toLowerCase().indexOf(searchKey.toLowerCase()) != -1 ||
          student.studentId.toLowerCase().indexOf(searchKey.toLowerCase()) != -1
            ? student
            : null
        );
      } else {
        setIsLoading(false);
        return previous;
      }
    });
  }, [data, searchKey]);

  return (
    <div>
      <SideNav />
      <div className="container ">
      {isLoading && <LoadingSpinner />}
        <div className="fs-3 mt-4 d-flex justify-content-between">
          <div>Students</div>
          <div>
            <InputGroup className="mb-3">
              <FormControl
                placeholder="Search Student"
                onChange={(e) => {
                  setSearchKey(e.target.value);
                }}
              />
            </InputGroup>
          </div>
        </div>
        <Card>
          <Row className="text-center my-3 text-secondary">
            <Col className="maxmin">Student ID</Col>
            <Col className="maxmin">Name</Col>
            <Col className="maxmin">Email</Col>
            <Col className="maxmin">Specialization</Col>
            <Col className="maxmin">Faculty</Col>
            <Col className="maxmin">Contact No</Col>
            <Col className="maxmin">Edit/Delete</Col>
          </Row>
        </Card>
        {data &&
          dataList.map((student, index) => {
            return (
              <UserTableRow
                key={index}
                index={index}
                col1={student.studentId}
                col2={student.name}
                col3={student.email}
                col4={student.specialization}
                col5={student.faculty}
                col6={student.contactNumber}
                deleteModal={setDeleteModalShow}
                deleteID={setDeleteID}
                updateModal={setupdateModalShow}
                updateID={setUpdateID}
              />
            );
          })}
      </div>
      <DeleteUserModal
        show={deleteModalShow}
        userid={deleteID}
        userType={"studentId"}
        apiUrl={"http://localhost:4000/api/admin/remove-student"}
        userdeleted={() => {
          setUserDeleted((previous) => !previous);
        }}
        onHide={() => setDeleteModalShow(false)}
      />
      {updateModalShow && (
        <UpdateStudentModal
          show={updateModalShow}
          student={dataList && dataList[updateID]}
          userupdated={() => {
            setUserUpdated((previous) => !previous);
          }}
          onHide={() => setupdateModalShow(false)}
        />
      )}
    </div>
  );
};

export default ManageStudents;
