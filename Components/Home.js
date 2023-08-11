import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import {toast} from 'react-toastify'
import axios from 'axios'
import './Home.css'
function Home() {
    const [data,setData] = useState([]);

    const localData = async()=>
    {
           const response = await axios.get("http://localhost:3333/api/get");
           setData(response.data);
    }

    useEffect(()=>
    {
        localData();
    })

    const deletecontact=(id)=>
    {
        if(window.confirm("Are you sure want to deleted"));
        axios.delete(`http://localhost:3333/api/remove/${id}`)
        toast.success("contact deleted sucessfully");
        setTimeout(()=>
        {
            localData();
        })
    }
      return (
    <div>
        <div style={{marginTop: '150px'}}>
        <Link to="/addedit">
            <button className='btn btn-contact'>Add Contact</button>
        </Link>
        <table className='styled-table'>
            <thead>
                <tr>
                    <th style={{textAlign: 'center'}}>No.</th>
                    <th style={{textAlign: 'center'}}>Name</th>
                    <th style={{textAlign: 'center'}}>Email</th>
                    <th style={{textAlign: 'center'}}>Phone Number</th>
                    <th style={{textAlign: 'center'}}>Action</th>
                </tr>
            </thead>
            <tbody>
                {
                    data.map((item,index)=>{
                        return (
                            <tr key={item.id}>
                                <td>{index+1}</td>
                                <td>{item.name}</td>
                                <td>{item.email}</td>
                                <td>{item.mobile}</td>
                                <td>
                                    <Link to={`/update/${item.id}`}>
                                        <button className='btn btn-edit'>Edit</button>
                                    </Link>
                                    <button className='btn btn-delete' onClick={()=>{deletecontact(item.id)}}>Delete</button>
                                    <Link to={`/view/${item.id}`}>
                                        <button className='btn btn-view'>View</button>
                                    </Link>
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    </div>
    </div>
  )
}

export default Home