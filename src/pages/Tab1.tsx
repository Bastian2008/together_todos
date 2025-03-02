import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonCheckbox,
  IonIcon,
  IonItemSliding,
  IonItemOptions,
  IonItemOption,
  IonFab,
  IonFabButton,
  IonAlert,
  IonTextarea,
  IonModal,
  IonButtons,
  IonImg,
  IonActionSheet,
  IonBackButton
} from '@ionic/react';
import { add, trash, camera, image, chatbubble } from 'ionicons/icons';
import { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Camera, CameraResultType } from '@capacitor/camera';
import './Tab1.css';

interface ChecklistItem {
  text: string;
  checked: boolean;
  comment?: string;
  photo?: string;
}

interface Checklist {
  id: string;
  name: string;
  items: ChecklistItem[];
}

const Tab1: React.FC = () => {
  const [checklists, setChecklists] = useState<Checklist[]>([]);
  const [showNewChecklistAlert, setShowNewChecklistAlert] = useState(false);
  const [selectedChecklist, setSelectedChecklist] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<number | null>(null);
  const [newItem, setNewItem] = useState('');
  const [showItemModal, setShowItemModal] = useState(false);
  const [itemComment, setItemComment] = useState('');
  const [showActionSheet, setShowActionSheet] = useState(false);
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  const createChecklist = (name: string) => {
    const newChecklist: Checklist = {
      id: Date.now().toString(),
      name: name,
      items: []
    };
    setChecklists([...checklists, newChecklist]);
    setSelectedChecklist(newChecklist.id);
  };

  const addItem = () => {
    if (newItem.trim() !== '' && selectedChecklist) {
      setChecklists(checklists.map(list => {
        if (list.id === selectedChecklist) {
          return {
            ...list,
            items: [...list.items, { text: newItem, checked: false }]
          };
        }
        return list;
      }));
      setNewItem('');
    }
  };

  const toggleItem = async (checklistId: string, itemIndex: number) => {
    setChecklists(checklists.map(list => {
      if (list.id === checklistId) {
        const newItems = [...list.items];
        newItems[itemIndex].checked = !newItems[itemIndex].checked;
        if (newItems[itemIndex].checked) {
          setSelectedItem(itemIndex);
          setShowActionSheet(true);
        }
        return { ...list, items: newItems };
      }
      return list;
    }));
  };

  const deleteItem = (checklistId: string, itemIndex: number) => {
    setChecklists(checklists.map(list => {
      if (list.id === checklistId) {
        return {
          ...list,
          items: list.items.filter((_, i) => i !== itemIndex)
        };
      }
      return list;
    }));
  };

  const deleteChecklist = (checklistId: string) => {
    setChecklists(checklists.filter(list => list.id !== checklistId));
    if (selectedChecklist === checklistId) {
      setSelectedChecklist(null);
    }
  };

  const saveComment = () => {
    if (selectedChecklist && selectedItem !== null) {
      setChecklists(checklists.map(list => {
        if (list.id === selectedChecklist) {
          const newItems = [...list.items];
          newItems[selectedItem] = {
            ...newItems[selectedItem],
            comment: itemComment
          };
          return { ...list, items: newItems };
        }
        return list;
      }));
      setShowItemModal(false);
    }
  };

  const takePicture = async () => {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl
      });

      if (selectedChecklist && selectedItem !== null) {
        setChecklists(checklists.map(list => {
          if (list.id === selectedChecklist) {
            const newItems = [...list.items];
            newItems[selectedItem] = {
              ...newItems[selectedItem],
              photo: image.dataUrl
            };
            return { ...list, items: newItems };
          }
          return list;
        }));
      }
    } catch (error) {
      console.error('Error taking photo:', error);
    }
    setShowActionSheet(false);
  };

  const handlePhotoClick = (e: Event, photoUrl: string) => {
    e.stopPropagation();
    setSelectedPhoto(photoUrl);
    setShowPhotoModal(true);
  };

  useEffect(() => {
    const listElement = document.getElementById('checklist-list');
    if (listElement) {
      ReactDOM.render(
        <IonList>
          {checklists.map(list => (
            <IonItemSliding key={list.id}>
              <IonItem 
                button 
                onClick={() => setSelectedChecklist(list.id)}
                className={selectedChecklist === list.id ? 'selected-checklist' : ''}
              >
                <IonLabel>{list.name}</IonLabel>
              </IonItem>
              <IonItemOptions side="end">
                <IonItemOption color="danger" onClick={() => deleteChecklist(list.id)}>
                  <IonIcon icon={trash} />
                </IonItemOption>
              </IonItemOptions>
            </IonItemSliding>
          ))}
        </IonList>,
        listElement
      );
    }
  }, [checklists, selectedChecklist]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>
            {checklists.find(list => list.id === selectedChecklist)?.name || 'Select a List'}
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {selectedChecklist && (
          <div className="checklist-content">
            <div className="add-item-container">
              <IonItem>
                <IonInput
                  value={newItem}
                  placeholder="Add new item"
                  onIonChange={e => setNewItem(e.detail.value || '')}
                  onKeyDown={e => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addItem();
                    }
                  }}
                />
                <IonButton slot="end" onClick={addItem}>
                  <IonIcon icon={add} />
                </IonButton>
              </IonItem>
            </div>

            <IonList>
              {checklists
                .find(list => list.id === selectedChecklist)
                ?.items.map((item, index) => (
                  <IonItemSliding key={index}>
                    <IonItem>
                      <IonCheckbox
                        slot="start"
                        checked={item.checked}
                        onIonChange={() => toggleItem(selectedChecklist, index)}
                      />
                      <IonLabel className={item.checked ? 'checked-item' : ''}>
                        <h2>{item.text}</h2>
                        {item.comment && (
                          <p className="item-comment">
                            <IonIcon icon={chatbubble} /> {item.comment}
                          </p>
                        )}
                      </IonLabel>
                      {item.photo && (
                        <div 
                          className="photo-container"
                          onClick={(e: any) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handlePhotoClick(e, item.photo!);
                          }}
                        >
                          <img 
                            src={item.photo} 
                            className="item-photo"
                            alt="Item"
                          />
                        </div>
                      )}
                    </IonItem>
                    <IonItemOptions side="end">
                      <IonItemOption color="danger" onClick={() => deleteItem(selectedChecklist, index)}>
                        <IonIcon icon={trash} />
                      </IonItemOption>
                    </IonItemOptions>
                  </IonItemSliding>
                ))}
            </IonList>
          </div>
        )}

        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton onClick={() => setShowNewChecklistAlert(true)}>
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>

        <IonAlert
          isOpen={showNewChecklistAlert}
          onDidDismiss={() => setShowNewChecklistAlert(false)}
          header="New Checklist"
          inputs={[
            {
              name: 'name',
              type: 'text',
              placeholder: 'Enter checklist name'
            }
          ]}
          buttons={[
            {
              text: 'Cancel',
              role: 'cancel'
            },
            {
              text: 'Create',
              handler: (data) => {
                if (data.name?.trim()) {
                  createChecklist(data.name);
                }
              }
            }
          ]}
        />

        <IonActionSheet
          isOpen={showActionSheet}
          onDidDismiss={() => setShowActionSheet(false)}
          buttons={[
            {
              text: 'Add Comment',
              icon: chatbubble,
              handler: () => {
                setShowItemModal(true);
                setShowActionSheet(false);
              }
            },
            {
              text: 'Take Photo',
              icon: camera,
              handler: () => takePicture()
            },
            {
              text: 'Cancel',
              role: 'cancel'
            }
          ]}
        />

        <IonModal isOpen={showItemModal} onDidDismiss={() => setShowItemModal(false)}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Add Comment</IonTitle>
              <IonButtons slot="end">
                <IonButton onClick={() => setShowItemModal(false)}>Cancel</IonButton>
                <IonButton strong={true} onClick={saveComment}>Save</IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <div className="ion-padding">
              <IonTextarea
                placeholder="Enter your comment here..."
                value={itemComment}
                onIonChange={e => setItemComment(e.detail.value!)}
                rows={6}
                className="comment-textarea"
              />
            </div>
          </IonContent>
        </IonModal>

        <IonModal 
          isOpen={showPhotoModal} 
          onDidDismiss={() => setShowPhotoModal(false)}
          className="photo-modal"
        >
          <IonHeader>
            <IonToolbar>
              <IonButtons slot="start">
                <IonButton onClick={() => setShowPhotoModal(false)}>
                  Close
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            {selectedPhoto && (
              <div className="expanded-photo-container">
                <img 
                  src={selectedPhoto} 
                  alt="Expanded view" 
                  className="expanded-photo"
                />
              </div>
            )}
          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
