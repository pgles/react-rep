import React from 'react';
import {Link} from 'react-router-dom';
import {Card,CardImg,CardTitle,CardBody,CardText,Breadcrumb,BreadcrumbItem} from 'reactstrap';

const RenderComments = ({comments})=>{
    const commentArray=comments.map((comment)=>{
        return(
            <div key={comment.id} className='mb-1 mt-1'>
                <li>
                    <p>
                        {comment.comment}
                    </p>
                    <p>
                        -- {comment.author} , {new Intl.DateTimeFormat('en-US',{year:'numeric',month:'short',day:'2-digit'}).format(new Date(Date.parse(comment.date)))};
                    </p>
                </li>
            </div>
        );
    }
    );
    return(
        <div className='list-unstyled'>
            {commentArray}
        </div>
    );
}
function RenderDish({dish})
{
    return(
        <Card>
            <CardImg width='100%' src={dish.image} alt={dish.name} />
            <CardBody>
                <CardTitle>{dish.name}</CardTitle>
                <CardText>{ dish.description}</CardText>
            </CardBody>
        </Card>
    );
}
function Dish(props){
        console.log(props);
        if(props.dish!=null){
            return(
                <div className='container'>
                    <div className='row'>
                        <Breadcrumb>
                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <div className='col-12'>
                            <h3>{props.dish.name}</h3>
                            <hr />
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-12 col-md-5 m-1'>
                            <RenderDish dish={props.dish} />
                        </div>
                        
                            <div className="col-12 col-md-5 m-1">
                                <h4>Comments</h4>
                                <RenderComments comments={props.comments} />
                            </div>
                        
                    </div>
                </div>
            );
        }
        else{
            return (
                <div></div>
            );
        }
    }

export default Dish;