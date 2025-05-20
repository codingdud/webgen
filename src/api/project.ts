import { Axios } from "axios";
import { AppDispatch } from "../store";
import { projectActions } from "../store/project-slice";

export interface FormState {
  errors: {
    title?: string;
    description?: string;
    tags?: string;
  };
  message?: string;  // Change from 'any' to 'string'
}

 export const submitActionCreate=async(_prevState: FormState, formData: FormData,dispatch:AppDispatch,axiosPrivate:Axios)=>{
  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const tags = JSON.parse(formData.get('tags') as string) as string[];

  const errors: FormState['errors'] = {};

  if (!title.trim()) errors.title = 'Title is required';
  if (!description.trim()) errors.description = 'Description is required';
  if (tags.length === 0) errors.tags = 'At least one tag is required';

  if (Object.keys(errors).length > 0) {
    return { errors, message: 'Validation failed' };
  }

  // Simulate API call
  //await new Promise(resolve => setTimeout(resolve, 1000));
  try {
    // API call with axiosPrivate
    const response = await axiosPrivate.post('/api/v1/project', {
      title: title.trim(),
      description: description.trim(),
      tags: tags
    });

    // Optional: Handle success actions here (like redirecting or updating state)
    dispatch(projectActions.addProject(response.data.data));
    console.log('Project created:', response.data);

    return {
      errors: {},
      message: 'Project created successfully!'
    };
  } catch (error) {
    console.error('Project creation failed:', error);

    const errorMessage = error instanceof Error
      ? error.message
      : (error as { response?: { data?: { error?: { message?: string }, errors?: Record<string, string> } } })?.response?.data?.error?.message
      || "Failed to create project";

    const serverErrors = (error as { response?: { data?: { errors?: Record<string, string> } } })?.response?.data?.errors || {};

    return {
      errors: {
      title: serverErrors.title || undefined,
      description: serverErrors.description || undefined,
      tags: serverErrors.tags || undefined
      },
      message: Object.keys(serverErrors).length > 0
      ? 'Please fix the form errors'
      : errorMessage
    } satisfies FormState;
  }
}

export const submitActionUpdate = async(_prevState: FormState, formData: FormData,dispatch:AppDispatch,axiosPrivate:Axios,id?:string) => {
  try {
    const payload = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      status: formData.get("status") as string,
      tags:JSON.parse(formData.get('tags') as string) as string[]
    };

    // Client-side validation
    const errors: FormState["errors"] = {};
    if (!payload.title.trim()) errors.title = "Title is required";
    if (!payload.description.trim()) errors.description = "Description is required";

    if (Object.keys(errors||{}).length > 0) {
      return { errors, message: "Validation failed" };
    }

    const response = await axiosPrivate.put(`/api/v1/project/${id}`, payload);
    console.log("Update successful:", response.data.data);
    dispatch(projectActions.updateProject(response.data.data));

    return {
      errors: {},
      message: "Project updated successfully!",
    };
  } catch (error) {
    console.error("Update failed:", error);

    const errorMessage = error instanceof Error
      ? error.message
      : (error as { response?: { data?: { error?: { message?: string }, errors?: Record<string, string> } } })?.response?.data?.error?.message
      || "Failed to update project";

    const serverErrors = (error as { response?: { data?: { errors?: Record<string, string> } } })?.response?.data?.errors || {};

    return {
      errors: {
      title: serverErrors.title || undefined,
      description: serverErrors.description || undefined,
      tags: serverErrors.tags || undefined
      },
      message: Object.keys(serverErrors).length > 0
      ? 'Please fix the form errors'
      : errorMessage
    } satisfies FormState;
  }
}

interface DeleteData {
  id: string;
}

export const submitActionDelete = async(_prevState: FormState, _formData: FormData,dispatch:AppDispatch,axiosPrivate:Axios,data?: DeleteData) => {
  try {
    const response = await axiosPrivate.delete(`/api/v1/project/${data?.id}`);
    console.log("Delete successful:", response.data.data);
    if (data?.id) {
      dispatch(projectActions.deleteProject(data?.id));
    } else {
      throw new Error("Project ID is required to delete a project");
    }

    return {
      errors: {},
      message: "Project deleted successfully!",
    };
  } catch (error) {
    console.error("Delete failed:", error);
    let errorMessage = "Failed to delete project";
    if (error && typeof error === "object" && "response" in error) {
      const err = error as { response?: { data?: { error?: { message?: string } } } };
      errorMessage = err.response?.data?.error?.message || errorMessage;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }
    return {
      errors: {},
      message: errorMessage,
    };
  }
}