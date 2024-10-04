import ProgressBar from "./ProgressBar";
import TickIcon from "./TickIcon";
import Modal from "./Modal";
import { useState } from "react";

const ListItem = ({task, getData}) => {
    const [showModal, setShowModal] = useState(false);
    
    const handleDelete = async () => {
        try {
            const resposne = await fetch(`${process.env.REACT_APP_SERVER_URL}/todos/${task.id}`, {
                method: 'DELETE',
            });
            if(resposne.status === 200)
            {
                getData();
            }
            
        }
        catch(err) {
            console.error(err);
        }
    };

    return (
        <div className="list-item">
            <div className="info-container">
                <TickIcon />
                <p className="taks-title">{task.title}</p>
                <ProgressBar progress={task.progress}/>
            </div>
            <div className="button-container">
                <button className="edit" onClick={() => {setShowModal(true)}}>Edit</button>
                <button className="delete" onClick={handleDelete}>Delete</button>
            </div>
            {showModal && <Modal mode={'edit'} setShowModal={setShowModal} task={task} getData={getData}/>}
        </div>
    );
}

export default ListItem;