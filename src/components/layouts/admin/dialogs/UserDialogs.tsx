import React, { useState } from "react";
import {
  Typography,
  Card,
  Button,
  Dialog,
  CardBody,
  CardFooter,
  Input,
} from "@material-tailwind/react";
import { UserPlus, Lightbulb } from "lucide-react";

interface User {
  name: string;
  cpf: string;
  email: string;
  phone: string;
  createdAt: string;
}

interface UserDialogProps {
  open: boolean;
  handleOpen: () => void;
  onRegister: (user: User) => void;
}

const UserDialog: React.FC<UserDialogProps> = ({
  open,
  handleOpen,
  onRegister,
}) => {
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const formatCPF = (value: string) => {
    const cleanedValue = value.replace(/\D/g, "");
    const truncatedValue = cleanedValue.slice(0, 11);
    return truncatedValue.replace(
      /^(\d{3})(\d{3})(\d{3})(\d{2})$/,
      "$1.$2.$3-$4",
    );
  };

  const handleCPFChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedPhone = formatPhone(e.target.value);
    setPhone(formattedPhone);
  };

  const resetForm = () => {
    setName("");
    setCpf("");
    setEmail("");
    setPhone("");
  };

  const handleRegister = () => {
    const newUser: User = {
      name,
      cpf,
      email,
      phone,
      createdAt: new Date().toISOString(),
    };
    onRegister(newUser);
    resetForm();
    handleOpen();
  };

  const fakeIt = () => {
    setName("João da Silva");
    setCpf("123.456.789-00");
    setEmail("joao.silva@example.com");
    setPhone("(11) 9 8765 4321");
  };

  return (
    <Dialog
      size="xs"
      open={open}
      handler={handleOpen}
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
          <Typography className="font-normal" variant="paragraph" color="gray">
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
              Quando um usuário for registrado aqui, ele receberá um e-mail, ou
              uma mensagem no WhatsApp para confirmar e terminar o cadastro:
              inserir senha, endereço e data de nascimento
            </Typography>
          </div>
        </div>
        <CardFooter className="pt-0 flex justify-between">
          <Button variant="gradient" color="red" onClick={handleOpen}>
            Cancelar
          </Button>
          <Button variant="gradient" color="blue" onClick={handleRegister}>
            Cadastrar
          </Button>
        </CardFooter>
        <Button
          variant="text"
          color="blue-gray"
          className="ml-2"
          onClick={fakeIt}
        >
          Fake it
        </Button>
      </Card>
    </Dialog>
  );
};

export default UserDialog;
