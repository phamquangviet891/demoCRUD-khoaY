
import React, { useEffect, useState } from 'react';
import CertificateApi from '../../api/Certificate';
import {  useForm } from 'react-hook-form'
import { IonAccordion, IonAccordionGroup, IonButton, IonContent, IonDatetime, IonHeader, IonInput, IonItem, IonLabel, IonModal, IonTitle, useIonAlert} from '@ionic/react';
import { ErrorMessage } from '@hookform/error-message';
const Edit: React.FunctionComponent<any> = ({ isOpen, initialData, onClose }) => {
    const { EditCertificate } = CertificateApi();
    const certi: any = initialData;
    
    const { handleSubmit,
        control,
        setValue,
        register,
        getValues,
        formState: { errors } } = useForm();
    const today=new Date();
    const maxDay = new Date();
    const minDay = new Date();
    maxDay.setFullYear(maxDay.getFullYear() + 20);
    minDay.setFullYear(minDay.getFullYear() - 20);
    const [confirmAlert] = useIonAlert();
    const [issuedDate, setIssuedDate] = useState();
    const [expiredDate, setExpiredDate] = useState();
    const [name,setName]=useState()
    const [alert] = useIonAlert();

    useEffect(()=>{
        if(certi)
        {
            setIssuedDate(certi.IssuedDate);
            setName(certi.Name)

            setExpiredDate(certi.ExpiredDate)
        }
    },[certi])

    const editUser = async (data: any) => {
        const flag = {
            Name: data.Name,
            IssuedDate:issuedDate,
            ExpiredDate:expiredDate,
            UpdatedDate:(new Date).toJSON() 
        }

        confirmAlert({
            header: 'Bạn có thật sự muốn thay đổi thông tin của chứng chỉ này?',
            buttons: [
                {
                    text: 'Hủy',
                    role: 'cancel',
                    handler: () => {

                    },
                },
                {
                    text: 'OK',
                    role: 'confirm',
                    handler: async () => {

                        const res: any = await EditCertificate(certi.id, flag);

                        if (res.status == 204) {

                            window.location.reload()
                        }
                        else {
                            alert("Không thể thay đổi");
                        }
                    },
                },
            ],
        })

    }



    return <IonModal isOpen={isOpen}  >
        <IonHeader>
            <IonTitle></IonTitle>
        </IonHeader>
        <IonContent fullscreen={true} >
            {certi &&
                <><h2>Sửa Thông Tin Chứng Chỉ {certi.Name}</h2>
                    <><form onSubmit={handleSubmit(editUser)}>
                        <IonItem>
                            <IonLabel position="stacked">Loại
                            </IonLabel>
                            <IonInput onIonChange={(e: any) => { setName(e.detail.value); }} value={name} placeholder="Enter text" maxlength={30} {...register('Name', { required: "*Bắt buộc" })}></IonInput>
                        </IonItem>
                        <ErrorMessage
                            errors={errors}
                            name="Name"
                            as={<label slot='end' style={{ color: 'red' }} />} />
                        <IonAccordionGroup>
                            <IonAccordion>
                                <IonItem slot='header'>
                                    <IonLabel>
                                        Ngày Cấp
                                    </IonLabel>
                                </IonItem>
                                <IonDatetime
                                    slot='content'
                                    id='birthday'
                                    presentation='date'
                                    value={issuedDate}
                                    max={today.toJSON()}
                                    min={minDay.toJSON()}
                                    onIonChange={(e: any) => {
                                        setIssuedDate(e.detail.value);
                                    }}
                                ></IonDatetime>
                            </IonAccordion>
                        </IonAccordionGroup>
                        <IonAccordionGroup>
                            <IonAccordion>
                                <IonItem slot='header'>
                                    <IonLabel>
                                        Ngày Hết Hạn
                                    </IonLabel>
                                </IonItem>
                                <IonDatetime
                                    slot='content'
                                    id='birthday'
                                    presentation='date'
                                    value={expiredDate}
                                    max={maxDay.toJSON()}
                                    min={today.toJSON()}
                                    onIonChange={(e: any) => {
                                        setExpiredDate(e.detail.value);
                                    }}
                                ></IonDatetime>
                            </IonAccordion>
                        </IonAccordionGroup>
                        <IonButton expand='block' type='submit'>Edit</IonButton>
                    </form>
                    
                    <IonButton expand='block' onClick={onClose} fill="outline" color="medium">Cancel</IonButton></></>
            }
        </IonContent>
    </IonModal>

}

export default Edit;