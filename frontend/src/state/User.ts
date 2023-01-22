import { atom } from "recoil";
import User from "../interface/User";

export default atom<User | null>({
    key: "User",
    default: null
})