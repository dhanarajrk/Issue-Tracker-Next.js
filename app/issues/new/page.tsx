'use client';

import { TextField, Button, Callout, Text, Select } from '@radix-ui/themes'
import SimpleMDE from "react-simplemde-editor";
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import "easymde/dist/easymde.min.css";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod'; //to use validationSchema in client side
import { createIssueSchema } from '@/app/validationSchema';
import { z } from 'zod';
import ErrorMessage from '@/app/components/ErrorMessage';
import Spinner from '@/app/components/Spinner';

/* //Fixed IssueForm structure (for creating issue). Instead we can use z.infer<typeof ScehmaName> to dynamically build IssueForm type using the Schema
type IssueForm = {
  title: string;
  description: string;
}
*/

//Fixed User structure (fetched from /api/users to display in assignee dropdown option) 
interface User {
  id: string;
  name: string | null;
  email: string;
}

type IssueForm = z.infer<typeof createIssueSchema>; //dynamically struct IssueForm type according to createIssueSchema


const NewIssuePage = () => {
  const router = useRouter(); //to redirect page after form submission
  const { register, control, handleSubmit, formState: { errors } } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema) //in useForm hook resolver object is inserted with validation Scehma rule to validate in client side also
  }); //useForm<>() function returns an object that contains a function called register(), So we destruct it get {register}. The use of useForm<FormTypeStructure>() to we verify the defined structure before sending the data to backend
  //console.log(register('title')); //register('anyname') func will return an object with 4 properties like { name, onChange, onBlur, ref}. So we want these properties to be added as props in Input Component using spread operation
  const [error, setError] = useState(''); //to set Custom Error Message
  const [isSubmitting, setSubmitting] = useState(false); //submit loading spinner
  const [users, setUsers] = useState<User[]>([]); //to store fetced users from api/users

  //useEffect to fetch users immediately
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/api/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Failed to fetch users', error);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className='max-w-xl mx-auto'>

      {error && <Callout.Root color='red' className='mb-5'>  {/*Dynamically render error notification If there is error,  */}
        <Callout.Text>{error}</Callout.Text>
      </Callout.Root>}

      <form className='space-y-3'
        onSubmit={handleSubmit(async (data) => {
          try {
            setSubmitting(true);
            await axios.post('/api/issues', data); //Submit the form to backend API route
            router.push('/issues/list'); //Redirect user to /issues page after form is submitted
          } catch (error) {
            setSubmitting(false);
            setError('Unexpected error occurs during submission!');
          }
        }
        )}>


        <TextField.Root placeholder="Title" {...register('title')} /> {/* run register('definedFieldName') and add its returned properties as attributes using spread operator. Finally it will return as {definedFieldName: 'Bug-1(whatever use typed in input field'} */}
        {/* Client-side title validation: if there exist formState.errors (already destrcuted above as {errors}) during form submission, display that error */}
        {errors.title && <ErrorMessage>{errors.title.message}</ErrorMessage>}


        {/* since SimpleMDE is not direct <input> field so it doesn't accept props directly from {...register()} so we need <Controller /> to act as bridge to react-hook-form */}
        <Controller
          name='description'
          control={control}
          render={({ field }) => <SimpleMDE placeholder="Description" {...field} />}  // {field} is nothing but destructed object that contains {register} properties
        />
        {/* Client-side description validation */}
        {errors.description && <ErrorMessage>{errors.description.message}</ErrorMessage>}

        {/*Assignee Dropdown */}
        <div className='flex items-center justify-between'>
          <Controller
            name='assignedToUserId'
            control={control}
            render={({ field }) => (
              <Select.Root defaultValue={field.value || ''} onValueChange={field.onChange}>
                <Select.Trigger placeholder='Assign to user...' />
                <Select.Content>
                  {users.map(user => (
                    <Select.Item key={user.id} value={user.id}>
                      {user.name || user.email}
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Root>
            )
            }
          />

          <Button disabled={isSubmitting}> Submit New Issue {isSubmitting && <Spinner />} </Button> {/*defaults to type="submit" */}
        </div>

      </form>

    </div>
  )
}

export default NewIssuePage