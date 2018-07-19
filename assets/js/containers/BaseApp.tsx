import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";

import PageHeader from './Commons/PageHeader'


interface Props {

}

class BaseApp extends React.Component<Props, any> {

    render() {
        return (
            <div id="wrapper">

                <div id="page-wrapper" className="gray-bg" style={{paddingBottom: 50}}>

                    <div>
                        { this.props.children }
                    </div>

                </div>
            </div>
        );
    }

}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(BaseApp);
