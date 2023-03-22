import { IonAvatar, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonContent, IonFab, IonFabButton, IonFabList, IonGrid, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonListHeader, IonModal, IonPage, IonRow, IonTitle, IonToolbar, useIonAlert, useIonViewWillEnter } from '@ionic/react';
import {  useEffect, useState } from 'react';
import useApi from '../api/posts';
import AddModal from './AddModal';
import './Home.css';
import { addCircleOutline,  closeCircleOutline,createOutline  } from 'ionicons/icons'
import EditModal from './EditModal';
const Home: React.FC = () => {
  const { getEmp, delEmp } = useApi()
  const [myModal, setMyModal] = useState({ isOpen: false })
  const [addModal, setAddModal] = useState({ isOpen: false })
  const [editModal, setEditModal] = useState({ isOpen: false })
  const [emp, setEmp] = useState<any>([{}])
  const [data, setData] = useState<any>()
  const [presentAlert] = useIonAlert();
  const [alert] = useIonAlert();

  const loadEmp = async () => {
    const res = (await getEmp());
    setEmp([...res.data])
  }


  const onClickDetailsButton = (flag: boolean, input: any) => {
    setMyModal({ isOpen: flag })
    setData(input)
  }
  const onClickEditButton = (flag: boolean, input: any) => {
    setEditModal({ isOpen: flag })
    setData(input)
  }
  useEffect(() => {
    loadEmp()
  }, [])


  const onClickDelButton = async (id: string) => {
    presentAlert({
      header: 'Bạn có thật sự muốn xóa?',
      buttons: [
        {
          text: 'Hủy',
          role: 'cancel',
          handler: () => {

          },
        },
        {
          text: 'OK',
          role: 'confirm',
          handler: async () => {
            const res: any = await delEmp(id);
            try {
              console.log(res.status);
              window.location.reload()
            }
            catch
            {
              alert("Không thể xóa");
            }
          },
        },
      ],
    })

  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Danh Sách Nhân Viên</IonTitle>

        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonCard>
          <IonList>
            <IonListHeader>
              <IonLabel>Danh Sách Nhân Viên</IonLabel>
              <IonButton onClick={() => { setAddModal({ isOpen: !addModal.isOpen }) }}><IonIcon icon={addCircleOutline}></IonIcon></IonButton>
            </IonListHeader>
            {emp.map((el: any) =>

              <IonItem key={el.id}>
                <IonAvatar slot='start' onClick={() => { onClickDetailsButton(!myModal.isOpen, el) }}><img src="" alt="" /></IonAvatar>
                <IonLabel onClick={() => { onClickDetailsButton(!myModal.isOpen, el) }}>{el.FullName}</IonLabel>
                <IonButton onClick={() => { onClickDelButton(el.id) }} ><IonIcon icon={closeCircleOutline}></IonIcon></IonButton>
                <IonButton onClick={() => { onClickEditButton(!editModal.isOpen,el) }} ><IonIcon icon={createOutline}></IonIcon></IonButton>
                {/* <IonFab>
              <IonFabButton><IonIcon icon={add}></IonIcon></IonFabButton>
              <IonFabList side='start'>
                <IonFabButton>
                  Edit
                </IonFabButton>
              </IonFabList>
            </IonFab> */}
              </IonItem>
            )}
          </IonList>
        </IonCard>
        {/* Ham Modal */}
        <MyModal isOpen={myModal.isOpen} initialData={data} onClose={() => setMyModal({ isOpen: !myModal.isOpen })} />
        <AddModal isOpen={addModal.isOpen} onClose={() => setAddModal({ isOpen: !addModal.isOpen })} />
        <EditModal isOpen={editModal.isOpen} initialData={data} onClose={() => setEditModal({ isOpen: !editModal.isOpen })} />

      </IonContent>
    </IonPage>
  );
};

export default Home;

const MyModal: React.FunctionComponent<any> = ({ isOpen, onClose, initialData }) => {
  const data: any = initialData
  return <IonModal isOpen={isOpen} >
    <IonHeader>
      
    </IonHeader>
    <IonContent fullscreen={true}>
      {data &&
        <IonCard >
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
                  </IonItem>
                  <IonItem>
                    <IonLabel>Ngày Sửa</IonLabel>
                    <IonLabel>{data.UpdatedDate}</IonLabel>
                  </IonItem>
                </IonList>
          </IonCardContent>
        </IonCard>
      }
      <IonButton expand='block' onClick={onClose}>Cancel</IonButton>
    </IonContent>
  </IonModal>
}
