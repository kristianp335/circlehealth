/**
 * Circle Health - Global JavaScript
 * Provides shared functionality for all fragments
 */

(function() {
    'use strict';

    // Global CircleHealth namespace
    window.CircleHealth = window.CircleHealth || {};

    /**
     * Utility functions
     */
    CircleHealth.Utils = {
        /**
         * Debounce function
         */
        debounce: function(func, wait, immediate) {
            let timeout;
            return function executedFunction() {
                const context = this;
                const args = arguments;
                const later = function() {
                    timeout = null;
                    if (!immediate) func.apply(context, args);
                };
                const callNow = immediate && !timeout;
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
                if (callNow) func.apply(context, args);
            };
        }
    };

    function init() {
        // Main initialization logic can go here in the future
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();