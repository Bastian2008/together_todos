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
  IonAlert
} from '@ionic/react';
import { add, trash } from 'ionicons/icons';
import { useState } from 'react';
import './Tab1.css';

interface ChecklistItem {
  text: string;
  checked: boolean;
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
  const [newItem, setNewItem] = useState('');

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

  const toggleItem = (checklistId: string, itemIndex: number) => {
    setChecklists(checklists.map(list => {
      if (list.id === checklistId) {
        const newItems = [...list.items];
        newItems[itemIndex].checked = !newItems[itemIndex].checked;
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

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Checklists</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {/* Checklist Selection */}
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
        </IonList>

        {/* Selected Checklist Items */}
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
                        {item.text}
                      </IonLabel>
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

        {/* FAB Button for new checklist */}
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton onClick={() => setShowNewChecklistAlert(true)}>
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>

        {/* New Checklist Alert */}
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
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
