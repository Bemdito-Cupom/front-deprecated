import React from "react";
import { Navbar, Typography, Card, Button } from "@material-tailwind/react";

const TABLE_HEAD = ["Estabelecimento", "Status", "Cupons", "Aćões"];

const TABLE_ROWS = [
    {
        name: "Forneria Pizzaria",
        status: "Ativo",
        coupons: "200/98",
    },
    {
        name: "Barbearia Macho Alfa",
        status: "Ativo",
        coupons: "100/78",
    },
    {
        name: "Espetaria araguaia",
        status: "Inativo",
        coupons: "100/100",
    },
];

interface AdminLayoutProps {
    isAuthenticated: boolean;
    handleLogout: () => void;
    children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({
    isAuthenticated,
    handleLogout,
    children,
}) => {
    return (
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
                        {isAuthenticated && <Button onClick={handleLogout}>Logout</Button>}
                    </div>
                </Navbar>
                <article className="w-full h-[90%] flex flex-col gap-6">
                    <div className="grid grid-cols-3 h-[10rem] w-full gap-4">
                        <div className="bg-gray-100" />
                        <div className="bg-gray-100" />
                        <div className="bg-gray-100" />
                    </div>

                    <div className="grid grid-cols-2 h-[30rem] gap-4">
                        <Card className="overflow-hidden">
                            {/* <div className="h-[3rem] flex justify-end mb-2"> */}
                            {/*     <Button size="sm" color="green"> */}
                            {/*         Novo estabelecimento */}
                            {/*     </Button> */}
                            {/* </div> */}

                            <div>
                                <table className="w-full min-w-max table-auto text-left">
                                    <thead>
                                        <tr>
                                            {TABLE_HEAD.map((head) => (
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
                                        {TABLE_ROWS.map(({ name, status, coupons }, index) => (
                                            <tr key={name} className="even:bg-blue-gray-50/50">
                                                <td className="p-4">
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal"
                                                    >
                                                        {name}
                                                    </Typography>
                                                </td>
                                                <td className="p-4">
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal flex items-center gap-2"
                                                    >
                                                        {status === "Ativo" && (
                                                            <div className="w-[0.6rem] h-[0.6rem] bg-green-800 rounded-full" />
                                                        )}

                                                        {status === "Inativo" && (
                                                            <div className="w-[0.6rem] h-[0.6rem] bg-red-800 rounded-full" />
                                                        )}
                                                        {status}
                                                    </Typography>
                                                </td>
                                                <td className="p-4">
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal"
                                                    >
                                                        {coupons}
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
                        <Card></Card>
                    </div>
                </article>
            </main>
        </section>
    );
};

export default AdminLayout;
