import { Input } from "../../Input";
import { Dialog, DialogPanel } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import { CloudArrowUpIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import api from "../../../services/api";
import { RECIPIENTS } from "../../../services/api/routes";
import { useNotify } from "../../../hooks/useNotify";
import { NotificationTypes } from "../../../constants/notification";

export const RecipientsListForm = () => {
  const navigate = useNavigate();
  const notify = useNotify();
  const [file, setFile] = useState<File | null>(null);

  const createList = async (values: { name: string; emails: string }) => {
    const payload = new FormData();

    if (file != null) {
      payload.append("file", file);
    } else {
      payload.append("emails", values?.emails);
    }
    payload.append("name", values?.name);

    const { data } = await api.post(RECIPIENTS, payload);

    if (data) {
      notify({
        title: "Recipients list created",
        body: "",
        type: NotificationTypes.success,
      });
      navigate(-1);
    }
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      emails: "",
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required("Name is required"),
      description: Yup.string(),
      emails:
        file == null
          ? Yup.string()
              .required("Recipients fields is required")
              .matches(
                /^([\w+-.%]+@[\w-.]+\.[A-Za-z]{2,4},?)+$/,
                "Please provide a valid format"
              )
          : Yup.string(),
    }),
    onSubmit: createList,
  });

  const openFileExplorer = async () => {
    document.getElementById("list")?.click();
  };

  const onClose = async () => {
    navigate(-1);
  };

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e?.target?.files) {
      setFile(e?.target?.files[0]);
      e.target.value = null;
    }
  };
  return (
    <Dialog
      open={true}
      onClose={onClose}
      className="fixed inset-0 flex w-screen items-center justify-center bg-black/30 p-4 transition duration-300 ease-out data-[closed]:opacity-0"
    >
      <DialogPanel className="max-w-lg bg-white p-8 rounded-lg">
        <h1 className="text-2xl text-primary">New recipients list</h1>
        <h2 className="text-1xl text-secondary">
          Create a new recipients list and upload an email list
        </h2>
        <hr className="my-2" />
        <form onSubmit={formik.handleSubmit}>
          <div className="w-full">
            <Input
              id="name"
              value={formik.values.name}
              type="text"
              placeHolder="Recipients list name"
              onChange={formik.handleChange}
            />
            {formik?.errors?.name}
          </div>
          <div className="w-full">
            <Input
              id="description"
              value={formik.values.description}
              type="text"
              disabled={file != null}
              placeHolder="Short description"
              onChange={formik.handleChange}
            />
          </div>
          <div className="w-full">
            <Input
              id="emails"
              value={formik.values.emails}
              type="text"
              disabled={file != null}
              placeHolder="Comma separated recipients"
              onChange={formik.handleChange}
            />
            {formik?.errors?.emails}
          </div>
          <div className="w-full p-4 bg-green-50 rounded-lg border-primary cursor-pointer my-2">
            <div className="flex justify-between">
              <span
                onClick={openFileExplorer}
                className={`${
                  file != null ? "text-primary" : "text-primary-300"
                }`}
              >
                {file?.name ?? "Upload a single column .CSV"}
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
              name="list"
              id="list"
              className="hidden"
              multiple={false}
              accept=".csv"
              onChange={handleFile}
            />
          </div>
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
              type="submit"
            >
              Create List
            </button>
          </div>
        </form>
      </DialogPanel>
    </Dialog>
  );
};
