import React, { useRef, useEffect, useState } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import styles from './styleContact.module.css'

const requiredErrorMessage = 'Field is required';

export default function Contact() {

    let stateFocus = false;
    const inputName = useRef();
    const textObject = {
        "name": "",
        "email": "",
        "message": ""
    }


    let [stateObj, setValue] = useState(textObject);
    let [errors, setErrors] = useState({
        name: null,
        email: null,
        message: null
    })

    useEffect(() => {
        inputName.current.focus();
    }, [stateFocus])


    let formMassage = () => {

        const arrayValues = Object.values(stateObj);
        const arrayExist = Object.values(errors);
        const errorsExist = !arrayExist.every(el => el === null);
        const valuesExist = !arrayValues.some(el => el === "");

        if (valuesExist && !errorsExist) {

            fetch('http://localhost:3001/form', {
                method: 'POST',
                body: JSON.stringify(stateObj),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(async (resualt) => {

                const task = await resualt.json()

                if (resualt.status >= 400 && resualt.status <= 600) {
                    if (task.error) {
                        throw task.error
                    }
                    else {
                        throw new Error('Something went wrong!')
                    }
                }

                setValue(textObject);

            }).catch((error) => {
                console.log(error);
            })


        }
        if (!valuesExist && !errorsExist) {
            setErrors({
                name: requiredErrorMessage,
                email: requiredErrorMessage,
                message: requiredErrorMessage
            });

        }


    }











    let changeInputValue = (event) => {
        let { name, value } = event.target;
        stateObj[name] = value;

        if (!value.trim()) {
            setErrors({
                ...errors,
                [name]: requiredErrorMessage
            });
        }
        else {
            setErrors({
                ...errors,
                [name]: null
            });
        }


        const emailReg = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

        if (name === "email") {
            if (!emailReg.test(value)) {
                setErrors({
                    ...errors,
                    email: 'Invalid email'
                })
            }
            else {
                setErrors({
                    ...errors,
                    email: null
                })

                setValue({
                    ...stateObj,
                    [name]: value
                });


            }

        }

    }



    return (
        <Container>
            <Row className='justify-content-center'>
                <Col xs={7}>
                    <Form className='mt-5'>
                        <h2 className='text-center'>Contact us</h2>
                        <Form.Group>
                            <Form.Control
                                className={errors.name ? styles.invalid : ''}
                                type="text"
                                placeholder="Enter your name"
                                name="name"
                                ref={inputName}
                                onChange={changeInputValue}

                                value={stateObj.name}
                            />
                            <Form.Text className="text-danger">
                                {errors.name}
                            </Form.Text>
                        </Form.Group>
                        <Form.Group>
                            <Form.Control
                                className={errors.email ? styles.invalid : ''}
                                type="email"
                                name="email"
                                value={stateObj.email}
                                onChange={changeInputValue}
                                placeholder="Enter email"
                            />
                            <Form.Text className="text-danger">
                                {errors.email}
                            </Form.Text>
                        </Form.Group>

                        <Form.Group>
                            <Form.Control
                                as="textarea"
                                className={errors.message ? styles.invalid : ''}
                                placeholder="Enter your message"
                                rows={5}
                                name="message"
                                value={stateObj.message}
                                onChange={changeInputValue}
                            />
                            <Form.Text className="text-danger">
                                {errors.message}
                            </Form.Text>
                        </Form.Group>
                        <div className="text-center">
                            <Button
                                variant="primary"
                                onClick={formMassage}
                                className={styles.submitButton}
                            >
                                Send
                </Button>
                        </div>

                    </Form>

                </Col>
            </Row>
        </Container>
    );






}