import React from "react";
import { Navbar, Typography, Button } from "@material-tailwind/react";

interface EstablishmentLayoutProps {
  isAuthenticated: boolean;
  handleLogout: () => void;
  children?: React.ReactNode;
}

const EstablishmentLayout: React.FC<EstablishmentLayoutProps> = ({
  isAuthenticated,
  handleLogout,
  children,
}) => {
  return (
    <section className="w-screen h-screen bg-[#eee] flex">
      <aside className="bg-blue-900 h-full w-[15rem] rounded-r-lg">
        {/* Establishment sidebar content */}
      </aside>
      <main className="bg-white p-6 w-[85%] h-full flex flex-col justify-between">
        <Navbar className="py-2 px-4 lg:px-8 lg:py-4">
          <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
            <Typography
              as="a"
              href="/"
              variant="small"
              className="mr-4 cursor-pointer py-1.5 font-normal"
            >
              <span>Establishment Dashboard</span>
            </Typography>
            {isAuthenticated && <Button onClick={handleLogout}>Logout</Button>}
          </div>
        </Navbar>
        <article className="bg-yellow-100 w-full h-[90%]">{children}</article>
      </main>
    </section>
  );
};

export default EstablishmentLayout;
