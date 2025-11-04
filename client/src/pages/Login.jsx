import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
    const { logIn } = useContext(AuthContext)

    return (
        <form>
            <input type="email" name="email" placeholder="Enter your email" />
            <br />
            <input type="password" name="password" placeholder="Create a password" />
            <br />
            <button onClick={logIn}>Submit</button>
        </form>
    )
}