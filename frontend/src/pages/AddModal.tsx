import { IonAccordion, IonAccordionGroup, IonButton, IonCard, IonCol, IonContent, IonDatetime, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonModal, IonPage, IonRow, IonTitle, IonToolbar, useIonAlert, useIonViewWillEnter } from '@ionic/react';
import React, {  useState } from 'react';
import useApi from '../api/posts';
import './AddModal.css'
import { Controller, useForm } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message';
const AddModal: React.FunctionComponent<any> = ({ isOpen, onClose }) => {
  const { addEmp } = useApi()
  const maxDay=new Date();
  const minDay=new Date();
  maxDay.setFullYear(maxDay.getFullYear()-18);
  minDay.setFullYear(minDay.getFullYear()-60);
  const [date,setDate]=useState(maxDay.toJSON());
  const [confirmAlert]=useIonAlert();
  const [Alert]=useIonAlert();
  const { handleSubmit,
    control,
    setValue,
    register,
    getValues,
    formState: { errors } } = useForm();
  const registerUser =async (data: any) => {
    const emp = {
      EmpId: data.EmpId,
      FullName: data.fullName,
      DateOfBirth: date,
      Address: data.Address,
      Birthplace: data.Birthplace,
      PhoneNumber: data.phoneNumber,
      Email: data.email
    }
    const res:any = await addEmp(emp);
    confirmAlert({
      header: 'Bạn có thật sự muốn thêm nhân viên này?',
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
            
            const res: any = await addEmp(emp);
            
            if(res.status==200)
            {
              console.log(res.status);
              window.location.reload()
            }
            else
            {
              Alert("Không thể thêm");
            }
          },
        },
      ],
    })
  }

  return <IonModal isOpen={isOpen}  >
    <IonHeader>
      <IonTitle>Thêm Nhân Viên</IonTitle>
    </IonHeader>
    <IonContent fullscreen={true} >
      <form onSubmit={handleSubmit(registerUser)}>
        <IonItem>
          <IonLabel position="stacked">Mã Nhân Viên</IonLabel>
          <IonInput placeholder='Enter text' maxlength={30} {...register('EmpId', { required: "*Bắt buộc" })}></IonInput>
        </IonItem>
        <ErrorMessage
          errors={errors}
          name="EmpId"
          as={<div style={{ color: 'red' }} />}
        />
        <IonItem>
          <IonLabel position="stacked">Tên
          </IonLabel>
          <IonInput placeholder="Enter text" maxlength={30} {...register('fullName', { required: "*Bắt buộc" })} ></IonInput>
        </IonItem>
        <ErrorMessage
          errors={errors}
          name="fullName"
          as={<label slot='end' style={{ color: 'red' }} />}
        />
        <IonAccordionGroup>
        <IonAccordion>
          <IonItem slot='header'>
            <IonLabel>
              Ngày Sinh
            </IonLabel>
            </IonItem>
            <IonDatetime 
            slot='content'
            id='birthday'
            presentation='date'

            value={date}
            max={maxDay.toJSON()}
            min={minDay.toJSON()}
            onIonChange={(e:any)=>{
              setDate(e.detail.value);
              
            }}
            ></IonDatetime>
          
          </IonAccordion>
        </IonAccordionGroup>
        <IonItem>
          <IonLabel position="stacked">Nơi Sinh</IonLabel>
          <IonInput placeholder="Enter text" {...register('Birthplace', { required: '*Bắt buộc' })} maxlength={30}></IonInput>
        </IonItem>
        <ErrorMessage
          errors={errors}
          name="Birthplace"
          as={<div style={{ color: 'red' }} />}
        />
        <IonItem>
          <IonLabel position="stacked">Địa Chỉ</IonLabel>
          <IonInput placeholder="Enter text" {...register('Address', { required: '*Bắt buộc' })} maxlength={30}></IonInput>
        </IonItem>
        <ErrorMessage
          errors={errors}
          name="Address"
          as={<div style={{ color: 'red' }} />}
        />
        <IonItem>
          <IonLabel position="stacked">Số Điện Thoại</IonLabel>
          <IonInput placeholder="Enter text" type='tel' {...register('phoneNumber', {
            required: '*Bắt buộc', pattern: {
              value: /^[0-9]{10}$/i,
              message: 'Vui Lòng Nhập Đúng Số Điện Thoại'
            }
          })} maxlength={30} ></IonInput>
        </IonItem>
        <ErrorMessage
          errors={errors}
          name="phoneNumber"
          as={<div style={{ color: 'red' }} />}
        />
        <IonItem>
          <IonLabel position="stacked">Email</IonLabel>
          <IonInput placeholder="Enter text"  {...register('email', {
            required: '*Bắt buộc',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: 'Vui Lòng Nhập Đúng Email'
            }
          })} maxlength={30}></IonInput>
        </IonItem>
        <ErrorMessage
          errors={errors}
          name="email"
          as={<div style={{ color: 'red' }} />}
        />

        <IonButton type='submit' expand='block'> Thêm</IonButton>
      </form>
      <IonButton expand='block' onClick={onClose}>Cancel</IonButton>
    </IonContent>
  </IonModal>
}

export default AddModal;

