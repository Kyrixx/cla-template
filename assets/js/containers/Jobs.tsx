import * as React from 'react';
import { connect } from 'react-redux';

import * as R from 'ramda';
import * as classnames from 'classnames';

import { bindActionCreators } from "redux";
import jobActionCreator from '../actions/jobActionCreator'
import domainActionCreator from "../actions/domainActionCreator";

import Content from './Jobs/Content'
import Domain from './Jobs/Domain'
import { DomainList, JobTrainingSetInterface } from '../index.d'
import {Job} from 'wizbii';
import Validation from "./Jobs/Validation";
import Language from "./Jobs/Language";
import Modal from "./Commons/Modal";


interface Props {
    jobs: Job[],
    domains: DomainList,
    nbJobClassified: number,
    domainSelected: string,
    jobList: () => void,
    domainList: () => void,
    validateJob: (data: JobTrainingSetInterface) => void,
    languageChanged: (language: string) => void
    jobLanguage: string
}

class Jobs extends React.Component<Props, any> {
    constructor(props) {
        super(props);
        this.displayJob = this.displayJob.bind(this);
        this.displayAllDomains = this.displayAllDomains.bind(this);
    }

    componentDidMount() {
        this.props.jobList();
        this.props.domainList();
    }

    displayJob(nb: number): JSX.Element {
        return this.props.jobs[nb] ? <Content job={this.props.jobs[nb]} key={nb}/> : null;
    }

    // Décomposer les domaines et faire de plus petits composants
    displayAllDomains() : JSX.Element[] {
        let output: JSX.Element[] = [];
        let i: number = 0;
        R.forEach(domain => {
            output.push(<Domain domain={domain} subdomains={this.props.domains[domain]} id={i} key={i} />);
            i += 1;
        },
        R.keys(this.props.domains));
        return output;
    }

    render() {
        if(this.props.nbJobClassified < 5)  {
            return <div className="col-12">
                <div className="ibox">
                    <div className="ibox-header">
                        <Validation />
                    </div>
                    <div className="ibox-content">
                        <Modal/>
                        <div className="row">
                            <div className="col-md-6">
                                {this.displayJob(this.props.nbJobClassified)}
                            </div>
                            <div className="col-md-6">
                                <Language />
                                <div className="row domains">
                                    {this.displayAllDomains()}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="ibox-footer">
                        <Validation/>
                    </div>
                </div>
            </div>
        }
        else {
            return <div className="col-12">
                <div className="ibox">
                    <div className="ibox-title">
                        <p>Job Classification - Wizbii</p>
                    </div>
                    <div className="ibox-content">
                        <div className="row">
                           <p>Merci d'avoir classé les 5 jobs ! A demain !</p>
                        </div>
                    </div>
                </div>
            </div>
        }

    }

}

const mapStateToProps = state => ({
    jobs: state.jobReducer.jobs,
    domains: state.domainsReducer.domains,
    domainSelected: state.domainsReducer.domainClicked,
    nbJobClassified: state.jobReducer.nbJobClassified,
    jobLanguage: state.jobReducer.language,
});

const mapDispatchToProps = dispatch => ({
    jobList: bindActionCreators(jobActionCreator.fetchJobs, dispatch),
    domainList: bindActionCreators(domainActionCreator.fetchDomains, dispatch),
    validateJob: bindActionCreators(jobActionCreator.validateJob, dispatch),
    languageChanged: bindActionCreators(jobActionCreator.languageChanged, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Jobs);