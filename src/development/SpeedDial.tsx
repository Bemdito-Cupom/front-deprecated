import {
  IconButton,
  SpeedDial,
  SpeedDialHandler,
  SpeedDialContent,
  SpeedDialAction,
  Typography,
  TypographyProps,
} from "@material-tailwind/react";
import { Plus, Home, Settings, LayoutGrid } from "lucide-react";

export function SpeedDialWithTextOutside() {
  const labelProps: Partial<TypographyProps> = {
    color: "blue-gray",
    className:
      "absolute top-2/4 -left-2/4 -translate-y-2/4 -translate-x-3/4 font-normal",
  };

  const setRole = (role: string) => {
    localStorage.setItem("role", role);
    console.log(`Role set to: ${role}`);
    window.dispatchEvent(new CustomEvent("roleChanged", { detail: role }));
  };

  return (
    <div className="absolute bottom-0 right-0 m-12">
      <SpeedDial>
        <SpeedDialHandler>
          <IconButton size="lg" className="rounded-full">
            <Plus className="h-5 w-5 transition-transform group-hover:rotate-45" />
          </IconButton>
        </SpeedDialHandler>
        <SpeedDialContent>
          <SpeedDialAction
            className="relative"
            onClick={() => setRole("admin")}
          >
            <Home className="h-5 w-5" />
            <Typography
              variant="small"
              color="blue-gray"
              className="absolute top-2/4 -left-2/4 -translate-y-2/4 -translate-x-3/4 font-normal"
            >
              admin
            </Typography>
          </SpeedDialAction>
          <SpeedDialAction className="relative" onClick={() => setRole("user")}>
            <Settings className="h-5 w-5" />
            <Typography
              variant="small"
              color="blue-gray"
              className="absolute top-2/4 -left-2/4 -translate-y-2/4 -translate-x-3/4 font-normal"
            >
              user
            </Typography>
          </SpeedDialAction>
          <SpeedDialAction
            className="relative"
            onClick={() => setRole("establishment")}
          >
            <LayoutGrid className="h-5 w-5" />
            <Typography
              variant="small"
              color="blue-gray"
              className="absolute top-2/4 -left-2/4 -translate-y-2/4 -translate-x-3/4 font-normal"
            >
              establishment
            </Typography>
          </SpeedDialAction>
        </SpeedDialContent>
      </SpeedDial>
    </div>
  );
}
