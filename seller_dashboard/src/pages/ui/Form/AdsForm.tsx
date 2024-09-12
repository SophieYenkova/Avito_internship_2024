import React from "react";
import { Form, Input, InputNumber } from "antd";
import "./AdsForm.css";
import { ValidateErrorEntity } from "rc-field-form/lib/interface";
import { useDispatch, useSelector } from "react-redux";
import { setImage } from "../../../shared/store/imageSlice";

export interface AdsFormValues {
  name: string;
  description?: string;
  imageUrl?: string;
  price: number;
}

interface AdsFormProps {
  onFinish: (values: AdsFormValues) => void;
}

const onFinishFailed = (errorInfo: ValidateErrorEntity<AdsFormValues>) => {
  console.log("Failed:", errorInfo);
};

const AdsForm: React.FC<AdsFormProps> = ({ onFinish }) => {
  const dispatch = useDispatch();

  const { name, description, imageUrl, price } = useSelector(
    (state) => state.oneAdData.value
  );

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
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item<AdsFormValues>
        label="Название"
        name="name"
        rules={[{ required: true, message: "Пожалуйста, введите название!" }]}
      >
        <Input defaultValue={name} />
      </Form.Item>

      <Form.Item<AdsFormValues> label="Описание" name="description">
        <Input defaultValue={description} />
      </Form.Item>

      <Form.Item<AdsFormValues> label="Фото URl" name="imageUrl">
        <Input onChange={(evt) => handleChange(evt)} defaultValue={imageUrl} />
      </Form.Item>

      <Form.Item<AdsFormValues>
        label="Цена"
        name="price"
        rules={[{ required: true, message: "Пожалуйста, добавьте цену" }]}
      >
        <InputNumber min={0} defaultValue={price} />
      </Form.Item>
    </Form>
  );
};

export default AdsForm;
