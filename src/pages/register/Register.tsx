import React, { useState } from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Button,
} from "@material-tailwind/react";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/Auth';

function Register() {
    const [name, setName] = useState('');
    const [birthday, setBirthday] = useState('');
    const [address, setAddress] = useState('');
    const [documentId, setDocumentId] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would normally send a request to your backend to register the user
        // For this example, we'll just simulate a successful registration and login
        console.log('Registering user:', { name, birthday, address, documentId, email, password });
        login('fake-jwt-token');
        navigate('/');
    };

    const handleLogin = () => {
        navigate('/login');
    };

    return (
        <section className="w-screen h-screen bg-[#eee] flex flex-col items-center justify-center">
            <Card className="w-96">
                <CardHeader
                    variant="gradient"
                    className="mb-4 grid h-28 place-items-center bg-[#be1e2f]"
                >
                    <Typography variant="h3" color="white">
                        Cadastro
                    </Typography>
                </CardHeader>
                <form onSubmit={handleRegister}>
                    <CardBody className="flex flex-col gap-4">
                        <Input
                            crossOrigin
                            label="Nome"
                            size="lg"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <Input
                            crossOrigin
                            label="Data de Nascimento"
                            size="lg"
                            type="date"
                            value={birthday}
                            onChange={(e) => setBirthday(e.target.value)}
                        />
                        <Input
                            crossOrigin
                            label="Endereço"
                            size="lg"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                        <Input
                            crossOrigin
                            label="CPF"
                            size="lg"
                            value={documentId}
                            onChange={(e) => setDocumentId(e.target.value)}
                        />
                        <Input
                            crossOrigin
                            label="Email"
                            size="lg"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Input
                            crossOrigin
                            label="Senha"
                            size="lg"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </CardBody>
                    <CardFooter className="pt-0 gap-2 flex flex-col">
                        <Button variant="gradient" color="green" fullWidth type="submit">
                            Cadastrar
                        </Button>
                        <Button variant="outlined" fullWidth onClick={handleLogin}>
                            Já tem uma conta? Faça login
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </section>
    )
}

export default Register;
