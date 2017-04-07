import React from 'react'
import { Table , Row, Col } from 'react-bootstrap';

const ListComponent = (props) => {

const {contactLists} = props;
console.log(contactLists)
 return (
   <div>{contactLists.length > 0 &&
   <Row>
   <Col xs={12} md={8}>
   <Table striped bordered condensed hover>
    <thead>
      <tr>
        <th>#</th>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Email</th>
      </tr>
    </thead>
    <ContactLists  contacts={contactLists} />
   </Table>
  </Col>
  </Row>
}{contactLists.length == 0 &&
 <h3> There is no Contact in the list</h3>

}
   </div>
 )
}

const ContactLists = (props) => {
  const {contacts} = props
  console.log(contacts)
  const contactLists = contacts.map((item, i) => {
    return (
     <tr key={i}>
      <td>{i+1}</td>
      <td>{item.firstname}</td>
      <td>{item.lastname}</td>
      <td>{item.email}</td>
     </tr>
   )

  })

  return(
    <tbody>
      {contactLists}
      </tbody>

  )

}



export default ListComponent
