import { IonAvatar, IonItem, IonLabel, useIonAlert } from "@ionic/react";
import { v4 } from "uuid";
import EmpFabbtn from "./EmpFabbtn";
import useApi from "../api/posts";
const Emp: React.FunctionComponent<any> = ({ initialData,key, onClickDetails, onClickEdit }) => {
    const [presentAlert] = useIonAlert();
    const [alert] = useIonAlert();
    const {delEmp}=useApi()
    const onClickDelButton = async (id: string) => {
        console.log("fckkkkkk");
        
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
    const el: any = initialData
    return (
        // Anh dung package uuid, thay` recommend
        <IonItem key={key}>
            <IonAvatar
                slot="start"
                onClick={onClickDetails}>
                <img
                    src="https://ionicframework.com/docs/img/demos/avatar.svg"
                    alt=""
                />
            </IonAvatar>
            <IonLabel
                onClick={onClickDetails}>
                {el.FullName}
            </IonLabel>
            <EmpFabbtn onClickDetails={onClickDetails}
                onClickDel={()=>{onClickDelButton(el.id)}}
                onClickEdit={onClickEdit}
            />
        </IonItem>
    )
}

export default Emp;