var _changeListeners = [];
var _navigator = [];

var AppStore = {
    init: function() {
    },

    getNavigator: function() {
        return _navigator;
    },

    navigateTo: function(i) {
        AppStore.notifyChange();
    },

    notifyChange: function() {
        _changeListeners.forEach(function(f){
            f();
        });
    },

    addChangeListener: function(f) {
        _changeListeners.push(f);
    },

    removeChangeListener: function(f) {
        _changeListeners = _changeListeners.filter(function (listener) {
            return listener !== f;
        });
    }
};

module.exports = AppStore;
