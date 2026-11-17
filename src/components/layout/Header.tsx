import { useNavigate } from "react-router-dom";


export function Header() {

    const navigate = useNavigate()
    return (
        <header className="z-[9999] h-[12vh]  w-full flex items-center justify-around gap-4">
            <h3 className="text-[42px] font-bold cursor-pointer text-[#8A38F5] font-sour mr-26"
            onClick={() => navigate("/")}
            >
                AUMIAU
            </h3>

            <button className="bg-white border border-black cursor-pointer rounded-full w-[40px] h-[40px]"
            onClick={() => navigate("/login")}
            >
                👤
            </button>
        </header>
    );
}
