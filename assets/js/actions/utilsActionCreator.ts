import {ActionCreator} from "redux";
import {createAndDispatch} from "../utils";
import {Types} from "./types";

const showBugSubmitModal: ActionCreator<void> = () => dispatch => {
    createAndDispatch(dispatch, Types.ShowBugSubmitModal)({modalState: true});
};

const hideBugSubmitModal: ActionCreator<void> = () => dispatch => {
    createAndDispatch(dispatch, Types.HideBugSubmitModal)({modalState: false});
};

export default {
    showBugSubmitModal,
    hideBugSubmitModal
}