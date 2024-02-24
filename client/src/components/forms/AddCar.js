import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { Button, Form, Input, Dropdown, Menu } from 'antd'
import { useMutation } from '@apollo/client'
import { ADD_CAR, GET_PERSON_CARS } from '../graphql/queries'
import { CarTitle } from '../layout/Title'
import { useQuery } from "@apollo/client"
import { GET_PEOPLE } from "../graphql/queries"
import { UserOutlined } from '@ant-design/icons'

const AddCar = () => {
  const [id] = useState(uuidv4())
  const [form] = Form.useForm()
  const [, forceUpdate] = useState()
  const [addCar] = useMutation(ADD_CAR)
  const { loading, error, data } = useQuery(GET_PEOPLE)
  const [selectedPerson, setSelectedPerson] = useState(null);

  useEffect(() => {
    forceUpdate({})
  }, [])

  if (!data || !data.people || !data.people.length) return "";

  const handleMenuClick = (e) => {
    const person = data.people.find(person => person.id === e.key);
    setSelectedPerson(person);
    form.setFieldsValue({ personId: e.key });
  };
  
  const menu = (
    <Menu onClick={handleMenuClick}>
      {data.people.map((person) => (
        <Menu.Item key={person.id}>
          {person.firstName} {person.lastName}
        </Menu.Item>
      ))}
    </Menu>
  );

  const onFinish = values => {
    const { make, model } = values
    const year = parseInt(values.year, 10);
    const price = parseFloat(values.price);
    const personId = selectedPerson.id;

    addCar({
      variables: {
        id,
        year,
        make,
        model,
        price,
        personId
      },
      update: (cache, { data: { addCar } }) => {
        const existingData = cache.readQuery({ query: GET_PERSON_CARS, variables: { personId } });

        cache.writeQuery({
          query: GET_PERSON_CARS,
          variables: { personId },
          data: {
            ...existingData,
            cars: [...existingData.personCars, addCar],
          },
        });
      }
    })
  }

  return (
    <>
      <CarTitle />
      <Form
        name='add-car-form'
        layout='inline'
        size='large'
        style={{ marginBottom: '40px'}}
        form={form}
        onFinish={onFinish}
      >
        <Form.Item
          name='year'
          rules={[{ required: true, message: 'Enter year'}]}>
          <Input placeholder='i.e. 2024' />
        </Form.Item>

        <Form.Item
          name='make'
          rules={[{ required: true, message: 'Enter make'}]}>
          <Input placeholder='i.e. Make' />
        </Form.Item>

        <Form.Item
          name='model'
          rules={[{ required: true, message: 'Enter model'}]}>
          <Input placeholder='i.e. model' />
        </Form.Item>

        <Form.Item
          name='price'
          rules={[{ required: true, message: 'Enter price'}]}>
          <Input placeholder='i.e. price' />
        </Form.Item>

        <Form.Item
          name='personId'
          rules={[{ required: true, message: 'Enter personId'}]}
        >
          <Dropdown overlay={menu}>
            <Button>
              {selectedPerson ? `${selectedPerson.firstName} ${selectedPerson.lastName}` : 'Select Owner'} <UserOutlined />
            </Button>
          </Dropdown>
        </Form.Item>

        <Form.Item shouldUpdate={true}>
          {() => (
            <Button
              type='primary'
              htmlType='submit'
              disabled={
                !form.isFieldsTouched(true) || form.getFieldsError().filter(({ errors }) => errors.length).length
              }>
              Add Car
            </Button>
          )}
        </Form.Item>
      </Form>
    </>
  )
}

export default AddCar