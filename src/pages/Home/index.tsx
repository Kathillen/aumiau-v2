import manDog from "../../assets/man-dog.png"
import patinha from "../../assets/Patinha.png"
import cachorroMolhado from "../../assets/cachorro-molhado.png"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { supabase } from "../../lib/supabase"
import { useLocation } from "react-router-dom";


export default function Home() {

    const [selectedWeight, setSelectedWeight] = useState("")
    
    const [showScheduling, setShowScheduling] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);
    
    const [selectedServices, setSelectedServices] = useState<string[]>([]);
    const [petName, setPetName] = useState("");
    const [appointmentDate, setAppointmentDate] = useState("");

    const navigate = useNavigate()

    const location = useLocation();

    useEffect(() => {
        if (location.state?.selectedWeight) {
            setSelectedWeight(location.state.selectedWeight);
        }
    }, [location.state]);

    const prices = {
        pequeno: {
            banho: { time: 40, price: 35.00 },
            tosa: { time: 30, price: 25.00 },
            hidratacao: { time: 20, price: 20.00 },
            transporte: { time: 30, price: 15.00 },
        },
        medio: {
            banho: { time: 50, price: 45.00 },
            tosa: { time: 40, price: 35.00 },
            hidratacao: { time: 30, price: 30.00 },
            transporte: { time: 40, price: 20.00 },
        },
        grande: {
            banho: { time: 60, price: 60.00 },
            tosa: { time: 50, price: 45.00 },
            hidratacao: { time: 40, price: 40.00 },
            transporte: { time: 50, price: 25.00 },
        },
        gigante: {
            banho: { time: 80, price: 80.00 },
            tosa: { time: 60, price: 60.00 },
            hidratacao: { time: 50, price: 55.00 },
            transporte: { time: 60, price: 35.00 },
        },
    };

        const services = [
        { name: "Banho", key: "banho" },
        { name: "Tosa", key: "tosa" },
        { name: "Hidratação", key: "hidratacao" },
        { name: "Transporte", key: "transporte" },
    ];
    
    const selectedPrices = selectedWeight
    ? prices[selectedWeight as keyof typeof prices]
    : null;

    // Verifica se o usuário está autenticado
    async function openScheduling() {
        if (!selectedWeight) return;

        const { data, error } = await supabase.auth.getSession();

        if (error) {
            alert("Não foi possível verificar seu login.");
            return;
        }

        if (!data.session) {
            navigate("/login", {
                state: {
                    selectedWeight
                }
            });
            return;
        }

        setCurrentStep(1);
        setShowScheduling(true);
    }

    // Selecionar ou desmarcar serviço
    function toggleService(service: string) {
        setSelectedServices((prev) =>
            prev.includes(service)
                ? prev.filter((item) => item !== service)
                : [...prev, service]
        );
    }

    // Calcula o valor total
    const totalPrice = selectedPrices
        ? selectedServices.reduce((total, service) => {
            return total + selectedPrices[service as keyof typeof selectedPrices].price;
        }, 0)
        : 0;

    // Avançar etapas
    function nextStep() {
        if (currentStep === 1 && selectedServices.length === 0) {
            alert("Selecione pelo menos um serviço.");
            return;
        }

        if (currentStep === 2 && !petName.trim()) {
            alert("Informe o nome do seu pet.");
            return;
        }

        if (currentStep === 3 && !appointmentDate) {
            alert("Selecione a data do atendimento.");
            return;
        }

        if (currentStep < 4) {
            setCurrentStep((prev) => prev + 1);
        }
    }

    // Voltar etapas
    function previousStep() {
        if (currentStep > 1) {
            setCurrentStep((prev) => prev - 1);
        }
    }

    // Ir para pagamento
    function goToPayment() {
        navigate("/pagamento", {
            state: {
                petName,
                selectedWeight,
                selectedServices,
                appointmentDate,
                totalPrice
            }
        });
    }

    const weight = [
        {value:"pequeno", label:"Pequeno (até 10kg)"},
        {value:"medio", label:"Médio (10 a 25kg)"},
        {value:"grande", label:"Grande (25 a 40kg)"},
        {value:"gigante", label:"Gigante (acima de 10kg)"},
    ]


    return (
        <main className="min-h-screen flex flex-col bg-white w-full font-nunito">

            <img className="w-[120px] absolute left-1/2 -rotate-30 top-10" src={patinha}/>

            <span className=" relative justify-center text-[30px] font-semibold items-end w-[70%] h-[20vh] left-4 top-4">
                <p className="">Seja bem-vindo(a)</p>
                <p className=" text-[#8A38F5] ">em nosso <br/> petshop!</p>
            </span>

            <img className="w-[120px] absolute right-2 top-52 -rotate-30" src={patinha}/>

            <span className=" relative justify-center text-[30px] font-semibold items-end w-[80%] h-[20vh] top-10">
                <img className="w-[380px]" src={manDog}/>
            </span>
            
            <p className=" absolute text-[18px] top-146  left-4">Onde o seu melhor amigo recebe o<br/> cuidado que ele merece, com todo o <br/>amor e segurança.</p>

            <img className="w-[120px] absolute right-4 top-148 rotate-30" src={patinha}/>

            <div className="relative w-[800px] h-[80vh] top-100">
                <div className="relative z-0 bg-[#8A38F5] w-[260px] h-[260px] rounded-full  left-32"/>
                <img className=" absolute z-20 w-[360px] h-[380px] rounded-full top-20  left-6" src={cachorroMolhado}/>
                <div className="relative z-0 border-[#8A38F5]  border-6 bg-[#FFFFFF] w-[260px] h-[260px] rounded-full  left-2"/>
            </div>

            <img className="w-[120px] absolute right-4 top-348 -rotate-30" src={patinha}/>

            <span className=" relative justify-center  items-end w-[70%] h-[20vh] left-4 top-100">
                <p className="text-[20px] font-semibold">Venha conhecer nossos serviços e veja como é fácil<br/> agendar</p>
                <p className="text-[18px] font-medium mt-[8px]">Faça uma simulação!</p>
            </span>

            <div className="relative justify-center items-end w-[70%] h-[20vh] left-4 top-100">
                <select
                    className="w-full p-3 border border-gray-300 rounded-lg outline-none"
                    value={selectedWeight}
                    onChange={(e) => setSelectedWeight(e.target.value)}
                >
                    <option value="" disabled>
                        Selecione o porte do seu pet
                    </option>

                    {weight.map((item) => (
                        <option key={item.value} value={item.value}>
                            {item.label}
                        </option>
                    ))}
                </select>

                <div className="  mt-[32px] border-2 border-dashed rounded-[24px] border-gray-300 h-[56vh] w-[90vw]">
                    <p className="relative p-4 font-semibold text-[22px]" >{selectedWeight === "" ? "Aguardando..." : "Sumário de Preços"}</p>
                    
                    <div className=' p-4 grid grid-cols-[210px_1fr]'>
                        <span className="text-[22px]">
                            {[
                                { name: "Banho", key: "banho" },
                                { name: "Tosa", key: "tosa" },
                                { name: "Hidratação", key: "hidratacao" },
                                { name: "Transporte", key: "transporte" },
                            ].map((service) => (
                                <div key={service.key} className="mb-4">
                                    <p className="font-bold">{service.name}</p>
                                    <p>
                                        {selectedPrices
                                            ? `${selectedPrices[service.key as keyof typeof selectedPrices].time} min`
                                            : "--- min"}
                                    </p>
                                </div>
                            ))}
                        </span>
                        
                        <span>
                            {[
                                "banho",
                                "tosa",
                                "hidratacao",
                                "transporte",
                            ].map((service) => (
                                <div key={service} className="mb-12 mt-2 h-[40px] w-full">
                                    <div className="font-semibold rounded-[20px] text-[22px] size-full flex items-center justify-center text-center bg-[#c395ff] text-[#8A38F5]">
                                        R$ {selectedPrices
                                            ? selectedPrices[service as keyof typeof selectedPrices].price.toFixed(2).replace(".", ",")
                                            : "--,--"}  {/*
                                        // Busco o preço do serviço selecionado, formato o valor com duas casas decimais
                                        // e substituo o ponto por vírgula para seguir o padrão monetário brasileiro. */}
                                    </div>
                                </div>
                            ))}
                        </span>
                </div>
            </div>
            </div>

            <img className="w-[120px] absolute left-4 top-480 rotate-30" src={patinha}/>

            
            {/* Botão de agendamento */}
            <div className="w-full flex justify-center mt-200 mb-8">
                <button
                    disabled={!selectedWeight}
                    onClick={openScheduling}
                    className={`rounded-[10px] font-bold p-3 min-w-[160px]
                        ${
                            !selectedWeight
                                ? "border-dashed border-2 bg-white"
                                : "text-white bg-[#8A38F5] shadow-md"
                        }`}
                >
                    {!selectedWeight
                        ? "Aguardando..."
                        : "Continuar Agendamento"}
                </button>
            </div>

            {/* Rodapé */}
            <div className="w-full min-h-[12vh] bg-[#8A38F5] mt-auto">
                
            </div>

            
            {showScheduling && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                
                    <div className="relative bg-white w-full max-w-md min-h-[580px] max-h-[90vh] rounded-xl p-5 flex flex-col">
            
                        {/* Fechar modal */}
                        <button
                            onClick={() => setShowScheduling(false)}
                            className="absolute right-5 top-5 text-2xl text-[#25253D]"
                        >
                            ×
                        </button>
            
                        {/* Cabeçalho */}
                        <h2 className="text-2xl font-bold text-[#25253D] mb-3">
                            Agendar<br />Atendimento
                        </h2>
            
                        <p className="text-xs mb-5">
                            Porte selecionado:{" "}
                            <strong>
                                {weight.find(item => item.value === selectedWeight)?.label}
                            </strong>
                            <span className="text-green-500 ml-2">✓</span>
                        </p>
            
                        {/* Progresso */}
                        <div className="flex items-center justify-between mb-6">
                            {[1, 2, 3, 4].map((step) => (
                                <div
                                    key={step}
                                    className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm
                                        ${currentStep >= step
                                            ? "bg-green-400 text-white"
                                            : "bg-gray-300 text-white"
                                        }`}
                                >
                                    {currentStep > step ? "✓" : step}
                                </div>
                            ))}
                        </div>
                        
                        {/* CONTEÚDO DAS ETAPAS */}
                        <div className="flex-1 overflow-y-auto">
                        
                            {/* ETAPA 1 - SERVIÇOS */}
                            {currentStep === 1 && (
                                <div className="border-2 border-gray-300 rounded-lg p-3">
                                
                                    {services.map((service) => {
                                        const price = selectedPrices?.[
                                            service.key as keyof typeof selectedPrices
                                        ];
                                    
                                        return (
                                            <label
                                                key={service.key}
                                                className="flex items-center justify-between border-b border-gray-300 py-4 last:border-0 cursor-pointer"
                                            >
                                                <div>
                                                    <p className="font-bold text-[#536071]">
                                                        {service.name}
                                                    </p>
                                        
                                                    <p className="text-xs text-gray-500">
                                                        {price?.time} min
                                                    </p>
                                                </div>
                                        
                                                <div className="flex items-center gap-2">
                                                    <span className="text-sm">
                                                        R$ {price?.price.toFixed(2).replace(".", ",")}
                                                    </span>
                                        
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedServices.includes(service.key)}
                                                        onChange={() => toggleService(service.key)}
                                                        className="accent-[#9238F5] w-4 h-4"
                                                    />
                                                </div>
                                            </label>
                                        );
                                    })}

                                    <p className="text-sm font-bold text-[#8A38F5] mt-4">
                                        Total: R$ {totalPrice.toFixed(2).replace(".", ",")}
                                    </p>
                                </div>
                            )}

                            {/* ETAPA 2 - NOME DO PET */}
                            {currentStep === 2 && (
                                <div>
                                    <label className="block font-semibold mb-2">
                                        Qual é o nome do seu pet?
                                    </label>
                            
                                    <input
                                        type="text"
                                        value={petName}
                                        onChange={(e) => setPetName(e.target.value)}
                                        placeholder="Digite o nome do seu pet"
                                        className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:border-purple-500"
                                    />
                                </div>
                            )}

                            {/* ETAPA 3 - DATA */}
                            {currentStep === 3 && (
                                <div>
                                    <label className="block font-semibold mb-2">
                                        Escolha a data do atendimento
                                    </label>
                            
                                    <input
                                        type="date"
                                        value={appointmentDate}
                                        onChange={(e) => setAppointmentDate(e.target.value)}
                                        min={new Date().toISOString().split("T")[0]}
                                        className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:border-purple-500"
                                    />
                                </div>
                            )}

                            {/* ETAPA 4 - RESUMO */}
                            {currentStep === 4 && (
                                <div className="border border-gray-300 rounded-lg p-4 space-y-3">
                                    <h3 className="font-bold text-lg">
                                        Resumo do agendamento
                                    </h3>
                            
                                    <p>Pet: <strong>{petName}</strong></p>
                            
                                    <p>
                                        Porte: <strong>{weight.find(item => item.value === selectedWeight)?.label}</strong>
                                    </p>
                            
                                    <p>
                                        Data: <strong>{appointmentDate}</strong>
                                    </p>
                            
                                    <div>
                                        <p className="font-semibold">Serviços:</p>
                                        {selectedServices.map(service => (
                                            <p key={service}>
                                                {services.find(item => item.key === service)?.name}
                                            </p>
                                        ))}
                                    </div>
                                    
                                    <p className="text-[#8A38F5] font-bold text-lg">
                                        Total: R$ {totalPrice.toFixed(2).replace(".", ",")}
                                    </p>
                                </div>
                            )}

                        </div>
                        
                        <div className="flex gap-3 mt-6">
                        
                            <button
                                type="button"
                                onClick={previousStep}
                                disabled={currentStep === 1}
                                className="flex-1 border-2 border-[#536071] rounded-lg p-3 font-bold disabled:opacity-40"
                            >
                                Voltar
                            </button>
                        
                            <button
                                type="button"
                                onClick={currentStep === 4 ? goToPayment : nextStep}
                                className="flex-1 bg-[#9238F5] text-white rounded-lg p-3 font-bold"
                            >
                                {currentStep === 4 ? "Ir para pagamento" : "Avançar"}
                            </button>
                        
                        </div>
                        
                    </div>
                </div>
            )}

        </main>
    );
}