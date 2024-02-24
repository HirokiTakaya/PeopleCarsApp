import { useEffect, useState } from "react"
import { Button, Form, Input } from "antd"
import { useMutation } from "@apollo/client"
import { UPDATE_PERSON } from "../graphql/queries"

const UpdatePerson = props => {
    const { id, firstName, lastName } = props
    const [form] = Form.useForm()
    const [, forceUpdate] = useState()

    const [updatePerson] = useMutation(UPDATE_PERSON) 

    const onFinish = values => {
        const { firstName, lastName } = values
    
        updatePerson({
          variables: {
            id,
            firstName,
            lastName
          }
        })
        props.onButtonClick()
    }

    useEffect(() => {
        forceUpdate()
      }, [])
    
    return (
        <Form
            name='update-person-form'
            layout='inline'
            form={form}
            initialValues={{
                firstName,
                lastName
            }}
            onFinish={onFinish}>

            <Form.Item 
                name='firstName' 
                rules={[{ required: true, message: 'Enter first name' }]}>
                <Input placeholder='Hiroki' />
            </Form.Item>

            <Form.Item 
                name='lastName' 
                rules={[{ required: true, message: 'Enter last name' }]}>
                <Input placeholder='Takaya' />
            </Form.Item>

            <Form.Item shouldUpdate={true}>
                {() => (
                <Button
                    type='primary'
                    htmlType='submit'
                    disabled={
                        form.getFieldValue('firstName') === firstName && form.getFieldValue('lastName') === lastName
                    }>
                    Update Person
                </Button>
                )}
            </Form.Item>

            <Button onClick={props.onButtonClick}>Cancel</Button>
        </Form>
    )
}

export default UpdatePerson