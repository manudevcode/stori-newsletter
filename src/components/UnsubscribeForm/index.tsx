import { useCallback, useEffect, useState } from "react";
import { Recipient, RecipientList } from "../../types/recipient";
import { Loader } from "../Loader";
import api from "../../services/api";
import { useParams } from "react-router-dom";
import {
  AVAILABLE_LISTS,
  RECIPIENT_USER,
  UNSUBSCRIBE,
} from "../../services/api/routes";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import { useNotify } from "../../hooks/useNotify";
import { NotificationTypes } from "../../constants/notification";

export const UnsubscribeForm = () => {
  const { email } = useParams();
  const notify = useNotify();
  const [recipient, setRecipient] = useState<Recipient | null>(null);
  const [lists, setLists] = useState<RecipientList[]>([]);
  const getRecipientInfo = async () => {
    const { data } = await api.get(RECIPIENT_USER + email);
    if (data) {
      setRecipient(data);
    }
  };

  const getAvailableLists = async () => {
    const { data } = await api.get(AVAILABLE_LISTS);
    setLists(data);
  };

  const checkItem = async (list: RecipientList) => {
    const isSelected = (recipient?.recipientsList as string[]).indexOf(
      list._id
    );
    const newList = recipient?.recipientsList as string[];

    if (isSelected != -1) {
      newList.splice(isSelected, 1);
    } else {
      newList.push(list._id);
    }
    setRecipient({
      ...recipient,
      recipientsList: newList,
    } as Recipient);
  };

  const isListChecked = useCallback(
    (list: RecipientList) => {
      return (
        recipient?.recipientsList?.find((userList) => userList === list._id) !=
        null
      );
    },
    [recipient]
  );

  const saveSettings = async () => {
    const { data } = await api.post(UNSUBSCRIBE, recipient);
    if (data) {
      notify({
        title: "",
        body: "Mailing preferences updated",
        type: NotificationTypes.success,
      });
    }
  };

  useEffect(() => {
    getRecipientInfo();
    getAvailableLists();
  }, []);

  return (
    <div>
      <h3 className="text-white text-2xl font-medium mb-6">
        Select to add or remove your lists
      </h3>
      <Loader loading={recipient == null}>
        <div>
          {lists?.map((listItem) => (
            <div
              key={listItem._id}
              className={`flex justify-between p-4 border border-white rounded-lg my-2 cursor-pointer transition-colors ${
                isListChecked(listItem) ? "bg-white" : "bg-secondary"
              }`}
              onClick={() => checkItem(listItem)}
            >
              <span className="text-primary text-xl">{listItem.name}</span>
              <span>
                <CheckCircleIcon className="text-secondary h-5" />
              </span>
            </div>
          ))}
          <button
            className="button large rounded-lg w-full text-secondary text-center"
            type="button"
            onClick={saveSettings}
          >
            Save subscribe settings
          </button>
        </div>
      </Loader>
    </div>
  );
};
