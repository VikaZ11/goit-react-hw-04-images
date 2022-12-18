import { Formik } from 'formik';
import { BiSearchAlt } from 'react-icons/bi';
import * as Yup from 'yup';
import { Header, StyledForm, Button, Label, Input } from './Searchbar.styled';

const validationSchema = Yup.object({
  query: Yup.string().required(),
});

export const Searchbar = ({ onSubmit }) => {
  const handleSubmit = async (values, actions) => {
    await onSubmit(values);
    actions.setSubmitting(false);
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={{ query: '' }}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {({ isSubmitting }) => (
        <Header>
          <StyledForm>
            <Button type="submit" disabled={isSubmitting}>
              <BiSearchAlt size="40" />
              <Label>Search</Label>
            </Button>

            <Input
              name="query"
              type="text"
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
            />
          </StyledForm>
        </Header>
      )}
    </Formik>
  );
};
