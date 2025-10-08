import { FaCoins, FaDonate, FaRecycle } from "react-icons/fa";
import { MdOutlineDashboardCustomize, MdTrendingUp } from "react-icons/md";

export const action_items = [
  {
    name: "Dashboard",
    route: "/dashboard",
    Icon: MdOutlineDashboardCustomize,
    id: 1,
  },
  { name: "Submit Actions", route: "/submit-actions", Icon: FaRecycle, id: 2 },
  { name: "Earn", route: "/earn", Icon: FaCoins, id: 3 },
  { name: "Leaderboard", route: "/leaderboard", Icon: MdTrendingUp, id: 4 },
  { name: "Donation", route: "/donation", Icon: FaDonate, id: 5 },
];
