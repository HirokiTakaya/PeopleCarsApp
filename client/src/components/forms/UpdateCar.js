import { useEffect, useState } from "react"
import { Button, Form, Input, Dropdown, Menu } from 'antd'
import { useMutation } from "@apollo/client"
import { GET_PEOPLE, UPDATE_CAR } from "../graphql/queries"
import { useQuery } from "@apollo/client"
import { UserOutlined } from '@ant-design/icons'

const UpdateCar = props => {
    const { id, year, make, model, price, personId } = props
    const [form] = Form.useForm()
    const [, forceUpdate] = useState()
    const { loading, error, data } = useQuery(GET_PEOPLE)
    const [selectedPerson, setSelectedPerson] = useState(null);

    const [updateCar] = useMutation(UPDATE_CAR) 

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
    
        updateCar({
          variables: {
            id,
            year,
            make,
            model,
            price,
            personId
          }
        })
        props.onButtonClick()
    }

    useEffect(() => {
        forceUpdate()
      }, [])
    
    return (
        <Form
            name='update-car-form'
            layout='inline'
            form={form}
            initialValues={{
                year,
                make,
                model,
                price,
                personId
            }}
            onFinish={onFinish}>

            <Form.Item 
                name='year' 
                rules={[{ required: true, message: 'Enter year' }]}>
                <Input placeholder='2024' />
            </Form.Item>

            <Form.Item 
                name='make' 
                rules={[{ required: true, message: 'Enter make' }]}>
                <Input placeholder='Make' />
            </Form.Item>

            <Form.Item 
                name='model' 
                rules={[{ required: true, message: 'Enter model' }]}>
                <Input placeholder='Model' />
            </Form.Item>

            <Form.Item 
                name='price' 
                rules={[{ required: true, message: 'Enter price' }]}>
                <Input placeholder='0.00' />
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
                        form.getFieldValue('year') === year && form.getFieldValue('make') === make && form.getFieldValue('model') === model && form.getFieldValue('price') === price && form.getFieldValue('personId') === personId
                    }>
                    Update Car
                </Button>
                )}
            </Form.Item>

            <Button onClick={props.onButtonClick}>Cancel</Button>
        </Form>
    )
}

export default UpdateCar