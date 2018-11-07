import React, { Component } from 'react';
import '../assets/css/results.css'
import OneResult from './individual_result_panel';
import { connect } from 'react-redux';
import { searchedRecipe, setDetailsOfItem, setDetailsId, setPageNo, setInvalidSearch } from '../actions';
import backButton from '../assets/images/back_arrow.png';
import '../../node_modules/font-awesome/css/font-awesome.min.css';

class Results extends Component {
    constructor(props) {
        super(props);
        this.state = {
            resultArray: '',
            query: [],
            scrollToTop: ''
        };
        this.handleOnScroll = this.handleOnScroll.bind(this);
        this.params = [];
        this.dataToSend = [];
        this.callInProgress = false;
    }

    componentDidMount() {
       this.params = this.props.match.params;

       this.dataToSend = [];

        for(let key in this.params){
            let item = this.params[key];
            if(item !== undefined){
                this.dataToSend.push(this.params[key]);
            }
        }
        this.setState({
            query: this.dataToSend
        });

        let pageNo = this.props.page.page;
        this.props.searchedRecipe(this.dataToSend, pageNo);
        this.props.setPageNo(pageNo);
        window.addEventListener('scroll', this.handleOnScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleOnScroll);
        this.props.setInvalidSearch();
    }

    goBack() {
        this.props.history.goBack();
    }

    resultsValidGoBack(){
        this.props.setInvalidSearch(true);
        this.props.history.push('/');
    }
    handleOnScroll() {
        // let scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
        // let scrollHeight = (document.documentElement && document.documentElement.scrollHeight) || document.body.scrollHeight;
        // let clientHeight = document.documentElement.clientHeight || window.innerHeight; // changed client height to + 1
        // let scrolledToBottom = (parseInt(scrollTop + clientHeight)) >= scrollHeight;
        // if (scrolledToBottom) {
        //     let pageNo = this.props.page.page;
        //     console.log('page:', pageNo);
        //     const response = this.props.searchedRecipe(this.dataToSend, pageNo);
        //     console.log('response:', response);
        //     this.props.setPageNo(pageNo);
        //     scrolledToBottom = false;
        // }

        let scrollTop = document.documentElement.scrollTop;
        let clientHeight = document.documentElement.clientHeight;
        let scrollHeight = document.documentElement.scrollHeight;

        let scrollBottom = scrollHeight - (scrollTop + clientHeight);
        let scrolled = scrollBottom <= parseInt(clientHeight*.5);

        if(scrolled && !this.callInProgress){
            let pageNo = this.props.page.page;
            // if(!this.callInProgress){
                this.callInProgress = true;
                this.props.searchedRecipe(this.dataToSend, pageNo).then(()=>{
                    this.callInProgress = false;
                });
            // }
            this.props.setPageNo(pageNo);
        }
        if(document.documentElement.scrollTop > document.documentElement.clientHeight){
            this.setState({
                scrollToTop: 'goToTop'
            });
        } else {
            this.setState({
                scrollToTop: 'hideGoToTop'
            });
        }
    }
    render() {
        const { searchedIngredients } = this.props;
        let resultArray = '';
        if(this.props.match.url === '/results' || this.props.match.url === '/results/'){
            return <div className='goback'>
                <div className="invalid_null-search">Go to home page and enter ingredients to see recipe.</div>
                <div onClick={this.goBack.bind(this)} className='btn btn-small invalidGoBack'>
                    <i className="material-icons">arrow_back</i>
                </div>
                </div>
        } else if(this.props.searched_recipe_null && this.props.searchedIngredients.length === 0){
            var userInputs = this.state.query.join(", ");
            return (<div className='goback'>
                <h6 className="center-align">You searched for: <b>{userInputs}</b></h6>
                <h5 className="invalid_null-search">No recipe found.</h5>
                <div onClick={this.goBack.bind(this)} className='backBtn'>
                    <img src={backButton} className='btn btn-small' />
                </div>
            </div>)
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
                    <OneResult key={ele.ID} id={ele.ID} title={ele.Name} details={ele} likes={ele.likes} imageSrc={ele.Image}/>
                );
            });
        }
        return (
            <div className="resultsWholeContainer">
                <div className= 'mainPage'>
                    <h5 className='resultHeader'>Results for: {this.state.query.join(", ")}</h5>
                    <div className="btn btn-primary resultValidGoBack" onClick={()=>this.resultsValidGoBack()}>Go Back</div>
                    <div className= 'main-content center-align'>
                        {
                            resultArray
                        }
                    </div>
                    <div className={`btn btn-floating red ${this.state.scrollToTop}`}
                         onClick={()=> window.scrollTo(0, 0)}>
                        <i className='material-icons'>keyboard_arrow_up</i>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        userInputs: state.search.ingredients,
        searchedIngredients: state.search.searched_recipe,
        searched_recipe_null: state.search.searched_recipe_null,
        page: state.page,
    }
}

export default connect(mapStateToProps, { searchedRecipe , setDetailsOfItem , setDetailsId, setPageNo, setInvalidSearch })(Results);