import React from "react";
import {
  Navbar,
  Typography,
  Button,
  Card,
  Dialog,
} from "@material-tailwind/react";

import Example from "./chats/LineChat";
import Example3 from "./chats/BarChart";
import Example2 from "./chats/LineChat2";
import { TicketPlus } from "lucide-react";

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
    <>
      <section className="w-screen h-screen bg-[#eee] flex items-center justify-center">
        <main className="p-6 w-full max-w-[80rem] h-full flex flex-col justify-between">
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
              {isAuthenticated && (
                <Button onClick={handleLogout}>Logout</Button>
              )}
            </div>
          </Navbar>
          <article className="w-full h-[90%] flex flex-col gap-6">
            {" "}
            <div className="grid grid-cols-1 lg:grid-cols-3 w-full gap-4">
              <div className="bg-gray-100">
                <Example />
              </div>
              <div className="bg-gray-100">
                <Example3 />
              </div>
              <div className="bg-gray-100">
                <Example2 />
              </div>
            </div>
            <div className="flex gap-2 h-fit">
              <Button color="blue" className="flex items-center gap-2">
                <TicketPlus /> Novo cupom
              </Button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 h-[30rem] gap-4">
              <Card className="overflow-hidden border border-[#c4c4c4]/80">
                <div className="bg-[#eee]/50 px-4 py-2">
                  <Typography variant="paragraph" className="font-bold">
                    Cupons criados
                  </Typography>
                </div>
              </Card>
              <Card></Card>
            </div>
          </article>
        </main>
      </section>
    </>
  );
};

export default EstablishmentLayout;
