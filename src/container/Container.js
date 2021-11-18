import React from 'react'
import { Productos } from '../components/Productos'

export const Container = ({productos}) => {

    console.log(productos)

    return (
        <div className="container mt-5">
            <h1>Productos</h1>
            <hr />
                <Productos data={productos}/>
        </div>
    )
}
