import { useAuth } from "../context/auth.context";

export default function Profile() {
    const { user } = useAuth()

    return (
        <div>
            <h1>Profile</h1>
            <p>Email: {user.email}</p>
            <p>Name: {user.name}</p>
            <p>Password: {user.password}</p>
        </div>
    )
}