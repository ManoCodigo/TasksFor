"use client";

import './user.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquare, faCheckSquare} from '@fortawesome/free-regular-svg-icons';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas, faUserShield } from '@fortawesome/free-solid-svg-icons';
library.add(fas);

import { useEffect, useState } from 'react';
import ModalForm from '../../../components/modalForm/modalForm';
import { listSectors } from '@/utils/lists/list-sectors';
import { listRoles } from '@/utils/lists/list-roles';
import { IUser } from '@/interfaces/user.interface';
import { currentIdMaster, currentUserId, isRole } from '../../../services/auth';

// export const metadata = {
//   title: 'Equipe | TasksFor',
//   description: 'Generated by create next app',
// }

export default function UsersPage() {

  const pathApi = '/api/user/user-controller';

  const [lstUser, setLstUser] = useState<IUser[]>([]);
  const [user, setUser] = useState<IUser>();
  const [confirmDelete, setConfirmDelete] = useState('');
  const [typeForm, setTypeForm] = useState('');
  const [isModalActive, setIsModalActive] = useState(false);
  const [modalTitle, setModalTitle] = useState('');

  useEffect(() => {
    getAllUsers();
  }, []);

  async function getAllUsers() {
    clearStateUser();
    await fetch(`${pathApi}?idMaster=${currentIdMaster}`)
      .then((res) => res.json())
      .then((data) => {
        setLstUser(data);
      })
  }

  async function createUser(users: IUser) {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify(users)
    };

    await fetch(pathApi, requestOptions)
    .finally(() => {
      getAllUsers();
      showModal();
    });
  }

  async function updateUser(user: IUser) {
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    };

    await fetch(`${pathApi}?id=${user.id}`, requestOptions)
      .finally(() => {
        getAllUsers();
        showModal();
      });
  }

  async function deleteUser(id: string) {
    const requestOptions = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    };

    await fetch(`${pathApi}?id=${id}`, requestOptions)
      .finally(() => {
        getAllUsers();
      });
  }

  function showModal() {
    setIsModalActive(!isModalActive);
  }

  function submit(e: any) {
    e.preventDefault();
    actionSubmit(user!);
  }

  function actionSubmit(user: IUser) {
    switch (typeForm) {
      case 'create':
        user.idMaster = currentUserId!;
        user.sector = user.sector ? user.sector : listSectors[0].label;
        user.role = user.role ? user.role : listRoles[0].label;
        createUser(user);
        break;
      case 'update':
        updateUser(user);
        break;
      default:
        break;
    }
  }

  function prepareCreate() {
    clearStateUser();
    setTypeForm('create');
    setModalTitle('Novo Usuário');
    showModal();
  }

  function prepareUpdate(user: IUser) {
    setUser(user)
    setTypeForm('update');
    setModalTitle('Editar Usuário');
    showModal();
  }

  function clearStateUser() {
    setUser({
      id: '',
      name: '',
      email: '',
      password: '',
      sector: '',
      role: '',
    })
  }
  
  return (
    <>
      <section className="container-title">
        <h2>Sua Equipe</h2>
        { isRole('Administrador') &&
          <button onClick={prepareCreate}>
            <FontAwesomeIcon icon="plus"/>
          </button>
        }
      </section>

      <section className="container-list-user">
        {lstUser.map((user: IUser) => (
          <div key={user.id} className="box-card">
            <div className="card-info">
              <p>
                <span>{user.name}</span> 
                {user.id === user.idMaster && <FontAwesomeIcon icon={faUserShield} />}
              </p>
              <p><strong>• Email:</strong>{user.email}</p>
              <p><strong>• Setor:</strong>{user.sector}</p>
              <p><strong>• Permissão:</strong>{user.role}</p>
            </div>
            <div className="card-actions">
              { confirmDelete === user.id &&
                <>
                  <button onClick={() => deleteUser(user.id!)} className="btn-confirm">Confirmar</button>
                  <button onClick={() => setConfirmDelete('')}>Cancelar</button>
                </>
              }
              { confirmDelete != user.id &&
                <>
                  { isRole('Administrador') &&
                    <button onClick={() => setConfirmDelete(user.id!)}>Excluir Usuário</button>
                  }
                  { (isRole('Administrador') || isRole('Gerente') || user.id === currentUserId) &&
                    <button onClick={() => prepareUpdate(user)}>Editar Usuário</button>
                  }
                </>
              }
            </div>
          </div>
        ))}
      </section>

      <ModalForm
        className="modal"
        title={modalTitle}
        hidden={isModalActive}
        showModal={showModal}
        submit={submit}
        user={user}
        setUser={setUser}
        typeForm={typeForm}
      >
      </ModalForm>
    </>
  )
}