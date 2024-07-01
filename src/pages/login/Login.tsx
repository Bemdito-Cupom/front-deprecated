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

import LOGO from '../../assets/OBEMDITO.png'

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would normally send a request to your backend
        // For this example, we'll just simulate a successful login
        login('fake-jwt-token');
        navigate('/');
    };

    const handleRegister = () => {
        navigate('/register');
    };

    return (
        <section className="w-screen h-screen bg-[#f4f4f4] flex flex-col items-center justify-center">
            <Card className="w-96">
                <CardHeader
                    variant="gradient"
                    className="mb-4 grid h-fit px-4 py-8 gap-6 place-items-center bg-[#be1e2f]"
                >
          <img src={LOGO} className="max-w-[60%]" />

                    <Typography variant="h4" color="black" className="-mt-4 text-center text-white/90">
            Clube de vantagens
                    </Typography>
                </CardHeader>

                <form onSubmit={handleLogin}>
                    <CardBody className="flex flex-col gap-4">


                        <Input
                            label="Email"
                            size="lg"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Input
                            label="Senha"
                            size="lg"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </CardBody>
                    <CardFooter className="pt-0 gap-2 flex flex-col">
                        <Button variant="gradient" color="green" fullWidth type="submit">
                            Acessar
                        </Button>
                        <Button variant="outlined" fullWidth onClick={handleRegister}>
                            Cadastrar-se
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </section>
    )
}

export default Login;
