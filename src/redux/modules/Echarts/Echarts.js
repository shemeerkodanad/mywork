const types = {
 'FETCHING' : 'FETCHING',
 'FETCH-SUCCESS':'FETCH-SUCCESS',
 'FETCH-FAILURE':'FETCH-FAILURE'
}
export  const actions = {
    fetchData: () => ({
      type: types.FETCHING,
      meta: {
        type:'api',
        url: 'http://localhost:8080'
      }

    })

}
const initialstate = {
mychartdata : {bar:{},pie:{}}
}

export const reducers = (state = initialstate, action) => {

  switch(action.type){
  case types.FETCHING:
  console.log(action.payload);
  return {...state, mychartdata:action.payload}
  default:
   return state;
  }


}
