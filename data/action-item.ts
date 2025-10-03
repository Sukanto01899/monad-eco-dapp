import { FaCoins, FaRecycle } from "react-icons/fa";
import { MdOutlineDashboardCustomize } from "react-icons/md";

export const action_items = [
  {
    name: "Dashboard",
    route: "/dashboard",
    Icon: MdOutlineDashboardCustomize,
    id: 1,
  },
  { name: "Recycling", route: "/recycling", Icon: FaRecycle, id: 2 },
  { name: "Earn", route: "/earn", Icon: FaCoins, id: 6 },
];
