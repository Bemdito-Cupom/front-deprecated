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
import { Store } from "lucide-react";

interface EstablishmentDialogProps {
  open: boolean;
  handleOpen: () => void;
  onRegister: (establishment: Establishment) => void;
}

interface Establishment {
  establishmentName: string;
  cnpj: string;
  email: string;
  establishmentPhone: string;
  responsibleName: string;
  responsibleCPF: string;
  responsiblePhone: string;
}

const EstablishmentDialog: React.FC<EstablishmentDialogProps> = ({
  open,
  handleOpen,
  onRegister,
}) => {
  const [establishmentName, setEstablishmentName] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [email, setEmail] = useState("");
  const [establishmentPhone, setEstablishmentPhone] = useState("");
  const [responsibleName, setResponsibleName] = useState("");
  const [responsibleCPF, setResponsibleCPF] = useState("");
  const [responsiblePhone, setResponsiblePhone] = useState("");

  // Error states
  const [errors, setErrors] = useState({
    establishmentName: "",
    cnpj: "",
    email: "",
    establishmentPhone: "",
    responsibleName: "",
    responsibleCPF: "",
    responsiblePhone: "",
  });

  const fakeIt = () => {
    setEstablishmentName("Loja Exemplo");
    setCnpj("12.345.678/0001-90");
    setEmail("contato@lojaexemplo.com");
    setEstablishmentPhone("(11) 9 1234 5678");
    setResponsibleName("João da Silva");
    setResponsibleCPF("123.456.789-00");
    setResponsiblePhone("(11) 9 8765 4321");
  };

  // Validation functions
  const validateEstablishmentName = (name: string) => {
    return name.trim().length > 0
      ? ""
      : "Nome do estabelecimento é obrigatório";
  };

  const validateCNPJ = (cnpj: string) => {
    const cnpjRegex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/;
    return cnpjRegex.test(cnpj) ? "" : "CNPJ inválido";
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) ? "" : "Email inválido";
  };

  const validatePhone = (phone: string) => {
    const phoneRegex = /^\(\d{2}\) \d \d{4} \d{4}$/;
    return phoneRegex.test(phone) ? "" : "Número de telefone inválido";
  };

  const validateCPF = (cpf: string) => {
    const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
    return cpfRegex.test(cpf) ? "" : "CPF inválido";
  };

  const formatCPF = (value: string) => {
    const cleanedValue = value.replace(/\D/g, "");
    const truncatedValue = cleanedValue.slice(0, 11);
    return truncatedValue.replace(
      /^(\d{3})(\d{3})(\d{3})(\d{2})$/,
      "$1.$2.$3-$4",
    );
  };

  const formatCNPJ = (value: string) => {
    const cleanedValue = value.replace(/\D/g, "");
    const truncatedValue = cleanedValue.slice(0, 14);
    return truncatedValue.replace(
      /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
      "$1.$2.$3/$4-$5",
    );
  };

  const formatPhone = (value: string) => {
    const cleanedValue = value.replace(/\D/g, "");
    const truncatedValue = cleanedValue.slice(0, 11);
    return truncatedValue.replace(
      /^(\d{2})(\d)(\d{4})(\d{4})$/,
      "($1) $2 $3 $4",
    );
  };

  const handleRegister = () => {
    const newErrors = {
      establishmentName: validateEstablishmentName(establishmentName),
      cnpj: validateCNPJ(cnpj),
      email: validateEmail(email),
      establishmentPhone: validatePhone(establishmentPhone),
      responsibleName: validateEstablishmentName(responsibleName),
      responsibleCPF: validateCPF(responsibleCPF),
      responsiblePhone: validatePhone(responsiblePhone),
    };

    setErrors(newErrors);

    if (Object.values(newErrors).every((error) => error === "")) {
      const newEstablishment: Establishment = {
        establishmentName,
        cnpj,
        email,
        establishmentPhone,
        responsibleName,
        responsibleCPF,
        responsiblePhone,
      };
      onRegister(newEstablishment);
      resetForm();
      handleOpen();
    }
  };

  const resetForm = () => {
    setEstablishmentName("");
    setCnpj("");
    setEmail("");
    setEstablishmentPhone("");
    setResponsibleName("");
    setResponsibleCPF("");
    setResponsiblePhone("");
    setErrors({
      establishmentName: "",
      cnpj: "",
      email: "",
      establishmentPhone: "",
      responsibleName: "",
      responsibleCPF: "",
      responsiblePhone: "",
    });
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
            <Store size={28} />
            Novo estabelecimento
          </Typography>
          <Typography className="font-normal" variant="paragraph" color="gray">
            Preencha os seguintes dados para registrar um novo estabelecimento
          </Typography>
          <Input
            crossOrigin={""}
            label="Nome do estabelecimento"
            size="lg"
            value={establishmentName}
            onChange={(e) => setEstablishmentName(e.target.value)}
            error={!!errors.establishmentName}
          />
          {errors.establishmentName && (
            <Typography color="red" className="text-xs">
              {errors.establishmentName}
            </Typography>
          )}
          <Input
            crossOrigin={""}
            label="CNPJ"
            size="lg"
            value={cnpj}
            onChange={(e) => setCnpj(formatCNPJ(e.target.value))}
            error={!!errors.cnpj}
            maxLength={18}
          />
          {errors.cnpj && (
            <Typography color="red" className="text-xs">
              {errors.cnpj}
            </Typography>
          )}
          <Input
            crossOrigin={""}
            label="Email"
            size="lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!!errors.email}
          />
          {errors.email && (
            <Typography color="red" className="text-xs">
              {errors.email}
            </Typography>
          )}
          <Input
            crossOrigin={""}
            label="Número celular"
            size="lg"
            value={establishmentPhone}
            onChange={(e) => setEstablishmentPhone(formatPhone(e.target.value))}
            error={!!errors.establishmentPhone}
            maxLength={16}
          />
          {errors.establishmentPhone && (
            <Typography color="red" className="text-xs">
              {errors.establishmentPhone}
            </Typography>
          )}

          <hr />

          <Typography className="font-bold" variant="paragraph">
            Responsável pelo estabelecimento
          </Typography>

          <Input
            crossOrigin={""}
            label="Nome do responsável"
            size="lg"
            value={responsibleName}
            onChange={(e) => setResponsibleName(e.target.value)}
            error={!!errors.responsibleName}
          />
          {errors.responsibleName && (
            <Typography color="red" className="text-xs">
              {errors.responsibleName}
            </Typography>
          )}

          <Input
            crossOrigin={""}
            label="CPF"
            size="lg"
            value={responsibleCPF}
            onChange={(e) => setResponsibleCPF(formatCPF(e.target.value))}
            error={!!errors.responsibleCPF}
            maxLength={14}
          />
          {errors.responsibleCPF && (
            <Typography color="red" className="text-xs">
              {errors.responsibleCPF}
            </Typography>
          )}

          <Input
            crossOrigin={""}
            label="Número celular"
            size="lg"
            value={responsiblePhone}
            onChange={(e) => setResponsiblePhone(formatPhone(e.target.value))}
            error={!!errors.responsiblePhone}
            maxLength={16}
          />
          {errors.responsiblePhone && (
            <Typography color="red" className="text-xs">
              {errors.responsiblePhone}
            </Typography>
          )}
        </CardBody>
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

export default EstablishmentDialog;
