import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import Echarts from '../Components/Echarts'
import {actions as echartAction } from '../redux/modules/Echarts/Echarts'

class EchartComponent extends  Component {
  constructor(props) {
    super(props);

    console.log('container constructor')

  }
  componentDidMount(){
    this.props.getMyChartdata();
      console.log(this.props.mychartdata);
  }
  render(){
    console.log(this.props.mychartdata);

    return(

        <div>
          <h2>Echarts</h2>
            <div>
            { this.props.mychartdata  &&
            <Echarts mychartdata={this.props.mychartdata} />
            }
           </div>
           </div>
    )
  }
}
const mapStateToProps = (state) => {
  return{
   mychartdata: state.reducers.mychartdata
 }
}
const mapDispatchToProps = (dispatch, ownProps) => {
return  bindActionCreators({
    getMyChartdata: () => echartAction.fetchData()
  },dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EchartComponent)
