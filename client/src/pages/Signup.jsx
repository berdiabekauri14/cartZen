import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Signup() {
    const { signUp } = useContext(AuthContext)
    
    return (
        <form>
            <input type="text" name="name" placeholder="Enter your name" />
            <br />
            <input type="email" name="email" placeholder="Enter your email" />
            <br />
            <input type="password" name="password" placeholder="Create a password" />
            <br />
            <button onClick={signUp}>Submit</button>
        </form>
    )
}