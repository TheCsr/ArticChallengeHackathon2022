import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import { database } from "./db";
import { collection, addDoc, updateDoc, getFirestore, doc } from "@firebase/firestore";

const userCollectionRef = collection(database, "users");

class Main extends Component {

  constructor(props) {
    super(props);
    // nothing changed, assign the state for the 
    // first time to teach its initial shape. 
    // (it will work without this, but will throw 
    // a warning)
    this.state = {
      datafromdb: props.datafromdb,
      string: "Verify",
      status: false
    };
  }

  componentWillReceiveProps(nextProps) {
    // return the new state as object, do not call .setState()
    this.setState({ datafromdb: nextProps.datafromdb });
  }

  async updateFlag(product) {
    const cityRef = doc(database, "users", product.id);
    await updateDoc(cityRef, {
      "verified": true
    }).catch((err) => {
      alert(err)
      console.log(err);
    })
    this.setState({
      status: true,
      string: "verified"
    })
  }


  render() {
    return (

      <div id="content">
        <h1>Add Your Information to the Digital File</h1>
        <form onSubmit={(event) => {
          event.preventDefault()
          const name = this.productName.value
          this.productPrice = 1
          const price = window.web3.utils.toWei('1', 'Ether')
          const data = {
            "name": this.productName.value,
            "price": window.web3.utils.toWei('1', 'Ether'),
            "owner": this.props.account
          }
          addDoc(userCollectionRef, data)

          this.props.createProduct(name, price)

        }}>
          <div className="form-group mr-sm-2">
            <input
              id="productName"
              type="text"
              ref={(input) => { this.productName = input }}
              className="form-control"
              placeholder="Write the Info"
              required />
          </div>

          <button type="submit" className="btn btn-success">Submit</button>
        </form>
        <p>&nbsp;</p>
        {
          (this.props.account === "0x1E19D63986C8307bE06dB63CF5D95ea7fE138df9") ?
            (
              <div>
                <h2>User Detail</h2>
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Information</th>
                      <th scope="col">Unix TimeStamp</th>
                      <th scope="col">Sender Address</th>
                      <th scope="col">Verify</th>
                    </tr>
                  </thead>
                  <tbody id="productList">
                    {this.state.datafromdb.map((product, key) => {
                      return (
                        <tr key={key}>
                          <th scope="row">{key.toString()}</th>
                          <td>{product.name}</td>
                          <td>{product.price.toString()}</td>
                          <td>{product.owner}</td>
                          <td>
                            {product.verified === true ? (
                              <Button primary onClick={() => this.updateFlag(product)} disabled>Verified</Button>
                            ) :
                              (
                                <Button primary onClick={() => this.updateFlag(product)}>Verify</Button>

                              )
                            }
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              <div></div>
            )
        }

      </div>
    );
  }
}

export default Main;
