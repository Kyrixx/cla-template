// Import des libs react-redux
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import thunk from 'redux-thunk';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { Provider } from 'react-redux';
import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux';
import { Route, Switch } from 'react-router-dom';

// Import de libs externes à l'application
import 'jquery';
import 'bootstrap';
import 'datatables';
import 'datatables.net';
import 'datatables.net-bs';
import 'datatables.net-buttons';
import 'pace';
import * as $ from 'jquery';
import './inspinia';

// Import du style pour la compilation Webpack
import '../scss/styles.scss';

// Import des types Typescript (juste pour le développement)
import { RootState } from './index.d'

// Import d'une lib la gestion de l'historique du navigateur
import history from './history';

// Fonctions utilitaires
import { getFromWindow } from './utils';

// Composants React
import BaseApp from './containers/BaseApp';
import Jobs from './containers/Jobs';

// Import des reducers
import jobReducer from "./reducers/jobReducer";
import domainsReducer from "./reducers/domainsReducer";
import utilsReducer from "./reducers/utilsReducer";


// On écoute les évenements sur les changements d'histoire pour que, à chaque changement de page, on remonte tout en haut de celle-ci
history.listen((location, action) => {
    window.scrollTo(0,0);
});

// Bind la navigation du browser au router de redux
const browserHistoryMiddleware = routerMiddleware(history);

// Permet d'utiliser l'extension Chrome de Redux
const composeEnhancers = getFromWindow('__REDUX_DEVTOOLS_EXTENSION_COMPOSE__', compose);

// Création du store (ne pas oublier d'ajouter tous les reducers. Le `routerReducer` est fourni par Redux.
const store = createStore(
    combineReducers<RootState>({
        routing: routerReducer,
        jobReducer: jobReducer,
        domainsReducer: domainsReducer,
        utilsReducer: utilsReducer,
    }),
    composeEnhancers(applyMiddleware(thunk, browserHistoryMiddleware)),
);


ReactDOM.render(
    // On connecte le store à notre application (Provider) et on créé le router de notre application (Connected Router)
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <BaseApp>
                <Switch>
                    <Route exact path={'/'} component={Jobs} />
                </Switch>
            </BaseApp>
        </ConnectedRouter>
    </Provider>, document.querySelector('#app'),
);
