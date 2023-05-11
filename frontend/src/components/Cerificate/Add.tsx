import {
    IonAccordion,
    IonAccordionGroup,
    IonButton,
    IonContent,
    IonDatetime,
    IonHeader,
    IonInput,
    IonItem,
    IonLabel,
    IonModal,
    IonTitle,
    useIonAlert,
} from "@ionic/react";
import React, { useState } from "react";
import CertificateApi from "../../api/Certificate";
import {  useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
const Add: React.FunctionComponent<any> = ({ isOpen, onClose,initialId }) => {
    const { AddCertificate } = CertificateApi();
    const today=new Date();
    const maxDay = new Date();
    const minDay = new Date();
    maxDay.setFullYear(maxDay.getFullYear() + 20);
    minDay.setFullYear(minDay.getFullYear() -20);
    const [issuedDate, setIssuedDate] = useState(today.toJSON());
    const [expiredDate, setExpiredDate] = useState(today.toJSON());
    const [confirmAlert] = useIonAlert();
    const [Alert] = useIonAlert();
    const id=initialId;
    const {
        handleSubmit,
        control,
        setValue,
        register,
        getValues,
        formState: { errors },
    } = useForm();
    const addCertificate = async (data: any) => {
        const certi = {
            Name: data.name,
            IssuedDate: issuedDate,
            ExpiredDate:expiredDate,  
            CreatedDate:(new Date()).toJSON(),
            UpdatedDate:(new Date()).toJSON(), 
            employeeId:id,
        };
        confirmAlert({
            header: "Bạn có thật sự muốn thêm chứng chỉ này?",
            buttons: [
                {
                    text: "Hủy",
                    role: "cancel",
                    handler: () => {},
                },
                {
                    text: "OK",
                    role: "confirm",
                    handler: async () => {
                        const res: any = await AddCertificate(certi);

                        if (res.status == 200) {
                            
                            window.location.reload();
                        } else {
                            Alert("Không thể thêm");
                        }
                    },
                },
            ],
        });
    };

    return (
        <IonModal isOpen={isOpen}>
            <IonHeader>
                <IonTitle>Thêm Chứng Chỉ</IonTitle>
            </IonHeader>
            <IonContent fullscreen={true}>
                <form onSubmit={handleSubmit(addCertificate)}>
                    <IonItem>
                        <IonLabel position="stacked">Tên Chứng Chỉ</IonLabel>
                        <IonInput
                            placeholder="Enter text"
                            maxlength={30}
                            {...register("name", {
                                required: "*Bắt buộc",
                            })}></IonInput>
                    </IonItem>
                    <ErrorMessage
                        errors={errors}
                        name="name"
                        as={<div style={{ color: "red" }} />}
                    />
                    <IonItem>
                    <IonAccordionGroup>
                        <IonAccordion>
                            <IonItem slot="header">
                                <IonLabel>Ngày cấp</IonLabel>
                            </IonItem>
                            <IonDatetime
                                slot="content"
                                id="IssuedDate"
                                presentation="date"
                                value={issuedDate}
                                max={today.toJSON()}
                                min={minDay.toJSON()}
                                onIonChange={(e: any) => {
                                    setIssuedDate(e.detail.value);
                                }}></IonDatetime>
                        </IonAccordion>
                    </IonAccordionGroup>
                    </IonItem>
                    <IonItem>
                    <IonAccordionGroup>
                        <IonAccordion>
                            <IonItem slot="header">
                                <IonLabel>Ngày hết hạn</IonLabel>
                            </IonItem>
                            <IonDatetime
                                slot="content"
                                id="ExpiredDate"
                                presentation="date"
                                value={expiredDate}
                                max={maxDay.toJSON()}
                                min={today.toJSON()}
                                onIonChange={(e: any) => {
                                    setExpiredDate(e.detail.value);
                                }}></IonDatetime>
                        </IonAccordion>
                    </IonAccordionGroup>
                    </IonItem>
                    <IonButton
                        type="submit"
                        expand="block">
                        {" "}
                        Thêm
                    </IonButton>
                </form>
                <IonButton
                    expand="block"
                    onClick={onClose}
                    color="medium"
                    fill="outline">
                    Cancel
                </IonButton>
            </IonContent>
        </IonModal>
    );
};

export default Add;
