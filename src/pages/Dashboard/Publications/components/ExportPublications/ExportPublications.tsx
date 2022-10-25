import dayjs from "dayjs";
import { useState, Fragment, useEffect } from "react";
import { Popover, Transition } from "@headlessui/react";

import { ImgChevronDownOutline } from "assets";
import { Button } from "components";
import { Publication } from "api/models";
import { useSubmitPublicationsExportPdf } from "api/hooks";

import {
  getExportPublicationFormats,
  renderExportPreview,
} from "./ExportPublications.util";

interface ExportPublicationsProps {
  publication: Publication;
}

const ExportPublications = ({ publication }: ExportPublicationsProps) => {
  const publicationFormats = getExportPublicationFormats();

  const [selectedFormat, setSelectedFormat] = useState<string>("ama");

  // *Queries
  const submitPublicationsExportPdf = useSubmitPublicationsExportPdf();

  // *Methods
  const downloadBase64 = (
    contentType: string,
    base64Data: string,
    fileName: string
  ): void => {
    const linkSource = `data:${contentType};base64,${base64Data}`;
    const downloadLink = document.createElement("a");
    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
  };

  const handleSubmitExportPdf = () => {
    const payload = {
      format: selectedFormat,
    };
    submitPublicationsExportPdf.mutate(payload);
  };

  // *Effects
  useEffect(() => {
    if (submitPublicationsExportPdf.data?.data?.data) {
      const data = submitPublicationsExportPdf.data.data.data;
      downloadBase64(
        "pdf",
        data,
        `pubs_export_${dayjs().format("YYYYMMDDTHH:mm:ss")}.pdf`
      );
    }
  }, [submitPublicationsExportPdf.data]);

  // *JSX
  return (
    <div className="flex ml-2 mb-4">
      <Popover className="relative">
        {({ open }) => (
          <>
            <Popover.Button as="div" className="w-[200px]">
              <Button variant="secondary">Export Publications</Button>
            </Popover.Button>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel>
                <div className="absolute top-2 rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 w-[70vw] sm:w-[450px] bg-white p-6">
                  <p className="mb-2">Preview:</p>
                  {renderExportPreview(publication, selectedFormat)}

                  <div className="flex flex-col sm:flex-row justify-between mt-4 sm:items-center gap-y-4">
                    <Popover className="relative">
                      <Popover.Button as="div">
                        <div className="flex space-x-1 items-center cursor-pointer">
                          <p>Format: {selectedFormat.toUpperCase()}</p>
                          <ImgChevronDownOutline className="w-4 h-4" />
                        </div>
                      </Popover.Button>
                      <Popover.Panel>
                        <ul className="absolute top-6 right-0 border-[1px] border-borderGray shadow-md bg-gray-100 rounded-md cursor-pointer p-2">
                          {publicationFormats.map((format) => {
                            return (
                              <li
                                key={format.key}
                                className="flex justify-end p-2 hover:bg-blue-500 hover:text-white rounded-md"
                                onClick={() => setSelectedFormat(format.key)}
                              >
                                {`${format.key === selectedFormat ? "✔" : ""} ${
                                  format.label
                                }`}
                              </li>
                            );
                          })}
                        </ul>
                      </Popover.Panel>
                    </Popover>
                    <div className="w-[140px]">
                      <Button
                        isLoading={submitPublicationsExportPdf?.isLoading}
                        loadingText="Processing..."
                        onClick={handleSubmitExportPdf}
                      >
                        Download PDF
                      </Button>
                    </div>
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  );
};

export default ExportPublications;
