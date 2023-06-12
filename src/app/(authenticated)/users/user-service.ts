import { IUser } from "@/app/interfaces/user.interface";

export let currentUserId = localStorage.getItem('uid');
export let currentIdMaster: string;
export let role: string;

(async () => {
  await getRole();
  console.log('currentUserId >> ', currentUserId!)
  console.log('currentIdMaster >> ', currentIdMaster!)
  console.log('role >> ', role!)
})()

async function getRole() {
  await fetch(`api/user/user-controller?id=${currentUserId}`)
  .then((res) => res.json())
  .then((data: IUser) => {
    currentIdMaster = data.idMaster!;
    role = data.role;
  });
}

export function isRole(UseRole: string) {
  if(role === UseRole)
    return true
  else
    return false;
}