import react,{ Component } from 'react';
import {Card, Grid, Button} from 'semantic-ui-react';
import Layout from '../../components/Layout';
import Campaign from '../../ethereum/campaign';
import ContributeForm from '../../components/Contribute';
import { Link } from '../../routes';
//import web3 from '../../ethereum/web3';

class CampaignShow extends Component{
  static async getInitialProps(props){
    const campaign = Campaign(props.query.address);

    const summary = await campaign.methods.getSummary().call();
    //return {};
    return {
      address: props.query.address,
      minimumContribution: summary[0],
      balance: summary[1],
      requestsCount: summary[3],
      approverscount: summary[2],
      manager: summary[4]
    };
  }

  renderCards(){
    const {
      minimumContribution,
      balance,
      requestsCount,
      approverscount,
      manager
    } = this.props;

    const items = [
      {
        header: manager,
        meta: 'This is managers address',
        description: 'The manager created this campaign and can create requests',
        style : { overflowWrap: 'break-word'}
      },
      {
        header: balance,
        meta: 'Total balance',
        description: 'total amount of ethers contributed to this campaign'
      },
      {
        header: minimumContribution,
        meta: 'minimum Contribution',
        description: 'This is the minimum contribution you have to make to become contributor'
      },
      {
        header: requestsCount,
        meta: 'No. of requests',
        description: 'No. of requests created by manager'
      },
      {
        header: approverscount,
        meta: 'No. of Approvers',
        description: 'This are no. of approvers who have contributed to this campaign'
      }
    ];

    return <Card.Group items = { items } />;
  }

  render(){
    return(
      <Layout>
        <h3>Campaign Details</h3>
        <Grid>
          <Grid.Row>
            <Grid.Column width={10}>
              {this.renderCards()}
            </Grid.Column>
            <Grid.Column width={6}>
              <ContributeForm  address = {this.props.address}/>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Link route={`/campaigns/${this.props.address}/requests`}>
                <a>
                  <Button primary>View Requests</Button>
                </a>
              </Link>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Layout>
    );
  }
}

export default CampaignShow;
