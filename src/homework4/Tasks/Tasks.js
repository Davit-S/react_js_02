import React, { PureComponent } from 'react';
import style from "./style.module.css";
import { Card, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';


export default class Tasks extends PureComponent {

    render() {

        const dateYear = new Date();
        const { onPushCheckboxTasks, element, selectedCheckbox, onEditClick, onRemowTask, onCheckboxTask } = this.props;

        return <Card className={` ${selectedCheckbox ? style.selectedCheckbox : style.cardTask} `}
            style={{ width: '18rem' }}>
            <input
                className={style.checkboxInput}
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
                >  <FontAwesomeIcon icon={faEdit} /> </Button>
                <Button variant="danger"
                    onClick={() => { onRemowTask(element._id) }}
                    disabled={!!onCheckboxTask.size}
                    className={style.taskButton}
                >   <FontAwesomeIcon icon={faTrash} />
                </Button>
            </Card.Body>
        </Card>

    }

}

Tasks.propTypes = {
    onPushCheckboxTasks: PropTypes.func.isRequired,
    onCheckboxTask: PropTypes.object.isRequired,
    onRemowTask: PropTypes.func.isRequired,
    onEditClick: PropTypes.func.isRequired,
    element: PropTypes.object.isRequired
};



