import * as React from 'react';

interface Props {

}

export default class PageHeader extends React.Component<Props, any> {

    render() {
        return <div className="row border-bottom">
            <nav className="navbar navbar-static-top" role="navigation" style={{marginBottom: 9}}>
                <div className="navbar-header">

                </div>
            </nav>
        </div>;
    }
}
