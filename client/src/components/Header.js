import React, {Component} from 'react'; 
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';

class Header extends Component {
    renderContent(){
      switch(this.props.auth){
          case null: 
            return null;
          case false: 
            return (<li><a href="/auth/google">Login with google</a></li>);
          default:
            return (<li><a href="/api/logout">Logout</a></li>);
      }
    }

    homePageRoute(){
        return this.props.auth ? '/surveys' : '/';
    }


    render() {
        return (
        <nav>
            <div className="nav-wrapper">
                <Link to={ this.homePageRoute() }  className="left brand-logo">
                  Emaily
                </Link>
                <ul className="right">
                    {this.renderContent()}
                </ul>
            </div>
        </nav>
        );
    }
}

function mapStateToProps(state){
    return { auth: state.auth };
}

export default connect(mapStateToProps)(Header); 