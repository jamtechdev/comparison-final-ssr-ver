"use client"
import React, { useState, useEffect } from "react";
const Title = ({ guideName }) => {
    const [pageName, setPageName] = useState();

    useEffect(() => {
        setPageName("My Page");
    }, [])
    return (<>
        <h2>{guideName} : From Tiles</h2>
        <h3>{pageName}</h3>
    </>)
}

export default Title;