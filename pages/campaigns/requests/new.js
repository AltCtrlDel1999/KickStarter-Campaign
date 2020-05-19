import react ,{ Component } from 'react';
import Layout from '../../../components/Layout';
import {Form ,Input, Button, Message} from 'semantic-ui-react';
import {Link, Router } from '../../../routes';
import Campaign from '../../../ethereum/campaign';
import web3 from '../../../ethereum/web3';

class NewRequest extends Component{
  state = {
    description: '',
    amount: '',
    recipient: '',
    loading: false,
    errorMessage: ''
  };

  static async getInitialProps(props){
    const { address } = props.query;

    return { address };
  }

  onSubmit = async (event) =>{
    event.preventDefault();


    const campaign = Campaign(this.props.address);
    const {description, amount, recipient } = this.state;

    this.setState({loading: true, errorMessage:''});

    try{
      //console.log("Hello");
      const accounts = await web3.eth.getAccounts();
      //console.log(accounts);
      await campaign.methods
                        .createRequest(description,web3.utils.toWei(amount,'ether'),recipient)
                        .send({from : accounts[0]});
      }
      catch(err){
        this.setState({errorMessage:err.message});
        //console.log(this.state.errorMessage);
      }
      this.setState({loading: false});
      Router.pushRoute(`/campaigns/${this.props.address}/requests`);

  }

  render(){
    return (
      <Layout>
        <h3>Create new Request</h3>
        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage} >
          <Form.Field>
            <label>description</label>
            <Input
              value={this.state.description}
              onChange={(event) => {this.setState({description:event.target.value})}}
             />
          </Form.Field>
          <Form.Field>
            <label>Amount in ether</label>
            <Input
            value={this.state.amount}
            onChange={(event) => {this.setState({amount:event.target.value})}}
             />
          </Form.Field>
          <Form.Field>
            <label>Recipient</label>
            <Input
            value={this.state.recipient}
            onChange={(event) => {this.setState({recipient:event.target.value})}}
            />
          </Form.Field>
          <Message error header="Oops!" content={this.state.errorMessage} />
          <Button loading={this.state.loading} primary>Create Request</Button>
        </Form>
      </Layout>
    );
  }
}

export default NewRequest;
