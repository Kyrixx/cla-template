export enum Types {
    HideBugSubmitModal= "HIDE_BUG_SUBMIT_MODAL",
    ShowBugSubmitModal = "SHOW_BUG_SUBMIT_MODAL",

    JobLanguageChanged = "JOB_LANGUAGE_CHANGED",
    JobUnknownByUser = "JOB_UNKNOWN_BY_USER",

    JobRequest = "JOB_REQUEST",
    JobRequestSucceed = "JOB_REQUEST_SUCCEED",
    JobRequestFailed = "JOB_REQUEST_FAILED",

    JobSentToClassification = "JOB_SENT_TO_CLASSIFICATION",
    JobClassificationFailed = "JOB_CLASSIFICATION_FAILED",
    JobClassified = "JOB_CLASSIFIED",

    DomainsRequest = "DOMAINS_REQUEST",
    DomainsRequestSucceed = "DOMAINS_REQUEST_SUCCEED",
    DomainsRequestFailed = "DOMAINS_REQUEST_FAILED",
    DomainClicked = "DOMAIN_CLICKED",
    DomainEmpty = "DOMAIN_EMPTY",
}