import './tasks.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquare, faCheckSquare } from '@fortawesome/free-regular-svg-icons';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
library.add(fas);

export default function TasksPage() {
  return (
    <>
      <h2 className="title-page">Quadro</h2>
      <section className="container-task">
        <section className="container-list-users">
          <div className="box-card">

            <div className="card-info card-info-active">
              <p>Lucas Brandão</p>
              <p><strong>• Setor:</strong> Desenvolvimento</p>
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
            
            <div className="card-info">
              <p>Davi Tavares</p>
              <p><strong>• Setor:</strong> Desenvolvimento</p>
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

          </div>
        </section>

        <section className="container-list-tasks">
          <div className="list-tasks">
            <p>Tarefas de: Lucas Brandão</p>
            <div className="box-task">

              <div className="task">
                <div>
                  <input type="checkbox"/>
                  <input type="text" value="Integrar API de pagamento"/>
                </div>
                <button>
                  <FontAwesomeIcon icon="trash"/>
                </button>
              </div>
              
            </div>
          </div>

          <div className="container-add-task">
            <input type="text" placeholder="Nova tarefa..."/>
            <button>
              <FontAwesomeIcon icon="plus" />
              Adicionar
            </button>
          </div>
        </section>
      </section>
    </>
  )
}