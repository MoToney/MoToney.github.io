import { Link } from "react-router-dom";

export default function Header() {
    return (
        <header className="header">
            <h1>Maurice Toney Jr.</h1>
            <nav>
                <Link to="/">Home</Link>
            </nav>
        </header>
    );
}
