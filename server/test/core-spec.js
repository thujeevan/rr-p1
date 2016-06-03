import {expect} from 'chai';
import {List, Map, fromJS} from 'immutable';

import {setEntries, next, vote} from '../src/core';

describe('applciation logic', () => {
    
    describe('setEntries', () => {        
        it('add the entries to the state', () => {
            let state = Map();
            let entries = List.of('Trainspotting', '28 Days Later');
            let next = setEntries(state, entries);
            
            expect(next).to.equal(Map({
                entries: List.of('Trainspotting', '28 Days Later')
            }));
        });
    });
    
    describe('next', () => {        
        it('takes the next two entries under vote', () => {
            let state = Map({
                entries: List.of('Trainspotting', '28 Days Later', 'Sunshine')
            });
            let nextState = next(state);
            
            expect(nextState).to.equal(Map({
                vote: Map({
                    pair: List.of('Trainspotting', '28 Days Later')
                }),
                entries: List.of('Sunshine')
            }));
        });
        
        it('puts winner of current vote back to entries', () => {
            let state = fromJS({
                vote: {
                    pair: ['Trainspotting', '28 Days Later'],
                    tally: {
                        'Trainspotting': 4,
                        '28 Days Later': 2
                    }
                },
                entries: ['Sunshine', 'Millions', '127 Hours']
            });
            let nextState = next(state);
            
            expect(nextState).to.equal(fromJS({
                vote: {
                    pair: ['Sunshine', 'Millions']
                },
                entries: ['127 Hours', 'Trainspotting']
            }));
        });
        
        it('puts both from tied vote back to entries', () => {
            let state = fromJS({
                vote: {
                    pair: ['Trainspotting', '28 Days Later'],
                    tally: {
                        'Trainspotting': 3,
                        '28 Days Later': 3
                    }
                },
                entries: ['Sunshine', 'Millions', '127 Hours']
            });
            let nextState = next(state);
            
            expect(nextState).to.equal(fromJS({
                vote: {
                    pair: ['Sunshine', 'Millions']
                },
                entries: ['127 Hours', 'Trainspotting', '28 Days Later']
            }));
        });
        
        it('marks winner when just one entry left', () => {
            let state = fromJS({
                vote: {
                    pair: ['Trainspotting', '28 Days Later'],
                    tally: {
                        'Trainspotting': 4,
                        '28 Days Later': 2
                    }
                },
                entries: []
            });
            let nextState = next(state);
            
            expect(nextState).to.equal(fromJS({
                winner: 'Trainspotting'
            }));
        });
    });
    
    describe('vote', () => {        
        it('creates a tally for the voted entry', () => {
            let state = Map({
                pair: List.of('Trainspotting', '28 Days Later')
            });
            let nextState = vote(state, 'Trainspotting');
            
            expect(nextState).to.equal(Map({
                pair: List.of('Trainspotting', '28 Days Later'),
                tally: Map({
                    'Trainspotting': 1
                })
            }));
        });
        
        it('adds to existing tally for the voted entry', () => {
            let state = Map({
                pair: List.of('Trainspotting', '28 Days Later'),
                tally: Map({
                    'Trainspotting': 3,
                    '28 Days Later': 2
                })
            });
            let nextState = vote(state, 'Trainspotting');
            
            expect(nextState).to.equal(Map({
                pair: List.of('Trainspotting', '28 Days Later'),
                tally: Map({
                    'Trainspotting': 4,
                    '28 Days Later': 2
                })
            }));
        });
    });
});