import React from "react";
import { BsArrowRepeat } from "react-icons/bs";

export default function Loader() {
    return (
        <div>
            {<BsArrowRepeat className="spinning" />}
        </div>
    );
}