import React from 'react';
import { Redirect } from 'react-router-dom';
import PageTop from '../../components/page-top/page-top.component';
import authService from '../../services/auth.service';

class HomePage extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            redirectTo: null
        }
    }   

    componentDidMount(){
        let userData = authService.getLoggedUser();
        if(!userData){
            this.setState({redirectTo : "/login"})
        }
    }

    render() {
        if(this.state.redirectTo){
            return(
                <Redirect to={this.state.redirectTo}/>
            )
        }
        return (
            <div className="container">
                <PageTop title={"Home"} desc={"Página inicial do sistema."}/>
            </div>
        )
    }

}

export default HomePage;