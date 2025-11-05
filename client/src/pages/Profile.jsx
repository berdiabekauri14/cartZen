import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Profile() {
    const { user } = useContext(AuthContext)

    return (
        <div>
            <h1>Profile</h1>
            <p>Email: {user.email}</p>
            <p>Name: {user.name}</p>
            <p>Password: {user.password}</p>
        </div>
    )
}