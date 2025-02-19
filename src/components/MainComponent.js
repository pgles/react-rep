import React,{Component} from 'react'; 
import Menu from './MenuComponents';
import Dish from './DishDetailComponent.js'
import Home from './HomeComponent.js';
import Header from './HeaderComponent.js';
import Footer from './FooterComponent.js'
import Contact from './ContactComponent.js';
import About from './AboutComponent.js';
import {Switch,Route,Redirect,withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {postComment,fetchDishes,fetchComments,fetchPromos,fetchLeaders,postFeedback} from '../redux/ActionCreators.js';
import {actions} from 'react-redux-form';
import {TransitionGroup,CSSTransition} from 'react-transition-group';

const mapStateToProps = (state) => {
  return {
    dishes:state.dishes,
    comments:state.comments,
    promotions:state.promotions,
    leaders:state.leaders
  };
};

const mapDispatchToProps = (dispatch) => ({
  postComment : (dishId,rating,author,comment) => dispatch(postComment(dishId,rating,author,comment)),
  fetchDishes : () => {dispatch(fetchDishes())},
  fetchComments : () => {dispatch(fetchComments())},
  fetchPromos : () => {dispatch(fetchPromos())},
  fetchLeaders : () => {dispatch(fetchLeaders())},
  resetFeedbackForm : () => {dispatch(actions.reset('feedback'))},
  postFeedback : (firstname,lastname,telnum,email,agree,controlType,message) => dispatch(postFeedback(firstname,lastname,telnum,email,agree,controlType,message))
});
class Main extends Component{
  constructor(props)
  {
    super(props);
  }

  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeaders();
  }
  render(){
      const HomePage = () =>{ 
          return(
              <Home dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
              dishesLoading = {this.props.dishes.isLoading}
              dishesErrMess = {this.props.dishes.errMess}
              promotion={this.props.promotions.promotions.filter((promotion) => promotion.featured)[0]}
              promoLoading = {this.props.promotions.isLoading}
              promoErrMess = {this.props.promotions.errMess}
              leader={this.props.leaders.leaders.filter((leader) => leader.featured)[0]}
              leaderLoading = {this.props.leaders.isLoading}
              leaderErrMess = {this.props.leaders.errMess}
              />
          );
      }

      const DishWithId = ({match})=>{
        return(
          <Dish dish={this.props.dishes.dishes.filter((dish)=> dish.id === parseInt(match.params.dishId,10))[0]} 
              isLoading = {this.props.dishes.isLoading}
              errMess = {this.props.dishes.errMess}
              errMess = {this.props.comments.errMess}
            comments={this.props.comments.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))}
            postComment = {this.props.postComment}
          />
        );
      }
    return (
         <div>
            <Header />
              <TransitionGroup>
                  <CSSTransition key={this.props.location.key} classNames='page' timeout={300}>
                    <Switch>
                        <Route path='/home' component={HomePage} />
                        <Route exact path='/menu' component={()=> <Menu dishes={this.props.dishes} postFeedback={this.props.postFeedback}/>} />
                        <Route path='/menu/:dishId' component={DishWithId} />
                        <Route exact path='/contactus' component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm} postFeedback={this.props.postFeedback}/>}/>
                        <Route exact path='/aboutus' component={()=> <About leaders={this.props.leaders.leaders} isLoading = {this.props.leaders.isLoading} errMess = {this.props.leaders.errMess}/>} />
                        <Redirect to='/home' /> 
                    </Switch>
                  </CSSTransition>
                </TransitionGroup>
            <Footer />
        </div>
    );
  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Main));
