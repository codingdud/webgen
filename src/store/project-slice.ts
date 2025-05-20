import { createSlice, PayloadAction } from "@reduxjs/toolkit";
export interface Image {
    metadata: {
      type: string;
      prompt: string;
      style: string;
      colorScheme: string[];
      aspectRatio: string;
    };
    _id: string;
    url: string;
    publicId: string;
    user: string;
    generatedAt: string;
    __v: number;
  }
export interface Project {
    _id: string;
    title: string;
    description: string;
    user: string;
    images: Image[];
    tags: string[];
    status: string;
    createdAt: string;
    updatedAt: string;
    publish:boolean;
    __v: number;
}

export interface Pagination {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

interface ProjectState {
    projects: Project[];
    pagination: Pagination;
    loading: boolean;
}

const initialState: ProjectState = {
    projects: [],
    pagination: {
        page: 1,
        limit: 10,
        total: 0,
        totalPages: 0
    },
    loading: false
};

const projectSlice = createSlice({
    name: "project",
    initialState,
    reducers: {
        setProjects(state, action: PayloadAction<Project[]>) {
            state.projects = action.payload;
            state.loading=true;
        },
        addProject(state, action: PayloadAction<Project>) {
            state.projects.unshift(action.payload);
        },
        updateProject(state, action: PayloadAction<Project>) {
            const index = state.projects.findIndex(project => project._id === action.payload._id);
            if (index !== -1) {
                const { images, ...rest } = action.payload;
                state.projects[index] = { ...state.projects[index], ...rest };
            }
        },
        deleteProject(state, action: PayloadAction<string>) {
            state.projects = state.projects.filter(project => project._id !== action.payload);
        },
        setPagination(state, action: PayloadAction<Pagination>) {
            state.pagination = action.payload;
        },
        addImage(state, action: PayloadAction<{projectId: string, image: Image}>) {
            const project = state.projects.find(project => project._id === action.payload.projectId);
            if (project) {
                project.images.unshift(action.payload.image);
            }
        },
        deleteImage(state, action: PayloadAction<{projectId: string, imageId: string}>) {
            const project = state.projects.find(project => project._id === action.payload.projectId);
            if (project) {
                project.images = project.images.filter(image => image._id !== action.payload.imageId);
            }
        },
        updatePublish(state, action: PayloadAction<{ projectId: string, publish: boolean }>) {
            const project = state.projects.find(project => project._id === action.payload.projectId);
            if (project) {
            project.publish = action.payload.publish;
            }
        }
    }
});

// Export the project slice
export default projectSlice.reducer;
export const projectActions = projectSlice.actions;