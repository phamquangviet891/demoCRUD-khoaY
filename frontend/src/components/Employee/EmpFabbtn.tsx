import { IonFab, IonFabButton, IonFabList, IonIcon } from "@ionic/react";
import { createOutline, documentAttach, ellipsisVerticalSharp, eye, trash } from "ionicons/icons";

const EmpFabbtn: React.FunctionComponent<any> = ({onClickDel,onClickDetails,onClickEdit,onCLickCertificate,initialData}) => {
    const data:any=initialData;
    return (
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
                    onClick={onClickDel}>
                    <IonIcon icon={trash}></IonIcon>
                </IonFabButton>
                <IonFabButton
                    color="primary"
                    onClick={onClickEdit}>
                    <IonIcon icon={createOutline}></IonIcon>
                </IonFabButton>
                <IonFabButton
                    color="success"
                    onClick={onClickDetails}>
                    <IonIcon icon={eye}></IonIcon>
                </IonFabButton>
                <IonFabButton
                    color="success"
                    onClick={onCLickCertificate}>
                    
                    <IonIcon icon={documentAttach}></IonIcon>
                </IonFabButton>
            </IonFabList>
        </IonFab>
    )
}

export default EmpFabbtn;