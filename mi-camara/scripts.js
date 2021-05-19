const fn = () => {
  const videoElement = document.querySelector("video");
  const videoSelect = document.querySelector("select#videoSource");

  // AFAICT in Safari this only gets default devices until gUM is called :/
  const getDevices = () => navigator.mediaDevices.enumerateDevices();

  const gotDevices = (deviceInfos) => {
    window.deviceInfos = deviceInfos; // make available to console
    console.log("Available input and output devices:", deviceInfos);

    for (const deviceInfo of deviceInfos) {
      const option = document.createElement("option");
      option.value = deviceInfo.deviceId;
      if (deviceInfo.kind === "videoinput") {
        option.text = deviceInfo.label || `Camera ${videoSelect.length + 1}`;
        videoSelect.appendChild(option);
      }
    }
  };

  const getStream = async () => {
    try {
      if (window.stream) {
        window.stream.getTracks().forEach((track) => {
          track.stop();
        });
      }
      const videoSource = videoSelect.value;
      const constraints = {
        aspectRatio: 1.777777778,
        facingMode: { exact: "user" },
        frameRate: { max: 30 },
        video: {
          deviceId: videoSource ? { exact: videoSource } : undefined,
        },
      };

      const newDevices = await navigator.mediaDevices.getUserMedia(constraints);
      const newStream = gotStream(newDevices);

      return newStream;
    } catch (e) {
      handleError(e);
    }
  };

  const gotStream = (stream) => {
    window.stream = stream; // make stream available to console

    videoSelect.selectedIndex = [...videoSelect.options].findIndex(
      (option) => option.text === stream.getVideoTracks()[0].label
    );
    videoElement.srcObject = stream;
  };

  const handleError = (error) => console.error("Error: ", error);

  const start = async () => {
    videoSelect.onchange = getStream;

    const newStreams = await getStream();
    const newDevices = await getDevices(newStreams);
    gotDevices(newDevices);

    // Solo para mi
    videoSelect.selectedIndex = 4;
    videoSelect.dispatchEvent(new Event("change"));
  };

  start();
};

fn();
