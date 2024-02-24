import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { Button, Form, Input } from 'antd'
import { useMutation } from '@apollo/client'
import { ADD_PERSON, GET_PEOPLE } from '../graphql/queries'
import { PeopleTitle } from '../layout/Title'

const AddPerson = () => {
  const [id] = useState(uuidv4())
  const [form] = Form.useForm()
  const [, forceUpdate] = useState()

  const [addPerson] = useMutation(ADD_PERSON)

  useEffect(() => {
    forceUpdate({})
  }, [])

  const onFinish = values => {
    const { firstName, lastName } = values

    addPerson({
      variables: {
        id,
        firstName,
        lastName
      },
      update: (cache, { data: { addPerson } }) => {
        const data = cache.readQuery({ query: GET_PEOPLE })
        cache.writeQuery({
          query: GET_PEOPLE,
          data: {
            ...data,
            people: [...data.people, addPerson]
          }
        })
      }
    })
  }

  return (
    <>
      <PeopleTitle />
      <Form
        name='add-person-form'
        layout='inline'
        size='large'
        style={{ marginBottom: '40px'}}
        form={form}
        onFinish={onFinish}
      >
        <Form.Item
          name='firstName'
          rules={[{ required: true, message: 'Enter first name'}]}>
          <Input placeholder='i.e. Hiroki' />
        </Form.Item>

        <Form.Item
          name='lastName'
          rules={[{ required: true, message: 'Enter last name'}]}>
          <Input placeholder='i.e. Takaya' />
        </Form.Item>

        <Form.Item shouldUpdate={true}>
          {() => (
            <Button
              type='primary'
              htmlType='submit'
              disabled={
                !form.isFieldsTouched(true) || form.getFieldsError().filter(({ errors }) => errors.length).length
              }>
              Add Person
            </Button>
          )}
        </Form.Item>
      </Form>
    </>
  )
}

export default AddPerson