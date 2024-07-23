import React from "react";
import { Navbar, Typography, Button } from "@material-tailwind/react";
import UserHome from "../pages/home/user/UserHome";

interface UserLayoutProps {
    isAuthenticated: boolean;
    handleLogout: () => void;
}

const UserLayout: React.FC<UserLayoutProps> = ({
    isAuthenticated,
    handleLogout,
}) => {
    return (
        <section className="w-screen h-screen flex items-center justify-center">
            <main className="bg-[#eee] py-6 px-2 w-full h-full flex flex-col items-center justify-between max-w-[60rem]">
                <nav className="px-2">
                    <Navbar className="pb-2 px-4 lg:px-8 lg:py-4">
                        <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
                            <Typography
                                as="a"
                                href="/"
                                variant="small"
                                className="mr-4 cursor-pointer py-1.5 font-normal"
                            >
                                <span>User Dashboard</span>
                            </Typography>
                            {isAuthenticated && (
                                <Button onClick={handleLogout}>Logout</Button>
                            )}
                        </div>
                    </Navbar>
                </nav>
                <div className="bg-green-900 w-full flex-1 overflow-y-scroll pt-6 flex flex-col items-center justify-center">
                    <UserHome />
                </div>
            </main>
        </section>
    );
};

export default UserLayout;
