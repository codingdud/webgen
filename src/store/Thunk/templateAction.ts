import { createAsyncThunk } from "@reduxjs/toolkit";
import { Axios } from "axios";
import { templateActions } from "../template-slice";

interface FetchTemplatesParams {
    axiosPrivate: Axios;
    page?: number;
    limit?: number;
    projectTitle?: string;
    tags?: string[];
    status?: string;
}

interface TemplateQueryParams {
    page?: number;
    limit?: number;
    projectTitle?: string;
    tags?: string[];
    status?: string;
}
interface User {
    _id: string;
    email: string;
}
export const fetchTemplates = createAsyncThunk(
    'template/fetchTemplates',
    async ({ axiosPrivate, page = 1, limit = 10, projectTitle, tags, status }: FetchTemplatesParams, { dispatch }) => {
        try {
            dispatch(templateActions.setLoading(true));
            
            const params: TemplateQueryParams = {};
            if (page) params.page = page;
            if (limit) params.limit = limit;
            if (projectTitle) params.projectTitle = projectTitle;
            if (tags) params.tags = tags;
            if (status) params.status = status;
            console.log(params)
            const response = await axiosPrivate.get('/api/v1/template/template', { params });
            console.log(response.data)
            dispatch(templateActions.setTemplates(response.data.data.templates));
            dispatch(templateActions.setPagination(response.data.data.pagination));
        } catch (error: unknown) {
            console.error('Fetching templates failed:', error);
        }
    }
);

export const toggleLikeTemplate = createAsyncThunk(
    'template/toggleLike',
    async ({ axiosPrivate, templateId, user }: { axiosPrivate: Axios, templateId: string, user: User }, { dispatch }) => {
        try {
            const response = await axiosPrivate.post(`/api/v1/template/like/${templateId}`);
            if(response.status==200){
                dispatch(templateActions.toggleLike({ templateId, user }));
            }
        } catch (error: unknown) {
            console.error('Toggle like failed:', error);
        }
    }
);

export const toggleDislikeTemplate = createAsyncThunk(
    'template/toggleDislike',
    async ({ axiosPrivate, templateId, user }: { axiosPrivate: Axios, templateId: string, user: User }, { dispatch }) => {
        try {
            const response = await axiosPrivate.post(`/api/v1/template/dislike/${templateId}`);
            if(response.status==200){
                dispatch(templateActions.toggleDislike({ templateId, user }));
            }
        } catch (error: unknown) {
            console.error('Toggle dislike failed:', error);
        }
    }
);