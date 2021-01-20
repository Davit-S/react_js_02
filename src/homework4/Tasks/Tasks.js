import React, { Component } from 'react';
import style from "./style.module.css";
import { Card, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';


export default class Tasks extends Component {

    render() {

        let dateYear = new Date();
        let { onPushCheckboxTasks, element, selectedCheckbox, onEditClick, onRemowTask, onCheckboxTask } = this.props;

        return <Card style={{ width: '18rem' }}>
            <input
                type='checkbox'
                checked={selectedCheckbox}
                onChange={() => onPushCheckboxTasks(element._id)} />

            <Card.Body>
                <Card.Title>{element.title}</Card.Title>
                <Card.Title>{element.description}</Card.Title>
                <Card.Text>
                    {dateYear.getDate()} {dateYear.getMonth() + '1'} {dateYear.getFullYear()}
                </Card.Text>
                <Button variant="warning"
                    onClick={() => { onEditClick(element) }}
                    className={style.taskButton}
                > EDIT </Button>
                <Button variant="danger"
                    onClick={() => { onRemowTask(element._id) }}
                    disabled={!!onCheckboxTask.size}
                    className={style.taskButton}
                > REMOW </Button>
            </Card.Body>
        </Card>  
        
    }

}

Tasks.propTypes = {
    onPushCheckboxTasks: PropTypes.func.isRequired,
    onEditClick: PropTypes.func.isRequired,
    onCheckboxTask: PropTypes.object.isRequired,
    onRemowTask: PropTypes.func.isRequired,
    onEditClick: PropTypes.func.isRequired
}



