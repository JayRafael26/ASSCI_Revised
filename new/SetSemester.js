import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useSelector, useDispatch } from "react-redux";
import {
  createSemester,
  getSemesters,
  selectSemester,
} from "../../actions/semester";
import { CircularProgress, Radio, Typography } from "@material-ui/core";
import waves from "../../images/wave-haikei.svg";
import {
  CssBaseline,
  Grid,
  makeStyles,
  TextField,
  Button,
  Box,
} from "@material-ui/core";
import { green } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: "20px",
  },
  center: {
    textAlign: "center",
  },
  input: {
    display: "none",
  },
  button: {
    backgroundColor: "#b7b9f7",
    "&:hover": {
      backgroundColor: "#D8D9F6",
    },
  },
  current: {
    fontWeight: 700,
  },
  selected: {
    color: "green",
  },
}));

const SetSemester = () => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const { semesters, isLoading } = useSelector((state) => state.semester);

  const selectedLabel = semesters?.find(
    (sem) => sem.isActive !== false
  )?.acadYear;

  const [sem, setSem] = useState("");

  const [select, setSelect] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      dispatch(createSemester(sem));
      setSem("");
    } catch (error) {
      console.log("Err", error.message);
    }
  };

  const selectSubmit = (e) => {
    e.preventDefault();

    dispatch(selectSemester(select));
  };

  useEffect(() => {
    dispatch(getSemesters());
  }, []);

  return (
    <div style={{height: "100vh",  backgroundImage: `url(${waves})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat'}}>
      <CssBaseline />
      <Sidebar name="Semester" />
      <div className={classes.root}>
        <Grid
          container
          spacing={2}
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid item xs={12} sm={6} md={6} lg={8}>
            <h1>Set Semester</h1>
          </Grid>

          <Grid
            item
            xs={12}
            sm={6}
            md={6}
            lg={4}
            style={{ textAlign: "Right" }}
          >
            {isLoading ? (
              <CircularProgress />
            ) : (
              <h2 className={classes.current}>
                {" "}
                Current Selected:{" "}
                <p className={classes.selected}>{selectedLabel}</p>{" "}
              </h2>
            )}
          </Grid>
        </Grid>

        <hr style={{ marginTop: "10px" }}></hr>

        <br />
        <form onSubmit={selectSubmit}>
          <Grid
            container
            spacing={2}
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs={12} sm={12} md={2} elevation={6}>
              <Box fontWeight="500" textAlign={"left"}>
                <h2>Choose Semester: </h2>
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={8} elevation={6}>
              <TextField
                variant="outlined"
                label="Semester"
                size="small"
                select
                fullWidth
                SelectProps={{
                  native: true,
                }}
                value={sem.acadYear}
                onChange={(e) => setSelect(e.target.value)}
                required
              >
                <option style={{ display: "none" }} />
                {semesters.map((sem, idx) => (
                  <option key={idx} value={sem.acadYear}>
                    {sem.acadYear}
                  </option>
                ))}
              </TextField>
            </Grid>
            <Box
              component={Grid}
              item
              xs={12}
              sm={12}
              md={2}
              elevation={6}
              textAlign={"center"}
            >
              <Button
                type="submit"
                variant="contained"
                className={classes.button}
                height={"100%"}
                fullWidth
              >
                Select
              </Button>
            </Box>
          </Grid>
        </form>
        <br /><br /><br /><br /><br />
          <Grid
            container
            spacing={2}
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid item xs={12} sm={4} md={4} lg={8}>
              <h1>Create Semester</h1>
            </Grid>
          </Grid>

            <hr style={{ marginTop: "10px" }}></hr>
          <br />
          <form onSubmit={handleSubmit} autoComplete="off">
            <Grid
              container
              spacing={2}
              direction="row"
              justifyContent="center"
              alignItems="center"
            >
              <Grid item xs={12} sm={12} md={2} elevation={6}>
                <Box fontWeight="500" textAlign={"left"}>
                  <h2>Academic Year & Term: </h2>
                </Box>
              </Grid>
              <Grid item xs={12} sm={12} md={8} elevation={6}>
                <TextField
                  variant="outlined"
                  fullWidth
                  placeholder="e.g. A.Y. 2021-2022, Special Term"
                  label="Create Semester"
                  margin="none"
                  value={sem}
                  onChange={(e) => setSem(e.target.value)}
                />
              </Grid>
              <Box
                component={Grid}
                item
                xs={12}
                sm={12}
                md={2}
                elevation={6}
                textAlign={"center"}
              >
                <Button
                  type="submit"
                  variant="contained"
                  className={classes.button}
                  height={"100%"}
                  fullWidth
                >
                  Submit
                </Button>
              </Box>
            </Grid>
          </form>
      </div>
    </div>
  );
};

export default SetSemester;
