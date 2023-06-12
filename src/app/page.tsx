import React from 'react';
import './home.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStarHalfStroke } from '@fortawesome/free-regular-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
library.add(fas);

export default function Home() {
  const icon = faStarHalfStroke;

  return (
    <div className="home-container">

      <section className="content-section">
        <section>
          <h2><FontAwesomeIcon icon={icon} />SOBRE O PROJETO</h2>
          <p>
            O projeto trata-se de uma aplicação para empresas, com o intuito de gerenciar tarefas e acompanhar as atividades diárias de cada funcionário, dando mais eficiência nesse acompanhamento.
            O sistema foi projetado para permitir que os usuários criem, visualizem, editem e excluam tarefas de forma intuitiva e conveniente. Com uma interface amigável e recursos avançados, o sistema oferece uma experiência agradável e produtiva.
          </p>
        </section>

        <section>
          <h2><FontAwesomeIcon icon={icon} />FUNCIONALIDADES DO PROJETO</h2>
          <ul>
            <li>
              <strong>Cadastro de Usuários:</strong>
              O sistema permite que os usuários se cadastrem e criem suas contas pessoais, fornecendo informações básicas como nome, e-mail e senha. Isso garante a segurança e a privacidade das informações dos usuários.
            </li>
            <li>
              <strong>Gerenciamento de Tarefas:</strong>
              Os usuários podem criar tarefas, atribuir prazos, adicionar descrições e marcar tarefas como concluídas. Além disso, é possível definir prioridades, categorias e tags para facilitar a organização e a filtragem das tarefas.
            </li>
            <li>
              <strong>Colaboração em Equipe:</strong>
              O sistema permite a criação de equipes de trabalho, onde os usuários podem compartilhar tarefas, atribuir responsabilidades e acompanhar o progresso em tempo real. Isso facilita a colaboração e o trabalho em conjunto.
            </li>
          </ul>
        </section>

        <section>
          <h2><FontAwesomeIcon icon={icon} />REGRA DE NEGÓCIOS</h2>
          <ul>
            <li>
              <strong>Cadastro de Usuários:</strong>
              Utilizando nome, email e senha, os usuários são cadastrados no sistema.
            </li>
            <li>
              <strong>Criação de Tarefas:</strong>
              Os usuários autenticados podem criar novas tarefas e adicioná-las à lista dos mesmos.
            </li>
            <li>
              <strong>Atribuição de Tarefas:</strong>
              Os usuários podem atribuir tarefas a outros membros da equipe, levando em consideração a função que cada um exerce.
            </li>
            <li>
              <strong>Atualização de Tarefas:</strong>
              Os usuários podem marcar a tarefa como concluída, também podem excluir a tarefa caso ela contenha algum erro, e lançá-la novamente logo após.
            </li>
          </ul>
        </section>

        <section>
          <div className="container-list-user">
            <div  className='body-card'>
              <a href="https://github.com/ManoCodigo" target="_blank">
                <img src="/lucas.jpg"/>
                <div className="infos">
                  <h3>Lucas Brandão</h3>
                  <small>Github</small>
                </div>
              </a>
            </div>
            <div  className='body-card'>
              <a href="https://github.com/spacedev13" target="_blank">
                <img src="/davi.jpg"/>
                <div className="infos">
                  <h3>Davi Tavares</h3>
                  <small>Github</small>
                </div>
              </a>
            </div>
          </div>
        </section>
      </section>
    </div>
  )
}
