import { ActionCreator } from "redux";

import { Types } from './types'
import { createAndDispatch } from '../utils'
import {getJobs, putJob, putJobUnknown} from "../webservices/jobs";
import * as $ from 'jquery';
import {JobTrainingSetInterface, JobTrainingSetUnknownInterface} from "../index.d";

const fetchJobs: ActionCreator<void> = () => dispatch => {
    createAndDispatch(dispatch, Types.JobRequest)();

    getJobs()
        .then(response => response.data)
        .then(createAndDispatch(dispatch, Types.JobRequestSucceed))
        .catch(createAndDispatch(dispatch, Types.JobRequestFailed))
    ;
};

// validateJob est une fonction action de Redux, elle est de type ActionCreator<void> (void parce qu'elle ne renvoie rien).
// Tu remarques la variable 'dispatch', que je récupère de l'ActionCreator de Redux
const validateJob: ActionCreator<void> = (dataJobTrainingSet: JobTrainingSetInterface) => dispatch => {
    // Ici, je dispatch une action sans données. Ca me permet par exemple de mettre une variable de mon store 'loading' à
    // true, le temps que les appels serveurs se fassent
    createAndDispatch(dispatch, Types.JobSentToClassification)();

    if(dataJobTrainingSet.Niveau2 === '')
        createAndDispatch(dispatch, Types.DomainEmpty)();
    else {
        // putJob est un webservice qui envoie des données au serveur. C'est une evenement asynchrone.
        // Quand l'appel est terminé, je passe dans le then(). Si le serveur me renvoie une erreur, je passe dans le catch().
        putJob(dataJobTrainingSet)
            .then(() => {
                createAndDispatch(dispatch, Types.JobClassified)();
                $('#select-lang').val('none');
            })
            .catch(createAndDispatch(dispatch, Types.JobClassificationFailed)())
        ;
    }
};

const unknownJob: ActionCreator<void> = (dataJobTrainingSetUnknown: JobTrainingSetUnknownInterface) => dispatch => {
    putJobUnknown(dataJobTrainingSetUnknown)
        .then(() => {
            createAndDispatch(dispatch, Types.JobUnknownByUser)();
            $('#select-lang').val('none');
        })
        .catch(createAndDispatch(dispatch, Types.JobClassificationFailed)())
    ;
};

const languageChanged: ActionCreator<void> = (language: string) => dispatch => {
    createAndDispatch(dispatch, Types.JobLanguageChanged)({language});
};

export default {
    fetchJobs,
    validateJob,
    unknownJob,
    languageChanged
}