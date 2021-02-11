import React, { useRef, useEffect, useState } from 'react';
import { Button, FormControl, InputGroup } from 'react-bootstrap';


export default function Contact() {

    let stateFocus = false;
    const inputName = useRef();
    const textObject = {
        "name": "",
        "email": "",
        "message": ""
    }
    let state = useState(textObject);


    useEffect(() => {
        inputName.current.focus();
    }, [stateFocus])


    let formMassage = () => {

        let [stateObj, setValue] = state;

        console.log(stateObj);

        if (stateObj.name && stateObj.email) {

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


    }

    let changeInputValu = (event) => {
        let [obj, setValue] = state;
        let { name, value } = event.target;
        obj[name] = value

        setValue({
            ...obj
        })

    }


    return (<div style={{ padding: "2%" }}>

        <InputGroup className="mb-3">
            <FormControl
                placeholder="Name"
                ref={inputName}
                onChange={changeInputValu}
                name="name"
                value={state[0].name}
            />
        </InputGroup>

        <InputGroup className="mb-3">
            <FormControl
                placeholder="Email"
                onChange={changeInputValu}
                name="email"
                value={state[0].email}
            />
        </InputGroup>

        <InputGroup className="mb-3">
            <FormControl
                placeholder="Massage"
                as="textarea"
                rows={4}
                onChange={changeInputValu}
                name="message"
                value={state[0].message}
            />
        </InputGroup>

        <Button
            variant="primary"
            size="lg"
            onClick={formMassage}>
            Large button
    </Button>



    </div>
    )
}