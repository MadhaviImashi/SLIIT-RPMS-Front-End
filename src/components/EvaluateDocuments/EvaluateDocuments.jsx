import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import { Col, Card, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import SideNav from "../../shared/SideNav/SideNav";
import TableRow from "./TableRow";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const EvaluateDocuments = () => {
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const id = useSelector((state) => state.login.userID);
  const [index, setIndex] = useState(0);
  const [refresh, setRefresh] = useState(false);

  console.log(data);
  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    fetch("http://localhost:4000/api/acedemicStaff/getDocs", {
      method: "POST",
      body: JSON.stringify({ id }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.status === 201) {
          return response.json();
        } else {
          throw new Error("fetch Failed");
        }
      })
      .then((result) => {
        setData(result.submissions);
        setIsLoading(false);
        setIsError(false);
      })
      .catch((err) => {
        setIsLoading(false);
        setIsError(true);
      });
  }, [refresh]);

  const nextHandler = () => {
    setIndex((i) => {
      let newIndex = i + 1;
      if (newIndex < data.length) {
        return newIndex;
      } else {
        return 0;
      }
    });
  };

  const prevHandler = () => {
    setIndex((i) => {
      let newIndex = i - 1;
      if (newIndex > -1) {
        return newIndex;
      } else {
        return data.length - 1;
      }
    });
  };

  return (
    <div>
      <SideNav />
      <div className="container justify-content-center">
        <div className="fs-4 text-primary mt-4 d-flex justify-content-between">
          <div>Evaluate Documents </div>
          <div></div>
        </div>
        <div className="fs-5 mt-4 d-flex justify-content-between">
          <div>Submissons for : {data && data[index].name} </div>
          <div><div className="d-flex justify-content-end">
          <button className="btn btn-outline-primary mx-2" onClick={prevHandler}>
           <ArrowBackIosIcon/> Prev
          </button>
          <button className="btn btn-outline-primary" onClick={nextHandler}>
            Next <ArrowForwardIosIcon/>
          </button>
        </div></div>
        </div>

        <TableRow
          noBtn
          col1={"Group ID"}
          col2="Submitted On"
          col3="Note"
          col4="Grade"
          col5="Files"
        />
        {data &&
          data[index].submissions.map((submisson, index) => {
            return (
              <TableRow
                refresh={setRefresh}
                key={index}
                id={submisson._id}
                col1={submisson.groupID}
                col2={submisson.submittedDate}
                col3={submisson.note}
                col4={submisson.grade}
                col5={submisson.documents.map((link, i) => (
                  <a key={i} href={link.file}>
                    {link.name}
                  </a>
                ))}
              />
            );
          })}
      </div>
    </div>
  );
};

export default EvaluateDocuments;
