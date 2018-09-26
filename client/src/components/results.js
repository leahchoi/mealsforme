import React, { Component } from 'react';
import '../assets/css/results.css'
import axios from 'axios';
import OneResult from './individual_result_panel';
import { connect } from 'react-redux';
import { formatPostData, formatQueryString } from '../helpers';
import { searchedRecipe, setDetailsOfItem, setDetailsId, setPageNo } from '../actions';
import backButton from '../assets/images/back_arrow.png';
import '../../node_modules/font-awesome/css/font-awesome.min.css';
const BASE_URL = 'http://localhost:8000/server/getData.php';

class Results extends Component {
    constructor(props) {
        super(props);
        this.state = {
            resultArray: '',
        };
        this.handleOnScroll = this.handleOnScroll.bind(this);
    }

    componentDidMount() {
        let pageNo = this.props.page.page;
        console.log('pageNo:', pageNo);
        this.props.searchedRecipe(this.props.userInputs, pageNo);
        this.props.setPageNo(pageNo);
        window.addEventListener('scroll', this.handleOnScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleOnScroll);
    }

    goBack() {
        this.props.history.goBack();
    }
    handleOnScroll() {
        let scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
        let scrollHeight = (document.documentElement && document.documentElement.scrollHeight) || document.body.scrollHeight;
        let clientHeight = document.documentElement.clientHeight + 1 || window.innerHeight + 1; // changed client height to + 1
        let scrolledToBottom = (parseInt(scrollTop + clientHeight)) >= scrollHeight;
        console.log('log:', scrolledToBottom);
        if (scrolledToBottom) {
            let pageNo = this.props.page.page;
            console.log('pageNo:', pageNo);
            this.props.searchedRecipe(this.props.userInputs, pageNo);
            this.props.setPageNo(pageNo);
            scrolledToBottom = false;
        }
    }
    render() {
        const { searchedIngredients } = this.props;
        console.log('page:', this.props.page.page);
        let resultArray = '';
        if(!this.props.userInputs.length){
            return <div className='goback'>
                <h5>No Search Available</h5>
                <button onClick={this.goBack.bind(this)} className='backBtn'>
                    <img src={backButton} className='btn btn-small' />
                </button>
                Go Back
                </div>
        }
        //When loading,
        if (searchedIngredients.length <= 0) {
            return (
                <div className='loading-spinner'><i className="fa fa-spinner fa-pulse fa-3x fa-fw"></i><span className="sr-only">Loading...</span></div>
            );
        // when valid search,
        } else if (typeof (searchedIngredients[0]) === 'object') {
            resultArray = searchedIngredients.map((ele, index) => {
                return (
                    <OneResult key={ele.ID} id={ele.ID} title={ele.Name} details={ele} likes={ele.likes} imageSrc={ele.Image} />
                );
            });
        }
        return (
            <div className= 'main-content mainPage'>
                <h5 className='resultHeader'>Results for: {this.props.userInputs.join(", ")}</h5>
            <div className= 'main-content'>
                    {
                        resultArray
                    }      
            </div>
                <div className={`btn btn-floating red ${document.documentElement.scrollTop > 0 ? 'goToTop' : 'hideGoToTop'}`}
                     onClick={()=> window.scrollTo(0, 0)}>
                    <i className='material-icons'>keyboard_arrow_up</i>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        userInputs: state.search.ingredients,
        searchedIngredients: state.search.searched_recipe,
        page: state.page
    }
}

export default connect(mapStateToProps, { searchedRecipe , setDetailsOfItem , setDetailsId, setPageNo })(Results);