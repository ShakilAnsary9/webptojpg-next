import { useState } from "react";

export default function Converter() {
  const [selectedImg, setSelectedImg] = useState(null);
  const [downloadLink, setDownloadLink] = useState(null);
  const [selectedFileName, setSelectedFileName] = useState("");
  const [selectedFileSize, setSelectedFileSize] = useState(0);

  const formatBytes = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];

    if (file.type !== "image/webp") {
      alert("Please upload a .webp file.");
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      const webpBlob = reader.result;
      setSelectedImg(webpBlob);
      setSelectedFileName(file.name);
      setSelectedFileSize(file.size);
      setDownloadLink(null);
    };

    reader.readAsDataURL(file);
  };

  const convertImage = async () => {
    if (!selectedImg) {
      alert("Please select an image first.");
      return;
    }

    const img = new Image();
    img.src = selectedImg;

    img.onload = async () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;

      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);

      const jpgBlob = await new Promise((resolve) => {
        canvas.toBlob((blob) => {
          resolve(blob);
        }, "image/jpeg");
      });

      const downloadURL = URL.createObjectURL(jpgBlob);
      setDownloadLink(downloadURL);
    };
  };

  const handleDownload = () => {
    const a = document.createElement("a");
    a.href = downloadLink;
    a.download = `${selectedFileName.replace(".webp", "")}.jpg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleConvertAnother = () => {
    window.location.reload();
  };
  return (
    <div>
      <div class="w-100 mt-24 sm:mt-40 flex justify-center">
        <div class="grid mx-3 sm:mx-0 w-full max-w-xl items-center gap-1.5">
          <div
            id="fileDrop"
            class="relative w-full h-80 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center overflow-hidden"
          >
            <label
              for="picture"
              class="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center text-gray-400 cursor-pointer"
            >
              {selectedImg && (
                <div class="w-40 h-40 -mt-12 mb-2 sm:mb-5 rounded-lg overflow-hidden object-cover">
                  <img
                    src={selectedImg}
                    alt="Selected"
                    class="w-full h-full object-cover"
                  />
                  <button onClick={convertImage}>Convert</button>
                </div>
              )}

              {selectedImg ? (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 64 64"
                  >
                    <circle cx="32" cy="32" r="30" fill="#4bd37b" />
                    <path
                      fill="#fff"
                      d="M46 14L25 35.6l-7-7.2l-7 7.2L25 50l28-28.8z"
                    />
                  </svg>
                </>
              ) : (
                <>
                  <svg
                    id="uploadIcon"
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                  >
                    <g fill="currentColor">
                      <path
                        d="M2 12c0-4.714 0-7.071 1.464-8.536C4.93 2 7.286 2 12 2c4.714 0 7.071 0 8.535 1.464C22 4.93 22 7.286 22 12c0 4.714 0 7.071-1.465 8.535C19.072 22 16.714 22 12 22s-7.071 0-8.536-1.465C2 19.072 2 16.714 2 12Z"
                        opacity=".5"
                      />
                      <path d="M8 7.75a.75.75 0 0 1 0-1.5h8a.75.75 0 0 1 0 1.5H8ZM12.75 17a.75.75 0 0 1-1.5 0v-5.19l-1.72 1.72a.75.75 0 0 1-1.06-1.06l3-3a.75.75 0 0 1 1.06 0l3 3a.75.75 0 1 1-1.06 1.06l-1.72-1.72V17Z" />
                    </g>
                  </svg>
                  <div id="uploadText" class="flex flex-col text-center">
                    <span class="text-sm font-medium transition duration-300 ease-in-out">
                      Drag & Drop files here
                    </span>
                    <span class="text-xs text-gray-500 transition duration-300 ease-in-out">
                      (or click to browse)
                    </span>
                  </div>
                </>
              )}
            </label>
            <input
              id="picture"
              type="file"
              class="w-full h-full opacity-0 cursor-pointer"
              accept="image/webp"
              onChange={handleFileUpload}
            />
            <div
              id="fileInfo"
              class="hidden mt-3 mb-5 text-center text-sm text-gray-600"
            ></div>
            {selectedFileName && (
              <div className="mt-3 mb-5 text-center text-sm text-gray-600">
                <p>Selected File: {selectedFileName}</p>
                <p>File Size: {formatBytes(selectedFileSize)}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Controls  */}

      <div class="controls mt-8 text-center flex flex-col justify-center items-center">
        {downloadLink ? (
          <button
            id="convertBtn"
            onClick={handleConvertAnother}
            class="w-mbtn sm:w-lbtn bg-primary py-2 my-2 rounded-lg"
          >
            Convert Another Image
          </button>
        ) : (
          <button
            id="convertBtn"
            onClick={convertImage}
            class="w-mbtn sm:w-lbtn bg-primary py-2 my-2 rounded-lg"
          >
            Convert to JPG
          </button>
        )}
        {downloadLink && (
          <>
            <button
              class="w-mbtn sm:w-lbtn bg-primary py-2 my-2 rounded-lg"
              onClick={handleDownload}
            >
              Download JPG
            </button>
          </>
        )}
        <span id="alert" class="text-red-500 hidden">
          <i class="lineui lineui-danger text-current"></i> Upload a WebP Image
          First
        </span>
      </div>
      {/* OLD  */}
    </div>
  );
}
