import React, { PureComponent } from 'react';
import styles from './stylesToDo.module.css';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Tasks from "./Tasks/Tasks";
import TaskInput from "../homework4/TaskInput/TaskInput";
import Confirm from './Confirm';
import EditTask from './Tasks/EditTask';
import { connect } from 'react-redux';
import { getTasks, deleteTask, deleteTasks } from './store/actions';
import SearchTask from './Search Task/SearchTask';


class ToDoList extends PureComponent {

    state = {
        showDeleteTasks: false,
        showAddNewTask: false,
        checkboxTask: new Set(),
        showConfirm: false,
        editTask: null
    };


    ////////

    componentDidMount() {
        this.props.getTasks();
    }


    componentDidUpdate(prevProps) {
        if (!prevProps.addTaskSuccess && this.props.addTaskSuccess) {
            this.setState({
                showAddNewTask: false
            });
            return;
        }

        if (!prevProps.deleteTasksSuccess && this.props.deleteTasksSuccess) {
            this.setState({
                selectedTasks: new Set(),
                showConfirm: false
            });
            return;
        }

        if (!prevProps.editTasksSuccess && this.props.editTasksSuccess) {
            this.setState({
                editTask: null
            });
            return;
        }

    };


    ///////////

    pushCheckboxTasks = (taskId) => {

        let newCheckboxTask = new Set(this.state.checkboxTask);

        if (newCheckboxTask.has(taskId)) {
            newCheckboxTask.delete(taskId)
        }
        else {
            newCheckboxTask.add(taskId)
        }

        this.setState({
            checkboxTask: newCheckboxTask
        });

    };


    ////////

    toggleConfirm = () => {
        this.setState({
            showConfirm: !this.state.showConfirm
        });
    };

    closeTask = () => {
        this.setState({
            editTask: null
        });
    }

    ////////

    remoweCheckboxTask = () => {
        const { checkboxTask } = this.state;
        this.props.deleteTasks(checkboxTask);
    };

    //////


    editClick = (taskObject) => {

        this.setState({
            editTask: taskObject
        });

    }

    //////

    closeConfirm = () => {
        this.setState({
            showConfirm: !this.state.showConfirm
        });
    }

    //////

    openAddTask = () => {
        this.setState({
            showAddNewTask: !this.state.showAddNewTask
        });
    }


    /////

    selectAllTasks = () => {

        let newTaskArray = this.props.tasks.map((element) => {
            return element._id
        });

        this.setState({
            checkboxTask: new Set(newTaskArray)
        });

    }


    /////

    deSelectAllTasks = () => {
        this.setState({
            checkboxTask: new Set()
        });
    }

    /////


    tasksCycle = () => {

        let { checkboxTask } = this.state;

        return this.props.tasks.map((element) => {
            return <Col className={styles.colCard}
                key={element._id}
                xs={12}
                sm={6}
                md={5}
                lg={4}
                xl={3}
            >

                <Tasks
                    onPushCheckboxTasks={this.pushCheckboxTasks}
                    element={element}
                    onEditClick={this.editClick}
                    onCheckboxTask={checkboxTask}
                    onRemowTask={this.props.deleteTask}
                    selectedCheckbox={checkboxTask.has(element._id)}
                />

            </Col>

        })
    }

    //////////

    render() {

        let { checkboxTask, editTask } = this.state;

        return (
            <div>
                <h1 className={styles.toDoListTitle}>TODO LIST</h1>
                <Container className={styles.ToDoContainer}>

                    <Row>
                        <Col>
                            <SearchTask />
                        </Col>
                    </Row>

                    <Row className={styles.buttonsRow}>
                        <Col>
                            <Button
                                onClick={this.openAddTask}>
                                ADD TASK
                            </Button>
                        </Col>

                        <Col>
                            <Button
                                onClick={this.selectAllTasks}
                                variant='warning'>
                                SELECT ALL
                            </Button>
                        </Col>

                        <Col>
                            <Button
                                onClick={this.deSelectAllTasks}
                                disabled={!checkboxTask.size}
                                variant='warning'>
                                DESELECT ALL
                            </Button>
                        </Col>

                        <Col>
                            <Button
                                className={styles.remoweTaskButton}
                                onClick={this.closeConfirm}
                                disabled={!checkboxTask.size}
                                variant='danger'
                            >
                                REMOWE TASKS
                        </Button>

                        </Col>

                    </Row>

                    <Row className={styles.cardsRow}>
                        {this.tasksCycle()}
                    </Row>

                </Container>



                {this.state.showAddNewTask &&
                    <TaskInput
                        onClose={this.openAddTask}
                        onTransfer={this.getNewObject}
                    />}

                {this.state.showConfirm &&
                    <Confirm
                        onCloseConfirm={this.closeConfirm}
                        onConfirmDelete={this.remoweCheckboxTask}
                        sizeSet={checkboxTask.size}
                    />
                }

                {this.state.editTask &&
                    <EditTask
                        onCloseTask={this.closeTask}
                        task={editTask}
                    />}
            </div >

        );

    }

}


const mapStateToProps = (state) => {
    return {
        tasks: state.tasks,
        addTaskSuccess: state.addTaskSuccess,
        deleteTasksSuccess: state.deleteTasksSuccess,
        editTasksSuccess: state.editTasksSuccess
    };
};


const mapDispatchToProps = {
    getTasks,
    deleteTask,
    deleteTasks
};

export default connect(mapStateToProps, mapDispatchToProps)(ToDoList);