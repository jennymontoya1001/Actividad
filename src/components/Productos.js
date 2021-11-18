import React, { useState } from 'react';
import { url as endpoint } from '../helpers/url';

export const Productos = ({ data }) => {

    const [idMod, setIdMod] = useState(0);


    const [producto, setProducto] = useState({
        url: '',
        nombre: '',
        descripcion: ''
    })

    const { url, nombre, descripcion } = producto;

    const handleChanged = ({ target }) => {
        setProducto(
            {
                ...producto,
                [target.name]: target.value
            }
        )
        console.log(producto)
    }

    const agregarProducto = async () => {
        await fetch(endpoint, {
            method: 'POST',
            body: JSON.stringify(producto),
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    const handleEliminarDatos = async (id) => {
        await fetch(endpoint + id, {
            method: 'DELETE'
        })

    }

    const handleModificarDatos = (producto) => {
        const {id, url, nombre, descripcion } = producto;

        
        setProducto({
            url,
            nombre,
            descripcion
        })

        setIdMod(id);
    }

    const modificarDatos = async() => {
        await fetch(endpoint+idMod, {
            method: 'PUT',
            body: JSON.stringify(producto),
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        })

        console.log(endpoint+idMod)
    }

    return (
        <div className="row">
            <div className="col-8">
                <h3 className="text-center">Lista de Productos</h3>
                <ul className="list-group">

                    {
                        data.map(prod => (
                            <li className="list-group-item" key={prod.id}>
                                <span className="lead">{prod.nombre}</span>
                                <button
                                    className="btn btn-warning btm-sm float-end "
                                    onClick={() => handleModificarDatos(prod)}
                                >
                                    editar
                                </button>
                                <button
                                    className="btn btn-danger btm-sm float-end "
                                    onClick={() => handleEliminarDatos(prod.id)}
                                >
                                    borrar
                                </button>

                            </li>
                        ))
                    }
                </ul>
            </div>



            <div className="col-4">
                <h3 className="text-center"> Agregar Productos </h3>

                <form className="form-group" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        className="form-control "
                        placeholder="Url"
                        name="url"
                        value={url}
                        onChange={handleChanged}
                    />

                    <input
                        type="text"
                        className="form-control mt-2"
                        name="nombre"
                        autoComplete="off"
                        placeholder="Nombre Producto"
                        value={nombre}
                        onChange={handleChanged}
                    />

                    <textarea
                        className="form-control mt-2"
                        autoComplete="off"
                        name="descripcion"
                        value={descripcion}
                        onChange={handleChanged}
                    >
                    </textarea>

                    <div className="d-grid gap-2 mx-auto mt-2">
                        <button
                            type="submit"
                            className="btn btn-dark"
                            onClick={() => agregarProducto()}>
                            Guardar
                        </button>
                    </div>
                    <div className="d-grid gap-2 mx-auto mt-2">
                        <button
                            type="button"
                            className="btn btn-dark"
                            onClick={() => modificarDatos()}>
                            Modificar
                        </button>
                    </div>
                </form>
            </div>

        </div>
    )
}
