import {  IonButton,  IonCard,  IonContent, IonFab, IonFabButton, IonFabList, IonHeader, IonIcon, IonItem, IonList,  IonModal, IonTitle, IonToolbar, useIonAlert,  } from '@ionic/react';
import { add, createOutline, ellipsisVerticalSharp, eye, trash } from 'ionicons/icons';
import React, { useEffect, useState } from 'react';
import useApi from '../../api/posts';
import { CertificateApi } from '../../api/Certificate';
import Add from '../../components/Cerificate/Add';
import { v4 } from 'uuid';
import View from './View';
import Edit from './Edit';

const Certificate: React.FunctionComponent<any> = ({isOpen,onClose,initialData}) => {
    const { getCertificate } = useApi()
    const {DelCertificate}=CertificateApi()
    const [presentAlert]=useIonAlert();
    
    const property:any=initialData;
    const [data, setdata] = useState<any>([{}]);
    const [addModal,setAddModal]=useState({isOpen:false})
    const [viewModal,setViewModal]=useState({isOpen:false})
    const [editModal,setEditModal]=useState({isOpen:false})
    const [certificate,setCertificate]=useState()
    useEffect(()=>{
        const getData=async()=>{    
            if(property)
            {    
            const res=await getCertificate(property.id)
            
            setdata([...res.data]);  
            }
        }
        getData();
    },[initialData])
    
    const onClickDel = async (id: string) => {
        presentAlert({
            header: "Bạn có thật sự muốn xóa?",
            buttons: [
                {
                    text: "Hủy",
                    role: "cancel",
                    handler: () => { },
                },
                {
                    text: "OK",
                    role: "confirm",
                    handler: async () => {
                        const res: any = await DelCertificate(id);
                        if(res.status===204)
                        {
                            window.location.reload();
                        } else {
                            alert("Không thể xóa");
                        }
                    },
                },
            ],
        });
    };

    const onClickViewButton=async (data:any)=>{
        setViewModal({isOpen:!viewModal.isOpen});
        
        setCertificate(data)
    }
    const onClickEditButton=async (data:any)=>{
        setEditModal({isOpen:!viewModal.isOpen});
        setCertificate(data)
    }


    
    
    return (
        <IonModal isOpen={isOpen}>
            <IonHeader>
            <IonToolbar>
                <IonTitle >
                        Chứng Chỉ
                        </IonTitle>
            </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <IonList>
                    {data.map((el:any)=>{
                        return(
                            <IonCard key={v4()}>
                                <IonItem>
                                    {el.Name}
                                    <IonFab
                                    slot="end"
                                    horizontal="end">
                                    <IonFabButton
                                        size="small"
                                        color="medium">
                                        <IonIcon
                                            icon={ellipsisVerticalSharp}></IonIcon>
                                    </IonFabButton>
                                    <IonFabList side="start">
                                        <IonFabButton
                                            color="danger"
                                            onClick={()=>{onClickDel(el.id)}}>
                                            <IonIcon icon={trash}></IonIcon>
                                        </IonFabButton>
                                        <IonFabButton
                                            color="primary"
                                            onClick={()=>onClickEditButton(el)}                                  >
                                            <IonIcon icon={createOutline}></IonIcon>
                                        </IonFabButton>
                                        <IonFabButton
                                            color="success"
                                            onClick={()=>onClickViewButton(el)}
                                            >
                                            <IonIcon icon={eye}></IonIcon>
                                        </IonFabButton>
                                    </IonFabList>
                                </IonFab>
                                </IonItem>
                            </IonCard>
                        )
                    })}
                </IonList>
                <IonButton expand='block' onClick={onClose}
                >Cancel</IonButton>
                <IonFab
                    horizontal="center"
                    vertical="bottom">
                    <IonFabButton
                        onClick={() => {
                            setAddModal({
                                isOpen: !addModal.isOpen,
                            });
                        }}>
                        <IonIcon icon={add}></IonIcon>
                    </IonFabButton>
                </IonFab>


                {property&& (<><Add
                    isOpen={addModal.isOpen}
                    onClose={() => setAddModal({ isOpen: !addModal.isOpen })}
                    initialId={property.id} />
                    <View 
                    isOpen={viewModal.isOpen}
                    onClose={()=>setViewModal({isOpen:!viewModal.isOpen})}
                    initialData={certificate}
                    />
                    <Edit isOpen={editModal.isOpen}
                    onClose={()=>setEditModal({isOpen:!editModal.isOpen})}
                    initialData={certificate}
                     />
                    </>
                )
                }
            </IonContent>
        </IonModal>
    );
};

export default Certificate;