// src/pages/Dashboard.jsx
import React, { useState } from 'react';
import Header from '../components/Header';
import ProfessorModal from '../components/ProfessorModal';
import '../css/Dashboard.css';
import ItensModal from "../components/ItensModal";

const Dashboard = () => {
    // Aqui estou declarando o Modal de cadastro de professor e falando que esta FALSO somente VERDADEIRO quando eu apertar para abrir
    const [showProfessorModal, setShowProfessorModal] = useState (false);
    const [showItensModal, setShowItensModal] = useState (false);

    return (
        <div className="dashboard">
            <Header />

            <main className="main-content">
                <h2 className="welcome">Seja Bem-Vindo(a)</h2>
                <h3 className="university">Universidade Franciscana</h3>

                <section className="card-grid">

                    <div className="card green"
                        onClick={() => setShowItensModal(true)}
                        style={{ cursor : "pointer"}}
                    >
                        <div className="card-title">Registrar Itens</div>
                        <div className="card-sub">Chaves, controles, etc</div>
                    </div>


                    <div className="card teal"
                         onClick={() => setShowProfessorModal(true)}
                         style={{ cursor: "pointer" }}
                    >
                        <div className="card-title">Registrar Professores</div>
                        <div className="card-sub">Usuários RFID</div>
                    </div>

                    <div className="card yellow">
                        <div className="card-title">Registrar Sala</div>
                        <div className="card-count">427 registros</div>
                        <div className="card-sub">Prédio e Sala</div>
                    </div>

                    <div className="card olive">
                        <div className="card-title">Registrar Sala e Item</div>
                        <div className="card-count">28 registros</div>
                        <div className="card-sub">Atribuições diretas</div>
                    </div>

                    <div className="card dark">
                        <div className="card-title">Ver estoque completo</div>
                        <div className="card-count">28 itens</div>
                        <div className="card-sub">Todos disponíveis</div>
                    </div>

                    <div className="card blue">
                        <div className="card-title">Adicionar Prédio e Sala</div>
                        <div className="card-count">125 registros</div>
                        <div className="card-sub">Gerenciamento de locais</div>
                    </div>
                </section>

                <section className="info-columns">
                    <div className="column">
                        <h4>Professores Ativos</h4>
                        <ul>
                            <li>João Silva</li>
                            <li>Maria Costa</li>
                            <li>Ana Lima</li>
                        </ul>
                    </div>

                    <div className="column">
                        <h4>Itens Emprestados</h4>
                        <ul>
                            <li>Chave Lab 1 - João</li>
                            <li>Controle Ar - Maria</li>
                        </ul>
                    </div>

                    <div className="column">
                        <h4>Itens Disponíveis</h4>
                        <ul>
                            <li>Chave Auditório</li>
                            <li>HDMI reserva</li>
                        </ul>
                    </div>
                </section>

                {/* MODALS !! */}
                <ProfessorModal
                    isOpen={showProfessorModal}
                    onClose={() => setShowProfessorModal(false)}
                />
                <ItensModal
                    isOpen={showItensModal}
                    onClose={() => setShowItensModal(false)}
                />
            </main>
        </div>
    );
};

export default Dashboard;
