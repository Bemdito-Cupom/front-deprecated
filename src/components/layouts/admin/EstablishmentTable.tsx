import { Ticket } from "lucide-react";
import { ESTABLISHMENT_TABLE_HEAD } from "./table";
import { Typography, Card } from "@material-tailwind/react";

interface Establishment {
  establishmentName: string;
  cnpj: string;
  email: string;
  establishmentPhone: string;
  responsibleName: string;
  responsibleCPF: string;
  responsiblePhone: string;
  createdAt: string;
}

interface EstablishmentTableProps {
  establishmentData: Establishment[];
}

function EstablishmentTable({
  establishmentData,
}: EstablishmentTableProps): JSX.Element {
  return (
    <Card className="overflow-hidden border border-[#c4c4c4]/80">
      <div>
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {ESTABLISHMENT_TABLE_HEAD.map((head) => (
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
            {establishmentData.map((establishment, index) => (
              <tr key={establishment.cnpj} className="even:bg-blue-gray-50/50">
                <td className="p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {establishment.establishmentName}
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
                    <Ticket size={16} />
                    N/A
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
}

export { EstablishmentTable };
