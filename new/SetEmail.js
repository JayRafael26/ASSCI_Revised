import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Sidebar from "../../components/Sidebar/Sidebar";
import { createEmail, getEmail, deleteEmail } from "../../actions/emails";
import waves from "../../images/blob-scene-haikei.svg";
import {
  CircularProgress,
  CssBaseline,
  Box,
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Grid,
  createTheme,
  MuiThemeProvider,
} from "@material-ui/core";

import SearchIcon from "@material-ui/icons/Search";
import { withStyles, makeStyles } from "@material-ui/core/styles";

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 450,
      md: 600,
      tablet: 768,
      lg: 900,
      xl: 1200,
    },
  },
});

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#9EA1E9",
    color: theme.palette.common.white,
  },
}))(TableCell);

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    padding: "30px",
  },
  table: {
    marginTop: "20px",
  },
  marginBot: {
    marginBottom: "10px",
  },
  button: {
    backgroundColor: "#b7b9f7",
    "&:hover": {
      backgroundColor: "#D8D9F6",
      color: "#3c52b2",
    },
  },
});
const SetEmail = () => {
  const classes = useStyles();

  const [email, setEmail] = useState("");

  const dispatch = useDispatch();

  const { emails, isLoading } = useSelector((state) => state.emails);

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(createEmail(email));
  };

  useEffect(() => {
    dispatch(getEmail());
  }, []);

  return (
    <>
    <div style={{height: "100vh",  backgroundImage: `url(${waves})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat'}}>
      <Sidebar name="Set Email" />
      <MuiThemeProvider theme={theme}>
        <div className={classes.root}>
          <CssBaseline />
          <Grid
            container
            spacing={1}
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid item xs={12} sm={4} md={4} lg={8}>
              <h1>Accepted Emails</h1>
            </Grid>
          </Grid>

          <Box
            component={Grid}
            item
            xs={12}
            display={{ xs: "none", sm: "none", md: "block" }}
          >
            <hr style={{ marginTop: "10px" }}></hr>
          </Box>
          <Box>
            <TableContainer>
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="center">
                      Email Address
                    </StyledTableCell>
                    <StyledTableCell align="center">Actions</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {emails.map((em) => (
                    <TableRow key={em._id}>
                      <TableCell align="center"> {em.email}</TableCell>
                      <TableCell align="center">
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={() => dispatch(deleteEmail(em._id))}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>

          <br />
          <Grid
            container
            spacing={2}
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid item xs={12} sm={4} md={4} lg={8}>
              <h1>Add Email Format</h1>
            </Grid>
          </Grid>

          <Box
            component={Grid}
            item
            xs={12}
            display={{ xs: "none", sm: "none", md: "block" }}
          >
            <hr style={{ marginTop: "10px" }}></hr>
          </Box>
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
                <Box fontWeight="500" my={2} textAlign={"left"}>
                  <h2>New Accepted Email: </h2>
                </Box>
              </Grid>
              <Grid item xs={12} sm={12} md={8} elevation={6}>
                <TextField
                  label="Email Format"
                  fullWidth
                  type="text"
                  placeholder="e.g. cics@ust.edu.ph"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  variant="outlined"
                  id="outlined-basic"
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
      </MuiThemeProvider>
      </div>
    </>
  );
};

export default SetEmail;
