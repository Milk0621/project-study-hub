import { createContext, useContext, useState } from "react";
import Modal from "../components/Modal/Modal";

const ModalContext = createContext();

//Context를 직접 쓰지 않고 useModal()이라는 간편한 함수로 모달 상태를 가져올 수 있게 함
//const { openModal } = useModal()
export function useModal(){
    return useContext(ModalContext);
}

export function ModalProvider({children}){
    const [isModalOpen, setModalOpen] = useState(false);

    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    return(
        <ModalContext.Provider value={{isModalOpen, openModal, closeModal}}>
            {children}
            {isModalOpen && <Modal setModalOpen={setModalOpen} />}
        </ModalContext.Provider>
    )
}
