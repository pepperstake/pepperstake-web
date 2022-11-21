import PepperStake from "components/forms/pepperstake";
import React from "react";
import PepperSteps from "components/forms/steps";
import ProjectDetails from "components/forms/ProjectDetails";
import StakeAmount from "components/forms/StakeAmount";
import SetDuration from "components/forms/SetDuration";
import AddSupervisors from "components/forms/AddSupervisors";
import { useForm, SubmitHandler } from "react-hook-form";
import { ChangeEvent, useEffect, useState } from "react";
import UnreturnedStakeBeneficiaries from "components/forms/UnreturnedStakeBeneficiaries";
import MISC from "components/forms/MISC";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { parseEther } from "ethers/lib/utils";
import { useDeployPepperStake } from "hooks/contract/deployer/useDeployPepperStake";
import { PinMetadataRequestPayload } from "pages/api/pin-metadata";

export interface CreateProjectFormInputs {
  supervisors: string[];
  stakeAmount: string;
  unreturnedStakeBeneficiaries: string[];
  returnWindowDays: string;
  maxParticipants: string;
  shouldParticipantsShareUnreturnedStake: boolean;
  shouldUseSupervisorInactionGuard: boolean;
  projectName: string;
  projectDescription: string;
  image: any;
}
export default function CreateProjectPage() {
  const noSupervisorNotify = () =>
    toast.info("Please fill out at least one supervisor 😉", {
      position: "bottom-right",
      theme: "dark",
    });

  const noStakeAmountNotify = () =>
    toast.info("Please fill out the amount you want to stake 😉", {
      position: "bottom-right",
      theme: "dark",
    });

  const noMetadataNotify = () =>
    toast.info(
      "Please fill out the metadata and upload a cool image for your stake! 😉",
      {
        position: "bottom-right",
        theme: "dark",
      }
    );

    const noMetadataUriNotify = () =>
    toast.error(
      "Contract is not deployed properly, please try again!",
      {
        position: "bottom-right",
        theme: "dark",
      }
    );

  const imageUploadedNotify = () =>
    toast.success("Image uploaded! 🥳", {
      position: "bottom-right",
      theme: "light",
    });

  const uploadImageToIpfsNotify = () =>
    toast.info("Uploading image to IPFS...", {
      position: "bottom-right",
      theme: "light",
    });

  const uploadMetadataToIpfsNotify = () =>
    toast.info("Uploading metadata to IPFS...", {
      position: "bottom-right",
      theme: "light",
    });

  const contractCreationNotify = () =>
    toast.success("PepperStake Contract ready for deploy! 🎉", {
      position: "bottom-right",
      theme: "light",
    });

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<CreateProjectFormInputs>({
    defaultValues: {
      supervisors: [""],
      stakeAmount: "0.05",
      unreturnedStakeBeneficiaries: [],
      returnWindowDays: "30",
      maxParticipants: "100",
      shouldParticipantsShareUnreturnedStake: false,
      shouldUseSupervisorInactionGuard: true,
      projectName: "",
      projectDescription: "",
      image: undefined,    
    },
  });
  const supervisors = watch("supervisors");
  const unreturnedStakeBeneficiaries = watch("unreturnedStakeBeneficiaries");
  const [preview, setPreview] = useState<string>();
  // const [poster, setPoster] = useState();
  const image = watch("image");

  useEffect(() => {
    console.log("image1", image);
    if (image! && image![0]) {
      console.log("image2", image);
      
      // setPreview(URL.createObjectURL(image[0]));
      const reader = new FileReader();
      console.log("hey");
      reader.onloadend = () => {
        console.log("hey2");

          // setPreview(URL.createObjectURL(image[0]));
          // setPoster(image[0]);
          setPreview(reader.result as string);
          console.log("preview", preview);
      };
      reader.readAsDataURL(image[0]);
    } else {
      // setPreview(undefined);
    }
  }, [image]);

  useEffect(() => {
    if (image && image.length != 0) {
      imageUploadedNotify();
    }
  }, [image]);

  const [metadataUri, setMetadataUri] = React.useState<string>("");
  const deployData = {
    supervisors: watch("supervisors"),
    stakeAmount: parseEther(watch("stakeAmount")),
    unreturnedStakeBeneficiaries: watch("unreturnedStakeBeneficiaries"),
    returnWindowDays: parseInt(watch("returnWindowDays")),
    maxParticipants: parseInt(watch("maxParticipants")),
    shouldParticipantsShareUnreturnedStake: watch(
      "shouldParticipantsShareUnreturnedStake"
    ),
    shouldUseSupervisorInactionGuard: watch("shouldUseSupervisorInactionGuard"),
    metadataURI: metadataUri,
  };
  console.log ("deployData", deployData);

  const {data, write, isSuccess } = useDeployPepperStake(deployData);
  const uploadImage = async () => {
    uploadImageToIpfsNotify();
    const data = new FormData();
    const file = getValues("image");
    data.append("file", file[0]);
    const res = await axios.post("/api/pin-image", data, {
      maxContentLength: Infinity, //this is needed to prevent axios from erroring out with large files
      headers: {
        "Content-Type": `multipart/form-data;`,
      },
    });
    return res.data.cid;
  };

  const uploadMetadata = async (imageCid: string) => {
    console.log("imageCid", imageCid);
    uploadMetadataToIpfsNotify();
    const { projectName, projectDescription } = getValues();
    console.log("projectName", projectName);
    console.log("projectDescription", projectDescription);
    const data: PinMetadataRequestPayload = {
      name: projectName,
      description: projectDescription,
      imageCid,
    };
    const res = await axios.post("/api/pin-metadata", data);
    const metadataCid = `ipfs://${res.data.cid}`
    setMetadataUri(metadataCid);
    console.log("metadataUri1", metadataUri);
  };

  useEffect(() => {
    console.log("metadataUri2", metadataUri);
  }, [metadataUri]);

  const onSubmit = async () => {
    console.log("submitting");
    if (getValues("supervisors").length === 0) {
      noSupervisorNotify();
      return;
    }
    console.log("supervisors", getValues("supervisors"));
    if (!getValues("stakeAmount") || getValues("stakeAmount") === "0") {
      noStakeAmountNotify();
      return;
    }
    console.log("stakeAmount", getValues("stakeAmount"));
    if (
      getValues("image").length === 0 ||
      getValues("projectName") === "" ||
      getValues("projectDescription") === ""
    ) {
      noMetadataNotify();
      return;
    }
    console.log("image", getValues("image"));
    console.log("projectName", getValues("projectName"));
    console.log("projectDescription", getValues("projectDescription"));

    try {
      const imageCid = await uploadImage();
      console.log("imageCid", imageCid);
      await uploadMetadata(imageCid);
      if(metadataUri!="") {
        write?.();
        contractCreationNotify();
        // {isSuccess && <>
        //   <div>Transaction: {JSON.stringify(data)}</div>
        //   <div>Hash: {JSON.stringify(data?.hash)}</div>

        //   </>
        // }

      }else{
        console.log("metadataUri not set");
        noMetadataUriNotify();
      }
    } catch (err) {
      console.error(err);
    }
  };


  const [step, setStep] = useState(0);
  const setElemAtIndex = (
    index: number,
    event: ChangeEvent<HTMLInputElement>,
    formKey: keyof CreateProjectFormInputs,
    formVal: string[]
  ) => {
    setValue(formKey, [
      ...formVal.slice(0, index),
      event.target.value,
      ...formVal.slice(index + 1),
    ]);
  };
  const removeElemAtIndex = (
    index: number,
    event: any,
    formKey: keyof CreateProjectFormInputs,
    formVal: string[]
  ) => {
    event.preventDefault();
    setValue(
      formKey,
      formVal.filter((e, i) => i !== index)
    );
  };
  const addNewElem = (
    event: any,
    formKey: keyof CreateProjectFormInputs,
    formVal: string[]
  ) => {
    event.preventDefault();
    setValue(formKey, [...formVal, ""]);
  };
  // return different form based on step
  const renderFn = (step:number) => {
    switch(step) {
      case 0:
        return <ProjectDetails register={register} preview={preview}/>;
      case 1:
        return <StakeAmount register={register}/>;
      case 2:
        return <SetDuration register={register}/>;
      case 3:
        return <AddSupervisors supervisors={supervisors} setElemAtIndex={setElemAtIndex} removeElemAtIndex={removeElemAtIndex} addNewElem={addNewElem}/>;
      case 4:
        return <UnreturnedStakeBeneficiaries unreturnedStakeBeneficiaries={unreturnedStakeBeneficiaries} setElemAtIndex={setElemAtIndex} removeElemAtIndex={removeElemAtIndex} addNewElem={addNewElem}/>;
      case 5:
        return <MISC register={register} onSubmit={onSubmit} />;
      default:
        return null;
    }
  }


  return (
    <>
    <div className="mt-10 ">
      <div className="mx-10">
        <PepperSteps step={step} setStep={setStep}/> 
        {renderFn(step)}
      </div>
    </div>
    <ToastContainer className="toast-container" pauseOnFocusLoss={false} />

    </>
  );
}
