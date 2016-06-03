import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import * as actions from '../action-creator';

import Vote from './Vote';
import Winner from './Winner';

const mapStateToProps = (state) => {
    return {
        pair: state.getIn(['vote', 'pair']),
        winner: state.get('winner'),
        hasVoted: state.get('hasVoted')
    }
};

export const Voting = React.createClass({
    mixins: [PureRenderMixin],
    render() {
        return (
            <div>
                {
                    this.props.winner ? <Winner ref="winner" winner={this.props.winner} /> : 
                    <Vote {...this.props}/>
                }
            </div>
        )
    }
});

export const VotingContainer = connect(mapStateToProps, actions)(Voting);