// src/keycloak.js
import Keycloak from 'keycloak-js';

// Keycloak configuration options
const keycloak = new Keycloak({
    url: 'http://keycloak:18080',
    realm: 'myrealm',
    clientId: 'panama-canal'
});

export default keycloak;
