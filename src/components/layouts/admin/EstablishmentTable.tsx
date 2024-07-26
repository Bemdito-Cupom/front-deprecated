import { Ticket } from "lucide-react";
import { ESTABLISHMENT_TABLE_HEAD, ESTABLISHMENT_TABLE_ROWS } from "./table";
import { Typography, Card } from "@material-tailwind/react";

function EstablishmentTable(): JSX.Element {
  return (
    <>
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
              {ESTABLISHMENT_TABLE_ROWS.map(
                ({ name, status, coupons }, index) => (
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
                        className="font-normal flex items-center gap-1"
                      >
                        <Ticket size={16} />
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
                ),
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </>
  );
}
export { EstablishmentTable };
