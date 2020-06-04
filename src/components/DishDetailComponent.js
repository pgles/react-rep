import React from 'react';
import {Card,CardImg,CardTitle,CardBody,CardText} from 'reactstrap';

const RenderComments = ({comments})=>{
    const commentArray=comments.map((comment)=>{
        return(
            <div key={comment.id} className='mb-1 mt-1'>
                <div className='li'>
                    <p>
                        {comment.comment}
                    </p>
                    <p>
                        -- {comment.author} , {new Intl.DateTimeFormat('en-US',{year:'numeric',month:'short',day:'2-digit'}).format(new Date(Date.parse(comment.date)))};
                    </p>
                </div>
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
        if(props.dish!=null){
            return(
                <div className='container'>
                    <div className='row'>
                        <div className='col-12 col-md-5 m-1'>
                            <RenderDish dish={props.dish} />
                        </div>
                        <div className="col-12 col-md-5 m-1">
                            <h4>Comments</h4>
                            <RenderComments comments={props.dish.comments}/>
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