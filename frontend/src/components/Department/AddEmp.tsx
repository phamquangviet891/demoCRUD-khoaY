import { IonAccordion, IonAccordionGroup, IonButton, IonButtons, IonCheckbox, IonCol, IonContent, IonFab, IonFabButton, IonFabList, IonFooter, IonGrid, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonModal, IonPage, IonRadio, IonRadioGroup, IonRow, IonSearchbar, IonTitle, IonToolbar } from '@ionic/react';
import { add, arrowBackOutline, arrowDown, arrowUp, chevronDown, logoFacebook, removeOutline } from 'ionicons/icons';
import React, { useEffect, useState } from 'react';
import useApi from '../../api/posts'
import DepartmentApi from '../../api/Department';

const AddEmployee: React.FunctionComponent<any> = ({ isOpen, onClose, depart }) => {
    const { AddEmp } = DepartmentApi();
    const department: any = { depart }
    const { getEmp } = useApi();
    const [emp, setEmp] = useState([{}]);
    const [searchData, setSearchData] = useState([{}]);
    const [sort, setSort] = useState({ sorted: "", reversed: false })
    const getEmployee = async () => {
        const res: any = await getEmp();
        setEmp([...res.data]);
    }
    useEffect(() => {
        getEmployee();
    }, [])
    useEffect(() => {
        emp.map((el: any) => {
            el.add = false;
        })
        setSearchData([...emp]);

    }, [emp])

    const sortById = () => {
        setSort({ sorted: 'id', reversed: !sort.reversed });
        const copyEmp = [...searchData]
        copyEmp.sort((a: any, b: any) => {
            if (sort.reversed) {
                return b.EmpId.localeCompare(a.EmpId)
            }
            return a.EmpId.localeCompare(b.EmpId)
        });
        setSearchData(copyEmp);
    }

    const sortByName = () => {
        setSort({ sorted: 'name', reversed: !sort.reversed });
        const copyEmp = [...searchData]
        copyEmp.sort((a: any, b: any) => {
            if (sort.reversed) {
                return b.FullName.localeCompare(a.FullName)
            }
            return a.FullName.localeCompare(b.FullName)
        });
        setSearchData(copyEmp);
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
    const SearchData = (ev: any) => {
        let query = "";
        const target = ev.target as HTMLIonSearchbarElement;
        if (target) query = target.value!.toLowerCase();
        const data = (emp.filter((d: any) => d.FullName.toLowerCase().indexOf(query) > -1))
        setSearchData([...data])
    }
    const AddEmpToDepartButton = () => {
        const flag = [...searchData];
        flag.map(async (el: any) => {
            console.log(el);
            if (el.add===true) {
                console.log(el,'a');
                
                delete el.add;
                const res = await AddEmp(department.id, el)
            }

        })
    }

    const ChangeAddtribute=(el:any)=>{
        el.add=!el.add;
    }
    return (
        <IonModal isOpen={isOpen}>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot='start'>
                        <IonButton onClick={onClose}>
                            <IonIcon slot='icon-only' icon={arrowBackOutline}></IonIcon>
                        </IonButton>
                    </IonButtons>
                    <IonTitle>Thêm Nhân Viên</IonTitle>
                </IonToolbar>
                
                <IonToolbar>
                    <IonSearchbar showClearButton='focus' onIonChange={(ev) => { SearchData(ev) }}>
                    </IonSearchbar>
                </IonToolbar>

            </IonHeader>
            <IonContent>
                <IonGrid>
                    <IonRow>
                        <IonCol  >
                            <IonLabel onClick={() => sortById()}>
                                Mã Nhân Viên
                            </IonLabel>
                            {sort.sorted === "id" ? reverseIcon() : null}
                        </IonCol>
                        <IonCol >
                            <IonLabel onClick={() => sortByName()}>
                                Tên Nhân Viên
                            </IonLabel>
                            {sort.sorted === "name" ? reverseIcon() : null}
                        </IonCol>
                    </IonRow>

                    {searchData.map((el: any) =>
                        <IonRow>
                            <IonCol >
                                {el.EmpId}
                            </IonCol>
                            <IonCol>
                                {el.FullName}
                            </IonCol>
                            <IonCheckbox onIonChange={() => { ChangeAddtribute(el) }}></IonCheckbox>
                        </IonRow>
                    )}

                </IonGrid>
            </IonContent>
            <IonFooter>
                <IonToolbar>
                    <IonButton onClick={() => { AddEmpToDepartButton() }} expand='block'>
                        Thêm
                    </IonButton>
                </IonToolbar>
            </IonFooter>
        </IonModal>
    )
};

export default AddEmployee;