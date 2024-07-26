import React from "react";
import {
  Navbar,
  Typography,
  Card,
  Button,
  Dialog,
  CardBody,
  CardFooter,
  Input,
} from "@material-tailwind/react";

import { USER_TABLE_HEAD } from "./admin/table";

import { UserPlus, Calendar, Ticket, Lightbulb, LineChart } from "lucide-react";
import { EstablishmentTable } from "./admin/EstablishmentTable";
import Example from "../chats/LineChat";
import Example2 from "../chats/LineChat2";
import Example3 from "../chats/BarChart";

interface User {
  name: string;
  cpf: string;
  email: string;
  phone: string;
  createdAt: string;
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
  const [openUser, setOpenUser] = React.useState(false);

  const handleOpenUserDialog = () => {
    setOpenUser((cur) => !cur);
    if (openUser) {
      resetForm();
    }
  };
  const [name, setName] = React.useState("");
  const [cpf, setCpf] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");

  const formatCPF = (value: string) => {
    const cleanedValue = value.replace(/\D/g, "");

    const truncatedValue = cleanedValue.slice(0, 11);

    return truncatedValue.replace(
      /^(\d{3})(\d{3})(\d{3})(\d{2})$/,
      "$1.$2.$3-$4",
    );
  };

  const handleCPFChange = (e: any) => {
    const formattedCPF = formatCPF(e.target.value);
    setCpf(formattedCPF);
  };

  const formatPhone = (value: string) => {
    const cleanedValue = value.replace(/\D/g, "");

    const truncatedValue = cleanedValue.slice(0, 11);

    return truncatedValue.replace(
      /^(\d{2})(\d)(\d{4})(\d{4})$/,
      "($1) $2 $3 $4",
    );
  };

  const handlePhoneChange = (e: any) => {
    const formattedPhone = formatPhone(e.target.value);
    setPhone(formattedPhone);
  };

  const resetForm = () => {
    setName("");
    setCpf("");
    setEmail("");
    setPhone("");
  };

  const [userData, setUserData] = React.useState<User[]>([]);

  React.useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedData = JSON.parse(storedUser);
        setUserData(Array.isArray(parsedData) ? parsedData : []);
      } catch (error) {
        console.error("Error parsing user data from localStorage:", error);
        setUserData([]);
      }
    }
  }, []);

  const handleRegister = () => {
    const newUser: User = {
      name,
      cpf,
      email,
      phone,
      createdAt: new Date().toISOString(),
    };

    const updatedUserData = Array.isArray(userData)
      ? [...userData, newUser]
      : [newUser];
    localStorage.setItem("user", JSON.stringify(updatedUserData));
    setUserData(updatedUserData);
    handleOpenUserDialog();
    resetForm();
  };

  const formatDate = (date: string) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <>
      <Dialog
        size="xs"
        open={openUser}
        handler={handleOpenUserDialog}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto w-full max-w-[24rem]">
          <CardBody className="flex flex-col gap-4">
            <Typography
              variant="h4"
              color="blue-gray"
              className="flex items-center gap-4"
            >
              <UserPlus size={28} />
              Novo usuário
            </Typography>
            <Typography
              className="font-normal"
              variant="paragraph"
              color="gray"
            >
              Preencha os seguintes dados para registrar um novo usuário
            </Typography>
            <Input
              crossOrigin={""}
              label="Nome"
              size="lg"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              crossOrigin={""}
              label="CPF"
              size="lg"
              value={cpf}
              onChange={handleCPFChange}
              maxLength={14}
            />
            <Input
              crossOrigin={""}
              label="Email"
              size="lg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              crossOrigin={""}
              label="Número celular ( WhatsApp )"
              size="lg"
              value={phone}
              onChange={handlePhoneChange}
              maxLength={16}
            />
          </CardBody>
          <div className="w-full p-6 -mt-6">
            <div className="bg-orange-100 rounded-md p-2">
              <Typography
                variant="h6"
                className="text-orange-900 flex items-center"
              >
                <Lightbulb size={18} /> Nota{" "}
              </Typography>

              <Typography
                variant="small"
                className="text-orange-900 font-semibold leading-5"
              >
                Quando um usuário for registrado aqui, ele receberá um e-mail,
                ou uma mensagem no WhatsApp para confirmar e terminar o
                cadastro: inserir senha, endereço e data de nascimento
              </Typography>
            </div>
          </div>
          <CardFooter className="pt-0 flex justify-between">
            <Button
              variant="gradient"
              color="red"
              onClick={handleOpenUserDialog}
            >
              Cancelar
            </Button>
            <Button variant="gradient" color="blue" onClick={handleRegister}>
              Cadastrar
            </Button>
          </CardFooter>
        </Card>
      </Dialog>
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
            <div className="grid grid-cols-3 w-full gap-4">
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

            <div className="flex h-fit">
              <Button
                color="blue"
                className="flex items-center gap-2"
                onClick={() => handleOpenUserDialog()}
              >
                <UserPlus /> Novo usuário
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 h-[30rem] gap-4">
              <EstablishmentTable />

              <Card className="overflow-hidden border border-[#c4c4c4]/80">
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
                      {Array.isArray(userData) &&
                        userData.map((user, index) => (
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
