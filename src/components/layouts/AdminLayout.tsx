import React, { useState, useEffect } from "react";
import { Typography, Card, Button, Navbar } from "@material-tailwind/react";

import { USER_TABLE_HEAD } from "./admin/table";

import { UserPlus, Calendar, Store } from "lucide-react";
import { EstablishmentTable } from "./admin/EstablishmentTable";
import UserDialog from "./admin/dialogs/UserDialogs";
import EstablishmentDialog from "./admin/dialogs/EstablishmentDialogs";
import Example from "../chats/LineChat";
import Example3 from "../chats/BarChart";
import Example2 from "../chats/LineChat2";

interface User {
  name: string;
  cpf: string;
  email: string;
  phone: string;
  createdAt: string;
}

interface Establishment {
  establishmentName: string;
  cnpj: string;
  email: string;
  establishmentPhone: string;
  responsibleName: string;
  responsibleCPF: string;
  responsiblePhone: string;
  createdAt?: string;
}

interface AdminLayoutProps {
  isAuthenticated?: boolean;
  handleLogout: () => void;
  children?: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({
  isAuthenticated,
  handleLogout,
  children,
}) => {
  const [openUser, setOpenUser] = useState(false);
  const [openEstablishment, setOpenEstablishment] = useState(false);
  const [userData, setUserData] = useState<User[]>([]);
  const [establishmentData, setEstablishmentData] = useState<Establishment[]>(
    [],
  );

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedEstablishment = localStorage.getItem("establishment");
    if (storedUser) {
      try {
        const parsedData = JSON.parse(storedUser);
        setUserData(Array.isArray(parsedData) ? parsedData : []);
      } catch (error) {
        console.error("Error parsing user data from localStorage:", error);
        setUserData([]);
      }
    }
    if (storedEstablishment) {
      try {
        const parsedData = JSON.parse(storedEstablishment);
        setEstablishmentData(Array.isArray(parsedData) ? parsedData : []);
      } catch (error) {
        console.error(
          "Error parsing establishment data from localStorage:",
          error,
        );
        setEstablishmentData([]);
      }
    }
  }, []);

  const handleOpenUserDialog = () => setOpenUser((cur) => !cur);
  const handleOpenEstablishmentDialog = () =>
    setOpenEstablishment((cur) => !cur);

  const handleRegisterUser = (newUser: User) => {
    const updatedUserData = [...userData, newUser];
    localStorage.setItem("user", JSON.stringify(updatedUserData));
    setUserData(updatedUserData);
    handleOpenUserDialog();
  };

  const handleRegisterEstablishment = (newEstablishment: Establishment) => {
    const establishmentWithDate = {
      ...newEstablishment,
      createdAt: new Date().toISOString(),
    };
    const updatedEstablishmentData = [
      ...establishmentData,
      establishmentWithDate,
    ];
    localStorage.setItem(
      "establishment",
      JSON.stringify(updatedEstablishmentData),
    );
    setEstablishmentData(updatedEstablishmentData);
    handleOpenEstablishmentDialog();
  };

  const formatDate = (date: string) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <>
      <UserDialog
        open={openUser}
        handleOpen={handleOpenUserDialog}
        onRegister={handleRegisterUser}
      />

      <EstablishmentDialog
        open={openEstablishment}
        handleOpen={handleOpenEstablishmentDialog}
        onRegister={handleRegisterEstablishment}
      />
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
                <span>Admin Dashboard</span>
              </Typography>
              {isAuthenticated && (
                <Button onClick={handleLogout}>Logout</Button>
              )}
            </div>
          </Navbar>
          <article className="w-full h-[90%] flex flex-col gap-6">
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
              <Button
                color="green"
                className="flex items-center gap-2"
                onClick={handleOpenEstablishmentDialog}
              >
                <Store /> Novo estabelecimento
              </Button>

              <Button
                color="blue"
                className="flex items-center gap-2"
                onClick={handleOpenUserDialog}
              >
                <UserPlus /> Novo usuário
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 h-[30rem] gap-4">
              <EstablishmentTable establishmentData={establishmentData} />

              <Card
                className="overflow-hidden border border-[#c4c4c4]/80"
                id="user table"
              >
                <div>
                  <table className="w-full min-w-max table-auto text-left">
                    <thead>
                      <tr>
                        {USER_TABLE_HEAD.map((head) => (
                          <th
                            key={head}
                            className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                          >
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal leading-none opacity-70"
                            >
                              {head}
                            </Typography>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {userData.map((user, index) => (
                        <tr key={index} className="even:bg-blue-gray-50/50">
                          <td className="p-4">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {user.name}
                            </Typography>
                          </td>
                          <td className="p-4">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal flex items-center gap-2"
                            >
                              <div className="w-[0.6rem] h-[0.6rem] bg-green-800 rounded-full" />
                              Ativo
                            </Typography>
                          </td>
                          <td className="p-4">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal flex items-center gap-1"
                            >
                              <Calendar size={16} />
                              {formatDate(user.createdAt)}
                            </Typography>
                          </td>
                          <td className="p-4">
                            <Typography
                              as="a"
                              href="#"
                              variant="small"
                              color="blue-gray"
                              className="font-medium"
                            >
                              Edit
                            </Typography>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>
          </article>
        </main>
      </section>
    </>
  );
};

export default AdminLayout;
