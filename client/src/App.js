import { useEffect, useState } from "react";
import ListHeader from "./components/ListHeader";
import ListItem from "./components/ListItem";
import Auth from "./components/Auth";
import { useCookies } from "react-cookie";


function App() {
  const [tasks, setTasks] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(null);

  const userEmail = cookies.Email;
  const authToken = cookies.AuthToken;

  const getData = async () => {
    try {
      const response  = await fetch(`${process.env.REACT_APP_SERVER_URL}/todos/${userEmail}`);
      const data = await response.json();
      setTasks(data);
    } catch (error){
      console.error(error);
    }

  };
  useEffect(() => {
    if(userEmail)
    {
      getData();
    }
    
  }, []);

  const sortedTasks = tasks?.sort((a,b) => new Date(a.date) - new Date(b.date));
 
  return (
    <div className="app">
      {!authToken ? <Auth /> :
        <>
        <p className="user-email">Welcome back, {userEmail}</p>
        <ListHeader listName={'Holiday Tick List'} getData={getData}/> 
        {sortedTasks?.map(task => 
          <ListItem key={tasks.id} task={task} getData={getData}/> 
        )}
        </>
      }
     
      
    </div>
  );
}

export default App;
