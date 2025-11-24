import { useAuth } from "../context/auth.context";
import Link from "react-router"

export default function Login() {
    const { logIn } = useAuth()

    return (
        <form>
            <input type="email" name="email" placeholder="Enter your email" />
            <br />
            <input type="password" name="password" placeholder="Create a password" />
            <br />
            <button onClick={logIn}>Submit</button>
            <br />
            <Link to="/Signup">Signup</Link>
        </form>
    )
}