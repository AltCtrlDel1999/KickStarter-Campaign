import web3 from './web3';
import compiledFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(compiledFactory.interface),
  '0x3427f6ab820FCe1aF8bF0E06811F974F70d9C631'
);

export default instance;
