var React = require('react');
var AppStore = require('../stores/AppStore');

var App = React.createClass({
    getStateFromStore: function() {
        return {
            navigator: AppStore.getNavigator(),
        };
    },

    getInitialState: function() {
        AppStore.init();
        return this.getStateFromStore();
    },

    componentDidMount: function() {
        AppStore.addChangeListener(this.update);
    },

    componentWillUnmount: function() {
        AppStore.removeChangeListener(this.update);
    },

    update: function() {
        this.setState(this.getStateFromStore());
    },

    render: function() {
        return (
            <div></div>
        );
    }
});

module.exports = App;
