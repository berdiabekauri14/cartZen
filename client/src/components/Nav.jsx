import { Link } from "react-router";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

export default function Nav() {
    const { user, logout } = useContext(AuthContext);

    const authLinks = (
        <>
            <Link to="/signUp">
                <button>
                    Sign Up
                </button>
            </Link>
            <Link to="/logIn">
                Log In
            </Link>
        </>
    );

    return (
        <div className="bg-green-900 text-white px-4 py-6">
            <nav className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-4 sm:gap-6">
                <Link to="/">
                    Home
                </Link>
                <Link to="/about">
                    About
                </Link>
                <Link to="/courses">
                    Courses
                </Link>
                <Link to="/contact">
                    Contact
                </Link>
                {
                    !user ? authLinks : (
                        <button onClick={logout}>
                            Logout
                        </button>
                    )
                }
            </nav>
        </div>
    );
}
