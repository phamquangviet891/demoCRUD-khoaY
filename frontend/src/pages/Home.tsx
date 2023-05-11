import {
    IonCol,
    IonContent,
    IonFab,
    IonFabButton,
    IonGrid,
    IonHeader,
    IonIcon,
    IonLabel,
    IonList,
    IonPage,
    IonRow,
    IonSearchbar,
    IonTitle,
    IonToolbar,
} from "@ionic/react";
import { useEffect, useState } from "react";
import useApi from "../api/posts";
import AddModal from "../components/Employee/AddModal";
import "./Home.css";
import {
    add, arrowDown, arrowUp
} from "ionicons/icons";
import { v4 } from "uuid";
import EditModal from "../components/Employee/EditModal";
import EmpDetais from "../components/Employee/EmpDetails";
import Emp from "../components/Employee/Emp";
import Certificate from "../components/Cerificate/Certificate";
const Home: React.FC = () => {
    const { getEmp } = useApi();
    const [myModal, setMyModal] = useState({ isOpen: false });
    const [addModal, setAddModal] = useState({ isOpen: false });
    const [editModal, setEditModal] = useState({ isOpen: false });
    const [emp, setEmp] = useState<any>([{}]);
    const [data, setData] = useState<any>();
    const [sorted,setSorted]=useState({sort:"",reverse:false})
    const [dataSort,setDataSort]=useState([{}]);
    const [certificateModal, setCertificateModal] = useState({ isOpen: false });

    const loadEmp = async () => {
        const res = await getEmp();
        setEmp([...res.data]);
    };

    const onClickDetailsButton = (flag: boolean, input: any) => {
        setMyModal({ isOpen: flag });
        setData(input);
    };
    const onClickEditButton = (flag: boolean, input: any) => {
        setEditModal({ isOpen: flag });
        setData(input);
    };
    const onClickCertificate = ((flag: boolean, input: any) => {
        setCertificateModal({ isOpen: flag })
        setData(input);
    })
    useEffect(() => {
        loadEmp();
    }, []);

    useEffect(() => {
        setDataSort([...emp]);
    }, [emp]);
    const SortData=()=>{
        setSorted({sort:"name",reverse:!sorted.reverse})
        const copyEmp=[...dataSort];
        const res=copyEmp.sort((a:any,b:any)=>{
            if(sorted.reverse)
            {
                return b.FullName.localeCompare(a.FullName)
            }
            return a.FullName.localeCompare(b.FullName)
        })
        setDataSort(res);
    }

    const SortIcon=()=>{
        if(sorted.reverse)
        {
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
        setDataSort([...data])
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Quản lý nhân viên</IonTitle>
                </IonToolbar>
                <IonToolbar>
                    <IonSearchbar showClearButton='focus' onIonChange={(ev) => { SearchData(ev) }}>
                    </IonSearchbar>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonList>
                    <IonGrid>
                        <IonRow>
                            <IonCol onClick={()=>{SortData()}}>
                                <IonLabel>
                                Name
                                </IonLabel>
                                {sorted.sort==="name"? SortIcon():null}
                            </IonCol>
                        </IonRow>
                    {dataSort.map((el: any) => (
                        // Anh dung package uuid, thay` recommend
                        <Emp initialData={el}
                            key={v4()}
                            onClickDetails={() => {
                                onClickDetailsButton(!editModal.isOpen, el);
                            }}
                            onClickEdit={() => {
                                onClickEditButton(!editModal.isOpen, el);
                            }}
                            onCLickCertificate={() => {
                                onClickCertificate(!certificateModal.isOpen, el)
                            }}
                        />
                    ))}
                    </IonGrid>
                </IonList>
                <IonFab
                    horizontal="center">
                    <IonFabButton
                        onClick={() => {
                            setAddModal({
                                isOpen: !addModal.isOpen,
                            });
                        }}>
                        <IonIcon icon={add}></IonIcon>
                    </IonFabButton>
                </IonFab>
                {/* Ham Modal */}
                <EmpDetais
                    isOpen={myModal.isOpen}
                    initialData={data}
                    onClose={() => setMyModal({ isOpen: !myModal.isOpen })}
                />
                <AddModal
                    isOpen={addModal.isOpen}
                    onClose={() => setAddModal({ isOpen: !addModal.isOpen })}
                />
                <EditModal
                    isOpen={editModal.isOpen}
                    initialData={data}
                    onClose={() => setEditModal({ isOpen: !editModal.isOpen })}
                />
                <Certificate
                    isOpen={certificateModal.isOpen}
                    initialData={data}
                    onClose={() => setCertificateModal({ isOpen: !certificateModal.isOpen })} 
                />

            </IonContent>
        </IonPage>
    );
};

export default Home;

