import React,{useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import { UserBox } from './components/UserBox';
import axios from '../src/utils/axios';


interface IUser {
  fullname: string;
  address: string;
  picture : string;
}

const  App : React.FC = () => {
  const [user, setUser] = useState<IUser>({} as IUser);
  const [loading, setLoading] = useState<Boolean>(false);

  const getUser = async () => {
    setLoading(true);
    const { data  } = await axios.get('/');
    setUser(fixResult(data));
    saveToLocalStorage(fixResult(data));

   
    setLoading(false);
  }

  useEffect(() => {
    const data = getFromLocalStorage();
    if(data){
      setUser(data);
    }else{
      getUser();
    }


  }, []);
  
  const handleClick = () => {
    getUser();
  }

  const getFromLocalStorage = () => {
    const user  = localStorage.getItem('user');
    if(user){
      return JSON.parse(user);
    }
    return null;
  }

  const saveToLocalStorage = (user: IUser) => {
    localStorage.setItem('user', JSON.stringify(user));
  }


  return (
    <div className="App">
      {loading ? <span >Loading...</span> 
      : <UserBox fullname={user.fullname} address={user.address} img={user.picture}/>}
      <button  onClick={handleClick} className='btn-refresh'>Refresh</button>
    </div>
  );
}

const fixResult = (data: any) => {
  const {name : {first,last} , location : {city,country,state,postcode,street : {number,name} },picture : {large}} = data.results[0];
  return {
    fullname: `${first} ${last}`,
    address: `${number} ${name}, ${city}, ${state}, ${country} ${postcode}`,
    picture: large
  }
}




export default App;
