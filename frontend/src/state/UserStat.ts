import { atom } from "recoil";
import User from "../interface/User";

export default atom<User | null>({
    key: "UserStat",
    default: null
})