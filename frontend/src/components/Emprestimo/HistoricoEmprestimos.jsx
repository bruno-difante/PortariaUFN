import React, { useEffect, useState } from "react";

const HistoricoEmprestimos = ({ isOpen, onClose }) => {
    const [emprestimos, setEmprestimos] = useState([]);
    const [todosEmprestimos, setTodosEmprestimos] = useState([]);
    const [dataFiltro, setDataFiltro] = useState("");
    const [modoDevolucao, setModoDevolucao] = useState(false);
    const [selecionados, setSelecionados] = useState([]);
    const [filtroStatus, setFiltroStatus] = useState("todos");

    const hojeStr = new Date().toISOString().split("T")[0];

    const filtrarPorData = (dataStr) => {
        const filtrados = todosEmprestimos.filter(emp => {
            const dataEmp = new Date(emp.dataEmprestimo).toISOString().split("T")[0];
            const correspondeData = !dataStr || dataEmp === dataStr;

            const devolvido = !!emp.dataDevolucao;
            const correspondeStatus =
                filtroStatus === "ativos" ? !devolvido :
                    filtroStatus === "encerrados" ? devolvido :
                        true;

            return correspondeData && correspondeStatus;
        });

        setEmprestimos(filtrados);
    };

    const fetchDados = async () => {
        try {
            const res = await fetch("http://192.168.100.109:8080/emprestimos");
            const lista = await res.json();

            const detalhados = await Promise.all(
                lista.map(async (emp) => {
                    try {
                        const professorRes = await fetch(`http://192.168.100.109:8080/usuarios/${emp.professorId}`);
                        const professor = await professorRes.json();

                        const itemRes = await fetch(`http://192.168.100.109:8080/itens/${emp.itensIds[0]}`);
                        const item = await itemRes.json();

                        return {
                            ...emp,
                            professorNome: professor.nome,
                            professorRfid: professor.rfid,
                            itemNome: item.nome,
                            itemSala: item.sala,
                            itemPredio: item.predio
                        };
                    } catch (subErr) {
                        console.error("Erro em um empréstimo:", subErr);
                        return null;
                    }
                })
            );

            const limpos = detalhados.filter(emp => emp !== null);
            setTodosEmprestimos(limpos);
            filtrarPorData(dataFiltro); // aplica filtro inicial
        } catch (err) {
            console.error("Erro ao buscar empréstimos:", err);
            alert("Erro ao carregar dados");
        }
    };

    useEffect(() => {
        if (!isOpen) return;
        fetchDados();
    }, [isOpen]);

    // reaplica o filtro quando o status muda
    useEffect(() => {
        filtrarPorData(dataFiltro);
    }, [filtroStatus]);

    const alternarSelecionado = (id) => {
        setSelecionados(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
    };

    const finalizarSelecionados = async () => {
        for (const id of selecionados) {
            try {
                await fetch(`http://192.168.100.109:8080/emprestimos/devolver/${id}`, { method: "PUT" });
            } catch (err) {
                console.error(`Erro ao devolver empréstimo ${id}`, err);
            }
        }
        alert("Empréstimos finalizados com sucesso!");
        setSelecionados([]);
        setModoDevolucao(false);
        await fetchDados();
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-box">
                <h2>Histórico de Empréstimos</h2>

                <div style={{ marginBottom: "10px", display: "flex", gap: "10px", flexWrap: "wrap", alignItems: "center" }}>
                    <button onClick={() => filtrarPorData(hojeStr)}>Hoje</button>
                    <input
                        type="date"
                        value={dataFiltro}
                        onChange={(e) => {
                            setDataFiltro(e.target.value);
                            filtrarPorData(e.target.value);
                        }}
                    />
                    <button onClick={() => setModoDevolucao(!modoDevolucao)}>
                        Terminar Empréstimo
                    </button>
                    <button
                        onClick={() => setFiltroStatus("ativos")}
                        style={{ backgroundColor: filtroStatus === "ativos" ? "#ddd" : "" }}
                    >
                        Ativos
                    </button>
                    <button
                        onClick={() => setFiltroStatus("encerrados")}
                        style={{ backgroundColor: filtroStatus === "encerrados" ? "#ddd" : "" }}
                    >
                        Encerrados
                    </button>
                </div>

                <ul style={{ maxHeight: "300px", overflowY: "auto" }}>
                    {emprestimos.map((emp) => (
                        <li key={emp.id} style={{ marginBottom: "15px" }}>
                            {modoDevolucao && !emp.dataDevolucao && (
                                <input
                                    type="checkbox"
                                    checked={selecionados.includes(emp.id)}
                                    onChange={() => alternarSelecionado(emp.id)}
                                    style={{ marginRight: "8px" }}
                                />
                            )}
                            <p><strong>ID:</strong> {emp.id}</p>
                            <p><strong>Funcionário:</strong> {emp.professorNome} ({emp.professorRfid})</p>
                            <p><strong>Produto:</strong> {emp.itemNome}</p>
                            <p><strong>Sala:</strong> {emp.itemSala}</p>
                            <p><strong>Prédio:</strong> {emp.itemPredio}</p>
                            <p><strong>Data Empréstimo:</strong> {new Date(emp.dataEmprestimo).toLocaleString()}</p>
                            <p><strong>Devolução:</strong> {emp.dataDevolucao ? new Date(emp.dataDevolucao).toLocaleString() : "Em aberto"}</p>
                            <hr />
                        </li>
                    ))}
                </ul>

                {modoDevolucao && selecionados.length > 0 && (
                    <button onClick={finalizarSelecionados} style={{ marginTop: "10px" }}>Finalizar Selecionados</button>
                )}

                <button onClick={onClose} style={{ marginTop: "10px" }}>Fechar</button>
            </div>
        </div>
    );
};

export default HistoricoEmprestimos;
