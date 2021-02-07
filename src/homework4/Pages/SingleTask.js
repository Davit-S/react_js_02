import { React, Component } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { formatDate } from '../helpers/formatDate'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import EditTask from '../Tasks/EditTask';


export default class SingleTask extends Component {
    state = {
        task: null,
        closeWindow: false
    }

    componentDidMount() {
        let taskId = this.props.match.params.taskId;

        fetch(`http://localhost:3001/task/${taskId}`, {
            method: 'GET',
            headers: {
                "Content-Type": 'application/json'
            }
        })
            .then(async (response) => {
                const result = await response.json();

                if (response.status >= 400 && response.status < 600) {
                    if (result.error) {
                        throw result.error;
                    }
                    else {
                        throw new Error('Something went wrong!');
                    }
                }

                this.setState({
                    task: result
                });

            })
            .catch((error) => {
                console.log('catch error', error);
            });

    }

    remowTask = () => {

        const taskId = this.state.task._id;

        fetch(`http://localhost:3001/task/${taskId}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": 'application/json'
            }
        })
            .then(async (response) => {
                const res = await response.json();

                if (response.status >= 400 && response.status < 600) {
                    if (res.error) {
                        throw res.error;
                    }
                    else {
                        throw new Error('Something went wrong!');
                    }
                }

                this.props.history.push('/');
            })
            .catch((error) => {
                console.log('catch error', error);
            });
    }

    toggleEdit = () => {

        this.setState({
            closeWindow: !this.state.closeWindow
        })


    }

    editSaveTask = (editedTask)=>{
        fetch(`http://localhost:3001/task/${editedTask._id}`, {
            method: 'PUT',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(editedTask)
        })
            .then(async (response) => {
                const result = await response.json();

                if(response.status >=400 && response.status < 600){
                    if(result.error){
                        throw result.error;
                    }
                    else {
                        throw new Error('Something went wrong!');
                    }
                }
                
        this.setState({
            task: result,
            closeWindow: false
        });
              
            })
            .catch((error)=>{
                console.log('catch error', error);
            });

    };


    



    render() {

        let { task, closeWindow } = this.state

        return <div>
        <Container>
            <Row>
                <Col xs={12} className='mt-5'>

                    { task ?
                    <Card className='text-center'>
                        <Card.Body>
                            <Card.Title>{task.title}</Card.Title>
                            <Card.Text>
                                Description: {task.description}</Card.Text>
                            <Card.Text>
                                Date: {formatDate(task.date)}

                            </Card.Text>
                            <Button variant="warning"
                                onClick={this.toggleEdit}
                            // className={style.taskButton}
                            >  <FontAwesomeIcon icon={faEdit} /> </Button>
                            <Button variant="danger"
                                onClick={this.remowTask}
                            // className={style.taskButton}
                            >   <FontAwesomeIcon icon={faTrash} />
                            </Button>
                        </Card.Body>
                    </Card>: 'Loading...'}
                </Col>
            </Row>
        </Container> 
                    
        {
            closeWindow &&
            <EditTask
                onCloseTask={this.toggleEdit}
                onEditTaskTransfer={this.editSaveTask}
                task={task} />
        }

    </div>
}


}



