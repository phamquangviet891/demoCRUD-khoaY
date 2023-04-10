import { IonAccordion, IonAccordionGroup, IonButton, IonButtons, IonCol, IonContent, IonFab, IonFabButton, IonFabList, IonGrid, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonModal, IonPage, IonRadio, IonRadioGroup, IonRow, IonSearchbar, IonTitle, IonToolbar } from '@ionic/react';
import { add, arrowBackOutline, arrowDown, arrowUp, chevronDown, logoFacebook } from 'ionicons/icons';
import React, { useEffect, useState } from 'react';
import useApi from '../../api/posts'

const AddEmployee: React.FunctionComponent<any> = ({ isOpen, onClose, depart }) => {
    const department = { depart }
    const { getEmp } = useApi();
    const [emp, setEmp] = useState([{}]);
    const [searchData,setSearchData]=useState([{}]);
    const [sort, setSort] = useState({ sorted: "", reversed: false })
    const getEmployee = async () => {
        const res: any = await getEmp();
        setEmp([...res.data]);
    }
    useEffect(() => {
        getEmployee();
    }, [])
    const sortById = () => {
        setSort({ sorted: 'id', reversed: !sort.reversed });
        const copyEmp = [...emp]
        copyEmp.sort((a: any, b: any) => {
            if (sort.reversed) {
                return b.EmpId.localeCompare(a.EmpId)
            }
            return a.EmpId.localeCompare(b.EmpId)
        });
        setEmp(copyEmp);
    }

    const sortByName = () => {
        setSort({ sorted: 'name', reversed: !sort.reversed });
        const copyEmp = [...emp]
        copyEmp.sort((a: any, b: any) => {
            if (sort.reversed) {
                return b.FullName.localeCompare(a.FullName)
            }
            return a.FullName.localeCompare(b.FullName)
        });
        setEmp(copyEmp);
    }

    const reverseIcon = () => {
        if (sort.reversed) {
            return (
                <IonIcon icon={arrowUp}></IonIcon>
            )
        }
        return (
            <IonIcon icon={arrowDown}></IonIcon>
        )
    }
    const SearchData=(ev:any)=>{
        let query = "";
    const target = ev.target as HTMLIonSearchbarElement;
    if (target) query = target.value!.toLowerCase();
        const data=(emp.filter((d:any) => d.FullName.toLowerCase().indexOf(query) > -1))
   
    
    }
    return (
        <IonModal isOpen={isOpen}>
            <IonHeader>
                <IonButtons slot='start'>
                    <IonButton onClick={onClose}>
                        <IonIcon slot='icon-only' icon={arrowBackOutline}></IonIcon>
                    </IonButton>
                </IonButtons>
                <IonTitle>Thêm Nhân Viên</IonTitle>
                <IonToolbar>
                    <IonSearchbar showClearButton='focus' onIonChange={(ev)=>{SearchData(ev)}}>
                    </IonSearchbar>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonGrid>
                    <IonRow>
                        <IonCol onClick={() => sortById()} >Mã Nhân Viên
                            {sort.sorted === "id" ? reverseIcon() : null}
                        </IonCol>
                        <IonCol onClick={() => sortByName()}>Tên Nhân Viên
                            {sort.sorted === "name" ? reverseIcon() : null}
                        </IonCol>
                    </IonRow>

                    {emp.map((el: any) =>
                        <IonRow>
                            <IonCol >
                                {el.EmpId}
                            </IonCol>
                            <IonCol>
                                {el.FullName}
                            </IonCol>
                        </IonRow>
                    )}
                </IonGrid>
            </IonContent>
        </IonModal>
    )
};

export default AddEmployee;