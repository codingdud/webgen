import { Dispatch, UnknownAction } from "@reduxjs/toolkit";
import generateImagePayload from "../utils/generateimageprompt";
import { ComponentType,AspectRatio,StylePreset,OutputFormat} from "../utils/payloadtyles";
import { Axios } from "axios";
import { projectActions } from "../store/project-slice";
import { AppDispatch } from "../store";
import { FormState } from "./project";
import { ImgProps } from "../components/ui/rightpanelgenerate";


export interface FormPrevImageState {
  componentType?: ComponentType,
  aspectRatio?: AspectRatio,
  negativePrompt?: string,
  outputFormat?: OutputFormat,
  prompt?: string,
  colorScheme?: string[],
  stylePreset?: StylePreset,
};

export interface FormStateGenerateImage {
  error?: string
  prevValue?: FormPrevImageState;  // Change from 'any' to 'string'
  img?: ImgProps;
}

export const handleGenerateAction=async (_previousState: FormStateGenerateImage, formData: FormData,dispatch:Dispatch<UnknownAction>,axiosPrivate:Axios,id:string):Promise<FormStateGenerateImage> =>{
    const componentType = formData.get('type')
    const aspectRatio = formData.get('ratio') as AspectRatio | undefined
    const negativePrompt = formData.get('negative_prompt')
    const outputFormat = formData.get('output_format')
    const prompt = formData.get('prompt')
    const colorScheme = formData.getAll('colorScheme')
    const stylePreset = formData.get('style_preset')
    //check if the values prompt is not empty
    if(!prompt){
        return{
            error: "Prompt is required",
            prevValue: {
                componentType: componentType as ComponentType | undefined,
                aspectRatio,
                negativePrompt: negativePrompt as string | undefined,
                outputFormat: outputFormat as OutputFormat | undefined,
                prompt: prompt as string | undefined,
                colorScheme: colorScheme.map(value => String(value)),
                stylePreset: stylePreset as StylePreset | undefined
            }
        }
    }
    //console.log(componentType, aspectRatio, negativePrompt, outputFormat, prompt, colorScheme, stylePreset)
    const payload= generateImagePayload({
      componentType: componentType as ComponentType,
      aspectRatio: aspectRatio as AspectRatio,
      negativePrompt: negativePrompt as string,
      outputFormat: outputFormat as OutputFormat,
      prompt: prompt as string,
      colorScheme: colorScheme as string[],
      stylePreset: stylePreset as StylePreset
    })
    try {
        const data={
            ...payload,
            type:componentType,
            colorScheme:colorScheme,
            style:stylePreset,
        }
        //console.log(data)
        const response = await axiosPrivate.post(`api/v1/images/generate/${id}`,data)
        console.log(response.data)
        dispatch(projectActions.addImage({projectId:id,image:response.data.data}))
        return {img: response.data.data}
    } catch (error:unknown) {
        console.log(error)
        const errorMessage =
          error instanceof Error
            ? error.message
            : (error as { response?: { data?: { error?: { message: string } } } })?.response?.data?.error?.message ||
              "Failed to generate image";
        return {
          error: errorMessage,
          prevValue: {
            componentType: componentType as ComponentType | undefined,
            aspectRatio,
            negativePrompt: negativePrompt?.toString() || undefined,
            outputFormat: outputFormat as OutputFormat | undefined,
            prompt: prompt?.toString(),
            colorScheme: colorScheme.map(value => String(value)),
            stylePreset: stylePreset?.toString() as StylePreset
          }
        };
    }

  }

  interface DeleteData {
    Iid: string;
    Pid?: string;
  }

  export const submitActionDeleteImage = async(_prevState: FormState, _formData: FormData,dispatch:AppDispatch,axiosPrivate:Axios,data?: DeleteData) => {
    try {
      const response = await axiosPrivate.delete(`/api/v1/images/${data?.Iid}`);
      console.log("Delete successful:", response.data.message);
      if (data?.Pid) {
        dispatch(projectActions.deleteImage({ projectId: data?.Pid, imageId: data?.Iid }));
      } else {
        throw new Error("Project ID is required to delete a project");
      }
  
      return {
        errors: {},
        message: "image deleted successfully!",
      };
        } catch (error: unknown) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : (error as { response?: { data?: { error?: { message: string } } } })?.response?.data?.error?.message ||
        "Failed to delete image";
      console.error("Delete failed:", error);
      return {
        errors: {},
        message: errorMessage,
      };
    }
  }