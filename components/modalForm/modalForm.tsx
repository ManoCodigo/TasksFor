"use client";

import '../../src/app/globals.scss'
import './modal-form.scss'
import { useState } from "react";
import { IUser } from "@/app/interfaces/user.interface";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
library.add(fas);


type ModalFormProps = {
  title: string;
  user: IUser;
}

const ModalForm = (props: any) => {
  const { title, hidden, user, setUser, showModal, submit } = props;

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
                  <label>Name:</label>
                  <input type="text" onChange={(name) => setUser({ ...user, 'name': name.target.value })}/>
                </div>
                <div className="group-input">
                  <label>Email:</label>
                  <input type="email" onChange={(email) => setUser({ ...user, 'email': email.target.value })}/>
                </div>
              </div>
            </div>
            <button type="submit">SUBMIT</button>
          </form>
        </section>
      </div>
    }
    </>
  )
}

export default ModalForm;