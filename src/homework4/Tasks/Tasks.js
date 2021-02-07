import React, { PureComponent } from 'react';
import style from "./style.module.css";
import { Card, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import {formatDate} from '../helpers/formatDate'
import {NavLink} from 'react-router-dom';
import {formatDescription} from '../helpers/formatDate';

export default class Tasks extends PureComponent {

    render() {

        const { onPushCheckboxTasks, element, selectedCheckbox, onEditClick, onRemowTask, onCheckboxTask } = this.props;


        return <Card className={` ${selectedCheckbox ? style.selectedCheckbox : style.cardTask} `}
            style={{ width: '18rem' }}>
            <input
                className={style.checkboxInput}
                type='checkbox'
                checked={selectedCheckbox}
                onChange={() => onPushCheckboxTasks(element._id)} />

            <Card.Body>
                <NavLink
                to={`/singletask/${element._id}`} 
                exact
                >
                <Card.Title>{element.title}</Card.Title>
                </NavLink>
                <Card.Text>
                    Description: {formatDescription(element.description)}</Card.Text>
                <Card.Text>
                    Date: {formatDate(element.date)}

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



