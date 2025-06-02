import React, { useEffect, useState } from "react";

const ResumoEmprestimos = () => {
    const [ativos, setAtivos] = useState([]);
    const [disponiveis, setDisponiveis] = useState([]);

    const fetchDados = async () => {
        try {
            const resEmp = await fetch("http://192.168.100.109:8080/emprestimos/abertos");
            const emprestimos = await resEmp.json();

            const detalhes = await Promise.all(
                emprestimos.map(async (emp) => {
                    try {
                        const profRes = await fetch(`http://192.168.100.109:8080/usuarios/${emp.professorId}`);
                        const prof = await profRes.json();

                        const itemRes = await fetch(`http://192.168.100.109:8080/itens/${emp.itensIds[0]}`);
                        const item = await itemRes.json();

                        return {
                            professor: prof.nome,
                            rfid: prof.rfid,
                            item: item.nome,
                            sala: item.sala,
                            predio: item.predio,
                            descricao: item.descricao
                        };
                    } catch (err) {
                        console.error("Erro ao buscar um empréstimo detalhado:", err);
                        return null;
                    }
                })
            );

            const filtrados = detalhes.filter(emp => emp !== null).slice(0, 10);
            setAtivos(filtrados);
        } catch (err) {
            console.error("Erro ao buscar empréstimos ativos:", err);
        }

        try {
            const resDisp = await fetch("http://192.168.100.109:8080/itens");
            const itens = await resDisp.json();
            const filtrados = itens.filter(i => i.ativo && i.quantidadeAtual > 0).slice(0, 10);
            setDisponiveis(filtrados);
        } catch (err) {
            console.error("Erro ao buscar itens disponíveis:", err);
        }
    };

    useEffect(() => {
        fetchDados(); // primeira chamada imediata

        const interval = setInterval(() => {
            fetchDados(); // atualiza a cada 10 segundos
        }, 10000);

        return () => clearInterval(interval); // limpa o intervalo ao desmontar
    }, []);

    return (
        <section className="info-columns">
            <div className="column">
                <h4>Professores Ativos</h4>
                <ul>
                    {ativos.length === 0 ? (
                        <li>Nenhum professor ativo</li>
                    ) : (
                        ativos.map((emp, index) => (
                            <li key={index}>{emp.professor} - {emp.sala} / {emp.predio}</li>
                        ))
                    )}
                </ul>
            </div>
            <div className="column">
                <h4>Itens Emprestados</h4>
                <ul>
                    {ativos.length === 0 ? (
                        <li>Nenhum item emprestado</li>
                    ) : (
                        ativos.map((emp, index) => (
                            <li key={index}>{emp.item} - {emp.sala} / {emp.predio}</li>
                        ))
                    )}
                </ul>
            </div>
            <div className="column">
                <h4>Itens Disponíveis</h4>
                <ul>
                    {disponiveis.length === 0 ? (
                        <li>Nenhum item disponível</li>
                    ) : (
                        disponiveis.map((item, index) => (
                            <li key={index}>{item.nome} - {item.descricao}</li>
                        ))
                    )}
                </ul>
            </div>
        </section>
    );
};

export default ResumoEmprestimos;
