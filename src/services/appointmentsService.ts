
import { api } from "./api";

export async function createAppointment(
    dados: {
        pet: {
            nome: string;
            peso: number;
            porte: string;
        };
        data: string;
        servicos: string[];
    },
    token: string
) {
    const response = await fetch(`${api}/appointments/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(dados)
    });

    const resultado = await response.json();

    if (!response.ok) {
        throw new Error(
            resultado.detail || "Erro ao registrar o agendamento."
        );
    }

    return resultado;
}
