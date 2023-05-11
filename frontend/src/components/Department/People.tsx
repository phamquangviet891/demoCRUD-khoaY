import { IonAvatar, IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonModal, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import DepartmentApi from '../../api/Department';
import { add, arrowBackOutline } from 'ionicons/icons';
import AddEmployee from './AddEmp';
import useApi from '../../api/posts';

const PeopleDeparment: React.FunctionComponent<any> = ({ depart, isOpen, onClose }) => {
    const department: any =  depart 
    const [emp, setEmp] = useState([{}]);
    const [workings,setWorkings]=useState([{}]);
    const { GetWorkingEmp } = DepartmentApi()
    const { findEmp } = useApi()
    const [addEmp, setAddEmp] = useState({ isOpen: false });
    const GetEmpOfDepart = async () => {   
        const res = await GetWorkingEmp(depart.id)
        setWorkings([...res.data]);
        
    }
    useEffect(() => {
        GetEmpOfDepart();
    }, [department])
    useEffect(() => {
        if(workings )
        {
        workings.map(async(el:any)=>{
            const res=await findEmp(el.employeeId);         
            el.FullName=res.data.FullName;           
        })
        setEmp([...workings])
    }
    }, [workings])
    
    return (
        <IonModal isOpen={isOpen}>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot='start'>
                        <IonButton onClick={onClose}>
                            <IonIcon slot='icon-only' icon={arrowBackOutline}></IonIcon>
                        </IonButton>
                    </IonButtons>
                    <IonTitle>Nhân Viên Của Phòng</IonTitle>
                    <IonButtons slot='end'>
                        <IonButton onClick={()=>{setAddEmp({isOpen:!addEmp.isOpen})                    
                        }
                    }>
                            <IonIcon slot='icon-only' icon={add}></IonIcon>
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <IonList>
                    {emp.length && emp.map((el: any) => {
                        return (
                            
                            
                            <IonItem><IonAvatar slot="start">
                                <img
                                    src="https://ionicframework.com/docs/img/demos/avatar.svg"
                                    alt="" />
                            </IonAvatar>
                                <IonLabel>
                                    {el.FullName}
                                </IonLabel>
                                <IonLabel>
                                    {el.Position}
                                </IonLabel>
                                </IonItem>

                        )
                    }) 
                    ||
                        <IonLabel>Phòng chưa có bất kì nhân viên nào!</IonLabel>
                    }
                </IonList>
                <AddEmployee isOpen={addEmp.isOpen}

                onClose={() => {
                    setAddEmp({ isOpen: !addEmp.isOpen })
                }}
                    depart={department}         
                />
            </IonContent>

        </IonModal>
    );
};

export default PeopleDeparment;