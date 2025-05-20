import { createAsyncThunk } from "@reduxjs/toolkit";
import { projectActions } from "../project-slice";
import { Axios } from "axios";

interface FetchProjectsParams {
    axiosPrivate: Axios;
    page?: number;
    limit?: number;
    status?: string;
    tags?: string[];
    title?: string;
}

const fetchProjects = createAsyncThunk(
    'project/fetchProjects',
    async ({ axiosPrivate, page = 2, limit = 10, status, tags, title }: FetchProjectsParams, { dispatch }) => {
        try {
            const params: {
                page?: number;
                limit?: number;
                status?: string;
                tags?: string[];
                title?: string;
            } = {};
            if (page) params.page = page;
            if (limit) params.limit = limit;
            if (status) params.status = status;
            if (tags) params.tags = tags;
            if (title) params.title = title;
            console.log(params);
            const response = await axiosPrivate.get('api/v1/project', {
                params
            });
            console.log(response.data.data.projects);
            console.log(response.data.data.pagination);
            dispatch(projectActions.setProjects(response.data.data.projects));
            dispatch(projectActions.setPagination(response.data.data.pagination));
        } catch (error) {
            console.error('Fetching projects data failed:', error);
        }
    }
);
const publishProject=createAsyncThunk(
    'project/publish',
    async ({axiosPrivate,projectId}:{axiosPrivate:Axios,projectId:string}, { dispatch }) => {
        try {
            const response = await axiosPrivate.post(`/api/v1/template/publish/${projectId}`);
            if (response.status === 200) {
                //console.log(response.data);
                dispatch(projectActions.updatePublish({projectId, publish: true}));
            }
        } catch (error) {
            console.error('Fetching projects data failed:', error);
        }
    }
)
const unpublishProject=createAsyncThunk(
    'project/unpublish',
    async ({axiosPrivate,projectId}:{axiosPrivate:Axios,projectId:string}, { dispatch }) => {
        try {
            const response = await axiosPrivate.post(`/api/v1/template/unpublish/${projectId}`);
            if (response.status === 200) {
                //console.log(response.data)
                dispatch(projectActions.updatePublish({projectId,publish:false}))
            }
        } catch (error) {
            console.error('Fetching projects data failed:', error);
        }
    }
)
/* const addProject = createAsyncThunk(
    'project/addProject',
    async (project, { dispatch }) => {
        try {
            const response = await axiosPrivate.post('/projects', project);
            dispatch(projectActions.addProject(response.data.project));
            dispatch(projectActions.setPagination(response.data.pagination));
        } catch (error) {
            console.error('Adding project failed:', error);
        }
    }
);

const updateProject = createAsyncThunk(
    'project/updateProject',
    async (project, { dispatch }) => {
        try {
            const response = await axiosPrivate.put(`/projects/${project._id}`, project);
            dispatch(projectActions.updateProject(response.data.project));
        } catch (error) {
            console.error('Updating project failed:', error);
        }
    }
);

const deleteProject = createAsyncThunk(
    'project/deleteProject',
    async (projectId:string, { dispatch }) => {
        try {
            await axiosPrivate.delete(`/projects/${projectId}`);
            dispatch(projectActions.deleteProject(projectId));
        } catch (error) {
            console.error('Deleting project failed:', error);
        }
    }
);

const setPagination = createAsyncThunk(
    'project/setPagination',
    async (pagination:Pagination, { dispatch }) => {
        dispatch(projectActions.setPagination(pagination));
    }
);
 */
export { unpublishProject,publishProject,fetchProjects };