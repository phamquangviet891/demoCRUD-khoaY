
import React, { useEffect, useState } from 'react';
import useApi from '../../api/posts';
import {  useForm } from 'react-hook-form'
import { IonAccordion, IonAccordionGroup, IonButton, IonContent, IonDatetime, IonHeader, IonInput, IonItem, IonLabel, IonModal, IonTitle, useIonAlert } from '@ionic/react';
import { ErrorMessage } from '@hookform/error-message';
const EditModal: React.FunctionComponent<any> = ({ isOpen, initialData, onClose }) => {
    const {patchEmp} =useApi();
    const user: any = initialData;
    
    const { handleSubmit,
        control,
        setValue,
        register,
        getValues,
        formState: { errors } } = useForm();

    const maxDay = new Date();
    const minDay = new Date();
    maxDay.setFullYear(maxDay.getFullYear() - 18);
    minDay.setFullYear(minDay.getFullYear() - 60);
    const [confirmAlert]=useIonAlert();
    const [date, setDate] = useState();
    const [name, setName] = useState();
    const [place, setplace] = useState();
    const [address, setAddress] = useState();
    const [phone, setPhone] = useState();
    const [mail, setMail] = useState();
    const [alert]=useIonAlert();
    useEffect(()=>{
        if(user)
        {
            setDate(user.DateOfBirth);
            setName(user.FullName)
            setplace(user.Birthplace)
            setAddress(user.Address)
            setPhone(user.PhoneNumber)
            setMail(user.Email)
        }
    },[user])
     
    const editUser = async (data: any) => {
        const emp = {
            FullName: data.fullName,
            DateOfBirth: date,
            Address: data.Address,
            Birthplace: data.Birthplace,
            PhoneNumber: data.phoneNumber,
            Email: data.email,
            UpdatedDate:(new Date()).toJSON()
          }

          confirmAlert({
            header: 'Bạn có thật sự muốn thay đổi thông tin của nhân viên này?',
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
                  
                  const res: any = await patchEmp(user.id,emp);
                  
                  if(res.status==204)
                  {
                    
                    window.location.reload()
                  }
                  else
                  {
                    alert("Không thể thay đ");
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
            {user &&
                <><h2>Sửa Thông Tin Nhân Viên {user.EmpId}</h2>
                    <><form onSubmit={handleSubmit(editUser)}>
                        <IonItem>
                            <IonLabel position="stacked">Tên
                            </IonLabel>
                            <IonInput onIonChange={(e: any) => { setName(e.detail.value); }} value={name} placeholder="Enter text" maxlength={30} {...register('fullName', { required: "*Bắt buộc" })}></IonInput>
                        </IonItem>
                        <ErrorMessage
                            errors={errors}
                            name="fullName"
                            as={<label slot='end' style={{ color: 'red' }} />} />
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
                                    onIonChange={(e: any) => {
                                        setDate(e.detail.value);
                                    }}
                                ></IonDatetime>
                            </IonAccordion>
                        </IonAccordionGroup>
                        <IonItem>
                            <IonLabel position="stacked">Nơi Sinh</IonLabel>
                            <IonInput onIonChange={(e:any)=>{setplace(e.detail.value)}} value={place} placeholder="Enter text" {...register('Birthplace', { required: '*Bắt buộc' })} maxlength={30}></IonInput>
                        </IonItem>
                        <ErrorMessage
                            errors={errors}
                            name="Birthplace"
                            as={<div style={{ color: 'red' }} />} />
                        <IonItem>
                            <IonLabel position="stacked">Địa Chỉ</IonLabel>
                            <IonInput onIonChange={(e:any)=>{setAddress(e.detail.value)}} value={address} placeholder="Enter text" {...register('Address', { required: '*Bắt buộc' })} maxlength={30}></IonInput>
                        </IonItem>
                        <ErrorMessage
                            errors={errors}
                            name="Address"
                            as={<div style={{ color: 'red' }} />} />
                        <IonItem>
                            <IonLabel position="stacked">Số Điện Thoại</IonLabel>
                            <IonInput onIonChange={(e:any)=>{setPhone(e.detail.value)}} value={phone} placeholder="Enter text" type='tel' {...register('phoneNumber', {
                                required: '*Bắt buộc', pattern: {
                                    value: /^[0-9]{10}$/i,
                                    message: 'Vui Lòng Nhập Đúng Số Điện Thoại'
                                }
                            })} maxlength={11}></IonInput>
                        </IonItem>
                        <ErrorMessage
                            errors={errors}
                            name="phoneNumber"
                            as={<div style={{ color: 'red' }} />} />
                        <IonItem>
                            <IonLabel position="stacked">Email</IonLabel>
                            <IonInput onIonChange={(e:any)=>{setMail(e.detail.value)}} value={mail} placeholder="Enter text" {...register('email', {
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
                            as={<div style={{ color: 'red' }} />} />
                        <IonButton type='submit' expand='block' color="primary">Xác nhận</IonButton>
                    </form><IonButton expand='block' onClick={onClose} fill="outline" color="medium">Trở về</IonButton></></>
            }
        </IonContent>
    </IonModal>

}

export default EditModal;