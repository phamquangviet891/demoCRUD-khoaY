import { IonAvatar, IonItem, IonLabel } from "@ionic/react";
import { v4 } from "uuid";
import EmpFabbtn from "./EmpFabbtn";

const Emp: React.FunctionComponent<any> = ({ initialData, onClickDel, onClickDetails, onClickEdit }) => {

    const el: any = initialData
    return (
        // Anh dung package uuid, thay` recommend
        <IonItem key={v4()}>
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
                onClickDel={onClickDel}
                onClickEdit={onClickEdit}
            />
        </IonItem>
    )
}

export default Emp;