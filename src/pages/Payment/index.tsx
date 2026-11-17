
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import qrCode from "../../assets/qrCode.png"

interface Agendamento {
    petName: string;
    selectedWeight: string;
    selectedServices: string[];
    appointmentDate: string;
    totalPrice: number;
}

export default function Pagamentos() {
    const location = useLocation();
    const navigate = useNavigate();

    const agendamento = location.state as Agendamento | null;

    const [loading, setLoading] = useState(false);

    const serviceNames: Record<string, string> = {
        banho: "Banho",
        tosa: "Tosa",
        hidratacao: "Hidratação",
        transporte: "Transporte"
    };

    const weightNames: Record<string, string> = {
        pequeno: "Pequeno",
        medio: "Médio",
        grande: "Grande",
        gigante: "Gigante"
    };

    async function handlePaymentCompleted() {
        if (!agendamento) {
            alert("Não foram encontradas informações do agendamento.");
            return;
        }

        setLoading(true);

        try {
            // TODO: chamar aqui a função do backend Python
            // para registrar o agendamento no banco de dados.

            alert("Pagamento simulado com sucesso!");

            // Depois que o backend confirmar o registro,
            // redireciona para a tela de confirmação.
            navigate("/home");

        } catch (error) {
            console.error("Erro ao registrar agendamento:", error);
            alert("Não foi possível registrar seu agendamento.");
        } finally {
            setLoading(false);
        }
    }

    if (!agendamento) {
        return (
            <main className="min-h-screen bg-white flex flex-col items-center justify-center p-6 font-nunito">
                <h1 className="text-2xl font-bold text-[#25253D]">
                    Agendamento não encontrado
                </h1>

                <button
                    onClick={() => navigate("/home")}
                    className="mt-5 bg-[#9238F5] text-white rounded-lg px-6 py-3 font-bold"
                >
                    Voltar para Home
                </button>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-white w-full font-nunito flex flex-col">

            {/* Cabeçalho */}
            <header className="px-6 pt-10 pb-5">
                <h1 className="text-[30px] font-bold text-[#25253D]">
                    Finalizar
                    <br />
                    Pagamento
                </h1>

                <p className="text-sm text-gray-500 mt-2">
                    Confira seu agendamento e realize o pagamento.
                </p>
            </header>

            {/* Conteúdo */}
            <section className="flex-1 px-6 flex flex-col">

                {/* Resumo */}
                <div className="border-2 border-gray-200 rounded-2xl p-4">

                    <h2 className="text-lg font-bold text-[#25253D] mb-3">
                        Resumo do agendamento
                    </h2>

                    <div className="space-y-2 text-sm text-[#536071]">

                        <p>
                            Pet: <strong>{agendamento.petName}</strong>
                        </p>

                        <p>
                            Porte: <strong>{weightNames[agendamento.selectedWeight]}</strong>
                        </p>

                        <p>
                            Data: <strong>{agendamento.appointmentDate}</strong>
                        </p>

                        <div>
                            <p className="font-semibold mb-1">Serviços:</p>

                            {agendamento.selectedServices.map((service) => (
                                <p key={service}>
                                    • {serviceNames[service] || service}
                                </p>
                            ))}
                        </div>

                    </div>

                    <div className="border-t border-gray-200 mt-4 pt-3 flex justify-between items-center">
                        <span className="font-bold text-[#25253D]">
                            Total
                        </span>

                        <span className="text-xl font-bold text-[#9238F5]">
                            R$ {agendamento.totalPrice.toFixed(2).replace(".", ",")}
                        </span>
                    </div>
                </div>

                {/* Pagamento */}
                <div className="mt-7 text-center">

                    <h2 className="text-xl font-bold text-[#25253D]">
                        Pagamento via PIX
                    </h2>

                    <p className="text-sm text-gray-500 mt-2">
                        Escaneie o QR Code abaixo para simular seu pagamento.
                    </p>

                    {/* Espaço reservado para QR Code */}
                    <div className="mx-auto mt-10 w-[220px] h-[220px]  rounded-xl flex flex-col items-center justify-center bg-purple-50">

                        <span className="text-[#9238F5] font-bold text-sm">
                            QR CODE
                        </span>

                        <span className="text-xs text-gray-400 -mt-10">
                            <img src={qrCode} className="size-full" />
                        </span>

                    </div>

                    <p className="text-xs text-gray-400 mt-4">
                        Ambiente de simulação. Nenhuma cobrança será realizada.
                    </p>
                </div>

                {/* Botão */}
                <div className="mt-auto py-8">

                    <button
                        type="button"
                        onClick={handlePaymentCompleted}
                        disabled={loading}
                        className="w-full h-12 rounded-xl bg-[#9238F5] hover:bg-[#7D27DF] text-white font-bold shadow-md disabled:opacity-50"
                    >
                        {loading ? "Processando..." : "Pagamento concluído"}
                    </button>

                    <button
                        type="button"
                        onClick={() => navigate("/home")}
                        className="w-full h-12 mt-3 rounded-xl border-2 border-[#536071] text-[#536071] font-bold"
                    >
                        Cancelar
                    </button>

                </div>

            </section>

            {/* Rodapé */}
            <footer className="w-full min-h-[8vh] bg-[#8A38F5]" />

        </main>
    );
}
