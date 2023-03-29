import {
    IonContent,
    IonFab,
    IonFabButton,
    IonHeader,
    IonIcon,
    IonList,
    IonPage,
    IonTitle,
    IonToolbar,
} from "@ionic/react";
import { useEffect, useState } from "react";
import useApi from "../api/posts";
import AddModal from "../components/Employee/AddModal";
import "./Home.css";
import {
    add
} from "ionicons/icons";
import { v4 } from "uuid";
import EditModal from "../components/Employee/EditModal";
import EmpDetais from "../components/Employee/EmpDetails";
import Emp from "../components/Employee/Emp";
import Certificate from "../components/Cerificate/Certificate";
const Home: React.FC = () => {
    const { getEmp} = useApi();
    const [myModal, setMyModal] = useState({ isOpen: false });
    const [addModal, setAddModal] = useState({ isOpen: false });
    const [editModal, setEditModal] = useState({ isOpen: false });
    const [emp, setEmp] = useState<any>([{}]);
    const [data, setData] = useState<any>();
    const [certificateModal,setCertificateModal]=useState({isOpen:false});

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
    const onClickCertificate=((flag:boolean,input:any)=>{
        setCertificateModal({isOpen:flag})
        setData(input);
    })
    useEffect(() => {
        loadEmp();
    }, []);

    


    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Quản lý nhân viên</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonList>
                    {emp.map((el: any) => (
                        
                        // Anh dung package uuid, thay` recommend
                        <Emp initialData={el}
                         key={v4()}

                            onClickDetails={() => {
                                onClickDetailsButton(!editModal.isOpen, el);
                            }}
                            onClickEdit={() => {
                                onClickEditButton(!editModal.isOpen, el);
                            }}
                            onCLickCertificate={()=>{
                                onClickCertificate(!certificateModal.isOpen,el)
                            }}
                        />
                    ))}
                </IonList>
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
                <Certificate isOpen={certificateModal.isOpen}
                initialData={data}
                onClose={()=>setCertificateModal({isOpen:!certificateModal.isOpen})} />
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
            </IonContent>
        </IonPage>
    );
};

export default Home;

