import manDog from "../../assets/man-dog.png"
import patinha from "../../assets/Patinha.png"
import cachorroMolhado from "../../assets/cachorro-molhado.png"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { supabase } from "../../lib/supabase"

export default function Home() {

    const [selectedWeight, setSelectedWeight] = useState("")
    
    const [showScheduling, setShowScheduling] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);
    
    const [selectedServices, setSelectedServices] = useState<string[]>([]);
    const [petName, setPetName] = useState("");
    const [appointmentDate, setAppointmentDate] = useState("");

    const navigate = useNavigate()

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
            
            <p className=" absolute text-[18px] top-142  left-4">Onde o seu melhor amigo recebe o<br/> cuidado que ele merece, com todo o <br/>amor e segurança.</p>

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

            <div className="w-full left-24 h-[42px] absolute top-510 ">
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

                
            

            <div className="absolute  top-530 h-[12vh] w-full bg-[#8A38F5]">

            </div>

        </main>
    );
}