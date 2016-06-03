import {List, Map, fromJS} from 'immutable';
import {expect} from 'chai';

import reducer from '../src/reducer';

describe('reducer', () => {
    it('handles SET_STATE', () => {
        const initial = Map();
        const state = {
            vote: {
                pair: ['Trainspotting', '28 Days Later'],
                tally: {
                    Trainspotting: 1
                }
            }
        };
        const action = {
            type: 'SET_STATE',
            state: fromJS(state)
        };
        const next = reducer(initial, action);
        expect(next).to.equal(fromJS(state));
    });
    
    it('handles SET_STATE with plain JS payload', () => {
        const initial = Map();
        const state = {
            vote: {
                pair: ['Trainspotting', '28 Days Later'],
                tally: {
                    Trainspotting: 1
                }
            }
        };
        const action = {
            type: 'SET_STATE',
            state
        };
        const next = reducer(initial, action);
        expect(next).to.equal(fromJS(state));
    });
    
    it('handles SET_STATE without initial state', () => {
        const state = {
            vote: {
                pair: ['Trainspotting', '28 Days Later'],
                tally: {
                    Trainspotting: 1
                }
            }
        };
        const action = {
            type: 'SET_STATE',
            state
        };
        const next = reducer(undefined, action);
        expect(next).to.equal(fromJS(state));
    });
    
    it('handles VOTE by setting hasVoted', () => {
        const state = fromJS({
            vote: {
                pair: ['Trainspotting', '28 Days Later'],
                tally: {
                    Trainspotting: 1
                }
            }
        });
        const action = {
            type: 'VOTE',
            entry: 'Trainspotting'
        };
        const next = reducer(state, action);
        expect(next).to.equal(fromJS({
            vote: {
                pair: ['Trainspotting', '28 Days Later'],
                tally: {
                    Trainspotting: 1
                }
            },
            hasVoted: 'Trainspotting'
        }));
    });
    
    it('does not set hasVoted for VOTE on invalid entry', () => {
        const state = {
            vote: {
                pair: ['Trainspotting', '28 Days Later'],
                tally: {
                    Trainspotting: 1
                }
            }
        };
        const action = {
            type: 'VOTE',
            entry: 'Sunshine'
        };
        const next = reducer(fromJS(state), action);
        expect(next).to.equal(fromJS(state));
    });
    
    it('removes hasVoted on SET_STATE if pair changes', () => {
        const initial = {
            vote: {
                pair: ['Trainspotting', '28 Days Later'],
                tally: {
                    Trainspotting: 1
                }
            },
            hasVoted: 'Trainspotting'
        };
        const action = {
            type: 'SET_STATE',
            state: {
                vote: {
                    pair: ['Sunshine', 'Slumdog Millionaire']
                }
            }
        };
        const next = reducer(fromJS(initial), action);
        expect(next).to.equal(fromJS({
            vote: {
                pair: ['Sunshine', 'Slumdog Millionaire']
            }
        }));
    });
});