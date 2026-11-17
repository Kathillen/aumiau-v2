
import { useState } from "react";
import { supabase } from "../../lib/supabase";
import { useLocation, useNavigate } from "react-router-dom";

export default function Login() {
    const [isRegister, setIsRegister] = useState(false);

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate()

    const [loading, setLoading] = useState(false);

    const location = useLocation();

    const selectedWeight = location.state?.selectedWeight;

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (!email || !password) {
            alert("Preencha todos os campos.");
            return;
        }

        if (isRegister && !fullName) {
            alert("Informe seu nome completo.");
            return;
        }

        setLoading(true);

        try {
            if (isRegister) {
                    const { data, error } = await supabase.auth.signUp({
                        email,
                        password,
                        options: {
                            data: {
                                full_name: fullName
                            }
                        }
                    });
                
                    if (error) throw error;
                
                    if (data.session) {
                        alert("Conta criada com sucesso!");
                        navigate("/home", {
                            state: {
                                selectedWeight
                            }
                        });
                    } else {
                        alert("Conta criada, mas é necessário confirmar o e-mail.");
                    }
                } else {
                const { data, error } = await supabase.auth.signInWithPassword({
                    email,
                    password
                });

                if (error) throw error;

                if (data.session) {
                    alert("Login realizado com sucesso!");
                    navigate("/home", {
                        state: {
                            selectedWeight
                        }
                    });
                }
            }

        } catch (error) {
            if (error instanceof Error) {
                alert(error.message);
            }
        } finally {
            setLoading(false);
        }
    }

    function PawPrint({ className = "" }: { className?: string }) {
        return (
            <svg
                viewBox="0 0 60 55"
                fill="none"
                className={className}
            >
                <g
                    stroke="#C9A0FF"
                    strokeWidth="0.9"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <ellipse cx="12" cy="13" rx="5" ry="8" transform="rotate(-25 12 13)" />
                    <ellipse cx="29" cy="8" rx="5" ry="8" transform="rotate(-5 29 8)" />
                    <ellipse cx="45" cy="15" rx="5" ry="8" transform="rotate(25 45 15)" />
                    <path d="M17 31 C19 24 25 23 29 27 C34 22 41 25 43 32 C48 41 40 47 31 43 C22 48 13 41 17 31Z" />
                </g>
            </svg>
        );
    }

    return (
    <main className="min-h-screen w-full bg-white">

        <section className="relative overflow-hidden min-h-screen w-full p-4 md:p-10">

            {/* patas */}
            <PawPrint className="absolute w-16 top-12 right-8 opacity-70" />
            <PawPrint className="absolute w-14 top-28 right-3 opacity-70" />

            <div className="relative z-10 w-full max-w-md">

                <h1 className="text-[#25253D] text-[40px] font-bold leading-[1.35] max-w-[190px] mb-5">
                    {isRegister ? (
                        <>Crie sua <br /> conta</>
                    ) : (
                        <>Entre em sua <br /> conta</>
                    )}
                </h1>

                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col gap-3"
                    >

                        {isRegister && (
                            <div>
                                <label className="block text-[#25253D] text-xs font-semibold mb-2">
                                    Nome completo
                                </label>

                                <input
                                    type="text"
                                    placeholder="digite seu nome aqui..."
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    className="w-full h-10 border border-[#536071] rounded px-2 text-xs outline-none focus:border-purple-500"
                                />
                            </div>
                        )}

                        <div>
                            <label className="block text-[#25253D] text-xs font-semibold mb-2">
                                E-mail
                            </label>

                            <input
                                type="email"
                                placeholder="digite seu e-mail aqui..."
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full h-10 border border-[#536071] rounded px-2 text-xs outline-none focus:border-purple-500"
                            />
                        </div>

                        <div>
                            <label className="block text-[#25253D] text-xs font-semibold mb-2">
                                {isRegister ? "Crie sua senha" : "Senha"}
                            </label>

                            <input
                                type="password"
                                placeholder={
                                    isRegister
                                        ? "crie sua senha..."
                                        : "digite sua senha aqui..."
                                }
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full h-10 border border-[#536071] rounded px-2 text-xs outline-none focus:border-purple-500"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-[#9238F5] hover:bg-[#7D27DF] text-white text-xs font-bold h-10 rounded mt-3 disabled:opacity-50"
                        >
                            {loading
                                ? "Aguarde..."
                                : isRegister
                                    ? "Cadastrar-se"
                                    : "Entrar"}
                        </button>

                    </form>

                    <p className="text-center text-[11px] text-[#25253D] mt-5">

                        {isRegister
                            ? "Já tem conta?"
                            : "Não tem conta?"}

                        <button
                            type="button"
                            onClick={() => {
                                setIsRegister(!isRegister);
                                setEmail("");
                                setPassword("");
                                setFullName("");
                            }}
                            className="underline font-semibold ml-1"
                        >
                            {isRegister ? "Entrar" : "Cadastre-se"}
                        </button>

                    </p>

                </div>

            </section>

        </main>
    );
}
