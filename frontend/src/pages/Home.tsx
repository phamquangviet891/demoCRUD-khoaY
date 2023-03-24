import {
    IonAvatar,
    IonContent,
    IonFab,
    IonFabButton,
    IonFabList,
    IonHeader,
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonListHeader,
    IonModal,
    IonPage,
    IonRow,
    IonTitle,
    IonToolbar,
    useIonAlert,
    useIonViewWillEnter,
} from "@ionic/react";
import { useEffect, useState } from "react";
import useApi from "../api/posts";
import AddModal from "./AddModal";
import "./Home.css";
import {
    addCircleSharp,
    trash,
    createOutline,
    eye,
    add,
    ellipsisVerticalSharp,
} from "ionicons/icons";
import { v4 } from "uuid";
import EditModal from "./EditModal";
import EmpDetais from "./EmpDetails";
import Emp from "../components/Emp";
const Home: React.FC = () => {
    const { getEmp, delEmp } = useApi();
    const [myModal, setMyModal] = useState({ isOpen: false });
    const [addModal, setAddModal] = useState({ isOpen: false });
    const [editModal, setEditModal] = useState({ isOpen: false });
    const [emp, setEmp] = useState<any>([{}]);
    const [data, setData] = useState<any>();
    

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

