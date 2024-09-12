import React, { useState } from "react";
import { Modal } from "antd";
import GradientButton from "../Button/GradientButton";
import AdsForm, { AdsFormValues } from "../Form/AdsForm";
import {
  useAddAdvertisementMutation,
  useUpdateAdvertisementMutation,
} from "../../../shared/api/api";
import { useNavigate } from "react-router-dom";
import AdsImage from "../Image/AdsImage";
import { useDispatch, useSelector } from "react-redux";
import { setImage } from "../../../shared/store/imageSlice";
import "./AdsModal.css";
import { IAdsProps } from "../../../app/types/types";

import { AdsModalMode } from "../../../app/types/enums";

interface AdsModalProps {
  buttonText: string;
  mode: AdsModalMode;
  adsData?: IAdsProps;
  adsId?: string;
}

const AdsModal: React.FC<AdsModalProps> = ({ buttonText, mode, adsId }) => {
  const [open, setOpen] = useState(false);
  const imageValue = useSelector((state) => state.image.value);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [confirmLoading, setConfirmLoading] = useState(false);

  const [addAdvertisement, { isLoading: isAdding }] =
    useAddAdvertisementMutation();
  const [updateAdvertisement, { isLoading: isUpdating }] =
    useUpdateAdvertisementMutation();

  const isLoading = mode === AdsModalMode.UPDATE ? isUpdating : isAdding;

  const handleOk = (values: AdsFormValues) => {
    setConfirmLoading(true);
    const action =
      mode === AdsModalMode.UPDATE
        ? updateAdvertisement({ id: adsId, data: values })
        : addAdvertisement(values);

    action
      .unwrap()
      .then((resp) => {
        navigate(`/advertisements/${resp.id}`);
        window.location.reload();
      })
      .catch(() => {
        Modal.error({
          title: "Ошибка",
          content:
            mode === AdsModalMode.UPDATE
              ? "Не удалось обновить объявление. Попробуйте снова позже."
              : "Не удалось создать объявление. Попробуйте снова позже.",
        });
      })
      .finally(() => {
        setConfirmLoading(false);
        setOpen(false);
      });
  };

  const handleCancel = () => {
    dispatch(setImage(""));
    setOpen(false);
  };

  const showModal = () => setOpen(true);

  return (
    <>
      <GradientButton buttonText={buttonText} handleButtonClick={showModal} />
      <Modal
        title={
          mode === AdsModalMode.UPDATE
            ? "Обновить объявление"
            : "Создать новое объявление"
        }
        open={open}
        okText={mode === AdsModalMode.UPDATE ? "Обновить" : "Создать"}
        cancelText="Отмена"
        onCancel={handleCancel}
        okButtonProps={{
          form: "adsModalForm",
          autoFocus: true,
          htmlType: "submit",
        }}
        confirmLoading={confirmLoading || isLoading}
        destroyOnClose={true}
      >
        <div className="adsModal_wrapper">
          <AdsImage imageUrl={imageValue} />
          <AdsForm onFinish={handleOk} />
        </div>
      </Modal>
    </>
  );
};

export default AdsModal;
