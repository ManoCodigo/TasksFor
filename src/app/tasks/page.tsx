"use client";

import './tasks.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquare, faCheckSquare } from '@fortawesome/free-regular-svg-icons';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faUserShield, fas } from '@fortawesome/free-solid-svg-icons';
import { ChangeEvent, FocusEvent, useEffect, useState } from 'react';
import { ITask } from '@/interfaces/task.interface';
import { IUser } from '@/interfaces/user.interface';
import { currentIdMaster, currentUserId, isRole } from '../../../services/auth';
library.add(fas);

export default function TasksPage() {
  const pathApiUser = '/api/user/user-controller';
  const pathApiTask = '/api/task/task-controller';

  const [lstUser, setLstUser] = useState<IUser[]>([]);
  const [focusedUser, setFocusedUser] = useState<IUser>();
  const [lstTasks, setLstTasks] = useState<ITask[]>([]);
  const [descripiton, setDescripiton] = useState('');

  useEffect(() => {
    getAllUsers();
  }, []);

  async function getAllUsers() {
    await fetch(`${pathApiUser}?idMaster=${currentIdMaster}`)
      .then((res) => res.json())
      .then((data) => {
        setLstUser(data);
        console.log(data)
        if(lstTasks.length === 0) 
          getTasksByUser(data[0]);
      });
  }

  async function getTasksByUser(user?: IUser) {
    setFocusedUser(user);
    await fetch(`${pathApiTask}?id=${user?.id}`)
      .then((res) => res.json())
      .then((listTasks) => {
        filterCheckedTasks(listTasks);
      })
  }
  
  function filterCheckedTasks(listTasks: ITask[]) {
    const checked: ITask[] = [];
    const unchecked: ITask[] = [];
    
    listTasks.forEach((task: ITask) => {
      task.checked ? checked.push(task) : unchecked.push(task);
    });

    setLstTasks(unchecked.concat(checked));
  }

  async function createTask() {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify(descripiton)
    };

    await fetch(`${pathApiTask}?id=${focusedUser?.id}`, requestOptions)
      .finally(() => {
        setDescripiton('');
        getTasksByUser(focusedUser!);
      })
  }
  
  async function updateTaskDescription(task: ITask, e?: FocusEvent<HTMLInputElement, Element>) {
    const currentDesc = task.description;
    const newDesc = e?.target.value;

    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify(newDesc)
    };

    if(newDesc != currentDesc && newDesc)  {
      await fetch(`${pathApiTask}?id=${task.id}`, requestOptions)
        .finally(() => {
          console.log('finally UPDATE')
          setDescripiton('');
          getTasksByUser(focusedUser!);
        });
    }
  }

  async function updateTaskChecked(task: ITask, ce?: ChangeEvent<HTMLInputElement>) {
    task.checked = Boolean(ce?.target.checked);

    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify(ce?.target.checked)
    };

    await fetch(`${pathApiTask}?id=${task.id}`, requestOptions)
      .finally(() => {
        console.log('finally UPDATE CEHCK')
        setDescripiton('');
        getTasksByUser(focusedUser!);
      });
   
  }

  async function deleteTask(id: string) {
    const requestOptions = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    };
    console.log('id > ', id)
    await fetch(`${pathApiTask}?id=${id}`, requestOptions)
    .finally(() => {
      console.log('finally DELETE')
      setDescripiton('');
      getTasksByUser(focusedUser!);
    })
  }

  function isCurrentUser() {
    if(currentUserId === focusedUser?.id)
      return true;
    else 
      return false;
  }

  return (
    <>
      <h2 className="title-page">Quadro</h2>
      <section className="container-task">
        <section className="container-list-users">
          <div className="box-card">
          { lstUser.map((user: IUser) =>  (
              <div key={user.id} onClick={() => getTasksByUser(user) } className={`card-info ${user.id === focusedUser?.id ? 'card-info-active' : ''}`}>
                <p>
                  {user.name}
                  {user.id === user.idMaster && <FontAwesomeIcon icon={faUserShield} />}
                  </p>
                <p><strong>• Setor:</strong> {user.sector}</p>
                <p>
                  <strong>• Tarefas:</strong> 
                  <span>
                    <FontAwesomeIcon icon={faSquare}/>
                    <span>10</span>
                  </span>
                  <span>
                    <FontAwesomeIcon icon={faCheckSquare}/>
                    <span>10</span>
                  </span>
                </p>
              </div>
          ))}
          </div>
        </section>

        <section className="container-list-tasks">
          <div className="list-tasks">
            <p>Tarefas de: <span>{ focusedUser?.name }</span></p>
            <div className="box-task">
            { lstTasks.length === 0 &&
              <div className="container-no-tasks">
                <img src="/no-tasks.png" alt="Sem Tarefas" className="no-tasks"/>
                <p>Sem tarefas...</p>
              </div>
            }
            { lstTasks.length > 0 && 
              <>
                { lstTasks.map(task => (
                  <div key={task.id} className="task">
                    <div>
                      {(isRole('Administrador') || isRole('Gerente') || isCurrentUser()) && 
                        <input type="checkbox" defaultChecked={task.checked} onChange={(e) => updateTaskChecked(task!, e)}/>
                      }
                      { isRole('Funcionário') && !isCurrentUser() && <span className={`${task.checked ? 'task-checked-point' : ''}`}>•</span> }
                      <input type="text" defaultValue={task.description} readOnly={(isRole('Funcionário') && !isCurrentUser() || task.checked)} 
                        className={`${task.checked ? 'task-checked' : ''}`} onBlur={(e) => updateTaskDescription(task!, e)}/>
                    </div>
                    {(isRole('Administrador') || isRole('Gerente') || isCurrentUser()) && 
                      <button onClick={() => deleteTask(task.id!)}>
                        <FontAwesomeIcon icon="trash"/>
                      </button>
                    }
                  </div>
                ))}
              </>
            }
            </div>
          </div>

          { (isRole('Administrador') || isRole('Gerente') || isCurrentUser()) &&
            <div className="container-add-task">
              <input type="text" placeholder="Nova tarefa..." value={descripiton!} onChange={(descripiton) => setDescripiton(descripiton.target.value)}/>
              <button onClick={ createTask }>
                <FontAwesomeIcon icon="plus" />
                Adicionar
              </button>
            </div>
          }
        </section>
      </section>
    </>
  )
}