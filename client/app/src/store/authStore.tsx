import { createContext, useContext, useEffect, useState } from "react"

interface User {
    id: number
    departmentId: number,
    token: string,
    fullName: string,
    role: string,
    email: string,
    expiresAt: string,
    imagePath?: string,
}

interface authContextProps {
    user: User | null,
    loginUser: (data: User) => void,
    logoutUser: () => Promise<boolean | undefined>
}


const AuthContext = createContext<authContextProps | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const [user, setUser] = useState<User | null>(() => {
        const storedUser = localStorage.getItem('ELMS');
        return storedUser ? JSON.parse(storedUser) : null;
    })


    const loginUser = (data: User) => {
        sessionStorage.setItem('Auth_Session', JSON.stringify(data));
        setUser(data);
    }

    const logoutUser = async (): Promise<boolean | undefined> => {
        if (!user?.token) return;

        sessionStorage.removeItem("Auth_Session");
        setUser(null);
        return true;
    }

    useEffect(() => {

        if (!user?.expiresAt) return;

        const now = Date.now();
        const expiresAt = new Date(user.expiresAt).getTime();

        if (now >= expiresAt) {
            logoutUser();
            window.location.href = '/';
            return;
        }


        const remainingTime = expiresAt - now;

        const timer = setTimeout(() => {
            logoutUser();
            window.location.href = '/';
        }, remainingTime);

        return () => clearTimeout(timer);

    }, [user])

    return (
        <AuthContext.Provider value={{ user, loginUser, logoutUser }}>
            {children}
        </AuthContext.Provider>
    )
}


export const authHook = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("authHook must be used within an AuthProvider");
    return context;
}