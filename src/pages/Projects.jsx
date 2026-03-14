import {projects} from "../data/projects.js";
import ProjectCard from "../components/ProjectCard.jsx";


export default function Projects() {
    return (
        <section>
            <h1>Projects</h1>
            {projects.map((project, index) => (
                <ProjectCard key={index} {...project} />
            ))}
        </section>
    )
}