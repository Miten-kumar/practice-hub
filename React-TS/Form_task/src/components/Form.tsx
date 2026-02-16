import { useState } from "react";

interface User {  
    userName: string;
    email: string;
    mobile: string;
    password: string;
}

export const Form = () => {
    const [user, setUser] = useState<User>({
        userName: "",
        email: "",
        mobile: "",
        password: "",
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUser((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Submitted user:", user);  
    };

    return (
        <>
            <h2>Form</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="userName">UserName:</label>
                    <input
                        id="userName"
                        type="text"
                        name="userName"
                        placeholder="Enter name"
                        value={user.userName}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        id="email"
                        type="email"
                        name="email"
                        placeholder="Enter email"
                        value={user.email}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="mobile">Mobile:</label>
                    <input
                        id="mobile"
                        type="tel"
                        name="mobile"
                        placeholder="Enter mobile"
                        value={user.mobile}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        id="password"
                        type="password"  
                        name="password"
                        placeholder="Enter password"
                        value={user.password}
                        onChange={handleInputChange}
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
        </>
    );
};


