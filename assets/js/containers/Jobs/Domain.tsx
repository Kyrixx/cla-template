import * as React from 'react'
import { connect } from 'react-redux';
import * as classnames from 'classnames'

import * as R from 'ramda'
import {bindActionCreators} from "redux";
import domainActionCreator from "../../actions/domainActionCreator";
import {max} from "moment";
import {Constants} from "../../utils/constants";

interface Props {
    domain: string,
    subdomains: string[],
    selectDomain : (domain: string) => void,
    domainSelected: string,
    id: number
}

class Domain extends React.Component<Props, any> {
    constructor(props) {
        super(props);

        this.displayDomain = this.displayDomain.bind(this);
        this.splitText = this.splitText.bind(this);
        this.domainBlockId = this.domainBlockId.bind(this);
    }
    splitText(text: string) {
        if(text.length < Constants.SubdomainMaxLength)
            return text;

        const words = text.split(' ');
        let output = [];
        let lineLength: number = 0;

        R.forEach(word => {
            if(lineLength + word.length < Constants.SubdomainMaxLength) {
                output.push(word + ' ');
                lineLength += word.length + 1;
            }

        else {
                output.push(<br key={word}/>);
                output.push(word + ' ');
                lineLength = word.length;
            }

        },words);

        return output;
    }

    displayDomain() : JSX.Element[] {
        let jsxElement: JSX.Element[] = [];

        R.forEach(subdomain => {
            jsxElement.push(
                <button key={subdomain} 
                        type="button" 
                        onClick={() => this.props.selectDomain(subdomain)}
                        className={classnames('btn', 'btn-xs', 'btn-primary', 'btn-outline', this.props.domainSelected === subdomain ? 'domainSelected' : '',
                                                subdomain.length < Constants.SubdomainMaxLength/2 ? 'smallText' : '')}>
                    {this.splitText(subdomain)}
                    </button>

             );
        },this.props.subdomains);

        return jsxElement;
    }

    domainBlockId() : string {
        const {id} = this.props;
        if(id < 3) return "4";
        if(id < 6) return "3";
        if(id < 9) return "2";
        return "1";
    }

    render() {
        return <div className={classnames("col-md-4", "col", "domainBlock-" + this.domainBlockId())}>
            <div className="row domainName" key={this.props.domain}>
                <p>{ this.props.domain }</p>
            </div>
            <div className="row">
                { this.displayDomain() }
            </div>
        </div>;
    }
}

const mapStateToProps = state => ({
    jobs: state.jobReducer.jobs,
    domains: state.domainsReducer.domains,
    domainSelected: state.domainsReducer.domainClicked,
});

const mapDispatchToProps = dispatch => ({
    selectDomain: bindActionCreators(domainActionCreator.selectDomain, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Domain);