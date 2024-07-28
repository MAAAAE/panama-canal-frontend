// src/keycloak.js
import Keycloak from 'keycloak-js';

// Keycloak configuration options
const keycloak = new Keycloak({
    url: 'http://localhost:18080/',
    realm: 'myrealm',
    clientId: 'maaaae'
});

export default keycloak;
