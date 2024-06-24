import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Input } from "../../Input";
import { Dialog, DialogPanel } from "@headlessui/react";
import { CloudArrowUpIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { useCallback, useEffect, useState } from "react";
import api from "../../../services/api";
import { useNotify } from "../../../hooks/useNotify";
import { NEWSLETTERS, RECIPIENTS } from "../../../services/api/routes";
import { NotificationTypes } from "../../../constants/notification";
import { RecipientList } from "../../../types/recipient";
import CodeMirror from "@uiw/react-codemirror";
import { html } from "@codemirror/lang-html";

export const NewsletterForm = () => {
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [recipientsList, setRecipientsList] = useState<RecipientList[]>([]);
  const notify = useNotify();

  const getRecipientsLists = async () => {
    const { data } = await api.get(RECIPIENTS);
    setRecipientsList(data);
  };

  useEffect(() => {
    getRecipientsLists();
  }, []);

  const onSubmit = async (values: {
    title: string;
    recipientList: string;
    date: string;
    codeMessage: string;
  }) => {
    setLoading(true);
    const payload = new FormData();
    if (file != null) {
      payload.append("file", file);
    }

    payload.append("title", values?.title);
    payload.append("recipientList", values?.recipientList);
    payload.append("date", values?.date);
    payload.append("message", values?.codeMessage);

    const { data } = await api.post(NEWSLETTERS, payload);
    setLoading(false);

    if (data) {
      notify({
        title: "",
        body: "Newsletter created!",
        type: NotificationTypes.success,
      });
      navigate(-1);
    }
  };

  const navigate = useNavigate();
  const formik = useFormik({
    validateOnChange: false,
    initialValues: {
      title: "",
      date: "",
      codeMessage: "",
      recipientList: "",
    },
    validationSchema: Yup.object().shape({
      title: Yup.string().required("Name is required"),
      codeMessage: Yup.string().required("Message is required"),
      recipientList: Yup.string().required("A list is required"),
    }),
    onSubmit: onSubmit,
  });

  const onClose = async () => {
    navigate(-1);
  };

  const openFileExplorer = async () => {
    document.getElementById("file")?.click();
  };

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e?.target?.files) {
      setFile(e?.target?.files[0]);
      e.target.value = "";
    }
  };

  const onChange = useCallback((val: string) => {
    formik.setFieldValue("codeMessage", val);
  }, []);

  return (
    <Dialog
      open={true}
      onClose={onClose}
      className="fixed inset-0 flex w-screen items-center justify-center bg-black/30 p-4 transition duration-300 ease-out data-[closed]:opacity-0"
    >
      <DialogPanel className="w-1/2 bg-white p-8 rounded-lg">
        <h1 className="text-2xl text-primary">New newsletter</h1>
        <h2 className="text-1xl text-secondary">
          Create a newsletter and send it to a recipients list
        </h2>
        <hr className="my-2" />
        <form onSubmit={formik.handleSubmit}>
          <div className="w-full">
            <Input
              id="title"
              value={formik.values.title}
              type="text"
              placeHolder="Recipients list title"
              onChange={formik.handleChange}
            />
            {formik?.errors?.title}
          </div>
          <div className="w-full">
            <select
              id="recipientList"
              className="input w-full"
              value={formik.values.recipientList}
              onChange={formik.handleChange}
            >
              <option value="" disabled>
                Select a recipients list
              </option>
              {recipientsList?.map((recipientList) => (
                <option value={recipientList._id} key={recipientList._id}>
                  {recipientList.name}
                </option>
              ))}
            </select>
            {formik?.errors?.title}
          </div>
          <div className="w-full p-4 bg-green-50 rounded-lg border-primary cursor-pointer my-2">
            <div className="flex justify-between">
              <span
                onClick={openFileExplorer}
                className={`${
                  file != null ? "text-primary" : "text-primary-300"
                }`}
              >
                {file?.name ?? "Upload file"}
              </span>
              <span>
                {file != null ? (
                  <XMarkIcon
                    className="h-5 text-secondary"
                    onClick={() => setFile(null)}
                  />
                ) : (
                  <CloudArrowUpIcon
                    className="h-5 text-secondary"
                    onClick={openFileExplorer}
                  />
                )}
              </span>
            </div>
            <input
              type="file"
              name="file"
              id="file"
              className="hidden"
              multiple={false}
              accept=".pdf, .png"
              onChange={handleFile}
            />
          </div>
          <div className="w-full">
            <label htmlFor="date" className="">
              Schedule newsletter
            </label>
            <Input
              id="date"
              value={formik.values.date}
              type="datetime-local"
              placeHolder="Schedule newsletter"
              onChange={formik.handleChange}
            />
          </div>
          <label htmlFor="date">Create a formatted message html</label>
          <CodeMirror
            value={formik.values.codeMessage}
            height="200px"
            extensions={[html({})]}
            onChange={onChange}
          />
          <div className="w-full flex space-x-2 mt-6">
            <button
              className="button secondary large rounded-lg w-full text-secondary text-center"
              type="button"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="button large rounded-lg w-full text-secondary text-center"
              disabled={loading}
              type="submit"
            >
              Create or Schedule
            </button>
          </div>
        </form>
      </DialogPanel>
    </Dialog>
  );
};
