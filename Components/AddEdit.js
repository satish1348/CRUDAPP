import React,{useState,useEffect} from 'react'
import './AddEdit.css'
import { Link,useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'

const intialstate = {
    name:"",
    email:"",
    mobile:""
}

function AddEdit() {
    const [state,setState] = useState(intialstate);
    const {name,email,mobile} = state;
    const navigate = useNavigate();
    
    const {id} = useParams();

    useEffect(()=>{
        axios.get(`http://localhost:3333/api/get/${id}`)
        .then((resp)=>{
            setState({...resp.data[0]})
        })
    },[id])

const handleSubmit=(e)=>{
    e.preventDefault();
    if(!name || !email|| !mobile){
        toast.error("Please provide value into each field");
    }
    else{
        if(!id){
        axios.post("http://localhost:3333/api/post",{name,email,mobile})
        .then(()=>{
            setState({name:"",email:"",mobile:""});
        })
        .catch((err)=>{
            toast.error(err.response.data);
        })
        toast.success("contact added Successfully");
        setTimeout(()=>{
            navigate('/');
        },500)
    }
    
      else{
        axios.put(`http://localhost:3333/api/put/${id}`,{name,email,mobile})
        .then(()=>{
            setState({name:"",email:"",mobile:""});
        })
        .catch((err)=>toast.error(err.response.data));

        toast.success("contact updated Successfully");
        setTimeout(()=>{
            navigate('/');
        },500)
    }
}
}
    const handleInputChange = (e) =>
    {
        const {name,value} = e.target;
        setState({...state,[name]:value})
    }

    return (
    <div>
        <div style={{marginTop: '100px'}}>
        <form style={{
            margin: 'auto',
            padding: '15px',
            maxWidth: '400px',
            alignContent: 'center'
        }} onSubmit={handleSubmit}>
            <label htmlFor='name'>Name</label>
            <input type='text' id='name' name='name' placeholder='Your Name....' value={name || ""} onChange={handleInputChange}/>
            <label htmlFor='email'>Email</label>
            <input type='email' id='email' name='email' placeholder='Your Email....' value={email || ""} onChange={handleInputChange}/>
            <label htmlFor='contact'>Contact</label>
            <input type='text' id='contact' name='mobile' placeholder='Your Contact No....' value={mobile || ""} onChange={handleInputChange}/>
            <input type='submit' value={id? "Update" :"Save"} /><br></br>
            <Link to="/">
                <input type='button' value='Back' />
            </Link>
        </form>
    </div>
    </div>
  )
}

export default AddEdit