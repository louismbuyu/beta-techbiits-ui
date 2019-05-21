import React, {Component} from 'react';

class DisplayProfile extends Component {
    render() {
        const { username } = this.props;
        return (
            <div>
                {username}
            </div>
        );
    }
}

export default DisplayProfile;