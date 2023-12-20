// atoms.js
import { atom } from 'recoil';

const adminInit = localStorage.getItem("admin");

export const adminState = atom({
    key: 'adminState',
    default: adminInit,
});
