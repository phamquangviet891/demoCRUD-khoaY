import {  IonButton, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonModal, IonPage, IonTitle, IonToolbar, useIonAlert, useIonLoading } from '@ionic/react';
import React from 'react';
import { useForm } from 'react-hook-form';
import DepartmentApi from '../../api/Department';
import { ErrorMessage } from '@hookform/error-message';

const AddDeparment: React.FunctionComponent<any> = ({ isOpen, onClose }) => {
    const { AddDeparment } = DepartmentApi();
    const [confirmAlert]=useIonAlert();
    const [Alert]=useIonAlert();
    const [loading,dismiss]=useIonLoading();
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm();


    const CreateDepartment = async (data: any) => {
        confirmAlert({
            header: "Bạn có thật sự muốn thêm phòng này?",
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
                        const res: any = await AddDeparment(data);

                        if (res.status == 200) {
                            await loading;
                            Alert( {header: "Thêm Thành Công",
                            buttons: [
                                {
                                    text: "OK",
                                    role: "confirm",
                                    handler: async () => {
                                        console.log(res)
                                        await dismiss;
                                        window.location.reload();
                                    }}
                            ]
                        }
                                       
                        )
                            
                        } else {
                            Alert("Không thể thêm");
                        }
                    },
                },
            ],
        })
    }
    return (
        <IonModal isOpen={isOpen}>
            <IonHeader>
                <IonTitle>Thêm Phòng</IonTitle>
            </IonHeader>
            <IonContent>
                <form onSubmit={handleSubmit(CreateDepartment)}>
                    <IonItem>
                        <IonLabel position='stacked'>
                            Name:
                        </IonLabel>
                        <IonInput
                            placeholder='enterText'
                            maxlength={30}
                            {...register("Name", {
                                required: "*Bắt buộc",
                            })}
                        >
                        </IonInput>
                    </IonItem>
                    <ErrorMessage
                        errors={errors}
                        name='Name'
                        as={<div style={{ color: "red" }} />}
                    ></ErrorMessage>

                    <IonButton type='submit' expand='block'>
                        Thêm Phòng
                    </IonButton>
                </form>
                <IonButton
                    onClick={onClose}
                    color="medium"
                    fill="outline"
                    expand='block'>
                    Cancel
                </IonButton>
            </IonContent>
        </IonModal>
    );
};

export default AddDeparment;