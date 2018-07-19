import * as React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from "redux";
import jobActionCreator from "../../actions/jobActionCreator";
import { Job } from "wizbii";
import { DomainList, JobTrainingSetInterface } from '../../index.d'
import * as R from 'ramda'
import moment = require("moment");

// En Typescript, on est obligé de définir toutes les variables qui transitent.
interface Props {
    jobs: Job[],
    nbJobClassified: number,
    domains: DomainList,
    domainSelected: string,
    startTime: any,
    jobLanguage: string,
    validateJob: (data: JobTrainingSetInterface) => void,
}


class Validation extends React.Component<Props, any> {

    constructor(props) {
        super(props);

        this.onValidate = this.onValidate.bind(this);
    }

    // Permet de reformater les données du store sous un objet de type JobTrainingSetInterface
    onValidate(): JobTrainingSetInterface {

        // Syntaxe qui me permet, dans cette fonction, de me passer d'écrire this.props à chaque fois pour les variables
        const { domains, domainSelected, startTime } = this.props;

        // Utilisation de Ramda pour formater le nom de la category (tu t'en fous)
        const category: string = R.compose(
            R.keys,
            R.filter<any>(subdomains => R.contains(domainSelected, subdomains))
        )(domains)[0];

        const job = this.props.jobs[this.props.nbJobClassified];
        return {
            "id_job": job._id,
            "title": job.title,
            "profile": job.profile,
            "mission": job.mission,
            "description_company": job.description_company,
            "categorization_duration": moment.duration(moment().diff(startTime)).asSeconds(),
            "domaine": null,
            "language": this.props.jobLanguage,
            "niv1": null,
            "niv2": null,
            "niv3": null,
            "niv4": null,
            "Niveau1": category,
            "Niveau2": this.props.domainSelected,
        }

    }


    render() {
        return (
            <div className="row">
                <div className="col-xs-offset-3 col-xs-3 col-12 buttonValidate">
                    <button
                        className="btn btn-primary btn-block"
                        onClick={
                            () => {
                                this.props.validateJob(this.onValidate()); // Au clic sur le bouton, je fais appel à mon action
                            }
                        }
                    >Valider</button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    jobs: state.jobReducer.jobs,
    domains: state.domainsReducer.domains,
    domainSelected: state.domainsReducer.domainClicked,
    nbJobClassified: state.jobReducer.nbJobClassified,
    startTime: state.jobReducer.categorizationStartMoment,
    jobLanguage: state.jobReducer.language,
});

const mapDispatchToProps = dispatch => ({
    validateJob: bindActionCreators(jobActionCreator.validateJob, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Validation);