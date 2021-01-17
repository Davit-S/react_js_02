import React, { Component } from 'react';
import style from "./style.module.css";
import { Card, Button } from 'react-bootstrap';
import PropTypes from 'prop-types'; 


export default class Tasks extends Component {

    changeInputValue = (event) => {

        let {onChangeInputValue} = this.props;
        let inputClassName = event.target.classList[0];

        if (inputClassName === style.editinputTitle) {
            onChangeInputValue(event.target.value, 'title')
            return;
        };

        if (inputClassName === style.editinputDescription) {
            onChangeInputValue(event.target.value, 'description')
            return
        };

    }



    render() {

        let element = this.props.newTasks;
        let dateYear = new Date();
        let { onPushCheckboxTasks, onEditClick, onSaveEditTask, onRemowTask, onCheckboxTask } = this.props;

        return <Card style={{ width: '18rem' }}>
            <input type='checkbox' onChange={(event) => onPushCheckboxTasks(element._id)} />

            <Card.Body hidden={element.editHidden}>
                <div>
                    <input
                        className={style.editinputTitle}
                        onChange={this.changeInputValue}
                        type="text"
                    />

                    <br></br> <textarea
                        className={style.editinputDescription}
                        onChange={this.changeInputValue}
                        type="text">
                    </textarea>


                    <Button variant="secondary"
                        className={style.taskButton}
                        onClick={(event) => { onEditClick(element._id, "CANCLE") }}
                    > CANCLE </Button>
                    <Button variant="primary"
                        className={style.taskButton}
                        onClick={(event) => { onSaveEditTask(element._id) }}
                    > SAVE </Button>
                </div>
            </Card.Body>

            <Card.Body hidden={element.hidden}>
                <Card.Title>{element.title}</Card.Title>
                <Card.Title>{element.description}</Card.Title>
                <Card.Text>
                    {dateYear.getDate()} {dateYear.getMonth() + '1'} {dateYear.getFullYear()}
                </Card.Text>
                <Button variant="warning"
                    onClick={(event) => { onEditClick(element._id, "EDIT") }}
                    className={style.taskButton}
                > EDIT </Button>
                <Button variant="danger"
                    onClick={(event) => { onRemowTask(element._id) }}
                    disabled={!!onCheckboxTask.size}
                    className={style.taskButton}
                > REMOW </Button>
            </Card.Body>
        </Card>

    }

}

Tasks.propTypes = {
    onPushCheckboxTasks: PropTypes.func.isRequired,
    newTasks: PropTypes.object.isRequired,
    onChangeInputValue: PropTypes.func.isRequired,
    onEditClick: PropTypes.func.isRequired,
    onSaveEditTask: PropTypes.func.isRequired,
    onCheckboxTask: PropTypes.object.isRequired,
    onRemowTask: PropTypes.func.isRequired
}



