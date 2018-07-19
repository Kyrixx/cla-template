import * as React from 'react'
import {Job} from "wizbii";
import * as R from 'ramda';
import { Parser } from 'html-to-react';


interface Props {
    job: Job
}

export default class Content extends React.Component<Props> {
    constructor(props) {
        super(props);

        this.formatText = this.formatText.bind(this);
        this.displaySkills = this.displaySkills.bind(this);
        this.displayMission = this.displayMission.bind(this);
        this.displayProfileResearched = this.displayProfileResearched.bind(this);
        this.splitText = this.splitText.bind(this);
    }

    formatText(text: string) {
        if(typeof text === "undefined")
            return "";

        let htmlToReactParser = new Parser();

        // On met en forme les liens http(s)
        let www_reg = /(https?:\/\/[^\s]+)/g;
        let blocks = text.split(www_reg);
        let message = blocks.map( (block, key) => {
            if (block.match(www_reg)) {
                return <a href={block} key={key+'_http'}>{block}</a>;
            } else {
                return block;
            }
        });

        // On gère les retours chariots
        return message.map(block => {
            if (typeof(block) === "string")
                return block.split('\n').map((item, key) => {
                    return <span key={key+'_carriage'}>{htmlToReactParser.parse(item)}<br/></span>
                });
            else
                return htmlToReactParser.parse(block);
        });
    }

    splitText(text: string) {
        if(text.length < 69)
            return text;

        const words = text.split(' ');
        let output = [];
        let lineLength: number = 0;

        R.forEach(word => {
            if(lineLength + word.length < 69) {
                output.push(word + ' ');
                lineLength += word.length + 1;
            }

            else {
                output.push(<br key={word + '_content'}/>);
                output.push(word + ' ');
                lineLength = word.length;
            }

        },words);

        return output;
    }

    displayMission() : JSX.Element {
        if(typeof(this.props.job.mission) !== 'undefined') {
            return <div className="panel panel-default">
                    <div className="panel-heading">
                        <p>Mission</p>
                    </div>
                    <div className="panel-body">
                        <p>{this.formatText(this.props.job.mission)}</p>
                    </div>
                </div>
        }
        else {
            console.log(this.props.job);
            return <div className="panel panel-default">
                <div className="panel-heading">
                    <p>Mission</p>
                </div>
                <div className="panel-body">
                    <p>La mission n'existe pas</p>
                </div>
            </div>
        }
    }

    displayProfileResearched() : JSX.Element {
        if(typeof(this.props.job.profile) !== 'undefined') {
            return <div className="panel panel-default">
                <div className="panel-heading">
                    <p>Profil Recherché</p>
                </div>
                <div className="panel-body">
                    <p>{this.formatText(this.props.job.profile)}</p>
                </div>
            </div>
        }
        else {
            console.log(this.props.job);
            return <div className="panel panel-default">
                <div className="panel-heading">
                    <p>Profil Recherché</p>
                </div>
                <div className="panel-body">
                    <p>Le profile n'existe pas</p>
                </div>
            </div>
        }
    }

    displaySkills() : JSX.Element[] {
        if(typeof(this.props.job.skills) !== "undefined") {
            if(this.props.job.skills.length === 0)
                return [<p key="vide">Aucun skill à afficher :(</p>]

            return R.map(skill => {
                return <div>
                    <button className="btn btn-primary tags" key={skill.name}>{ this.splitText(skill.name) }</button>
                    <br key={skill.name + '_br'}/>
                </div>;
            },this.props.job.skills);
        }
    }

    render() {
        return <div className="ibox animated fadeIn">
            <div className="ibox-title">
                <p className="jobTitle">Titre de l'offre</p>
                <p>{ this.props.job.title }</p>
            </div>
            <div className="ibox-content">
                <div className="row">
                    { this.displayMission() }
                </div>
                <div className="row">
                    { this.displayProfileResearched() }
                </div>
                <div className="row">
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <p>Skills</p>
                        </div>
                        <div className="panel-body">
                            { this.displaySkills() }
                        </div>
                    </div>
                </div>
            </div>
        </div>;
    }
}