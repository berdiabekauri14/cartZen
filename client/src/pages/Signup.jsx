import { useAuth } from "../context/auth.context";
import Link from "react-router"

export default function Signup() {
    const { signUp } = useAuth()
    
    return (
        <form>
            <input type="text" name="name" placeholder="Enter your name" />
            <br />
            <input type="email" name="email" placeholder="Enter your email" />
            <br />
            <input type="password" name="password" placeholder="Create a password" />
            <br />
            <button onClick={signUp}>Submit</button>
            <br />
            <Link to="/logIn">Login</Link>
        </form>
    )
}