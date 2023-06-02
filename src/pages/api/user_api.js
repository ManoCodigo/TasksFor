import { firestore  } from '../../../services/firebase';
import {
    doc,
    getDoc,
    getDocs,
    collection,
    updateDoc,
    deleteDoc,
    addDoc
} from 'firebase/firestore'

const fsInstance = collection(firestore, 'users');

export default async function handler(req, res) {
  const id = req.query.id;

  switch (req.method) {
    case 'GET':
      if (id === undefined) { // GET ALL...
        const allUser = await getDocs(fsInstance)
        .then((data) => {
            return data.docs.map((item) => {
              return { ...item.data(), id: item.id };
            });   
        });
  
        res.status(200).json(allUser);
      } else { // GET BY ID...
        const userRef = doc(firestore, 'users', id);
        const data = await getDoc(userRef);
  
        const user = { ...data.data(), id: data.id };
        user ? res.status(200).json(user) : res.status(404).json(user);
      }
      break;
    case 'POST':

      break;
    case 'PUT':

      break;
    case 'DELETE':

      break;
    default:
      res.status(404).json("Pagina não encontrada")
  }
}
