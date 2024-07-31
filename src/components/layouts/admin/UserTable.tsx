import React from "react";
import { Card, Typography } from "@material-tailwind/react";
import { Calendar } from "lucide-react";
import { USER_TABLE_HEAD } from "./table";

interface User {
  name: string;
  cpf: string;
  email: string;
  phone: string;
  createdAt: string;
}

interface UserTableProps {
  userData: User[];
  formatDate: (date: string) => string;
}

const UserTable: React.FC<UserTableProps> = ({ userData, formatDate }) => {
  return (
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
  );
};

export default UserTable;
