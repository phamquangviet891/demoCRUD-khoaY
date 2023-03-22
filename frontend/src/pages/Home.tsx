import {
    IonAvatar,
    IonButton,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonChip,
    IonCol,
    IonContent,
    IonFab,
    IonFabButton,
    IonFabList,
    IonGrid,
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
const Home: React.FC = () => {
    const { getEmp, delEmp } = useApi();
    const [myModal, setMyModal] = useState({ isOpen: false });
    const [addModal, setAddModal] = useState({ isOpen: false });
    const [editModal, setEditModal] = useState({ isOpen: false });
    const [emp, setEmp] = useState<any>([{}]);
    const [data, setData] = useState<any>();
    const [presentAlert] = useIonAlert();
    const [alert] = useIonAlert();

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

    const onClickDelButton = async (id: string) => {
        presentAlert({
            header: "Bạn có thật sự muốn xóa?",
            buttons: [
                {
                    text: "Hủy",
                    role: "cancel",
                    handler: () => {},
                },
                {
                    text: "OK",
                    role: "confirm",
                    handler: async () => {
                        const res: any = await delEmp(id);
                        try {
                            console.log(res.status);
                            window.location.reload();
                        } catch {
                            alert("Không thể xóa");
                        }
                    },
                },
            ],
        });
    };
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
                        <IonItem key={v4()}>
                            <IonAvatar
                                slot="start"
                                onClick={() => {
                                    onClickDetailsButton(!myModal.isOpen, el);
                                }}>
                                <img
                                    src="https://ionicframework.com/docs/img/demos/avatar.svg"
                                    alt=""
                                />
                            </IonAvatar>
                            <IonLabel
                                onClick={() => {
                                    onClickDetailsButton(!myModal.isOpen, el);
                                }}>
                                {el.FullName}
                            </IonLabel>
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
                                        onClick={() => {
                                            onClickDelButton(el.id);
                                        }}>
                                        <IonIcon icon={trash}></IonIcon>
                                    </IonFabButton>
                                    <IonFabButton
                                        color="primary"
                                        onClick={() => {
                                            onClickEditButton(
                                                !editModal.isOpen,
                                                el
                                            );
                                        }}>
                                        <IonIcon icon={createOutline}></IonIcon>
                                    </IonFabButton>
                                    <IonFabButton
                                        color="success"
                                        onClick={() => {
                                            onClickDetailsButton(
                                                !editModal.isOpen,
                                                el
                                            );
                                        }}>
                                        <IonIcon icon={eye}></IonIcon>
                                    </IonFabButton>
                                </IonFabList>
                            </IonFab>
                        </IonItem>
                    ))}
                </IonList>
                {/* Ham Modal */}
                <MyModal
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

const MyModal: React.FunctionComponent<any> = ({
    isOpen,
    onClose,
    initialData,
}) => {
    const data: any = initialData;
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
                                    <IonLabel>{data.DateOfBirth}</IonLabel>
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
                                    <IonLabel>{data.CreatedDate}</IonLabel>
                                    {/* <IonLabel>{typeof(data.CreatedDate)}</IonLabel> */}
                                </IonItem>
                                <IonItem>
                                    <IonLabel>Ngày Sửa</IonLabel>
                                    <IonLabel>{data.UpdatedDate}</IonLabel>
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
