import { useState } from "react";

const CollaboratorCard = ({ collaborator }) => {
    const [showEmail, setShowEmail] = useState(false);
    return (
        <div className="p-2
                        flex flex-col justify-between
                        space-y-1 
                        bg-gradient-to-tr from-gray-100 to-gray-200 
                        shadow-md shadow-gray-400 rounded-lg 
                        w-56 h-14
                        hover:from-white hover:to-gray-100"
             onMouseEnter={() => setShowEmail(true)}
             onMouseLeave={() => setShowEmail(false)}>
            <p className="text-xs text-gray-400 font-bold"><i className="fas fa-hashtag"></i>{collaborator._id}</p>
            {
                showEmail ? 
                (<p className="text-xs text-gray-500">{collaborator.email}</p>) : 
                (<p className="font-bold">{collaborator.username}</p>)
            }
        </div>
    )
}

export default CollaboratorCard;