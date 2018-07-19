import { ActionCreator } from "redux";

import { Types } from './types'
import { createAndDispatch } from '../utils'
import {getDomains} from "../webservices/domains";


const fetchDomains: ActionCreator<void> = () => dispatch => {
    createAndDispatch(dispatch, Types.DomainsRequest)();

    getDomains()
        .then(response => response.data)
        .then(createAndDispatch(dispatch, Types.DomainsRequestSucceed))
        .catch(createAndDispatch(dispatch, Types.DomainsRequestFailed));
};

const selectDomain: ActionCreator<void> = (domain: string) => dispatch => {
    createAndDispatch(dispatch, Types.DomainClicked)({domain});
};


export default {
    fetchDomains,
    selectDomain,
}