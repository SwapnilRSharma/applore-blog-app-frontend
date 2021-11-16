import React from 'react';
import { useSelector } from 'react-redux';
import bg from '../assets/bg.png'
import { Link } from "react-router-dom";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const Blog = () => {
    const blogs = useSelector((state) => state.allBlogs.blogs);

    const renderList = blogs.map((blog) => {
        const { id, title, desc, category } = blog;
        return (
            <div className="col-md-4">
                <Link to={`/blog/${id}`}>
                {/* <div className="card" style={{width:"18rem"}}>
                    <img className="card-img-top" src={bg} alt="Card image cap" />
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                    </div>
                </div> */}
                <Card sx={{ maxWidth: 345 }} style={{height : "270px"}}>
                     <CardMedia
                     component="img"
                     height="200"
                    image={bg}
       
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" style={{fontSize : '16px', textTransform : 'capitalize'}}>
        {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" style={{fontSize : '12px' , color : 'black'}}>
         {category}
        </Typography>
      </CardContent>
    
    </Card>
                </Link>
            </div>
        );
      });
      return <>{renderList}</>;
}

export default Blog