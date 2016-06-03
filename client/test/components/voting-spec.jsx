import React from 'react';
import ReactDOM from 'react-dom';
import {
    renderIntoDocument,
    scryRenderedDOMComponentsWithTag,
    Simulate
} from 'react-addons-test-utils';
import {expect} from 'chai';
import {List} from 'immutable';

import {Voting} from '../../src/components/Voting';

describe('Voting', () => {
    it('renders a pair of buttons', () => {
        const comp = renderIntoDocument(
            <Voting pair={['Trainspotting', '28 Days Later']}></Voting>
        );
        const buttons = scryRenderedDOMComponentsWithTag(comp, 'button');
        expect(buttons.length).to.equal(2);
        expect(buttons[0].textContent).to.equal('Trainspotting');
        expect(buttons[1].textContent).to.equal('28 Days Later');
    });
    
    it('invokes callback when button is clicked', () => {
        let voteWith;
        const vote = entry => voteWith = entry;
        const comp = renderIntoDocument(
            <Voting pair={['Trainspotting', '28 Days Later']} vote={vote} />
        );
        const buttons = scryRenderedDOMComponentsWithTag(comp, 'button');
        Simulate.click(buttons[0]);
        expect(voteWith).to.equal('Trainspotting');
    });
    
    it('disables buttons when user has voted', () => {
        const comp = renderIntoDocument(
            <Voting pair={['Trainspotting', '28 Days Later']} hasVoted="Trainspotting" />
        );
        const buttons = scryRenderedDOMComponentsWithTag(comp, 'button');
        expect(buttons.length).to.equal(2);
        expect(buttons[0].hasAttribute('disabled')).to.equal(true);
        expect(buttons[1].hasAttribute('disabled')).to.equal(true);
    });
    
    it('add labels to the voted entry', () => {
        const comp = renderIntoDocument(
            <Voting pair={['Trainspotting', '28 Days Later']} hasVoted="Trainspotting" />
        );
        const buttons = scryRenderedDOMComponentsWithTag(comp, 'button');
        
        expect(buttons[0].textContent).to.contain('Voted');
    });
    
    it('renders just the winner when there is one', () => {
        const comp = renderIntoDocument(
            <Voting winner="Trainspotting" />
        );
        const buttons = scryRenderedDOMComponentsWithTag(comp, 'button');
        expect(buttons.length).to.equal(0);
        const winner = ReactDOM.findDOMNode(comp.refs.winner);
        expect(winner).to.be.ok;
        expect(winner.textContent).to.contain('Trainspotting');
    });
    
    it('renders as a pure component', () => {
        const pair = ['Trainspotting', '28 Days Later'];
        const container = document.createElement('div');
        
        let component = ReactDOM.render(<Voting pair={pair} />, container);        
        let firstBtn = scryRenderedDOMComponentsWithTag(component, 'button')[0];
        expect(firstBtn.textContent).to.equal('Trainspotting');
        
        pair[0] = 'Sunshine';
        component = ReactDOM.render(<Voting pair={pair} />, container);        
        firstBtn = scryRenderedDOMComponentsWithTag(component, 'button')[0];
        expect(firstBtn.textContent).to.equal('Trainspotting');
    });
    
    it('does update DOM when prop changes', () => {
        const pair = List(['Trainspotting', '28 Days Later']);
        const container = document.createElement('div');
        
        let component = ReactDOM.render(<Voting pair={pair} />, container);        
        let firstBtn = scryRenderedDOMComponentsWithTag(component, 'button')[0];
        expect(firstBtn.textContent).to.equal('Trainspotting');
        
        const newPair = pair.set(0, 'Sunshine');
        component = ReactDOM.render(<Voting pair={newPair} />, container);        
        firstBtn = scryRenderedDOMComponentsWithTag(component, 'button')[0];
        expect(firstBtn.textContent).to.equal('Sunshine');
    });
});