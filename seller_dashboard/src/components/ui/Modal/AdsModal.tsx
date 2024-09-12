import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Modal } from "antd";
import GradientButton from "../Button/GradientButton";
import AdsForm, { AdsFormValues } from "../Form/AdsForm";
import AdsImage from "../Image/AdsImage/AdsImage";
import { setImage } from "../../../utils/store/imageSlice";
import "./AdsModal.css";
import { AdsModalMode } from "../../../app/types/enums";
import { Advertisement } from "../../../app/types/types";
import {
  useAddAdvertisementMutation,
  useUpdateAdvertisementMutation,
} from "../../../utils/api/api";

interface AdsModalProps {
  buttonText: string;
  mode: AdsModalMode;
  adsId?: string;
  adsData?: Advertisement;
}

const AdsModal: React.FC<AdsModalProps> = ({
  buttonText,
  mode,
  adsId,
  adsData,
}) => {
  const [open, setOpen] = useState(false);
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
          <div className="adsModal_imageWrapper">
            <AdsImage imageUrl={adsData?.imageUrl} />
          </div>
          <div className="adsModal_formWrapper">
            <AdsForm onFinish={handleOk} adsData={adsData} />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default AdsModal;
