import React,{Component} from 'react';
import {Card,CardImg,CardTitle,CardBody,CardText} from 'reactstrap';
class Dish extends Component{
    constructor(props){
        super(props);
        this.state={

        };
    }

    renderComments(comments){
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

    render()
    {   
        if(this.props.dish!=null){
            return(
                <div className='container'>
                    <div className='row'>
                        <div className='col-12 col-md-5 m-1'>
                            <Card>
                                <CardImg width='100%' src={this.props.dish.image} alt={this.props.dish.name} />
                                <CardBody>
                                    <CardTitle>{this.props.dish.name}</CardTitle>
                                    <CardText>{this.props.dish.description}</CardText>
                                </CardBody>
                            </Card>
                        </div>
                        <div className="col-12 col-md-5 m-1">
                            <h4>Comments</h4>
                            {this.renderComments(this.props.dish.comments)}
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
}

export default Dish;