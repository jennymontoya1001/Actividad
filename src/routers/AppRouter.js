import React, {useEffect,useState} from 'react';
import {BrowserRouter as Router,
Routes,
Route} from 'react-router-dom';
import {Container} from '../container/Container';
import { Navbar } from '../components/Navbar';
import {url} from '../helpers/url';

export const AppRouter = () => {

    const [state, setstate] = useState([])

    useEffect(() => {
        cargarDatos();
    }, [])

const cargarDatos = async() => {
    const respuesta = await fetch(url);
    const datos = await respuesta.json();
         setstate(datos)
}

console.log(state)
    return (
        <div>
            <Router>
                <Navbar/>
                <Routes>
                    <Route exact path="/" element={<Container productos={state}/>}/>
                </Routes>
            </Router>
        </div>
    )
}
