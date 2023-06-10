import { IUser } from "@/app/interfaces/user.interface";

export const currentUserId = localStorage.getItem('uid');
export const currentIdMaster = localStorage.getItem('idMaster');
export let role: string;

(() => {
  getRole();
})()

async function getRole() {
  await fetch(`api/user/user-controller?id=${currentUserId}`)
  .then((res) => res.json())
  .then((data: IUser) => {
    role = data.role;
  });
}

export function isRole(UseRole: string) {
  if(role === UseRole)
    return true
  else
    return false;
}