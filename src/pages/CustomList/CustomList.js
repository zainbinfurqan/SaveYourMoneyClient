import React, { Component } from 'react';
import { connect } from "react-redux";
import { addtext, checktext } from "../../Redux/acion/customListAction";
import Swal from "sweetalert2";
import './customlist.css'
class CustomList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            text: '',
            itemData: [],
            i: 0,
            error: '',
        }
    }

    changeTextHandle(key, e) {
        this.setState({ [key]: e.target.value });

    }
    addItemHandle = () => {
        let { text, itemData, i } = this.state
        if (text.trim().length > 0) {
            itemData.push({
                itemId: (itemData.length > 0 ? (itemData[itemData.length - 1].itemId + 1) : 1), itemName: text, itemCheck: false
            })
            this.setState({ itemData, text: '', itemCheck: false, error: '' });
            this.props.addtext(itemData)

        } else {
            this.setState({ error: 'please fill the field' })
        }
    }
    componentDidMount() {
        if (this.props.customList.length > 0) {
            this.setState({ itemData: this.props.customList })
        }
    }

    deleteItm(id) {
        let { itemData } = this.state;
        itemData.splice(id, 1)
        this.props.checktext(itemData)
        this.setState({ itemData: itemData })
    }

    changeCheckHandle = (ind) => {
        let { itemData } = this.state
        let index = itemData.findIndex(itm => itm.itemId === ind);
        if (itemData[index].itemCheck === true) {
            itemData[index].itemCheck = false
        } else {
            itemData[index].itemCheck = true
        }
        this.props.checktext(itemData)
        let complete = itemData.filter(itm => itm.itemCheck === false);
        if (complete.length == 0) {
            Swal.fire('Congratulation..! List Complete')
        }
        this.setState({ itemData })
    }
    deleteAll = () => {
        let deleteAllData = []
        this.props.addtext(deleteAllData)
        this.setState({ itemData: [] })

    }

    closeCustomListHandle = () => {
        this.props.history.replace("/userhome");
    }
    render() {
        let { text, itemData, error } = this.state
        return (
            <>
                <div style={{ height: '40px', padding: '5px', width: 'fit-content' }} onClick={this.closeCustomListHandle}>
                    <i className="fas fa-caret-left" style={{ float: 'left', margin: '0px 0px 0px 5px', fontSize: '23px' }} />
                    <p style={{ width: 'fit-content', margin: '1px', float: 'left', fontSize: '15px' }}>Back</p>
                </div>
                <div className='p-5'>
                    <input type="string"
                        className="form-control w-75 float-left mr-2"
                        id=""
                        aria-describedby="emailHelp"
                        placeholder="Item" value={text} onChange={e => this.changeTextHandle('text', e)} />
                    <button type="button" className="btn btn-primary" onClick={this.addItemHandle}>Add</button>
                    <p className='text-red'>{error}</p>
                </div>
                {itemData.length > 0 &&
                    <button className='btn btn-danger' onClick={this.deleteAll}>Empty List</button>
                }
                <div className='p-2'>
                    {itemData.map((itm, ind) => {
                        return (
                            <div className="alert alert-success" role="alert" key={itm.itemId}>
                                <p className='text-dark'>{itm.itemName}
                                    <i className='fa fa-trash mt-2 ml-3 float-right' style={{
                                        fontSize: '18px'
                                    }} onClick={() => this.deleteItm(ind)} />
                                    <input type="checkbox" id="" name="" checked={itm.itemCheck} className='float-right' onChange={() => this.changeCheckHandle(itm.itemId)} />
                                </p>
                            </div>
                        )
                    })}
                </div>


            </>
        )
    }
}
const mapStateToProps = state => {
    return {
        customList: state.customlist.customList
    };
};

const mapDispatchToProps = dispatch => {
    return {
        addtext: data => dispatch(addtext(data)),
        checktext: data => dispatch(checktext(data))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CustomList);
