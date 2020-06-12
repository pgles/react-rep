import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import {Card,CardImg,CardTitle,CardBody,CardText,Breadcrumb,BreadcrumbItem,Button,Modal,ModalBody,ModalHeader,Label,Row,Col} from 'reactstrap';
import { LocalForm, Control,Errors } from 'react-redux-form';
import {Loading} from './LoadingComponent.js';
import {baseUrl} from '../shared/baseUrl.js';
import {FadeTransform,Fade,Stagger} from 'react-animation-components';

const required = (value) => value && value.length;
const minLength = (len) => (value) => value && (value.length >= len)  
const maxLength = (len) => (value) => !(value) || (value.length <= len)
class CommentForm extends Component {
    constructor(props){
        super(props);
        this.state={
            isModalOpen:false
        };
        this.toggleModal=this.toggleModal.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
    }
    toggleModal = () =>{
        this.setState({isModalOpen:!this.state.isModalOpen})
    }
    handleSubmit = (values) => {
        this.toggleModal();
        this.props.postComment(this.props.dishId,values.rating,values.author,values.comment)
    }
        render(){
            return(
                <>
                    <Button outline onClick={this.toggleModal}>
                        <span class='fa fa-pencil fa-lg'></span> Submit Comment
                    </Button>
                    <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                        <ModalHeader toggle={this.toggleModal}>
                            Submit Comment
                        </ModalHeader>
                        <ModalBody>
                            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                                <Row className='form-group'>
                                    <Col md={2}>
                                    <Label htmlFor='rating'>Rating</Label>
                                    </Col>
                                    <Col md="12">
                                    <Control.select model='.rating' name='rating' className='control-select w-100'>
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                    </Col>
                                </Row>
                                <Row className='form-group'>
                                    <Col md={5}>
                                    <Label htmlFor='author'>Your Name</Label>
                                    </Col>
                                    <Col md={12}>
                                    <Control.text model='.author' id='author' name='author' placeholder='Your Name' className='form-control col-12'
                                    validators={{
                                        required,
                                        minLength:minLength(3),
                                        maxLength:maxLength(15)
                                    }}
                                    >
                                    </Control.text>
                                    <Errors className='text-danger'
                                    show="touched" model='.name'
                                    messages={{
                                        minLength:"Must be greater than 2 characters",
                                        maxLength:"Must be 15 characters or less"
                                    }}
                                    />
                                    </Col>
                                </Row>
                                <Row className='form-group'>
                                    <Label htmlFor='comment' md={2}>Comment</Label>
                                    <Col md={12}>
                                        <Control.textarea model='.comment' name='comment' id='comment' className='form-control' rows="6" />
                                    </Col>
                                </Row>
                                <Row className='form-group'>
                                    <Col md={10}>
                                        <Button type='submit' color='primary'>Submit</Button>
                                    </Col>
                                </Row>
                            </LocalForm>
                        </ModalBody>
                    </Modal>
                </>
            );
        }
    }
const RenderComments = ({comments,postComment,dishId})=>{
    const commentArray=comments.map((comment)=>{
        if(comment != null){
            return(
                <Fade in>
                    <div key={comment.id} className='mb-1 mt-1'>
                        
                            <li>
                                <p>
                                    {comment.comment}
                                </p>
                                <p>
                                    -- {comment.author} , {new Intl.DateTimeFormat('en-US',{year:'numeric',month:'short',day:'2-digit'}).format(new Date(Date.parse(comment.date)))}
                                </p>
                            </li>
                        
                    </div>
                </Fade>
            );
        }
        else{
            return (<div>

            </div>);
        }
    }
    );
    return(
        <div className='list-unstyled'>
            <Stagger in>
                {commentArray}
            </Stagger>
            <CommentForm dishId={dishId} postComment={postComment}/>
        </div>
    );
}
function RenderDish({dish})
{
    if(dish != null) {
        return(
            <FadeTransform in 
                transformProps={{
                    exitTransform:'scale(0.5) translateY(-50%)'
                }}>
                <Card>
                    <CardImg width='100%' src={baseUrl+dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{ dish.description}</CardText>
                    </CardBody>
                </Card>
            </FadeTransform>
        );
    }
    else {
        return (<div>

        </div>);
    }
}

function Dish(props){
        if (props.isLoading) {
            return (
                <div className='container'>
                    <div className='row'>
                        <Loading />
                    </div>
                </div>
            )
        }
        else if (props.errMess) {
            return (
                <div className='container'>
                    <div className='row'>
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            )
        }
        else if(props.dish!=null){
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
                                <RenderComments comments={props.comments} postComment={props.postComment}
                                dishId={props.dish.id}
                                />
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