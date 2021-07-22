import React from "react";
import './Student.css';
import { Card, Form, Input, Button, Checkbox, InputNumber  } from 'antd';
import Axios from "axios"

export default class Student extends React.Component {

    constructor(props) {
        super(props);
    this.state ={
        Students:[ ],
        Student:{}
    }
    this.onFinish = this.onFinish.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.Form = React.createRef();

    }
    //  des que cette page se charge affiche moi ça 
componentDidMount(){
    this.getStudent()
}

    //  récupérer la liste
    getStudent(){
        Axios
        //  on récupére l'url
        .get("http://localhost:8000/api/students")
        //  on met l'instruction
        .then((res)=>{
            // console.log(res.data)
this.setState({Students : res.data})
        })
        //  si err affiche
        .catch((err)=>{
            if(err){console.log(err)}
        })
    }

onFinish(values){
    // console.log(values)
    this.setState({student:values});
    const newStudent = {
        firstname : this.state.student.firstname,
        lastname : this.state.student.lastname,
        age : this.state.student.age
    }
    Axios
    .post('http://localhost:8000/api/addStudent', newStudent )
    .then(()=>{
        console.log("Post ok", newStudent)
    })
    .catch((err)=>{
        if(err){console.log(err)}
    })
}
onFinishFailed(){

}

onSelect(value){
console.log(value);
const newStudent = {
    firstname : value.firstname,
    lastname : value.lastname,
    age : value.age,
    id : value.id

}
 console.log(this.Form.current);

this.Form.current.setFieldsValue(newStudent)
}

onDelete(){

}

    render() {
        //  pour executer du JS
        return (
            <> 
            <h1>Liste des étudiants</h1>

            <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={this.onFinish}
      onFinishFailed={this.onFinishFailed}
      ref={this.Form}
            >
        <Form.Item
            rules={[
            {
                                required: false,
                                message: 'Please input product name',
                            },
                        ]}
                    >
           

        </Form.Item>

      <Form.Item
        label="firstname"
        name="firstname"

        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="lastname"
        name="lastname"

        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input />
      </Form.Item>


      <Form.Item
        label="age"
        name="age"

        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <InputNumber  />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Enregistrer
        </Button>
      </Form.Item>
    </Form>

{
    this.state.Students.map(
        (Student, i )=>{
           
    return(   
        
        
        <Card key={i} title={Student.id} extra={<a href="#">More</a>} style={{ width: 300 }}>
        <p>{Student.lastname}</p>
        <p>{Student.firstname}</p>
        <p>{Student.age}</p>
        <Button type="primary" onClick={this.onDelete.bind(this, Student.id)}>
                            Delete
                            </Button>
                            <Button type="primary" onClick={this.onSelect.bind(this, Student)}>
                            Select
                            </Button>
        </Card>
    )
        }
    )
}
            


            </>
        )
    }
}