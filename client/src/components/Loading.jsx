import React from 'react'
import "../style/loading.css"

export function Loading(props) {
    return (
        <div className={props.className}>
            
            <div className="loader"></div>
        </div>
    )
}

