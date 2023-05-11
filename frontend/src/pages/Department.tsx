import { IonCard, IonContent, IonFab, IonFabButton, IonFabList, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonPage, IonTitle, IonToolbar, useIonAlert, useIonLoading, useIonViewWillEnter } from '@ionic/react';
import React, { useState } from 'react';
import DepartmentApi from '../api/Department';
import { v4 } from 'uuid';
import { add, addCircle, createOutline, ellipsisVerticalSharp, eye, peopleOutline, trash } from 'ionicons/icons';
import AddDeparment from '../components/Department/Add';
import PeopleDeparment from '../components/Department/People';
const Department: React.FC = () => {
    const [departments, setDepartments] = useState([{}]);
    const [department,setDepartment]=useState();
    const [addDeparment, setAddDepartment] = useState({ isOpen: false })
    const { GetDepartment, DelDeparment } = DepartmentApi();
    const [confirmAlert] = useIonAlert();
    const [Alert] = useIonAlert();
    const [loading, dismiss] = useIonLoading()
    const [peopleDeparment,setPeopleDeparment]=useState({isOpen:false})
    const getDepartments = async () => {
        const resul = await GetDepartment();
        setDepartments([...resul.data]);
    }
    useIonViewWillEnter(() => {
        getDepartments();
    })
    const DelAparmentButton = (id: string) => {
        confirmAlert({
            header: "Bạn có thật sự muốn xóa phòng này?",
            buttons: [
                {
                    text: "Hủy",
                    role: "cancel",
                    handler: () => { },
                },
                {
                    text: "Ok",
                    role: "confirm",
                    handler: async () => {
                        const res: any = await DelDeparment(id);
                        if (res.status == 204) {
                            await loading;
                            Alert({
                                header: "Xóa Thành Công",
                                buttons: [
                                    {
                                        text: "OK",
                                        role: "confirm",
                                        handler: async () => {
                                            await dismiss;
                                            window.location.reload();
                                        }
                                    }
                                ]
                            })
                        }
                        else {
                            Alert("Không thể xóa");
                        }
                    },
                }
            ]
        }
        )
    }

    const onClickPeopleButton=(deparment:any)=>{
        setDepartment(deparment);
        setPeopleDeparment({isOpen:!peopleDeparment.isOpen})
    }
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>
                        Phòng
                    </IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <IonList>
                    {departments && departments.map((el: any) => {
                        return (
                            <IonCard key={v4()}>
                                <IonItem>
                                    <IonLabel onClick={()=>{
                                        
                                    }}>
                                    {el.Name}
                                    </IonLabel>
                                    <IonFab horizontal='end' slot='end'>
                                        <IonFabButton
                                            size="small"
                                            color="medium">
                                            <IonIcon
                                                icon={ellipsisVerticalSharp}></IonIcon>
                                        </IonFabButton>
                                        <IonFabList side="start">
                                            <IonFabButton
                                                color="danger"
                                                onClick={() => { DelAparmentButton(el.id) }}
                                            >

                                                <IonIcon icon={trash}></IonIcon>
                                            </IonFabButton>
                                            <IonFabButton
                                                color="primary"
                                            // onClick={onClickEdit}
                                            >
                                                <IonIcon icon={createOutline}></IonIcon>
                                            </IonFabButton>
                                            <IonFabButton
                                                color="success"
                                            // onClick={onClickDetails}
                                            >
                                                <IonIcon icon={eye}></IonIcon>
                                            </IonFabButton>
                                            <IonFabButton
                                                color="primary"
                                            onClick={()=>{onClickPeopleButton(el)}}
                                            >
                                                <IonIcon icon={peopleOutline}></IonIcon>
                                            </IonFabButton>
                                        </IonFabList>
                                    </IonFab>
                                </IonItem>
                            </IonCard>
                        )
                    })}
                </IonList>
                <IonFab horizontal="center">
                    <IonFabButton onClick={() => { setAddDepartment({ isOpen: !addDeparment.isOpen }) }}>
                        <IonIcon icon={add}></IonIcon>
                    </IonFabButton>
                </IonFab>
                <AddDeparment isOpen={addDeparment.isOpen}
                    onClose={() => {
                        setAddDepartment({ isOpen: !addDeparment.isOpen })
                    }}
                />
                <PeopleDeparment isOpen={peopleDeparment.isOpen}
                onClose={()=>{
                    setPeopleDeparment({isOpen:!peopleDeparment.isOpen})
                }}
                depart={department}
                />
            </IonContent>
        </IonPage>
    );
};

export default Department;