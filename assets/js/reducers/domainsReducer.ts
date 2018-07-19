import  { Types } from '../actions/types';

const defaultState = {
    domains: [],
    loading: false,
    domainClicked: ''
}

export default function domainsReducer(state = defaultState, action) {
    switch(action.type) {
        case Types.DomainsRequest: {
            return {
                ...state,
                loading: true
            }
        }

        case Types.DomainsRequestSucceed: {
            return {
                ...state,
                loading: false,
                domains: action.payload
            }
        }

        case Types.DomainClicked: {
            return {
                ...state,
                domainClicked: action.payload.domain
            }
        }

        case Types.DomainsRequestFailed: {
            return {
                ...state,
                loading: false,
                domains: []
            }
        }

        case Types.JobClassified: {
            return {
                ...state,
                domainClicked: ''
            }
        }

        case Types.JobUnknownByUser: {
            return {
                ...state,
                domainClicked: ''
            }
        }

        default: {
            return state;
        }
    }
}