import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonContent, IonHeader, IonItem, IonLabel, IonList, IonModal } from '@ionic/react';
import React from 'react';

const EmpDetais: React.FunctionComponent<any> = ({
    isOpen,
    onClose,
    initialData,
}) => {
    const data: any = initialData;
    const ChangeFormatDate=(input:Date)=>{
        let day=(input.getDate());
        let Day=day.toString()
        let month=(input.getMonth()+1);      //getmonth luon tra ve thang - 1
        let Month=month.toString()
        if(day<10)
        {
            Day=`0${day}`
        }     
        if(month<10)
        {
            Month=`0${month}`

        }        
      return `${Day}/${Month}/${input.getFullYear()}`        
    }

    
    // {return `${data.getFullYear()}/${data.getMonth()}/${data.getDay()}`;
    
    return (
        <IonModal isOpen={isOpen}>
            <IonHeader></IonHeader>
            <IonContent fullscreen={true}>
                {data && (
                    <IonCard>
                        <IonCardHeader>
                            <IonCardTitle>Chi Tiết Nhân Viên</IonCardTitle>
                        </IonCardHeader>
                        <IonCardContent>
                            <IonList>
                                <IonItem>
                                    <IonLabel>Mã Nhân Viên</IonLabel>
                                    <IonLabel>{data.EmpId}</IonLabel>
                                </IonItem>
                                <IonItem>
                                    <IonLabel>Tên Nhân Viên</IonLabel>
                                    <IonLabel>{data.FullName}</IonLabel>
                                </IonItem>
                                <IonItem>
                                    <IonLabel>Ngày Sinh</IonLabel>
                                    <IonLabel>{ChangeFormatDate(new Date(data.DateOfBirth))}</IonLabel>
                                </IonItem>
                                <IonItem>
                                    <IonLabel>Số Điện Thoại</IonLabel>
                                    <IonLabel>{data.PhoneNumber}</IonLabel>
                                </IonItem>
                                <IonItem>
                                    <IonLabel>Email</IonLabel>
                                    <IonLabel>{data.Email}</IonLabel>
                                </IonItem>
                                <IonItem>
                                    <IonLabel>Ngày Tạo</IonLabel>
                                    <IonLabel>{ChangeFormatDate(new Date(data.CreatedDate))}</IonLabel>
                                    {/* <IonLabel>{typeof(data.CreatedDate)}</IonLabel> */}
                                </IonItem>
                                <IonItem>
                                    <IonLabel>Ngày Sửa</IonLabel>
                                    <IonLabel>{ChangeFormatDate(new Date(data.UpdatedDate))}</IonLabel>
                                </IonItem>
                            </IonList>
                        </IonCardContent>
                    </IonCard>
                )}

                <IonButton
                    expand="block"
                    onClick={onClose}>
                    Trở về
                </IonButton>
            </IonContent>
        </IonModal>
    );
};

export default EmpDetais;
