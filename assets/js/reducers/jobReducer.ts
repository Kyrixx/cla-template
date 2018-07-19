import  { Types } from '../actions/types';
import moment = require("moment");

const defaultState = {
    jobs: [],
    loading: false,
    nbJobClassified: 0,
    categorizationStartMoment: moment(),
    language: 'none',
};

// Un reducer prend en parametre l'état courant de l'application envoyé par redeux (ou un état par défaut si c'est le premier appel)
// et l'action envoyé par le dispatcher.
export default function jobReducer(state = defaultState, action) {
    switch(action.type) {
        case Types.JobRequest: {
            return {
                ...state,
                loading: true
            }
        }

        case Types.JobRequestSucceed: {
            return {
                ...state,
                loading: false,
                jobs: action.payload,
                nbJobClassified: 0,
                categorizationStartMoment: moment()
            }
        }

        case Types.JobRequestFailed: {
            return {
                ...state,
                loading: false,
                jobs: [],
                nbJobClassified: 0
            }
        }

        // Premier appel au dispatcher, on set la variable loading a true (pour faire afficher un spinner par exemple)
        case Types.JobSentToClassification : {
            return {
                ...state,
                loading: true
            }
        }

        // Appel du dispatcher si la réponse du serveur est good
        case Types.JobClassified: {
            // Cette syntaxe { ...state, language: 'none' } signifie que je fais une copie de la variable state,
            // mais que j'en change que la clé language
            return {
                ...state,
                nbJobClassified: state.nbJobClassified+1,
                categorizationStartMoment: moment(),
                language: 'none',
            }
        }

        // Appel du dispatcher si la réponse du serveur est erreur. On peut retourner un state inchangé.
        // Ca permet juste d'avoir des logs dans l'extension Redux Chrome quand l'appel au serveur s'est mal passé
        case Types.JobClassificationFailed: {
            return state;
        }

        case Types.JobUnknownByUser: {
            return {
                ...state,
                nbJobClassified: state.nbJobClassified+1,
                categorizationStartMoment: moment(),
                language: 'none',
            }
        }

        case Types.JobLanguageChanged: {
            return {
                ...state,
                language: action.payload.language
            }
        }

        default: {
            return state;
        }
    }
}