"use client";

import '../../src/app/globals.scss'
import './modal-form.scss'
import { IUser } from "@/app/interfaces/user.interface";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { listRoles } from '@/app/utils/lists/list-roles';
import { listSectors } from '@/app/utils/lists/list-sectors';
library.add(fas);


type ModalFormProps = {
  title: string;
  user: IUser;
}

const ModalForm = (props: any) => {
  const { title, hidden, user, setUser, showModal, submit, typeForm } = props;

  return (
    <>
    { hidden && 
      <div className="outside-modal">
        <section>
          <div className="close-modal" onClick={() => showModal()}>
            <FontAwesomeIcon icon="xmark"/>
          </div>
          <form onSubmit={(e) => submit(e)}>
            <div className="form-container">
              <h2>{ title }</h2>
              <div className="form-login">
                <div className="group-input">
                  <label>{typeForm === 'create' ? 'Nome:' : 'Altera Nome:'}</label>
                  <input type="text" value={user?.name}
                  onChange={(name) => setUser({ ...user, 'name': name.target.value })}/>
                </div>
                <div className="group-input">
                  <label>Email:</label>
                  <input type="email" value={user?.email}
                  onChange={(email) => setUser({ ...user, 'email': email.target.value })}/>
                </div>
                <div className="group-input">
                  <label>{typeForm === 'create' ? 'Senha:' : 'Altera Senha:'}</label>
                  <input type="password"
                  onChange={(password) => setUser({ ...user, 'password': password.target.value })}/>
                </div>
                <div className="group-input">
                  <label>{typeForm === 'create' ? 'Setor:' : 'Altera Setor:'}</label>
                  <select value={user?.sector}
                  onChange={(sector) => setUser({ ...user, 'sector': sector.target.value })}>
                    { listSectors?.map((res, index) => (
                      <option key={index} value={res.label}>{res.label}</option>
                      )) 
                    }
                  </select>
                </div>
                <div className="group-input">
                  <label>{typeForm === 'create' ? 'Permissão:' : 'Altera Permissão:'}</label>
                  <select value={user?.role}
                  onChange={(role) => setUser({ ...user, 'role': role.target.value })}>
                    { listRoles?.map((res, index) => (
                      <option key={index} value={res.label}>{res.label}</option>
                      )) 
                    }
                  </select>
                </div>
              </div>
            </div>
            <button type="submit">
              Salvar
            </button>
          </form>
        </section>
      </div>
    }
    </>
  )
}

export default ModalForm;