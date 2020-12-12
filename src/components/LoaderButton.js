import React from "react";
import Button from "react-bootstrap/Button";
import { BsArrowRepeat } from "react-icons/bs";
import "./style.css";

export default function LoaderButton({
    isLoading,
    className = "",
    disabled = false,
    size="lg",
    ...props
}) {
    return (
        <Button
            disabled={disabled || isLoading}
            className={`LoaderButton ${className}`}
            {...props}
        >
            {isLoading && <BsArrowRepeat className="spinning" />}
            {props.children}
        </Button>
    );
}