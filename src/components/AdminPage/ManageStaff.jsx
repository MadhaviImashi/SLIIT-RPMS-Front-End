import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import { Col, Card, InputGroup, Row, FormControl } from "react-bootstrap";
import SideNav from "../../shared/SideNav/SideNav";
import UserTableRow from "./UserTableRow";
import DeleteUserModal from "./DeleteUserModal";
import UpdateStaffModal from "./UpdateStaffModal";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

const ManageStaff = () => {
  const [deleteModalShow, setDeleteModalShow] = React.useState(false);
  const [deleteID, setDeleteID] = React.useState("");
  const [userDeleted, setUserDeleted] = React.useState(false);

  const [updateModalShow, setupdateModalShow] = React.useState(false);
  const [updateID, setUpdateID] = React.useState("");
  const [userUpdated, setUserUpdated] = React.useState(false);

  const [error, setError] = useState(null);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState(null);

  const [isLoading, setIsLoading] = useState(null);

  const [searchKey, setSearchKey] = useState("");
  const [dataList, setDataList] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    fetch("http://localhost:4000/api/admin/get-academicStaff", {
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
        setDataList(result.academics);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setIsError(true);
        setIsLoading(false);
      });
  }, [userDeleted, userUpdated]);

  useEffect(() => {
    setIsLoading(true);
    setDataList((previous) => {
      if (data) {
        setIsLoading(true);
        return data.filter((academic) =>
          academic.name.toLowerCase().indexOf(searchKey.toLowerCase()) != -1 ||
          academic.academicStaffId
            .toLowerCase()
            .indexOf(searchKey.toLowerCase()) != -1
            ? academic
            : null
        );
      } else {
        setIsLoading(true);
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
          <div>Staff Details</div>
          <div>
            <InputGroup className="mb-3">
              <FormControl
                placeholder="Search Staff"
                onChange={(e) => {
                  setSearchKey(e.target.value);
                }}
              />
            </InputGroup>
          </div>
        </div>
        <Card>
          <Row className="text-center my-3 text-secondary">
            <Col className="maxmin">Member ID</Col>
            <Col className="maxmin">Name</Col>
            <Col className="maxmin">Email</Col>
            <Col className="maxmin">Designation</Col>
            <Col className="maxmin">Faculty</Col>
            <Col className="maxmin">Contact No</Col>
            <Col className="maxmin">Edit/Delete</Col>
          </Row>
        </Card>
        {dataList &&
          dataList.map((academic, index) => {
            return (
              <UserTableRow
                key={index}
                index={index}
                col1={academic.academicStaffId}
                col2={academic.name}
                col3={academic.email}
                col4={academic.designation}
                col5={academic.faculty}
                col6={academic.contactNumber}
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
        userType={"academicStaffId"}
        apiUrl={"http://localhost:4000/api/admin/remove-academic-staff"}
        userdeleted={() => {
          setUserDeleted((previous) => !previous);
        }}
        onHide={() => setDeleteModalShow(false)}
      />
      {updateModalShow && (
        <UpdateStaffModal
          show={updateModalShow}
          academic={dataList && dataList[updateID]}
          userupdated={() => {
            setUserUpdated((previous) => !previous);
          }}
          onHide={() => setupdateModalShow(false)}
        />
      )}
    </div>
  );
};

export default ManageStaff;
