import * as React from "react";
import { connect } from 'react-redux';

import * as classnames from 'classnames';
import {bindActionCreators} from "redux";
import jobActionCreator from "../../actions/jobActionCreator";


interface Props {
    jobLanguage: string,
    languageChanged: (language: string) => void,
}

class Language extends React.Component<Props, any> {
    constructor(props) {
        super(props);
    }

    render() {
        return <div className="row language">
            <div className={
                classnames(
                    'form-group',
                    'row',
                    'flex',
                    this.props.jobLanguage === 'none' ? 'has-warning' : null,
                )}>
                <div className="col-md-6 flex">
                    <label htmlFor="select-lang">Langue dans laquelle est écrite l'offre : </label>
                </div>
                <div className="col-md-4">
                    <select name="select-lang"
                            id="select-lang"
                            className="form-control"
                            ref="selectlang"
                            onChange={ event => this.props.languageChanged(event.target.value) }
                    >
                        <option value="none">Sélectionne une langue</option>
                        <option value="fr">Francais</option>
                        <option value="en">Anglais</option>
                        <option value="other">Autre</option>
                    </select>
                </div>
            </div>
        </div>
    }
}

const mapStateToProps = state => ({
    jobLanguage: state.jobReducer.language,
});

const mapDispatchToProps = dispatch => ({
    languageChanged: bindActionCreators(jobActionCreator.languageChanged, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Language);