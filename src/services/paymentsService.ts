
import { api } from "./api";

export async function confirmPayment(
    appointmentId: string,
    token: string
) {
    const response = await fetch(
        `${api}/payments/${appointmentId}/confirm`,
        {
            method: "PATCH",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }
    );

    const resultado = await response.json();

    if (!response.ok) {
        throw new Error(
            resultado.detail || "Erro ao finalizar o pagamento simulado."
        );
    }

    return resultado;
}
