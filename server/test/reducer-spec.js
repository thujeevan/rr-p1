import {Map, fromJS} from 'immutable';
import {expect} from 'chai';

import reducer from '../src/reducer';

describe('reducer', () => {
    it('handles SET_ENTRIES', () => {
        const initial = Map();
        const action = {
            type: 'SET_ENTRIES',
            entries: ['Trainspotting']
        }
        const next = reducer(initial, action);
        expect(next).to.equal(fromJS({
            entries: ['Trainspotting']
        }));
    });
    
    it('handles NEXT', () => {
        const initial = fromJS({
            entries: ['Trainspotting', '28 Days Later']
        });
        const action = {
            type: 'NEXT'
        };
        const next = reducer(initial, action);
        expect(next).to.equal(fromJS({
            vote: {
                pair: ['Trainspotting', '28 Days Later']
            },
            entries: []
        }));
    });
    
    it('handles VOTE', () => {
        const initial = fromJS({
            vote: {
                pair: ['Trainspotting', '28 Days Later']
            },
            entries: []
        });
        const action = {
            type: 'VOTE',
            entry: 'Trainspotting'
        };
        const next = reducer(initial, action);
        expect(next).to.equal(fromJS({
            vote: {
                pair: ['Trainspotting', '28 Days Later'],
                tally: {
                    'Trainspotting': 1
                }
            },
            entries: []
        }));
    });
    
    it('has an initial state', () => {
        const action = {
            type: 'SET_ENTRIES',
            entries: ['Trainspotting']
        };
        const next = reducer(undefined, action);
        expect(next).to.equal(fromJS({
            entries: ['Trainspotting']
        }));
    });
    
    it('can be used with reduce', () => {
        const actions = [
            {type: 'SET_ENTRIES', entries: ['Trainspotting', '28 Days Later']},
            {type: 'NEXT'},
            {type: 'VOTE', entry: 'Trainspotting'},
            {type: 'VOTE', entry: '28 Days Later'},
            {type: 'VOTE', entry: 'Trainspotting'},
            {type: 'NEXT'}
        ];
        const final = actions.reduce(reducer, Map());
        expect(final).to.equal(fromJS({
            winner: 'Trainspotting'
        }));
    });
});