import {BrowserRouter, Routes, Route, Link} from 'react-router-dom'

import Home from "./pages/Home.jsx";
import './styles/App.css'
import Layout from "./layout/Layout.jsx";
import Projects from "./pages/Projects.jsx";
import About from "./pages/About.jsx";

function App() {
    return (
        <BrowserRouter>


            <Routes>
                <Route path="/" element={
                    <Layout>
                        <Home/>
                        <About/>
                        <Projects />
                    </Layout>
                }/>


            </Routes>

        </BrowserRouter>
    )
}

export default App
