import { firestore  } from '../../../../services/firebase';
import {
    doc,
    getDoc,
    collection,
    updateDoc,
    deleteDoc,
    setDoc,
    query,
    where,
    getDocs
} from 'firebase/firestore'
import { IUser } from '@/app/interfaces/user.interface';
import { ITask } from '@/app/interfaces/task.interface';

const fsTasksInstance = collection(firestore, 'tasks');

export default async function handler(request: any, response: any) {
  const id = request.query.id;
  const idMaster = request.query.idMaster;
  const body = request.body;

  switch (request.method) {
    case 'GET':
      await getDocs(
        query(fsTasksInstance, where("idUser", "==", id))
        ).then(querySnapshot => {
        const tasks = querySnapshot.docs.map(doc => ({
          ...doc.data(), id: doc.id
        }));
        response.status(200).json(tasks);
      }).catch(e => {
        response.status(e.code).json(e.message);
      });
      break;
    case 'POST':
      await setDoc(doc(fsTasksInstance), {
        idUser: id,
        description: body,
        checked: false
      })
      .then(() => response.status(200).json("Inserido com sucesso", body))
      .catch((e) => response.status(e.code).json(e.message));
      break;
    case 'PUT':
      let upTask;
      if(typeof body === 'boolean') 
        upTask ={ checked: body }
      else
        upTask ={ description: body }

      await updateDoc(doc(fsTasksInstance, id), upTask)
      .then(() => response.status(200).json("Atualizado com sucesso", body))
      .catch((e) => response.status(e.code).json(e.message));
      break;
    case 'DELETE':
      const document = doc(fsTasksInstance, id)
      await deleteDoc(doc(fsTasksInstance, id))
        .then(() => response.status(200).json("Atualizado com sucesso", body))
        .catch((e) => response.status(e.code).json(e.message));
      break; 
    default:
      response.status(404).json("Pagina não encontrada");
  }
}