import React, { Component } from 'react';

class HeaderComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }
    
    render() {
        return (
            <div>
                <header>
                    <nav>
                        <div><a href="http://localhost:3000" className="navbar-brand">고객 상담</a></div>
                    </nav>
                </header>
            </div>
        );
    }
}

export default HeaderComponent;