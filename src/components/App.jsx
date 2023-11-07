import { Component } from "react";
import { Formik, Field, Form, ErrorMessage} from 'formik';
import { ContactList } from "./ContactList";
import { nanoid } from 'nanoid'
import * as Yup from 'yup';
import { ContactForm } from "./ContactForm/ContactForm.js";

const contactSchema = Yup.object().shape(
  {
    name: Yup.string().min(1, "Couldn't be empty").required('Required'),
    number: Yup.number().required('Required').min(7, "Must have 7 numbers").integer("A phone number can't include a decimal point").min(7, "Must have 7 numbers")
  }
)

class PhoneBook extends Component {
  state = {
    //  contacts: [],
    contacts: [
    {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
    {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
    {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
    {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
  ],
    name: '',
    filter: ''
  }

  addContact = newContact => {
    this.setState(prevState => {
      return {
        contacts: [...prevState.contacts, {
          ...newContact,
        id: nanoid()}]
    }
  })
  }
  
  deleteContact = contactId => {
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(item => item.id !== contactId)
      }
    })
  }

  contactFilter = contactSearch => {
    this.setState(
      {
        filter: contactSearch,
      }
      
    )
  }

  sameContact = compareNameContact => {
    const comparedName = this.state.contacts.map(item => {
      const nameComparing = item.name.toLocaleLowerCase().includes(compareNameContact.name.toLocaleLowerCase())
      return nameComparing
    })
    if (comparedName.includes(true)) {
      return alert('You have alredy this contact!')
    } 
      this.addContact(compareNameContact)
  }

  render() {
    const { contacts } = this.state;
    const filteredContacts = contacts.filter(item => {
      const nameCont = item.name.toLocaleLowerCase().includes(this.state.filter.toLocaleLowerCase())
      return nameCont ;
    })
    return (

      <div>
        
    <h>Name</h>
    {/* <Formik
        initialValues={{
            contacts: [],
            name: '',
            number: '',

          }}
          validationSchema={contactSchema}
          onSubmit={(values, actions) => {
                      console.log(values);

            if (this.sameContact(values)) {
              actions.resetForm()
              return
            }
            actions.resetForm()
      }}
    >
      <Form>
        <label htmlFor="name">Name</label>
            <Field id="name" name="name" />
            <ErrorMessage name="name"></ErrorMessage>
        <label htmlFor="number">Number</label>
            <Field id="number" name="number" type='tel' />
            <ErrorMessage name="number"></ErrorMessage>
        <button type="submit" onClick={this.onSubmit} >Add contact</button>
      </Form>
        </Formik> */}
        <ContactForm onClick={this.sameContact}></ContactForm>
        {/*  */}  
        <input onChange={e => this.contactFilter(e.target.value)}></input>
        {contacts.length > 0 && <ContactList items={filteredContacts} deleteContact={this.deleteContact} />}
  </div>
      
    )
    
  }
}



export const App = () => {
  return (
    <div
      style={{
        paddingLeft: 20
        // height: '100vh',
        // display: 'flex',
        // justifyContent: 'center',
        // alignItems: 'center',
        // fontSize: 40,
        // color: '#010101'
      }}
    >
          <h1>Name</h1>
      <PhoneBook />
    </div>
  );
};
