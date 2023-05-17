"use client";

import { getUsersById } from "../../services/users-service";

export default async function UserDetail({params}: {params: {userId: string}}) {
  const user = await getUsersById(params.userId);

  return (
    <>
      <div>
        <h1>Usuario: {user.first_name} {user.last_name}</h1>
        <p>{user.email}</p>
      </div>
    </>
  )
}
