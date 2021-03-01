import React from 'react';
import { Spinner as Load } from 'react-bootstrap'
import style from './spinnerStyle.module.css'

export default function Spinner() {
    return (
        <div className={style.spinnerContainer}>
            <Load
                className={style.spinner}
                animation="border"
                role="status">
                <span className="sr-only">Loading...</span>
            </Load>
        </div>
    )

}