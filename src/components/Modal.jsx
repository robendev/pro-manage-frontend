const Modal = ({ children, onClose }) => {
    return (
        <div className="fixed inset-0
                        flex justify-center items-center
                        bg-black/50 z-10">
            <div className="w-full max-w-80">
                <button onClick={onClose} className="absolute
                                                     top-4 right-4
                                                     bg-gradient-to-tr from-gray-600 to-gray-800
                                                     text-white text-xs
                                                     px-3 py-2
                                                     rounded-lg hover:rounded-3xl
                                                     transition-all duration-300 ease-linear">
                    <i className="fa-solid fa-xmark"></i>
                </button>
                {children}
            </div>
        </div>
    )
}

export default Modal