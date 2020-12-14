import React from "react";
import { BsArrowRepeat } from "react-icons/bs";
import './style.css'

export default function Loader() {
    return (
        <div className='loader-container'>
            <div className='loader'>
                {
                    <BsArrowRepeat
                        className="spinning"
                        size='1.5em'
                        color='gray'
                    />
                }
            </div>
        </div>
    );
}