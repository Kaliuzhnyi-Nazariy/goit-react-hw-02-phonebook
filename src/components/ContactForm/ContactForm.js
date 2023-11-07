import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const contactSchema = Yup.object().shape({
  name: Yup.string().min(1, "Couldn't be empty").required('Required'),
  number: Yup.number()
    .required('Required')
    .min(7, 'Must have 7 numbers')
    .integer("A phone number can't include a decimal point")
    .min(7, 'Must have 7 numbers'),
});

export const ContactForm = ({ sameContact }) => {
  return (
    <div>
      <h2>Name</h2>
      <Formik
        initialValues={{
          contacts: [],
          name: '',
          number: '',
        }}
        validationSchema={contactSchema}
        onSubmit={(values, actions) => {
          // if (sameContact(values)) {
          //   actions.resetForm();
          //   return;
          // }
          // actions.resetForm();
          sameContact(values);
        }}
      >
        <Form>
          <label htmlFor="name">Name</label>
          <Field id="name" name="name" />
          <ErrorMessage name="name"></ErrorMessage>
          <label htmlFor="number">Number</label>
          <Field id="number" name="number" type="tel" />
          <ErrorMessage name="number"></ErrorMessage>
          <button type="submit" onSubmit={sameContact}>
            Add contact
          </button>
        </Form>
      </Formik>
    </div>
  );
};
