import { useState } from "react";

const Modal = ({mode, setShowModal, task, getData}) => {
    const editMode = mode === 'edit'? true: false;
    const [data, setData] = useState(task);
    const handleChange = (e) => {
        const {name, value} = e.target;
        setData(data => ({
            ...data,
            [name]: value,
        }));
    };

    const postData = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/todos`, {
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data),
            });

            if(response.status === 200)
            {
                console.log('Data writtedn to databse');
                setShowModal(false);
                getData();
            }
        } catch(err)
        {
            console.error(err);
        }
    };

    const editData = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/todos/${task.id}`, {
                method: "PUT",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data),
            });

            if(response.status === 200)
            {
                setShowModal(false);
                getData();
            }
        }
        catch(err) {
            console.error(err);
        }
    };

    return (
    <div className="overlay">
        <div className="modal">
            <div className="form-title-container">
                <h3>Let's {mode} your task</h3>
                <button onClick={() => {setShowModal(false)}}>X</button>
            </div>
            <form>
                <input
                    required
                    maxLength={30}
                    name="title"
                    placeholder="Your tak goes here" 
                    value={data.title}
                    onChange={handleChange}
                />
                <label for="#range">Drag to record your progress</label>
                <input
                    required
                    type="range"
                    min="0"
                    max="100"
                    name="progress"
                    id="range"
                    value={data.progress}
                    onChange={handleChange} 
                />
                <input className="submit" type="submit" onClick={editMode ? editData: postData}/>
            </form>
        </div>
        
    </div>
    );
}

export default Modal;