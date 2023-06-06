import { firestore  } from '../../../../services/firebase';
import { firestoreAdm, authAdm  } from '../../../../firebase-admin';
import {
    doc,
    getDoc,
    getDocs,
    collection,
    updateDoc,
    deleteDoc,
    addDoc,
    setDoc
} from 'firebase/firestore'
import { IUser } from '@/app/interfaces/user.interface';

const fsUsersInstance = collection(firestore, 'users');

export default async function handler(request: any, response: any) {
  const id = request.query.id;
  const idMaster = request.query.idMaster;
  const body = request.body;

  switch (request.method) {
    case 'GET':
      if (id === undefined) { // GET ALL...
        firestoreAdm.collection('users')
          .where('idMaster', '==', idMaster)
          .get()
          .then(snapshot => {
          const users = snapshot.docs.map(doc => ({
            ...doc.data(), id: doc.id
          }));
          response.status(200).json(users);
        }).catch(e => {
          response.status(e.code).json(e.message);
        })
      } else { // GET BY ID...
        const userRef = doc(firestore, 'users', id);
        const data = await getDoc(userRef);
        const user = { ...data.data(), id: data.id };
        user ? response.status(200).json(user) : response.status(404).json(user);
      }
      break;
    case 'POST':
      const newUser: IUser = body;
      authAdm.createUser({
        email: newUser?.email,
        password: newUser?.password,
        displayName: newUser?.name,
      }).then(async (dataUser) => {
        await setDoc(doc(fsUsersInstance, dataUser.uid), {
          idMaster: newUser?.idMaster,
          email: newUser?.email,
          name: newUser?.name,
          sector: newUser?.sector,
          role: newUser?.role
        });
        response.status(200).json("Inserido com sucesso");
      }).catch(e => {
        response.status(e.code).json(e.message);
      })
      break;
    case 'PUT':
      const user: IUser | any = body;
      if(id === undefined) {
        response.status(404).json('Usuário não definido!');
      } else {
        authAdm.updateUser(id, {
          email: user?.email,
          password: user?.password,
        })
        .then(async () => {
          delete user?.password;
          delete user?.id;
          await updateDoc(doc(fsUsersInstance, id), user);
          response.status(200).json();
        })
        .catch((error) => {
          // response.status(error.code).json(error.message);
        });
      }
      break;
    case 'DELETE':
      authAdm.deleteUser(id)
      .then(async () => {
        await deleteDoc(doc(fsUsersInstance, id));
        response.status(204).json();
      }).catch((e) => {
        response.status(e.code).json({message: "Não foi possível deletar o usuário!", error: e});
      })
      break;
    default:
      response.status(404).json("Pagina não encontrada");
  }
}
