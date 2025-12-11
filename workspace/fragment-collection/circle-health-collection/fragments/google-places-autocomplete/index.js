// IIFE to encapsulate the logic and avoid global scope pollution
(function() {
    // Strict mode helps catch common coding errors and "unsafe" actions
    'use strict';

    // Helper function to load the Google Places script
    function loadGooglePlacesScript(apiKey, callback) {
        // Check if the script is already loaded
        if (window.google && window.google.maps && window.google.maps.places) {
            callback();
            return;
        }

        // Create a new script element
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
        script.async = true;
        script.defer = true;
        script.onload = callback;
        // Handle script loading errors
        script.onerror = () => {
            console.error('Google Places API script could not be loaded.');
        };
        // Append the script to the head of the document
        document.head.appendChild(script);
    }

    // Function to initialize the autocomplete functionality
    function initAutocomplete(fragmentElement, configuration) {
        // Find the input element within the fragment's scope
        const input = fragmentElement.querySelector('input[type="text"]');
        
        // Ensure the input element exists
        if (!input) {
            console.error('Autocomplete input field not found in fragment.');
            return;
        }

        // Create the autocomplete object
        const autocomplete = new google.maps.places.Autocomplete(input);

        // Optional: Add a listener for when a place is selected
        autocomplete.addListener('place_changed', () => {
            const place = autocomplete.getPlace();
            console.log('Selected place:', place);
            // You can dispatch an event or handle the selected place data here
        });
    }

    // Liferay Fragment specific initialization
    // This block is executed for each instance of the fragment on the page
    if (typeof fragmentElement !== 'undefined' && configuration.googlePlacesApiKey) {
        loadGooglePlacesScript(configuration.googlePlacesApiKey, () => {
            initAutocomplete(fragmentElement, configuration);
        });
    } else if (typeof fragmentElement !== 'undefined') {
        // Handle the case where the API key is missing
        console.warn('Google Places API Key is not configured for this fragment.');
        const input = fragmentElement.querySelector('input[type="text"]');
        if (input) {
            input.placeholder = 'API Key not configured.';
            input.disabled = true;
        }
    }
})();
