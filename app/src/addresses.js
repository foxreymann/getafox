import addressesTruffle from "./addresses.json";
import addressesRopsten from "./addresses.ropsten.json";

let addresses

if(window.location.href.includes('etherfoxes.com')) {
  addresses = addressesRopsten
} else {
  addresses = addressesTruffle
}

export default addresses
