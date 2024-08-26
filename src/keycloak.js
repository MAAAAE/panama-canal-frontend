// src/keycloak.js
import Keycloak from 'keycloak-js';

// Keycloak configuration options
const keycloak = new Keycloak({
    url: import.meta.env.KEYCLOAK_URL,
    realm: 'myrealm',
    clientId: 'panama-canal'
});

export default keycloak;
