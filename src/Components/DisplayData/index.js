import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import axios from "axios";
import {useEffect} from "react";
import {useState} from "react";
import CircularProgress from "@mui/material/CircularProgress/CircularProgress";
import Snackbar from "@mui/material/Snackbar/Snackbar";
import Alert from "@mui/material/Alert/Alert";
import Grid from "@mui/material/Grid/Grid";
import Backdrop from "@mui/material/Backdrop/Backdrop";
import TextField from "@mui/material/TextField/TextField";


const baseUrl = "http://localhost:8080"

const DisplayData = () => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [totalRecords, setTotalRecords] = React.useState(-1)
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState({show: false, msg: ""});
    const [isFromSearch,setIsFromSearch]=useState(false);
    const [filter, setFilter] = useState({
        ID: "", Name: "", Father_Name: "", Gender: "", Email: "", Semester: "", Address: "", Admission_Date: "",
        Registration_NO: "", Image_URL: ""
    })

    const getUser = async (page) => {
        const isTotalPagesRequired = (totalRecords <1 || isFromSearch)? true : false;
        try {
            setLoading(true);

            const response = await axios.get(`${baseUrl}/${page}/${rowsPerPage}/${isTotalPagesRequired}`);
            setIsFromSearch(false);
            setLoading(false);
            if((response.data.users).length<1){
                setPage(0);
                setTotalRecords(0);
                setRowsPerPage(0);
            }else{
                if(rowsPerPage===0){
                    setPage(0);
                    setRowsPerPage(10);
                }
            }
            setData(response.data.users);
            if (response.data.totalPages) setTotalRecords(response.data.totalPages);
        } catch (e) {
            setLoading(false);
            setError({show: true, msg: e.response})
        }
    }

    const searchFilter = async (page) => {
        try {
            setLoading(true);
            setIsFromSearch(true);
            const response = await axios.post(`${baseUrl}/search`, {page, perPage: rowsPerPage, search: filter});
            setLoading(false);
            if ((response.data.users).length < 1) {
                setPage(0);
                setTotalRecords(0);
                setRowsPerPage(0);
            }else{
                if(rowsPerPage===0){
                    setPage(0);
                    setRowsPerPage(10);
                }
            }
            setData(response.data.users);
            if (response.data.totalPages) setTotalRecords(response.data.totalPages);
        } catch (e) {
            setLoading(false);
            setError({show: true, msg: e.response})
        }
    }


    useEffect(() => {
        getUser(0);
    }, [])
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        if (isValidFilter()) searchFilter(newPage)
        else getUser(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleCloseSnackbar = () => {
        setError({show: false, msg: ""})
    }

    const handleChangeFilter = (e, type) => {
        setFilter({...filter, [type]: e.target.value});
    }

    const isValidFilter = () => {
        for (const property in filter) {
            if (filter[property] && filter[property].length > 0) {
                return true;
            }
        }
        return false;
    }

    const onKeyPress = (event) => {
        if (event.key === 'Enter') {
            if (isValidFilter()) searchFilter();
            else getUser(0);
        }
    }


    console.log("filter = ", filter);
    const ContainerData = data.map((d, index) => <TableRow hover tabIndex={-1} key={d.ID + index}>
        <TableCell key={d.ID + index} align="center" style={{wordBreak: "break-word"}}>
            {d.ID}
        </TableCell>
        <TableCell key={d.Name + index} align="center" style={{wordBreak: "break-word"}}>
            {d.Name}
        </TableCell>
        <TableCell key={d.Father_Name + index} align="center" style={{wordBreak: "break-word"}}>
            {d.Father_Name}
        </TableCell>
        <TableCell key={d.Gender + index} align="center" style={{wordBreak: "break-word"}}>
            {d.Gender}
        </TableCell>
        <TableCell key={d.Email + index} align="center" style={{wordBreak: "break-word"}}>
            {d.Email}
        </TableCell>
        <TableCell key={d.Semester + index} align="center" style={{wordBreak: "break-word"}}>
            {d.Semester}
        </TableCell>
        <TableCell key={d.Address + index} align="center" style={{wordBreak: "break-word"}}>
            {d.Address}
        </TableCell>
        <TableCell key={d.Admission_Date + index} align="center" style={{wordBreak: "break-word"}}>
            {d.Admission_Date}
        </TableCell>
        <TableCell key={d.Registration_NO + index} align="center" style={{wordBreak: "break-word"}}>
            {d.Registration_NO}
        </TableCell>
        <TableCell key={d.Image_URL + index} align="center" style={{wordBreak: "break-word"}}>
            {d.Image_URL}
        </TableCell>
    </TableRow>);

    return (
        <Paper sx={{width: '100%', height: "100%"}}>

            {
                loading &&
                <Backdrop
                    sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}} open={true}>
                    <CircularProgress color="inherit"/>
                </Backdrop>
            }
            <Snackbar
                style={{width: "100%"}}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                autoHideDuration={2000}
                open={error.show}
                message={error.msg}
                key={error.msg}
                onClose={handleCloseSnackbar}
            >
                <Alert severity="error">{error.msg}</Alert>
            </Snackbar>
            <TableContainer style={{height: "91%", overflow: "scroll"}}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" style={{minWidth: 150}}>
                                ID
                            </TableCell>
                            <TableCell align="center" style={{minWidth: 150}}>
                                Name
                            </TableCell>
                            <TableCell align="center" style={{minWidth: 150}}>
                                Father Name
                            </TableCell>
                            <TableCell align="center" style={{minWidth: 150}}>
                                Gender
                            </TableCell>
                            <TableCell align="center" style={{minWidth: 150}}>
                                Email
                            </TableCell>
                            <TableCell align="center" style={{minWidth: 150}}>
                                Semester
                            </TableCell>
                            <TableCell align="center" style={{minWidth: 150}}>
                                Address
                            </TableCell>
                            <TableCell align="center" style={{minWidth: 150}}>
                                Admission Date
                            </TableCell>
                            <TableCell align="center" style={{minWidth: 150}}>
                                Registration No
                            </TableCell>
                            <TableCell align="center" style={{minWidth: 150}}>
                                Image
                            </TableCell>
                        </TableRow>
                        <TableRow hover tabIndex={-1} key={"INPUT_ROW_CONTAINER"}>
                            <TableCell key={"INPUT_ROW_ID"} align="center" style={{wordBreak: "break-word"}}>
                                <TextField id="standard-basic" label="ID" variant="standard"
                                           onKeyPress={onKeyPress}
                                           onChange={(e) => handleChangeFilter(e, "ID")}/>
                            </TableCell>
                            <TableCell key={"INPUT_ROW_NAME"} align="center" style={{wordBreak: "break-word"}}>
                                <TextField id="standard-basic" label="Name" variant="standard"
                                           onKeyPress={onKeyPress}
                                           onChange={(e) => handleChangeFilter(e, "Name")}/>
                            </TableCell>
                            <TableCell key={"INPUT_ROW_FATHER_NAME"} align="center" style={{wordBreak: "break-word"}}>
                                <TextField id="standard-basic" label="Father Name" variant="standard"
                                           onKeyPress={onKeyPress}
                                           onChange={(e) => handleChangeFilter(e, "Father_Name")}/>
                            </TableCell>
                            <TableCell key={"INPUT_ROW_GENDER"} align="center" style={{wordBreak: "break-word"}}>
                                <TextField id="standard-basic" label="Gender" variant="standard"
                                           onKeyPress={onKeyPress}
                                           onChange={(e) => handleChangeFilter(e, "Gender")}/>
                            </TableCell>
                            <TableCell key={"INPUT_EMAIL"} align="center" style={{wordBreak: "break-word"}}>
                                <TextField id="standard-basic" label="Email" variant="standard"
                                           onKeyPress={onKeyPress}
                                           onChange={(e) => handleChangeFilter(e, "Email")}/>
                            </TableCell>
                            <TableCell key={"INPUT_SEMESTER"} align="center" style={{wordBreak: "break-word"}}>
                                <TextField id="standard-basic" label="Semester" variant="standard"
                                           onKeyPress={onKeyPress}
                                           onChange={(e) => handleChangeFilter(e, "Semester")}/>
                            </TableCell>
                            <TableCell key={"INPUT_ADDRESS"} align="center" style={{wordBreak: "break-word"}}>
                                <TextField id="standard-basic" label="Address" variant="standard"
                                           onKeyPress={onKeyPress}
                                           onChange={(e) => handleChangeFilter(e, "Address")}/>
                            </TableCell>
                            <TableCell key={"INPUT_ADDMISSION"} align="center" style={{wordBreak: "break-word"}}>
                                <TextField id="standard-basic" label="Admission" variant="standard"
                                           onKeyPress={onKeyPress}
                                           onChange={(e) => handleChangeFilter(e, "Admission_Date")}/>
                            </TableCell>
                            <TableCell key={"INPUT_REGISTRATION_NUMBER"} align="center"
                                       style={{wordBreak: "break-word"}}>
                                <TextField id="standard-basic" label="Registration Number" variant="standard"
                                           onKeyPress={onKeyPress}
                                           onChange={(e) => handleChangeFilter(e, "Registration_NO")}/>
                            </TableCell>
                            <TableCell key={"INPUT_IMAGE_URL"} align="center" style={{wordBreak: "break-word"}}>
                                <TextField id="standard-basic" label="Image Url" variant="standard"
                                           onKeyPress={onKeyPress}
                                           onChange={(e) => handleChangeFilter(e, "Image_URL")}/>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {ContainerData}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10]}
                component="div"
                count={totalRecords}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}
export default DisplayData;