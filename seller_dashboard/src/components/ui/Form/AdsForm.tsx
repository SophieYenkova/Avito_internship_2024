import React from "react";
import { Form, Input, InputNumber } from "antd";
import "./AdsForm.css";
import { ValidateErrorEntity } from "rc-field-form/lib/interface";
import { useDispatch } from "react-redux";
import { setImage } from "../../../utils/store/imageSlice";
import { Advertisement } from "../../../app/types/types";

export interface AdsFormValues {
  name: string;
  description?: string;
  imageUrl?: string;
  price: number;
}

interface AdsFormProps {
  onFinish: (values: AdsFormValues) => void;
  adsData?: Advertisement
}

const onFinishFailed = (errorInfo: ValidateErrorEntity<AdsFormValues>) => {
  console.log("Failed:", errorInfo);
};

const AdsForm: React.FC<AdsFormProps> = ({ onFinish, adsData }) => {
  const dispatch = useDispatch();

  const handleChange = (evt) => {
    dispatch(setImage(evt.target.value));
  };

  return (
    <Form
      className="adsForm"
      name="adsModalForm"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={adsData}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item<AdsFormValues>
        label="Название"
        name="name"
        rules={[{ required: true, message: "Пожалуйста, введите название!" }]}
      >
        <Input/>
      </Form.Item>

      <Form.Item<AdsFormValues> label="Описание" name="description">
        <Input/>
      </Form.Item>

      <Form.Item<AdsFormValues> label="Фото URl" name="imageUrl">
        <Input onChange={(evt) => handleChange(evt)} />
      </Form.Item>

      <Form.Item<AdsFormValues>
        label="Цена"
        name="price"
        rules={[{ required: true, message: "Пожалуйста, добавьте цену" }]}
      >
        <InputNumber min={0}/>
      </Form.Item>
    </Form>
  );
};

export default AdsForm;
