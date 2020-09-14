import React from 'react'
import {Input, Button, Badge, Card, CardBody, CardHeader, Col, Row, Table,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,FormGroup,
  Label } from 'reactstrap';
import fakeAuth from '../api/fakeAuth'
import {getAccKey,createAccKey,editAccKey,deleteAccKey} from '../api/accumulationkeys'
import {getDataDefinitions,createDataDefinitions,editDataDefinitions,deleteDataDefinitions} from '../api/datadefinitions'

import moment from 'moment'
import {Link} from 'react-router-dom';
import swal from 'sweetalert'

import {Pagination,Select, Input as AntInput} from 'antd'
import Slide from 'react-reveal/Slide';

const getSourceType={
  0:'[0] INTERNAL',
  1:'[1] REQUEST',
  2:'[2] HTTP',
  3:'[3] GRPC',
  4:'[4] REDIS',
  5:'[5] MYSQL',
  6:'[6] MONGODB'
}

const getSourceDataTemplate={
  0:{},
  1:{},
  2:{},
  3:{
    name: "template",
    type: " internal",
    serverAddress:"localhost:9090",
    useSSL: false,
    method:"api",
    hashKey:"abc@123",
    timeoutMs:"1000"
  },
  4:{
    accumulationKeyId: 8
  },
  5:{},
  6:{}
}

const template = {
    "name": "template",
    "filter": "{\"commit\":[[\"isA30 == false\"]],\"revert\":[[]]}",
    "keyFormat": "zpi|user_a30_nonactive:#staticCfg(campaign.zpi.a30.month)",
    "cacheType": "SET",
    "elementType": "SINGLE",
    "elementValue": "${userID}",
    "description": null,
    "expire": -1,
    "redisClusterId": "REDIS_RISK",
    "redissonCodec": "STRING",
    "active": true
}

const { Option } = Select;
class UserRow extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        modalEditNav:false,
        modalEditSource:false,
        expandDescription: false,
        newSource:{
          sourceType:this.props.user.type,
          dataSource:JSON.stringify(this.props.user.dataSource,null,2)
        },
        template:JSON.stringify(this.props.user,null,2),
        modalDelete:false,
      }
    }

    toggleDelete=()=>{
      this.setState({
        modalDelete:!this.state.modalDelete
      })
    }

    toggleEventRow=()=>{
        let toggle = this.state.expandDescription?false:true;
        this.setState({expandDescription:toggle})
      }

    toggleEdit=()=>{
      this.setState({modalEditSource:!this.state.modalEditSource})
    }

    handleChangeSourceType=(e)=>{
      this.setState({
        newSource:{
          ...this.state.newSource,
          sourceType:e.target.value,
          dataSource: JSON.stringify(getSourceDataTemplate[e.target.value],null,2)
        }
      })
    }
  
    handleChangeDataSource=(e)=>{
      this.setState({
        newSource:{
          ...this.state.newSource,
          dataSource:e.target.value
        }
      })
    }

    handleDeleteSource=async()=>{
      try{
        await deleteAccKey(this.props.user.id,{},fakeAuth.getAccessToken())
        swal("Thông báo!", "Delete accumulation key thành công!", "success").then(res=>{
          if (res){
            window.location.reload(false)
          }
        })
  

      }catch(e){
        swal("Thông báo!", "Delete accumulation key lỗi! "+e, "error")
      }
    }

    handleChangeTemplate=(e)=>{
        this.setState({
          template:e.target.value
        })
      }

    handleEditSource=async()=>{
      try{
        let editAcc =JSON.parse(this.state.template)
        await editAccKey(this.props.user.id,editAcc,fakeAuth.getAccessToken())
        swal("Thông báo!", "Edit accumulation key thành công!", "success").then(res=>{
          if (res){
            window.location.reload(false)
          }
        })
  

      }catch(e){
        swal("Thông báo!", "Edit accumulation key lỗi! "+e, "error")
      }
    }


  render(){
    const user = this.props.user
    const sourceLink = `/data-definitions/${user.id}`

    return (
        <React.Fragment>
            <tr key={user.id}>
            <th scope="row">
          <Button color="light" size="sm" onClick={this.toggleEventRow}><i className={this.state.expandDescription?"fa fa-caret-up":"fa fa-caret-down"} ></i></Button>
        </th>
          <td>{user.id}</td>
          <td>{moment(user.createAt).format('DD-MM-YYYY HH:mm:ss')}</td>
          <td><b>{user.name}</b></td>
          <td>{user.keyFormat}</td>
          <td width="10%">
          <Badge color={'primary'} onClick={this.toggleEdit}>
            <i className="fa fa-edit fa-2x myBtn"></i>
            <Modal size="lg" isOpen={this.state.modalEditSource} toggle={this.toggleEdit}>
                    <ModalHeader toggle={this.toggleEdit}>
                    Edit accumulation keys
                    </ModalHeader>
                    <ModalBody style={{'max-height': 'calc(100vh - 210px)', 'overflow-y': 'auto'}}>
                    <Row className="justify-content-md-center">
                    <Col md={12}>
                          <Form>

                          <FormGroup>
                            <Col md={4}>
                            <Label ><b>JSON template<span style ={{color:"#F86C6B"}}>*</span></b></Label></Col>
                            <Col md={12}>
                            <Input rows="15" spellcheck="false" type="textarea" value={this.state.template} onChange={this.handleChangeTemplate}>
  
                            </Input>
                            </Col>
                          </FormGroup>

                          </Form>
                    </Col>
                    </Row>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={this.toggleEdit}>Cancel</Button>

                        <Button color="primary" onClick={this.handleEditSource}>Save</Button>
                    </ModalFooter>
                    </Modal>
          </Badge>&nbsp;
          <Badge color={'danger'} onClick={this.toggleDelete}>
            <i className="fa fa-trash-o fa-2x myBtn"></i>
            <Modal isOpen={this.state.modalDelete} toggle={this.toggleDelete}>
              <ModalHeader>
                Delete accumulation key: {this.props.user.id}
              </ModalHeader>
              <ModalBody>
                Do you want to delete?
              </ModalBody>
              <ModalFooter>
              <Button color="secondary" onClick={this.toggleDelete}>Cancel</Button>

              <Button color="primary" onClick={this.handleDeleteSource}>Delete</Button>
              </ModalFooter>
            </Modal>
          </Badge></td>
        </tr>{this.state.expandDescription?
            <Slide left duration="500">
              <tr><td colSpan={6}>
              <Card>
                <CardHeader>
                  <b>Description</b>
                </CardHeader>
                <CardBody>
                    <div><pre>{JSON.stringify(user.description,null,2)}</pre></div>
                </CardBody>
              </Card>
              <Card>
                <CardHeader>
                  <b>All information</b>
                </CardHeader>
                <CardBody>
                    <div><pre>{JSON.stringify(user,null,2)}</pre></div>
                </CardBody>
              </Card>
            </td></tr>
            </Slide>
              :<tr></tr>}
        </React.Fragment>
      )
  }
}

export default class App extends React.Component {
  constructor(props){
      super(props);
      this.state={
        data:[],
        masterData:[],
        total:0,
        modalNewSource:false,
        newSource:{
          sourceType:0,
          dataSource:"{}",
        },
        newAccumulationKey:{
            dataDefinition:{
                id:1
            }
        },
        template:JSON.stringify(template,null,2)
        ,
        DataDefSuggest:[]
      }
  }

  handleNewSource=async()=>{
      let newAcc = JSON.parse(this.state.template);
      newAcc={
          ...newAcc,
          createAt:new Date().getTime(),
          dataDefinition:{
              id:this.state.newAccumulationKey.dataDefinition.id
          }
      }
      console.log(newAcc)
    try{
      await createAccKey(newAcc,fakeAuth.getAccessToken())
      swal("Thông báo!", "Tạo accumulation key thành công!", "success").then(res=>{
        if (res){
          window.location.reload(false)
        }
      })


    }catch(e){
      swal("Thông báo!", "Tạo accumulation key lỗi! "+e, "error")
    }
  }

  handleChangeDataDef=(e)=>{
      this.setState({
          newAccumulationKey:{
              dataDefinition:{
                  id:e
              }
          }
      })
  }

  handleChangeTemplate=(e)=>{
    this.setState({
      template:e.target.value
    })
  }

  toggleNewSource=()=>{
    this.setState({
      modalNewSource:!this.state.modalNewSource
    })
  }

  componentWillMount = () => {
    getAccKey(fakeAuth.getAccessToken(), 0, 10).then(res => {
      if (res.data && res.data.list){
        console.log(res.data.list)
        this.setState({
            data: res.data.list,
            masterData: res.data.list,
            total:res.data.total,
          });
      }
    })
    getDataDefinitions(fakeAuth.getAccessToken(),0,1000).then(res=>{
        this.setState({
            DataDefSuggest:res.data?res.data.list:[]
        })
    })
  }

  onChangePage=(page,pageSize)=>{
      console.log(page)
      console.log(pageSize)
      getAccKey(fakeAuth.getAccessToken(), page-1, pageSize).then(res => {
        console.log(res.data.list)
        this.setState({
            data: res.data.list,
            masterData: res.data.list,
            total:res.data.total,
        });
      })
  }

  onShowSizeChange=(page,pageSize)=>{
    getAccKey(fakeAuth.getAccessToken(), 0, pageSize).then(res => {
      console.log(res.data.list)
      this.setState({
          data: res.data.list,
          masterData: res.data.list,
          total:res.data.total
      });
    })
  }

  searchInResult = (input) => {
    let dataFilters = [];
    if (this.state.data && input && input.target.value) {
      for (let i = 0; i < this.state.data.length; i++) {
        if (this.state.data[i].name.toLowerCase().indexOf(input.target.value.toLowerCase()) > -1) {
          dataFilters.push(this.state.data[i]);
        }
      }
      if(dataFilters) {
        this.setState({
          data: dataFilters
        });
      }
    }

    if (!input || !input.target.value) {
      this.setState({
        data: this.state.masterData
      });
    }
  }

  searchType = (input) => {
    let dataFilters = [];
    if (this.state.masterData&&input) {
      for (let i = 0; i < this.state.masterData.length; i++) {
        if (this.state.masterData[i].type===input) {
          dataFilters.push(this.state.masterData[i]);
        }
      }
      if(dataFilters) {
        this.setState({
          data: dataFilters
        });
      }
    }
    if (input===-1){
        this.setState({
            data: this.state.masterData
          });
    }
  }
  

  render() {
    const data = this.state.data;

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={12}>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i>
                Accumulation keys management
                <Button
                  color="success"
                  size="md"
                  className="float-right"
                  onClick={this.toggleNewSource}>
                  <i className="fa fa-plus"></i>
                  <b>
                    Add new</b>
                    <Modal size="lg" isOpen={this.state.modalNewSource} toggle={this.toggleNewSource}>
                    <ModalHeader toggle={this.toggleNewSource}>
                    Add new accumulation keys
                    </ModalHeader>
                    <ModalBody style={{'max-height': 'calc(100vh - 210px)', 'overflow-y': 'auto'}}>
                    <Row className="justify-content-md-center">
                    <Col md={12}>
                          <Form>
                          <FormGroup>
                            <Col md={4}>
                            <Label ><b>Choose data definition<span style ={{color:"#F86C6B"}}>*</span></b></Label></Col>
                            <Col md={10}>
                            <Select
                                style={{ width: '100%' }}
                                value={this.state.newAccumulationKey.dataDefinition.id}
                                // showSearch
                                onChange={this.handleChangeDataDef}
                                placeholder="Select data definition"
                                optionFilterProp="children"
                                filterOption={(input, option) =>
                                    option.children.toString().toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                            >
                            {this.state.DataDefSuggest?this.state.DataDefSuggest.map(ele=>(
                                <Option value={ele.id}><span style={{color:"red"}}>[{ele.id}]</span> NAME: <b>{ele.name}</b> - SOURCE: <b>{ele.source}</b></Option>
                            )):[]}
                            </Select>
                            </Col>
                          </FormGroup>

                          <FormGroup>
                            <Col md={4}>
                            <Label ><b>JSON template<span style ={{color:"#F86C6B"}}>*</span></b></Label></Col>
                            <Col md={12}>
                            <Input rows="15" spellcheck="false" type="textarea" value={this.state.template} onChange={this.handleChangeTemplate}>
  
                            </Input>
                            </Col>
                          </FormGroup>

                          </Form>
                    </Col>
                    </Row>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={this.toggleNewSource}>Cancel</Button>

                        <Button color="primary" onClick={this.handleNewSource}>Add</Button>
                    </ModalFooter>
                    </Modal>
                </Button>
              </CardHeader>
              <CardBody>
              <Row>
                    <Col md={3}>
                    <AntInput placeholder="Search name"  onChange={(value) => this.searchInResult(value)}>
                    </AntInput>
                    </Col>
                    <Col md={3}>
                    {/* <Select defaultValue={'Search type'} style={{ width: '100%' }} onChange={value=>this.searchType(value)}>
                        {typeSearchSuggest.map((ele,index)=>(
                                <Option value={index-1}>{ele}</Option>
                            ))}
                    </Select> */}
                    </Col>
                    <Col md={6} style={{textAlign:"right"}}>
                    <Pagination defaultCurrent={1} total={this.state.total} 
                     showTotal={total => `Total ${total} items`}
                      showSizeChanger={true}
                      onShowSizeChange={this.onShowSizeChange}
                     onChange={this.onChangePage}
                     responsive />
                    </Col>
                </Row>
                <br></br>
                  <div 
                //   style={{
                //   maxHeight: 'calc(100vh - 310px)',
                //   overflowY: 'auto'
                // }}
                >
                <Table responsive hover>
                <thead>
                    <tr>
                    <th scope="col"></th>
                      <th scope="col">ID</th>
                      <th scope="col">CREATED AT</th>
                      <th scope="col">NAME</th>
                      <th scope="col">KEY FORMAT</th>
                      <th scope="col">ACTION</th>

                    </tr>
                  </thead>
                  <tbody>
                    {data.map((user) =>
                      <UserRow key={user.id} user={user}/>
                    )}
                  </tbody>
                </Table>
                </div>
               
                <Row className="justify-content-md-center">
                    
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
        
      </div>
    );
  }
}