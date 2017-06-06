import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import * as actions from '../actions';
import Learn from './Learn';
import Challenge from './Challenge';
import Testing from './Testing';


const Game = ({ navigation }) => {
    const games = {
        learn: <Learn />,
        challenge: <Challenge />,
        test: <Testing />
    };
    return <div>{games[navigation.mode]}</div>;
};


Game.propTypes = {
    navigation: PropTypes.object.isRequired
};


const mapStateToProps = (state) => ({
    navigation: state.navigation
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(actions, dispatch)
});


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Game);
