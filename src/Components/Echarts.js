import React from 'react';
import ReactEcharts from 'echarts-for-react';



class Echarts extends React.Component {
  constructor(props){
    super(props);

    this.getOptionforbar = this._getOptionforbar.bind(this)
    this.getOptionforpie = this._getOptionforpie.bind(this)
  }
  componentDidMount(){

  console.log(this.props);
    console.log('did mount');
  }
  _getOptionforbar(){
     const { bar }  = this.props.mychartdata
     console.log(this.props.mychartdata)
     return bar
  }
  _getOptionforpie(){
    const {pie} = this.props.mychartdata
    return pie
  }
  onChartReadyCallback(){
    console.log('lodded!!');
  }
  render(){
    const { bar }  = this.props.mychartdata
    const count = Object.keys(bar).length ;

    return(
   <div>
    {count > 0 &&
        <div>
     <div className="mycharts">
     <ReactEcharts
     option={this.getOptionforbar()}
     notMerge={true}
     lazyUpdate={true}
     onChartReady={this.onChartReadyCallback}
      />
    </div>
    <div className="mycharts">
    <ReactEcharts
    option={this.getOptionforpie()}
    notMerge={true}
    lazyUpdate={true}
    onChartReady={this.onChartReadyCallback}
     />
   </div>
   </div>
   }
</div>


   )
  }
}
export default Echarts
