import axios from 'axios';
import React, { useState , useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


function CreateForm() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const user = useSelector((state) => state.user);
    const [loading, setLoading] = useState(false);
    let navigate = useNavigate();
    // useEffect(()=>{
    //     !localStorage.getItem('user')  && navigate('/login')
    //   },[])
      
    async function handleSubmit(e){
        e.preventDefault();
        setLoading(true)
        const data = {
            title: title,
            description: description,
            category: category
        };
        const headers = {
            Authorization: "Bearer " + user.user.token
        }
        const response = await axios
            .post(`http://localhost:5000/user/submit-blog`, data , { headers } )
            .then((response) => {
                setLoading(false)
                alert('Blog Submitted.')
                setTitle("")
                setDescription("")
                setCategory("")
            })
            .catch((err) => {
                console.log("Err: ", err);
            });

    }

    return (  
        <div>
            <form >
  <div class="mb-3">
    <label for="title" className={"form-label"} style={{fontSize : '16px' , fontWeight : '400'}}>Title</label>
    <input type="text" className={"form-control"} id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
  </div>
  <div class="mb-3">
    <label for="description" class="form-label" style={{fontSize : '16px' , fontWeight : '400', marginTop:'12px'}}>Description</label>
    <textarea  className={"form-control"} id="description" value={description} onChange={(e)=> setDescription(e.target.value)}/>
  </div>
  <div class="mb-3">
    <label for="category" className={"form-label"} style={{fontSize : '16px' , fontWeight : '400'}}>Category</label>
    <input type="text" className={"form-control"} id="category" value={category} onChange={(e) => setCategory(e.target.value)}/>
  </div>

  <button style={{marginTop : '16px'}} type="submit" className={"btn btn-primary"} onClick={(e)=> handleSubmit(e)}>Submit</button>
</form>
        </div>
    );
}

export default CreateForm;