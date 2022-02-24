import { BrowserRouter, useHistory } from 'react-router-dom';
import  AppLayout from './Layout/AppLayout';
import  Header  from  "./Layout//Partials/Header";
import  Sidebar  from  "./Layout//Partials/Sidebar";

function App(props) {
  
  const user = JSON.parse(localStorage.getItem('user'));
  const history = useHistory();

  if(user != null){
    return (
      <BrowserRouter history={history}>
           <Sidebar/>
          <div className="main">
            <Header/>
            <main className="content">
             <AppLayout/>
            </main>
          </div>  
      </BrowserRouter>
   );
  }else{
    return (
      <BrowserRouter>
          <AppLayout/>
      </BrowserRouter>
   );
  }
  
}

export default App;
