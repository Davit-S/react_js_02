import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Row, Col, InputGroup, Button, FormControl, DropdownButton, Dropdown } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { formatText, formatDate } from "../helpers/formatTexts";
import {getTasks} from "../store/actions";


function SearchTask() {

    const [status, setStatus] = useState('Status');
    const [sort, setSort] = useState('Sort');
    const [search, setSearch] = useState('');

    const statusDrop = [
        {
            label: 'All',
            value: ''
        },
        {
            label: "Active",
            value: "active"
        },
        {
            label: "Done",
            value: "done"
        }
    ];

    const sortDrop = [
        {
            label: 'All',
            value: ''
        },
        {
            label: ' A-Z ',
            value: 'a-z'
        },
        {
            label: " Z-A ",
            value: "z-a"
        },
        {
            label: "Creation date oldest",
            value: "creation_date_oldest"
        },
        {
            label: "Creation date newest",
            value: "creation_date_newest"
        },
        {
            label: "Completion date oldest",
            value: "completion_date_oldest"
        },
        {
            label: "Completion date newest",
            value: "completion_date_newest"
        }
    ];

    const dateOptions = [
        {
            label: 'Created before',
            value: 'create_lte'
        },
        {
            label: 'Created after',
            value: 'create_gte'
        },
        {
            label: 'Complete before',
            value: 'complete_lte'
        },
        {
            label: 'Complete after',
            value: 'complete_gte'
        }
    ];



    const [dates, setDates] = useState({
        create_lte: null,
        create_gte: null,
        complete_lte: null,
        complete_gte: null
    });

    const handleChangeDate = (value, name) => {
        setDates({
            ...dates,
            [name]: value
        });
    };

    const handleSubmit = () => {

        let params = {};

        search && (params.search = search);
        sort.value && (params.sort = sort.value);
        status.value && (params.status = status.value);

        for (let key in dates) {
            const value = dates[key];
            if (value) {
                const date = formatDate(value.toISOString());
                params[key] = date;
            }
        }

        params = Object.entries(params).map(([key,value])=>`${key}=${value}`).join('&');
        getTasks(params)
    }


    return (
        <div className="mb-3">
            <InputGroup >

                <FormControl
                    className="mb-3"
                    placeholder="Search"
                    onChange={(event) => { setSearch(event.target.value) }}
                />

                <DropdownButton
                    className="mb-3"
                    as={InputGroup.Prepend}
                    variant="outline-secondary"
                    title={status.value ? status.label : 'Status'}
                    id="input-group-dropdown-1"
                >
                    {
                        statusDrop.map((option, index) => (
                            <Dropdown.Item
                                key={index}
                                active={status.label === option.label}
                                onClick={() => { setStatus(option) }}
                            >
                                {option.label}
                            </Dropdown.Item>
                        ))
                    }
                </DropdownButton>

                <DropdownButton
                    className="mb-3"
                    as={InputGroup.Prepend}
                    variant="outline-secondary"
                    title={sort.value ? formatText(sort.label, 10) : 'Sort'}
                    id="input-group-dropdown-1"
                >
                    {
                        sortDrop.map((option, index) => (
                            <Dropdown.Item
                                key={index}
                                active={sort.label === option.label}
                                onClick={() => { setSort(option) }}
                            >
                                {option.label}
                            </Dropdown.Item>
                        ))
                    }
                </DropdownButton>

                <InputGroup.Append>

                    <Button
                        className="mb-3"
                        variant="outline-primary"
                        onClick={handleSubmit}
                    >
                        Search</Button>
                </InputGroup.Append>

            </InputGroup>

            <Row className="mb-5">
                {
                    dateOptions.map((option, index) => (
                        <Col md={3}
                            key={index}>
                            <span>{option.label} </span>
                            <DatePicker
                                selected={dates[option.value]}
                                onChange={(value) => handleChangeDate(value, option.value)}
                            />
                        </Col>
                    ))
                }

            </Row>



        </div>

    )

}

const mapDispatchToProps = {
    getTasks
  };

export default connect(null, mapDispatchToProps)(SearchTask);