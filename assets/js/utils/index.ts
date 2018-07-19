import { createAction } from "redux-actions";

export function getFromWindow(varName: string, defaultValue: any = null): any|null {
    return window[varName] || defaultValue;
}

// Cette fonction utilitaire permet de créer l'action à dispatcher à tous les reducers.
// La syntaxe particulière, c'est du typage Typescript. On a besoin de donner le type d'objet que l'on envoie.
export function createAndDispatch<T>(dispatch, actionType) {
    return (payload?: T) => {
        // Une action, c'est un type (la liste des types est dans assets/js/actions/types.ts) et des données (appelé aussi payload)
        const action = payload ? createAction<T>(actionType)(payload) : createAction(actionType)();

        // Lors de l'appel à dispatch, tous les reducers sont appelés avec l'action envoyé.
        return dispatch(action);
    }
}