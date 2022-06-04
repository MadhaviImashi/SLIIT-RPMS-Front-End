import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { Box, Button } from "@mui/material";
import * as Yup from "yup";

const AllocateMembers = ({
  groupDetails,
  setGroupData,
  activeStep,
  handleBack,
  handleNext,
  steps,
}) => {
  const [data, setData] = useState(null);
  const formik = useFormik({
    initialValues: {
      firstMember: "",
      secondMember: "",
      thirdMember: "",
    },
    validationSchema: Yup.object({
      firstMember: Yup.string().required("Required field"),
      secondMember: Yup.string().required("Required field"),
      thirdMember: Yup.string().required("Required field"),
    }),
    onSubmit: (values) => {
      if (values.firstMember === values.secondMember) {
        formik.setErrors({
          firstMember: "Duplicate allocation! Please select different member",
        });
        formik.setErrors({
          secondMember: "Duplicate allocation! Please select different member",
        });
      } else if (values.firstMember === values.thirdMember) {
        formik.setErrors({
          firstMember: "Duplicate allocation! Please select different member",
        });
        formik.setErrors({
          thirdMember: "Duplicate allocation! Please select different member",
        });
      } else if (values.secondMember === values.thirdMember) {
        formik.setErrors({
          thirdMember: "Duplicate allocation! Please select different member",
        });
        formik.setErrors({
          secondMember: "Duplicate allocation! Please select different member",
        });
      } else {
        const selected = data.filter((member) => {
          return (
            member._id === values.firstMember ||
            member._id === values.secondMember ||
            member._id === values.thirdMember
          );
        });
        setGroupData(() => ({ ...groupDetails, panelMembers: selected }));
        handleNext();
      }
    },
  });

  useEffect(() => {
    fetch("http://localhost:4000/api/admin/get-panel", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.status !== 500) {
          return response.json();
        } else {
          throw new Error("An error occured while fetching data");
        }
      })
      .then((result) => {
        setData(result.panelMembers); ///
      })
      .catch((err) => {});
  }, []);

  return (
    <form onSubmit={formik.handleSubmit} onBlur={formik.handleBlur}>
      <div
        className="d-flex pt-3  justify-content-center"
        style={{ height: "25.85rem" }}
      >
        <div className="col-10 my-3 ps-5">
          <div className="my-2"> Panel Member 1 </div>

          <div className="pt-1">
            <select
              className={`input ${
                formik.touched.firstMember && formik.errors.firstMember
                  ? "input-error"
                  : ""
              }`}
              name="firstMember"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.firstMember}
            >
              {data &&
                data.map((pmember, index) => {
                  return (
                    <option value={pmember._id} key={index}>
                      {pmember.name}
                    </option>
                  );
                })}
            </select>
            <div className="p-1 pt-2 text-danger">
              {formik.touched.firstMember && formik.errors.firstMember
                ? formik.errors.firstMember
                : null}
            </div>
          </div>

          <div className="my-2"> Panel Member 2 </div>
          <div className="pt-2">
            <select
              className={`input ${
                formik.touched.secondMember && formik.errors.secondMember
                  ? "input-error"
                  : ""
              }`}
              name="secondMember"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.secondMember}
            >
              {data &&
                data.map((pmember, index) => {
                  return (
                    <option value={pmember._id} key={index}>
                      {pmember.name}
                    </option>
                  );
                })}
            </select>
            <div className="p-1 pt-2 text-danger">
              {formik.touched.secondMember && formik.errors.secondMember
                ? formik.errors.secondMember
                : null}
            </div>
          </div>
          <div className="my-2"> Panel Member 3 </div>
          <div className="pt-2">
            <select
              className={`input ${
                formik.touched.thirdMember && formik.errors.thirdMember
                  ? "input-error"
                  : ""
              }`}
              name="thirdMember"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.thirdMember}
            >
              {data &&
                data.map((pmember, index) => {
                  return (
                    <option value={pmember._id} key={index}>
                      {pmember.name}
                    </option>
                  );
                })}
            </select>
            <div className="p-1 pt-2 text-danger">
              {formik.touched.thirdMember && formik.errors.thirdMember
                ? formik.errors.thirdMember
                : null}
            </div>
          </div>
        </div>
      </div>
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        <Button
          color="inherit"
          disabled={activeStep === 0}
          onClick={handleBack}
          type={"button"}
          sx={{ mr: 1 }}
        >
          Back
        </Button>
        <Box sx={{ flex: "1 1 auto" }} />
        <Button type="submit" name={"submit"}>
          {activeStep === steps.length - 1 ? "Finish" : "Next"}
        </Button>
      </Box>
    </form>
  );
};

export default AllocateMembers;
