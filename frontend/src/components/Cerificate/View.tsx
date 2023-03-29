import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonContent, IonHeader, IonItem, IonLabel, IonList, IonModal } from '@ionic/react';
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

    
    return (
        <IonModal isOpen={isOpen}>
            <IonHeader></IonHeader>
            <IonContent fullscreen={true}>
                {data && (
                    <IonCard>
                        <IonCardHeader>
                            <IonCardTitle>Chi Tiết Chứng Chỉ</IonCardTitle>
                        </IonCardHeader>
                        <IonCardContent>
                            <IonList>
                                <IonItem>
                                    <IonLabel>Loại Chứng Chỉ</IonLabel>
                                    <IonLabel>{data.Name}</IonLabel>
                                </IonItem>
                            
                                <IonItem>
                                    <IonLabel>Ngày Cấp</IonLabel>
                                    <IonLabel>{ChangeFormatDate(new Date(data.IssuedDate))}</IonLabel>
                                </IonItem>
                                <IonItem>
                                    <IonLabel>Ngày Hết Hạn</IonLabel>
                                    <IonLabel>{ChangeFormatDate(new Date(data.ExpiredDate))}</IonLabel>
                                </IonItem>
                                <IonItem>
                                    <IonLabel>Ngày Tạo</IonLabel>
                                    <IonLabel>{ChangeFormatDate(new Date(data.CreatedDate))}</IonLabel>
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
                    Cancel
                </IonButton>
            </IonContent>
        </IonModal>
    );
};

export default EmpDetais;
