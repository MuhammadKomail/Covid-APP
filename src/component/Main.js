import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import { useNavigate } from "react-router";
import { Link } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown'
import Container from 'react-bootstrap/Container'
// import { DropdownButton } from 'react-bootstrap'
import DropdownButton from 'react-bootstrap/DropdownButton'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


export default function Main() {


    const [data1, setData] = useState([])

    const navigate = useNavigate();

    const apiHandle = axios.create({
        baseURL: "https://api.covidtracking.com/v1/states",
    });

    const sendDate = (f, g, h, i) => {
        let obj = {
            state: f,
            pos: g,
            neg: h,
            death: i
        };
        navigate('/sub', { state: obj })
        console.log(h)
    }
    const HandleChange = (val) => {
        if (val == 'All') {
            getData()
            setData(data1)
            console.log('ALL')
        }
        else if (val) {
            const newData = data1.filter(item => item.state === val)
            setData(newData)
        }

        else {
            console.log(val)
        }
    }

    const getData = () => {
        apiHandle.get("/current.json").then((e) => {
            setData(e.data)
            console.log(e.data);
        });
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <div>
            <div>

                {/* {data1 == 0 ? null : console.log(data1)} */}
                <div>
                    <FormControl style={{ width: "40%", margin: '20px' }}>
                        <InputLabel id="demo-simple-select-label">Filter</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value="Filter By State"
                            label="Age"
                            onChange={(e) => HandleChange(e.target.value)}

                        >
                            <MenuItem value="All">All</MenuItem>
                            <MenuItem value="AK">AK</MenuItem>
                            <MenuItem value="AR">AR</MenuItem>
                            <MenuItem value="AL">AL</MenuItem>
                            <MenuItem value="AS">AS</MenuItem>
                            <MenuItem value="AZ">AZ</MenuItem>
                            <MenuItem value="CA">CA</MenuItem>
                            <MenuItem value="CO">CO</MenuItem>
                            <MenuItem value="CT">CT</MenuItem>
                            <MenuItem value="DE">DE</MenuItem>
                            <MenuItem value="FL">FL</MenuItem>
                            <MenuItem value="GU">GU</MenuItem>
                            <MenuItem value="GA">GA</MenuItem>
                            <MenuItem value="HI">HI</MenuItem>
                            <MenuItem value="IL">IL</MenuItem>
                            <MenuItem value="ID">ID</MenuItem>
                        </Select>
                    </FormControl>
                </div>

                <Container>
                    <Table striped bordered hover variant="dark">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Date</th>
                                <th>State</th>
                            </tr>
                        </thead>
                        {
                            data1.map((e, index) => {
                                return (
                                    <tbody>
                                        <tr key={index}>

                                            <td>{index + 1}</td>
                                            <td>
                                                {/* <a onClick={sendDate}>{data1[index].date}</a> */}
                                                <div className="navbar-brand">
                                                    <a
                                                        role="button"
                                                        onClick={() => sendDate(e.state, e.positive, e.negative, e.death)}
                                                    >
                                                        {e.date}
                                                    </a>
                                                </div>
                                            </td>
                                            <td>{e.state}</td>
                                        </tr>
                                    </tbody>
                                )
                            })

                        }
                    </Table>
                </Container>
            </div>
        </div>
    )
}
