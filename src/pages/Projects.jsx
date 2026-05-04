import {projects} from "../data/projects.js";
import ProjectCard from "../components/ProjectCard.jsx";
import "../styles/Projects.css";


export default function Projects() {
    return (
        <section>
            <h1>Projects</h1>

            <div className="projects-grid">
                {projects.map((project, index) => (
                    <ProjectCard key={index} {...project} />
                ))}
            </div>

        </section>
    )
}