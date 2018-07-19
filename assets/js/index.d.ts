export interface RootState {

}

export interface DomainList {
    'Commerce - Vente': string[],
    'Communication - création': string[],
    'Direction d entreprise': string[],
    'Enseignement - Formation': string[],
    'Etudes - recherche et développement': string[],
    'Gestion - finance - Droit': string[],
    'Hôtellerie - Restauration': string[],
    Informatique: string[],
    'Logistique - proccess - qualité': string[],
    'Marketing - Produit': string[],
    'Production - ouvriers': string[],
    'Ressources humaines': string[],
    'Santé - social - culture': string[],
    'Secrétariat - Administration': string[]
}

export interface JobTrainingSetInterface {
    "id_job": string,
    "title": string,
    "profile": string,
    "categorization_duration": number,
    "mission": string,
    "description_company": string,
    "domaine": string,
    "language": string,
    "niv1": null,
    "niv2": null,
    "niv3": null,
    "niv4": null,
    "Niveau1": string,
    "Niveau2": string,
}

export interface JobTrainingSetUnknownInterface {
    "id_job": string,
    "title": string,
    "profile": string,
    "categorization_duration": number,
    "mission": string,
    "description_company": string,
    "language": string,
    "error_type": string,
}