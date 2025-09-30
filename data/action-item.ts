import { FaCoins, FaRecycle, FaWalking } from "react-icons/fa";
import { IoBagCheckOutline } from "react-icons/io5";
import {
  MdEmojiTransportation,
  MdOutlineDashboardCustomize,
} from "react-icons/md";

export const action_items = [
  {
    name: "Dashboard",
    route: "/dashboard",
    Icon: MdOutlineDashboardCustomize,
    id: 1,
  },
  { name: "Recycling", route: "/recycling", Icon: FaRecycle, id: 2 },
  {
    name: "Public Transport use",
    route: "/dashboard",
    Icon: MdEmojiTransportation,
    id: 3,
  },
  { name: "Walking", route: "/dashboard", Icon: FaWalking, id: 4 },
  {
    name: "Using reusable bag",
    route: "/dashboard",
    Icon: IoBagCheckOutline,
    id: 5,
  },
  { name: "Earn", route: "/earn", Icon: FaCoins, id: 6 },
];
