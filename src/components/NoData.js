import React from "react";
import { DiDatabase } from "react-icons/di";
import "./style.css";

export default function LoaderButton({...props}) {
    return (
        <div
            className={`no-data`}
            {...props}
        >
            <p>
                {props.text} <DiDatabase color='gray' size='1.5em' />
                {props.children}
            </p>
        </div>
    );
}