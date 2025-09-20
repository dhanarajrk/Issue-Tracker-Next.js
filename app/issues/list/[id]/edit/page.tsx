'use client';

import { patchIssueSchema } from '@/app/validationSchema';
import { z } from 'zod';
import React, { useState, useEffect } from 'react';
import { Button, Callout, Select, TextField } from '@radix-ui/themes';
import { Controller, useForm } from 'react-hook-form';
import axios from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import Spinner from '@/app/components/Spinner';
import ErrorMessage from '@/app/components/ErrorMessage';
import Link from 'next/link';
import { TbTrashX } from "react-icons/tb";
import "easymde/dist/easymde.min.css"; //simpleMDE css format (must import to make SimpleMDE layout work correctly)

import dynamic from 'next/dynamic'; // Use dynamic import with { ssr: false } to load SimpleMDE only in the browser after params/API data, avoiding SSR navigator errors.
const SimpleMDE = dynamic(() => import('react-simplemde-editor'), { ssr: false }); // Load only in browser, not on server

type IssueForm = z.infer<typeof patchIssueSchema>;

interface User {
  id: string;
  name: string | null;
  email: string;
}

interface Props {
  params: Promise<{ id: string }>
}

const EditIssuePage = ({ params }: Props) => { //Even though this is Client Component, "page.jsx" files are passed with props automatically no matter what. (So, we dont need any special client params extraction func such as useParams() or useSearchParams() to extract the params. useParams() or useSearchParams() are only used of pure Client Components in app/components/AnyComponentName.tsx)
  const router = useRouter();                 //Even though we have auto params, we still can't use primsa fetching. So we use axios in page.tsx delcared as 'use client' 

  const [isLoading, setLoading] = useState(true);
  const { register, handleSubmit, control, formState: { errors }, reset } = useForm<IssueForm>({
    resolver: zodResolver(patchIssueSchema)
  }); // since fetching issue is Async, forms defaultValue will not load automatically the fetched values,
  // so reset() will reload the form with new input values from fetched issue
  const [isSubmitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [issueId, setIssueId] = useState<string | null>(null);
  const [isDeleting, setDeleting] = useState(false);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchIssue = async () => {
      try {
        const { id } = await params; // unwrap Promise params id
        setIssueId(id);

        //Fetch users
        const usersResponse = await axios.get('/api/users');
        setUsers(usersResponse.data);

        //Fetch issue data
        const response = await axios.get(`/api/issues/${id}`); //why we dont use prisma.findUnique() ? Its because this page is Client Component Page but prisma. works only for Server component So we use Axios instead in Client declared page
        reset(response.data); //// this will pre-fill the form with the fetched issue data in their respective form fields name
      } catch {
        setError('Issue not found');
      } finally {
        setLoading(false);
      }
    };

    fetchIssue();
  }, [params, reset]);

  if (isLoading) return <Spinner />;
  if (error) {
    return (
      <Callout.Root color='red' className='mb-5'>
        <Callout.Text>{error}</Callout.Text>
      </Callout.Root>
    );
  }

  return (
    <div className='max-w-xl mx-auto'>

      <div className="mb-5">
        <Button variant="soft">
          <Link href={`/issues/list/${issueId}`}>Back to Issue</Link>
        </Button>
      </div>

      <form
        className='space-y-3'
        onSubmit={handleSubmit(async (data) => {
          if (!issueId) return;
          try {
            setSubmitting(true);
            await axios.patch(`/api/issues/${issueId}`, data); //axios.patch means update the db
            router.push('/issues/list');
          } catch {
            setError('An unexpected error occurred.');
          } finally {
            setSubmitting(false); //try block might setSubmitting to true and never revert to false. So finally will take care of reset for setSubmitting 
          }
        })}
      >
        <TextField.Root placeholder='Title' {...register('title')} />
        {errors.title && <ErrorMessage>{errors.title.message}</ErrorMessage>}

        <Controller
          name='description'
          control={control}
          render={({ field }) => <SimpleMDE placeholder='Description' {...field} />}
        />
        {errors.description && <ErrorMessage>{errors.description.message}</ErrorMessage>}

        <div className='space-x-3'>
          <Controller
            name='status'
            control={control}
            render={({ field }) => (
              <Select.Root defaultValue={field.value} onValueChange={field.onChange}>
                <Select.Trigger placeholder='Status...' />
                <Select.Content>
                  <Select.Item value='OPEN'>Open</Select.Item>
                  <Select.Item value='IN_PROGRESS'>In Progress</Select.Item>
                  <Select.Item value='CLOSED'>Closed</Select.Item>
                </Select.Content>
              </Select.Root>
            )}
          />
          {errors.status && <ErrorMessage>{errors.status.message}</ErrorMessage>}

          {/* Add Assignee Dropdown for Editing */}
          <Controller
            name='assignedToUserId'
            control={control}
            render={({ field }) => (
              <Select.Root defaultValue={field.value || ''} onValueChange={field.onChange}>
                <Select.Trigger placeholder='Assign to user...' />
                <Select.Content>
                  <Select.Item value="unassigned">Unassigned</Select.Item>
                  {users.map(user => (
                    <Select.Item key={user.id} value={user.id}>
                      {user.name || user.email}
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Root>
            )}
          />
          {errors.assignedToUserId && <ErrorMessage>{errors.assignedToUserId.message}</ErrorMessage>}
        </div>


        {/* Update and Delete buttons */}
        <div className="flex justify-between mt-4">
          <Button disabled={isSubmitting}>
            Update Issue {isSubmitting && <Spinner />}
          </Button>

          <Button
            color="red"
            disabled={isDeleting}
            onClick={async () => {
              if (!issueId) return;

              try {
                setDeleting(true);
                await axios.delete(`/api/issues/${issueId}`);
                router.push('/issues/list');
                router.refresh(); // Refetch the server components of the redirected page to update the cache (Not full render but Only the server component code runs again to get the updated data and make changes in client with updated cache)
              } catch (error) {
                setError('Failed to delete the issue.');
                setDeleting(false);
              }
            }}
          >
            <TbTrashX /> Delete Issue {isDeleting && <Spinner />}
          </Button>
        </div>

      </form>

    </div>
  );
};

export default EditIssuePage;
