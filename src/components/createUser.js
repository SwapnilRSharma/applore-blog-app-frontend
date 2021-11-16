import axios from 'axios';
import React, { useState , useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


function CreateForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("")
    const user = useSelector((state) => state.user);
    const [loading, setLoading] = useState(false);
    let navigate = useNavigate();
    // useEffect(()=>{
    //     !localStorage.getItem('user')  && navigate('/login')
    //   },[])
      
    async function handleSubmit(e){
        e.preventDefault();
        if(name == "" || email == "" || password == ""){
            setError("Invalid data!")
        }else{
            setLoading(true)
        const data = {
            name: name,
            email: email,
            password: password
        };
        const headers = {
            Authorization: "Bearer " + user.user.token
        }
        const response = await axios
            .post(`http://localhost:5000/admin/user`, data , { headers } )
            .then((response) => {
                setLoading(false)
                alert('User Added.')
                setName("")
                setEmail("")
                setPassword("")
            })
            .catch((err) => {
                console.log("Err: ", err);
                alert(err.message)
            });

        }
        
    }

    return (  
        <div>
            { error != "" ? <h5>{error}</h5> : null }
            <form >
  <div class="mb-3">
    <label for="name" className={"form-label"} style={{fontSize : '16px' , fontWeight : '400'}}>Name</label>
    <input type="text" className={"form-control"} id="title" value={name} onChange={(e) => setName(e.target.value)} />
  </div>
  <div class="mb-3">
    <label for="email" class="form-label" style={{fontSize : '16px' , fontWeight : '400', marginTop:'12px'}}>Email</label>
    <input type="email"  className={"form-control"} id="description" value={email} onChange={(e)=> setEmail(e.target.value)}/>
  </div>
  <div class="mb-3">
    <label for="password" className={"form-label"} style={{fontSize : '16px' , fontWeight : '400'}}>Password</label>
    <input type="password" className={"form-control"} id="category" value={password} onChange={(e) => setPassword(e.target.value)}/>
  </div>

  <button style={{marginTop : '16px'}} type="submit" className={"btn btn-primary"} onClick={(e)=> handleSubmit(e)}>Submit</button>
</form>
        </div>
    );
}

export default CreateForm;