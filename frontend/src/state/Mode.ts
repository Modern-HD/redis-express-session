import { atom } from "recoil";

export default atom<string>({
    key: "Mode",
    default: "home"
})