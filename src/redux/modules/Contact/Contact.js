const types = {
  ADD_CONTACTS : 'ADD_CONTACTS'
}

const initialstate = {
  contacts: []
}
export const actions = {
  addMyContacts : (contact) => (
   {type:types.ADD_CONTACTS, payload: contact}
 )

}

export const ContactReducer = (state = initialstate, action) => {

  switch(action.type){
    case types.ADD_CONTACTS :
     return {...state, contacts: [...state.contacts, action.payload]}

    default :
    return state
  }

}
